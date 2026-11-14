"""O inventario de uma licao: tudo o que ela devia explicar, item por item.

A lista sai da propria licao, isto e, da solucao que o modelo em teste
produziu: os balancos que ele montou, os simbolos das equacoes dele, as
funcoes e os argumentos do programa dele, os controles da figura dele. So as
perguntas do enunciado e os valores esperados vem do banco de questoes.

Cada item tem uma secao (M modelo, C codigo, R resultado) e um estado:

    ok       explicado, e certo
    errado   explicado, mas errado
    faltou   devia estar e nao esta
    na       nao se aplica (sai da conta)
    None     depende de leitura: fica para o juiz

O que da para decidir por regra e decidido aqui; o resto vai para o juiz, com
uma dica. Biblioteca padrao apenas.
"""

import ast
import builtins
import re

from comum import check as carregar_check

ck = carregar_check()
Node = ck.Node

# Identificadores das equacoes que nao sao grandezas.
NAO_SIMBOLO = {"d", "∂", "e", "exp", "ln", "log", "sin", "cos", "tan", "sen", "tanh", "cosh", "sinh",
               "π", "Δ", "∑", "∫", "max", "min", "lim", "∞"}

CONSTRUCOES = [
    ("def", "definição de função com def"),
    ("return", "return: o que a função devolve"),
    ("lambda", "função anônima (lambda)"),
    ("for", "laço for"),
    ("while", "laço while"),
    ("if", "condição if"),
    ("compreensao", "compreensão de lista ou expressão geradora"),
    ("fstring", "f-string: texto com valores dentro de chaves"),
    ("indice", "índice entre colchetes, como y[0]"),
    ("fatia", "fatia entre colchetes, como x[1:] ou y[:, -1]"),
    ("desempacotamento", "desempacotamento: várias variáveis recebem de uma vez"),
    ("tupla", "tupla: valores entre parênteses, separados por vírgula"),
    ("lista", "lista: valores entre colchetes"),
    ("dicionario", "dicionário"),
    ("atributo", "atributo de um objeto, depois do ponto"),
    ("funcao_argumento", "função passada como argumento a outra função"),
    ("argumento_nomeado", "argumento passado por nome (nome=valor)"),
    ("potencia", "operador ** (potência)"),
    ("aumentada", "atribuição aumentada, como += "),
    ("import_as", "import … as: o apelido da biblioteca"),
    ("from_import", "from … import: trazer uma função pelo nome"),
    ("with", "bloco with"),
    ("try", "bloco try/except"),
]


def item(lista, id_, secao, texto, estado=None, dica=""):
    lista.append({"id": id_, "secao": secao, "texto": texto, "estado": estado,
                  "fonte": "regra" if estado else "juiz", "dica": dica})


def curto(s, n=48):
    s = " ".join(s.split())
    return s if len(s) <= n else s[:n - 1] + "…"


# ---------- o texto da licao, para o juiz ----------

BLOCO = {"p", "li", "h1", "h2", "h3", "div", "tr", "ul", "ol", "table", "section", "header", "pre"}


def equacao(n):
    """Uma equacao em MathML escrita em linha: fracoes com barra, indices com _ e ^."""
    if not isinstance(n, Node):
        return n
    f = [c for c in n.children if isinstance(c, Node)]
    if n.tag == "mfrac" and len(f) == 2:
        return "(" + equacao(f[0]) + ")/(" + equacao(f[1]) + ")"
    if n.tag == "msub" and len(f) == 2:
        return equacao(f[0]).strip() + "_" + equacao(f[1]).strip() + " "
    if n.tag == "msup" and len(f) == 2:
        return equacao(f[0]).strip() + "^(" + equacao(f[1]).strip() + ") "
    if n.tag == "msubsup" and len(f) == 3:
        return equacao(f[0]).strip() + "_" + equacao(f[1]).strip() + "^(" + equacao(f[2]).strip() + ") "
    if n.tag == "msqrt":
        return "√(" + " ".join(equacao(c) for c in n.children) + ")"
    if n.tag in ("munder", "mover") and len(f) == 2:      # a chave com o rotulo do termo
        return equacao(f[0]) + " {" + equacao(f[1]).strip() + "} "
    return " ".join(equacao(c) for c in n.children)


