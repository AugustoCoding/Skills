"""Confere uma lição pronta e diz, em português, o que corrigir.

    python conferir.py <lição.html>

ERRO   quebra a lição ou a promessa dela: corrija antes de entregar.
AVISO  provavelmente está errado: confira.
No fim, a lista dos números que aparecem no texto, com o contexto, para a
revisão de procedência (dado do enunciado, derivado, ou escolha sua).

Sai com código 1 se houver ERRO. Só biblioteca padrão.

A estrutura que ele espera é a do templates/licao.html. Quando a estrutura da
lição mudar, este arquivo muda junto, e a lição modelo do repositório tem de
passar nele sem erro.
"""

import html
import os
import re
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path

TITULOS = ["O modelo", "O código", "O resultado"]
PYODIDE = {"numpy", "scipy", "matplotlib", "pandas", "sympy", "math", "cmath", "statistics",
           "random", "itertools", "functools", "collections", "dataclasses", "fractions",
           "decimal", "time", "datetime", "json", "re", "io", "sys", "os", "typing"}
VAZIOS = {"meta", "link", "br", "img", "input", "hr", "source", "col", "wbr", "area", "base", "embed"}


# ---------- uma árvore mínima do HTML ----------

class No:
    def __init__(self, tag, attrs, pai):
        self.tag, self.attrs, self.pai, self.filhos = tag, dict(attrs), pai, []

    @property
    def classes(self):
        return (self.attrs.get("class") or "").split()

    def tem(self, cls):
        return cls in self.classes

    def texto(self):
        return "".join(f if isinstance(f, str) else f.texto() for f in self.filhos)

    def todos(self):
        for f in self.filhos:
            if isinstance(f, No):
                yield f
                yield from f.todos()

    def achar(self, tag=None, cls=None):
        return [n for n in self.todos() if (tag is None or n.tag == tag) and (cls is None or n.tem(cls))]

    def filhos_no(self, tag=None, cls=None):
        return [f for f in self.filhos if isinstance(f, No) and (tag is None or f.tag == tag) and (cls is None or f.tem(cls))]


class Leitor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.raiz = No("#doc", [], None)
        self.atual = self.raiz

    def handle_starttag(self, tag, attrs):
        n = No(tag, attrs, self.atual)
        self.atual.filhos.append(n)
        if tag not in VAZIOS:
            self.atual = n

    def handle_startendtag(self, tag, attrs):
        self.atual.filhos.append(No(tag, attrs, self.atual))

    def handle_endtag(self, tag):
        n = self.atual
        while n is not self.raiz and n.tag != tag:
            n = n.pai
        if n is not self.raiz:
            self.atual = n.pai

    def handle_data(self, data):
        self.atual.filhos.append(data)


# ---------- conferências ----------

erros, avisos = [], []


def erro(msg): erros.append(msg)
def aviso(msg): avisos.append(msg)


def codigo_de(no):
    # O bloco de código do passo: o <pre>, não um <code> no meio do texto.
    pres = no.achar("pre")
    return pres[0].texto() if pres else ""


def linhas_de_codigo(texto):
    return [l.rstrip() for l in texto.splitlines() if l.strip() and not l.strip().startswith("#")]


def argumentos_por_nome(codigo):
    """Os nomes passados como nome=valor DENTRO de uma chamada (rtol=, label=…)."""
    nomes, prof = [], 0
    sem_texto = re.sub(r"#[^\n]*|\"[^\"\n]*\"|'[^'\n]*'", "", codigo)
    for m in re.finditer(r"[()\[\]]|([A-Za-z_]\w*)\s*=(?!=)", sem_texto):
        t = m.group(0)
        if t in "([":
            prof += 1
        elif t in ")]":
            prof -= 1
        elif prof > 0 and m.group(1) not in nomes:
            nomes.append(m.group(1))
    return nomes


def numeros(texto):
    """Os números de um texto, como floats: '0,667' e '0.667', '1,7·10⁻⁹' e '1.7e-09', '93%'."""
    sup = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹⁻", "0123456789-")
    out = []
    for m in re.finditer(r"(\d+(?:[.,]\d+)?)\s*(?:·\s*10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)|[eE]([-+]?\d+))?", texto):
        base = m.group(1).replace(",", ".")
        exp = m.group(2).translate(sup) if m.group(2) else (m.group(3) or None)
        casas = len(base.split(".")[1]) if "." in base else 0
        out.append((float(base) * (10 ** int(exp) if exp else 1), casas, bool(exp), m.group(0)))
    return out


