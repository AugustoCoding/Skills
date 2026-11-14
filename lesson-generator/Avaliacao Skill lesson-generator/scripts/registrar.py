"""Registra uma execucao: guarda a licao, tira o tempo do registro da sessao e monta o inventario.

    python registrar.py Q07 sonnet --pasta ~/avaliacao-lesson-generator/Q07-sonnet

--pasta e a pasta em que a sessao de teste rodou. Dela saem a licao (o .html
mais novo) e o registro da sessao do Claude Code (em ~/.claude/projects), de
onde vem o tempo, o modelo e os tokens. Para dar algum deles a mao:

    --licao ARQUIVO.html     a licao, se nao estiver na pasta
    --sessao ARQUIVO.jsonl   o registro da sessao
    --tempo 4:35             o tempo cronometrado, se nao houver registro
    --sem-licao              o modelo nao entregou licao (conta como falha)

Escreve em execucoes/Qnn/modelo/: licao.html, execucao.json e inventario.json.
Escreve em juiz/pendentes/ o pacote do juiz, com um codigo no lugar do modelo.
Biblioteca padrao apenas.
"""

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from comum import EXECUCOES, JUIZ, MODELOS, SKILL, gravar_json, questoes
from inventario import inventario


def pasta_do_registro(pasta):
    """A pasta de registros do Claude Code para uma pasta de trabalho."""
    return Path.home() / ".claude" / "projects" / re.sub(r"[^A-Za-z0-9]", "-", str(pasta))


def hora(s):
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def ler_sessao(arquivo):
    """Tempo do primeiro turno, modelo e tokens de um registro de sessao (.jsonl)."""
    linhas = [json.loads(l) for l in arquivo.read_text(encoding="utf-8").splitlines() if l.strip()]

    def pedido(r):
        # Um pedido do usuario: nem mensagem interna, nem resultado de ferramenta.
        if r.get("type") != "user" or r.get("isMeta") or r.get("isSidechain"):
            return False
        c = (r.get("message") or {}).get("content")
        return isinstance(c, str) or not any(isinstance(b, dict) and b.get("type") == "tool_result" for b in c or [])

    pedidos = [r for r in linhas if pedido(r)]
    if not pedidos:
        sys.exit(f"{arquivo.name}: nenhum pedido do usuário no registro.")
    inicio = hora(pedidos[0]["timestamp"])
    limite = hora(pedidos[1]["timestamp"]) if len(pedidos) > 1 else None
    respostas = [r for r in linhas if r.get("type") == "assistant" and not r.get("isSidechain")
                 and hora(r["timestamp"]) >= inicio and (limite is None or hora(r["timestamp"]) < limite)]
    if not respostas:
        sys.exit(f"{arquivo.name}: nenhuma resposta do modelo no registro.")
    # Uma chamada ao modelo aparece em varias linhas, todas com o mesmo id e o mesmo uso.
    chamadas = {}
    for r in respostas:
        m = r["message"]
        chamadas[m.get("id")] = (m.get("usage") or {}, m.get("model"))
    usos = [u for u, _ in chamadas.values()]
    comandos = sum(1 for r in respostas for b in r["message"].get("content") or []
                   if isinstance(b, dict) and b.get("type") == "tool_use")
    esforcos = {r.get("effort") for r in linhas if r.get("effort")}
    return {
        "tempo_s": round((hora(respostas[-1]["timestamp"]) - inicio).total_seconds(), 1),
        "fonte_do_tempo": "registro da sessão",
        "inicio": pedidos[0]["timestamp"],
        "modelos_no_registro": sorted({m for _, m in chamadas.values() if m}),
        "esforco": sorted(esforcos),
        "turnos_do_usuario": len(pedidos),
        "chamadas_ao_modelo": len(chamadas),
        "ferramentas_usadas": comandos,
        "tokens_saida": sum(u.get("output_tokens", 0) for u in usos),
        "tokens_entrada": sum(u.get("input_tokens", 0) for u in usos),
        "tokens_cache_escrita": sum(u.get("cache_creation_input_tokens", 0) for u in usos),
        "tokens_cache_leitura": sum(u.get("cache_read_input_tokens", 0) for u in usos),
    }


def versao_da_skill():
    """O commit da skill avaliada, e se a pasta dela tinha alteracao nao commitada."""
    def git(*args):
        r = subprocess.run(["git", "-C", str(SKILL), *args], capture_output=True, text=True, encoding="utf-8")
        return r.stdout.strip()
    # O ultimo commit que mexeu na pasta da skill, nao o HEAD do repositorio.
    return {"skill_commit": git("log", "-1", "--format=%h", "--", "."),
            "skill_alterada": bool(git("status", "--porcelain", "--", "."))}


def problemas_do_check(licao):
    """ERROs e WARNINGs do check.py da skill; os de componente nao valem para o arquivo unico."""
    r = subprocess.run([sys.executable, str(SKILL / "scripts" / "check.py"), str(licao)],
                       capture_output=True, text=True, encoding="utf-8")
    erros, avisos = [], []
    for l in r.stdout.splitlines():
        if re.search(r"does not load \w+\.js|does not exist next to the lesson", l):
            continue
        if l.startswith("ERROR"):
            erros.append(l[5:].strip())
        elif l.startswith("WARNING"):
            avisos.append(l[7:].strip())
    return erros, avisos


