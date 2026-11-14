# Comparação 6baa7d

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/6baa7d.json`.

# Enunciado enviado ao modelo

Uma aleta em forma de pino, de alumínio (k = 200 W/(m·K)), com 8 mm de diâmetro e 10 cm de comprimento, tem a base a 600 K e troca calor com o ar e com a vizinhança, ambos a 300 K, por convecção (h = 15 W/(m²·K)) e por radiação (emissividade 0,8; σ = 5,67·10⁻⁸ W/(m²·K⁴)). A ponta é adiabática e a condução é unidimensional. Calcule a temperatura da ponta (K) e a taxa de calor dissipada pela aleta (W). Sem a radiação, quais seriam a taxa de calor (W) e a temperatura da ponta (K)?


==================== LIÇÃO 1 ====================

Transferência de calor · problema de valor de contorno

# Aleta de pino com convecção e radiação

[problem] 

Uma aleta em forma de pino, de alumínio (k = 200 W/(m·K)), com diâmetro D = 8 mm e comprimento L = 10 cm, tem a base a Tb = 600 K. Ela troca calor com o ar e com a vizinhança, ambos a T∞ = 300 K, por convecção (h = 15 W/(m²·K)) e por radiação (emissividade ε = 0,8; σ = 5,67·10⁻⁸ W/(m²·K⁴)). A ponta é adiabática e a condução é unidimensional.

Temperatura da ponta, em K.

Taxa de calor dissipada pela aleta, em W.

Sem a radiação, a taxa de calor (W) e a temperatura da ponta (K).

O calor entra pela base, caminha por condução ao longo do pino e sai pela superfície lateral para o ar e para a vizinhança; por isso a temperatura cai da base para a ponta. A radiação depende de T⁴, o que torna a equação não linear e sem fórmula fechada. Ao final, você terá um programa que resolve esse perfil de temperatura numericamente, com e sem radiação, e confere o resultado de duas formas independentes.

## Modelo

### Balanço de energia numa fatia do pino, em W

 ⟦acúmulo de energia = entra por condução − sai por condução − perdido pela superfície⟧ 

(princípio) Conservação da energia. O volume de controle é uma fatia do pino entre as posições x e x + dx, medidas a partir da base.

 ⟦acúmulo de energia = 0⟧ 

(hipótese) Regime permanente: a base está a 600 K há tempo suficiente para o perfil não mudar mais. Se a aleta estivesse aquecendo, entraria o termo ρ·cp·∂T/∂t, e a temperatura dependeria de x e do tempo.

 ⟦0 = q_x {entra por condução} − q_x + d x {sai por condução} − d q_sup {perdido pela lateral}⟧ 

x — distância da base até a fatia, medida ao longo do pino, m

qx — taxa de calor que atravessa, por condução, a seção do pino na posição x, W

dqsup — taxa de calor que a superfície lateral da fatia entrega ao ar e à vizinhança, W

(tradução) Cada termo em palavras vira uma taxa de calor. A condução é unidimensional, como diz o enunciado: só há fluxo ao longo de x. Se o pino fosse grosso, a temperatura variaria também no raio e o modelo teria duas dimensões.

 ⟦q_x + d x = q_x + (d q_x )/(d x) d x ⇒ − (d q_x )/(d x) d x = d q_sup⟧ 

(álgebra) Numa fatia fina, o calor que sai é o que entra mais a variação ao longo de dx (série de Taylor de primeira ordem). Substituído no balanço, qx se cancela.

 ⟦q_x = − k ⋅ A ⋅ (d T)/(d x) ⇒ k ⋅ A ⋅ (d^(2) T)/(d x^(2) ) d x = d q_sup⟧ 

T — temperatura do pino na posição x, igual em toda a seção, K

k — condutividade térmica do alumínio, W/(m·K)

A — área da seção transversal do pino, π·D²/4, m²

(definição) Lei de Fourier: o calor conduzido é proporcional ao gradiente de temperatura e vai do quente para o frio, daí o sinal negativo. Com k e A constantes, eles saem da derivada. Se k variasse com a temperatura, ele ficaria dentro da derivada.

 ⟦d q_sup = P ⋅ d x ⋅ [ h ( T − T_∞ ) {convecção} + ε σ ( T^(4) − T_∞^(4) ) {radiação} ]⟧ 

P — perímetro da seção do pino, π·D; P·dx é a área lateral da fatia, m

h — coeficiente de convecção entre o pino e o ar, W/(m²·K)

T∞ — temperatura do ar e da vizinhança, K

ε — emissividade da superfície do pino, adimensional

σ — constante de Stefan-Boltzmann, W/(m²·K⁴)

(definição) (hipótese) Lei de Newton do resfriamento para a convecção e lei de Stefan-Boltzmann para a radiação de um corpo pequeno numa vizinhança grande. Se a vizinhança fosse próxima (uma parede de outra aleta, por exemplo), a radiação dependeria de fatores de forma e da emissividade dela.

[final] 

 ⟦(d^(2) T)/(d x^(2) ) {curvatura do perfil} = (P)/(k ⋅ A) [ h ( T − T_∞ ) {convecção} + ε σ ( T^(4) − T_∞^(4) ) {radiação} ]⟧ 

(álgebra) Iguala as duas expressões de dqsup e divide tudo por k·A·dx.

A equação diz que, onde o pino perde muito calor pela lateral, o perfil de temperatura se curva muito: cada fatia precisa receber da vizinha mais quente o calor que entrega ao ambiente. Como o lado direito é sempre positivo enquanto T > T∞, o perfil é côncavo para cima e cai cada vez mais devagar rumo à ponta. O termo T⁴ torna a equação não linear: não há fórmula fechada com radiação.

[eq-block] Condições de contorno: 

 ⟦T ( 0 ) = T_b (d T)/(d x) |_x = L = 0⟧ 

Tb — temperatura imposta na base do pino, K

L — comprimento do pino, da base até a ponta, m

A equação tem segunda derivada, logo pede duas condições. Uma está na base (temperatura conhecida) e a outra na ponta: ponta adiabática quer dizer que não sai calor por ela, e pela lei de Fourier isso é gradiente zero.

[eq-block] Taxa de calor da aleta: 

 ⟦q_a = − k ⋅ A ⋅ (d T)/(d x) |_x = 0⟧ 

qa — taxa de calor dissipada pela aleta, que é a que entra pela base, W

Em regime permanente, todo o calor que a aleta dissipa entra pela base; basta aplicar Fourier em x = 0.

[eq-block] Solução analítica sem radiação: 

 ⟦m = √((h P)/(k A)) q_a = √(h P k A) ( T_b − T_∞ ) tanh ( m L ) T_ponta = T_∞ + (T_b − T_∞ )/(cosh ( m L ))⟧ 

m — parâmetro da aleta, que mede quão rápido a temperatura decai ao longo do pino, 1/m

Com ε = 0 a equação do modelo fica linear e tem esta solução clássica, para ponta adiabática. Ela não serve para o caso com radiação, mas é a referência exata para conferir o programa no caso sem radiação.

Parâmetro | Valor | Unidade | Origem | 

k | 200 | W/(m·K) | enunciado | 

D | 0,008 | m | enunciado8 mm | 

L | 0,10 | m | enunciado10 cm | 

Tb | 600 | K | enunciado | 

T∞ | 300 | K | enunciadoar e vizinhança | 

h | 15 | W/(m²·K) | enunciado | 

ε | 0,8 | — | enunciado | 

σ | 5,67·10⁻⁸ | W/(m²·K⁴) | constante física | 

P | 0,02513 | m | calculadoπ·D | 

A | 5,0265·10⁻⁵ | m² | calculadoπ·D²/4 | 

pontos da malha inicial | 50 | — | escolhao método refina sozinho onde precisar | 

chute inicial | 600 | K | escolhaT = Tb em todo o pino: simples e próximo | 

tolerância | 10⁻⁶ | — | escolhabem abaixo das casas decimais pedidas | 

[technique] 

[technique-name] Problema de contorno

O modelo é uma equação diferencial de segunda ordem com uma condição em cada extremo do pino: a temperatura na base e a derivada na ponta. Para resolver esse tipo de problema, vamos usar um resolvedor de problema de contorno, que divide o pino numa malha de pontos e ajusta o perfil inteiro de uma vez até cumprir a equação e as duas condições. Ele serve aqui porque não dá para “andar” da base à ponta sem conhecer a inclinação na base, e o termo T⁴ impede uma fórmula fechada. Em Python, a função que faz isso é solve_bvp, da biblioteca SciPy (scipy.integrate). Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados e geometria do pino

[purpose] Carregar as bibliotecas, guardar os dados do enunciado em unidades do SI e calcular o perímetro e a área da seção, que aparecem na equação.

```
import numpy as np
from scipy.integrate import solve_bvp, trapezoid
import matplotlib.pyplot as plt