def texto_da_licao(doc):
    """A licao em texto corrido: titulos, rotulos das partes, codigo e equacoes em linha."""
    partes = []

    def visita(n):
        if n.tag in ("script", "style", "head", "title"):
            return
        if n.tag == "pre":
            partes.append("\n```\n" + n.text().strip("\n") + "\n```\n")
            return
        if n.tag == "math":
            partes.append(" ⟦" + " ".join(equacao(n).split()) + "⟧ ")
            return
        if n.tag in BLOCO:
            partes.append("\n")
        if n.tag in ("h1", "h2", "h3"):
            partes.append("#" * int(n.tag[1]) + " ")
        rotulos = [c for c in n.classes if c in ("problem", "technique", "technique-name", "answer",
                                                 "purpose", "how", "so-far", "in-your-code", "final",
                                                 "eq-block", "step", "sidenote")]
        if rotulos:
            partes.append("[" + " ".join(rotulos) + "] ")
        if n.has("eq-block") and n.attrs.get("data-title"):
            partes.append(n.attrs["data-title"] + ": ")
        if n.has("plot"):
            partes.append("[figura; controles: " + (n.attrs.get("data-controls") or "nenhum") + "] ")
        if n.has("kind"):
            partes.append("(" + n.text().strip() + ") ")
            return
        for c in n.children:
            if isinstance(c, Node):
                visita(c)
            else:
                partes.append(c)
        if n.tag == "td" or n.tag == "th":
            partes.append(" | ")

    corpo = doc.find("body")
    visita(corpo[0] if corpo else doc)
    texto = "".join(partes)
    texto = re.sub(r"[ \t]+", " ", texto)
    return re.sub(r"\n\s*\n+", "\n\n", texto).strip()


# ---------- modelo ----------

def simbolos_das_equacoes(blocos):
    """Os simbolos das equacoes, na ordem em que aparecem: base e subscrito."""
    vistos = []

    def nome(n):
        return "".join(n.text().split())

    def visita(n):
        if n.tag in ("msub", "msubsup", "msup"):
            f = [c for c in n.children if isinstance(c, Node)]
            if f and f[0].tag == "mi":
                s = nome(f[0])
                if n.tag != "msup" and len(f) > 1:
                    s += "_" + nome(f[1])
                if nome(f[0]) not in NAO_SIMBOLO and s not in vistos:
                    vistos.append(s)
                # O expoente pode trazer outro simbolo; o subscrito e parte do nome.
                for c in f[{"msub": 2, "msup": 1, "msubsup": 2}[n.tag]:]:
                    visita(c)
                return
        if n.tag == "mi":
            s = nome(n)
            if s and s not in NAO_SIMBOLO and s not in vistos:
                vistos.append(s)
            return
        if n.tag == "mtext":
            return
        for c in n.children:
            if isinstance(c, Node):
                visita(c)

    for b in blocos:
        for m in b.find("math"):
            visita(m)
    return vistos


