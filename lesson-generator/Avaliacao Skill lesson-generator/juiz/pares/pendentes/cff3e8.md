# Comparação cff3e8

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/cff3e8.json`.

# Enunciado enviado ao modelo

Uma mistura líquida com 40% molar de n-hexano e 60% de n-heptano está a 760 mmHg. Considere a lei de Raoult e a equação de Antoine, log10 Psat = A − B/(T + C), com Psat em mmHg e T em °C: para o n-hexano, A = 6,87776, B = 1171,530 e C = 224,366; para o n-heptano, A = 6,90240, B = 1268,115 e C = 216,900. Calcule a temperatura de bolha (°C) e a fração molar de n-hexano no primeiro vapor formado. Para um vapor com a mesma composição global (40% de n-hexano), calcule a temperatura de orvalho (°C) e a fração molar de n-hexano na primeira gota de líquido.


==================== LIÇÃO 1 ====================

Termodinâmica · equilíbrio líquido-vapor · equação algébrica não linear

# Temperaturas de bolha e de orvalho de uma mistura

[problem] 

Uma mistura líquida com z1 = 0,40 mol/mol de n-hexano e 0,60 mol/mol de n-heptano está a P = 760 mmHg. Considere a lei de Raoult e a equação de Antoine, log10 Psat = A − B/(T + C), com Psat em mmHg e T em °C. Para o n-hexano, A = 6,87776, B = 1171,530 e C = 224,366; para o n-heptano, A = 6,90240, B = 1268,115 e C = 216,900.

a temperatura de bolha, em °C;

a fração molar de n-hexano no primeiro vapor formado;

para um vapor com a mesma composição global (40 % de n-hexano), a temperatura de orvalho, em °C;

a fração molar de n-hexano na primeira gota de líquido formada.

Ao aquecer o líquido, a primeira bolha de vapor aparece na temperatura de bolha; ao resfriar o vapor, a primeira gota aparece na temperatura de orvalho. No fim, você terá um programa que calcula as duas temperaturas e as composições das primeiras fases formadas, e um gráfico com as duas curvas.

## Modelo

Não há balanço neste problema: nada se acumula nem escoa. O modelo são as relações de equilíbrio entre líquido e vapor, que valem para cada componente.

[eq-block] Lei de Raoult: 

 ⟦y_i P = x_i P_i^(sat)⟧ 

xi, yi — fração molar do componente i no líquido e no vapor, adimensional

P — pressão total, mmHg

Pisat — pressão de vapor do componente puro i à temperatura T, mmHg

A lei de Raoult supõe mistura ideal: a pressão parcial de cada componente no vapor é a sua fração molar no líquido vezes a pressão de vapor dele como puro.

[eq-block] Equação de Antoine: 

 ⟦log_10 P_i^(sat) = A − (B)/(T + C)⟧ 

A, B, C — constantes de cada componente: A é adimensional; B e C estão em °C

T — temperatura, °C

Ela dá a pressão de vapor de um componente puro a uma temperatura. Como T aparece dentro de um logaritmo, não dá para isolar T quando se conhece a pressão.

[eq-block] Condição de bolha: 

 ⟦∑ x_i P_i^(sat) ( T ) = P⟧ 

Sai da soma das frações do vapor, Σ yi = 1, com a lei de Raoult. Como a primeira bolha tem a mesma composição do líquido, xi é a composição global. Abaixo dessa temperatura o líquido não ferve.

[eq-block] Condição de orvalho: 

 ⟦P ⋅ ∑ (y_i )/(P_i^(sat) ) ( T ) = 1⟧ 

Sai da soma das frações do líquido, Σ xi = 1, com a lei de Raoult escrita como xi = yi P/Pisat. Como o primeiro vapor tem a composição global, yi é a composição global.

Parâmetro | Valor | Unidade | Fonte | 

z1, fração molar global de n-hexano | 0,40 | mol/mol | enunciado | 

P, pressão total | 760 | mmHg | enunciado | 

Intervalo de busca das raízes, inferior e superior | 0 e 150 | °C | escolhacobre as duas fases; a função muda de sinal nele | 

Pontos do gráfico, em composição | 101 | adimensional | escolharesolução suficiente para a curva | 

A1, n-hexano | 6,87776 | adimensional | enunciado | 

B1, n-hexano | 1171,530 | °C | enunciado | 

C1, n-hexano | 224,366 | °C | enunciado | 

A2, n-heptano | 6,90240 | adimensional | enunciado | 

B2, n-heptano | 1268,115 | °C | enunciado | 

C2, n-heptano | 216,900 | °C | enunciado | 

[technique] 

[technique-name] Busca de raiz

Este tipo de problema pede a temperatura que faz uma equação valer zero, e essa equação não se isola em T, porque T aparece dentro de um logaritmo. Para resolver este tipo de problema, vamos usar a busca de raiz: a raiz é o valor de T que zera a equação, e o método a procura refinando um intervalo até a precisão desejada. Ela serve aqui porque cada equação muda de sinal entre 0 °C e 150 °C, o que garante uma raiz nesse intervalo. Em Python, a função que faz isso é brentq, da biblioteca scipy.optimize. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados em variáveis

[purpose] Guardar cada número do enunciado em uma variável, com a unidade num comentário, e carregar as ferramentas que o programa vai usar.

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import brentq

# Dados do problema
P = 760.0 # pressão total, mmHg
z1 = 0.40 # fração molar global de n-hexano

# Constantes de Antoine: log10(Psat) = A - B/(T + C), Psat em mmHg, T em °C
A1, B1, C1 = 6.87776, 1171.530, 224.366 # n-hexano
A2, B2, C2 = 6.90240, 1268.115, 216.900 # n-heptano
```

