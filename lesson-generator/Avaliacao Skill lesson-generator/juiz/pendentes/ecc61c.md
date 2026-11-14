# Pacote ecc61c

Julgue conforme `juiz/JUIZ.md` e grave a resposta em `juiz/respostas/ecc61c.json`.

## Enunciado enviado ao modelo

Uma coluna de recheio absorve um soluto de uma corrente gasosa com um solvente puro, em contracorrente. Em razões molares (mol de soluto por mol de inerte), o gás entra com Y = 0,080 e deve sair com Y = 0,008. A razão entre as vazões molares de solvente e de gás inerte é L/G = 2,2, e o equilíbrio é Y* = 1,5 X + 12 X². A altura de uma unidade de transferência global do gás é H_OG = 0,60 m. Calcule a razão molar do soluto no líquido de saída, a razão L/G mínima, o número de unidades de transferência N_OG = ∫ dY/(Y − Y*) e a altura de recheio (m).

## Itens a julgar

- `M.balanco1.leitura` — balanço 1: a equação final vem com o parágrafo do que ela representa e do que implica _(dica: o parágrafo existe; diga se descreve o processo e uma implicação)_
- `M.balanco1.hipotese2` — balanço 1, passo 2 (hipótese): diz o que aconteceria se ela não valesse _(dica: suposição Regime permanente: nada se acumula na coluna. Se a coluna estivesse enchendo ou…)_
- `M.balanco1.hipotese4` — balanço 1, passo 4 (hipótese): diz o que aconteceria se ela não valesse _(dica: suposição O inerte não se dissolve e o solvente não evapora, então as vazões são as mesma…)_
- `M.balanco2.leitura` — balanço 2: a equação final vem com o parágrafo do que ela representa e do que implica _(dica: o parágrafo existe; diga se descreve o processo e uma implicação)_
- `M.balanco2.hipotese2` — balanço 2, passo 2 (hipótese): diz o que aconteceria se ela não valesse _(dica: suposição Regime permanente, como no balanço anterior. Sem ela, a razão em cada altura de…)_
- `M.bloco1.origem` — equação complementar 1: diz de onde vem e o que afirma _(dica: Curva de equilíbrio)_
- `M.bloco2.origem` — equação complementar 2: diz de onde vem e o que afirma _(dica: Lei de transferência)_
- `M.simbolo.G` — símbolo G: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.Y_in` — símbolo Y_in: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.L` — símbolo L: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.X_in` — símbolo X_in: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.Y_out` — símbolo Y_out: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.X_out` — símbolo X_out: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.Y` — símbolo Y: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.z` — símbolo z: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.dz` — símbolo dz: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.N` — símbolo N: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.S` — símbolo S: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.K_y` — símbolo K_y: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.a` — símbolo a: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.H_OG` — símbolo H_OG: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.X` — símbolo X: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.tecnica.tipo` — técnica: diz que tipo de problema matemático é, em palavras comuns
- `M.tecnica.porque` — técnica: diz por que ela serve para este caso
- `M.tecnica.python` — técnica: nomeia a função de Python e a biblioteca _(dica: há um <code>; confirme função e biblioteca)_
- `C.funcao.print` — passo 2: função nativa print(…): explicado o que ela faz e o que recebe
- `C.funcao.np.sqrt` — passo 2: função de biblioteca np.sqrt(…): explicado o que ela faz e o que recebe
- `C.funcao.np.log` — passo 3: função de biblioteca np.log(…): explicado o que ela faz e o que recebe
- `C.funcao.abs` — passo 3: função nativa abs(…): explicado o que ela faz e o que recebe
- `C.funcao.quad` — passo 4: função de biblioteca quad(…): explicado o que ela faz
- `C.arg.quad.posição1` — passo 4: argumento de quad, posição 1 (inv_forca): o que é e por que tem esse valor
- `C.arg.quad.posição2` — passo 4: argumento de quad, posição 2 (Y_out): o que é e por que tem esse valor
- `C.arg.quad.posição3` — passo 4: argumento de quad, posição 3 (Y_in): o que é e por que tem esse valor
- `C.funcao.solve_ivp` — passo 4: função de biblioteca solve_ivp(…): explicado o que ela faz
- `C.arg.solve_ivp.posição1` — passo 4: argumento de solve_ivp, posição 1 (dYdz): o que é e por que tem esse valor
- `C.arg.solve_ivp.posição2` — passo 4: argumento de solve_ivp, posição 2 ([0, Z]): o que é e por que tem esse valor
- `C.arg.solve_ivp.posição3` — passo 4: argumento de solve_ivp, posição 3 ([Y_out]): o que é e por que tem esse valor
- `C.arg.solve_ivp.args` — passo 4: argumento de solve_ivp, args ((LG, H_OG)): o que é e por que tem esse valor
- `C.arg.solve_ivp.t_eval` — passo 4: argumento de solve_ivp, t_eval (np.linspace(0, Z, 200)): o que é e por que tem esse valor
- `C.funcao.np.linspace` — passo 4: função de biblioteca np.linspace(…): explicado o que ela faz
- `C.arg.np.linspace.posição1` — passo 4: argumento de np.linspace, posição 1 (0): o que é e por que tem esse valor
- `C.arg.np.linspace.posição2` — passo 4: argumento de np.linspace, posição 2 (Z): o que é e por que tem esse valor
- `C.arg.np.linspace.posição3` — passo 4: argumento de np.linspace, posição 3 (200): o que é e por que tem esse valor
- `C.funcao.plt.plot` — passo 5: função de biblioteca plt.plot(…): explicado o que ela faz
- `C.arg.plt.plot.posição1` — passo 5: argumento de plt.plot, posição 1 (sol.t): o que é e por que tem esse valor
- `C.arg.plt.plot.posição2` — passo 5: argumento de plt.plot, posição 2 (sol.y[0]): o que é e por que tem esse valor
- `C.arg.plt.plot.label` — passo 5: argumento de plt.plot, label ("Gás (Y)"): o que é e por que tem esse valor
- `C.funcao.plt.xlabel` — passo 5: função de biblioteca plt.xlabel(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.ylabel` — passo 5: função de biblioteca plt.ylabel(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.legend` — passo 5: função de biblioteca plt.legend(…): explicado o que ela faz
- `C.funcao.plt.grid` — passo 5: função de biblioteca plt.grid(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.show` — passo 5: função de biblioteca plt.show(…): explicado o que ela faz
- `C.mecanismo.quad.inv_forca` — passo 4: o mecanismo de quad com a função inv_forca: quem a chama, quantas vezes, com que valores e o que é feito com o que ela devolve
- `C.mecanismo.solve_ivp.dYdz` — passo 4: o mecanismo de solve_ivp com a função dYdz: quem a chama, quantas vezes, com que valores e o que é feito com o que ela devolve
- `C.construcao.def` — definição de função com def: explicado o que é e o que faz neste programa
- `C.construcao.return` — return: o que a função devolve: explicado o que é e o que faz neste programa
- `C.construcao.fstring` — f-string: texto com valores dentro de chaves: explicado o que é e o que faz neste programa
- `C.construcao.indice` — índice entre colchetes, como y[0]: explicado o que é e o que faz neste programa
- `C.construcao.desempacotamento` — desempacotamento: várias variáveis recebem de uma vez: explicado o que é e o que faz neste programa
- `C.construcao.tupla` — tupla: valores entre parênteses, separados por vírgula: explicado o que é e o que faz neste programa
- `C.construcao.lista` — lista: valores entre colchetes: explicado o que é e o que faz neste programa
- `C.construcao.atributo` — atributo de um objeto, depois do ponto: explicado o que é e o que faz neste programa _(dica: no programa: .t, .y)_
- `C.construcao.funcao_argumento` — função passada como argumento a outra função: explicado o que é e o que faz neste programa
- `C.construcao.argumento_nomeado` — argumento passado por nome (nome=valor): explicado o que é e o que faz neste programa
- `C.construcao.potencia` — operador ** (potência): explicado o que é e o que faz neste programa
- `C.construcao.import_as` — import … as: o apelido da biblioteca: explicado o que é e o que faz neste programa
- `C.construcao.from_import` — from … import: trazer uma função pelo nome: explicado o que é e o que faz neste programa
- `C.verificacao.presente` — o programa faz uma verificação do resultado e a lição a explica
- `C.verificacao.independente` — a verificação é independente: não reusa a relação que produziu o resultado _(dica: marque faltou se não houver verificação)_
- `C.precisao` — o critério de precisão do resultado numérico é explicado no passo em que o método é usado
- `R.controle1.codigo` — observação de controle 1 (Suba o L/G até 3,00 no controle): dá a mesma mudança no código e o que o programa imprime
- `R.leitura1.ancorada` — observação 1 (Onde a curva Gás (Y) chega a 0,080?): cita um valor ou trecho da curva deste exercício; não serviria a outro
- `R.leitura2.ancorada` — observação 2 (Em que ponto a curva é mais inclinada, em cima ou embaixo?): cita um valor ou trecho da curva deste exercício; não serviria a outro

## Lição

Operações unitárias · integral de transferência

# Absorção em coluna de recheio

[problem] 

Uma coluna de recheio absorve um soluto de uma corrente gasosa com um solvente puro, em contracorrente. Em razões molares (mol de soluto por mol de inerte), o gás entra por baixo com Y = 0,080 e deve sair por cima com Y = 0,008. O solvente entra por cima puro, X = 0. A razão entre as vazões molares de solvente e de inerte é L/G = 2,2. O equilíbrio é Y* = 1,5 X + 12 X². A altura de uma unidade de transferência global do gás é HOG = 0,60 m.

A razão molar do soluto no líquido de saída, X.

A razão L/G mínima.

O número de unidades de transferência, NOG = ∫ dY/(Y − Y*).

A altura do recheio, em metros.

O gás perde soluto ao subir, e o líquido ganha soluto ao descer. Ao final, você terá um programa que calcula os quatro números e desenha como a razão do gás cai ao longo da coluna.

## Modelo

### Balanço de massa do soluto na coluna inteira, em mol

 ⟦acúmulo de soluto = entra − sai⟧ 

(princípio) O soluto não surge nem desaparece dentro da coluna. O volume de controle é a coluna inteira, com o gás de um lado e o líquido do outro.

 ⟦acúmulo = 0⟧ 

(suposição) Regime permanente: nada se acumula na coluna. Se a coluna estivesse enchendo ou esvaziando, o acúmulo seria a variação do soluto no tempo, e o balanço teria um termo a mais.

 ⟦G ⋅ Y_in {gás que entra} + L ⋅ X_in {líquido que entra} = G ⋅ Y_out {gás que sai} + L ⋅ X_out {líquido que sai}⟧ 

Yin, Yout — razão molar do soluto no gás, na base e no topo, mol/mol

Xin, Xout — razão molar do soluto no líquido, no topo e na base, mol/mol

G, L — vazões molares do gás inerte e do solvente, mol/tempo (a unidade do tempo se cancela)

(translação) Cada palavra vira uma vazão de soluto: a vazão molar do inerte vezes a razão molar.

 ⟦G , L constantes ao longo da coluna⟧ 

(suposição) O inerte não se dissolve e o solvente não evapora, então as vazões são as mesmas em qualquer altura. Se a vazão de líquido variasse muito, o balanço teria de usar a vazão de cada seção.

[final] 

 ⟦X_out {líquido da base} = (Y_in − Y_out )/(L / G) {soluto ganho pelo gás, dividido pela razão L/G}⟧ 

(álgebra) Com Xin = 0, isolamos Xout.

O gás entrega à coluna tanto soluto quanto o líquido recebe. Desenhando o mesmo balanço do topo até uma altura qualquer, obtemos a linha de operação X = (Y − Yout)/(L/G), que é a que o programa usa.

### Balanço de massa do soluto no gás, em uma fatia de altura dz, em mol

 ⟦acúmulo de soluto = entra − sai − passa para o líquido⟧ 

(princípio) Na fatia, o gás perde soluto e o líquido ganha o mesmo. A fatia é o volume de controle.

 ⟦acúmulo = 0⟧ 

(suposição) Regime permanente, como no balanço anterior. Sem ela, a razão em cada altura dependeria do tempo.

 ⟦0 {acúmulo} = G ⋅ Y ( z + dz ) {gás que entra por baixo} − G ⋅ Y ( z ) {gás que sai por cima} − N ⋅ S ⋅ dz {passa para o líquido}⟧ 

Y(z) — razão molar do soluto no gás, na altura z, mol/mol

z — altura medida do topo para baixo, m; dz, uma fatia desta altura, m

N — soluto transferido ao líquido por volume de recheio e por tempo, mol/(m³·tempo)

S — área da seção transversal da coluna, m²

(translação) A taxa N é a lei de transferência, dada no bloco abaixo.

 ⟦G (d Y)/(d z) = K_y a S ( Y − Y * )⟧ 

(álgebra) Dividimos por S·dz e deixamos dz tender a zero, com N substituído pela lei abaixo.

 ⟦H_OG = (G)/(K_y a S)⟧ 

(definição) Agrupa as constantes numa altura. Ela tem unidade de metro: vazão de inerte sobre a vazão transferida por metro de coluna.

[final] 

 ⟦(d Y)/(d z) {variação ao longo da coluna} = (Y − Y *)/(H_OG ) {força motriz por altura de unidade}⟧ 

(álgebra) Esta é a equação do modelo.

A razão do gás cai ao subir na proporção da força motriz, Y − Y*. Onde o gás está quase em equilíbrio com o líquido, a variação é pequena e a coluna precisa ser alta para remover mais soluto.

[eq-block] Curva de equilíbrio: 

 ⟦Y * = 1,5 X + 12 X^(2)⟧ 

Y* — razão molar do soluto no gás em equilíbrio com o líquido daquela altura, mol/mol

X — razão molar do soluto no líquido daquela altura, mol/mol

Dado no enunciado. A curva sobe com a concentração do líquido, mais rápido do que uma reta.

[eq-block] Lei de transferência: 

 ⟦N = K_y a ( Y − Y * )⟧ 

Kya — coeficiente global de transferência por volume de recheio, mol/(m³·tempo)

A força motriz Y − Y* empurra o soluto do gás para o líquido.

Parâmetro | Valor | Unidade | Fonte | 

Yin, gás na base | 0,080 | mol/mol | dado | 

Yout, gás no topo | 0,008 | mol/mol | dado | 

Xin, solvente no topo | 0 | mol/mol | dadosolvente puro | 

L/G | 2,2 | mol/mol | dado | 

HOG | 0,60 | m | dado | 

1,5 e 12, da curva de equilíbrio | 1,5 e 12 | adimensional | dado | 

[technique] 

[technique-name] Integração analítica

Este problema é uma integral definida: a altura depende da soma das forças motrizes ao longo da coluna. Para resolver este tipo de problema, vamos usar a integração analítica: trocando X pela linha de operação, o denominador vira um polinômio do segundo grau em Y, e a primitiva dele é um logaritmo. Ela é exata, sem passos numéricos, e a conferimos depois com uma integração numérica. Em Python, a função que calcula o logaritmo natural é np.log, da biblioteca NumPy. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados da coluna

[purpose] Guardar os números do enunciado em variáveis, para que o resto do programa use nomes e não números soltos.

```
import numpy as np # vetores e funções
from scipy.integrate import solve_ivp, quad # integração
import matplotlib.pyplot as plt # gráficos

# Dados da coluna
Y_in = 0.080 # soluto no gás da base, mol/mol
Y_out = 0.008 # soluto no gás do topo, mol/mol
X_in = 0.0 # solvente puro entra em cima, mol/mol
LG = 2.2 # L/G, mol de solvente por mol de inerte
H_OG = 0.60 # altura de uma unidade de transferência, m
```

[how] 

import numpy as np carrega a biblioteca NumPy e lhe dá o apelido np; para usar uma função, escrevemos np. antes dela.

from scipy.integrate import solve_ivp, quad pega apenas duas funções da biblioteca SciPy: solve_ivp, que resolve equações diferenciais, e quad, que calcula integrais.

import matplotlib.pyplot as plt carrega o módulo de gráficos com o apelido plt.

Y_in = 0.080 cria a variável Y_in com o valor 0,080. O # começa um comentário, que o Python ignora: é onde escrevemos a unidade.

[so-far] Até aqui, o programa só guarda os dados. Nada é calculado ainda.

[step] 

### Líquido de saída e L/G mínimo

[purpose] Calcular o soluto que o líquido recebe e a razão L/G abaixo da qual a coluna não funciona.

```
# Balanço global: G(Y_in - Y_out) = L(X_out - X_in)
X_out = X_in + (Y_in - Y_out) / LG # líquido de saída, mol/mol
print(f"X_out = {X_out:.4f} mol/mol")

# L/G mínimo: na base, Y_in = 1.5 X + 12 X**2
X_eq = (-1.5 + np.sqrt(1.5**2 + 4 * 12 * Y_in)) / (2 * 12)
LG_min = (Y_in - Y_out) / (X_eq - X_in)
print(f"X_eq = {X_eq:.4f} mol/mol")
print(f"(L/G)_min = {LG_min:.3f}")
```

[how] 

X_out = X_in + ... atribui a X_out o resultado da expressão à direita; / é divisão e * é multiplicação.

np.sqrt(...) é a raiz quadrada. **2 eleva ao quadrado, e 1.5**2 é 1,5 ao quadrado.

X_eq é a raiz positiva de 12X² + 1,5X − Y_in = 0, a fórmula de Bhaskara. Ela é o líquido em equilíbrio com o gás da base.

f"X_out = {X_out:.4f} mol/mol" é uma frase com um valor dentro das chaves; :.4f pede quatro casas decimais.

[so-far] O programa agora imprime o líquido de saída, o líquido em equilíbrio e a razão L/G mínima.

[step] 

### Integral de NOG pela fórmula com logaritmo

[purpose] Trocar X pela linha de operação e calcular a integral com a primitiva, depois a altura Z = HOG · NOG.

```
# Linha de operação: X = (Y - Y_out)/LG. Trocando X em Y - Y*:
# Y - Y* = A*Y**2 + B*Y + C
s = 1 / LG
A = -12 * s**2
B = 1 - 1.5 * s + 24 * s**2 * Y_out
C = 1.5 * s * Y_out - 12 * s**2 * Y_out**2
raiz = np.sqrt(B**2 - 4 * A * C) # raiz do discriminante

def F(Y): # primitiva de 1/(Y - Y*)
 return np.log(abs((2*A*Y + B - raiz) / (2*A*Y + B + raiz)))

N_OG = (F(Y_in) - F(Y_out)) / raiz # integral de Y_out a Y_in
Z = H_OG * N_OG # altura do recheio, m
print(f"N_OG = {N_OG:.3f}")
print(f"Z = {Z:.3f} m")
```

[how] 

s = 1 / LG guarda o inverso de L/G, que aparece em todas as potências de X.

A, B e C são os coeficientes do polinômio A·Y² + B·Y + C, obtidos ao substituir X = s(Y − Y_out) em Y − 1,5X − 12X².

raiz é √(B² − 4AC), o discriminante do polinômio. Ele precisa ser positivo, senão a fórmula não vale.

def F(Y): cria uma função. Ela recebe um valor Y e devolve o return. Aqui, F é a primitiva: ln|(2AY + B − raiz)/(2AY + B + raiz)|, e abs é o valor absoluto dentro do logaritmo.

N_OG = (F(Y_in) - F(Y_out)) / raiz aplica a primitiva nas duas extremidades e subtrai, que é a integral de Y_out a Y_in; a divisão por raiz é o fator da fórmula.

[so-far] O programa agora imprime NOG e a altura Z, em metros.

[step] 

### Verificação por duas vias independentes

[purpose] Conferir a fórmula com uma integração numérica direta, e conferir a altura percorrendo a coluna do topo para a base.

```
# Verificação 1: integração numérica direta
def inv_forca(Y): # 1/(Y - Y*), X da linha
 X = (Y - Y_out) / LG
 return 1 / (Y - (1.5 * X + 12 * X**2))

N_num, erro = quad(inv_forca, Y_out, Y_in)
print(f"N_OG numérico = {N_num:.3f}")
print(f"diferença = {abs(N_num - N_OG):.1e}")

# Verificação 2: percorrer a coluna do topo para a base
def dYdz(z, y, LG, H_OG): # dY/dz = (Y - Y*)/H_OG
 X = (y[0] - Y_out) / LG
 return [(y[0] - (1.5 * X + 12 * X**2)) / H_OG]

sol = solve_ivp(dYdz, [0, Z], [Y_out], args=(LG, H_OG),
 t_eval=np.linspace(0, Z, 200))
print(f"Y no fundo = {sol.y[0, -1]:.3f}")

# Força motriz nas duas extremidades
Ystar_fundo = 1.5 * X_out + 12 * X_out**2
print(f"Y* no fundo = {Ystar_fundo:.3f}")
print(f"força motriz: topo = {Y_out:.3f}, fundo = {Y_in - Ystar_fundo:.3f}")
```

[how] 

quad(inv_forca, Y_out, Y_in) calcula a integral de inv_forca entre os dois limites. Ela chama a função em vários valores de Y, escolhidos por ela, e soma os resultados. Devolve o valor e uma estimativa de erro, guardada em erro; a precisão aparece na diferença impressa.

:.1e na diferença pede notação científica com uma casa depois da vírgula. Se a diferença aparecer com um "e-" seguido de um expoente negativo, o número é zero para qualquer efeito prático.

solve_ivp(dYdz, [0, Z], [Y_out], ...) integra a equação da coluna. A função dYdz é chamada pelo solver a cada passo, com a altura z e o estado y. O estado chega sempre como lista, mesmo com uma variável: por isso y[0] é o Y.

[0, Z] é o intervalo de alturas, do topo (0) à base (Z); [Y_out] é o valor inicial de Y no topo.

args=(LG, H_OG) passa os valores extras para cada chamada de dYdz. São dois itens, por isso não precisa de vírgula; com um só item seria (LG,).

t_eval=np.linspace(0, Z, 200) pede a solução em 200 alturas igualmente espaçadas; o número 200 só deixa o gráfico liso. O solver escolhe seus próprios passos internos, menores onde a curva dobra.

sol.y[0, -1] é a primeira linha de sol.y, que é Y, no último ponto, que é a base.

[so-far] O programa agora confirma NOG com a integral numérica e mostra que, ao percorrer a altura Z, o gás chega a Y = 0,080 na base.

[step] 

### Perfil do gás e do equilíbrio na coluna

[purpose] Desenhar Y e Y* em cada altura, para ver onde a força motriz é grande e onde é pequena.

```
# Perfil: gás (Y) e equilíbrio (Y*) em cada altura
X = (sol.y[0] - Y_out) / LG # líquido em cada altura
Ystar = 1.5 * X + 12 * X**2 # equilíbrio com esse líquido

plt.plot(sol.t, sol.y[0], label="Gás (Y)")
plt.plot(sol.t, Ystar, label="Equilíbrio (Y*)")
plt.xlabel("Altura medida do topo (m)")
plt.ylabel("Razão molar (mol/mol)")
plt.legend()
plt.grid(True)
plt.show()
```

[how] 

sol.y[0] - Y_out subtrai Y_out de todos os valores de uma vez: é uma operação sobre o vetor inteiro, feita pelo NumPy.

plt.plot(x, y, label=...) desenha uma curva com os pontos x e y; label é o nome que aparece na legenda.

plt.xlabel e plt.ylabel escrevem os nomes dos eixos, com a unidade.

plt.legend() mostra a legenda; plt.grid(True), a grade; plt.show() abre a figura no editor.

[so-far] O programa agora mostra a figura com as duas curvas.

[step] 

### Programa completo

```
import numpy as np # vetores e funções
from scipy.integrate import solve_ivp, quad # integração
import matplotlib.pyplot as plt # gráficos

# Dados da coluna
Y_in = 0.080 # soluto no gás da base, mol/mol
Y_out = 0.008 # soluto no gás do topo, mol/mol
X_in = 0.0 # solvente puro entra em cima, mol/mol
LG = 2.2 # L/G, mol de solvente por mol de inerte
H_OG = 0.60 # altura de uma unidade de transferência, m

# Balanço global: G(Y_in - Y_out) = L(X_out - X_in)
X_out = X_in + (Y_in - Y_out) / LG # líquido de saída, mol/mol
print(f"X_out = {X_out:.4f} mol/mol")

# L/G mínimo: na base, Y_in = 1.5 X + 12 X**2
X_eq = (-1.5 + np.sqrt(1.5**2 + 4 * 12 * Y_in)) / (2 * 12)
LG_min = (Y_in - Y_out) / (X_eq - X_in)
print(f"X_eq = {X_eq:.4f} mol/mol")
print(f"(L/G)_min = {LG_min:.3f}")

# Linha de operação: X = (Y - Y_out)/LG. Trocando X em Y - Y*:
# Y - Y* = A*Y**2 + B*Y + C
s = 1 / LG
A = -12 * s**2
B = 1 - 1.5 * s + 24 * s**2 * Y_out
C = 1.5 * s * Y_out - 12 * s**2 * Y_out**2
raiz = np.sqrt(B**2 - 4 * A * C) # raiz do discriminante

def F(Y): # primitiva de 1/(Y - Y*)
 return np.log(abs((2*A*Y + B - raiz) / (2*A*Y + B + raiz)))

N_OG = (F(Y_in) - F(Y_out)) / raiz # integral de Y_out a Y_in
Z = H_OG * N_OG # altura do recheio, m
print(f"N_OG = {N_OG:.3f}")
print(f"Z = {Z:.3f} m")

# Verificação 1: integração numérica direta
def inv_forca(Y): # 1/(Y - Y*), X da linha
 X = (Y - Y_out) / LG
 return 1 / (Y - (1.5 * X + 12 * X**2))

N_num, erro = quad(inv_forca, Y_out, Y_in)
print(f"N_OG numérico = {N_num:.3f}")
print(f"diferença = {abs(N_num - N_OG):.1e}")

# Verificação 2: percorrer a coluna do topo para a base
def dYdz(z, y, LG, H_OG): # dY/dz = (Y - Y*)/H_OG
 X = (y[0] - Y_out) / LG
 return [(y[0] - (1.5 * X + 12 * X**2)) / H_OG]

sol = solve_ivp(dYdz, [0, Z], [Y_out], args=(LG, H_OG),
 t_eval=np.linspace(0, Z, 200))
print(f"Y no fundo = {sol.y[0, -1]:.3f}")

# Força motriz nas duas extremidades
Ystar_fundo = 1.5 * X_out + 12 * X_out**2
print(f"Y* no fundo = {Ystar_fundo:.3f}")
print(f"força motriz: topo = {Y_out:.3f}, fundo = {Y_in - Ystar_fundo:.3f}")

# Perfil: gás (Y) e equilíbrio (Y*) em cada altura
X = (sol.y[0] - Y_out) / LG # líquido em cada altura
Ystar = 1.5 * X + 12 * X**2 # equilíbrio com esse líquido

plt.plot(sol.t, sol.y[0], label="Gás (Y)")
plt.plot(sol.t, Ystar, label="Equilíbrio (Y*)")
plt.xlabel("Altura medida do topo (m)")
plt.ylabel("Razão molar (mol/mol)")
plt.legend()
plt.grid(True)
plt.show()
```

Os cinco passos, colados em ordem, formam o programa completo, pronto para rodar.

## Resultado

[answer] 

Razão molar do soluto no líquido de saída: Xout = 0,0327 mol/mol.

Razão L/G mínima: 1,786 mol/mol.

Número de unidades de transferência: NOG = 4,997.

Altura do recheio: Z = 2,998 m.

[figura; controles: LG] 

### Onde a curva Gás (Y) chega a 0,080?

Na base, a 2,998 m do topo, que é a altura Z do recheio impressa pelo programa. Acima dessa altura, a curva está abaixo de 0,080.

### Em que ponto a curva é mais inclinada, em cima ou embaixo?

Embaixo. A inclinação é (Y − Y*)/HOG: no fundo, 0,018/0,60 = 0,030 por metro; no topo, 0,008/0,60 = 0,013 por metro. As forças motrizes 0,008 e 0,018 são impressas pelo programa.

### Suba o L/G até 3,00 no controle

A curva chega a 0,080 mais cedo. Com mais solvente, o líquido sai menos carregado, então a força motriz Y − Y* é maior em toda a coluna, e o recheio fica mais baixo.

[in-your-code] No código, troque LG = 2.2 por LG = 3.0 e rode. O programa passa a imprimir X_out = 0,0240 mol/mol, N_OG = 3,589 e Z = 2,153 m.

 Algo não ficou claro? Pergunte no chat.
