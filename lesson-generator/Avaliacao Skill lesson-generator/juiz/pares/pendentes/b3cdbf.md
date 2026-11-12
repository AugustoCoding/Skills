# Comparação b3cdbf

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/b3cdbf.json`.

# Enunciado enviado ao modelo

Uma mistura equimolar de benzeno e tolueno, alimentada como líquido saturado, é destilada numa coluna com condensador total para dar um destilado com 95% molar de benzeno e um produto de fundo com 5% molar de benzeno. A volatilidade relativa é constante e igual a 2,5, e a razão de refluxo é 1,5 vez a mínima. Pelo método de McCabe–Thiele, calcule a razão de refluxo mínima, a razão de refluxo de operação, o número de estágios teóricos e o estágio de alimentação. Trace os degraus a partir do topo (x = x_D), passando para a linha de esgotamento a partir do primeiro degrau cujo líquido tenha x ≤ z_F (esse é o estágio de alimentação), e conte os degraus inteiros até o primeiro com x ≤ x_B (o refervedor está incluído na contagem).


==================== LIÇÃO 1 ====================

Operações unitárias · cálculo estágio a estágio

# Destilação benzeno–tolueno por McCabe–Thiele

[problem] 

Uma mistura equimolar de benzeno e tolueno (fração molar de benzeno na alimentação zF = 0,50) entra numa coluna de destilação como líquido saturado. A coluna tem condensador total e refervedor. O destilado deve ter xD = 0,95 de benzeno e o produto de fundo, xB = 0,05 de benzeno (frações molares). A volatilidade relativa do benzeno em relação ao tolueno é constante, α = 2,5, e a razão de refluxo de operação é 1,5 vez a mínima: R = 1,5 · Rmín. Os degraus são traçados a partir do topo (x = xD); passa-se para a reta de esgotamento a partir do primeiro degrau cujo líquido tenha x ≤ zF (o estágio de alimentação), e contam-se os degraus inteiros até o primeiro com x ≤ xB, com o refervedor incluído.

Calcule a razão de refluxo mínima Rmín.

Calcule a razão de refluxo de operação R.

Calcule o número de estágios teóricos N.

Determine o estágio de alimentação.

Na coluna, o vapor sobe e o líquido desce; em cada estágio os dois se encontram e saem em equilíbrio, e a cada estágio o vapor fica mais rico em benzeno. O método de McCabe–Thiele transforma isso num desenho: uma escada entre a curva de equilíbrio e as retas de operação, em que cada degrau é um estágio. Ao final, você terá um programa que calcula o refluxo, percorre a escada estágio por estágio, conta os degraus e desenha o diagrama.

## Modelo

### Balanço de massa global e de benzeno na coluna, em mols

 ⟦acúmulo = entra − sai⟧ 

(princípio) Mols não aparecem nem somem, e na destilação não há reação. O volume de controle é a coluna inteira, com o condensador e o refervedor: entra a alimentação e saem o destilado e o produto de fundo.

 ⟦0 = F {entra} − D {sai no topo} − B {sai no fundo} 0 = F ⋅ z_F {benzeno que entra} − D ⋅ x_D {benzeno no destilado} − B ⋅ x_B {benzeno no fundo}⟧ 

F — vazão molar da alimentação que entra na coluna, kmol/h

D — vazão molar do destilado que sai do condensador, kmol/h

B — vazão molar do produto de fundo que sai do refervedor, kmol/h

zF, xD, xB — frações molares de benzeno na alimentação, no destilado e no produto de fundo, adimensionais

(tradução) (hipótese) A primeira linha conta todos os mols; a segunda, só os de benzeno. O acúmulo é zero porque a coluna opera em regime permanente; na partida ou numa mudança de carga, os inventários de líquido nos pratos variariam e cada equação ganharia um termo de derivada no tempo.

[final] 

 ⟦D {destilado} = F ⋅ (z_F − x_B )/(x_D − x_B ) B {fundo} = F − D⟧ 

(álgebra) Substitui-se B = F − D na equação do benzeno e isola-se D.

As especificações de pureza fixam como a alimentação se divide entre topo e fundo. Como aqui as purezas são simétricas (0,95 e 0,05) em torno de 0,50, metade da alimentação sai por cima e metade por baixo: com F = 100 kmol/h, D = B = 50,0 kmol/h.

### Balanço de massa de benzeno na seção de retificação, em mols

 ⟦benzeno que sobe no vapor = benzeno que desce no líquido + benzeno no destilado⟧ 

(princípio) Conservação do benzeno em regime permanente. O volume de controle envolve o topo da coluna: começa entre o estágio n e o estágio n+1, logo abaixo, e inclui o condensador. Por esse corte entra o vapor que sobe de n+1 e sai o líquido que desce de n; pelo topo sai o destilado.

 ⟦V ⋅ y_n + 1 {sobe no vapor} = L ⋅ x_n {desce no líquido} + D ⋅ x_D {sai no destilado}⟧ 

V — vazão molar de vapor que sobe na seção de retificação (acima da alimentação), kmol/h

L — vazão molar de líquido que desce na seção de retificação, kmol/h

yn+1 — fração molar de benzeno no vapor que sobe do estágio n+1, adimensional

xn — fração molar de benzeno no líquido que desce do estágio n, adimensional

(tradução) Cada vazão vezes sua fração de benzeno dá a vazão de benzeno daquela corrente.

 ⟦L , V = constantes em toda a seção⟧ 

(hipótese) Transbordamento molar constante: benzeno e tolueno têm calores latentes molares quase iguais, então cada mol de vapor que condensa num prato vaporiza um mol de líquido. Se os calores latentes fossem muito diferentes, L e V mudariam de prato para prato, a reta de operação viraria uma curva e seria preciso um balanço de energia em cada estágio.

 ⟦R = (L)/(D) V = L + D = ( R + 1 ) ⋅ D⟧ 

R — razão de refluxo: mols de líquido devolvidos à coluna por mol de destilado retirado, adimensional

(definição) A razão de refluxo é definida pelo líquido devolvido. Com condensador total, todo o vapor V que chega ao topo vira líquido e se divide em refluxo L e destilado D (balanço total no condensador).

[final] 

 ⟦y_n + 1 = (R)/(R + 1) {inclinação} ⋅ x_n + (x_D )/(R + 1) {intercepto}⟧ 

(álgebra) Divide-se tudo por V = (R+1)·D.

É a reta de operação de retificação: dada a composição do líquido que desce de um estágio, ela diz a composição do vapor que sobe do estágio de baixo. Ela passa pela diagonal em x = xD e tem inclinação menor que 1; quanto maior o refluxo, mais ela se aproxima da diagonal e mais longe fica da curva de equilíbrio, o que dá degraus maiores e menos estágios.

### Balanço de massa de benzeno na seção de esgotamento, em mols

 ⟦benzeno que desce no líquido = benzeno que sobe no vapor + benzeno no produto de fundo⟧ 

(princípio) A mesma conservação, agora com o volume de controle envolvendo o fundo: do corte entre os estágios m e m+1, abaixo da alimentação, até o refervedor.

 ⟦L {‾} ⋅ x_m {desce no líquido} = V {‾} ⋅ y_m + 1 {sobe no vapor} + B ⋅ x_B {sai no fundo}⟧ 

L̄, V̄ — vazões molares de líquido e de vapor na seção de esgotamento (abaixo da alimentação), kmol/h

(tradução) Com o transbordamento molar constante, como na retificação, L̄ e V̄ não mudam ao longo da seção.

 ⟦L {‾} = L + F V {‾} = V⟧ 

(hipótese) A alimentação é líquido saturado, já no ponto de bolha: ela se soma inteira ao líquido que desce, e o vapor passa pelo prato de alimentação sem mudar. Se a alimentação fosse parcialmente vaporizada, parte de F iria para o vapor, V̄ ficaria menor que V e a reta de esgotamento mudaria de inclinação.

[final] 

 ⟦y_m + 1 = (L {‾} )/(V {‾} ) {inclinação} ⋅ x_m − (B ⋅ x_B )/(V {‾} ) {intercepto}⟧ 

(álgebra) Divide-se tudo por V̄.

É a reta de operação de esgotamento. Ela passa pela diagonal em x = xB, tem inclinação maior que 1 (desce mais líquido do que sobe vapor) e cruza a reta de retificação exatamente na vertical x = zF, que é a linha q de uma alimentação de líquido saturado.

[eq-block] Equilíbrio líquido–vapor: 

 ⟦y^(*) = (α ⋅ x)/(1 + ( α − 1 ) ⋅ x) x = (y^(*) )/(α − ( α − 1 ) ⋅ y^(*) )⟧ 

y* — fração molar de benzeno no vapor em equilíbrio com um líquido de fração molar x, adimensional

α — volatilidade relativa do benzeno em relação ao tolueno, (y/x)benzeno / (y/x)tolueno, adimensional

Vem da definição de α para uma mistura binária, com α constante como diz o enunciado. A segunda forma é a mesma relação resolvida para x: é a que se usa ao subir do vapor de um estágio para o líquido que sai dele. Num estágio teórico, o vapor e o líquido que saem estão sobre essa curva.

[eq-block] Refluxo mínimo: 

 ⟦(R_mín )/(R_mín + 1) = (x_D − y_F^(*) )/(x_D − z_F ) ⇒ R_mín = (x_D − y_F^(*) )/(y_F^(*) − z_F )⟧ 

y*F — fração molar de benzeno no vapor em equilíbrio com um líquido de composição zF, adimensional

Ao reduzir o refluxo, a reta de retificação gira em torno de (xD, xD) e o cruzamento com a reta de esgotamento desce pela vertical x = zF. O refluxo mínimo é aquele em que o cruzamento encosta na curva de equilíbrio, no ponto (zF, y*F): ali os degraus ficam infinitamente pequenos e seriam precisos infinitos estágios. A inclinação da reta nessa posição, igual à da reta de retificação, dá a primeira igualdade; isolando Rmín, a segunda.

Parâmetro | Valor | Unidade | Fonte | 

zF | 0,50 | — | enunciadomistura equimolar | 

xD | 0,95 | — | enunciado | 

xB | 0,05 | — | enunciado | 

α | 2,5 | — | enunciado | 

R / Rmín | 1,5 | — | enunciado | 

F | 100 | kmol/h | escolhabase de cálculo; refluxo e estágios não dependem dela | 

D, B | 50,0 | kmol/h | derivadobalanço global: 100 · (0,50 − 0,05)/(0,95 − 0,05) | 

[technique] 

[technique-name] Cálculo estágio a estágio

O problema é uma sequência de contas simples repetidas: em cada estágio, o equilíbrio leva do vapor ao líquido e uma reta de operação leva do líquido ao vapor do estágio de baixo, até a pureza do fundo. Para resolver esse tipo de problema, vamos usar o cálculo estágio a estágio: os degraus de McCabe–Thiele feitos com números, num laço que repete as duas contas e conta as voltas. Ele serve aqui porque, com α constante, o equilíbrio e as retas são fórmulas explícitas, e o refluxo mínimo tem fórmula fechada. Em Python, o que faz isso é o laço while, da própria linguagem, com funções que nós escrevemos e a biblioteca NumPy para as contas auxiliares. Veja a próxima seção para aprender a usá-lo.

## Código

[step] 

### Dados do problema e curva de equilíbrio

[purpose] Guardar os dados do enunciado em variáveis com nome e escrever a relação de equilíbrio nos dois sentidos, para usar em todo o resto do programa.

```
import numpy as np
import matplotlib.pyplot as plt