[how] 

import numpy as np: carrega a biblioteca de cálculo com vetores; np é o apelido curto usado abaixo.

import matplotlib.pyplot as plt: carrega o módulo de gráficos; plt é o apelido.

from scipy.optimize import brentq: pega da biblioteca scipy, módulo optimize, somente a função brentq, a busca de raiz.

P = 760.0: uma variável guarda um valor. O ponto é o separador decimal, como em todo o código.

# ...: comentário. O Python ignora o texto depois do #; aqui ele diz a unidade.

A1, B1, C1 = 6.87776, 1171.530, 224.366: atribuição de várias variáveis de uma vez; o primeiro valor vai para A1, o segundo para B1, e assim por diante.

[so-far] O programa conhece a pressão, a composição e as constantes de Antoine. Ainda não calcula nada.

[step] 

### Pressão de vapor de um componente puro

[purpose] Escrever uma vez a equação de Antoine, para usá-la com qualquer componente e qualquer temperatura.

```
def psat(A, B, C, T):
 """Pressão de vapor (mmHg) de um componente puro a T (°C)."""
 return 10 ** (A - B / (T + C))
```

[how] 
 def psat(A, B, C, T): define uma função com esse nome. Ela recebe quatro valores, que dentro dela se chamam A, B, C e T; a linha indentada abaixo é o corpo da função.
 """...""" é um texto de documentação: diz o que a função faz e não altera o cálculo.
 10 ** (...): ** é potência. A expressão é a equação de Antoine isolada: Psat = 10 elevado a (A − B/(T + C)).
 return devolve o resultado para quem chamou a função. psat(A1, B1, C1, 80) daria a pressão do n-hexano a 80 °C.

[so-far] Agora psat devolve a pressão de vapor, em mmHg, de um componente puro a qualquer temperatura. Ainda não resolve a mistura.

[step] 

### Temperatura de bolha

[purpose] Achar a temperatura em que a soma das pressões parciais chega a 760 mmHg, e a composição do primeiro vapor.

```
def f_bolha(T, x1):
 """Zero quando as pressões parciais somam P (mmHg)."""
 p1 = psat(A1, B1, C1, T)
 p2 = psat(A2, B2, C2, T)
 return x1 * p1 + (1 - x1) * p2 - P

T_bolha = brentq(f_bolha, 0, 150, args=(z1,)) # °C
P1_bolha = psat(A1, B1, C1, T_bolha) # mmHg
y1_bolha = z1 * P1_bolha / P # lei de Raoult
print(f"Temperatura de bolha: {T_bolha:.1f} °C")
print(f"Fração molar de n-hexano no 1º vapor: {y1_bolha:.3f}")
```

[how] 

def f_bolha(T, x1):: a função que brentq vai zerar. Recebe a temperatura T e a composição do líquido x1. Ela devolve o resíduo: quanto falta para a soma dar P. Vale zero no ponto de bolha.

p1 e p2: variáveis locais, existem só dentro da função, em mmHg.

brentq(f_bolha, 0, 150, args=(z1,)) procura o zero de f_bolha. Seus argumentos:

[how] 

f_bolha: a função, pelo nome, sem parênteses. Passar a função como argumento permite que o brentq a chame quantas vezes precisar.

0 e 150: o intervalo de busca, em °C. A função precisa mudar de sinal entre os dois extremos; aqui ela é negativa em 0 °C e positiva em 150 °C.

args=(z1,): valores extras, passados a f_bolha depois de T. Cada chamada é f_bolha(T, z1). A vírgula no fim faz do (z1,) uma tupla de um item só; sem ela, o Python não enxergaria uma tupla.

 O brentq testa temperaturas dentro do intervalo, estreitando-o a cada passo, até que ele tenha menos de 2 × 10⁻¹² °C. Essa tolerância é o padrão da função e é muito menor do que os 0,1 °C impressos; o número devolvido é a raiz, T_bolha.

y1_bolha = z1 * P1_bolha / P: a lei de Raoult, isolando a fração do vapor. No ponto de bolha, o líquido tem a composição global, então z1 é a fração no líquido.

f"...{T_bolha:.1f}...": texto com um valor inserido no lugar das chaves; :.1f é um número com uma casa decimal, e :.3f, com três.

[so-far] O programa acha a temperatura de bolha e a fração de n-hexano no primeiro vapor, e imprime os dois.

[step] 

### Temperatura de orvalho

[purpose] Achar a temperatura em que o vapor começa a condensar, e a composição da primeira gota.

