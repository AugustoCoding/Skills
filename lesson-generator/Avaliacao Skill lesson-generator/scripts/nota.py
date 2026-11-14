"""Calcula as notas de todas as execucoes registradas e escreve o resumo.

    python nota.py

Le execucoes/Qnn/modelo/ (execucao.json, inventario.json) e as respostas do
juiz em juiz/respostas/. Escreve resultados/execucoes.csv, uma linha por
execucao, e resultados/RESUMO.md, com as medias por modelo, os intervalos de
confianca e as comparacoes pareadas. A definicao da metrica esta no README.
Biblioteca padrao apenas.
"""

import csv
import random
import sys
from math import comb
from statistics import mean, median

from comum import EXECUCOES, JUIZ, MODELOS, RESULTADOS, SECOES, ler_json, questoes
from pares import resultados as pares_resultados

# Fator de tempo: vale 1 ate T_ALVO e cai em linha reta ate zero em T_ZERO.
# O alvo de 5 min e o dos testes da skill; aos 12 min a licao ja nao vale a espera.
T_ALVO, T_ZERO = 5 * 60, 12 * 60
ORDEM = ["haiku", "sonnet", "opus", "fable"]


def fator_tempo(t):
    return max(0.0, min(1.0, (T_ZERO - t) / (T_ZERO - T_ALVO)))


def avaliar(pasta):
    """As medidas de uma execucao. Sem juiz, a conta usa so os itens decididos por regra."""
    ex = ler_json(pasta / "execucao.json")
    itens = ler_json(pasta / "inventario.json")
    resposta = JUIZ / "respostas" / f"{ex['codigo_juiz']}.json"
    julgado = resposta.exists()
    outros = []
    if julgado:
        r = ler_json(resposta)
        outros = r.get("outros_erros", [])
        for x in itens:
            if x["estado"] is None:
                v = r.get("itens", {}).get(x["id"])
                x["estado"] = v if v in ("ok", "errado", "faltou", "na") else None
    linha = {"questao": ex["questao"], "modelo": ex["modelo"], "tempo_s": ex["tempo_s"],
             "entregou": int(ex["entregou"]), "julgado": int(julgado),
             "tokens_saida": ex.get("tokens_saida", ""), "palavras": ex.get("palavras", ""),
             "check_erros": len(ex.get("check_erros", [])), "check_avisos": len(ex.get("check_avisos", []))}
    if not ex["entregou"]:
        linha.update({f"completude_{s}": 0.0 for s in SECOES}, completude=0.0, erro=1.0,
                     respostas_certas=0.0, qualidade=0.0, itens=0, pendentes=0)
    else:
        validos = [x for x in itens if x["estado"] in ("ok", "errado", "faltou")]
        qual, comp = [], []
        for s in SECOES:
            sec = [x for x in validos if x["secao"] == s]
            # Um erro solto apontado pelo juiz conta como um item errado da secao.
            extra = sum(1 for e in outros if e.get("secao") == s)
            n = len(sec) + extra
            presentes = sum(x["estado"] != "faltou" for x in sec) + extra
            linha[f"itens_{s}"] = n
            linha[f"explicados_{s}"] = presentes
            linha[f"completude_{s}"] = presentes / n if n else 0.0
            comp.append(linha[f"completude_{s}"])
            qual.append(sum(x["estado"] == "ok" for x in sec) / n if n else 0.0)
        errados = sum(x["estado"] == "errado" for x in validos) + len(outros)
        presentes = sum(x["estado"] != "faltou" for x in validos) + len(outros)
        resp = [x for x in itens if x["id"].startswith("R.resposta.")]
        linha.update(completude=mean(comp), erro=errados / presentes if presentes else 1.0,
                     respostas_certas=sum(x["estado"] == "ok" for x in resp) / len(resp) if resp else 0.0,
                     qualidade=mean(qual), itens=len(validos) + len(outros),
                     pendentes=sum(x["estado"] is None for x in itens))
    linha["fator_tempo"] = fator_tempo(linha["tempo_s"])
    linha["indice"] = linha["qualidade"] * linha["fator_tempo"]
    return linha