# Dados do enunciado (frações molares de benzeno)
z_F = 0.50 # alimentação, -
x_D = 0.95 # destilado, -
x_B = 0.05 # produto de fundo, -
alfa = 2.5 # volatilidade relativa benzeno/tolueno, -
fator = 1.5 # R = fator * R_min, -
F = 100.0 # vazão de alimentação, kmol/h (base de cálculo)

def y_eq(x):
 """Vapor em equilíbrio com o líquido x."""
 return alfa * x / (1 + (alfa - 1) * x)

def x_eq(y):
 """Líquido em equilíbrio com o vapor y (inversa de y_eq)."""
 return y / (alfa - (alfa - 1) * y)
```

[how] import numpy as np carrega a biblioteca NumPy com o apelido np; a matplotlib, que desenha gráficos, entra como plt. Cada linha nome = valor guarda um número numa variável; o texto depois de # é comentário, ignorado pelo Python, e ali fica a unidade. def y_eq(x): cria uma função: um bloco de contas com nome, que recebe um valor (aqui chamado x) e devolve, com return, o resultado. As linhas recuadas abaixo do def são o corpo da função. O texto entre aspas triplas é só uma descrição. Dentro da função, alfa é lido da variável definida acima. x_eq é a mesma relação resolvida para o líquido.

[so-far] O programa conhece os dados e sabe calcular, para qualquer composição, o vapor em equilíbrio com um líquido e o líquido em equilíbrio com um vapor. Ainda não imprime nada.

[step] 

### Refluxo mínimo e refluxo de operação

[purpose] Achar o ponto em que a reta de retificação toca a curva de equilíbrio sobre a linha q e, dele, a razão de refluxo mínima e a de operação.

```
# Líquido saturado: a linha q é vertical, em x = z_F.
# No refluxo mínimo, a reta de retificação toca o equilíbrio ali.
y_pinch = y_eq(z_F)
R_min = (x_D - y_pinch) / (y_pinch - z_F)
R = fator * R_min
print(f"Ponto de contato: x = {z_F:.3f}, y* = {y_pinch:.4f}")
print(f"Razão de refluxo mínima: R_min = {R_min:.3f}")
print(f"Razão de refluxo de operação: R = {R:.3f}")
```

[how] y_eq(z_F) chama a função do passo anterior com o valor 0,50 no lugar de x. print escreve na tela. O f antes das aspas torna o texto uma f-string: o que está entre chaves é trocado pelo valor da variável. :.3f significa “número com 3 casas decimais”; :.4f, com 4.

[so-far] O programa imprime o ponto de contato (0,500; 0,7143), Rmín = 1,100 e R = 1,650.

[step] 

### Vazões e retas de operação

[purpose] Fechar os balanços globais para ter as vazões de cada seção e escrever as duas retas de operação como funções.

```
# Balanços globais da coluna: total e de benzeno
D = F * (z_F - x_B) / (x_D - x_B) # destilado, kmol/h
B = F - D # produto de fundo, kmol/h
L = R * D # líquido na retificação, kmol/h
V = L + D # vapor na retificação, kmol/h
L_b = L + F # líquido no esgotamento, kmol/h
V_b = V # vapor no esgotamento, kmol/h
print(f"D = {D:.1f} B = {B:.1f} L = {L:.2f} V = {V:.2f} kmol/h")
print(f"L' = {L_b:.2f} V' = {V_b:.2f} kmol/h")