# Dados do enunciado
k = 200.0 # condutividade do alumínio, W/(m·K)
D = 0.008 # diâmetro do pino, m
L = 0.10 # comprimento do pino, m
T_b = 600.0 # temperatura da base, K
T_inf = 300.0 # temperatura do ar e da vizinhança, K
h = 15.0 # coeficiente de convecção, W/(m²·K)
eps = 0.8 # emissividade da superfície
sigma = 5.67e-8 # constante de Stefan-Boltzmann, W/(m²·K⁴)

# Geometria da seção circular
P = np.pi * D # perímetro, m
A = np.pi * D**2 / 4 # área da seção transversal, m²
print(f"P = {P:.5f} m A = {A:.4e} m²")
```

[how] import numpy as np carrega a biblioteca numérica com o apelido np; from scipy.integrate import solve_bvp, trapezoid traz duas funções da SciPy: o resolvedor do problema de contorno e a regra do trapézio, usada na verificação. matplotlib.pyplot, apelidada plt, desenha o gráfico. Cada linha nome = valor guarda um número numa variável; o que vem depois de # é comentário e o Python ignora. 5.67e-8 é a notação científica 5,67·10⁻⁸, e ** é potência. No print, o f antes das aspas permite colocar variáveis entre chaves; :.5f mostra 5 casas decimais e :.4e mostra em notação científica com 4 casas.

[so-far] O programa tem os dados e mostra P = 0,02513 m e A = 5,0265·10⁻⁵ m².

[step] 

### Equação da aleta como função Python

[purpose] Escrever o lado direito do modelo numa função. O resolvedor só aceita equações de primeira ordem, então a equação de segunda ordem vira um sistema de duas: uma para T e outra para a sua derivada.

```
def fluxo(T, e):
 """Calor perdido por m² de superfície, W/m²."""
 conv = h * (T - T_inf)
 rad = e * sigma * (T**4 - T_inf**4)
 return conv + rad

def aleta(x, y, e):
 T, dTdx = y # y[0] = T, y[1] = dT/dx
 d2Tdx2 = P / (k * A) * fluxo(T, e)
 return np.vstack([dTdx, d2Tdx2])

print(f"Na base: convecção {h * (T_b - T_inf):.0f} W/m², "
 f"radiação {fluxo(T_b, eps) - fluxo(T_b, 0):.0f} W/m²")
```

[how] Chamando T de y[0] e dT/dx de y[1], a equação de segunda ordem vira duas de primeira: d(y[0])/dx = y[1] (definição de derivada) e d(y[1])/dx = (P/(kA))·[fluxo] (o modelo). def nome(argumentos): cria uma função: um bloco de código, recuado, que recebe valores e devolve o resultado com return. A função fluxo recebe a temperatura e a emissividade e e devolve o calor perdido por m², convecção mais radiação; a emissividade é argumento, e não a variável global eps, para que a mesma função sirva ao caso sem radiação (e = 0). Em aleta, y chega como uma tabela de duas linhas: a primeira com T em vários pontos da malha, a segunda com dT/dx nesses pontos. T, dTdx = y é um desempacotamento: separa as duas linhas em duas variáveis de uma vez. Como T é um vetor de NumPy, T**4 e as demais contas valem ponto a ponto. np.vstack([a, b]) empilha os dois vetores de derivadas numa tabela do mesmo formato que y, que é o que o resolvedor espera receber. O print compara os dois mecanismos na base; :.0f mostra sem casas decimais.

[so-far] O programa sabe calcular a curvatura do perfil em qualquer ponto e mostra que, na base, a convecção tira 4500 W/m² e a radiação 5511 W/m².

[step] 

### Condições na base e na ponta

[purpose] Escrever as duas condições de contorno de modo que o resolvedor possa conferi-las: cada uma vira um número que deve dar zero.

```
def contorno(ya, yb):
 # ya = [T, dT/dx] na base (x = 0); yb = o mesmo na ponta (x = L)
 return np.array([ya[0] - T_b, # base: T = T_b
 yb[1]]) # ponta adiabática: dT/dx = 0