```
def g_orvalho(T, y1):
 """Zero quando as frações do líquido somam 1."""
 p1 = psat(A1, B1, C1, T)
 p2 = psat(A2, B2, C2, T)
 return P * (y1 / p1 + (1 - y1) / p2) - 1

T_orvalho = brentq(g_orvalho, 0, 150, args=(z1,)) # °C
P1_orvalho = psat(A1, B1, C1, T_orvalho) # mmHg
x1_orvalho = z1 * P / P1_orvalho # lei de Raoult
print(f"Temperatura de orvalho: {T_orvalho:.1f} °C")
print(f"Fração molar de n-hexano na 1ª gota: {x1_orvalho:.3f}")
```

[how] 

def g_orvalho(T, y1):: o resíduo do orvalho. Recebe T e a composição do vapor y1, e devolve a soma das frações do líquido menos 1. Vale zero quando essa soma é 1.

brentq(g_orvalho, 0, 150, args=(z1,)): a mesma chamada da etapa anterior, agora com a função do orvalho. Cada chamada é g_orvalho(T, z1), e o intervalo de 0 °C a 150 °C tem sinal trocado entre os extremos.

x1_orvalho = z1 * P / P1_orvalho: a lei de Raoult, isolando a fração do líquido. No orvalho, o vapor tem a composição global, então z1 é a fração no vapor.

[so-far] O programa acha a temperatura de orvalho e a fração de n-hexano na primeira gota, e imprime os dois.

[step] 

### Teste com os componentes puros

[purpose] Conferir o resultado com um caso cuja resposta se conhece por fórmula.

```
# Um componente puro ferve quando Psat = P: T = B/(A - log10 P) - C
T_hex = B1 / (A1 - np.log10(P)) - C1
T_hep = B2 / (A2 - np.log10(P)) - C2
s1 = brentq(f_bolha, 0, 150, args=(1.0,)) # hexano pelo solver
s2 = brentq(f_bolha, 0, 150, args=(0.0,)) # heptano pelo solver
print(f"Hexano puro, fórmula: {T_hex:.1f} °C, solver: {s1:.1f} °C")
print(f"Heptano puro, fórmula: {T_hep:.1f} °C, solver: {s2:.1f} °C")
```

[how] 

T = B / (A - log10 P) - C: a equação de Antoine com Psat = P, isolando T à mão. np.log10(P) é o logaritmo de base 10 de P, calculado pelo numpy. Não há método numérico aqui: a fórmula dá o resultado direto.

brentq(f_bolha, 0, 150, args=(1.0,)): o mesmo solver, mas com x1 = 1.0, o líquido de n-hexano puro. O resultado deve bater com a fórmula.

args=(0.0,): com x1 = 0.0, o líquido é n-heptano puro.

[so-far] Os dois métodos concordam para os componentes puros, então o solver está certo. As temperaturas dos puros, 68,7 °C e 98,4 °C, são os extremos da mistura: as temperaturas de bolha e de orvalho ficam entre elas.

[step] 

### Gráfico das duas temperaturas

[purpose] Desenhar as temperaturas de bolha e de orvalho para todas as composições, e marcar o ponto deste problema.

```
x = np.linspace(0, 1, 101) # fração molar de n-hexano
# T de bolha de cada líquido e de orvalho de cada vapor, °C
Tb = [brentq(f_bolha, 0, 150, args=(xi,)) for xi in x]
To = [brentq(g_orvalho, 0, 150, args=(yi,)) for yi in x]

plt.plot(x, Tb, label="Ponto de bolha")
plt.plot(x, To, label="Ponto de orvalho")
plt.plot(z1, T_bolha, "o")
plt.plot(z1, T_orvalho, "o")
plt.xlabel("Fração molar de n-hexano")
plt.ylabel("Temperatura (°C)")
plt.legend()
plt.show()
```

[how] 

np.linspace(0, 1, 101): 101 números igualmente espaçados de 0 a 1, as composições do gráfico.

[... for xi in x] é uma lista por compreensão: repete a expressão para cada valor xi de x e junta os resultados numa lista. Cada brentq acha uma raiz para uma composição; são 101 raízes por curva.

args=(xi,), em cada uma dessas raízes: o valor xi é passado a f_bolha depois da temperatura, de modo que cada chamada é f_bolha(T, xi). A vírgula faz a tupla de um item, como na etapa da temperatura de bolha.

plt.plot(x, Tb, label="..."): desenha Tb contra x. O label é o nome que aparece na legenda.

plt.plot(z1, T_bolha, "o"): desenha um único ponto, com marcador em forma de círculo, no ponto de bolha deste problema.

plt.legend() mostra a legenda; plt.show() abre a janela com o gráfico.

[so-far] Ao rodar, o programa já imprimiu as quatro respostas, e agora mostra o gráfico com as duas curvas e os dois pontos deste problema.

[step] 

### Programa completo

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.optimize import brentq

# Dados do problema
P = 760.0 # pressão total, mmHg
z1 = 0.40 # fração molar global de n-hexano