def pacote_do_juiz(codigo, questao, texto, itens):
    pendentes = [x for x in itens if x["estado"] is None]
    linhas = [f"# Pacote {codigo}", "",
              "Julgue conforme `juiz/JUIZ.md` e grave a resposta em `juiz/respostas/" + codigo + ".json`.", "",
              "## Enunciado enviado ao modelo", "", questao["enunciado"], "",
              "## Itens a julgar", ""]
    for x in pendentes:
        linhas.append(f"- `{x['id']}` — {x['texto']}" + (f" _(dica: {x['dica']})_" if x["dica"] else ""))
    linhas += ["", "## Lição", "", texto, ""]
    (JUIZ / "pendentes").mkdir(parents=True, exist_ok=True)
    (JUIZ / "pendentes" / f"{codigo}.md").write_text("\n".join(linhas), encoding="utf-8")
    return len(pendentes)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description="Registra uma execução da avaliação.")
    ap.add_argument("questao")
    ap.add_argument("modelo", choices=sorted(MODELOS))
    ap.add_argument("--pasta")
    ap.add_argument("--licao")
    ap.add_argument("--sessao")
    ap.add_argument("--tempo")
    ap.add_argument("--sem-licao", action="store_true")
    a = ap.parse_args()

    banco = questoes()
    if a.questao not in banco:
        sys.exit(f"Questão {a.questao} não existe em questoes.json.")
    questao = banco[a.questao]
    destino = EXECUCOES / a.questao / a.modelo
    destino.mkdir(parents=True, exist_ok=True)
    pasta = Path(a.pasta).expanduser().resolve() if a.pasta else None

    # O tempo.
    registro = {"questao": a.questao, "modelo": a.modelo, **versao_da_skill()}
    sessao = Path(a.sessao).expanduser() if a.sessao else None
    if sessao is None and pasta and pasta_do_registro(pasta).is_dir():
        arquivos = sorted(pasta_do_registro(pasta).glob("*.jsonl"), key=lambda f: f.stat().st_mtime)
        if len(arquivos) > 1:
            print(f"AVISO    {len(arquivos)} sessões nessa pasta; usando a mais nova. A pasta devia ter uma só.")
        sessao = arquivos[-1] if arquivos else None
    if sessao:
        registro.update(ler_sessao(sessao))
        if MODELOS[a.modelo] not in registro["modelos_no_registro"] or len(registro["modelos_no_registro"]) > 1:
            print(f"AVISO    o registro traz {registro['modelos_no_registro']}, e a execução foi rotulada {a.modelo}.")
        if registro["turnos_do_usuario"] > 1:
            print("AVISO    a sessão teve mais de um pedido; o tempo é o do primeiro turno.")
    if a.tempo:
        m, s = a.tempo.split(":")
        registro.update(tempo_s=int(m) * 60 + float(s), fonte_do_tempo="cronômetro")
    if "tempo_s" not in registro:
        sys.exit("Sem tempo: não achei o registro da sessão. Passe --sessao ou --tempo mm:ss.")

    # A licao.
    licao = Path(a.licao).expanduser() if a.licao else None
    if licao is None and pasta and not a.sem_licao:
        achadas = sorted((f for f in pasta.rglob("*.html") if ".draft-" not in str(f)),
                         key=lambda f: f.stat().st_mtime)
        licao = achadas[-1] if achadas else None
    registro["entregou"] = bool(licao) and not a.sem_licao
    codigo = hashlib.sha1(f"{a.questao}/{a.modelo}/lesson-generator".encode()).hexdigest()[:6]
    registro["codigo_juiz"] = codigo

    if not registro["entregou"]:
        print("Sem lição: a execução conta como falha (qualidade zero).")
        gravar_json(destino / "execucao.json", registro)
        gravar_json(destino / "inventario.json", [])
        return
    if licao.resolve() != (destino / "licao.html").resolve():
        shutil.copyfile(licao, destino / "licao.html")
    registro["arquivo_original"] = licao.name
    registro["tamanho_kb"] = round(licao.stat().st_size / 1024)

    itens, texto, saida, idioma = inventario(destino / "licao.html", questao)
    erros, avisos = problemas_do_check(destino / "licao.html")
    registro.update(idioma=idioma, idioma_esperado=questao["idioma"], palavras=len(texto.split()),
                    check_erros=erros, check_avisos=avisos)
    gravar_json(destino / "execucao.json", registro)
    gravar_json(destino / "inventario.json", itens)
    (destino / "saida-do-programa.txt").write_text(saida or "(o programa não rodou)", encoding="utf-8")
    pendentes = pacote_do_juiz(codigo, questao, texto, itens)

    por_regra = [x for x in itens if x["estado"]]
    respostas = [x for x in itens if x["id"].startswith("R.resposta.")]
    t = registro["tempo_s"]
    print(f"{a.questao} {a.modelo}: {int(t // 60)} min {int(t % 60):02d} s ({registro['fonte_do_tempo']})")
    print(f"  itens: {len(itens)}, dos quais {len(por_regra)} decididos por regra e {pendentes} para o juiz")
    print(f"  respostas conferidas com o gabarito: {sum(x['estado'] == 'ok' for x in respostas)} de {len(respostas)}")
    print(f"  check.py: {len(erros)} erro(s), {len(avisos)} aviso(s)")
    print(f"  pacote do juiz: juiz/pendentes/{codigo}.md")


if __name__ == "__main__":
    main()
