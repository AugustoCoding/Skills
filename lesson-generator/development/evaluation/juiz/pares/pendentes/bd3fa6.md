# Comparação bd3fa6

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/bd3fa6.json`.

# Enunciado enviado ao modelo

Num CSTR com camisa ocorre a reação exotérmica de primeira ordem A → B, com k = 7,2·10¹⁰ exp(−8750/T) min⁻¹ (T em K). Dados: vazão de 100 L/min, volume de 100 L, concentração de A na alimentação de 1,0 mol/L, alimentação a 350 K, camisa a 300 K, calor de reação de −5,0·10⁴ J/mol, massa específica de 1000 g/L, calor específico de 0,239 J/(g·K) e UA = 5,0·10⁴ J/(min·K). O reator tem três estados estacionários. Calcule a temperatura de cada um (K) e a conversão de A nos estados de menor e de maior temperatura (%).


==================== LIÇÃO 1 ====================

Cinética e reatores · equações não lineares

# Estados estacionários de um CSTR com camisa

[problem] 

Num reator CSTR com camisa ocorre a reação exotérmica de primeira ordem A → B, com k = 7,2·1010 exp(−8750/T) min−1 (T em K). Dados: vazão de 100 L/min, volume de 100 L, concentração de A na alimentação de 1,0 mol/L, alimentação a 350 K, camisa a 300 K, calor de reação de −5,0·104 J/mol, massa específica de 1000 g/L, calor específico de 0,239 J/(g·K) e UA = 5,0·104 J/(min·K). O reator tem três estados estacionários.

Calcule a temperatura de cada um dos três estados estacionários, em K.

Calcule a conversão de A nos estados de menor e de maior temperatura, em %.

A reação libera calor e a camisa retira calor. Como a velocidade da reação cresce muito com a temperatura, o balanço entre calor gerado e calor removido pode ser satisfeito em mais de uma temperatura. No fim, você terá um programa que encontra essas temperaturas e a conversão de cada uma.

## Modelo

### Balanço de massa do componente A, em mol

 ⟦acúmulo de A = entrada − saída − consumo⟧ 

(princípio) A não aparece nem desaparece sem motivo. O volume de controle é o líquido dentro do reator.

 ⟦(d ( V ⋅ C_A ))/(d t) {acúmulo} = q ⋅ C_A 0 {entrada} − q ⋅ C_A {saída} − V ⋅ r_A {consumo}⟧ 

V — volume de líquido no reator, 100 L

CA — concentração de A no reator, que é também a da saída, mol/L

q — vazão de entrada, igual à de saída, L/min

CA0 — concentração de A na alimentação, mol/L

rA — velocidade de consumo de A por litro de líquido, mol/(L·min)

(tradução) Cada palavra vira um fluxo molar de A, em mol/min: a vazão vezes a concentração, e o consumo é a velocidade vezes o volume.

 ⟦V = constante⟧ 

(premissa) A vazão de entrada é igual à de saída, então o volume fica em 100 L. Se o volume mudasse, o termo de acúmulo não seria V vezes a derivada de CA, e seria preciso um balanço global antes deste.

[final] 

 ⟦(d C_A )/(d t) {acúmulo de A} = (1)/(τ) ( C_A 0 − C_A ) {entrada menos saída} − k ⋅ C_A {consumo}⟧ 

(cinética) (álgebra) (definição) A velocidade é k CA, pela lei de velocidade abaixo. Divide-se tudo por V, com τ = V/q = 100 L ÷ 100 L/min = 1 min.

A alimentação traz A para o reator e a reação o consome; no estado estacionário, esses dois efeitos se anulam.

### Balanço de energia do reator, em J

 ⟦acúmulo de energia = entrada − saída + reação − camisa⟧ 

(princípio) A energia entra com a alimentação, sai com o líquido, é liberada pela reação e é retirada pela camisa. O volume de controle é o mesmo do balanço de massa.

 ⟦ρ ⋅ c_p ⋅ V ⋅ (d T)/(d t) {acúmulo} = ρ ⋅ c_p ⋅ q ⋅ ( T_0 − T ) {entrada menos saída} + ( − ΔH ) ⋅ r_A ⋅ V {reação} − UA ⋅ ( T − T_c ) {camisa}⟧ 

ρ, cp — massa específica (g/L) e calor específico (J/(g·K)) do líquido

T — temperatura do líquido no reator, que é também a da saída, K

T0 — temperatura da alimentação, 350 K

ΔH — calor de reação por mol de A consumido, negativo se exotérmica, J/mol

UA — coeficiente de troca de calor com a camisa, J/(min·K)

Tc — temperatura da camisa, K

(tradução) Cada termo vira um fluxo de energia em J/min: massa específica, calor específico e vazão, vezes a diferença de temperatura, ou calor de reação vezes a velocidade vezes o volume, ou coeficiente vezes a diferença de temperatura.

 ⟦ρ e c p constantes⟧ 

(premissa) O enunciado dá um valor único para cada um. Se variassem com a temperatura, os termos de acúmulo e de entrada precisariam ser recalculados a cada instante.

 ⟦T no reator = T na saída, em toda a massa de líquido⟧ 

(premissa) Mistura perfeita: a temperatura é a mesma em todo o reator e na saída. Se houvesse gradiente, a energia que sai seria diferente da que é calculada aqui.

[final] 

 ⟦(d T)/(d t) = (q)/(V) ( T_0 − T ) {entrada menos saída} + (( − ΔH ) k C_A )/(ρ c_p ) {reação} − (UA ( T − T_c ))/(ρ c_p V) {camisa}⟧ 

(cinética) (álgebra) Usa-se rA = k CA e divide-se tudo por ρ cp V.

A temperatura sobe quando a reação libera mais calor do que a alimentação e a camisa conseguem retirar, e cai no caso contrário. O estado estacionário é onde esses dois efeitos se igualam.

### Estado estacionário

 ⟦(d C_A )/(d t) = 0 e (d T)/(d t) = 0⟧ 

(definição) Em estado estacionário, nada muda com o tempo.

 ⟦C_A = (C_A 0 )/(1 + τ k)⟧ 

(álgebra) Com a derivada de CA igual a zero, o balanço de A dá CA (1 + τ k) = CA0.

[final] 

 ⟦( − ΔH ) V k ( T ) (C_A 0 )/(1 + τ k ( T )) {calor gerado} = ρ c_p q ( T − T_0 ) + UA ( T − T_c ) {calor removido}⟧ 

(álgebra) Substitui-se CA do passo anterior no balanço de energia, com a derivada de T igual a zero.

A equação tem uma única incógnita, T. O calor gerado cresce de forma exponencial com T e depois satura; o calor removido é uma reta. Cada ponto em que as duas se igualam é um estado estacionário, e a equação pode ter mais de uma raiz.

[eq-block] Lei de velocidade: 

 ⟦r_A = k ⋅ C_A⟧ 

k — constante de velocidade, 1/min

Dada no enunciado: a reação é de primeira ordem em A.

[eq-block] Lei de Arrhenius: 

 ⟦k = k_0 ⋅ exp ( − (θ)/(T) )⟧ 

k0 — fator pré-exponencial, 7,2·1010 1/min

θ — temperatura característica, 8750 K

Dada no enunciado, na forma em que θ = Ea/R. A constante cresce muito rápido com T, e é isso que faz o calor gerado crescer de forma exponencial.

Parâmetro | Valor | Unidade | Fonte | 

V | 100 | L | dado | 

q | 100 | L/min | dado | 

τ | 1 | min | derivado100 L ÷ 100 L/min | 

CA0 | 1,0 | mol/L | dado | 

T0 | 350 | K | dado | 

Tc | 300 | K | dado | 

ΔH | −5,0·104 | J/mol | dado | 

ρ | 1000 | g/L | dado | 

cp | 0,239 | J/(g·K) | dado | 

UA | 5,0·104 | J/(min·K) | dado | 

k0 | 7,2·1010 | 1/min | dado | 

θ | 8750 | K | dado | 

faixa de busca | 290 a 420 | K | escolhacontém os três estados; passo de 1 K | 

tolerância da busca | 10−6 | K | escolhaprecisão de sobra para três casas decimais | 

partida fria da verificação | 300 | K | escolhareator cheio de alimentação, abaixo do estado mais frio | 

tempo da verificação | 30 | min | escolhamuito maior que o transitório, de poucos minutos | 

perturbação da verificação | 0,01 | K | escolhapequena, para testar a vizinhança do estado | 

[technique] 

[technique-name] Busca de raízes

Este é um problema de equações não lineares: a temperatura é a incógnita de uma equação sem solução por fórmula, e ela pode ter mais de uma raiz. Para resolver esse tipo de problema, vamos usar a busca de raízes. O método procura, numa grade de temperaturas, os pontos onde o saldo de calor troca de sinal, e refina cada troca até a temperatura exata. Ele serve aqui porque cada troca de sinal delimita um estado estacionário, sem exigir um palpite inicial. No Python, a função que faz isso é brentq, da biblioteca scipy.optimize. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados do problema e a constante de velocidade

[purpose] Guardar os dados em variáveis, para que o programa use os mesmos números em todo lugar, e escrever a função que calcula k para qualquer temperatura.

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import brentq
from scipy.integrate import solve_ivp

# Dados do problema
V = 100.0 # volume do reator, L
q = 100.0 # vazão de entrada e de saída, L/min
C0 = 1.0 # concentração de A na alimentação, mol/L
T0 = 350.0 # temperatura da alimentação, K
Tc = 300.0 # temperatura da camisa, K
dH = -5.0e4 # calor de reação, J/mol (negativo: exotérmica)
rho = 1000.0 # massa específica, g/L
cp = 0.239 # calor específico, J/(g·K)
UA = 5.0e4 # troca de calor com a camisa, J/(min·K)
tau = V / q # tempo de residência, min

def k(T):
 """Constante de velocidade, 1/min, com T em K."""
 return 7.2e10 * np.exp(-8750.0 / T)
```