def conferir_estrutura(doc):
    h2 = [n.texto().strip() for n in doc.achar("h2") if n.pai and n.pai.tag == "body"]
    if h2 != TITULOS:
        erro(f"Os títulos das seções têm de ser exatamente {TITULOS}; estão {h2}.")

    corpo = doc.achar("body")[0] if doc.achar("body") else doc
    filhos = corpo.filhos_no()
    primeiro_h2 = next((i for i, n in enumerate(filhos) if n.tag == "h2"), None)
    if primeiro_h2 is None or not any(n.tag == "p" for n in filhos[:primeiro_h2]):
        erro("Falta a abertura: um parágrafo antes de \"O modelo\", situando o problema.")

    for ol in doc.achar("ol", "deducao"):
        itens = ol.filhos_no("li")
        for i, li in enumerate(itens, 1):
            if not any(p.achar("span", "tipo") for p in li.achar("p", "porque")):
                erro(f"Dedução: a etapa {i} não tem etiqueta de tipo (princípio, tradução, …).")
        if itens and not itens[-1].tem("final"):
            erro("Dedução: a última etapa deve ser a equação do modelo, com class=\"final\".")

    if not doc.achar("table"):
        aviso("Não há tabela de parâmetros.")

    # A técnica fecha o modelo: é o último bloco antes de "O código".
    tecnica = doc.achar("div", "tecnica")
    if not tecnica:
        erro("Falta a técnica (div.tecnica) no fim de \"O modelo\": o nome da ferramenta e por que ela serve.")
    else:
        palavras = len(tecnica[0].texto().split())
        if palavras > 110:
            aviso(f"A técnica tem {palavras} palavras: o normal são quatro ou cinco frases, até umas 100.")
        texto_tec = [p for p in tecnica[0].filhos_no("p") if not p.tem("tecnica-nome")]
        if not any(p.achar(cls="termo") for p in texto_tec):
            erro("A técnica não destaca o nome dela no texto (span.termo).")
        if not any(p.achar("code") for p in texto_tec):
            aviso("A técnica não diz em <code> o recurso de Python que a faz.")
        if not tecnica[0].achar("p", "tecnica-nome"):
            erro("A técnica não tem nome (p.tecnica-nome).")
        h2s = [i for i, n in enumerate(filhos) if n.tag == "h2"]
        if len(h2s) >= 2 and tecnica[0] is not filhos[h2s[1] - 1]:
            erro("A técnica tem de ser o último bloco de \"O modelo\", logo antes de \"O código\".")

    for cls in ("pense", "gancho"):
        if doc.achar(cls=cls):
            erro(f"A marcação .{cls} saiu da lição: tire-a.")


def conferir_codigo(doc, pasta):
    secoes = doc.achar("section", "codigo")
    if not secoes:
        erro("Falta a seção de código (section.codigo).")
        return None
    passos = secoes[0].filhos_no("div", "passo")
    if not passos:
        erro("A seção de código não tem passos.")
        return None
    for i, p in enumerate(passos, 1):
        if not p.filhos_no("h3"):
            erro(f"O passo {i} do código não tem título (h3).")
    if passos[-1].filhos_no("h3") and passos[-1].filhos_no("h3")[0].texto().strip() != "O programa completo":
        erro("O último passo do código tem de ser \"O programa completo\".")
        return None
    for i, p in enumerate(passos[:-1], 1):
        tit = p.filhos_no("h3")[0].texto().strip() if p.filhos_no("h3") else str(i)
        partes = [f.tag if f.tag == "pre" else (f.classes[0] if f.classes else f.tag) for f in p.filhos_no()]
        if "para-que" not in partes or "pre" not in partes or partes.index("para-que") > partes.index("pre"):
            erro(f"Passo \"{tit}\": falta p.para-que (a intenção) antes do código.")
        if "como" not in partes or ("pre" in partes and partes.index("como") < partes.index("pre")):
            erro(f"Passo \"{tit}\": falta p.como (a sintaxe) depois do código.")
        if not partes or partes[-1] != "agora":
            erro(f"Passo \"{tit}\": o passo deve terminar com p.agora (o que o programa passou a fazer).")
        # Todo argumento passado por nome (rtol=, events=…) é explicado no passo.
        prosa = " ".join(f.texto() for f in p.filhos_no() if f.tag != "pre")
        for nome in argumentos_por_nome(codigo_de(p)):
            if not re.search(r"\b" + re.escape(nome) + r"\b", prosa):
                erro(f"Passo \"{tit}\": o argumento {nome}= não é explicado no texto do passo.")

    if len(passos) - 1 > 6:
        aviso(f"O código tem {len(passos) - 1} passos antes do programa completo; o limite é seis.")

    programa = codigo_de(passos[-1])
    if not re.search(r"\bplt\.show\s*\(", programa):
        erro("O programa não desenha nenhuma figura: ele deve terminar com uma figura do matplotlib e plt.show(), "
             "para o aluno ver o resultado ao rodar no editor.")
    colados = "\n".join(codigo_de(p) for p in passos[:-1])
    a, b = linhas_de_codigo(colados), linhas_de_codigo(programa)
    if a != b:
        sobra = [l for l in a if l not in b][:3]
        falta = [l for l in b if l not in a][:3]
        msg = "Os passos colados em ordem não são o programa completo."
        if falta:
            msg += " Estão no programa e em nenhum passo: " + " | ".join(l.strip() for l in falta) + "."
        if sobra:
            msg += " Estão nos passos e não no programa: " + " | ".join(l.strip() for l in sobra) + "."
        erro(msg)

    for m in re.finditer(r"^\s*(?:from\s+(\w+)|import\s+(\w+))", programa, re.M):
        lib = m.group(1) or m.group(2)
        if lib not in PYODIDE:
            aviso(f"O programa importa \"{lib}\", que o editor (Pyodide) pode não ter: diga no passo que a importa que aquele trecho só roda no computador.")

    # Roda os passos colados, que é o que o aluno vai rodar no editor.
    with tempfile.TemporaryDirectory() as tmp:
        arq = Path(tmp) / "licao.py"
        arq.write_text(colados, encoding="utf-8")
        env = dict(os.environ, MPLBACKEND="Agg", PYTHONIOENCODING="utf-8")
        try:
            r = subprocess.run([sys.executable, str(arq)], capture_output=True, text=True,
                               encoding="utf-8", env=env, timeout=90, cwd=tmp)
        except subprocess.TimeoutExpired:
            erro("Os passos colados levaram mais de 90 s para rodar: o script está pesado demais.")
            return None
    if r.returncode != 0:
        ultima = (r.stderr.strip().splitlines() or ["(sem mensagem)"])[-1]
        erro(f"Os passos colados em ordem não rodam: {ultima}")
        return None
    return r.stdout