def y_ret(x):
 """Reta de operação da seção de retificação."""
 return L / V * x + D / V * x_D

def y_esg(x):
 """Reta de operação da seção de esgotamento."""
 return L_b / V_b * x - B / V_b * x_B

print(f"As retas se cruzam em x = {z_F:.3f}, y = {y_ret(z_F):.4f}")
```

[how] As quatro vazões seguem as equações do modelo: L = R·D, V = L + D, L̄ = L + F e V̄ = V. Como o Python não aceita a barra sobre a letra, L_b e V_b fazem o papel de L̄ e V̄, e na tela aparecem como L' e V'. As funções y_ret e y_esg recebem o líquido x de um estágio e devolvem o vapor do estágio de baixo; L / V é a inclinação R/(R+1) escrita com as vazões. A última linha chama y_ret dentro da f-string, o que é permitido: qualquer conta pode ir entre as chaves.

[so-far] O programa imprime também D = B = 50,0, L = 82,50, V = V̄ = 132,50 e L̄ = 182,50 kmol/h, e o cruzamento das retas em y = 0,6698, abaixo do ponto de contato 0,7143, como deve ser com refluxo acima do mínimo.

[step] 

### Degraus do topo ao fundo

[purpose] Percorrer a coluna estágio por estágio, alternando equilíbrio e reta de operação, trocar de reta no estágio de alimentação e parar no primeiro estágio com líquido abaixo de xB.

```
# Degraus a partir do topo: o vapor do estágio 1 tem y = x_D
xs, ys = [], [] # composições de cada estágio, do topo
y = x_D # vapor que sai do estágio 1
estagio_alim = None # ainda não encontrado
while True:
 x = x_eq(y) # horizontal até o equilíbrio
 xs.append(x)
 ys.append(y)
 if estagio_alim is None and x <= z_F:
 estagio_alim = len(xs) # primeiro degrau com x <= z_F
 if x <= x_B:
 break # chegou ao fundo
 if estagio_alim is None:
 y = y_ret(x) # vertical até a reta de cima
 else:
 y = y_esg(x) # vertical até a reta de baixo
N = len(xs)

print(" n x y")
for n in range(N):
 nota = ""
 if n + 1 == estagio_alim:
 nota = " <- alimentação"
 if n + 1 == N:
 nota = " <- refervedor"
 print(f"{n + 1:2d} {xs[n]:.4f} {ys[n]:.4f}{nota}")
print(f"Estágios teóricos (com refervedor): N = {N}")
print(f"Estágio de alimentação, a partir do topo: {estagio_alim}")
print(f"Pratos teóricos na coluna (sem refervedor): {N - 1}")
```

[how] 

xs, ys = [], [] cria duas listas vazias de uma vez. Uma lista guarda uma sequência de valores; xs.append(x) acrescenta x no fim, e len(xs) diz quantos elementos ela tem, que é justamente o número do estágio recém-calculado.

Com condensador total, o vapor do estágio 1 condensa sem mudar de composição, por isso começa-se com y = x_D.

None é o valor “nada” do Python: enquanto estagio_alim for None, ainda estamos na retificação. is None testa exatamente isso.

while True: repete o bloco recuado sem fim, até encontrar break, que sai do laço. Cada volta é um degrau: x_eq(y) é o traço horizontal, do vapor ao líquido em equilíbrio; y_ret(x) ou y_esg(x) é o traço vertical, do líquido ao vapor do estágio de baixo.

A ordem dos testes segue o enunciado: o primeiro degrau com x ≤ zF é marcado como alimentação, e a partir dele a vertical vai para a reta de esgotamento. O teste x ≤ xB vem antes da vertical: o degrau que atinge o fundo é o refervedor, e não há estágio abaixo dele.

for n in range(N): repete o bloco com n = 0, 1, …, N−1. O Python numera as listas a partir de zero, por isso xs[n] é o estágio n + 1. :2d escreve um número inteiro ocupando 2 posições, para alinhar a tabela.

Não há tolerância nem convergência aqui: cada conta é exata, e o resultado é um número inteiro de degraus. Como o último degrau quase sempre passa além de xB, a coluna real com esse número de estágios ainda separa um pouco melhor do que o pedido.

[so-far] O programa imprime a tabela dos 12 estágios, com o líquido e o vapor de cada um, marca a alimentação no estágio 6 e o refervedor no 12, e conclui: N = 12 estágios teóricos, ou 11 pratos mais o refervedor.

[step] 

### Verificação por dois caminhos independentes

[purpose] Confirmar o refluxo mínimo sem usar a reta de retificação, pela equação de Underwood, e confirmar a contagem de degraus no caso-limite de refluxo total, que tem a solução analítica de Fenske.

```
# Verificação 1: Underwood. Com líquido saturado (q = 1),
# soma de alfa_i*z_i/(alfa_i - theta) = 0 dá theta direto:
theta = alfa / (1 + (alfa - 1) * z_F)
R_min_U = (alfa * x_D / (alfa - theta)
 + (1 - x_D) / (1 - theta) - 1)
print(f"R_min por Underwood: {R_min_U:.3f}")