[how] import numpy as np carrega a biblioteca de cálculo com o apelido np; from ... import ... traz só a função citada, e import matplotlib.pyplot as plt traz o módulo de gráficos. Os comentários com # são só para leitura. Cada linha nome = valor cria uma variável: um nome que guarda um número. O texto depois do # é só para ler; a unidade fica nele. def k(T): cria uma função: T é o que ela recebe (uma temperatura, em K), e return é o valor que ela devolve. O texto entre """ é a descrição da função, sem efeito no cálculo. np.exp(x) calcula e elevado a x.

[so-far] O programa conhece os dados e sabe calcular k para qualquer temperatura.

[step] 

### Saldo de calor em cada temperatura

[purpose] Escrever uma função que, para uma temperatura dada, diz quanto de calor a reação gera a mais ou a menos do que a camisa e a alimentação retiram.

```
def saldo(T):
 """Calor gerado menos calor removido, em kJ/min."""
 C = C0 / (1 + tau * k(T)) # concentração de A, mol/L
 gerado = (-dH) * k(T) * C * V / 1000 # kJ/min
 removido = (q * rho * cp * (T - T0) + UA * (T - Tc)) / 1000
 return gerado - removido # zero no estado estacionário
```

[how] saldo(T) recebe uma temperatura e devolve um número. Dentro dela, k(T) é chamada: uma função usando outra. C = C0 / (1 + tau * k(T)) aplica o resultado do balanço de A, em estado estacionário. A divisão / 1000 converte J/min em kJ/min. Quando o valor é positivo, o reator esquenta; quando é negativo, esfria.

[so-far] Para cada temperatura, saldo diz se o reator esquenta ou esfria. Ainda não procura nenhuma raiz.

[step] 

### Procurando os estados estacionários

[purpose] Achar todas as temperaturas em que saldo vale zero, e a conversão de cada uma.

```
grade = np.linspace(290, 420, 131) # temperaturas de busca, K
raizes = [] # lista vazia para as raízes
for a, b in zip(grade[:-1], grade[1:]):
 if saldo(a) * saldo(b) < 0: # o sinal troca entre a e b
 raizes.append(brentq(saldo, a, b, xtol=1e-6))

for i, T in enumerate(raizes, start=1):
 X = tau * k(T) / (1 + tau * k(T)) # conversão de A
 print(f"Estado {i}: T = {T:.1f} K, conversão = {100 * X:.1f} %")
```

[how] 