```

[how] O resolvedor chama contorno a cada tentativa, entregando em ya os valores [T, dT/dx] no início do domínio (a base) e em yb os valores no fim (a ponta). A função devolve os resíduos: quanto cada condição deixa de ser cumprida. ya[0] - T_b é zero quando a base está a 600 K; yb[1] é zero quando a ponta tem gradiente nulo. O número entre colchetes é o índice da posição na lista, começando do zero. np.array([...]) transforma a lista num vetor de NumPy.

[so-far] O programa tem a equação e as duas condições; falta resolvê-las juntas.

[step] 

### Resolução com e sem radiação

[purpose] Chamar solve_bvp dentro de uma função que recebe a emissividade, para resolver os dois casos com o mesmo código, e tirar da solução a temperatura da ponta e o calor da base.

```
def resolver(e):
 x = np.linspace(0, L, 50) # malha inicial, m
 chute = np.vstack([np.full(50, T_b), # T = T_b em tudo
 np.zeros(50)]) # dT/dx = 0 em tudo
 sol = solve_bvp(lambda x, y: aleta(x, y, e), contorno,
 x, chute, tol=1e-6)
 T_ponta = sol.sol(L)[0] # K
 q = -k * A * sol.sol(0)[1] # Fourier na base, W
 return sol, T_ponta, q

sol_r, Tp_r, q_r = resolver(eps) # com radiação
sol_c, Tp_c, q_c = resolver(0.0) # sem radiação
print(f"Convergiu? {sol_r.success} e {sol_c.success}")
print(f"Com radiação: T_ponta = {Tp_r:.1f} K, q = {q_r:.2f} W")
print(f"Sem radiação: T_ponta = {Tp_c:.1f} K, q = {q_c:.2f} W")
```

[how] np.linspace(0, L, 50) cria 50 posições igualmente espaçadas de 0 a L: a malha inicial. np.full(50, T_b) é um vetor com 50 valores iguais a 600 e np.zeros(50), um com 50 zeros; empilhados, formam o chute inicial do perfil. Os argumentos de solve_bvp, um a um:

[how] 

lambda x, y: aleta(x, y, e) — a função das derivadas. O resolvedor chama esta função muitas vezes, sempre com só dois argumentos: as posições x e os valores y da tentativa atual. Mas aleta precisa também de e. O lambda cria uma função curta, sem nome, que recebe x, y e repassa a aleta com o e deste caso já preenchido. A função é passada sem parênteses: quem a executa é o resolvedor.

contorno — a função dos resíduos de contorno, também chamada pelo resolvedor a cada tentativa.

x — a malha inicial. O método acrescenta pontos sozinho onde o erro estiver grande.

chute — o perfil inicial, de onde as tentativas partem. Como o problema é não linear, o método melhora uma estimativa passo a passo, à moda de Newton; um chute razoável (tudo a 600 K) basta aqui.

tol=1e-6 — a tolerância: o critério de precisão. O método só para quando, entre os pontos da malha, a equação diferencial é cumprida com erro relativo menor que 10⁻⁶. Se não conseguir, sol.success sai False.

[how] solve_bvp devolve um objeto; os atributos (o que vem depois do ponto) usados são .success, que diz se convergiu, e .sol, uma função que dá [T, dT/dx] em qualquer posição. Assim, sol.sol(L)[0] é a temperatura na ponta e sol.sol(0)[1] é o gradiente na base, que vai na lei de Fourier. return sol, T_ponta, q devolve três valores de uma vez (uma tupla), e sol_r, Tp_r, q_r = resolver(eps) os desempacota em três variáveis. :.1f e :.2f mostram uma e duas casas decimais.

[so-far] O programa resolve os dois casos e imprime True e True, a temperatura da ponta e o calor dissipado de cada um.

[step] 

### Duas verificações independentes

[purpose] Conferir o resultado sem usar a lei de Fourier da base: primeiro, somando o calor que sai por toda a superfície lateral; depois, comparando o caso sem radiação com a solução analítica.

```
# Verificação 1: o calor da base sai todo pela superfície
xx = np.linspace(0, L, 2001) # m
T_r = sol_r.sol(xx)[0]
T_c = sol_c.sol(xx)[0]
qs_r = trapezoid(P * fluxo(T_r, eps), xx) # W
qs_c = trapezoid(P * fluxo(T_c, 0.0), xx) # W
print(f"Superfície: {qs_r:.2f} W (com) e {qs_c:.2f} W (sem)")

# Verificação 2: solução analítica sem radiação
m = np.sqrt(h * P / (k * A)) # 1/m
q_an = np.sqrt(h * P * k * A) * (T_b - T_inf) * np.tanh(m * L)
Tp_an = T_inf + (T_b - T_inf) / np.cosh(m * L)
print(f"Analítico sem radiação: T_ponta = {Tp_an:.1f} K, "
 f"q = {q_an:.2f} W")