# Verificação 2: refluxo total. As retas viram a diagonal,
# e Fenske dá o número mínimo de estágios.
sep = (x_D / (1 - x_D)) * ((1 - x_B) / x_B)
N_min = np.log(sep) / np.log(alfa)
x, n_tot = x_D, 0
while x > x_B:
 x = x_eq(x) # na diagonal, o próximo y é o x atual
 n_tot += 1
print(f"Fenske: N_min = {N_min:.2f}, "
 f"arredondado para cima: {int(np.ceil(N_min))}")
print(f"Degraus contados no refluxo total: {n_tot}")
```

[how] 

A equação de Underwood calcula o refluxo mínimo a partir da volatilidade de cada componente (2,5 para o benzeno, 1 para o tolueno), sem traçar retas. Para alimentação de líquido saturado e mistura binária, a raiz theta sai numa fórmula. A conta deve dar o mesmo 1,100.

Os parênteses em volta de uma expressão longa permitem quebrá-la em duas linhas; o mesmo vale para os dois textos dentro do print, que o Python emenda.

No refluxo total (R → ∞), as duas retas de operação coincidem com a diagonal, e a equação de Fenske, Nmín = ln(separação)/ln α, dá o número mínimo de estágios, com o refervedor incluído. np.log é o logaritmo natural, np.ceil arredonda para cima e int transforma o resultado em número inteiro.

O laço while x > x_B: repete os degraus enquanto o líquido ainda não chegou ao fundo, agora com a diagonal no lugar das retas; n_tot += 1 soma 1 ao contador. Ele exercita a mesma lógica de degraus e o mesmo equilíbrio do passo anterior, e o resultado deve ser o valor de Fenske arredondado para cima.

[so-far] O programa imprime Rmín = 1,100 também por Underwood, Nmín = 6,43 por Fenske e 7 degraus contados no refluxo total, igual ao arredondamento. Com R = 1,650, os 12 estágios ficam acima desse mínimo, como devem.

[step] 

### Diagrama de McCabe–Thiele

[purpose] Desenhar a curva de equilíbrio, a diagonal, as retas de operação e os degraus, para ver a escada que o laço percorreu.

```
xx = np.linspace(0, 1, 201)
plt.plot(xx, y_eq(xx), label="Curva de equilíbrio")
plt.plot([0, 1], [0, 1], label="Diagonal")
plt.plot([x_D, z_F, x_B], [x_D, y_ret(z_F), x_B],
 label="Retas de operação")
# Degraus: horizontal até o equilíbrio, vertical até a reta
px, py = [x_D], [x_D]
for n in range(N):
 y_baixo = ys[n + 1] if n + 1 < N else xs[n]
 px += [xs[n], xs[n]]
 py += [ys[n], y_baixo]
plt.plot(px, py, label="Degraus")
plt.xlabel("x, fração molar de benzeno no líquido (-)")
plt.ylabel("y, fração molar de benzeno no vapor (-)")
plt.xlim(0, 1)
plt.ylim(0, 1)
plt.legend()
plt.grid(True)
plt.show()
```

[how] 

np.linspace(0, 1, 201) cria 201 valores igualmente espaçados de 0 a 1. Passada a y_eq, essa sequência volta inteira transformada, ponto a ponto: as funções do passo 1 funcionam com um número ou com uma sequência NumPy.

plt.plot(lista_x, lista_y, label=…) liga os pontos por segmentos; label é o nome que vai para a legenda. As retas de operação são uma linha quebrada de três pontos: (xD, xD), o cruzamento em zF e (xB, xB).

Cada degrau acrescenta dois pontos com o mesmo x: o canto sobre a curva de equilíbrio e o pé sobre a reta de operação. a if condição else b escolhe a ou b numa linha só; no último degrau não há estágio abaixo, e a vertical desce até a diagonal. += numa lista acrescenta os elementos da outra no fim.

xlabel e ylabel dão nome aos eixos; xlim e ylim fixam o intervalo de 0 a 1; legend mostra os nomes; grid(True) desenha a grade; show abre a janela.

[so-far] O programa está completo: imprime todas as respostas e as verificações e termina com o diagrama de McCabe–Thiele.

[step] 

### Programa completo

```
import numpy as np
import matplotlib.pyplot as plt

# Dados do enunciado (frações molares de benzeno)
z_F = 0.50 # alimentação, -
x_D = 0.95 # destilado, -
x_B = 0.05 # produto de fundo, -
alfa = 2.5 # volatilidade relativa benzeno/tolueno, -
fator = 1.5 # R = fator * R_min, -
F = 100.0 # vazão de alimentação, kmol/h (base de cálculo)

def y_eq(x):
 """Vapor em equilíbrio com o líquido x."""
 return alfa * x / (1 + (alfa - 1) * x)

def x_eq(y):
 """Líquido em equilíbrio com o vapor y (inversa de y_eq)."""
 return y / (alfa - (alfa - 1) * y)

# Líquido saturado: a linha q é vertical, em x = z_F.
# No refluxo mínimo, a reta de retificação toca o equilíbrio ali.
y_pinch = y_eq(z_F)
R_min = (x_D - y_pinch) / (y_pinch - z_F)
R = fator * R_min
print(f"Ponto de contato: x = {z_F:.3f}, y* = {y_pinch:.4f}")
print(f"Razão de refluxo mínima: R_min = {R_min:.3f}")
print(f"Razão de refluxo de operação: R = {R:.3f}")

# Balanços globais da coluna: total e de benzeno
D = F * (z_F - x_B) / (x_D - x_B) # destilado, kmol/h
B = F - D # produto de fundo, kmol/h
L = R * D # líquido na retificação, kmol/h
V = L + D # vapor na retificação, kmol/h
L_b = L + F # líquido no esgotamento, kmol/h
V_b = V # vapor no esgotamento, kmol/h
print(f"D = {D:.1f} B = {B:.1f} L = {L:.2f} V = {V:.2f} kmol/h")
print(f"L' = {L_b:.2f} V' = {V_b:.2f} kmol/h")

def y_ret(x):
 """Reta de operação da seção de retificação."""
 return L / V * x + D / V * x_D

def y_esg(x):
 """Reta de operação da seção de esgotamento."""
 return L_b / V_b * x - B / V_b * x_B

print(f"As retas se cruzam em x = {z_F:.3f}, y = {y_ret(z_F):.4f}")

# Degraus a partir do topo: o vapor do estágio 1 tem y = x_D
xs, ys = [], [] # composições de cada estágio, do topo
y = x_D # vapor que sai do estágio 1
estagio_alim = None # ainda não encontrado
while True:
 x = x_eq(y) # horizontal até o equilíbrio
 xs.append(x)
 ys.append(y)
 if estagio_alim is None and x <= z_F:
 estagio_alim = len(xs) # primeiro degrau com x <= z_F
 if x <= x_B:
 break # chegou ao fundo
 if estagio_alim is None:
 y = y_ret(x) # vertical até a reta de cima
 else:
 y = y_esg(x) # vertical até a reta de baixo