# Constantes de Antoine: log10(Psat) = A - B/(T + C), Psat em mmHg, T em °C
A1, B1, C1 = 6.87776, 1171.530, 224.366 # n-hexano
A2, B2, C2 = 6.90240, 1268.115, 216.900 # n-heptano

def psat(A, B, C, T):
 """Pressão de vapor (mmHg) de um componente puro a T (°C)."""
 return 10 ** (A - B / (T + C))

def f_bolha(T, x1):
 """Zero quando as pressões parciais somam P (mmHg)."""
 p1 = psat(A1, B1, C1, T)
 p2 = psat(A2, B2, C2, T)
 return x1 * p1 + (1 - x1) * p2 - P

T_bolha = brentq(f_bolha, 0, 150, args=(z1,)) # °C
P1_bolha = psat(A1, B1, C1, T_bolha) # mmHg
y1_bolha = z1 * P1_bolha / P # lei de Raoult
print(f"Temperatura de bolha: {T_bolha:.1f} °C")
print(f"Fração molar de n-hexano no 1º vapor: {y1_bolha:.3f}")

def g_orvalho(T, y1):
 """Zero quando as frações do líquido somam 1."""
 p1 = psat(A1, B1, C1, T)
 p2 = psat(A2, B2, C2, T)
 return P * (y1 / p1 + (1 - y1) / p2) - 1

T_orvalho = brentq(g_orvalho, 0, 150, args=(z1,)) # °C
P1_orvalho = psat(A1, B1, C1, T_orvalho) # mmHg
x1_orvalho = z1 * P / P1_orvalho # lei de Raoult
print(f"Temperatura de orvalho: {T_orvalho:.1f} °C")
print(f"Fração molar de n-hexano na 1ª gota: {x1_orvalho:.3f}")

# Um componente puro ferve quando Psat = P: T = B/(A - log10 P) - C
T_hex = B1 / (A1 - np.log10(P)) - C1
T_hep = B2 / (A2 - np.log10(P)) - C2
s1 = brentq(f_bolha, 0, 150, args=(1.0,)) # hexano pelo solver
s2 = brentq(f_bolha, 0, 150, args=(0.0,)) # heptano pelo solver
print(f"Hexano puro, fórmula: {T_hex:.1f} °C, solver: {s1:.1f} °C")
print(f"Heptano puro, fórmula: {T_hep:.1f} °C, solver: {s2:.1f} °C")

x = np.linspace(0, 1, 101) # fração molar de n-hexano
# T de bolha de cada líquido e de orvalho de cada vapor, °C
Tb = [brentq(f_bolha, 0, 150, args=(xi,)) for xi in x]
To = [brentq(g_orvalho, 0, 150, args=(yi,)) for yi in x]

