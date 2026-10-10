"""Monta o rascunho de uma lição nova e anota para onde ela vai quando pronta.

    python nova_licao.py <nome do exercício> [pasta]

O rascunho fica em <pasta>/.rascunho-<nome>/: o template como <nome>.html e a
cópia dos componentes em assets/. É lá que a lição é escrita e conferida
(dentro da pasta de trabalho, para editar sem pedir permissão). Depois,
empacotar.py junta tudo num arquivo único, grava <pasta>/<nome>.html e apaga
o rascunho: o aluno recebe um arquivo só.

<pasta> é a que o aluno indicou; sem ela, ./licoes. A entrega vai DIRETAMENTE
nessa pasta, nunca numa subpasta dela. O nome vira kebab-case ("Partida de
um CSTR" -> partida-de-um-cstr.html). Não sobrescreve uma lição que já
exista: para isso, --sobrescrever.
"""

import argparse
import os
import re
import shutil
import stat
import sys
import unicodedata
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent


def apagar(pasta):
    """Apaga uma pasta mesmo com itens somente leitura (comum no OneDrive)."""
    def liberar(funcao, caminho, _):
        os.chmod(caminho, stat.S_IWRITE)
        funcao(caminho)
    shutil.rmtree(pasta, onerror=liberar)


def kebab(texto):
    sem_acento = unicodedata.normalize("NFKD", texto).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", sem_acento.lower()).strip("-")


def main():
    # No Windows, a saída redirecionada sai em cp1252 e quebra os acentos.
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description="Monta o rascunho de uma lição nova.")
    ap.add_argument("nome", help="nome do exercício; vira o nome do arquivo, em kebab-case")
    ap.add_argument("pasta", nargs="?", default="licoes", help="a pasta que o aluno indicou (padrão: ./licoes)")
    ap.add_argument("--sobrescrever", action="store_true", help="substituir uma lição que já existe")
    a = ap.parse_args()

    pasta = Path(a.pasta).resolve()
    if SKILL in pasta.parents or pasta == SKILL:
        sys.exit("ERRO: a lição não pode ser entregue dentro da pasta da skill.")
    nome = kebab(a.nome)
    if not nome:
        sys.exit("ERRO: o nome do exercício ficou vazio depois de virar kebab-case.")
    entrega = pasta / (nome + ".html")
    if entrega.exists() and not a.sobrescrever:
        sys.exit(f"ERRO: {entrega} já existe. Para substituí-la, use --sobrescrever.")

    rascunho = pasta / f".rascunho-{nome}"
    if rascunho.exists():
        apagar(rascunho)                 # sobra de uma tentativa anterior
    rascunho.mkdir(parents=True)
    # Só o conteúdo, sem os atributos: a pasta da skill pode ser somente leitura.
    (rascunho / "assets").mkdir()
    for arq in (SKILL / "assets").iterdir():
        shutil.copyfile(arq, rascunho / "assets" / arq.name)
    licao = rascunho / (nome + ".html")
    shutil.copyfile(SKILL / "templates" / "licao.html", licao)
    # Para onde o empacotar.py grava a lição pronta.
    (rascunho / "entrega.txt").write_text(str(entrega) + ("\n--sobrescrever" if a.sobrescrever else ""), encoding="utf-8")

    print(f"Rascunho: {licao}")
    print(f"Entrega:  {entrega}  (escrita pelo empacotar.py)")
    print("Preencha o rascunho, confira com conferir.py e entregue com empacotar.py.")


if __name__ == "__main__":
    main()
