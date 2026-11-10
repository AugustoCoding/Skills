"""Prepara as execucoes: escreve os prompts e cria as pastas vazias das sessoes.

    python preparar.py                          so escreve questoes/PROMPTS.md
    python preparar.py --pastas ~/avaliacao-lesson-generator
    python preparar.py --pastas ~/avaliacao-lesson-generator --bloco A --modelos haiku sonnet opus

Cada sessao de teste roda numa pasta propria, vazia e fora do repositorio:
<pastas>/Q07-sonnet. Sem --bloco, cria as dos dois blocos. Biblioteca padrao apenas.
"""

import argparse
import sys
from pathlib import Path

from comum import EXECUCOES, MODELOS, QUESTOES, questoes


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser()
    ap.add_argument("--pastas")
    ap.add_argument("--bloco", choices=["A", "B"])
    ap.add_argument("--modelos", nargs="+", choices=sorted(MODELOS), default=["haiku", "sonnet", "opus"])
    a = ap.parse_args()
    banco = questoes()

    out = ["# Prompts da avaliação", "",
           "Gerado por `scripts/preparar.py` a partir de `questoes.json`: não edite à mão. "
           "Cole o bloco inteiro como primeira mensagem de uma sessão nova, numa pasta vazia.", ""]
    for q in banco.values():
        out += [f"## {q['id']} · bloco {q['bloco']} · {q['disciplina']}", "",
                "```text", "/lesson-generator " + q["enunciado"], "```", ""]
    (QUESTOES / "PROMPTS.md").write_text("\n".join(out), encoding="utf-8")
    print(f"questoes/PROMPTS.md: {len(banco)} prompts.")

    if a.pastas:
        raiz = Path(a.pastas).expanduser()
        criadas = 0
        for q in banco.values():
            if a.bloco and q["bloco"] != a.bloco:
                continue
            for m in a.modelos:
                if (EXECUCOES / q["id"] / m / "execucao.json").exists():
                    continue                              # ja registrada
                p = raiz / f"{q['id']}-{m}"
                if not p.exists():
                    p.mkdir(parents=True)
                    criadas += 1
        print(f"{criadas} pasta(s) criada(s) em {raiz}.")


if __name__ == "__main__":
    main()