np.linspace(290, 420, 131): 131 números igualmente espaçados de 290 a 420 (passo de 1 K). Argumentos: início, fim e quantidade de pontos.

grade[:-1] e grade[1:]: as fatias sem o último e sem o primeiro elemento. Juntas, zip as pareia: cada a com o b seguinte, formando os intervalos.

for a, b in zip(...): repete o bloco para cada intervalo [a, b].

saldo(a) * saldo(b) < 0: o produto é negativo só se os dois valores tiverem sinais opostos, ou seja, se há uma raiz entre eles.

brentq(saldo, a, b, xtol=1e-6) devolve a temperatura da raiz. Argumentos: saldo, a função cuja raiz se procura (o brentq a chama dezenas de vezes, com temperaturas entre a e b, e usa só o sinal); a e b, o intervalo com sinais opostos; xtol=1e-6, a tolerância: o método para quando o intervalo tem menos de 10−6 K, o que dá a temperatura com precisão de um milionésimo de kelvin.

raizes.append(...) acrescenta o valor à lista. enumerate(raizes, start=1) entrega, a cada volta, a posição i (começando em 1) e a temperatura T.

f"...{T:.1f}..." insere o valor de T na frase com uma casa decimal; {100 * X:.1f} faz o mesmo com a conversão em porcentagem.

[so-far] O programa imprime cada estado estacionário com a temperatura e a conversão de A.

[step] 

### Verificando o resultado de três formas

[purpose] Conferir os estados sem usar a equação que os produziu: substituir cada um nos balanços originais e deixar o reator evoluir no tempo a partir de outra condição.

```
def modelo(t, y):
 """Balanços de A e de energia; y = [C, T]."""
 C, T = y
 r = k(T) * C # taxa de reação, mol/(L·min)
 dC = (C0 - C) / tau - r # balanço de A
 dT = (q * rho * cp * (T0 - T) + (-dH) * r * V
 - UA * (T - Tc)) / (rho * cp * V) # balanço de energia
 return [dC, dT]

# 1) os balanços se anulam em cada estado
for i, T in enumerate(raizes, start=1):
 C = C0 / (1 + tau * k(T))
 res = np.max(np.abs(modelo(0, [C, T])))
 print(f"Estado {i}: resíduo = {res:.1e}")

# 2) partida fria: o reator vai ao estado de menor T
sol = solve_ivp(modelo, [0, 30], [C0, 300.0],
 rtol=1e-8, atol=1e-10)
print(f"Partida a 300 K: T após 30 min = {sol.y[1, -1]:.1f} K")

# 3) perturbação de 0.01 K no estado de maior T
T3 = raizes[-1]
C3 = C0 / (1 + tau * k(T3))
sol = solve_ivp(modelo, [0, 30], [C3, T3 + 0.01],
 rtol=1e-8, atol=1e-10)
print(f"Perturbação de 0.01 K: T após 30 min = {sol.y[1, -1]:.1f} K")
```

[how] 

def modelo(t, y): solve_ivp chama esta função em cada passo de tempo, passando o instante t e o estado y, que chega sempre como lista, mesmo com duas variáveis: y[0] é C e y[1] é T. Ela devolve as derivadas [dC, dT], na mesma ordem.

C, T = y: desempacota a lista nas duas variáveis.

modelo(0, [C, T]): chama a função com t = 0 (o modelo não depende do tempo) e um estado. O resíduo é o maior valor absoluto das derivadas, np.abs tira o sinal e np.max escolhe o maior; :.1e escreve em notação científica.

solve_ivp(modelo, [0, 30], [C0, 300.0], ...) integra no tempo. Argumentos: a função das derivadas; o intervalo de tempo, de 0 a 30 min; a condição inicial, C0 e 300 K (reator cheio de alimentação, frio); rtol e atol, as tolerâncias de erro relativo e absoluto por passo. Valores menores dão mais precisão e mais passos.

sol.y[1, -1]: a linha 1 da matriz de resultados é T, e a coluna -1 é o último instante.

enumerate(raizes, start=1), como no passo anterior, numera os estados a partir de 1 nos prints.

T3 = raizes[-1]: o último item da lista, o estado de maior temperatura. Se só há um estado, é ele mesmo.

[so-far] Os balanços originais se anulam nos estados encontrados. Pela partida fria, o reator chega a 324,5 K. Uma perturbação de 0,01 K no estado de maior temperatura faz o reator sair dele e também ir a 324,5 K, o que mostra que esse estado é instável.

[step] 

### Desenhando calor gerado e calor removido

[purpose] Traçar as duas curvas em função de T, para ver onde se cruzam.

```
Tp = np.linspace(290, 420, 261) # temperaturas do gráfico, K
gerado_p = (-dH) * k(Tp) * C0 / (1 + tau * k(Tp)) * V / 1000
removido_p = (q * rho * cp * (Tp - T0) + UA * (Tp - Tc)) / 1000
plt.plot(Tp, gerado_p, label="Calor gerado")
plt.plot(Tp, removido_p, label="Calor removido")
plt.xlabel("Temperatura do reator (K)")
plt.ylabel("Calor (kJ/min)")
plt.legend()
plt.grid(True)
plt.show() # mostra a figura
```

[how] plt.plot(x, y, label=...) desenha uma curva com os pontos de x e y; label é o nome que aparece na legenda. plt.xlabel e plt.ylabel dão o nome dos eixos, com a unidade. plt.legend() mostra a legenda, plt.grid(True) desenha a grade, e plt.show() abre a figura.

[so-far] O gráfico mostra as duas curvas e os pontos em que se cruzam.

[step] 

### Programa completo

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import brentq
from scipy.integrate import solve_ivp

# Dados do problema
V = 100.0 # volume do reator, L
q = 100.0 # vazão de entrada e de saída, L/min
C0 = 1.0 # concentração de A na alimentação, mol/L
T0 = 350.0 # temperatura da alimentação, K
Tc = 300.0 # temperatura da camisa, K
dH = -5.0e4 # calor de reação, J/mol (negativo: exotérmica)
rho = 1000.0 # massa específica, g/L
cp = 0.239 # calor específico, J/(g·K)
UA = 5.0e4 # troca de calor com a camisa, J/(min·K)
tau = V / q # tempo de residência, min

def k(T):
 """Constante de velocidade, 1/min, com T em K."""
 return 7.2e10 * np.exp(-8750.0 / T)