def inventario_modelo(doc, programa, itens):
    derivacoes = doc.find("ol", "derivation")
    blocos = doc.find("div", "eq-block")

    if not derivacoes and not blocos:
        item(itens, "M.equacoes", "M", "o modelo traz ao menos um balanço derivado ou uma equação em bloco", "faltou")
    for i, ol in enumerate(derivacoes, 1):
        passos = ol.kids("li")
        tipos = [[c[5:] for s in li.find("span", "kind") for c in s.classes if c.startswith("kind-")]
                 for li in passos]
        item(itens, f"M.balanco{i}.principio", "M", f"balanço {i}: o primeiro passo é o princípio de conservação",
             "ok" if tipos and "principle" in tipos[0] else "faltou")
        item(itens, f"M.balanco{i}.traducao", "M", f"balanço {i}: há o passo de tradução das palavras em símbolos",
             "ok" if any("translation" in t for t in tipos) else "faltou")
        final = passos[-1] if passos and passos[-1].has("final") else None
        item(itens, f"M.balanco{i}.final", "M", f"balanço {i}: o último passo é a equação do modelo",
             "ok" if final else "faltou")
        item(itens, f"M.balanco{i}.leitura", "M",
             f"balanço {i}: a equação final vem com o parágrafo do que ela representa e do que implica",
             None if final and [p for p in final.kids("p") if not p.has("why")] else "faltou",
             "o parágrafo existe; diga se descreve o processo e uma implicação")
        for j, (li, t) in enumerate(zip(passos, tipos), 1):
            if "assumption" in t:
                item(itens, f"M.balanco{i}.hipotese{j}", "M",
                     f"balanço {i}, passo {j} (hipótese): diz o que aconteceria se ela não valesse",
                     dica=curto(" ".join(ck.text_outside_code(p) for p in li.find("p", "why")), 90))
    for i, b in enumerate(blocos, 1):
        item(itens, f"M.bloco{i}.nome", "M", f"equação complementar {i}: tem nome",
             "ok" if (b.attrs.get("data-title") or "").strip() else "faltou")
        item(itens, f"M.bloco{i}.origem", "M", f"equação complementar {i}: diz de onde vem e o que afirma",
             None if b.kids("p") else "faltou", curto(b.attrs.get("data-title") or "", 60))

    for s in simbolos_das_equacoes(derivacoes + blocos):
        item(itens, f"M.simbolo.{s}", "M",
             f"símbolo {s}: definido onde aparece pela primeira vez, em frase completa e com unidade",
             dica="marque na se não for uma grandeza (operador, índice, número)")

    # A tabela de parametros e a primeira tabela antes da secao de codigo.
    ordem = list(doc.all())
    codigo = doc.find("section", "code")
    limite = ordem.index(codigo[0]) if codigo else len(ordem)
    tabelas = [t for t in doc.find("table") if ordem.index(t) < limite]
    if not tabelas:
        item(itens, "M.tabela", "M", "há a tabela de parâmetros", "faltou")
    else:
        linhas = [tr for tb in tabelas[0].find("tbody") for tr in tb.kids("tr")]
        for i, tr in enumerate(linhas, 1):
            celulas = [td.text().strip() for td in tr.kids("td")]
            completa = len(celulas) >= 4 and all(celulas[:3]) and bool(tr.find("span", "source"))
            item(itens, f"M.parametro{i}", "M",
                 f"parâmetro {curto(celulas[0] if celulas else '?', 20)}: valor, unidade e procedência na tabela",
                 "ok" if completa else "faltou")
        # Cada constante numerica do programa tem de estar na tabela.
        na_tabela = [v for v, *_ in ck.numbers(tabelas[0].text(), prose=True)]
        for nome, valor in constantes_do_programa(programa):
            achou = any(abs(valor - v) <= 1e-9 + 1e-6 * abs(valor) for v in na_tabela)
            item(itens, f"M.constante.{nome}", "M",
                 f"o valor {nome} = {valor:g} do programa está na tabela de parâmetros",
                 "ok" if achou else None,
                 "" if achou else "não achei o número na tabela: pode estar em outra unidade; se não estiver, faltou")

    tecnica = doc.find("div", "technique")
    if not tecnica:
        item(itens, "M.tecnica", "M", "há o quadro da técnica no fim do modelo", "faltou")
    else:
        t = tecnica[0]
        item(itens, "M.tecnica.tipo", "M", "técnica: diz que tipo de problema matemático é, em palavras comuns")
        item(itens, "M.tecnica.nome", "M", "técnica: o nome da técnica vem destacado no texto",
             "ok" if any(p.find(cls="term") for p in t.kids("p") if not p.has("technique-name")) else "faltou")
        item(itens, "M.tecnica.porque", "M", "técnica: diz por que ela serve para este caso")
        item(itens, "M.tecnica.python", "M", "técnica: nomeia a função de Python e a biblioteca",
             None if t.find("code") else "faltou", "há um <code>; confirme função e biblioteca")
    termos = ("tolerância|tolerance|integrador|integrator|passo de integração|integration step|"
              "convergência|convergence|iteraç|iteration|resíduo|residual|chute inicial|initial guess|"
              "malha|mesh|discretiz")
    texto = ck.text_outside_code(doc)
    for t in sorted({m.group(0).lower() for m in re.finditer(termos, texto, re.I)}):
        item(itens, f"M.termo.{t}", "M",
             f"termo de método numérico \"{t}\": explicado em palavras comuns na primeira vez que aparece")


def constantes_do_programa(programa):
    """As atribuicoes de um numero a um nome, no nivel de cima do programa: os dados."""
    out = []
    try:
        arvore = ast.parse(programa)
    except SyntaxError:
        return out
    for n in arvore.body:
        if isinstance(n, ast.Assign) and len(n.targets) == 1 and isinstance(n.targets[0], ast.Name):
            v = n.value
            if isinstance(v, ast.UnaryOp) and isinstance(v.op, ast.USub):
                v = v.operand
            if isinstance(v, ast.Constant) and isinstance(v.value, (int, float)) and not isinstance(v.value, bool):
                out.append((n.targets[0].id, float(v.value)))
    return out