N = len(xs)

print(" n x y")
for n in range(N):
 nota = ""
 if n + 1 == estagio_alim:
 nota = " <- alimentação"
 if n + 1 == N:
 nota = " <- refervedor"
 print(f"{n + 1:2d} {xs[n]:.4f} {ys[n]:.4f}{nota}")
print(f"Estágios teóricos (com refervedor): N = {N}")
print(f"Estágio de alimentação, a partir do topo: {estagio_alim}")
print(f"Pratos teóricos na coluna (sem refervedor): {N - 1}")

# Verificação 1: Underwood. Com líquido saturado (q = 1),
# soma de alfa_i*z_i/(alfa_i - theta) = 0 dá theta direto:
theta = alfa / (1 + (alfa - 1) * z_F)
R_min_U = (alfa * x_D / (alfa - theta)
 + (1 - x_D) / (1 - theta) - 1)
print(f"R_min por Underwood: {R_min_U:.3f}")

# Verificação 2: refluxo total. As retas viram a diagonal,
# e Fenske dá o número mínimo de estágios.
sep = (x_D / (1 - x_D)) * ((1 - x_B) / x_B)
N_min = np.log(sep) / np.log(alfa)
x, n_tot = x_D, 0
while x > x_B:
 x = x_eq(x) # na diagonal, o próximo y é o x atual
 n_tot += 1
print(f"Fenske: N_min = {N_min:.2f}, "
 f"arredondado para cima: {int(np.ceil(N_min))}")
print(f"Degraus contados no refluxo total: {n_tot}")

xx = np.linspace(0, 1, 201)
plt.plot(xx, y_eq(xx), label="Curva de equilíbrio")
plt.plot([0, 1], [0, 1], label="Diagonal")
plt.plot([x_D, z_F, x_B], [x_D, y_ret(z_F), x_B],
 label="Retas de operação")
# Degraus: horizontal até o equilíbrio, vertical até a reta
px, py = [x_D], [x_D]
for n in range(N):
 y_baixo = ys[n + 1] if n + 1 < N else xs[n]
 px += [xs[n], xs[n]]
 py += [ys[n], y_baixo]