plt.plot(x, Tb, label="Ponto de bolha")
plt.plot(x, To, label="Ponto de orvalho")
plt.plot(z1, T_bolha, "o")
plt.plot(z1, T_orvalho, "o")
plt.xlabel("Fração molar de n-hexano")
plt.ylabel("Temperatura (°C)")
plt.legend()
plt.show()
```

As seis etapas, coladas em ordem, formam o programa completo, pronto para rodar.

## Resultado

[answer] 

Para a mistura com z1 = 0,40 a 760 mmHg:

temperatura de bolha: 83,5 °C;

fração molar de n-hexano no primeiro vapor formado: 0,622;

temperatura de orvalho, para um vapor com a mesma composição global: 89,6 °C;

fração molar de n-hexano na primeira gota de líquido formada: 0,217.

[figura; controles: P] 

### Quanto as duas curvas se separam?

Com z1 = 0,40, a temperatura de bolha é 83,5 °C e a temperatura de orvalho é 89,6 °C. A faixa entre elas tem 89,6 − 83,5 = 6,1 °C, e é nela que líquido e vapor coexistem.

### Em que temperaturas há só uma fase?

Abaixo de 83,5 °C há só líquido, e acima de 89,6 °C há só vapor. Entre esses dois valores, as duas fases estão presentes ao mesmo tempo.

### O primeiro vapor é mais rico em n-hexano que o líquido?

Sim: o líquido tem x1 = 0,40, e o primeiro vapor tem y1 = 0,622. O n-hexano é o componente mais volátil, por isso ele passa para o vapor com mais facilidade.

### Leve a pressão até 600 mmHg

Com menos pressão, a mistura ferve e condensa em temperaturas mais baixas: as duas curvas descem. Em 600 mmHg, a temperatura de bolha cai para 75,8 °C e a de orvalho para 82,0 °C, e a faixa entre elas fica em 82,0 − 75,8 = 6,2 °C.

[in-your-code] No programa, troque P = 760.0 por P = 600.0. Ele passa a imprimir: temperatura de bolha 75,8 °C; fração de n-hexano no primeiro vapor 0,629; temperatura de orvalho 82,0 °C; fração de n-hexano na primeira gota 0,212.

 Ficou alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Termodinâmica · equilíbrio líquido-vapor · busca de raiz

# Temperaturas de bolha e de orvalho

[problem] 

Uma mistura de n-hexano (componente 1) e n-heptano (componente 2) tem fração molar global z1 = 0,40 de n-hexano e z2 = 0,60 de n-heptano. A pressão total é P = 760 mmHg. O equilíbrio segue a lei de Raoult, e a pressão de saturação de cada componente segue a equação de Antoine, log10 Psat = A − B/(T + C), com Psat em mmHg e T em °C. Para o n-hexano, A = 6,87776, B = 1171,530 e C = 224,366; para o n-heptano, A = 6,90240, B = 1268,115 e C = 216,900.

Qual é a temperatura de bolha Tb (°C) do líquido e qual é a fração molar de n-hexano no primeiro vapor formado?

Qual é a temperatura de orvalho Td (°C) de um vapor com a mesma composição global (40% de n-hexano) e qual é a fração molar de n-hexano na primeira gota de líquido?

Aquecendo o líquido, a primeira bolha de vapor aparece na temperatura de bolha; resfriando o vapor, a primeira gota de líquido aparece na temperatura de orvalho. Ao final, você terá um programa que calcula as duas temperaturas e as composições da bolha e da gota, e um diagrama temperatura–composição para explorar o efeito da pressão.

## Modelo

### Balanço de massa do componente i, em mols

 ⟦mols de i na mistura = mols de i no vapor + mols de i no líquido⟧ 

(princípio) Nada de i some ou aparece quando a mistura se divide em duas fases. O volume de controle é o recipiente fechado com as duas fases em equilíbrio, sem reação.

 ⟦N ⋅ z_i {i na mistura} = N_V ⋅ y_i {i no vapor} + N_L ⋅ x_i {i no líquido}⟧ 

N — total de mols da mistura no recipiente, mol

NV, NL — mols presentes na fase vapor e na fase líquida, mol

zi — fração molar do componente i na mistura toda, adimensional

yi, xi — fração molar do componente i no vapor e no líquido, adimensional

(tradução) Cada palavra vira mols de i: quantidade total vezes fração molar.

 ⟦bolha: N_V → 0 ⇒ x_i = z_i {o líquido ainda tem a composição global} orvalho: N_L → 0 ⇒ y_i = z_i {o vapor ainda tem a composição global}⟧ 

(definição) No ponto de bolha, a primeira bolha tem quantidade desprezível, então quase toda a mistura ainda é líquido. No ponto de orvalho, é o contrário: a primeira gota é desprezível e quase tudo é vapor. Na fórmula do passo anterior, o termo da fase que está nascendo some.

 ⟦y_i ⋅ P {pressão parcial de i no vapor} = x_i ⋅ P_i^(sat) ( T ) {pressão de vapor de i, ponderada}⟧ 

P — pressão total do sistema, mmHg

Pisat — pressão de saturação do componente i puro na temperatura T, mmHg

(hipótese) Lei de Raoult: o líquido é uma solução ideal e o vapor é um gás ideal. Se não fosse, a pressão de vapor de i seria multiplicada por um coeficiente de atividade e o gás exigiria correção de fugacidade; para hexano e heptano, que são moléculas parecidas, a aproximação é boa.

[final] 

 ⟦bolha: z_1 ⋅ P_1^(sat) ( T_b ) {n-hexano} + z_2 ⋅ P_2^(sat) ( T_b ) {n-heptano} = P {pressão total} orvalho: (z_1 ⋅ P)/(P_1^(sat) ( T_d )) {x₁ do n-hexano} + (z_2 ⋅ P)/(P_2^(sat) ( T_d )) {x₂ do n-heptano} = 1 {frações somam 1}⟧ 

(álgebra) Na bolha, substituímos xi = zi na lei de Raoult e somamos sobre i: as frações do vapor somam 1, então a soma de yi·P é P. No orvalho, isolamos xi = zi·P/Pisat e exigimos que as frações do líquido somem 1.

Cada equação diz que a mistura só está na iminência de mudar de fase na temperatura em que a pressão parcial total do líquido iguala P (bolha), ou em que as frações do líquido formado fecham em 1 (orvalho). A incógnita é a temperatura, que entra por Psat(T). Depois de achar Tb, a composição do primeiro vapor sai de y1 = z1·P1sat(Tb)/P; depois de achar Td, a da primeira gota sai de x1 = z1·P/P1sat(Td).

[eq-block] Equação de Antoine: 

 ⟦log_10 P_i^(sat) = A_i − (B_i )/(T + C_i )⟧ 

Ai, Bi, Ci — constantes empíricas de Antoine do componente i; A é adimensional, e B e C estão em °C quando T está em °C

T — temperatura, °C

É uma correlação ajustada a dados: dá a pressão de vapor do componente puro em função da temperatura, e cresce muito rápido com ela.

Parâmetro | Valor | Unidade | Fonte | 

P | 760 | mmHg | enunciado | 

z1 | 0,40 | — | enunciado | 

z2 | 0,60 | — | derivado 1 − 0,40 | 

A1, B1, C1 (n-hexano) | 6,87776 · 1171,530 · 224,366 | — · °C · °C | enunciado | 

A2, B2, C2 (n-heptano) | 6,90240 · 1268,115 · 216,900 | — · °C · °C | enunciado | 

Intervalo de busca de T | 0 a 200 | °C | escolha contém as duas raízes com folga e fica na faixa em que a equação de Antoine é aplicada | 

[technique] 

[technique-name] Busca de raiz

Cada temperatura procurada é o valor que faz uma equação de uma incógnita dar zero, e não há fórmula para isolá-la, porque a temperatura aparece dentro de expoentes de base 10. Para esse tipo de problema, usaremos a busca de raiz: dado um intervalo em que a função troca de sinal, o método estreita o intervalo repetidamente até encontrar o ponto em que ela vale zero. Ela serve aqui porque a pressão de vapor cresce sempre com a temperatura, então cada equação troca de sinal uma única vez. Em Python, a função que faz isso é brentq, da biblioteca scipy.optimize. Veja na próxima seção como usá-la.

## Código

[step] 

### Dados e pressão de saturação

[purpose] Carregar as bibliotecas, guardar os dados do enunciado e criar uma função que calcula a pressão de saturação pela equação de Antoine.

```
import numpy as np # vetores e logaritmo
from scipy.optimize import brentq # busca de raiz
import matplotlib.pyplot as plt # gráficos