def saldo(T):
 """Calor gerado menos calor removido, em kJ/min."""
 C = C0 / (1 + tau * k(T)) # concentração de A, mol/L
 gerado = (-dH) * k(T) * C * V / 1000 # kJ/min
 removido = (q * rho * cp * (T - T0) + UA * (T - Tc)) / 1000
 return gerado - removido # zero no estado estacionário

grade = np.linspace(290, 420, 131) # temperaturas de busca, K
raizes = [] # lista vazia para as raízes
for a, b in zip(grade[:-1], grade[1:]):
 if saldo(a) * saldo(b) < 0: # o sinal troca entre a e b
 raizes.append(brentq(saldo, a, b, xtol=1e-6))

for i, T in enumerate(raizes, start=1):
 X = tau * k(T) / (1 + tau * k(T)) # conversão de A
 print(f"Estado {i}: T = {T:.1f} K, conversão = {100 * X:.1f} %")

def modelo(t, y):
 """Balanços de A e de energia; y = [C, T]."""
 C, T = y
 r = k(T) * C # taxa de reação, mol/(L·min)
 dC = (C0 - C) / tau - r # balanço de A
 dT = (q * rho * cp * (T0 - T) + (-dH) * r * V
 - UA * (T - Tc)) / (rho * cp * V) # balanço de energia
 return [dC, dT]

# 1) os balanços se anulam em cada estado
for i, T in enumerate(raizes, start=1):
 C = C0 / (1 + tau * k(T))
 res = np.max(np.abs(modelo(0, [C, T])))
 print(f"Estado {i}: resíduo = {res:.1e}")

# 2) partida fria: o reator vai ao estado de menor T
sol = solve_ivp(modelo, [0, 30], [C0, 300.0],
 rtol=1e-8, atol=1e-10)
print(f"Partida a 300 K: T após 30 min = {sol.y[1, -1]:.1f} K")

# 3) perturbação de 0.01 K no estado de maior T
T3 = raizes[-1]
C3 = C0 / (1 + tau * k(T3))
sol = solve_ivp(modelo, [0, 30], [C3, T3 + 0.01],
 rtol=1e-8, atol=1e-10)
print(f"Perturbação de 0.01 K: T após 30 min = {sol.y[1, -1]:.1f} K")