```

[how] sol_r.sol(xx)[0] avalia o perfil em 2001 posições de uma vez e pega a linha das temperaturas. P * fluxo(T_r, eps) é o calor perdido por metro de pino em cada posição, W/m; trapezoid(valores, xx) integra esses valores ao longo de xx pela regra do trapézio, somando áreas de pequenos trapézios. O resultado é o calor que sai pela lateral, calculado só com o perfil de temperatura, sem o gradiente da base. np.sqrt, np.tanh e np.cosh são raiz quadrada, tangente e cosseno hiperbólicos, para as fórmulas analíticas.

[so-far] O programa mostra que o calor pela superfície é igual ao da base nos dois casos (18,32 W e 10,08 W) e que a solução analítica dá os mesmos 551,4 K e 10,08 W do caso sem radiação.

[step] 

### Gráfico dos dois perfis

[purpose] Desenhar a temperatura ao longo do pino nos dois casos, para ver onde a radiação faz diferença.

```
plt.plot(xx * 100, T_r, label="Com radiação")
plt.plot(xx * 100, T_c, label="Sem radiação")
plt.xlabel("Posição ao longo do pino, x (cm)")
plt.ylabel("Temperatura, T (K)")
plt.legend()
plt.grid(True)
plt.show()
```

[how] plt.plot(x, y, label=...) traça uma curva; xx * 100 converte a posição de metros para centímetros, e label é o nome que aparece na legenda. xlabel e ylabel nomeiam os eixos, legend() mostra a legenda, grid(True) liga a grade e show() exibe a figura.

[so-far] O programa está completo: resolve, verifica e desenha.

[step] 

### Programa completo

```
import numpy as np
from scipy.integrate import solve_bvp, trapezoid
import matplotlib.pyplot as plt

# Dados do enunciado
k = 200.0 # condutividade do alumínio, W/(m·K)
D = 0.008 # diâmetro do pino, m
L = 0.10 # comprimento do pino, m
T_b = 600.0 # temperatura da base, K
T_inf = 300.0 # temperatura do ar e da vizinhança, K
h = 15.0 # coeficiente de convecção, W/(m²·K)
eps = 0.8 # emissividade da superfície
sigma = 5.67e-8 # constante de Stefan-Boltzmann, W/(m²·K⁴)

# Geometria da seção circular
P = np.pi * D # perímetro, m
A = np.pi * D**2 / 4 # área da seção transversal, m²
print(f"P = {P:.5f} m A = {A:.4e} m²")

def fluxo(T, e):
 """Calor perdido por m² de superfície, W/m²."""
 conv = h * (T - T_inf)
 rad = e * sigma * (T**4 - T_inf**4)
 return conv + rad

def aleta(x, y, e):
 T, dTdx = y # y[0] = T, y[1] = dT/dx
 d2Tdx2 = P / (k * A) * fluxo(T, e)
 return np.vstack([dTdx, d2Tdx2])

print(f"Na base: convecção {h * (T_b - T_inf):.0f} W/m², "
 f"radiação {fluxo(T_b, eps) - fluxo(T_b, 0):.0f} W/m²")

def contorno(ya, yb):
 # ya = [T, dT/dx] na base (x = 0); yb = o mesmo na ponta (x = L)
 return np.array([ya[0] - T_b, # base: T = T_b
 yb[1]]) # ponta adiabática: dT/dx = 0

def resolver(e):
 x = np.linspace(0, L, 50) # malha inicial, m
 chute = np.vstack([np.full(50, T_b), # T = T_b em tudo
 np.zeros(50)]) # dT/dx = 0 em tudo
 sol = solve_bvp(lambda x, y: aleta(x, y, e), contorno,
 x, chute, tol=1e-6)
 T_ponta = sol.sol(L)[0] # K
 q = -k * A * sol.sol(0)[1] # Fourier na base, W
 return sol, T_ponta, q

sol_r, Tp_r, q_r = resolver(eps) # com radiação
sol_c, Tp_c, q_c = resolver(0.0) # sem radiação
print(f"Convergiu? {sol_r.success} e {sol_c.success}")
print(f"Com radiação: T_ponta = {Tp_r:.1f} K, q = {q_r:.2f} W")
print(f"Sem radiação: T_ponta = {Tp_c:.1f} K, q = {q_c:.2f} W")

# Verificação 1: o calor da base sai todo pela superfície
xx = np.linspace(0, L, 2001) # m
T_r = sol_r.sol(xx)[0]
T_c = sol_c.sol(xx)[0]
qs_r = trapezoid(P * fluxo(T_r, eps), xx) # W
qs_c = trapezoid(P * fluxo(T_c, 0.0), xx) # W
print(f"Superfície: {qs_r:.2f} W (com) e {qs_c:.2f} W (sem)")

# Verificação 2: solução analítica sem radiação
m = np.sqrt(h * P / (k * A)) # 1/m
q_an = np.sqrt(h * P * k * A) * (T_b - T_inf) * np.tanh(m * L)
Tp_an = T_inf + (T_b - T_inf) / np.cosh(m * L)
print(f"Analítico sem radiação: T_ponta = {Tp_an:.1f} K, "
 f"q = {q_an:.2f} W")

