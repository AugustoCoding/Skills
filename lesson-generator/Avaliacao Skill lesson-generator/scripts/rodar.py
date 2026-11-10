"""Roda uma rodada da fila de execucoes, uma sessao por vez, e registra cada uma.

    python rodar.py --lista               mostra a fila e o que ja foi feito
    python rodar.py --teste               uma chamada barata, para ver se tudo funciona
    python rodar.py                       uma rodada: piloto, bloco A, bloco B, com o juiz
    python rodar.py --inicio 18:21        espera esse horario para comecar
    python rodar.py --max 12              no maximo 12 execucoes nesta rodada
    python rodar.py --etapa fable         bloco A no Fable 5.2
    python rodar.py --juiz                so julga os pacotes pendentes

Cada execucao e uma sessao nova do Claude Code sem interface (claude -p), numa
pasta vazia fora do repositorio, em esforco medio, so com as ferramentas de
arquivo e de terminal. A rodada segue a fila de onde ela parou e termina
sozinha em tres casos: a fila acabou, o limite do plano acabou, ou chegou o
fim do horario (--ate, 22:00). Ela nunca espera o limite voltar: a rodada
seguinte e iniciada a mao. O que ja foi registrado nao roda de novo.
Biblioteca padrao apenas.
"""

import argparse
import ctypes
import json
import os
import re
import shutil
import subprocess
import sys
import time
import uuid
from datetime import datetime
from pathlib import Path

from comum import EXECUCOES, JUIZ, MODELOS, RAIZ, ler_json, questoes
from registrar import ler_sessao, pasta_do_registro, versao_da_skill

PASTAS = "~/avaliacao-lesson-generator"
FERRAMENTAS = "Bash,Read,Write,Edit,Glob,Grep"
FERRAMENTAS_JUIZ = "Read,Write,Glob"
T_MAX = 30 * 60          # a skill da meia hora como falha: passou disso, a sessao e encerrada
MARGEM = 15 * 60         # nenhuma sessao comeca a menos disso do fim do horario
LIMITE = re.compile(r"usage limit|hit your limit|limit reached|rate.?limit|out of (extra )?usage", re.I)
TRES = ["haiku", "sonnet", "opus"]


class Parar(Exception):
    """A rodada termina aqui; a mensagem diz por que."""


def fila(etapas):
    """As execucoes de cada etapa, na ordem. Os modelos se revezam para nenhum rodar sempre primeiro."""
    banco = questoes()
    out = []
    for e in etapas:
        if e == "piloto":
            out += [("Q01", m) for m in TRES]
            continue
        bloco = "A" if e in ("A", "fable") else "B"
        for i, q in enumerate(x for x in banco.values() if x["bloco"] == bloco):
            modelos = ["fable"] if e == "fable" else TRES[i % 3:] + TRES[:i % 3]
            out += [(q["id"], m) for m in modelos]
    return list(dict.fromkeys(out))


def feita(q, m):
    return (EXECUCOES / q / m / "execucao.json").exists()


def acordado(sim):
    """No Windows, impede o computador de dormir enquanto a fila roda."""
    if os.name == "nt":
        ctypes.windll.kernel32.SetThreadExecutionState(0x80000000 | (0x00000001 if sim else 0))


def chamar(prompt, modelo, pasta, sessao, ferramentas, limite_s):
    """Uma sessao sem interface. Devolve (estado, resultado): ok, limite, tempo ou erro."""
    claude = shutil.which("claude")
    if not claude:
        sys.exit("Não achei o comando `claude` no PATH.")
    cmd = [claude, "-p", "--model", MODELOS[modelo], "--effort", "medium", "--output-format", "json",
           "--session-id", sessao, "--tools", ferramentas, "--allowedTools", ferramentas,
           "--permission-mode", "acceptEdits", "--strict-mcp-config", "--no-chrome"]
    # A sessao filha nao pode herdar o que identifica a sessao de quem chamou o script.
    amb = {k: v for k, v in os.environ.items() if not k.upper().startswith(("CLAUDE", "ANTHROPIC"))}
    try:
        r = subprocess.run(cmd, input=prompt, capture_output=True, text=True, encoding="utf-8",
                           errors="replace", cwd=pasta, env=amb, timeout=limite_s)
    except subprocess.TimeoutExpired:
        return "tempo", {}
    try:
        res = json.loads(r.stdout.strip().splitlines()[-1])
    except (ValueError, IndexError):
        res = {"is_error": True, "result": (r.stdout + r.stderr).strip()[-600:]}
    if r.returncode != 0 or res.get("is_error"):
        texto = str(res.get("result", "")) + r.stderr
        return ("limite" if LIMITE.search(texto) else "erro"), res
    return "ok", res