# ---------- codigo ----------

def nome_pontuado(f):
    partes = []
    while isinstance(f, ast.Attribute):
        partes.append(f.attr)
        f = f.value
    if isinstance(f, ast.Name):
        return ".".join([f.id] + partes[::-1]), f.id
    return None, None


def inventario_codigo(doc, itens):
    secoes = doc.find("section", "code")
    passos = secoes[0].kids("div", "step") if secoes else []
    if len(passos) < 2:
        item(itens, "C.passos", "C", "há a seção de código, com passos e o programa completo", "faltou")
        return ""
    trechos = [ck.code_of(s) for s in passos[:-1]]
    programa = "\n".join(trechos)
    # A que passo pertence cada linha do programa colado.
    passo_da_linha, linha = {}, 1
    for i, t in enumerate(trechos, 1):
        for _ in t.splitlines() or [""]:
            passo_da_linha[linha] = i
            linha += 1

    explicados, formatos = set(), set()
    for i, s in enumerate(passos[:-1], 1):
        partes = [c.tag if c.tag == "pre" else (c.classes[0] if c.classes else c.tag) for c in s.kids()]
        for cls, nome in (("purpose", "propósito, antes do código"), ("how", "como, depois do código"),
                          ("so-far", "o que o programa já faz")):
            item(itens, f"C.passo{i}.{cls}", "C", f"passo {i}: tem a parte \"{nome}\"",
                 "ok" if cls in partes else "faltou")
        prosa = " ".join(c.text() for c in s.kids() if c.tag != "pre")
        explicados.update(spec[-1] for spec in re.findall(r"\.\d+[a-zA-Z%]", prosa))
        for spec in ck.format_specs(ck.code_of(s)):
            # Um item por tipo de formato (f, e, %…), na primeira vez que aparece.
            if spec[-1] not in formatos:
                formatos.add(spec[-1])
                item(itens, f"C.formato.{spec}", "C", f"passo {i}: o formato de impressão {spec} é explicado",
                     "ok" if spec[-1] in explicados else "faltou")

    try:
        arvore = ast.parse(programa)
    except SyntaxError as e:
        item(itens, "C.sintaxe", "C", f"o programa é Python válido ({e.msg}, linha {e.lineno})", "errado")
        return programa

    apelidos, tem = set(), set()
    for n in ast.walk(arvore):
        if isinstance(n, ast.Import):
            apelidos.update((a.asname or a.name).split(".")[0] for a in n.names)
            if any(a.asname for a in n.names):
                tem.add("import_as")
        elif isinstance(n, ast.ImportFrom):
            apelidos.update(a.asname or a.name for a in n.names)
            tem.add("from_import")
    proprias = {n.name for n in ast.walk(arvore) if isinstance(n, ast.FunctionDef)}
    proprias |= {t.id for n in ast.walk(arvore) if isinstance(n, ast.Assign) and isinstance(n.value, ast.Lambda)
                 for t in n.targets if isinstance(t, ast.Name)}

    # Chamadas de biblioteca e funcoes nativas, na ordem do programa.
    vistas, retornos = set(), []
    chamadas = sorted((n for n in ast.walk(arvore) if isinstance(n, ast.Call)),
                      key=lambda n: (n.lineno, n.col_offset))
    for n in chamadas:
        nome, raiz = nome_pontuado(n.func)
        if n.keywords:
            tem.add("argumento_nomeado")
        funcoes_passadas = [a for a in list(n.args) + [k.value for k in n.keywords]
                            if isinstance(a, ast.Lambda) or (isinstance(a, ast.Name) and a.id in proprias)]
        if funcoes_passadas:
            tem.add("funcao_argumento")
        if nome is None:
            continue
        biblioteca = raiz in apelidos
        nativa = isinstance(n.func, ast.Name) and raiz in vars(builtins) and raiz not in proprias
        if not (biblioteca or nativa):
            continue
        p = passo_da_linha.get(n.lineno, "?")
        if biblioteca:
            for f in funcoes_passadas:
                alvo = f.id if isinstance(f, ast.Name) else "lambda"
                chave = f"C.mecanismo.{nome}.{alvo}"
                if not any(x["id"] == chave for x in itens):
                    retornos.append((chave, f"passo {p}: o mecanismo de {nome} com a função {alvo}: quem a chama, "
                                            "quantas vezes, com que valores e o que é feito com o que ela devolve"))
        if nome in vistas:
            continue
        vistas.add(nome)
        argumentos = [("posição %d" % (i + 1), ast.get_source_segment(programa, a) or "")
                      for i, a in enumerate(n.args)]
        argumentos += [(k.arg or "**", ast.get_source_segment(programa, k.value) or "") for k in n.keywords]
        simples = nativa or (len(argumentos) <= 1 and not n.keywords)
        rotulo = "função nativa" if nativa else "função de biblioteca"
        item(itens, f"C.funcao.{nome}", "C",
             f"passo {p}: {rotulo} {nome}(…): explicado o que ela faz" +
             (" e o que recebe" if simples and argumentos else ""))
        if not simples:
            for quem, fonte in argumentos:
                item(itens, f"C.arg.{nome}.{quem.replace(' ', '')}", "C",
                     f"passo {p}: argumento de {nome}, {quem} ({curto(fonte, 32)}): o que é e por que tem esse valor")
    for chave, texto in retornos:
        item(itens, chave, "C", texto)

    # Construcoes que um iniciante nao reconhece.
    for n in ast.walk(arvore):
        t = type(n)
        if t is ast.FunctionDef: tem.add("def")
        elif t is ast.Return: tem.add("return")
        elif t is ast.Lambda: tem.add("lambda")
        elif t is ast.For: tem.add("for")
        elif t is ast.While: tem.add("while")
        elif t in (ast.If, ast.IfExp): tem.add("if")
        elif t in (ast.ListComp, ast.GeneratorExp, ast.DictComp, ast.SetComp): tem.add("compreensao")
        elif t is ast.JoinedStr: tem.add("fstring")
        elif t is ast.Subscript:
            fatia = n.slice
            partes = fatia.elts if isinstance(fatia, ast.Tuple) else [fatia]
            tem.add("fatia" if any(isinstance(x, ast.Slice) for x in partes) else "indice")
        elif t is ast.Assign and any(isinstance(x, (ast.Tuple, ast.List)) for x in n.targets):
            tem.add("desempacotamento")
        elif t is ast.Tuple and isinstance(n.ctx, ast.Load): tem.add("tupla")
        elif t is ast.List and isinstance(n.ctx, ast.Load): tem.add("lista")
        elif t is ast.Dict: tem.add("dicionario")
        elif t is ast.AugAssign: tem.add("aumentada")
        elif t is ast.BinOp and isinstance(n.op, ast.Pow): tem.add("potencia")
        elif t in (ast.With,): tem.add("with")
        elif t is ast.Try: tem.add("try")
        elif t is ast.Attribute:
            _, raiz = nome_pontuado(n)
            if raiz and raiz not in apelidos:
                tem.add("atributo")
    atributos = sorted({n.attr for n in ast.walk(arvore) if isinstance(n, ast.Attribute)
                        and (nome_pontuado(n)[1] or "") not in apelidos and nome_pontuado(n)[1]})
    for chave, texto in CONSTRUCOES:
        if chave in tem:
            dica = ("no programa: ." + ", .".join(atributos[:8])) if chave == "atributo" else ""
            item(itens, f"C.construcao.{chave}", "C",
                 f"{texto}: explicado o que é e o que faz neste programa", dica=dica)

    item(itens, "C.verificacao.presente", "C", "o programa faz uma verificação do resultado e a lição a explica")
    item(itens, "C.verificacao.independente", "C",
         "a verificação é independente: não reusa a relação que produziu o resultado",
         dica="marque faltou se não houver verificação")
    if any(x.split(".")[0] == "scipy" or x in ("fsolve", "brentq", "solve_ivp", "solve_bvp", "quad",
                                                 "curve_fit", "minimize", "minimize_scalar", "root",
                                                 "root_scalar", "least_squares", "odeint")
           for x in apelidos):
        item(itens, "C.precisao", "C",
             "o critério de precisão do resultado numérico é explicado no passo em que o método é usado")
    item(itens, "C.figura", "C", "o programa termina com uma figura (plt.show())",
         "ok" if re.search(r"\bplt\.show\s*\(", programa) else "faltou")
    return programa