P = 760.0 # pressão total, mmHg
z1 = 0.40 # fração molar global de n-hexano

# constantes de Antoine (A, B, C): log10(Psat) = A - B/(T + C)
hexano = (6.87776, 1171.530, 224.366)
heptano = (6.90240, 1268.115, 216.900)

def psat(T, const):
 A, B, C = const
 return 10 ** (A - B / (T + C)) # pressão de saturação, mmHg
```

[how] import … as … traz uma biblioteca e dá a ela um apelido curto. from … import brentq traz só uma função. Os nomes P e z1 são variáveis: guardam um número, e o texto depois do # é comentário, ignorado pelo Python. Os parênteses com três números formam uma tupla: uma lista fixa de valores, aqui (A, B, C). def psat(T, const): define uma função chamada psat que recebe a temperatura T (°C) e a tupla const; a linha A, B, C = const faz o desempacotamento, isto é, distribui os três valores da tupla nas três variáveis. return devolve o resultado a quem chamou a função, e ** é a potência: 10 ** x é 10 elevado a x, que desfaz o log10 da equação de Antoine.

[so-far] O programa conhece os dados e sabe calcular a pressão de saturação de qualquer um dos dois componentes em qualquer temperatura.

[step] 

### Temperatura de bolha pela busca de raiz

[purpose] Escrever a equação de bolha na forma "expressão igual a zero" e pedir ao brentq a temperatura que a anula.

```
def residuo_bolha(T, x1, P):
 # soma das pressões parciais menos P, mmHg
 return (x1 * psat(T, hexano)
 + (1 - x1) * psat(T, heptano) - P)

Tb = brentq(residuo_bolha, 0, 200, args=(z1, P)) # °C
y1 = z1 * psat(Tb, hexano) / P # n-hexano no primeiro vapor

print(f"Temperatura de bolha: {Tb:.2f} °C")
print(f"n-hexano no primeiro vapor: {y1:.4f}")
```

[how] 

residuo_bolha é o resíduo: o lado esquerdo menos o direito da equação de bolha, que vale zero na solução. A temperatura T vem primeiro porque é a incógnita; x1 e P são valores fixos que seguem depois.

brentq(f, a, b, args=…) chama a nossa função residuo_bolha várias vezes, cada vez com uma temperatura de teste no primeiro argumento. Os outros valores chegam por args, e o brentq os repassa a cada chamada, na ordem: x1 recebe z1 e P recebe P. O brentq olha o número devolvido e escolhe a próxima temperatura de teste; o sinal indica de que lado do zero ela está.

0 e 200 são os extremos do intervalo de busca, em °C. A função deve ter sinais opostos nos dois extremos, o que ocorre aqui: a 0 °C a soma das pressões parciais fica muito abaixo de 760 mmHg, e a 200 °C fica muito acima.

args=(z1, P) é uma tupla com os dois valores extras. A vírgula e os parênteses importam: args exige uma tupla, e com um único valor seria (z1,).

Precisão: o brentq para quando o intervalo fica menor que a tolerância (o erro máximo aceito), por padrão cerca de 2·10−12 °C. Isso é muito mais fino do que os 0,01 °C que o programa imprime.

Na linha de y1, a lei de Raoult dá a fração do vapor: y1 = x1 * Psat1 / P, com x1 = z1 na bolha.

Em f"…", o texto entre chaves é substituído pelo valor da variável; :.2f mostra 2 casas decimais e :.4f mostra 4. O print escreve na tela.

[so-far] O programa calcula a temperatura de bolha e a composição do primeiro vapor.

[step] 

### Temperatura de orvalho

[purpose] Repetir o mesmo mecanismo com a equação de orvalho, que também vira "expressão igual a zero".

```
def residuo_orvalho(T, y1, P):
 # soma das frações do líquido menos 1 (adimensional)
 return (y1 * P / psat(T, hexano)
 + (1 - y1) * P / psat(T, heptano) - 1)