def intervalo(valores, n=5000):
    """Intervalo de 95% da media, por reamostragem das questoes (bootstrap)."""
    if len(valores) < 3:
        return None
    rng = random.Random(2026)
    medias = sorted(mean(rng.choices(valores, k=len(valores))) for _ in range(n))
    return medias[int(0.025 * n)], medias[int(0.975 * n)]


def p_sinais(vitorias, derrotas):
    """Teste dos sinais, bicaudal: a chance de um placar tao desigual se os modelos fossem iguais."""
    n = vitorias + derrotas
    if n == 0:
        return 1.0
    k = max(vitorias, derrotas)
    return min(1.0, 2 * sum(comb(n, i) for i in range(k, n + 1)) / 2 ** n)


def pct(x):
    return f"{100 * x:.1f}%".replace(".", ",")


def com_ic(valores, formato=pct):
    ic = intervalo(valores)
    return formato(mean(valores)) + (f" ({formato(ic[0])} a {formato(ic[1])})" if ic else "")


def minutos(t):
    return f"{int(t // 60)} min {int(t % 60):02d} s"


def comparacao_direta(modelos):
    """O placar da comparacao direta do juiz, fora do indice, e a conferencia do vies de posicao."""
    pares = pares_resultados()
    julgados = [p for p in pares if p["vencedor"]]
    if not julgados:
        return []
    out = ["", "## Comparação direta", "",
           "O juiz lê as duas lições da mesma questão, sem saber os modelos, e diz qual ensinaria melhor um "
           "iniciante ([COMPARACAO.md](../juiz/COMPARACAO.md)). É um juízo de conjunto, sem lista de itens, "
           "e fica fora do índice: se concordar com as comparações pareadas acima, uma confirma a outra.", "",
           "| Par | Questões julgadas | Placar (vitórias–empates–derrotas) | p (teste dos sinais) |",
           "|---|---|---|---|"]
    for i, a in enumerate(modelos):
        for b in modelos[i + 1:]:
            ps = [p for p in julgados if {p["a"], p["b"]} == {a, b}]
            if not ps:
                continue
            v = sum(p["vencedor"] == a for p in ps)
            d = sum(p["vencedor"] == b for p in ps)
            e = len(ps) - v - d
            out.append(f"| {a} × {b} | {len(ps)} | {v}–{e}–{d} | {p_sinais(v, d):.3f} |".replace(".", ","))
    pos = [p["posicao"] for p in julgados if p["posicao"]]
    if pos:
        n1 = pos.count("1")
        out += ["", f"Viés de posição: a lição mostrada em primeiro venceu {n1} de {len(pos)} comparações "
                    f"com vencedor (p = {p_sinais(n1, len(pos) - n1):.3f}; perto de metade é o esperado).".replace(".", ",", 1)]
    falta = len(pares) - len(julgados)
    if falta:
        out += ["", f"> {falta} comparação(ões) ainda sem resposta do juiz."]
    out += ["", "<details><summary>Por que o juiz decidiu cada par</summary>", ""]
    for p in julgados:
        ordem = f" ({p['ordem']})" if p.get("ordem") else ""
        out.append(f"- **{p['questao']} {p['a']} × {p['b']}**: {p['vencedor']}{ordem}. {p['por_que']}")
    out += ["", "</details>"]
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    banco = questoes()
    linhas = [avaliar(p) for q in sorted(EXECUCOES.glob("Q*")) for p in sorted(q.iterdir())
              if (p / "execucao.json").exists()]
    if not linhas:
        sys.exit("Nenhuma execução registrada em execucoes/.")
    RESULTADOS.mkdir(exist_ok=True)
    campos = sorted({k for l in linhas for k in l}, key=lambda k: (k not in ("questao", "modelo"), k))
    with open(RESULTADOS / "execucoes.csv", "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=campos, delimiter=";")
        w.writeheader()
        for l in linhas:
            w.writerow({k: (f"{v:.4f}".replace(".", ",") if isinstance(v, float) else v) for k, v in l.items()})

    modelos = [m for m in ORDEM if any(l["modelo"] == m for l in linhas)]
    por = {m: {l["questao"]: l for l in linhas if l["modelo"] == m} for m in modelos}
    out = ["# Resultado da avaliação por modelo", "",
           f"{len(linhas)} execuções, {len({l['questao'] for l in linhas})} questões. "
           "Entre parênteses, o intervalo de 95% da média, por reamostragem das questões. "
           "A definição de cada medida está no [README](../README.md).", ""]
    sem_juiz = [f"{l['questao']} {l['modelo']}" for l in linhas if l["entregou"] and not l["julgado"]]
    if sem_juiz:
        out += [f"> **Parcial.** {len(sem_juiz)} execução(ões) ainda sem o juiz ({', '.join(sem_juiz[:8])}"
                f"{'…' if len(sem_juiz) > 8 else ''}): nelas a conta usa só os itens decididos por regra.", ""]

    out += ["## Por modelo", "",
            "| Modelo | Execuções | Entregues | Tempo mediano (mín. a máx.) | Completude | Erro | Respostas certas | Qualidade | Índice |",
            "|---|---|---|---|---|---|---|---|---|"]
    for m in modelos:
        ls = list(por[m].values())
        t = [l["tempo_s"] for l in ls]
        out.append(f"| {MODELOS[m]} | {len(ls)} | {sum(l['entregou'] for l in ls)} | "
                   f"{minutos(median(t))} ({minutos(min(t))} a {minutos(max(t))}) | "
                   + " | ".join(com_ic([l[k] for l in ls]) for k in
                                ("completude", "erro", "respostas_certas", "qualidade", "indice")) + " |")

    out += ["", "## Completude por seção", "",
            "Itens explicados sobre itens devidos, somados nas questões de cada modelo.", "",
            "| Modelo | " + " | ".join(SECOES.values()) + " |", "|---|---|---|---|"]
    for m in modelos:
        cel = []
        for s in SECOES:
            a = sum(l.get(f"explicados_{s}", 0) for l in por[m].values())
            b = sum(l.get(f"itens_{s}", 0) for l in por[m].values())
            cel.append(f"{a} de {b} ({pct(a / b)})" if b else "–")
        out.append(f"| {MODELOS[m]} | " + " | ".join(cel) + " |")

    if len(modelos) > 1:
        out += ["", "## Comparações pareadas", "",
                "Só as questões que os dois modelos fizeram. A diferença é a do índice (primeiro menos segundo); "
                "o placar conta em quantas questões cada um teve o índice maior.", "",
                "| Par | Questões | Diferença média do índice | Placar (vitórias–empates–derrotas) | p (teste dos sinais) |",
                "|---|---|---|---|---|"]
        for i, a in enumerate(modelos):
            for b in modelos[i + 1:]:
                comuns = sorted(set(por[a]) & set(por[b]))
                if not comuns:
                    continue
                d = [por[a][q]["indice"] - por[b][q]["indice"] for q in comuns]
                v, e, p = sum(x > 1e-9 for x in d), sum(abs(x) <= 1e-9 for x in d), sum(x < -1e-9 for x in d)
                ic = intervalo(d)
                dif = f"{100 * mean(d):+.1f} pontos".replace(".", ",")
                if ic:
                    dif += f" ({100 * ic[0]:+.1f} a {100 * ic[1]:+.1f})".replace(".", ",")
                valor_p = f"{p_sinais(v, p):.3f}".replace(".", ",")
                out.append(f"| {a} × {b} | {len(comuns)} | {dif} | {v}–{e}–{p} | {valor_p} |")

    out += comparacao_direta(modelos)

    out += ["", "## Por questão", "",
            "Índice de cada execução (qualidade × fator de tempo) e, entre parênteses, o tempo.", "",
            "| Questão | Disciplina | Tipo de problema | " + " | ".join(modelos) + " |",
            "|---|---|---|" + "---|" * len(modelos)]
    for q in sorted({l["questao"] for l in linhas}):
        cel = [f"{pct(por[m][q]['indice'])} ({minutos(por[m][q]['tempo_s'])})" if q in por[m] else "–"
               for m in modelos]
        out.append(f"| {q} | {banco[q]['disciplina']} | {banco[q]['tipo']} | " + " | ".join(cel) + " |")

    (RESULTADOS / "RESUMO.md").write_text("\n".join(out) + "\n", encoding="utf-8")
    print("\n".join(out[4:4 + 6 + len(modelos)]))
    print(f"\nGravados: resultados/execucoes.csv e resultados/RESUMO.md ({len(linhas)} execuções).")


if __name__ == "__main__":
    main()