plt.plot(xx * 100, T_r, label="Com radiação")
plt.plot(xx * 100, T_c, label="Sem radiação")
plt.xlabel("Posição ao longo do pino, x (cm)")
plt.ylabel("Temperatura, T (K)")
plt.legend()
plt.grid(True)
plt.show()
```

Os seis passos juntos, na ordem, prontos para rodar.

## Resultado

[answer] 

Com convecção e radiação: temperatura da ponta Tponta = 516,6 K e taxa de calor dissipada qa = 18,32 W.

Sem a radiação: taxa de calor qa = 10,08 W e temperatura da ponta Tponta = 551,4 K.

[figura; controles: eps] 

### Por que a radiação quase dobra o calor dissipado?

Na base, a 600 K, a radiação tira 5511 W/m², mais que os 4500 W/m² da convecção. Com h = 15 W/(m²·K), a convecção é fraca, típica de ar parado, e a 600 K a radiação deixa de ser detalhe. Por isso o calor passa de 10,08 W para 18,32 W: a radiação acrescenta 18,32 − 10,08 = 8,24 W. Desprezá-la aqui subestimaria a aleta quase pela metade.

### Por que a ponta fica mais fria quando a aleta dissipa mais?

A temperatura com radiação cai mais rápido logo no início do pino que a temperatura sem radiação: perdendo mais calor por cada centímetro, o pino esfria mais ao longo do caminho, e a ponta chega a 516,6 K em vez de 551,4 K, uma diferença de 551,4 − 516,6 = 34,8 K. A inclinação maior na base é justamente o gradiente que, pela lei de Fourier, puxa mais calor para dentro da aleta.

### Por que as curvas ficam planas perto da ponta?

As duas curvas chegam a x = 10 cm com inclinação zero: é a ponta adiabática imposta como condição de contorno. Perto dela, quase não passa calor pela seção, então a temperatura muda pouco; a maior parte do calor sai pela lateral na metade do pino mais próxima da base, onde o pino está mais quente.

### Leve ε até 0

A curva temperatura com radiação sobe e se sobrepõe à temperatura sem radiação, e a leitura mostra a ponta a 551,4 K e 10,08 W. Sem o termo T⁴, os dois modelos são o mesmo, o que confirma que toda a diferença entre as curvas vem da radiação.

[in-your-code] No programa, troque eps = 0.8 por eps = 0.0: a linha “Com radiação” passa a imprimir T_ponta = 551.4 K, q = 10.08 W, igual à linha “Sem radiação”.

 Ficou alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Transferência de calor · problema de contorno

# Aleta de pino com convecção e radiação

[problem] 

Uma aleta em forma de pino, de alumínio (k = 200 W/(m·K)), com 8 mm de diâmetro e 10 cm de comprimento, tem a base a 600 K e troca calor com o ar e com a vizinhança, ambos a 300 K, por convecção (h = 15 W/(m²·K)) e por radiação (emissividade ε = 0,8; σ = 5,67·10⁻⁸ W/(m²·K⁴)). A ponta é adiabática e a condução é unidimensional.

Calcule a temperatura da ponta (K).

Calcule a taxa de calor dissipada pela aleta (W).

Sem a radiação, quais seriam a taxa de calor (W) e a temperatura da ponta (K)?

A aleta é uma barra que leva calor da base quente para o ar. Ao longo dela, a temperatura cai, e a radiação soma uma perda extra à da convecção. No fim, você terá um programa que calcula a temperatura da ponta e o calor dissipado, com e sem radiação, e desenha o perfil de temperatura.

## Modelo

Antes do balanço, estão as três leis de taxa do problema. Elas são dadas, não deduzidas, por isso cada uma fica em um bloco próprio.

[eq-block] Lei de Fourier: 

 ⟦q_x = − k A (d T)/(d x)⟧ 

qx — calor que atravessa a seção na posição x, W

k — condutividade térmica do alumínio, W/(m·K)

A — área da seção transversal da aleta, m²

T — temperatura da aleta na posição x, K

x — posição medida a partir da base, m

O calor flui no sentido em que a temperatura cai; o sinal de menos indica isso.

[eq-block] Lei de Newton do resfriamento: 

 ⟦q_conv = h ( T − T_∞ )⟧ 

qconv — calor por convecção por unidade de área, W/m²

h — coeficiente de convecção, W/(m²·K)

T∞ — temperatura do ar, K

Quanto mais quente a superfície em relação ao ar, mais calor sai por unidade de área.

[eq-block] Radiação com a vizinhança: 

 ⟦q_rad = ε σ ( T^(4) − T_sur^(4) )⟧ 

qrad — calor por radiação por unidade de área, W/m²

ε — emissividade da superfície, adimensional

σ — constante de Stefan-Boltzmann, W/(m²·K⁴)

Tsur — temperatura da vizinhança, K

A superfície emite e absorve radiação. A temperatura entra à quarta potência, por isso a radiação pesa mais quando a aleta está quente.

### Balanço de energia em uma fatia da aleta, em W

 ⟦acumulação = entra − sai − perda para o ar − perda por radiação⟧ 

(princípio) A energia não some. O volume de controle é uma fatia de comprimento Δx, entre x e x + Δx, e o que se acumula nela é o que entra, menos o que sai, menos o que ela perde pela superfície.

 ⟦(d E)/(d t) {acumulação} = q_x {entra por condução} − q_x + Δx {sai por condução} − P Δx ⋅ h ( T − T_∞ ) {perda para o ar} − P Δx ⋅ ε σ ( T^(4) − T_sur^(4) ) {perda por radiação}⟧ 

E — energia térmica armazenada na fatia, J

Δx — comprimento da fatia, m

P — perímetro da seção, m (P = πD)

(tradução) Cada palavra vira um termo. Cada fluxo por unidade de área é multiplicado pela superfície lateral da fatia, que é P · Δx.

 ⟦(d E)/(d t) = 0⟧ 

(hipótese) Regime permanente: a aleta não muda com o tempo. Se ela esquentasse ou esfriasse, a energia armazenada variaria, e a temperatura dependeria do tempo.

 ⟦Bi = (h R)/(k) ≈ 3,0 ⋅ 10^(−4) ≪ 1⟧ 

R — raio da aleta, R = D/2, m

Bi — número de Biot, a razão entre a resistência de condução no raio e a de convecção; adimensional

(hipótese) A temperatura é a mesma em toda seção, e o calor só anda ao longo de x. Com Bi ≪ 1, a diferença entre o centro e a superfície é desprezível. Se Bi fosse da ordem de 1, a temperatura variaria na seção, e este modelo unidimensional não valeria.

 ⟦0 = − k A T^(′) ( x ) + k A T^(′) ( x + Δx ) − P Δx [ h ( T − T_∞ ) + ε σ ( T^(4) − T_sur^(4) ) ]⟧ 

(cinética) Substituem-se a lei de Fourier nas duas faces, com o sinal certo em cada uma (T′ é a derivada dT/dx), e as leis de Newton e de radiação, multiplicadas por P · Δx.

 ⟦k = constante , A = constante⟧ 

(hipótese) Com k e A constantes, eles saem da derivada, e o termo da condução vira kA vezes a diferença das inclinações. Se k dependesse da temperatura, a derivada de k apareceria aqui.

 ⟦0 = k A (T^(′) ( x + Δx ) − T^(′) ( x ))/(Δx) − P [ h ( T − T_∞ ) + ε σ ( T^(4) − T_sur^(4) ) ]⟧ 

(álgebra) (definição) Divide-se por Δx. Quando Δx tende a zero, a diferença das inclinações dividida por Δx é a derivada da inclinação, ou seja, a segunda derivada de T.

[final] 

 ⟦k A (d^(2) T)/(d x^(2) ) {condução ao longo da aleta} = h P ( T − T_∞ ) {perda para o ar} + ε σ P ( T^(4) − T_sur^(4) ) {perda por radiação}⟧ 

(álgebra) Passam-se os termos de perda para o lado direito.

A condução ao longo da aleta é equilibrada pelo calor que ela perde pela superfície. A equação é de segunda ordem em x, e a radiação, com o termo em T4, a torna não linear. Sem radiação, ela é linear e tem solução fechada. Com radiação, não tem, e precisamos de um método numérico. As condições de contorno completam o modelo.

[eq-block] Condições de contorno: 

 ⟦T ( 0 ) = T_b ; (d T)/(d x) ( L ) = 0⟧ 

Tb — temperatura da base, 600 K (dado)

L — comprimento da aleta, 0,10 m (dado)

A base impõe a temperatura. A ponta é adiabática: não troca calor, então a inclinação ali é zero.

Parâmetro | Valor | Unidade | Fonte | 

k | 200 | W/(m·K) | dadoalumínio, no enunciado | 

D | 0,008 | m | dado8 mm | 

L | 0,10 | m | dado10 cm | 

h | 15 | W/(m²·K) | dado | 

ε | 0,8 | — | dado | 

σ | 5,67·10⁻⁸ | W/(m²·K⁴) | dadoconstante de Stefan-Boltzmann | 

Tb | 600 | K | dado | 

T∞, Tsur | 300 | K | dadoar e vizinhança | 

P | 0,02513 | m | derivadoP = πD | 

A | 5,03·10⁻⁵ | m² | derivadoA = πD²/4 | 

Bi | 3,0·10⁻⁴ | — | derivadoBi = h(D/2)/k | 

tolerância do integrador | 10⁻¹⁰ | — | escolhaerro aceito a cada passo, bem abaixo do necessário | 

pontos da verificação do balanço | 2001 | — | escolhamalha fina para a integral pelos trapézios | 

faixa da inclinação na base | −3000 a 0 | K/m | escolhacontém a solução, −1822,3 K/m, com folga | 

[technique] 

[technique-name] Método do tiro

A temperatura é conhecida na base, e a inclinação, na ponta; a inclinação da base é a incógnita. Para resolver esse tipo de problema, vamos usar o método do tiro: chutamos a inclinação da base, integramos até a ponta e corrigimos o chute até a inclinação ali ser zero. Ele serve porque, com radiação, não há solução fechada. Em Python, a função que integra é solve_ivp, da biblioteca scipy.integrate, e a que corrige o chute é brentq, da biblioteca scipy.optimize. Veja a próxima seção para aprender a usá-las.

## Código

[step] 

### Dados e geometria da aleta

[purpose] Guardar cada dado com sua unidade e calcular a geometria que o modelo usa.

```
import numpy as np # arrays e funções matemáticas
from scipy.integrate import solve_ivp # integra ao longo de x
from scipy.optimize import brentq # acha a raiz de uma função
import matplotlib.pyplot as plt # desenha a figura