Tp = np.linspace(290, 420, 261) # temperaturas do gráfico, K
gerado_p = (-dH) * k(Tp) * C0 / (1 + tau * k(Tp)) * V / 1000
removido_p = (q * rho * cp * (Tp - T0) + UA * (Tp - Tc)) / 1000
plt.plot(Tp, gerado_p, label="Calor gerado")
plt.plot(Tp, removido_p, label="Calor removido")
plt.xlabel("Temperatura do reator (K)")
plt.ylabel("Calor (kJ/min)")
plt.legend()
plt.grid(True)
plt.show() # mostra a figura
```

As cinco partes, na ordem acima, formam o programa completo, pronto para rodar.

## Resultado

[answer] 

As temperaturas dos três estados estacionários são 324,5 K, 350,0 K e 369,7 K. A conversão de A é 12,3 % no estado de menor temperatura (324,5 K) e 79,1 % no de maior temperatura (369,7 K).

[figura; controles: Tc, UA] 

### Em que temperaturas as curvas se cruzam?

Em três pontos: 324,5 K, 350,0 K e 369,7 K. São os três estados estacionários. A curva de calor gerado e a de calor removido são as que se cruzam.

### Onde o calor gerado fica acima do removido?

Abaixo de 324,5 K e entre 350,0 K e 369,7 K. Nesses trechos, a curva de calor gerado está acima da de calor removido; entre 324,5 K e 350,0 K, e acima de 369,7 K, é o contrário.

### Leve Tc a 304 K

A camisa mais quente retira menos calor: a curva de calor removido desce, e os dois estados de menor temperatura desaparecem. Sobra um único estado, a 376,7 K.

[in-your-code] No programa, troque Tc = 300.0 por Tc = 304.0 e rode. O programa passa a imprimir só o Estado 1, a 376,7 K.

### Diminua UA para 4,4·104 J/(min·K)

Com menos troca com a camisa, a curva de calor removido fica menos inclinada e cruza a de calor gerado uma só vez, a 384,0 K.

[in-your-code] No programa, troque UA = 5.0e4 por UA = 4.4e4 e rode. O programa passa a imprimir só o Estado 1, a 384,0 K.

 Algo ficou pouco claro? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Reatores químicos · Equação algébrica não linear

# Estados estacionários de um CSTR exotérmico

[problem] 

Num CSTR com camisa ocorre a reação exotérmica de primeira ordem A → B, com constante de velocidade k = 7,2·1010·exp(−8750/T) min−1, com T em K. A vazão é q = 100 L/min, o volume do reator é V = 100 L, a concentração de A na alimentação é CA0 = 1,0 mol/L, a alimentação está a Tf = 350 K e a camisa a Tc = 300 K. O calor de reação é ΔHr = −5,0·104 J/mol, a massa específica é ρ = 1000 g/L, o calor específico é cp = 0,239 J/(g·K) e o coeficiente de troca é UA = 5,0·104 J/(min·K). O reator tem três estados estacionários.

A temperatura de cada um dos três estados estacionários, em K.

A conversão de A nos estados de menor e de maior temperatura, em %.

Num reator que libera calor, a temperatura e a velocidade de reação se alimentam mutuamente, e por isso o mesmo reator, nas mesmas condições de operação, pode funcionar em temperaturas bem diferentes. Você vai deduzir os balanços de massa e de energia, reduzi-los a uma única equação em T e programar sua solução em Python. No fim, terá as três temperaturas, as conversões e uma figura em que os estados aparecem como cruzamentos de duas curvas.

## Modelo

### Balanço de massa do componente A, em mols

 ⟦acúmulo de A = entra − sai − consumo⟧ 

(princípio) O componente A não surge nem some sem motivo: o que se acumula é o que entra, menos o que sai, menos o que reage. O volume de controle é todo o líquido dentro do reator, que está perfeitamente misturado.

 ⟦(d ( V ⋅ C_A ))/(d t) {acúmulo de A} = q ⋅ C_A 0 {entra} − q ⋅ C_A {sai} − r ⋅ V {consumo}⟧ 

CA — concentração de A dentro do reator e, por causa da mistura perfeita, também na saída, mol/L

CA0 — concentração de A na alimentação, mol/L

q — vazão volumétrica de alimentação e de saída, L/min

V — volume de líquido no reator, L

r — velocidade de reação por volume de líquido, mol/(L·min)

(tradução) Cada palavra vira um fluxo molar de A, em mol/min.

 ⟦r = k ⋅ C_A⟧ 

k — constante de velocidade da reação, 1/min

(cinética) Primeira ordem, como diz o enunciado. A constante k depende da temperatura pela lei de Arrhenius, apresentada logo abaixo.

 ⟦τ = (V)/(q)⟧ 

τ — tempo de residência, o tempo médio que o líquido fica no reator, min

(hipótese) (definição) Volume e massa específica constantes: a vazão que entra é igual à que sai (balanço global de massa, ρ·dV/dt = ρ·q − ρ·q = 0), e V sai da derivada. Se o nível variasse, o volume precisaria de uma equação própria. Dividindo tudo por V, aparece o tempo de residência τ.

 ⟦(d C_A )/(d t) {acúmulo de A} = (1)/(τ) ( C_A 0 − C_A ) {entra menos sai} − k ⋅ C_A {consumo}⟧ 

(álgebra) Esta é a forma que o programa usa na verificação por simulação (quinto passo do código).

 ⟦0 = (1)/(τ) ( C_A 0 − C_A ) − k ⋅ C_A⟧ 

(hipótese) Regime estacionário: nada muda no tempo, então a derivada é nula. Se o reator ainda estivesse em partida, esta etapa não valeria e a equação diferencial teria de ser integrada.

 ⟦C_A = (C_A 0 )/(1 + k ⋅ τ)⟧ 

(álgebra) Isolando CA, tudo o que vem da cinética fica no produto k·τ.

[final] 

 ⟦X = 1 − (C_A )/(C_A 0 ) {fração de A consumida} = (k ⋅ τ)/(1 + k ⋅ τ) {depende só de kτ}⟧ 

(definição) A conversão X (adimensional, multiplicada por 100 para dar %) é a fração do A alimentado que foi consumida.

Em regime estacionário, a conversão depende apenas do produto k·τ, e k depende da temperatura: quanto mais quente o reator, maior a conversão. Falta saber qual é a temperatura, e isso vem do balanço de energia.

[eq-block] Lei de Arrhenius: 

 ⟦k = k_0 ⋅ exp ( − (E_a )/(R ⋅ T) )⟧ 

k0 — fator pré-exponencial, 1/min

Ea, R — energia de ativação, J/mol, e constante dos gases, J/(mol·K); o enunciado já dá a razão Ea/R = 8750 K

T — temperatura do reator, K

A constante de velocidade cresce de forma exponencial com a temperatura. É essa realimentação (mais calor, mais reação, mais calor) que permite vários estados estacionários.

### Balanço de energia do reator, em joules

 ⟦acúmulo de energia = entra com a corrente − sai com a corrente + calor liberado pela reação − calor trocado com a camisa⟧ 

(princípio) A energia do líquido só muda se a corrente a levar, se a reação a liberar ou se a camisa a retirar. O volume de controle é o mesmo do balanço de massa. O trabalho de agitação é desprezado; se fosse grande, entraria como uma fonte a mais de calor.

 ⟦ρ ⋅ c_p ⋅ V ⋅ (d T)/(d t) {acúmulo de energia} = ρ ⋅ c_p ⋅ q ⋅ ( T_f − T ) {a corrente aquece ou esfria} + ( − Δ H_r ) ⋅ r ⋅ V {calor de reação} − U ⋅ A ⋅ ( T − T_c ) {troca com a camisa}⟧ 

ρ — massa específica do líquido, g/L

cp — calor específico do líquido, J/(g·K)

T — temperatura do líquido no reator e na saída, K

Tf — temperatura da alimentação, K

ΔHr — calor de reação por mol de A que reage, negativo porque a reação é exotérmica, J/mol

UA — produto do coeficiente de troca térmica pela área da camisa, J/(min·K)

Tc — temperatura do fluido da camisa, K

(tradução) Entrada menos saída da corrente aparecem juntas como ρ·cp·q·(Tf − T): cada litro entra a Tf e sai a T. Todos os termos estão em J/min.

 ⟦ρ , c_p , T_c , U A = constantes⟧ 

(hipótese) Propriedades do líquido, UA e a temperatura da camisa não variam. Se cp variasse muito, o termo da corrente teria de ser a integral de cp entre Tf e T; se a camisa esquentasse ao longo da troca, Tc precisaria de um balanço próprio.

 ⟦(d T)/(d t) = (1)/(τ) ( T_f − T ) {corrente} + ( − Δ H_r ) ⋅ k ⋅ C_A ρ ⋅ c_p {reação} − U ⋅ A ⋅ ( T − T_c ) ρ ⋅ c_p ⋅ V {camisa}⟧ 

(cinética) (álgebra) Substituindo r = k·CA e dividindo tudo por ρ·cp·V (lembrando que q/V = 1/τ). Esta é a forma usada na simulação do quinto passo do código.

[final] 

 ⟦( − Δ H_r ) ⋅ q ⋅ C_A 0 ⋅ X ( T ) {calor gerado Qg} = ρ ⋅ c_p ⋅ q ⋅ ( T − T_f ) + U ⋅ A ⋅ ( T − T_c ) {calor removido Qr}⟧ 

(hipótese) (álgebra) Regime estacionário: dT/dt = 0. Do balanço de massa estacionário, o que reage por minuto é r·V = q·(CA0 − CA) = q·CA0·X, que entra no termo de calor da reação. Reorganizando, o calor gerado Qg (pela reação, em J/min) iguala o calor removido Qr (pela corrente e pela camisa, em J/min).

A equação tem uma só incógnita, T, pois X depende de T pelo balanço de massa. O calor removido Qr é uma reta em T; o calor gerado Qg tem forma de S, porque a conversão satura em 100 %. Uma reta pode cortar uma curva em S em um, dois ou três pontos: cada cruzamento é um estado estacionário.

Parâmetro | Valor | Unidade | Fonte | 

q | 100 | L/min | dado | 

V | 100 | L | dado | 

CA0 | 1,0 | mol/L | dado | 

Tf | 350 | K | dado | 

Tc | 300 | K | dado | 

ΔHr | −5,0·104 | J/mol | dado | 

ρ | 1000 | g/L | dado | 

cp | 0,239 | J/(g·K) | dado | 

UA | 5,0·104 | J/(min·K) | dado | 

k0 | 7,2·1010 | 1/min | dado | 

Ea/R | 8750 | K | dado | 

τ | 1 | min | derivado τ = V/q = 100/100 | 

ρ·cp·q | 23900 | J/(min·K) | derivado 1000 · 0,239 · 100 | 

faixa de T | 290 a 450 | K | escolha contém os três estados com folga | 

passo da varredura | 0,5 | K | escolha fino o bastante para separar as raízes | 

horizonte da simulação | 60 | min | escolha muito maior que τ = 1 min | 

[technique] 

[technique-name] Busca de raízes

O estado estacionário é a temperatura que anula a diferença entre o calor gerado e o calor removido: uma equação não linear, sem fórmula fechada, e que pode ter mais de uma solução. Para resolvê-lo vamos usar a busca de raízes: primeiro varremos as temperaturas e anotamos onde a diferença muda de sinal; em cada um desses intervalos há uma raiz, que o método vai estreitando até a precisão desejada. Serve aqui porque cada mudança de sinal garante uma raiz. Em Python, a função que faz isso é brentq, da biblioteca scipy.optimize. Veja na próxima seção como usá-la.

## Código

[step] 

### Dados do enunciado

[purpose] Guardar cada dado do problema em uma variável com nome e unidade, para que o resto do programa leia como as equações.

```
import numpy as np
from scipy.optimize import brentq
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# Dados do enunciado
q = 100.0 # vazão volumétrica, L/min
V = 100.0 # volume do reator, L
CA0 = 1.0 # concentração de A na alimentação, mol/L
Tf = 350.0 # temperatura da alimentação, K
Tc = 300.0 # temperatura da camisa, K
dH = -5.0e4 # calor de reação, J/mol
rho = 1000.0 # massa específica, g/L
cp = 0.239 # calor específico, J/(g*K)
UA = 5.0e4 # coeficiente global de troca, J/(min*K)
k0 = 7.2e10 # fator pré-exponencial, 1/min
Ea_R = 8750.0 # energia de ativação dividida por R, K