Td = brentq(residuo_orvalho, 0, 200, args=(z1, P)) # °C
x1 = z1 * P / psat(Td, hexano) # n-hexano na primeira gota

print(f"Temperatura de orvalho: {Td:.2f} °C")
print(f"n-hexano na primeira gota: {x1:.4f}")
```

[how] A estrutura é idêntica à do passo anterior; só mudam a função de resíduo e o que ela mede. No orvalho a composição conhecida é a do vapor, por isso o argumento se chama y1 e recebe z1 em args. O intervalo de 0 a 200 °C troca de sinal também aqui: a 0 °C a soma é enorme (as pressões de saturação são baixas), e a 200 °C é bem menor que 1. A fração da primeira gota vem da equação isolada na derivação, x1 = z1 * P / Psat1.

[so-far] O programa agora tem as quatro respostas: Tb, y1, Td e x1.

[step] 

### Verificação independente

[purpose] Confirmar os resultados com dois cálculos que não repetem as equações que os produziram.

```
def T_pura(const, P):
 # Antoine isolada em T: ebulição do componente puro, °C
 A, B, C = const
 return B / (A - np.log10(P)) - C

print(f"Ebulição do n-hexano puro: {T_pura(hexano, P):.2f} °C")
print(f"Ebulição do n-heptano puro: {T_pura(heptano, P):.2f} °C")

# vapor y1 deve ter orvalho em Tb; líquido x1, bolha em Td
Td_do_vapor = brentq(residuo_orvalho, 0, 200, args=(y1, P))
Tb_do_liquido = brentq(residuo_bolha, 0, 200, args=(x1, P))
print(f"Orvalho do vapor y1: {Td_do_vapor:.2f} °C "
 f"(esperado {Tb:.2f})")
print(f"Bolha do líquido x1: {Tb_do_liquido:.2f} °C "
 f"(esperado {Td:.2f})")
```

[how] A primeira parte é um caso-limite com solução em fórmula fechada: para uma substância pura, a equação de Antoine pode ser isolada em T e dá o ponto de ebulição a P sem busca de raiz. A temperatura de bolha da mistura precisa cair entre os pontos de ebulição dos dois puros, e a de orvalho também. A segunda parte é uma consistência: o primeiro vapor da bolha está em equilíbrio com o líquido a Tb, então esse vapor, resfriado, deve começar a condensar exatamente em Tb; do mesmo modo, a primeira gota, aquecida, deve ferver em Td. Aqui o brentq é chamado com args=(y1, P) na equação de orvalho e com args=(x1, P) na de bolha: o args entrega, a cada chamada do resíduo, a composição e a pressão no lugar de y1/x1 e P. Assim ele não reutiliza o resultado que está sendo testado. np.log10 é o logaritmo na base 10.

[so-far] Os pontos de ebulição dos puros delimitam as temperaturas calculadas, e as duas voltas fecham nos valores esperados.

[step] 

### Diagrama temperatura–composição

[purpose] Repetir o cálculo para muitas composições e desenhar as duas curvas, marcando a mistura do exercício.

```
x = np.linspace(0, 1, 51) # 51 composições, de 0 a 1
T_bolha = [brentq(residuo_bolha, 0, 200, args=(xi, P)) for xi in x]
T_orvalho = [brentq(residuo_orvalho, 0, 200, args=(yi, P))
 for yi in x]

plt.plot(x, T_bolha, label="Temperatura de bolha")
plt.plot(x, T_orvalho, label="Temperatura de orvalho")
plt.plot([z1, y1], [Tb, Tb], "ko-") # bolha: líquido -> vapor
plt.plot([x1, z1], [Td, Td], "ko-") # orvalho: gota -> vapor
plt.xlabel("Fração molar de n-hexano (x na bolha, y no orvalho)")
plt.ylabel("Temperatura (°C)")
plt.legend()
plt.grid(True)
plt.show()
```

[how] np.linspace(0, 1, 51) cria 51 números igualmente espaçados de 0 a 1. Em cada chamada do brentq, args=(xi, P) entrega a composição xi da vez e a pressão P à função de resíduo, como antes. A construção [… for xi in x] é uma compreensão de lista: percorre x e, para cada valor xi, executa o brentq e guarda o resultado numa lista. plt.plot(x, y, label=…) traça uma curva com os valores de x no eixo horizontal e os de y no vertical; o label é o nome que aparece na legenda. Os segmentos de [z1, y1] a Tb e de [x1, z1] a Td são horizontais e ligam a composição da mistura à da primeira bolha e da primeira gota; "ko-" pede pontos (o) pretos (k) ligados por linha (-). xlabel e ylabel dão o nome dos eixos, legend mostra a legenda, grid desenha a grade e show abre a janela com a figura.

[so-far] O programa calcula as respostas, se verifica e desenha o diagrama.

[step] 

### Programa completo

```
import numpy as np # vetores e logaritmo
from scipy.optimize import brentq # busca de raiz
import matplotlib.pyplot as plt # gráficos

P = 760.0 # pressão total, mmHg
z1 = 0.40 # fração molar global de n-hexano

# constantes de Antoine (A, B, C): log10(Psat) = A - B/(T + C)
hexano = (6.87776, 1171.530, 224.366)
heptano = (6.90240, 1268.115, 216.900)

