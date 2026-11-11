"""Monta os pacotes da comparacao direta: duas licoes da mesma questao, sem o nome dos modelos.

    python pares.py          monta os pacotes que faltam e mostra quantos ha

Para cada questao, cada par de modelos que entregaram licao vira um pacote em
juiz/pares/pendentes/<codigo>.md, com as duas licoes em texto, na ordem 1 e 2
sorteada (fixa por par, pelo codigo). Quem e 1 e quem e 2 fica fora da pasta do
juiz, em execucoes/Qnn/pares.json. O juiz segue juiz/COMPARACAO.md e grava
juiz/pares/respostas/<codigo>.json. Um modelo que nao entregou perde o par sem
pacote. Biblioteca padrao apenas.
"""

import hashlib
import sys
from itertools import combinations

from comum import EXECUCOES, JUIZ, gravar_json, ler_json, questoes

PARES = JUIZ / "pares"
ORDEM = ["haiku", "sonnet", "opus", "fable"]


def texto_da_licao(codigo):
    """A licao em texto, como esta no pacote do juiz dos itens."""
    pacote = (JUIZ / "pendentes" / f"{codigo}.md").read_text(encoding="utf-8")
    return pacote.split("\n## Lição\n", 1)[1].strip()


def execucoes(q):
    """Os modelos registrados numa questao, na ordem fixa, com o execucao.json de cada um."""
    out = {}
    for m in ORDEM:
        f = EXECUCOES / q / m / "execucao.json"
        if f.exists():
            out[m] = ler_json(f)
    return out


def codigo_do_par(q, a, b):
    return hashlib.sha1(f"{q}/{a}/{b}/comparacao".encode()).hexdigest()[:6]


def montar():
    """Escreve os pacotes que faltam. Devolve quantos foram escritos."""
    banco = questoes()
    novos = 0
    for pasta in sorted(EXECUCOES.glob("Q*")):
        q = pasta.name
        ex = execucoes(q)
        mapa_arq = pasta / "pares.json"
        mapa = ler_json(mapa_arq) if mapa_arq.exists() else {}
        for a, b in combinations(ex, 2):
            if not (ex[a]["entregou"] and ex[b]["entregou"]):
                continue
            codigo = codigo_do_par(q, a, b)
            if codigo in mapa and (PARES / "pendentes" / f"{codigo}.md").exists():
                continue
            # A ordem sai do codigo: fixa para o par, e metade dos pares com cada modelo em primeiro.
            um, dois = (a, b) if int(codigo, 16) % 2 == 0 else (b, a)
            linhas = [f"# Comparação {codigo}", "",
                      f"Compare conforme `juiz/COMPARACAO.md` e grave a resposta em "
                      f"`juiz/pares/respostas/{codigo}.json`.", "",
                      "# Enunciado enviado ao modelo", "", banco[q]["enunciado"], ""]
            for n, m in (("1", um), ("2", dois)):
                linhas += ["", f"==================== LIÇÃO {n} ====================", "",
                           texto_da_licao(ex[m]["codigo_juiz"]), "",
                           f"==================== FIM DA LIÇÃO {n} ====================", ""]
            (PARES / "pendentes").mkdir(parents=True, exist_ok=True)
            (PARES / "pendentes" / f"{codigo}.md").write_text("\n".join(linhas), encoding="utf-8")
            mapa[codigo] = {"1": um, "2": dois}
            novos += 1
        if mapa:
            gravar_json(mapa_arq, mapa)
    return novos


def resultados():
    """Uma linha por par de cada questao: os dois modelos, o vencedor (ou empate) e a posicao dele."""
    out = []
    for pasta in sorted(EXECUCOES.glob("Q*")):
        q = pasta.name
        ex = execucoes(q)
        mapa = ler_json(pasta / "pares.json") if (pasta / "pares.json").exists() else {}
        for a, b in combinations(ex, 2):
            linha = {"questao": q, "a": a, "b": b, "vencedor": None, "posicao": None, "por_que": ""}
            if not ex[a]["entregou"] or not ex[b]["entregou"]:
                if ex[a]["entregou"] != ex[b]["entregou"]:
                    linha.update(vencedor=a if ex[a]["entregou"] else b, por_que="o outro não entregou lição")
                else:
                    linha.update(vencedor="empate", por_que="nenhum entregou lição")
                out.append(linha)
                continue
            codigo = codigo_do_par(q, a, b)
            resposta = PARES / "respostas" / f"{codigo}.json"
            if codigo not in mapa or not resposta.exists():
                out.append(linha)
                continue
            try:
                r = ler_json(resposta)
            except ValueError:
                out.append(linha)
                continue
            linha["ordem"] = f"lição 1 = {mapa[codigo]['1']}, lição 2 = {mapa[codigo]['2']}"
            melhor = str(r.get("melhor", "")).strip().lower()
            if melhor in ("1", "2"):
                linha.update(vencedor=mapa[codigo][melhor], posicao=melhor)
            elif melhor == "empate":
                linha.update(vencedor="empate")
            linha["por_que"] = r.get("por_que", "")
            out.append(linha)
    return out


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    n = montar()
    total = len(list((PARES / "pendentes").glob("*.md"))) if (PARES / "pendentes").exists() else 0
    feitos = len(list((PARES / "respostas").glob("*.json"))) if (PARES / "respostas").exists() else 0
    print(f"{n} pacote(s) novo(s); {total} no total, {feitos} com resposta.")


if __name__ == "__main__":
    main()