tau = V / q # tempo de residência, min
```

[how] As linhas com import carregam ferramentas prontas: numpy (cálculo com vetores, apelidado np), brentq (busca de raízes), solve_ivp (integração no tempo, usada na verificação) e matplotlib.pyplot (gráficos, apelidado plt). Uma linha como q = 100.0 cria uma variável: o nome à esquerda guarda o valor à direita. O texto depois de # é comentário, ignorado pelo Python. Números levam ponto decimal, e 7.2e10 é 7,2·1010. As unidades são coerentes: g/L com J/(g·K), minutos em todo lugar.

[so-far] O programa conhece todos os dados e o tempo de residência tau (V/q).

[step] 

### Equações do modelo como funções

[purpose] Traduzir as equações do modelo em funções, para calcular o calor gerado e o removido em qualquer temperatura.

```
def k(T):
 return k0 * np.exp(-Ea_R / T) # 1/min

def conversao(T):
 return k(T) * tau / (1 + k(T) * tau) # adimensional

def calor_gerado(T): # J/min
 return -dH * q * CA0 * conversao(T)

def calor_removido(T): # J/min
 return rho * cp * q * (T - Tf) + UA * (T - Tc)

def residuo(T): # J/min
 return calor_gerado(T) - calor_removido(T)
```

[how] Uma função começa com def, seguido do nome e, entre parênteses, do que ela recebe (aqui, a temperatura T); o bloco recuado é o que ela faz, e return devolve o resultado. np.exp é a exponencial; como T pode ser um vetor inteiro de temperaturas, cada função calcula todas de uma vez. Uma função pode chamar outra: conversao usa k, e calor_gerado usa conversao. Os valores de q, rho etc. são lidos do passo anterior. residuo é a diferença que queremos anular.

[so-far] Dada uma temperatura, o programa calcula a conversão, o calor gerado, o calor removido e o resíduo, todos em J/min (a conversão é adimensional).

[step] 

### Varrer a faixa e refinar cada raiz

[purpose] Achar as temperaturas em que o resíduo é zero e imprimir, para cada uma, a conversão correspondente.

```
# Varredura e busca das raízes
Tgrade = np.linspace(290.0, 450.0, 321) # K, passo de 0,5 K
r = residuo(Tgrade)
idx = np.where(r[:-1] * r[1:] < 0)[0]
estados = [brentq(residuo, Tgrade[i], Tgrade[i + 1]) for i in idx]

for n, T in enumerate(estados, start=1):
 X = 100 * conversao(T)
 print(f"Estado {n}: T = {T:.2f} K, X = {X:.1f} %")