k = 200.0 # condutividade térmica do alumínio, W/(m·K)
D = 0.008 # diâmetro do pino, m (8 mm)
L = 0.10 # comprimento do pino, m (10 cm)
h = 15.0 # coeficiente de convecção, W/(m²·K)
eps = 0.8 # emissividade, adimensional
sigma = 5.67e-8 # constante de Stefan-Boltzmann, W/(m²·K⁴)
Tb = 600.0 # temperatura da base, K
Tinf = 300.0 # temperatura do ar, K
Tsur = 300.0 # temperatura da vizinhança, K

P = np.pi * D # perímetro, m
A = np.pi * D**2 / 4 # área da seção transversal, m²
R = D / 2 # raio, m
Bi = h * R / k # número de Biot, adimensional
print(f"P = {P:.5f} m, A = {A:.2e} m², Bi = {Bi:.1e}")
```

[how] 

import numpy as np: carrega a biblioteca de arrays e de funções matemáticas com o apelido np. Assim, np.pi é π e np.sqrt é a raiz quadrada.

from scipy.integrate import solve_ivp: pega da biblioteca scipy a função que integra equações diferenciais, solve_ivp.

from scipy.optimize import brentq: pega a função que acha raízes, brentq.

import matplotlib.pyplot as plt: carrega o módulo de gráficos com o apelido plt.

k = 200.0: uma atribuição. O nome k passa a guardar o número. O separador decimal em Python é sempre o ponto. O comentário dá a unidade; o programa não a usa.

P = np.pi * D: multiplicação. * multiplica, e ** é potência: D**2 é D ao quadrado.

print(f"..."): uma f-string coloca os valores entre chaves dentro do texto. {P:.5f} mostra P com 5 casas decimais, {A:.2e} em notação científica com 2 casas, e {Bi:.1e} com 1 casa.

[so-far] O programa agora conhece todos os dados e a geometria. Ele imprime o perímetro, a área e o número de Biot, que testa a hipótese unidimensional do modelo.

[step] 

### Equação da aleta como função

[purpose] Escrever a equação do modelo como uma função, que o integrador chama em cada passo.

```
def fin(x, y, eps):
 T, dTdx = y # temperatura (K), inclinação
 d2Tdx2 = (h*P*(T - Tinf)
 + eps*sigma*P*(T**4 - Tsur**4)) / (k*A)
 return [dTdx, d2Tdx2] # derivadas de T e de dT/dx
```

[how] 

def fin(x, y, eps):: def cria uma função de nome fin. Ela recebe três valores: x, a posição (m); y, uma lista com o estado, [T, dT/dx]; e eps, a emissividade.

T, dTdx = y: desempacotamento. A lista y tem dois itens, e o primeiro nome recebe o primeiro item (T), o segundo nome recebe o segundo (a inclinação).

d2Tdx2 = ...: a equação do modelo, isolada na segunda derivada: kA·T″ = hP(T − T∞) + εσP(T⁴ − Tsur⁴).

return [dTdx, d2Tdx2]: return devolve a lista a quem chamou a função. A lista traz as derivadas do estado: a derivada de T é a inclinação, e a derivada da inclinação é a segunda derivada.

[so-far] A função fin recebe a posição e o estado, e devolve como o estado muda. Ela não usa x, porque a aleta é uniforme, mas o integrador sempre o passa.

[step] 

### Chutar a inclinação da base

[purpose] Descobrir a inclinação da base que deixa a ponta adiabática.

```
def tip_slope(s, eps):
 # integra da base (x = 0) até a ponta (x = L)
 sol = solve_ivp(fin, [0, L], [Tb, s], args=(eps,),
 rtol=1e-10, atol=1e-10)
 return sol.y[1, -1] # inclinação na ponta, zero

