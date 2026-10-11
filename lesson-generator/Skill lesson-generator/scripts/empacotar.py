"""Junta a lição e os componentes num arquivo HTML único, e o entrega.

    python empacotar.py <rascunho.html> [--saida <arquivo.html>]

Troca cada <link rel="stylesheet" href="…"> e cada <script src="…"> locais
pelo conteúdo do arquivo, embutido, e tira os comentários. O resultado abre com dois cliques, em
qualquer lugar, sem pasta assets/ ao lado. Só o editor usa a internet, para
baixar o Python na primeira vez.

Sem --saida, grava onde o nova_licao.py anotou (entrega.txt, ao lado do
rascunho) e, entregue a lição, apaga o rascunho: ela não é editada depois.
"""

import argparse
import os
import re
import shutil
import stat
import sys
from pathlib import Path
from urllib.parse import unquote


def apagar(pasta):
    """Apaga uma pasta mesmo com itens somente leitura (comum no OneDrive)."""
    def liberar(funcao, caminho, _):
        os.chmod(caminho, stat.S_IWRITE)
        funcao(caminho)
    shutil.rmtree(pasta, onerror=liberar)


# Comentários são para quem escreve, não para o aluno: a entrega sai sem eles.
# No JS, só os de linha inteira (/* … */ e //), que nunca estão dentro de um
# texto; o comentário no fim de uma linha de código fica. O Python dos blocos
# <pre> não é tocado: os comentários dele ensinam.
BLOCO_JS = re.compile(r"^[ \t]*/\*(?:(?!\*/).)*\*/[ \t]*\n", re.M | re.S)
LINHA_JS = re.compile(r"^[ \t]*//[^\n]*\n", re.M)


def sem_comentarios_js(js):
    return LINHA_JS.sub("", BLOCO_JS.sub("", js))


def sem_comentarios_css(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def sem_comentarios(html):
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    html = re.sub(r"(<script\b[^>]*>)(.*?)(</script>)",
                  lambda m: m.group(1) + sem_comentarios_js(m.group(2)) + m.group(3), html, flags=re.S)
    html = re.sub(r"(<style\b[^>]*>)(.*?)(</style>)",
                  lambda m: m.group(1) + sem_comentarios_css(m.group(2)) + m.group(3), html, flags=re.S)
    return re.sub(r"\n[ \t]*\n(?:[ \t]*\n)+", "\n\n", html)


def local(url):
    return url and not re.match(r"[a-z]+:|//", url, re.I)


def main():
    # No Windows, a saída redirecionada sai em cp1252 e quebra os acentos.
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description="Empacota a lição num arquivo único.")
    ap.add_argument("rascunho", help="a lição escrita, com os componentes em ./assets/")
    ap.add_argument("--saida", help="onde gravar (padrão: o que o nova_licao.py anotou)")
    a = ap.parse_args()

    origem = Path(a.rascunho).resolve()
    base = origem.parent
    html = origem.read_text(encoding="utf-8")

    sobrescrever = False
    if a.saida:
        saida = Path(a.saida).resolve()
    else:
        anotado = base / "entrega.txt"
        if not anotado.exists():
            sys.exit("ERRO: sem --saida e sem entrega.txt ao lado do rascunho: diga onde gravar.")
        linhas = anotado.read_text(encoding="utf-8").splitlines()
        saida, sobrescrever = Path(linhas[0]), "--sobrescrever" in linhas[1:]
    if saida.exists() and not sobrescrever and not a.saida:
        sys.exit(f"ERRO: {saida} já existe.")

    faltando = []

    def ler(url):
        arq = base / unquote(url)
        if not arq.exists():
            faltando.append(url)
            return None
        return arq.read_text(encoding="utf-8")

    def css(m):
        url = re.search(r'href="([^"]+)"', m.group(0)).group(1)
        if not local(url):
            return m.group(0)
        conteudo = ler(url)
        return m.group(0) if conteudo is None else f"<style>\n{conteudo}\n</style>"

    def js(m):
        url = m.group(1)
        if not local(url):
            return m.group(0)
        conteudo = ler(url)
        if conteudo is None:
            return m.group(0)
        # Um script embutido não pode conter o fechamento da própria tag.
        return "<script>\n" + conteudo.replace("</script", "<\\/script") + "\n</script>"

    html = re.sub(r'<link\b[^>]*rel="stylesheet"[^>]*>', css, html)
    html = re.sub(r'<script\b[^>]*\bsrc="([^"]+)"[^>]*>\s*</script>', js, html)

    if faltando:
        sys.exit("ERRO: componentes que não existem ao lado do rascunho: " + ", ".join(faltando))
    restos = [u for u in re.findall(r'(?:src|href)="([^"#]+)"', html) if local(u)]
    if restos:
        sys.exit("ERRO: ainda há referências a arquivos locais: " + ", ".join(restos))

    html = sem_comentarios(html)
    saida.parent.mkdir(parents=True, exist_ok=True)
    saida.write_text(html, encoding="utf-8", newline="\n")
    print(f"Lição entregue: {saida} ({saida.stat().st_size // 1024} KB, arquivo único)")
    if not a.saida and base.name.startswith(".rascunho-"):
        # Um processo dentro da pasta a trava no Windows: este sai dela, e se
        # outro (o terminal que rodou o script) estiver lá, o erro diz o que fazer.
        os.chdir(base.parent)
        try:
            apagar(base)
            print("Rascunho apagado.")
        except PermissionError:
            sys.exit(f"AVISO: a lição foi entregue, mas a pasta {base} não pôde ser apagada: "
                     "algum terminal está dentro dela. Saia dela e apague-a.")


if __name__ == "__main__":
    main()