plt.plot(px, py, label="Degraus")
plt.xlabel("x, fração molar de benzeno no líquido (-)")
plt.ylabel("y, fração molar de benzeno no vapor (-)")
plt.xlim(0, 1)
plt.ylim(0, 1)
plt.legend()
plt.grid(True)
plt.show()
```

Os seis passos juntos, na ordem, prontos para rodar.

## Resultado

[answer] 

Razão de refluxo mínima: Rmín = 1,100. Razão de refluxo de operação: R = 1,650. Número de estágios teóricos: N = 12, com o refervedor incluído (11 pratos teóricos mais o refervedor). Estágio de alimentação: o 6º estágio, contado a partir do topo.

[figura; controles: fator, alfa] 

### Por que existe um refluxo mínimo?

Sobre a vertical x = 0,500, a curva de equilíbrio está em y* = 0,7143 e o cruzamento das retas de operação está em y = 0,6698. Os degraus cabem na fresta entre as duas curvas; reduzir R sobe esse cruzamento, e com R = Rmín = 1,100 ele encosta na curva de equilíbrio, a fresta se fecha e seriam necessários infinitos degraus.

### Onde os degraus ficam mais curtos?

Perto da alimentação, onde a fresta é mais estreita: do estágio 5 para o 6, o líquido passa de x = 0,5309 para 0,4699, enquanto do estágio 8 para o 9 ele desce de 0,3168 para 0,2228. É nessa região de estrangulamento que se gasta a maior parte dos estágios, e é ela que qualquer redução de refluxo encarece primeiro.

### O último degrau termina exatamente em xB?

Não: o 11º estágio ainda tem x = 0,0772, acima de 0,05, e o 12º (o refervedor) já desce a 0,0369. Doze estágios inteiros produzem um fundo um pouco mais puro que o pedido; o número exato, fracionário, ficaria entre 11 e 12, e a contagem inteira arredonda para o lado seguro.

### Leve R / Rmín a 1,20

O cruzamento das retas de operação sobe em direção à curva de equilíbrio, a fresta perto da alimentação se estreita e os degraus se amontoam ali. Com menos refluxo, a coluna precisa de mais estágios: é a troca entre custo de operação (refluxo, vapor no refervedor) e custo de investimento (altura da coluna).

[in-your-code] No programa, troque para fator = 1.2. Ele passa a imprimir R = 1,320, N = 15 estágios teóricos e alimentação no estágio 7; Rmín continua 1,100.

### Leve α a 2,0

Com volatilidade relativa menor, a curva de equilíbrio se aproxima da diagonal: cada estágio separa menos, o ponto de contato desce e o próprio refluxo mínimo aumenta. As duas coisas somam-se, e a coluna fica mais alta mesmo operando com mais refluxo.

[in-your-code] No programa, troque para alfa = 2.0. Ele passa a imprimir Rmín = 1,700, R = 2,550, N = 16 estágios teóricos e alimentação no estágio 8.

 Ficou alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Operações unitárias · destilação binária · McCabe–Thiele

# Número de estágios de uma coluna pelo método de McCabe–Thiele

[problem] 

Uma mistura equimolar de benzeno e tolueno, alimentada como líquido saturado, é destilada numa coluna com condensador total. O destilado tem xD = 0,95 mol/mol de benzeno, e o produto de fundo tem xB = 0,05 mol/mol. A alimentação tem zF = 0,50 mol/mol. A volatilidade relativa é constante, α = 2,5, e a razão de refluxo é 1,5 vez a mínima.

Qual é a razão de refluxo mínima?

Qual é a razão de refluxo de operação?

Quantos estágios teóricos são necessários, contando o refervedor?

Qual é o estágio de alimentação, contado do topo?

Numa coluna, o vapor sobe e o líquido desce, e cada estágio aproxima os dois do equilíbrio. O método de McCabe–Thiele conta esses estágios como degraus entre a curva de equilíbrio e as linhas de operação. No fim, você terá um programa que faz a contagem e desenha o diagrama.

## Modelo

### Balanço global de massa da coluna, em mol

 ⟦acúmulo = entra − sai⟧ 

(princípio) A massa não aparece nem some. O volume de controle é a coluna inteira, com o condensador e o refervedor.

 ⟦acúmulo = 0⟧ 

(suposição) Regime permanente: o nível e a composição não mudam. Se a coluna estivesse enchendo, o acúmulo seria diferente de zero e entraria na conta.

[final] 

 ⟦F = D {destilado} + B {fundo}⟧ 

F — vazão da alimentação, mol; tomamos F = 1 mol como base

D — destilado, mol

B — produto de fundo, mol

(álgebra) Com acúmulo nulo, o que entra se divide entre o destilado e o fundo.

Com F = 1 mol, o destilado e o fundo somam 1 mol. A próxima conta diz quanto de cada um.

### Balanço de benzeno na coluna toda, em mol

 ⟦benzeno que entra = benzeno que sai⟧ 

(princípio) O benzeno também não some. O volume de controle é o mesmo da etapa anterior.

 ⟦F ⋅ z_F {entra} = D ⋅ x_D + B ⋅ x_B {sai}⟧ 

zF, xD, xB — fração molar de benzeno na alimentação, no destilado e no fundo, mol/mol

(tradução) Cada termo é a vazão molar de benzeno em uma corrente.

[final] 

 ⟦(D)/(F) = (z_F − x_B )/(x_D − x_B )⟧ 

(álgebra) Isolando D/F na equação anterior, com B = F − D.

Com F = 1 mol, o cálculo dá D = 0,50 mol e B = 0,50 mol. Essas vazões entram nas linhas de operação.

### Balanço na seção de retificação, acima da alimentação, em mol

 ⟦vapor que chega = refluxo que desce + destilado⟧ 

(princípio) O volume de controle é a parte da coluna acima do estágio n + 1, com o condensador. O vapor do estágio n + 1 é o que chega; o refluxo e o destilado são o que sai.

 ⟦V {vapor} = L + D {refluxo e destilado}⟧ 

V — vazão molar de vapor na seção de retificação, mol

L — vazão molar de líquido de refluxo, mol

(tradução) Balanço total de moles, sem separar os componentes.

 ⟦V ⋅ y_n + 1 {benzeno no vapor} = L ⋅ x_n + D ⋅ x_D {benzeno que sai}⟧ 

yn+1 — fração molar de benzeno no vapor que chega ao estágio n, mol/mol

xn — fração molar de benzeno no líquido do estágio n, mol/mol

(tradução) Balanço do benzeno, com as mesmas correntes.

 ⟦L , V constantes ao longo da seção⟧ 

(suposição) Cada mol que condensa vaporiza um mol de líquido, porque o calor latente é o mesmo para os dois componentes. Se isso não valesse, L e V mudariam de estágio para estágio, e seria preciso um balanço de energia em cada um.

 ⟦L = R ⋅ D , V = ( R + 1 ) ⋅ D⟧ 

(definição) R é a razão de refluxo, L/D. Com ela, L e V ficam em função de D.

[final] 

 ⟦y_n + 1 = (R)/(R + 1) ⋅ x_n {inclinação} + (x_D )/(R + 1) {intercepto}⟧ 

(álgebra) Dividindo o balanço do benzeno por V e usando L/V e D/V dos passos anteriores.

Esta é a linha de retificação. Ela liga o vapor que chega ao líquido do estágio n. Passa pelo ponto (xD, xD), e a inclinação é R/(R + 1), menor que 1.

### Balanço na seção de esgotamento, abaixo da alimentação, em mol

 ⟦líquido que chega = vapor que sai + fundo⟧ 

(princípio) O volume de controle é a parte da coluna abaixo do estágio m, com o refervedor. O líquido do estágio m é o que chega; o vapor do estágio m + 1 e o fundo são o que sai.

 ⟦L ′ {líquido} = V ′ + B {vapor e fundo}⟧ 

L′, V′ — vazões molares de líquido e de vapor na seção de esgotamento, mol

(tradução) Balanço total de moles abaixo da alimentação.

 ⟦L ′ = L + F , V ′ = V⟧ 

(suposição) A alimentação é líquido saturado (q = 1): ela se soma ao líquido que desce e não muda o vapor. Se fosse vapor ou mistura, esses fluxos mudariam e a inclinação da linha de esgotamento também.

 ⟦L ′ ⋅ x_n {benzeno no líquido} = V ′ ⋅ y_n + 1 + B ⋅ x_B {benzeno que sai}⟧ 

(tradução) Balanço do benzeno, com as correntes da seção de esgotamento.

[final] 

 ⟦y_n + 1 = (L ′)/(V ′) ⋅ x_n − (B)/(V ′) ⋅ x_B⟧ 

(álgebra) Dividindo o balanço do benzeno por V′ e usando o balanço total.

Esta é a linha de esgotamento. Ela passa pelo ponto (xB, xB) e pelo cruzamento com a linha de retificação na alimentação. As duas linhas formam as linhas de operação.

[sidenote] O refervedor é um estágio de equilíbrio: o vapor que ele gera está em equilíbrio com o líquido do fundo. Por isso conta como um degrau.

[eq-block] Equilíbrio com volatilidade relativa constante: 

 ⟦y* = (α ⋅ x)/(1 + ( α − 1 ) ⋅ x)⟧ 

y* — fração molar de benzeno no vapor em equilíbrio com o líquido, mol/mol

x — fração molar de benzeno no líquido, mol/mol

α — volatilidade relativa, adimensional; α = 2,5

Não foi derivada: é a relação de equilíbrio do problema. Ela diz que o vapor é mais rico em benzeno que o líquido, por um fator α.

Parâmetro | Valor | Unidade | Fonte | 

α | 2,5 | adimensional | dado | 

zF | 0,50 | mol/mol | dadoequimolar | 

xD | 0,95 | mol/mol | dado | 

xB | 0,05 | mol/mol | dado | 

q | 1 | adimensional | dadolíquido saturado | 

R / Rmin | 1,5 | adimensional | dado1,5 vez a mínima | 

F | 1 | mol | escolhabase de cálculo; as razões não dependem dela | 

Rmin | 1,10 | adimensional | calculadono código, passo 2 | 

R | 1,65 | adimensional | calculado1,5 × 1,10 | 

[technique] 

[technique-name] Cálculo por estágios

O problema é repetir duas relações, a de equilíbrio e a linha de operação, estágio após estágio, até o líquido atingir xB, sem saber antes quantas vezes. Para resolver este tipo de problema, vamos usar o cálculo por estágios: partimos do vapor do topo, achamos o líquido em equilíbrio e depois o vapor seguinte na linha. Ele serve aqui porque as duas relações são explícitas e basta repeti-las até a parada. Em Python, a construção que faz isso é o laço while, que já está na linguagem. Veja a próxima seção para aprender a usá-lo.

## Código

[step] 

### Dados do problema

[purpose] Guardar cada dado numa variável, com a unidade no comentário, para que o resto do programa use nomes e não números soltos.

```
import numpy as np # arrays e logaritmo
import matplotlib.pyplot as plt # o gráfico