```

[how] 

np.linspace(290.0, 450.0, 321) — cria um vetor de 321 temperaturas igualmente espaçadas de 290 a 450 K, passo de 0,5 K.

r[:-1] * r[1:] — r[:-1] são todos os resíduos menos o último e r[1:], todos menos o primeiro; multiplicados item a item, dão o produto de cada par de vizinhos. Produto negativo (< 0) significa que o resíduo trocou de sinal entre os dois pontos: há uma raiz no intervalo.

np.where(...)[0] — devolve as posições onde a condição é verdadeira, dentro de uma tupla (um grupo de valores entre parênteses); o [0] pega o primeiro elemento da tupla, a lista de posições, guardada em idx.

brentq(residuo, a, b) — recebe a nossa função residuo (sem parênteses: estamos entregando a função, não chamando-a) e os extremos a e b do intervalo, onde o resíduo tem sinais opostos. Dentro da biblioteca, o brentq chama residuo várias vezes, com temperaturas cada vez mais próximas da raiz, usa os valores devolvidos para encurtar o intervalo e para quando ele fica menor que a tolerância padrão xtol = 2·10−12 K, muito mais fina que as 2 casas decimais com que lemos o resultado.

[... for i in idx] — compreensão de lista: repete a expressão para cada posição i de idx e junta os resultados em uma lista. Tgrade[i] é o elemento de posição i do vetor (a contagem começa em 0).

enumerate(estados, start=1) — entrega cada temperatura junto com um número de ordem que começa em 1; for n, T in ... separa os dois em n e T.

f"...{T:.2f}..." — texto com valores embutidos: :.2f escreve o número com 2 casas decimais e :.1f, com 1.

[how] Cuidado: a varredura só enxerga raízes separadas por mais de um passo (0,5 K); duas raízes coladas dentro do mesmo passo passariam despercebidas, e por isso o passo foi escolhido fino.

[so-far] O programa acha e imprime três estados estacionários, cada um com sua conversão.

[step] 

### Verificar a raiz do meio à mão

[purpose] Confirmar um dos estados com uma conta que não usa a busca de raízes.

```
# Verificação 1: a mão, em T = Tf o termo da corrente se anula
print(f"k(350 K) = {k(350.0):.4f} 1/min")
print(f"Calor gerado em 350 K: {calor_gerado(350.0):.3e} J/min")
print(f"Troca com a camisa: {UA * (Tf - Tc):.3e} J/min")
```

[how] Em T = Tf = 350 K o termo da corrente é zero (alimentação e reator à mesma temperatura), e o balanço se reduz a "calor gerado = UA·(Tf − Tc)". Além disso, o expoente fica −8750/350 = −25, e e−25 deixa k praticamente igual a 1 min−1. A conversão é então kτ/(1 + kτ) = 0,5, o calor gerado é 0,5 · 5,0·106 = 2,5·106 J/min, e a troca é 5,0·104 · (350 − 300) = 2,5·106 J/min. As duas últimas linhas impressas coincidem, logo o estado do meio está em torno de 350 K; a diferença de 0,01 K para o valor encontrado vem de k ser 0,9999 e não exatamente 1. No formato :.3e, o e pede notação científica com 3 casas.

[so-far] O estado do meio foi confirmado por uma conta à mão, sem reaproveitar a busca.

[step] 

### Verificar os extremos com uma simulação

[purpose] Confirmar os outros dois estados por um caminho independente: deixar o reator evoluir no tempo e ver para onde a temperatura vai.

```
# Verificação 2: simulação no tempo
def dinamica(t, y, sinal):
 CA, T = y
 dCA = (CA0 - CA) / tau - k(T) * CA
 dT = ((Tf - T) / tau - dH * k(T) * CA / (rho * cp)
 - UA * (T - Tc) / (rho * cp * V))
 return [sinal * dCA, sinal * dT]

for T0, sinal in [(340.0, +1), (360.0, -1)]:
 CA_ini = CA0 / (1 + k(T0) * tau)
 sol = solve_ivp(dinamica, (0, 60), [CA_ini, T0],
 args=(sinal,), rtol=1e-8, atol=1e-10)
 T_fim = sol.y[1, -1]
 print(f"Simulação de {T0:.0f} K (sinal {sinal}): "
 f"T final = {T_fim:.2f} K")
```

[how] A função dinamica calcula as derivadas dCA/dt e dT/dt das equações com acúmulo (as formas deduzidas na seção do modelo). Ela será entregue ao solve_ivp, o integrador: um algoritmo que avança o tempo em pequenos passos, escolhendo sozinho o tamanho de cada passo, e que em cada passo chama dinamica para saber para onde as variáveis estão indo.

[how] 

dinamica(t, y, sinal) — chamada pelo solve_ivp muitas vezes, com o tempo atual t (não usado aqui, mas obrigatório na primeira posição), o estado atual y e o valor extra sinal. O estado chega sempre como uma sequência: CA, T = y separa os dois números em duas variáveis (desempacotamento). A função devolve a lista das duas derivadas, e o integrador usa essa lista para dar o próximo passo.

[sinal * dCA, sinal * dT] — com sinal igual a +1, o tempo corre para a frente; com −1, todas as derivadas trocam de sinal e a simulação roda o tempo para trás, como um filme rebobinado. Um estado que repele a simulação para a frente atrai a simulação para trás.

(0, 60) — intervalo de tempo simulado, de 0 a 60 min (muito mais que τ = 1 min).

[CA_ini, T0] — condição inicial, na mesma ordem de y: a concentração de A que corresponderia ao regime estacionário na temperatura T0, e a própria T0.

args=(sinal,) — caminho pelo qual o valor extra chega a dinamica: a tupla é repassada como terceiro argumento a cada chamada. A vírgula depois de sinal é obrigatória; sem ela, os parênteses seriam só um agrupamento e não uma tupla de um elemento.

rtol=1e-8, atol=1e-10 — tolerâncias do integrador: o erro tolerado em cada passo é de 10−8 do valor da variável (relativa) mais 10−10 absoluto, cerca de 8 algarismos corretos.

sol.y[1, -1] — sol.y é uma tabela com uma linha por variável e uma coluna por instante; a linha 1 é a temperatura e a coluna -1 é a última, o fim da simulação.

for T0, sinal in [(340.0, +1), (360.0, -1)] — percorre uma lista de pares; em cada volta, T0 e sinal recebem os dois valores de um par. Dentro do texto, {sinal} escreve o valor do par.

[so-far] Partindo de 340 K, o tempo direto leva o reator ao estado de menor temperatura; partindo de 360 K, é o tempo invertido que leva ao de maior temperatura.

[step] 

### Desenhar o calor gerado e o calor removido

[purpose] Ver os dois calores contra a temperatura e marcar os pontos onde se cruzam.

```
# Figura
plt.plot(Tgrade, calor_gerado(Tgrade) / 1e6, label="Calor gerado")
plt.plot(Tgrade, calor_removido(Tgrade) / 1e6,
 label="Calor removido")