# ---------- resultado ----------

def confere(valor, tol, unidade, lidos):
    """O valor esperado esta entre os numeros lidos? Aceita o arredondamento de quem escreveu."""
    alvos = [valor] + ([valor / 100] if "%" in unidade else [])
    for v, casas, _, _ in lidos:
        for alvo in alvos:
            if tol == 0:                                   # resposta inteira: tem de ser exata
                if casas == 0 and abs(v - alvo) < 0.5:
                    return True
                continue
            # Meia unidade da ultima casa escrita; um inteiro solto ("2 min") so
            # conta como arredondamento de um valor grande.
            margem = 0.5 * 10 ** -casas if casas >= 1 or abs(alvo) >= 100 else 0
            if abs(v - alvo) <= tol * abs(alvo) + margem + 1e-12:
                return True
    return False


def inventario_resultado(doc, questao, saida, itens):
    resposta = doc.find("div", "answer")
    texto = resposta[0].text() if resposta else ""
    na_resposta = ck.numbers(texto, prose=True)
    impressos = ck.numbers(saida) if saida else []
    for p in questao["perguntas"]:
        esperado = f"{p['valor']:.5g} {p['unidade']}".strip()
        if confere(p["valor"], p["tol"], p["unidade"], na_resposta):
            item(itens, f"R.resposta.{p['chave']}", "R", f"a resposta dá {p['pede']} (esperado: {esperado})", "ok")
        else:
            dica = ("o programa imprime um número compatível, mas a resposta não o traz"
                    if confere(p["valor"], p["tol"], p["unidade"], impressos)
                    else "nem a resposta nem o programa trazem um número compatível")
            item(itens, f"R.resposta.{p['chave']}", "R",
                 f"a resposta dá {p['pede']} (esperado: {esperado}, tolerância {p['tol']:.1%})",
                 dica=dica + "; ok se estiver certo em outra unidade, errado se o valor for outro, faltou se não responder")

    figuras = doc.find(cls="plot")
    item(itens, "R.figura", "R", "há a figura que a pergunta pede", "ok" if figuras else "faltou")
    controles = [c.strip() for g in figuras for c in (g.attrs.get("data-controls") or "").split(",") if c.strip()]
    observacoes = [li for ol in doc.find("ol", "observations") for li in ol.kids("li")]
    de_controle = [li for li in observacoes if li.find(cls="in-your-code")]
    leitura = [li for li in observacoes if not li.find(cls="in-your-code")]
    for i, c in enumerate(controles, 1):
        item(itens, f"R.controle{i}.observacao", "R", f"controle {c}: tem a sua observação",
             "ok" if i <= len(de_controle) else "faltou")
    for i, li in enumerate(de_controle, 1):
        titulo = curto(li.kids("h3")[0].text() if li.kids("h3") else "", 60)
        item(itens, f"R.controle{i}.codigo", "R",
             f"observação de controle {i} ({titulo}): dá a mesma mudança no código e o que o programa imprime")
    if len(leitura) < 2:
        item(itens, "R.leitura.minimo", "R", "há ao menos duas observações de leitura da curva", "faltou")
    for i, li in enumerate(leitura, 1):
        titulo = curto(li.kids("h3")[0].text() if li.kids("h3") else "", 60)
        item(itens, f"R.leitura{i}.ancorada", "R",
             f"observação {i} ({titulo}): cita um valor ou trecho da curva deste exercício; não serviria a outro")


# ---------- tudo ----------

def inventario(caminho, questao):
    """Devolve (itens, texto da licao, saida do programa, idioma)."""
    leitor = ck.Reader()
    leitor.feed(caminho.read_text(encoding="utf-8"))
    doc = leitor.root
    html = doc.find("html")
    idioma = (html[0].attrs.get("lang") or "") if html else ""
    ck.COMMA = idioma.split("-")[0].lower() in ck.COMMA_LANGS

    itens = []
    secoes = doc.find("section", "code")
    passos = secoes[0].kids("div", "step") if secoes else []
    inventario_modelo(doc, chr(10).join(ck.code_of(s) for s in passos[:-1]), itens)
    inventario_codigo(doc, itens)
    ck.errors.clear()
    saida = ck.check_code(doc, caminho.parent) if doc.find("section", "code") else None
    roda = saida is not None
    item(itens, "C.roda", "C", "os passos colados em ordem rodam e formam o programa completo",
         "ok" if roda and not ck.errors else "errado", "; ".join(ck.errors)[:300])
    inventario_resultado(doc, questao, saida, itens)
    return itens, texto_da_licao(doc), saida, idioma