alpha = 2.5 # volatilidade relativa, adimensional
xD = 0.95 # benzeno no destilado, mol/mol
xB = 0.05 # benzeno no fundo, mol/mol
zF = 0.50 # benzeno na alimentação, mol/mol
F = 1.0 # base de cálculo: 1 mol de alimentação
fator = 1.5 # R dividido por R_min, adimensional
```

[how] 

import numpy as np: carrega a biblioteca numpy, com o apelido np. Ela traz o logaritmo e as sequências de números.

import matplotlib.pyplot as plt: carrega a biblioteca de gráficos, com o apelido plt.

alpha = 2.5: cria a variável alpha com o valor 2,5. O ponto é o separador decimal, e o texto após # é só comentário.

[so-far] Os dados estão guardados em variáveis. Nenhum cálculo foi feito ainda.

[step] 

### Equilíbrio e refluxo mínimo

[purpose] Escrever a relação de equilíbrio como funções e calcular o refluxo mínimo, que ocorre no ponto em que a linha cruza a alimentação.

```
def y_eq(x): # vapor em equilíbrio com x
 return alpha * x / (1 + (alpha - 1) * x)

def x_eq(y): # líquido em equilíbrio com y
 return y / (alpha - (alpha - 1) * y)

ystar = y_eq(zF) # y* em x = zF, mol/mol
Rmin = (xD - ystar) / (ystar - zF) # refluxo mínimo
print(f"y* em x = zF: {ystar:.4f}")
print(f"Rmin = {Rmin:.2f}")
```

[how] 

def y_eq(x): define uma função de nome y_eq, que recebe um valor x. As linhas indentadas são o corpo da função.

return: devolve o resultado para quem chamou a função. y_eq(0.5) devolve o vapor em equilíbrio com x = 0,5.

x_eq(y): a mesma relação invertida, que dá o líquido a partir do vapor. A escada precisa dela, porque parte do vapor.

f"...{ystar:.4f}": o f antes das aspas põe o valor entre chaves no texto; :.4f mostra 4 casas decimais.

[so-far] O programa sabe o equilíbrio e o refluxo mínimo. O valor impresso de Rmin é o primeiro resultado.

[step] 

### Linhas de operação

[purpose] Calcular o refluxo de operação, as vazões do destilado e do fundo, e as duas linhas de operação, cada uma como uma função de x.

```
R = fator * Rmin # refluxo de operação
D = F * (zF - xB) / (xD - xB) # destilado, mol
B = F - D # fundo, mol
L, V = R * D, (R + 1) * D # refluxo e vapor, retificação
Lp, Vp = L + F, V # líquido e vapor, esgotamento

def op_ret(x): # linha de retificação
 return (L / V) * x + (D / V) * xD

def op_esg(x): # linha de esgotamento
 return (Lp / Vp) * x - (B / Vp) * xB

yint = op_ret(zF) # cruzamento com a alimentação
print(f"R = {R:.2f}, D = {D:.2f} mol, B = {B:.2f} mol")
print(f"Retificação: y = {L/V:.4f} x + {D/V*xD:.4f}")
print(f"Esgotamento: y = {Lp/Vp:.4f} x - {B/Vp*xB:.4f}")
print(f"Cruzamento em x = zF: y = {yint:.4f}")
```

[how] 

L, V = R * D, (R + 1) * D: atribuição de duas variáveis de uma vez. Os valores do lado direito formam uma tupla, um par; o primeiro vai para L e o segundo para V.

D = F * (zF - xB) / (xD - xB): o balanço de benzeno, isolando D. Com F = 1, dá 0,50 mol.

def op_ret(x): função da linha de retificação; devolve o vapor da linha para o líquido x. Ela é a equação do balanço da seção de retificação.

op_esg(x): a mesma ideia para a seção de esgotamento. Ela ganha a inclinação L′/V′ e o intercepto −(B/V′)·xB.

yint = op_ret(zF): o ponto em que a linha cruza a alimentação, x = zF.

[so-far] As duas linhas estão definidas. Os valores impressos são a inclinação e o intercepto de cada uma.

[step] 

### Escada de degraus

[purpose] Percorrer a escada a partir do topo. Em cada estágio, o líquido vem da curva de equilíbrio e o vapor seguinte, da linha de operação. A troca de linha acontece no primeiro estágio com líquido até zF.

```
y = xD # vapor que sai do estágio 1
xl = [] # líquido de cada estágio, mol/mol
pts = [(xD, xD)] # vértices da escada, para o gráfico
feed = None # estágio de alimentação
while len(xl) < 100: # limite de segurança
 x = x_eq(y) # líquido em equilíbrio com y
 xl.append(x)
 pts.append((x, y))
 if feed is None and x <= zF:
 feed = len(xl) # este é o estágio de alimentação
 if x <= xB:
 break # fundo atingido: para a contagem
 y = op_ret(x) if feed is None else op_esg(x)
 pts.append((x, y))
```

[how] 

while len(xl) < 100:: repete o bloco de baixo enquanto a condição for verdadeira. len(xl) é o número de elementos da lista xl. O limite de 100 impede um laço sem fim, se o caso não convergir.

xl = []: lista vazia. xl.append(x) acrescenta x ao fim da lista; ao final, xl tem um valor por estágio.

(x, y): uma tupla de dois valores. pts.append((x, y)) guarda o par, que é um vértice da escada.

feed is None: testa se feed ainda não recebeu valor. A primeira vez que x ≤ zF, o estágio atual vira o de alimentação.

break: sai do laço imediatamente; o programa segue para o que vem depois do while.

op_ret(x) if feed is None else op_esg(x): escolhe a linha: a de retificação enquanto a alimentação não foi atingida, e a de esgotamento depois.

[so-far] Ao sair do laço, xl tem o líquido de cada estágio, feed diz em qual estágio ocorre a alimentação, e pts tem os vértices da escada.

[step] 

### Conferência e contagem

[purpose] Imprimir os estágios e a contagem. Depois, conferir o resultado com dois cálculos que não usam a escada: o limite de refluxo total, pela equação de Fenske, e o balanço de benzeno.

```
for n, x in enumerate(xl, start=1): # n: número, x: líquido
 print(f"estágio {n}: x = {x:.4f}")
print(f"Estágios teóricos: {len(xl)}, "
 f"estágio de alimentação: {feed}")
Nmin = np.log(xD / (1 - xD) * (1 - xB) / xB) / np.log(alpha)
print(f"Fenske (refluxo total): {Nmin:.2f}")
print(f"Balanço: F*zF = {F*zF:.4f}, "
 f"D*xD+B*xB = {D*xD + B*xB:.4f}")