def conferir_resultado(doc, saida):
    resposta = doc.achar("div", "resposta")
    graficos = doc.achar(cls="grafico")
    if not resposta:
        erro("Falta a resposta (div.resposta) no começo de \"O resultado\".")
    elif graficos:
        ordem = list(doc.todos())
        if ordem.index(resposta[0]) > ordem.index(graficos[0]):
            erro("A resposta tem de vir antes da figura, no começo de \"O resultado\".")

    if resposta and saida is not None:
        # Vale o que o programa imprime e o que a tabela de parâmetros dá (os
        # dados do enunciado, como a pressão de operação, podem voltar na resposta).
        impressos = numeros(saida) + [n for t in doc.achar("table") for n in numeros(t.texto())]
        for valor, casas, cientifico, bruto in numeros(resposta[0].texto()):
            tol = abs(valor) * 0.006 if cientifico else 0.5 * 10 ** -casas + 1e-12
            if not any(abs(valor - v) <= tol for v, *_ in impressos):
                erro(f"A resposta cita \"{bruto.strip()}\", e nem o programa o imprime nem a tabela de parâmetros o tem: a resposta é o que o programa imprime.")

    controles = sum(len([c for c in (g.attrs.get("data-controles") or "").split(",") if c.strip()]) for g in graficos)
    if controles > 4:
        erro(f"A figura tem {controles} controles; o limite é quatro.")
    obs = [li for ol in doc.achar("ol", "observacoes") for li in ol.filhos_no("li")]
    for i, li in enumerate(obs, 1):
        if not li.filhos_no("h3"):
            erro(f"A observação {i} não tem título (h3): uma pergunta, ou a ação nas de controle.")
    no_codigo = sum(1 for li in obs if li.achar(cls="no-seu-codigo"))
    if controles and no_codigo < controles:
        erro(f"A figura tem {controles} controles e só {no_codigo} observação(ões) com \"no seu código\": cada controle precisa da sua.")
    leitura = len(obs) - no_codigo
    if obs and not 2 <= leitura <= 4:
        aviso(f"Há {leitura} observação(ões) de leitura da curva; o normal é de duas a quatro, mais uma por controle.")


def conferir_assets(doc, pasta):
    srcs = [n.attrs.get("src") for n in doc.achar("script") if n.attrs.get("src")]
    for nome in ["tema.js", "codigo.js", "editor.js"] + (["grafico.js"] if doc.achar(cls="grafico") else []):
        if not any(s and s.endswith(nome) for s in srcs):
            erro(f"A lição não carrega {nome}.")
    for s in srcs:
        if not re.match(r"https?:", s) and not (pasta / html.unescape(s).replace("%20", " ")).exists():
            erro(f"O componente {s} não existe ao lado da lição: copie os assets da skill.")