def hoje_as(hhmm):
    h, m = hhmm.split(":")
    return datetime.now().replace(hour=int(h), minute=int(m), second=0, microsecond=0)


def no_horario(ate):
    if (hoje_as(ate) - datetime.now()).total_seconds() < MARGEM:
        raise Parar(f"fim do horário ({ate})")


def sem_limite(res):
    """O limite do plano acabou: a rodada para, e a mensagem diz quando ele volta, se o servico informou."""
    m = re.search(r"\|(\d{10})\b", str(res.get("result", "")))
    volta = f"; volta em {datetime.fromtimestamp(int(m.group(1))):%d/%m %H:%M}" if m else ""
    raise Parar(f"limite do plano atingido{volta} ({str(res.get('result', ''))[:120]!r})")


def com_segunda_chance(tentar, descartar):
    """Uma chamada. O limite do plano encerra a rodada; um erro de outro tipo ganha uma segunda tentativa."""
    erros = 0
    while True:
        estado, res = tentar()
        if estado == "limite":
            descartar()
            sem_limite(res)
        elif estado == "erro" and erros == 0:
            erros += 1
            print(f"  erro: {str(res.get('result', ''))[:200]!r}; tentando de novo em 2 min", flush=True)
            descartar()
            time.sleep(120)
        else:
            return estado, res


def esvaziar(pasta, raiz):
    """Tira do caminho o que uma tentativa interrompida deixou; nada e apagado."""
    if pasta.exists() and any(pasta.iterdir()):
        destino = raiz / "descartadas" / f"{pasta.name}-{datetime.now():%m%d-%H%M%S}"
        destino.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(pasta), str(destino))
    pasta.mkdir(parents=True, exist_ok=True)


def anotar(raiz, texto):
    print(texto, flush=True)
    with open(raiz / "rodar.log", "a", encoding="utf-8") as f:
        f.write(f"{datetime.now():%Y-%m-%d %H:%M:%S}  {texto}\n")


def executar(q, m, raiz, banco):
    pasta = raiz / f"{q}-{m}"
    sessao = {}

    def tentar():
        esvaziar(pasta, raiz)
        sessao["id"] = str(uuid.uuid4())
        return chamar("/lesson-generator " + banco[q]["enunciado"], m, pasta, sessao["id"], FERRAMENTAS, T_MAX)

    estado, res = com_segunda_chance(tentar, lambda: esvaziar(pasta, raiz))
    if estado == "erro":
        anotar(raiz, f"{q} {m}: ERRO, não registrada: {str(res.get('result', ''))[:200]!r}")
        return False
    registro = pasta_do_registro(pasta.resolve()) / f"{sessao['id']}.jsonl"
    cmd = [sys.executable, str(Path(__file__).with_name("registrar.py")), q, m, "--pasta", str(pasta)]
    cmd += ["--sessao", str(registro)] if registro.exists() else ["--tempo", f"{T_MAX // 60}:00"]
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    saida = " | ".join(l.strip() for l in (r.stdout + r.stderr).splitlines() if l.strip())
    anotar(raiz, ("TEMPO ESGOTADO " if estado == "tempo" else "") + (saida or f"{q} {m}: registrar.py não respondeu"))
    return feita(q, m)


def julgar(modelo, maximo, raiz, ate):
    pendentes = [p for p in sorted((JUIZ / "pendentes").glob("*.md"))
                 if not (JUIZ / "respostas" / f"{p.stem}.json").exists()]
    print(f"{len(pendentes)} pacote(s) sem resposta; juiz: {MODELOS[modelo]}.", flush=True)
    (JUIZ / "respostas").mkdir(parents=True, exist_ok=True)
    for p in pendentes[:maximo]:
        no_horario(ate)
        resposta = JUIZ / "respostas" / f"{p.stem}.json"
        prompt = (f"Leia juiz/JUIZ.md e julgue somente o pacote juiz/pendentes/{p.name}, sem abrir os outros. "
                  f"Grave a resposta em juiz/respostas/{p.stem}.json e responda apenas: feito.")
        estado, res = com_segunda_chance(
            lambda: chamar(prompt, modelo, RAIZ, str(uuid.uuid4()), FERRAMENTAS_JUIZ, T_MAX),
            lambda: resposta.unlink(missing_ok=True))
        try:
            n = len(ler_json(resposta)["itens"])
            anotar(raiz, f"juiz {p.stem}: {n} itens julgados")
        except (OSError, ValueError, KeyError):
            resposta.unlink(missing_ok=True)
            anotar(raiz, f"juiz {p.stem}: SEM RESPOSTA VÁLIDA ({estado}); fica pendente")