```

[how] 

for n, x in enumerate(xl, start=1):: repete para cada item de xl. enumerate entrega um par (número, valor), e start=1 faz a contagem começar em 1.

len(xl): o número de estágios, incluindo o refervedor, que é o último.

np.log(...): logaritmo natural. A equação de Fenske dá o número mínimo de estágios com refluxo total; ele é um limite inferior, e a coluna real precisa de mais.

A linha print(...) quebrada em duas: a barra invertida no fim de uma linha não é usada aqui, porque o parêntese mantém a instrução aberta até a próxima linha.

[so-far] O programa imprime o líquido de cada estágio, a contagem, o limite de Fenske e o fechamento do balanço.

[step] 

### Diagrama de McCabe–Thiele

[purpose] Desenhar a curva de equilíbrio, as linhas de operação e a escada. É o gráfico que você verá ao rodar o programa.

```
xg = np.linspace(0, 1, 101) # 101 valores de x, de 0 a 1
fig, ax = plt.subplots()
ax.plot(xg, y_eq(xg), label="Curva de equilíbrio")
ax.plot([xD, zF, xB], [xD, yint, xB], label="Linhas de operação")
px, py = zip(*pts) # separa os vértices em x e y
ax.plot(px, py, label="Degraus")
ax.set_xlabel("x, benzeno no líquido (mol/mol)")
ax.set_ylabel("y, benzeno no vapor (mol/mol)")
ax.legend()
plt.show()
```

[how] 

np.linspace(0, 1, 101): 101 números igualmente espaçados de 0 a 1; a curva é desenhada com eles.

fig, ax = plt.subplots(): cria a figura e o eixo; a mesma tupla da etapa das variáveis.

ax.plot(x, y, label=...): desenha uma linha com os valores de x e y; label é o nome que aparece na legenda.

zip(*pts): *pts separa a lista de pares em pares soltos; o zip agrupa os primeiros elementos e os segundos. Assim, px recebe todos os x da escada e py, todos os y.

plt.show(): abre a janela com o gráfico.

[so-far] Ao rodar, o programa mostra o diagrama com a curva, as linhas de operação e a escada.

[step] 

### Programa completo

```
import numpy as np # arrays e logaritmo
import matplotlib.pyplot as plt # o gráfico

alpha = 2.5 # volatilidade relativa, adimensional
xD = 0.95 # benzeno no destilado, mol/mol
xB = 0.05 # benzeno no fundo, mol/mol
zF = 0.50 # benzeno na alimentação, mol/mol
F = 1.0 # base de cálculo: 1 mol de alimentação
fator = 1.5 # R dividido por R_min, adimensional

def y_eq(x): # vapor em equilíbrio com x
 return alpha * x / (1 + (alpha - 1) * x)

def x_eq(y): # líquido em equilíbrio com y
 return y / (alpha - (alpha - 1) * y)

ystar = y_eq(zF) # y* em x = zF, mol/mol
Rmin = (xD - ystar) / (ystar - zF) # refluxo mínimo
print(f"y* em x = zF: {ystar:.4f}")
print(f"Rmin = {Rmin:.2f}")

R = fator * Rmin # refluxo de operação
D = F * (zF - xB) / (xD - xB) # destilado, mol
B = F - D # fundo, mol
L, V = R * D, (R + 1) * D # refluxo e vapor, retificação
Lp, Vp = L + F, V # líquido e vapor, esgotamento

def op_ret(x): # linha de retificação
 return (L / V) * x + (D / V) * xD

def op_esg(x): # linha de esgotamento
 return (Lp / Vp) * x - (B / Vp) * xB

yint = op_ret(zF) # cruzamento com a alimentação
print(f"R = {R:.2f}, D = {D:.2f} mol, B = {B:.2f} mol")
print(f"Retificação: y = {L/V:.4f} x + {D/V*xD:.4f}")
print(f"Esgotamento: y = {Lp/Vp:.4f} x - {B/Vp*xB:.4f}")
print(f"Cruzamento em x = zF: y = {yint:.4f}")

y = xD # vapor que sai do estágio 1
xl = [] # líquido de cada estágio, mol/mol
pts = [(xD, xD)] # vértices da escada, para o gráfico
feed = None # estágio de alimentação
while len(xl) < 100: # limite de segurança
 x = x_eq(y) # líquido em equilíbrio com y
 xl.append(x)
 pts.append((x, y))
 if feed is None and x <= zF:
 feed = len(xl) # este é o estágio de alimentação
 if x <= xB:
 break # fundo atingido: para a contagem
 y = op_ret(x) if feed is None else op_esg(x)
 pts.append((x, y))

for n, x in enumerate(xl, start=1): # n: número, x: líquido
 print(f"estágio {n}: x = {x:.4f}")
print(f"Estágios teóricos: {len(xl)}, "
 f"estágio de alimentação: {feed}")
Nmin = np.log(xD / (1 - xD) * (1 - xB) / xB) / np.log(alpha)
print(f"Fenske (refluxo total): {Nmin:.2f}")
print(f"Balanço: F*zF = {F*zF:.4f}, "
 f"D*xD+B*xB = {D*xD + B*xB:.4f}")

xg = np.linspace(0, 1, 101) # 101 valores de x, de 0 a 1
fig, ax = plt.subplots()
ax.plot(xg, y_eq(xg), label="Curva de equilíbrio")
ax.plot([xD, zF, xB], [xD, yint, xB], label="Linhas de operação")
px, py = zip(*pts) # separa os vértices em x e y
ax.plot(px, py, label="Degraus")
ax.set_xlabel("x, benzeno no líquido (mol/mol)")
ax.set_ylabel("y, benzeno no vapor (mol/mol)")
ax.legend()
plt.show()
```

Os seis blocos anteriores, na ordem, formam este programa. Copie-o e rode-o no editor.

## Resultado

[answer] 

Refluxo mínimo: Rmin = 1,10. Refluxo de operação: R = 1,5 × 1,10 = 1,65. Estágios teóricos: 12, contando o refervedor. Estágio de alimentação: 6, contado do topo.

[figura; controles: fator] 

### Em que estágio a escada muda de linha?

No estágio 6, o líquido vale x = 0,4699, abaixo de zF = 0,50. No estágio 5 ele ainda era 0,5309, acima. A partir do estágio 6, o vapor seguinte sai da linha de esgotamento, e a escada muda de inclinação. O estágio 6 é a alimentação.

### Quando a escada para?

No estágio 11, x = 0,0772 ainda é maior que xB = 0,05. No estágio 12, x = 0,0369 já é menor. Logo, são 12 degraus, e o último é o refervedor.

### Leve R / R_min para 2,0

Mais refluxo afasta as linhas de operação da curva de equilíbrio. Cada degrau avança mais, e a escada precisa de menos estágios. Com R / Rmin = 2,0, o diagrama tem 10 degraus, e a alimentação passa para o estágio 5.

[in-your-code] No código, troque fator = 1.5 por fator = 2.0 e rode. O programa passa a imprimir Estágios teóricos: 10, estágio de alimentação: 5.

 Algo não ficou claro? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