def solve_fin(eps):
 # brentq procura a inclinação da base s em [-3000, 0] K/m
 # que faz a inclinação na ponta ser zero
 s = brentq(tip_slope, -3000.0, 0.0, args=(eps,))
 sol = solve_ivp(fin, [0, L], [Tb, s], args=(eps,),
 rtol=1e-10, atol=1e-10, dense_output=True)
 return s, sol
```

[how] 

solve_ivp(fin, ...): o integrador. Ele avança a solução da base até a ponta, chamando fin(x, y, eps) a cada passo, com a posição e o estado atuais.

[0, L]: o intervalo de integração, da base (x = 0) à ponta (x = L).

[Tb, s]: o estado inicial, a temperatura da base (600 K) e o chute s para a inclinação na base. O método chama-se do tiro porque dispara um chute e verifica onde ele cai.

args=(eps,): valores extras que o integrador repassa a fin em toda chamada, de modo que fin recebe eps. A vírgula faz de (eps,) uma tupla de um item; sem ela, (eps) seria só o número.

rtol=1e-10, atol=1e-10: as tolerâncias, o erro que o integrador aceita em cada passo, relativo e absoluto. O tamanho do passo, isto é, o avanço de cada etapa, é escolhido pelo próprio integrador para manter o erro abaixo desses valores.

sol.y[1, -1]: sol.y é uma tabela, com a linha 0 para T e a linha 1 para a inclinação. A coluna -1 é o último ponto, a ponta. Python conta a partir de zero, e -1 conta do fim.

brentq(tip_slope, -3000.0, 0.0, args=(eps,)): brentq chama tip_slope(s, eps) várias vezes, com valores de s entre os dois limites, até achar o que dá zero. A função tem de trocar de sinal entre os limites: é negativa em −3000 e positiva em 0. A busca para quando o intervalo fica menor que 2·10⁻¹² K/m, a precisão padrão do brentq. Essa é a precisão da inclinação da base encontrada.

dense_output=True: guarda a solução contínua, para que T possa ser avaliada em qualquer x depois.

return s, sol: devolve dois valores, que o chamador recebe em par.

[so-far] solve_fin(eps) devolve a inclinação correta da base e a solução completa. Se a inclinação na ponta é zero, o chute estava certo.

[step] 

### Temperatura da ponta e calor, com radiação

[purpose] Obter a temperatura da ponta e o calor dissipado, com a radiação incluída.

```
# com radiação
s, sol = solve_fin(eps)
T_tip = sol.y[0, -1] # temperatura da ponta, K
q = -k * A * s # calor na base, W
print(f"Inclinação na base: {s:.1f} K/m")
print(f"Temperatura da ponta: {T_tip:.1f} K")
print(f"Calor dissipado: {q:.2f} W")
```

[how] 

s, sol = solve_fin(eps): a função devolve dois valores, e a atribuição guarda o primeiro em s e o segundo em sol.

T_tip = sol.y[0, -1]: linha 0 (a temperatura) e último ponto (a ponta), em K.

q = -k * A * s: a lei de Fourier na base, q = −kA·dT/dx. O sinal de menos faz o calor que sai da aleta ser positivo.

{s:.1f}: um decimal. Os outros valores usam o mesmo formato.

[so-far] Com a emissividade 0,8, o programa imprime a inclinação na base, a temperatura da ponta e o calor dissipado, todos com radiação.

[step] 

### Verificações: sem radiação e balanço de energia

[purpose] Conferir o resultado de duas formas independentes.

```
# verificação 1: sem radiação, forma fechada e numérica
m = np.sqrt(h * P / (k * A)) # parâmetro da aleta, 1/m
q0 = np.sqrt(h*P*k*A) * (Tb - Tinf) * np.tanh(m*L)
T0 = Tinf + (Tb - Tinf) / np.cosh(m*L)
s0, sol0 = solve_fin(0.0)
print(f"Sem radiação, forma fechada: {q0:.2f} W, {T0:.1f} K")
print(f"Sem radiação, numérico: {-k*A*s0:.2f} W, "
 f"{sol0.y[0, -1]:.1f} K")

# verificação 2: o calor trocado pela superfície é o calor da base
x = np.linspace(0, L, 2001)
T = sol.sol(x)[0]
conv = np.trapezoid(h*P*(T - Tinf), x)
rad = np.trapezoid(eps*sigma*P*(T**4 - Tsur**4), x)
print(f"Convecção {conv:.2f} W + radiação {rad:.2f} W = "
 f"{conv + rad:.2f} W")
print(f"Erro do balanço: {conv + rad - q:.1e} W")
```

[how] 

np.sqrt, np.tanh, np.cosh: raiz quadrada, tangente hiperbólica e cosseno hiperbólico. m é o parâmetro da aleta na solução fechada: q = √(hPkA)·(Tb − T∞)·tanh(mL) e Tponta = T∞ + (Tb − T∞)/cosh(mL).

solve_fin(0.0): a mesma solução numérica, com emissividade zero, isto é, sem radiação.

np.linspace(0, L, 2001): 2001 pontos igualmente espaçados de 0 a L.

sol.sol(x)[0]: avalia a solução contínua em cada ponto de x; o [0] mantém a temperatura.

np.trapezoid(y, x): integra pela regra dos trapézios, somando a área sob a curva entre pontos vizinhos. Dá o calor total trocado ao longo da aleta.

[so-far] O programa confirma que a solução numérica sem radiação bate com a forma fechada, e que o calor trocado pela superfície é igual ao calor que entra pela base.

[step] 

### Gráfico dos dois perfis

[purpose] Desenhar os dois perfis de temperatura ao longo da aleta.

```
# figura: os dois perfis de temperatura ao longo da aleta
x = np.linspace(0, L, 200)
plt.plot(x, sol.sol(x)[0], label="Com radiação")
plt.plot(x, sol0.sol(x)[0], label="Sem radiação")
plt.xlabel("Posição ao longo da aleta (m)")
plt.ylabel("Temperatura (K)")
plt.legend()
plt.show() # desenha a figura
```

[how] 

plt.plot(x, y, label=...): desenha y contra x. O label é o nome que aparece na legenda.

plt.xlabel e plt.ylabel: os títulos dos eixos, com as unidades.

plt.legend(): mostra a legenda com os nomes.

plt.show(): abre a figura. O programa termina aqui.

[so-far] O programa imprime os resultados e as verificações, e mostra a figura com os dois perfis.

[step] 

### Programa completo

```
import numpy as np # arrays e funções matemáticas
from scipy.integrate import solve_ivp # integra ao longo de x
from scipy.optimize import brentq # acha a raiz de uma função
import matplotlib.pyplot as plt # desenha a figura