def conferir_placeholders(doc):
    # Texto fora de código: o que sobrar entre chaves é placeholder do template.
    fora = {"script", "style", "pre", "code", "head"}
    partes = []

    def visitar(n):
        if n.tag in fora:
            return
        for f in n.filhos:
            if isinstance(f, No):
                visitar(f)
            else:
                partes.append(f)

    visitar(doc)
    texto = " ".join(" ".join(partes).split())
    for m in list(re.finditer(r"\{[^{}]{1,300}\}", texto))[:5]:
        trecho = m.group(0) if len(m.group(0)) <= 70 else m.group(0)[:67] + "…}"
        erro(f"Ficou um placeholder do template: {trecho}")


def texto_fora_de_codigo(no):
    """O texto de um nó sem script, style, pre, code, math, sub e sup."""
    fora = {"script", "style", "pre", "code", "math", "sub", "sup"}
    partes = []

    def visitar(n):
        if n.tag in fora:
            return
        for f in n.filhos:
            if isinstance(f, No):
                visitar(f)
            else:
                partes.append(f)

    visitar(no)
    return " ".join(" ".join(partes).split())


# Um número do texto: nem o 1 de uma unidade ("1/min") nem o 10 de "·10⁻⁹".
NUMERO_TEXTO = r"(?<![·\d])\d+(?:[.,]\d+)?(?!\s*/\s*[^\W\d])"


def conferir_formato(doc):
    corpo = doc.achar("body")[0] if doc.achar("body") else doc
    pontos = sorted(set(re.findall(r"(?<![\d.])\d+\.\d+(?![\d.])", texto_fora_de_codigo(corpo))))
    if pontos:
        aviso("Números com ponto decimal no texto (" + ", ".join(pontos[:5]) +
              "): no texto da lição, use vírgula; o ponto fica só no código.")


def conferir_observacoes(doc, saida):
    """Números das observações de leitura: impressos pelo programa ou da tabela."""
    if saida is None:
        return
    conhecidos = numeros(saida) + [n for t in doc.achar("table") for n in numeros(t.texto())]
    soltos = []
    for ol in doc.achar("ol", "observacoes"):
        for li in ol.filhos_no("li"):
            if li.achar(cls="no-seu-codigo"):
                continue        # observação de controle: fala de outro cenário
            for p in li.filhos_no("p"):
                for m in re.finditer(NUMERO_TEXTO, texto_fora_de_codigo(p)):
                    for valor, casas, cientifico, bruto in numeros(m.group(0)):
                        tol = 0.5 * 10 ** -casas + 1e-12
                        if not any(abs(valor - v) <= tol for v, *_ in conhecidos) and bruto not in soltos:
                            soltos.append(bruto)
    if soltos:
        aviso("Números das observações que o programa não imprime e a tabela não tem: " +
              ", ".join(soltos[:6]) + ". Todo número citado é impresso pelo programa.")


def listar_numeros(doc):
    # Fora da conta: código, equações, subíndices (o 0 de C_A0) e o cabeçalho.
    ignorar = {"script", "style", "pre", "code", "math", "head", "title", "sub", "sup"}
    vistos, linhas = set(), []

    def visitar(n):
        if n.tag in ignorar:
            return
        for f in n.filhos:
            if isinstance(f, No):
                visitar(f)
            else:
                # Nem o 1 de uma unidade ("1/min", "1/τ") nem o 10 de "·10⁻⁹".
                for m in re.finditer(r"(?<![·\d])\d+(?:[.,]\d+)?(?!\s*/\s*[^\W\d])", f):
                    trecho = " ".join(f[max(0, m.start() - 35): m.end() + 25].split())
                    if trecho not in vistos:
                        vistos.add(trecho)
                        linhas.append(f"  {m.group(0):>8}   …{trecho}…")

    visitar(doc)
    return linhas


def main():
    # No Windows, a saída redirecionada sai em cp1252, que não tem ⁻ nem ·.
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) != 2:
        sys.exit("uso: python conferir.py <lição.html>")
    caminho = Path(sys.argv[1]).resolve()
    leitor = Leitor()
    leitor.feed(caminho.read_text(encoding="utf-8"))
    doc = leitor.raiz

    conferir_estrutura(doc)
    saida = conferir_codigo(doc, caminho.parent)
    conferir_resultado(doc, saida)
    conferir_assets(doc, caminho.parent)
    conferir_placeholders(doc)
    conferir_formato(doc)
    conferir_observacoes(doc, saida)

    for e in erros:
        print("ERRO   " + e)
    for a in avisos:
        print("AVISO  " + a)
    if not erros and not avisos:
        print("Nenhum erro nem aviso.")
    print("\nNúmeros no texto, para a revisão de procedência:")
    print("\n".join(listar_numeros(doc)) or "  (nenhum)")
    sys.exit(1 if erros else 0)


if __name__ == "__main__":
    main()