def psat(T, const):
 A, B, C = const
 return 10 ** (A - B / (T + C)) # pressão de saturação, mmHg

def residuo_bolha(T, x1, P):
 # soma das pressões parciais menos P, mmHg
 return (x1 * psat(T, hexano)
 + (1 - x1) * psat(T, heptano) - P)

Tb = brentq(residuo_bolha, 0, 200, args=(z1, P)) # °C
y1 = z1 * psat(Tb, hexano) / P # n-hexano no primeiro vapor

print(f"Temperatura de bolha: {Tb:.2f} °C")
print(f"n-hexano no primeiro vapor: {y1:.4f}")

def residuo_orvalho(T, y1, P):
 # soma das frações do líquido menos 1 (adimensional)
 return (y1 * P / psat(T, hexano)
 + (1 - y1) * P / psat(T, heptano) - 1)

Td = brentq(residuo_orvalho, 0, 200, args=(z1, P)) # °C
x1 = z1 * P / psat(Td, hexano) # n-hexano na primeira gota

print(f"Temperatura de orvalho: {Td:.2f} °C")
print(f"n-hexano na primeira gota: {x1:.4f}")

def T_pura(const, P):
 # Antoine isolada em T: ebulição do componente puro, °C
 A, B, C = const
 return B / (A - np.log10(P)) - C

print(f"Ebulição do n-hexano puro: {T_pura(hexano, P):.2f} °C")
print(f"Ebulição do n-heptano puro: {T_pura(heptano, P):.2f} °C")

# vapor y1 deve ter orvalho em Tb; líquido x1, bolha em Td
Td_do_vapor = brentq(residuo_orvalho, 0, 200, args=(y1, P))
Tb_do_liquido = brentq(residuo_bolha, 0, 200, args=(x1, P))
print(f"Orvalho do vapor y1: {Td_do_vapor:.2f} °C "
 f"(esperado {Tb:.2f})")
print(f"Bolha do líquido x1: {Tb_do_liquido:.2f} °C "
 f"(esperado {Td:.2f})")

x = np.linspace(0, 1, 51) # 51 composições, de 0 a 1
T_bolha = [brentq(residuo_bolha, 0, 200, args=(xi, P)) for xi in x]
T_orvalho = [brentq(residuo_orvalho, 0, 200, args=(yi, P))
 for yi in x]

plt.plot(x, T_bolha, label="Temperatura de bolha")
plt.plot(x, T_orvalho, label="Temperatura de orvalho")
plt.plot([z1, y1], [Tb, Tb], "ko-") # bolha: líquido -> vapor
plt.plot([x1, z1], [Td, Td], "ko-") # orvalho: gota -> vapor
plt.xlabel("Fração molar de n-hexano (x na bolha, y no orvalho)")
plt.ylabel("Temperatura (°C)")
plt.legend()
plt.grid(True)
plt.show()
```

Os passos juntos, em ordem, prontos para rodar.

## Resultado

[answer] 

Temperatura de bolha: Tb = 83,48 °C; o primeiro vapor tem fração molar de n-hexano y1 = 0,6215. Temperatura de orvalho: Td = 89,61 °C; a primeira gota de líquido tem fração molar de n-hexano x1 = 0,2169.

[figura; controles: P] 

### Qual é a faixa de temperatura em que a mistura tem duas fases?

Entre as duas curvas. Na composição global 0,40, ela vai de 83,48 °C (temperatura de bolha) até 89,61 °C (temperatura de orvalho), uma faixa de 89,61 − 83,48 = 6,13 °C. Abaixo da curva de bolha só há líquido; acima da de orvalho, só vapor.

### Por que o primeiro vapor é mais rico em n-hexano que o líquido?

O n-hexano puro ferve a 68,74 °C e o n-heptano a 98,43 °C, então o n-hexano é o mais volátil e passa preferencialmente ao vapor: o primeiro vapor tem 0,6215 de n-hexano, contra 0,40 do líquido. Pelo mesmo motivo, a primeira gota que se forma do vapor é rica no menos volátil, e só tem 0,2169 de n-hexano.

### O que acontece nas pontas do diagrama?

Em composição 0 e 1 as curvas de temperatura de bolha e temperatura de orvalho se encontram, nos pontos de ebulição dos puros, 98,43 °C e 68,74 °C: uma substância pura muda de fase a uma temperatura só, sem faixa de duas fases.

### Leve a pressão a 1520 mmHg

As duas curvas sobem juntas: é preciso mais temperatura para a pressão de vapor igualar uma pressão total maior. A faixa de duas fases na composição 0,40 passa a ir de 108,50 a 114,37 °C, ou seja, 114,37 − 108,50 = 5,87 °C, um pouco mais estreita, e o primeiro vapor fica menos enriquecido (0,6004 de n-hexano).

[in-your-code] No programa, troque P = 760.0 por P = 1520.0. Ele passa a imprimir 108.50 °C e 0.6004 na bolha, e 114.37 °C e 0.2316 no orvalho.

 Algo não ficou claro? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