k = 200.0 # condutividade térmica do alumínio, W/(m·K)
D = 0.008 # diâmetro do pino, m (8 mm)
L = 0.10 # comprimento do pino, m (10 cm)
h = 15.0 # coeficiente de convecção, W/(m²·K)
eps = 0.8 # emissividade, adimensional
sigma = 5.67e-8 # constante de Stefan-Boltzmann, W/(m²·K⁴)
Tb = 600.0 # temperatura da base, K
Tinf = 300.0 # temperatura do ar, K
Tsur = 300.0 # temperatura da vizinhança, K

P = np.pi * D # perímetro, m
A = np.pi * D**2 / 4 # área da seção transversal, m²
R = D / 2 # raio, m
Bi = h * R / k # número de Biot, adimensional
print(f"P = {P:.5f} m, A = {A:.2e} m², Bi = {Bi:.1e}")

def fin(x, y, eps):
 T, dTdx = y # temperatura (K), inclinação
 d2Tdx2 = (h*P*(T - Tinf)
 + eps*sigma*P*(T**4 - Tsur**4)) / (k*A)
 return [dTdx, d2Tdx2] # derivadas de T e de dT/dx

def tip_slope(s, eps):
 # integra da base (x = 0) até a ponta (x = L)
 sol = solve_ivp(fin, [0, L], [Tb, s], args=(eps,),
 rtol=1e-10, atol=1e-10)
 return sol.y[1, -1] # inclinação na ponta, zero

def solve_fin(eps):
 # brentq procura a inclinação da base s em [-3000, 0] K/m
 # que faz a inclinação na ponta ser zero
 s = brentq(tip_slope, -3000.0, 0.0, args=(eps,))
 sol = solve_ivp(fin, [0, L], [Tb, s], args=(eps,),
 rtol=1e-10, atol=1e-10, dense_output=True)
 return s, sol

# com radiação
s, sol = solve_fin(eps)
T_tip = sol.y[0, -1] # temperatura da ponta, K
q = -k * A * s # calor na base, W
print(f"Inclinação na base: {s:.1f} K/m")
print(f"Temperatura da ponta: {T_tip:.1f} K")
print(f"Calor dissipado: {q:.2f} W")

# verificação 1: sem radiação, forma fechada e numérica
m = np.sqrt(h * P / (k * A)) # parâmetro da aleta, 1/m
q0 = np.sqrt(h*P*k*A) * (Tb - Tinf) * np.tanh(m*L)
T0 = Tinf + (Tb - Tinf) / np.cosh(m*L)
s0, sol0 = solve_fin(0.0)
print(f"Sem radiação, forma fechada: {q0:.2f} W, {T0:.1f} K")
print(f"Sem radiação, numérico: {-k*A*s0:.2f} W, "
 f"{sol0.y[0, -1]:.1f} K")

# verificação 2: o calor trocado pela superfície é o calor da base
x = np.linspace(0, L, 2001)
T = sol.sol(x)[0]
conv = np.trapezoid(h*P*(T - Tinf), x)
rad = np.trapezoid(eps*sigma*P*(T**4 - Tsur**4), x)
print(f"Convecção {conv:.2f} W + radiação {rad:.2f} W = "
 f"{conv + rad:.2f} W")
print(f"Erro do balanço: {conv + rad - q:.1e} W")

# figura: os dois perfis de temperatura ao longo da aleta
x = np.linspace(0, L, 200)
plt.plot(x, sol.sol(x)[0], label="Com radiação")
plt.plot(x, sol0.sol(x)[0], label="Sem radiação")
plt.xlabel("Posição ao longo da aleta (m)")
plt.ylabel("Temperatura (K)")
plt.legend()
plt.show() # desenha a figura
```

Os seis blocos, colados em ordem, formam o programa: ele roda em poucos segundos e termina com a figura.

## Resultado

[answer] 

Com radiação, a temperatura da ponta é 516,6 K e a taxa de calor dissipada é 18,32 W.

Sem radiação, a taxa de calor é 10,08 W e a temperatura da ponta é 551,4 K.

### Perfil de temperatura ao longo da aleta

[figura; controles: eps] 

### Quanto a temperatura cai ao longo da aleta?

A curva Com radiação parte de 600 K na base, com inclinação de −1822,3 K/m, e chega a 516,6 K na ponta. Perto da ponta ela fica horizontal: a ponta é adiabática, e nenhum calor sai por ali.

### Por que a curva com radiação fica abaixo da outra?

Porque a aleta perde mais calor. A curva Com radiação dissipa 18,32 W, dos quais 9,18 W por convecção e 9,14 W por radiação. Sem radiação, a convecção sozinha leva 10,08 W, e a ponta fica em 551,4 K, mais quente. A radiação é uma perda extra: a aleta esfria mais e, para isso, precisa de mais calor vindo da base.

### Leve ε até 0: tire a radiação

A curva Com radiação sobe até encostar na curva Sem radiação. A ponta volta a 551,4 K, e o calor cai para 10,08 W, que são os valores da terceira pergunta.

[in-your-code] Na linha eps = 0.8, troque o valor por eps = 0.0 e rode. O programa passa a imprimir Temperatura da ponta: 551.4 K e Calor dissipado: 10.08 W.

 Algo não ficou claro? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