def testar(raiz):
    """Uma chamada minima: a skill sem enunciado responde em uma linha e nao gera licao."""
    pasta = raiz / "_teste"
    esvaziar(pasta, raiz)
    sessao = str(uuid.uuid4())
    estado, res = chamar("/lesson-generator", "haiku", pasta, sessao, FERRAMENTAS, 300)
    print(f"estado: {estado}")
    print(f"resposta: {str(res.get('result', ''))[:300]!r}")
    registro = pasta_do_registro(pasta.resolve()) / f"{sessao}.jsonl"
    if registro.exists():
        s = ler_sessao(registro)
        print(f"registro da sessão: achado; tempo {s['tempo_s']} s, modelo {s['modelos_no_registro']}, "
              f"esforço {s['esforco']}, pedidos {s['turnos_do_usuario']}, saída {s['tokens_saida']} tokens")
        print("skill carregada: " + ("sim" if "Quality criterion" in registro.read_text(encoding="utf-8") else "NÃO"))
    else:
        print("registro da sessão: NÃO achado em ~/.claude/projects")
    shutil.rmtree(pasta, ignore_errors=True)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description="Roda uma rodada das execuções da avaliação.")
    ap.add_argument("--etapa", nargs="+", choices=["piloto", "A", "B", "fable"], default=["piloto", "A", "B"])
    ap.add_argument("--max", type=int, default=10 ** 6)
    ap.add_argument("--inicio", metavar="HH:MM")
    ap.add_argument("--ate", metavar="HH:MM", default="22:00")
    ap.add_argument("--pastas", default=PASTAS)
    ap.add_argument("--lista", action="store_true")
    ap.add_argument("--teste", action="store_true")
    ap.add_argument("--juiz", action="store_true")
    ap.add_argument("--sem-juiz", action="store_true")
    ap.add_argument("--modelo-juiz", choices=sorted(MODELOS), default="opus")
    a = ap.parse_args()
    raiz = Path(a.pastas).expanduser()
    raiz.mkdir(parents=True, exist_ok=True)

    if a.lista:
        todas = fila(a.etapa)
        for n, (q, m) in enumerate(todas, 1):
            print(f"{n:3d}  {'feita' if feita(q, m) else 'falta'}  {q} {m}")
        print(f"\n{sum(feita(q, m) for q, m in todas)} de {len(todas)} feitas.")
        return
    acordado(True)
    feitas = 0
    try:
        if a.teste:
            return testar(raiz)
        if a.inicio and (s := (hoje_as(a.inicio) - datetime.now()).total_seconds()) > 0:
            print(f"Aguardando {a.inicio} para começar.", flush=True)
            time.sleep(s)
        if a.juiz:
            return julgar(a.modelo_juiz, a.max, raiz, a.ate)
        skill = versao_da_skill()
        if skill["skill_alterada"]:
            sys.exit("A pasta da skill tem alteração não commitada: commite antes, para a versão ficar registrada.")
        outras = {ler_json(f)["skill_commit"] for f in EXECUCOES.glob("Q*/*/execucao.json")} - {skill["skill_commit"]}
        if outras:
            sys.exit(f"Há execuções feitas com outra versão da skill ({', '.join(sorted(outras))}); "
                     f"a atual é {skill['skill_commit']}. Todas precisam da mesma.")
        banco = questoes()
        anotar(raiz, f"RODADA: etapas {' '.join(a.etapa)}, skill {skill['skill_commit']}, até {a.ate}")
        # Etapa por etapa: as execucoes que faltam e, em seguida, o juiz do que ficou pendente.
        for e in a.etapa:
            for q, m in fila([e]):
                if feita(q, m):
                    continue
                if feitas >= a.max:
                    raise Parar(f"teto de {a.max} execuções desta rodada")
                no_horario(a.ate)
                print(f"[{feitas + 1}] {q} {m}, início {datetime.now():%H:%M}", flush=True)
                feitas += executar(q, m, raiz, banco)
            if not a.sem_juiz:
                julgar(a.modelo_juiz, 10 ** 6, raiz, a.ate)
        anotar(raiz, f"FIM DA RODADA: a fila acabou; {feitas} execução(ões) nesta rodada.")
    except Parar as p:
        anotar(raiz, f"FIM DA RODADA: {p}; {feitas} execução(ões) nesta rodada.")
    finally:
        acordado(False)


if __name__ == "__main__":
    main()
