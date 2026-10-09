"""Monta a pasta de uma lição nova: os componentes e o template, no lugar certo.

    python nova_licao.py <nome do exercício> [pasta]

<pasta> é a que o aluno indicou; sem ela, ./licoes. A lição é escrita
DIRETAMENTE nessa pasta, nunca numa subpasta dela. O nome vira kebab-case
("Partida de um CSTR" -> partida-de-um-cstr.html).

Copia assets/ da skill inteiro (atualizando a cópia, se já existir) e o
template como <nome>.html. Não sobrescreve uma lição que já exista: para
reescrever uma, passe --sobrescrever.
"""

import argparse
import re
import shutil
import sys
import unicodedata
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent


def kebab(texto):
    sem_acento = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", sem_acento.lower()).strip("-")


def main():
    ap = argparse.ArgumentParser(description="Monta a pasta de uma lição nova.")
    ap.add_argument("nome", help="nome do exercício; vira o nome do arquivo, em kebab-case")
    ap.add_argument("pasta", nargs="?", default="licoes", help="a pasta que o aluno indicou (padrão: ./licoes)")
    ap.add_argument("--sobrescrever", action="store_true", help="reescrever uma lição que já existe")
    a = ap.parse_args()

    pasta = Path(a.pasta).resolve()
    if SKILL in pasta.parents or pasta == SKILL:
        sys.exit("ERRO: a pasta da lição não pode ficar dentro da pasta da skill.")

    nome = kebab(a.nome)
    if not nome:
        sys.exit("ERRO: o nome do exercício ficou vazio depois de virar kebab-case.")
    licao = pasta / (nome + ".html")
    if licao.exists() and not a.sobrescrever:
        sys.exit(f"ERRO: {licao} já existe. Para reescrevê-la, use --sobrescrever.")

    pasta.mkdir(parents=True, exist_ok=True)
    shutil.copytree(SKILL / "assets", pasta / "assets", dirs_exist_ok=True)
    shutil.copyfile(SKILL / "templates" / "licao.html", licao)

    print(f"Lição: {licao}")
    print(f"Componentes: {pasta / 'assets'}")
    print("Agora troque o conteúdo do template pelo do exercício.")


if __name__ == "__main__":
    main()