Te = np.array(estados)
plt.plot(Te, calor_gerado(Te) / 1e6, "ko", label="Estados")
plt.xlabel("Temperatura do reator (K)")
plt.ylabel("Calor (MJ/min)")
plt.legend()
plt.show()
```

[how] plt.plot(x, y, label=...) desenha uma curva; label é o nome que aparece na legenda. Dividimos por 1e6 para mostrar o calor em MJ/min (milhões de J/min). "ko" pede círculos (o) pretos (k), sem linha; np.array(estados) converte a lista de raízes em vetor, para a função calcular todas de uma vez. plt.xlabel e plt.ylabel dão nome e unidade aos eixos, plt.legend() mostra a legenda e plt.show() abre a janela com a figura.

[so-far] O programa termina com a figura dos dois calores e dos três estados.

[step] 

### Programa completo

```
import numpy as np
from scipy.optimize import brentq
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# Dados do enunciado
q = 100.0 # vazão volumétrica, L/min
V = 100.0 # volume do reator, L
CA0 = 1.0 # concentração de A na alimentação, mol/L
Tf = 350.0 # temperatura da alimentação, K
Tc = 300.0 # temperatura da camisa, K
dH = -5.0e4 # calor de reação, J/mol
rho = 1000.0 # massa específica, g/L
cp = 0.239 # calor específico, J/(g*K)
UA = 5.0e4 # coeficiente global de troca, J/(min*K)
k0 = 7.2e10 # fator pré-exponencial, 1/min
Ea_R = 8750.0 # energia de ativação dividida por R, K

tau = V / q # tempo de residência, min

def k(T):
 return k0 * np.exp(-Ea_R / T) # 1/min

def conversao(T):
 return k(T) * tau / (1 + k(T) * tau) # adimensional

def calor_gerado(T): # J/min
 return -dH * q * CA0 * conversao(T)

def calor_removido(T): # J/min
 return rho * cp * q * (T - Tf) + UA * (T - Tc)

def residuo(T): # J/min
 return calor_gerado(T) - calor_removido(T)

# Varredura e busca das raízes
Tgrade = np.linspace(290.0, 450.0, 321) # K, passo de 0,5 K
r = residuo(Tgrade)
idx = np.where(r[:-1] * r[1:] < 0)[0]
estados = [brentq(residuo, Tgrade[i], Tgrade[i + 1]) for i in idx]

for n, T in enumerate(estados, start=1):
 X = 100 * conversao(T)
 print(f"Estado {n}: T = {T:.2f} K, X = {X:.1f} %")

# Verificação 1: a mão, em T = Tf o termo da corrente se anula
print(f"k(350 K) = {k(350.0):.4f} 1/min")
print(f"Calor gerado em 350 K: {calor_gerado(350.0):.3e} J/min")
print(f"Troca com a camisa: {UA * (Tf - Tc):.3e} J/min")

# Verificação 2: simulação no tempo
def dinamica(t, y, sinal):
 CA, T = y
 dCA = (CA0 - CA) / tau - k(T) * CA
 dT = ((Tf - T) / tau - dH * k(T) * CA / (rho * cp)
 - UA * (T - Tc) / (rho * cp * V))
 return [sinal * dCA, sinal * dT]

for T0, sinal in [(340.0, +1), (360.0, -1)]:
 CA_ini = CA0 / (1 + k(T0) * tau)
 sol = solve_ivp(dinamica, (0, 60), [CA_ini, T0],
 args=(sinal,), rtol=1e-8, atol=1e-10)
 T_fim = sol.y[1, -1]
 print(f"Simulação de {T0:.0f} K (sinal {sinal}): "
 f"T final = {T_fim:.2f} K")

# Figura
plt.plot(Tgrade, calor_gerado(Tgrade) / 1e6, label="Calor gerado")
plt.plot(Tgrade, calor_removido(Tgrade) / 1e6,
 label="Calor removido")
Te = np.array(estados)
plt.plot(Te, calor_gerado(Te) / 1e6, "ko", label="Estados")
plt.xlabel("Temperatura do reator (K)")
plt.ylabel("Calor (MJ/min)")
plt.legend()
plt.show()
```

Os passos juntos, em ordem, prontos para rodar no editor.

## Resultado

[answer] 

Os três estados estacionários estão em 324,48 K, 350,01 K e 369,70 K. A conversão de A é de 12,3 % no estado de menor temperatura (324,48 K) e de 79,1 % no de maior temperatura (369,70 K); no estado do meio ela é de 50,0 %.

[figura; controles: Tc, UA] 

### De onde vêm os três cruzamentos?

O calor removido é uma reta em T, de inclinação 23900 + 50000 = 73900 J/(min·K). O calor gerado tem forma de S: é pequeno em temperatura baixa, sobe rápido com o fator de Arrhenius e satura em 5,0·104 · 100 · 1,0 = 5,0·106 J/min (5,0 MJ/min), quando todo o A reage. A reta corta o S em 324,48 K, 350,01 K e 369,70 K.

### O que muda de um estado para outro?

A conversão passa de 12,3 % para 50,0 % e depois 79,1 %, com apenas 369,70 − 324,48 = 45,22 K de diferença de temperatura entre os extremos. Esse estreito intervalo cobre a subida íngreme do S do calor gerado, onde pouca temperatura a mais já traz muita conversão a mais.

### Por que a verificação por simulação precisou do tempo invertido?

Partindo de 340 K, a simulação comum termina em 324,48 K: esse estado atrai o reator. Já para chegar a 369,70 K foi preciso rodar o tempo para trás a partir de 360 K, o que mostra que, andando para a frente, o reator se afasta dele. O estado de maior temperatura existe como solução das equações, mas não é onde uma simulação normal para. Por isso a busca de raízes é a ferramenta certa: ela encontra todos os estados, estáveis ou não.

### Suba Tc para 305 K

Uma camisa mais quente retira menos calor: a reta do calor removido sobe, e os dois cruzamentos de menor temperatura desaparecem. Resta um único estado, a 378,07 K.

[in-your-code] No código, troque Tc = 300.0 por Tc = 305.0. O programa imprime uma só linha de estado: Estado 1: T = 378.07 K, X = 86.5 %. As verificações dos passos 4 e 5 foram escritas para os dados originais e deixam de valer.

### Reduza UA para 30000 J/(min·K)

Com menos troca térmica, a inclinação da reta do calor removido cai e ela corta o calor gerado só no alto da curva. Resta um estado a 412,92 K, com conversão quase total.

[in-your-code] No código, troque UA = 5.0e4 por UA = 3.0e4. O programa imprime Estado 1: T = 412.92 K, X = 97.8 %. Com UA = 8,0·104 J/(min·K), a situação se inverte e sobra só o estado frio.

 Algo não ficou claro? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
