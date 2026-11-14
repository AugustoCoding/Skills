# Comparação fe6e3c

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/fe6e3c.json`.

# Enunciado enviado ao modelo

Dois tanques cilíndricos estão ligados em série por uma válvula: o tanque 1 (área de 2,0 m²) recebe a alimentação e escoa para o tanque 2 (área de 1,5 m²) com vazão q1 = 0,8 √(h1 − h2); o tanque 2 descarrega com vazão q2 = 0,6 √h2 (vazões em m³/min, níveis em m). O sistema está em estado estacionário com alimentação de 0,6 m³/min quando, no instante zero, a alimentação passa para 0,9 m³/min. Calcule os novos níveis de estado estacionário dos dois tanques (m), o nível do tanque 2 após 10 min (m) e o tempo para o nível do tanque 2 chegar a 2,0 m (min).


==================== LIÇÃO 1 ====================

Engenharia química · sistema de EDOs com valor inicial

# Dois tanques em série sob um degrau de alimentação

[problem] 

Dois tanques cilíndricos estão ligados em série por uma válvula. O tanque 1, de área A1 = 2,0 m², recebe a alimentação e escoa para o tanque 2, de área A2 = 1,5 m², com vazão q1 = 0,8 √(h1 − h2) m³/min. O tanque 2 descarrega com vazão q2 = 0,6 √h2 m³/min. Os níveis h1 e h2 estão em m. O sistema está em estado estacionário com alimentação F = 0,6 m³/min quando, no instante zero (t = 0), a alimentação passa para 0,9 m³/min.

Calcule:

os novos níveis de estado estacionário dos dois tanques, em m;

o nível do tanque 2 após 10 min, em m;

o tempo para o nível do tanque 2 chegar a 2,0 m, em min.

Os dois níveis mudam juntos no tempo, porque a vazão entre os tanques depende da diferença entre eles. Ao final, você terá um programa que calcula os três resultados e desenha a subida dos níveis.

## Modelo

### Balanço total de massa do tanque 1, em m³

 ⟦acúmulo de líquido no tanque 1 = entrada − saída⟧ 

(princípio) O líquido não aparece nem desaparece. O volume de controle é o líquido dentro do tanque 1.

 ⟦(d V_1 )/(d t) {acúmulo} = F {entrada} − q_1 {saída}⟧ 

V1 — volume de líquido no tanque 1, m³

F — vazão de alimentação do tanque 1, m³/min; vale F0 = 0,6 antes de t = 0 e F1 = 0,9 depois

q1 — vazão do tanque 1 para o tanque 2, m³/min

t — tempo, min

(tradução) Cada palavra vira um termo: o acúmulo é a derivada do volume no tempo.

 ⟦V_1 = A_1 ⋅ h_1⟧ 

A1 — área da base do tanque 1, m²

h1 — nível do líquido no tanque 1, m

(definição) O tanque é cilíndrico: o volume é a área da base vezes o nível.

 ⟦densidade constante e A A_1 constante⟧ 

(premissa) Com densidade constante, o balanço de volume é o balanço de massa dividido pela densidade. Se a densidade variasse, o balanço teria de ser escrito em massa, com a densidade dentro da derivada. A área constante vale para o cilindro; num tanque cônico, A1 sairia da derivada e teria de ficar dentro dela.

[final] 

 ⟦(d h_1 )/(d t) {variação do nível 1} = (F − q_1 )/(A_1 ) {entrada menos saída, por área}⟧ 

(álgebra) Com A1 constante, d(A1·h1)/dt = A1·dh1/dt; dividindo tudo por A1, chega-se à equação acima.

O nível do tanque 1 sobe quando a alimentação supera a vazão para o tanque 2, e cai quando é menor. A área A1 controla a velocidade: para a mesma diferença de vazão, um tanque mais largo tem o nível mudando mais devagar.

### Balanço total de massa do tanque 2, em m³

 ⟦acúmulo de líquido no tanque 2 = entrada, vinda do tanque 1 − saída⟧ 

(princípio) O mesmo princípio do tanque 1, com o volume de controle agora sendo o líquido do tanque 2.

 ⟦(d V_2 )/(d t) {acúmulo} = q_1 {entrada} − q_2 {saída}⟧ 

V2 — volume de líquido no tanque 2, m³

A2 — área da base do tanque 2, m²

h2 — nível do líquido no tanque 2, m

q2 — vazão de saída do tanque 2, m³/min

(tradução) A entrada do tanque 2 é a vazão q1, que sai do tanque 1; a saída é q2.

[final] 

 ⟦(d h_2 )/(d t) {variação do nível 2} = (q_1 − q_2 )/(A_2 ) {entrada menos saída, por área}⟧ 

(álgebra) Os mesmos passos do tanque 1 (V2 = A2·h2, com densidade e área constantes), resumidos em um só.

O nível do tanque 2 sobe enquanto chega mais líquido do tanque 1 do que sai dele. Em estado estacionário, as duas vazões se igualam e o nível para de mudar.

[eq-block] Vazão entre os tanques: 

 ⟦q_1 = c_1 √(h_1 − h_2 )⟧ 

c1 — coeficiente da válvula, 0,8 m2,5/min

h1, h2 — níveis dos tanques 1 e 2, m

Dada pelo enunciado, não derivada. A vazão pela válvula cresce com a raiz da diferença de nível, porque é essa diferença que empurra o líquido pela válvula.

[eq-block] Saída do tanque 2: 

 ⟦q_2 = c_2 √(h_2 )⟧ 

c2 — coeficiente da saída do tanque 2, 0,6 m2,5/min

Dada pelo enunciado, não derivada. A saída depende só do nível do tanque 2.

Parâmetro | Valor | Unidade | Fonte | 

A1 | 2,0 | m² | enunciado | 

A2 | 1,5 | m² | enunciado | 

c1 | 0,8 | m2,5/min | enunciadoq1 = 0,8 √(h1 − h2) | 

c2 | 0,6 | m2,5/min | enunciadoq2 = 0,6 √h2 | 

F0 | 0,6 | m³/min | enunciadoalimentação antes de t = 0 | 

F1 | 0,9 | m³/min | enunciadoalimentação depois de t = 0 | 

h1(0) | 1,5625 | m | derivadoestado inicial: q2 = F0 dá h2 = 1,0; q1 = F0 dá h1 = h2 + (F0/c1)² | 

h2(0) | 1,0000 | m | derivado(F0/c2)² = (0,6/0,6)² | 

tf (figura) | 60 | min | escolhajanela da figura; cobre o instante em que h2 chega a 2,0 m | 

tf (verificação) | 300 | min | escolhatempo longo o bastante para os níveis se acomodarem | 

rtol, atol | 10⁻⁸, 10⁻¹⁰ | — | escolhaprecisão do integrador, suficiente para 4 casas decimais | 

Δt (figura) | 0,5 | min | escolha121 pontos de 0 a 60 min: resolução suficiente para a curva | 

[technique] 

[technique-name] Integração numérica

Os novos estados estacionários saem de uma conta direta, sem método numérico. A pergunta sobre o tempo é outra: pede a evolução dos dois níveis a partir do estado inicial, um problema de valor inicial com duas equações diferenciais. Para resolver esse tipo de problema, vamos usar a integração numérica, que avança os níveis em pequenos intervalos de tempo, chamados passos, e repete o cálculo até o instante desejado. Ela se encaixa aqui porque as raízes quadradas tornam as equações não lineares, sem solução com fórmula fechada. Em Python, a função que faz isso é solve_ivp, da biblioteca scipy. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Bibliotecas e dados do problema

[purpose] Trazer as ferramentas e registrar os dados, com as unidades nos comentários.

```
from scipy.integrate import solve_ivp # integrador de EDOs
import matplotlib.pyplot as plt # gráficos
import numpy as np # vetores de instantes

A1 = 2.0 # área do tanque 1, m²
A2 = 1.5 # área do tanque 2, m²
c1 = 0.8 # coeficiente da válvula, m^2.5/min
c2 = 0.6 # coeficiente da saída, m^2.5/min
F0 = 0.6 # alimentação antes de t = 0, m³/min
F1 = 0.9 # alimentação depois de t = 0, m³/min
```

[how] 

from ... import solve_ivp: pega uma função de dentro de uma biblioteca. Aqui, solve_ivp é o integrador, que calcula a evolução no tempo.

import ... as plt: carrega a biblioteca de gráficos e a chama pelo nome curto plt.

A1 = 2.0: guarda o valor da área, 2,0 m², com o nome A1. O # começa um comentário: o texto depois dele é só para leitura, e o Python ignora.

[so-far] Até aqui, o programa só guarda os dados. Nada é calculado.

[step] 

### Estados estacionários por uma conta direta

[purpose] Calcular os níveis em que as duas vazões se igualam, para as duas alimentações.

```
def estado_estacionario(F):
 """Níveis (h1, h2), em m, para a vazão F, em m³/min."""
 h2 = (F / c2) ** 2 # q2 = F, então c2·√h2 = F
 h1 = h2 + (F / c1) ** 2 # q1 = F, então c1·√(h1 − h2) = F
 return h1, h2

h_antes = estado_estacionario(F0)
h_depois = estado_estacionario(F1)
print(f"Estado inicial: h1 = {h_antes[0]:.4f} m, h2 = {h_antes[1]:.4f} m")
print(f"Novo estado estacionário: h1 = {h_depois[0]:.4f} m, "
 f"h2 = {h_depois[1]:.4f} m")
```

[how] 

def estado_estacionario(F): define uma função com nome e um valor de entrada, F. O que vem indentado é o corpo.

return h1, h2: devolve os dois níveis como um par, uma tupla.

h_antes[0]: o primeiro item da tupla, pois a contagem começa em 0. h_antes[1] é o segundo.

f"... {x:.4f} ...": texto com o valor de x inserido, com 4 casas decimais.

[so-far] O programa agora imprime os dois estados estacionários, o inicial e o novo.

[step] 

### Balanço dos dois tanques como função

[purpose] Escrever as derivadas dos níveis, que a integração precisa a cada instante.

```
def balanco(t, h, F):
 """Derivadas dh1/dt e dh2/dt, em m/min, no instante t."""
 h1, h2 = h # desempacota os dois níveis
 q1 = c1 * np.sqrt(h1 - h2) # vazão do tanque 1 ao tanque 2
 q2 = c2 * np.sqrt(h2) # vazão de saída do tanque 2
 dh1 = (F - q1) / A1 # balanço do tanque 1
 dh2 = (q1 - q2) / A2 # balanço do tanque 2
 return [dh1, dh2]
```

[how] Quem chama esta função é o solve_ivp, muitas vezes, a cada passo da integração. Ele passa três valores:

[how] 

t: o instante atual, em min.

h: os níveis naquele instante, como uma lista [h1, h2]. Mesmo com uma variável, o estado sempre chega como lista, por isso o acesso é feito por índice.

F: a alimentação. Ela não vem do solve_ivp diretamente, e sim do valor passado em args, no passo seguinte.

[how] h1, h2 = h é o desempacotamento: o primeiro item de h vai para h1, e o segundo, para h2. A função devolve as derivadas na mesma ordem: return [dh1, dh2]. np.sqrt é a raiz quadrada da biblioteca numpy. Os nomes A1, A2, c1 e c2 não são passados: a função os lê do topo do programa.

[so-far] A função agora descreve os dois balanços, mas ainda não calcula nada: só responde a uma pergunta, com as derivadas no instante dado.

[step] 

### Integração parando no nível de 2,0 m

[purpose] Avançar os níveis no tempo, a partir do estado antes do degrau, e parar quando o tanque 2 chegar a 2,0 m.

```
def h2_em_2(t, h, F):
 """Zero quando o tanque 2 chega a 2.0 m."""
 return h[1] - 2.0

h2_em_2.terminal = True # para a integração nesse ponto

sol = solve_ivp(balanco, (0, 300), h_antes, args=(F1,),
 events=h2_em_2, dense_output=True,
 rtol=1e-8, atol=1e-10)
```

[how] A integração avança em passos pequenos. A cada passo, o integrador calcula as derivadas, desloca os níveis um pouco e estima o erro cometido. A tolerância é o erro máximo aceito em cada passo: rtol é relativa e atol é absoluta. Números menores dão mais precisão e mais passos.

[how] solve_ivp recebe:

[how] 

balanco: a função das derivadas, escrita no passo 3.

(0, 300): o intervalo de tempo, do instante 0 até 300 min. Se um evento parar a integração antes, ela termina lá.

h_antes: o estado no instante zero, o estado estacionário antes do degrau.

args=(F1,): valores extras, passados a balanco e ao evento logo depois de t e h. A vírgula faz deste valor uma tupla de um item; sem ela, seria só o valor de F1, e o Python não o trataria como uma tupla.

events=h2_em_2: a função que avisa quando o tanque 2 chega a 2,0 m. Um evento é um instante em que essa função passa por zero.

dense_output=True: guarda uma forma de calcular os níveis em qualquer instante, não só nos passos.

rtol=1e-8, atol=1e-10: as tolerâncias. 1e-8 é 10 elevado a −8.

[so-far] O programa agora tem a solução completa dos dois níveis, do instante zero até o evento.

[step] 

### Resultados e verificação

[purpose] Ler os valores pedidos e conferir o resultado por um caminho independente, sem parar no evento.

```
h10 = sol.sol(10.0) # níveis em t = 10 min
t2 = sol.t_events[0][0] # instante do evento, em min
print(f"Em 10 min: h1 = {h10[0]:.4f} m, h2 = {h10[1]:.4f} m")
print(f"Tempo para h2 = 2.0 m: {t2:.2f} min")

# Verificação: sem evento, por 300 min; os níveis devem tender
# aos estados estacionários do passo 2.
longo = solve_ivp(balanco, (0, 300), h_antes, args=(F1,),
 dense_output=True, rtol=1e-8, atol=1e-10)
h60 = longo.sol(60.0)
print(f"Em 60 min: h2 = {h60[1]:.4f} m")
print(f"Após 300 min: h1 = {longo.y[0, -1]:.4f} m, "
 f"h2 = {longo.y[1, -1]:.4f} m")
```

[how] 

sol.sol(10.0): os níveis em 10 min, pela forma guardada por dense_output. O resultado é uma lista [h1, h2].

sol.t_events[0][0]: t_events é uma lista com uma entrada por evento; [0] pega o único evento, e o segundo [0] pega o primeiro instante em que ele ocorreu.

longo.y[0, -1]: y é uma tabela com duas linhas (h1 e h2) e uma coluna por instante. [0, -1] é a linha 0 (h1) e a última coluna, isto é, o último instante.

:.2f: duas casas decimais.

args=(F1,): o valor extra que chega a balanco, com a vírgula que faz a tupla de um item (como no passo 4).

rtol=1e-8: tolerância relativa do erro por passo do integrador (como no passo 4).

atol=1e-10: tolerância absoluta do erro por passo do integrador (como no passo 4).

[how] A verificação é independente da conta do passo 2. Ela integra os balanços por 300 min sem parar, e a solução numérica precisa acomodar-se no estado estacionário que a conta direta previu. Se os valores não batessem, o erro estaria no balanço ou no passo 2.

[so-far] Agora o programa imprime os três resultados pedidos e os níveis de conferência.

[step] 

### Figura dos níveis

[purpose] Desenhar os dois níveis nos primeiros 60 min, para ver a subida.

```
t = np.linspace(0, 60, 121) # de 0 a 60 min, a cada 0.5 min
h = longo.sol(t) # níveis nesses instantes
plt.plot(t, h[0], label="Nível do tanque 1")
plt.plot(t, h[1], label="Nível do tanque 2")
plt.xlabel("Tempo (min)")
plt.ylabel("Nível (m)")
plt.legend()
plt.grid(True)
plt.show()
```

[how] np.linspace(0, 60, 121) cria 121 instantes igualmente espaçados, de 0 a 60. plt.plot(t, h[0], label=...) desenha a linha dos valores de h1 contra o tempo; label é o nome que aparece na legenda. plt.xlabel e plt.ylabel escrevem os nomes dos eixos, com as unidades. plt.legend() mostra a legenda, e plt.show() abre a janela com o gráfico.

[so-far] O programa agora calcula, imprime e desenha tudo.

[step] 

### Programa completo

```
from scipy.integrate import solve_ivp # integrador de EDOs
import matplotlib.pyplot as plt # gráficos
import numpy as np # vetores de instantes

A1 = 2.0 # área do tanque 1, m²
A2 = 1.5 # área do tanque 2, m²
c1 = 0.8 # coeficiente da válvula, m^2.5/min
c2 = 0.6 # coeficiente da saída, m^2.5/min
F0 = 0.6 # alimentação antes de t = 0, m³/min
F1 = 0.9 # alimentação depois de t = 0, m³/min

def estado_estacionario(F):
 """Níveis (h1, h2), em m, para a vazão F, em m³/min."""
 h2 = (F / c2) ** 2 # q2 = F, então c2·√h2 = F
 h1 = h2 + (F / c1) ** 2 # q1 = F, então c1·√(h1 − h2) = F
 return h1, h2

h_antes = estado_estacionario(F0)
h_depois = estado_estacionario(F1)
print(f"Estado inicial: h1 = {h_antes[0]:.4f} m, h2 = {h_antes[1]:.4f} m")
print(f"Novo estado estacionário: h1 = {h_depois[0]:.4f} m, "
 f"h2 = {h_depois[1]:.4f} m")

def balanco(t, h, F):
 """Derivadas dh1/dt e dh2/dt, em m/min, no instante t."""
 h1, h2 = h # desempacota os dois níveis
 q1 = c1 * np.sqrt(h1 - h2) # vazão do tanque 1 ao tanque 2
 q2 = c2 * np.sqrt(h2) # vazão de saída do tanque 2
 dh1 = (F - q1) / A1 # balanço do tanque 1
 dh2 = (q1 - q2) / A2 # balanço do tanque 2
 return [dh1, dh2]

def h2_em_2(t, h, F):
 """Zero quando o tanque 2 chega a 2.0 m."""
 return h[1] - 2.0

h2_em_2.terminal = True # para a integração nesse ponto

sol = solve_ivp(balanco, (0, 300), h_antes, args=(F1,),
 events=h2_em_2, dense_output=True,
 rtol=1e-8, atol=1e-10)

h10 = sol.sol(10.0) # níveis em t = 10 min
t2 = sol.t_events[0][0] # instante do evento, em min
print(f"Em 10 min: h1 = {h10[0]:.4f} m, h2 = {h10[1]:.4f} m")
print(f"Tempo para h2 = 2.0 m: {t2:.2f} min")

# Verificação: sem evento, por 300 min; os níveis devem tender
# aos estados estacionários do passo 2.
longo = solve_ivp(balanco, (0, 300), h_antes, args=(F1,),
 dense_output=True, rtol=1e-8, atol=1e-10)
h60 = longo.sol(60.0)
print(f"Em 60 min: h2 = {h60[1]:.4f} m")
print(f"Após 300 min: h1 = {longo.y[0, -1]:.4f} m, "
 f"h2 = {longo.y[1, -1]:.4f} m")

t = np.linspace(0, 60, 121) # de 0 a 60 min, a cada 0.5 min
h = longo.sol(t) # níveis nesses instantes
plt.plot(t, h[0], label="Nível do tanque 1")
plt.plot(t, h[1], label="Nível do tanque 2")
plt.xlabel("Tempo (min)")
plt.ylabel("Nível (m)")
plt.legend()
plt.grid(True)
plt.show()
```

Os seis passos, colados em ordem, formam o programa completo, pronto para rodar no editor.

## Resultado

[answer] 

Novos estados estacionários: h1 = 3,5156 m e h2 = 2,2500 m (antes do degrau, 1,5625 m e 1,0000 m).

Nível do tanque 2 após 10 min: 1,4541 m.

Tempo para o tanque 2 chegar a 2,0 m: 33,33 min.

[figura; controles: A2] 

### Qual dos dois tanques responde primeiro?

Em 10 min, o nível do tanque 1 chegou a 2,4166 m e o nível do tanque 2 a 1,4541 m, saindo de 1,5625 m e 1,0000 m. A alimentação entra direto no tanque 1, então ele sobe antes; o tanque 2 só recebe o que passa pela válvula.

### O tanque 2 chega ao novo estado estacionário dentro dos 60 min da figura?

Não. Em 60 min, o nível do tanque 2 está em 2,1805 m, ainda abaixo de 2,2500 m. Após 300 min ele já está em 2,2500 m, o que confirma a conta direta do passo 2.

### Aumente a área do tanque 2 para 3,0 m²

Na figura, o nível do tanque 2 sobe mais devagar: a mesma vazão enche uma área maior. O estado estacionário não muda, porque ele depende só das vazões. Mude A2 = 1.5 para A2 = 3.0 no passo 1 e rode.

[in-your-code] O programa passa a imprimir Em 10 min: h1 = 2.3408 m, h2 = 1.3376 m e Tempo para h2 = 2.0 m: 43,89 min, no lugar de 33,33 min.

 Algo não ficou claro? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Engenharia química · Integração numérica de EDOs

# Dois tanques em série

[problem] 

Dois tanques cilíndricos estão ligados em série por uma válvula. O tanque 1, de área A1 = 2,0 m², recebe a alimentação qin e escoa para o tanque 2, de área A2 = 1,5 m², com vazão q1 = 0,8 √(h1 − h2). O tanque 2 descarrega com vazão q2 = 0,6 √h2. As vazões estão em m³/min e os níveis, h1 e h2, em m. O sistema está em estado estacionário com qin = 0,6 m³/min quando, em t = 0, a alimentação passa para 0,9 m³/min.

Os novos níveis de estado estacionário dos dois tanques (m).

O nível do tanque 2 após 10 min (m).

O tempo para o nível do tanque 2 chegar a 2,0 m (min).

Ao aumentar a alimentação, o tanque 1 enche primeiro; só depois o aumento da vazão pela válvula faz subir o tanque 2. No final da aula você terá um programa em Python que calcula os novos estados estacionários, acompanha os dois níveis no tempo e responde às três perguntas.

## Modelo

[eq-block] Vazão pela válvula: 

 ⟦q_1 = c_1 ⋅ √(h_1 − h_2 )⟧ 

q1 — vazão volumétrica do tanque 1 para o tanque 2, m³/min

c1 — coeficiente da válvula, 0,8 m1,5/min

h1 — nível de líquido no tanque 1, m

h2 — nível de líquido no tanque 2, m

Dado pelo enunciado. A vazão depende da diferença de níveis entre os dois tanques, que é o que empurra o líquido através da válvula.

[eq-block] Vazão de saída do tanque 2: 

 ⟦q_2 = c_2 ⋅ √(h_2 )⟧ 

q2 — vazão volumétrica de descarga do tanque 2, m³/min

c2 — coeficiente da saída, 0,6 m1,5/min

Dado pelo enunciado. Quanto mais alto o nível h2, maior a vazão de descarga.

### Balanço de massa do tanque 1, em volume de líquido (m³)

 ⟦acúmulo de massa de líquido = entra − sai⟧ 

(princípio) A massa não surge nem desaparece. O volume de controle é o líquido dentro do tanque 1: entra a alimentação e sai a vazão pela válvula.

 ⟦(d ( ρ ⋅ V_1 ))/(d t) {acúmulo} = ρ ⋅ q_in {entra} − ρ ⋅ q_1 {sai}⟧ 

ρ — densidade do líquido, kg/m³

V1 — volume de líquido no tanque 1, m³

qin — vazão volumétrica de alimentação do tanque 1, m³/min

(tradução) Cada palavra vira uma vazão de massa: densidade vezes vazão volumétrica.

 ⟦(d V_1 )/(d t) = q_in − q_1⟧ 

(hipótese) Densidade constante: ρ sai da derivada e se cancela. Se a densidade variasse (com a temperatura, por exemplo), o balanço teria de ser feito em massa e não em volume.

 ⟦V_1 = A_1 ⋅ h_1⟧ 

A1 — área da seção do tanque 1, m²

(definição) Tanque cilíndrico: volume é área da base vezes altura do líquido. Se a área variasse com a altura, A1 não sairia da derivada.

[final] 

 ⟦A_1 ⋅ (d h_1 )/(d t) {acúmulo no tanque 1} = q_in {alimentação} − c_1 ⋅ √(h_1 − h_2 ) {saída pela válvula}⟧ 

(álgebra) Substituímos V1 pela definição (com A1 constante) e q1 pela lei da válvula.

O nível do tanque 1 sobe enquanto a alimentação supera a vazão pela válvula e para de variar quando elas se igualam. Como a vazão pela válvula cresce com h1 − h2, o próprio aumento do nível freia o enchimento: o sistema se autorregula.

### Balanço de massa do tanque 2, em volume de líquido (m³)

 ⟦acúmulo de massa de líquido = entra − sai⟧ 

(princípio) O volume de controle agora é o líquido dentro do tanque 2: entra o que sai do tanque 1 pela válvula e sai a descarga.

 ⟦(d ( ρ ⋅ V_2 ))/(d t) {acúmulo} = ρ ⋅ q_1 {entra} − ρ ⋅ q_2 {sai}⟧ 

V2 — volume de líquido no tanque 2, m³

(tradução) Mesma tradução do tanque 1; a entrada é a vazão q1 da válvula.

[final] 

 ⟦A_2 ⋅ (d h_2 )/(d t) {acúmulo no tanque 2} = c_1 ⋅ √(h_1 − h_2 ) {entrada pela válvula} − c_2 ⋅ √(h_2 ) {descarga}⟧ 

(hipótese) (definição) (álgebra) Valem as mesmas hipóteses do tanque 1 (densidade constante, cilindro de área A2, em m²), a definição V2 = A2·h2 e as leis de vazão acima.

O tanque 2 só sobe quando a válvula entrega mais do que ele descarrega. Isso liga os dois balanços: h2 depende de h1 e, ao mesmo tempo, influencia a vazão do tanque 1. Em estado estacionário as derivadas são nulas e qin = q1 = q2; invertendo as duas leis de vazão, h2 = (qin/c2)² e h1 = h2 + (qin/c1)².

Parâmetro | Valor | Unidade | Fonte | 

A1 | 2,0 | m² | dado | 

A2 | 1,5 | m² | dado | 

c1 | 0,8 | m1,5/min | dado | 

c2 | 0,6 | m1,5/min | dado | 

qin antes de t = 0 | 0,6 | m³/min | dado | 

qin depois de t = 0 | 0,9 | m³/min | dado | 

Condição inicial (h1, h2) | 1,5625 e 1,0 | m | derivadoestado estacionário com qin = 0,6 m³/min | 

Instante pedido | 10 | min | dado | 

Nível pedido de h2 | 2,0 | m | dado | 

Horizonte da simulação | 120 | min | escolhabem além do cruzamento em 2,0 m e perto do novo estado | 

Tolerâncias relativa e absoluta | 1e-8 e 1e-10 | – e m | escolhaerro abaixo da 4ª casa decimal | 

[technique] 

[technique-name] Integração numérica

Os dois balanços formam um sistema de equações diferenciais ordinárias não lineares, com valor inicial conhecido: queremos saber como os níveis evoluem a partir do estado inicial, e a raiz quadrada impede uma solução em fórmula. Para resolver esse tipo de problema, usaremos a integração numérica: o computador avança no tempo em passos pequenos, usando a derivada de cada instante para estimar os níveis do instante seguinte. Ela serve aqui porque temos as derivadas e o estado inicial, e porque o integrador também localiza o instante em que um nível cruza um valor. Em Python, a função que faz isso é solve_ivp, da biblioteca scipy.integrate. Os estados estacionários saem de uma conta direta. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados e níveis de estado estacionário

[purpose] Guardar os dados do exercício em variáveis e calcular, com a fórmula direta, os níveis antes e depois da mudança da alimentação.

```
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# --- Dados do problema ---
A1 = 2.0 # área do tanque 1, m²
A2 = 1.5 # área do tanque 2, m²
c1 = 0.8 # coeficiente da válvula, m^1.5/min
c2 = 0.6 # coeficiente da saída, m^1.5/min
q_ini = 0.6 # alimentação inicial, m³/min
q_novo = 0.9 # alimentação a partir de t = 0, m³/min
t_pt = 10.0 # instante pedido para o nível h2, min
h2_alvo = 2.0 # nível de h2 cujo tempo se quer, m
t_fim = 120.0 # horizonte da simulação, min

def estacionario(q):
 # níveis (h1, h2) em estado estacionário, para a alimentação q
 h2 = (q / c2) ** 2 # q2 = q -> h2, m
 h1 = h2 + (q / c1) ** 2 # q1 = q -> h1, m
 return h1, h2

h1_0, h2_0 = estacionario(q_ini)
h1_f, h2_f = estacionario(q_novo)
dif_0 = h1_0 - h2_0
dif_f = h1_f - h2_f
print(f"Estado inicial: h1 = {h1_0:.4f} m, h2 = {h2_0:.4f} m")
print(f"Novo estado: h1 = {h1_f:.4f} m, h2 = {h2_f:.4f} m")
print(f"Diferença h1 - h2: {dif_0:.4f} m -> {dif_f:.4f} m")
```

[how] import traz bibliotecas: numpy (cálculo numérico, apelido np), solve_ivp (integrador de equações diferenciais, de scipy.integrate) e matplotlib.pyplot (gráficos, apelido plt). Uma linha como A1 = 2.0 cria uma variável, um nome que guarda um valor; tudo depois de # é comentário e o Python ignora. O separador decimal é o ponto e ** é a potência: (q / c2) ** 2 é (q/c2)². def estacionario(q): define uma função: ela recebe q e devolve, com return, o par h1, h2 (uma tupla, dois valores juntos). Na chamada h1_0, h2_0 = estacionario(q_ini) acontece o desempacotamento: o primeiro valor vai para h1_0 e o segundo para h2_0. Em print(f"..."), o f permite colocar variáveis entre chaves dentro do texto, e :.4f escreve o número com 4 casas decimais.

[so-far] O programa conhece os dados, calcula os dois estados estacionários e imprime os níveis iniciais e finais.

[step] 

### Função do balanço dos dois tanques

[purpose] Escrever em Python as duas equações diferenciais do modelo, no formato que o integrador exige.

```
def balanco(t, h, q_in):
 h1, h2 = h # níveis, m
 q1 = c1 * np.sqrt(max(h1 - h2, 0.0)) # válvula, m³/min
 q2 = c2 * np.sqrt(max(h2, 0.0)) # saída, m³/min
 dh1 = (q_in - q1) / A1 # dh1/dt, m/min
 dh2 = (q1 - q2) / A2 # dh2/dt, m/min
 return [dh1, dh2]
```

[how] A função balanco será chamada pelo integrador muitas vezes, cada uma com um instante e um estado. Ela recebe três argumentos, nesta ordem: t, o tempo em min (não aparece nas equações, mas o integrador sempre o envia); h, o estado, uma lista com os dois níveis [h1, h2] (mesmo com uma só variável, o estado chegaria como lista); e q_in, a alimentação, um valor extra. A linha h1, h2 = h separa a lista em duas variáveis. np.sqrt é a raiz quadrada; max(x, 0.0) devolve o maior entre x e 0, o que evita a raiz de um número negativo minúsculo causado por erro numérico. O return devolve a lista [dh1, dh2] com as duas derivadas, na mesma ordem do estado: é com ela que o integrador dá o próximo passo.

[so-far] Dados um instante, os níveis e a alimentação, o programa calcula as vazões q1 e q2 e a rapidez com que h1 e h2 variam.

[step] 

### Evento: o nível do tanque 2 cruza um valor

[purpose] Ensinar o integrador a avisar quando h2 atinge o valor pedido, sem procurar o cruzamento à mão.

```
def atinge_alvo(t, h, q_in):
 return h[1] - h2_alvo # zero quando h2 = h2_alvo

atinge_alvo.direction = 1 # só conta h2 subindo
```

[how] Um evento é uma função que o integrador avalia a cada passo, com a mesma assinatura (t, h, q_in) da função do balanço. Ele registra o instante exato em que o valor devolvido passa por zero; aqui, h[1] - h2_alvo é zero quando h2 vale o alvo (h[1] é o segundo elemento da lista: o Python conta a partir de 0). Em Python uma função também é um objeto e aceita atributos: atinge_alvo.direction = 1 cola nela uma anotação que manda o integrador contar só os cruzamentos em que o valor sobe, isto é, h2 subindo.

[so-far] O programa tem o modelo e um detector do instante em que o nível do tanque 2 chega ao alvo.

[step] 

### Integração no tempo

[purpose] Calcular como os dois níveis evoluem a partir do estado inicial e ler o que o exercício pede.

```
sol = solve_ivp(balanco, (0, t_fim), [h1_0, h2_0],
 args=(q_novo,), events=atinge_alvo,
 dense_output=True, rtol=1e-8, atol=1e-10)

h1_10, h2_10 = sol.sol(t_pt) # níveis em t = 10 min, m
t_alvo = sol.t_events[0][0] # instante em que h2 = 2,0 m, min
print(f"Após {t_pt:.0f} min: h1 = {h1_10:.4f} m, h2 = {h2_10:.4f} m")
print(f"h2 chega a {h2_alvo:.1f} m em t = {t_alvo:.2f} min")
```

[how] solve_ivp parte do estado inicial e avança no tempo em passos pequenos, escolhidos por ele, estimando cada ponto novo a partir da derivada. Seus argumentos:

[how] 

balanco: a função das derivadas. Quem a chama é o próprio solve_ivp, dezenas de vezes: em cada chamada, t é o instante testado, h é a lista com os níveis estimados naquele instante, e o resultado [dh1, dh2] é usado para calcular o ponto seguinte.

(0, t_fim): o intervalo de tempo, de 0 a 120 min.

[h1_0, h2_0]: o estado em t = 0, os níveis do estado estacionário antigo.

args=(q_novo,): os valores extras repassados a balanco (e a atinge_alvo) em toda chamada, depois de t e h. É uma tupla; a vírgula em (q_novo,) é o que a torna uma tupla de um elemento, e não um número entre parênteses.

events=atinge_alvo: a função de evento da etapa anterior.

dense_output=True: guarda uma solução contínua, que permite perguntar o nível em qualquer instante, como 10 min.

rtol=1e-8, atol=1e-10: a tolerância, isto é, o erro que o integrador aceita em cada passo, relativo (1e-8 é 10−8) e absoluto (em m). Ele reduz o passo até respeitar as duas; valores tão pequenos deixam o erro muito abaixo da quarta casa decimal impressa.

[how] O resultado sol é um objeto: sol.sol(t_pt) devolve os dois níveis em 10 min, desempacotados em duas variáveis, e sol.t_events[0] é a lista dos instantes do primeiro (e único) evento; o [0] final pega o primeiro deles. As letras em {t_pt:.0f} e {t_alvo:.2f} pedem 0 e 2 casas decimais.

[so-far] O programa integra o sistema por 120 min e imprime os níveis em 10 min e o instante em que h2 chega a 2,0 m.

[step] 

### Verificação independente

[purpose] Conferir o integrador por um caminho que não usa o evento nem o ponto de 10 min: com tempo suficiente, os níveis devem parar nos valores da fórmula direta.

```
longa = solve_ivp(balanco, (0, 1000), [h1_0, h2_0],
 args=(q_novo,), rtol=1e-8, atol=1e-10)
h1_L, h2_L = longa.y[:, -1] # níveis em t = 1000 min, m
print(f"Integração até 1000 min: h1 = {h1_L:.4f} m, h2 = {h2_L:.4f} m")
```

[how] É a mesma integração, sem evento e até 1000 min, tempo muito maior que o de acomodação do sistema; args=(q_novo,) repassa a alimentação nova a balanco (a vírgula faz dela uma tupla de um elemento) e rtol=1e-8, atol=1e-10 são as mesmas tolerâncias, relativa e absoluta (em m), da etapa anterior. longa.y é uma tabela com uma linha por nível e uma coluna por instante; [:, -1] pega todas as linhas (:) da última coluna (-1), o último instante. Esses valores devem coincidir, nas quatro casas, com os da fórmula direta da primeira etapa: uma integração de equações diferenciais e uma conta algébrica independentes chegando ao mesmo estado dão confiança nas duas.

[so-far] O programa imprime os níveis após 1000 min, que devem ser iguais ao novo estado estacionário.

[step] 

### Gráfico dos níveis

[purpose] Ver os dois níveis evoluírem até o novo estado e onde h2 cruza o alvo.

```
t = np.linspace(0, t_fim, 300) # instantes do gráfico, min
h1_t, h2_t = sol.sol(t) # níveis nesses instantes, m

plt.plot(t, h1_t, label="nível do tanque 1, h1")
plt.plot(t, h2_t, label="nível do tanque 2, h2")
plt.axhline(h2_alvo, color="gray", linestyle="--", label="h2 = 2,0 m")
plt.xlabel("Tempo (min)")
plt.ylabel("Nível (m)")
plt.legend()
plt.grid(True)
plt.show()
```

[how] np.linspace(0, t_fim, 300) gera 300 instantes igualmente espaçados entre 0 e 120 min. sol.sol(t) devolve os níveis em todos eles de uma vez: uma linha para h1 e outra para h2, desempacotadas. plt.plot(x, y, label=...) desenha uma curva e dá a ela um nome na legenda; plt.axhline(y, color=, linestyle=) traça uma linha horizontal na altura y, aqui cinza (color="gray") e tracejada ("--"). xlabel e ylabel nomeiam os eixos, com unidade; legend() mostra a legenda, grid(True) liga a grade e plt.show() exibe a figura.

[so-far] O programa calcula, verifica e desenha o resultado.

[step] 

### Programa completo

```
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# --- Dados do problema ---
A1 = 2.0 # área do tanque 1, m²
A2 = 1.5 # área do tanque 2, m²
c1 = 0.8 # coeficiente da válvula, m^1.5/min
c2 = 0.6 # coeficiente da saída, m^1.5/min
q_ini = 0.6 # alimentação inicial, m³/min
q_novo = 0.9 # alimentação a partir de t = 0, m³/min
t_pt = 10.0 # instante pedido para o nível h2, min
h2_alvo = 2.0 # nível de h2 cujo tempo se quer, m
t_fim = 120.0 # horizonte da simulação, min

def estacionario(q):
 # níveis (h1, h2) em estado estacionário, para a alimentação q
 h2 = (q / c2) ** 2 # q2 = q -> h2, m
 h1 = h2 + (q / c1) ** 2 # q1 = q -> h1, m
 return h1, h2

h1_0, h2_0 = estacionario(q_ini)
h1_f, h2_f = estacionario(q_novo)
dif_0 = h1_0 - h2_0
dif_f = h1_f - h2_f
print(f"Estado inicial: h1 = {h1_0:.4f} m, h2 = {h2_0:.4f} m")
print(f"Novo estado: h1 = {h1_f:.4f} m, h2 = {h2_f:.4f} m")
print(f"Diferença h1 - h2: {dif_0:.4f} m -> {dif_f:.4f} m")

def balanco(t, h, q_in):
 h1, h2 = h # níveis, m
 q1 = c1 * np.sqrt(max(h1 - h2, 0.0)) # válvula, m³/min
 q2 = c2 * np.sqrt(max(h2, 0.0)) # saída, m³/min
 dh1 = (q_in - q1) / A1 # dh1/dt, m/min
 dh2 = (q1 - q2) / A2 # dh2/dt, m/min
 return [dh1, dh2]

def atinge_alvo(t, h, q_in):
 return h[1] - h2_alvo # zero quando h2 = h2_alvo

atinge_alvo.direction = 1 # só conta h2 subindo

sol = solve_ivp(balanco, (0, t_fim), [h1_0, h2_0],
 args=(q_novo,), events=atinge_alvo,
 dense_output=True, rtol=1e-8, atol=1e-10)

h1_10, h2_10 = sol.sol(t_pt) # níveis em t = 10 min, m
t_alvo = sol.t_events[0][0] # instante em que h2 = 2,0 m, min
print(f"Após {t_pt:.0f} min: h1 = {h1_10:.4f} m, h2 = {h2_10:.4f} m")
print(f"h2 chega a {h2_alvo:.1f} m em t = {t_alvo:.2f} min")

longa = solve_ivp(balanco, (0, 1000), [h1_0, h2_0],
 args=(q_novo,), rtol=1e-8, atol=1e-10)
h1_L, h2_L = longa.y[:, -1] # níveis em t = 1000 min, m
print(f"Integração até 1000 min: h1 = {h1_L:.4f} m, h2 = {h2_L:.4f} m")

t = np.linspace(0, t_fim, 300) # instantes do gráfico, min
h1_t, h2_t = sol.sol(t) # níveis nesses instantes, m

plt.plot(t, h1_t, label="nível do tanque 1, h1")
plt.plot(t, h2_t, label="nível do tanque 2, h2")
plt.axhline(h2_alvo, color="gray", linestyle="--", label="h2 = 2,0 m")
plt.xlabel("Tempo (min)")
plt.ylabel("Nível (m)")
plt.legend()
plt.grid(True)
plt.show()
```

As etapas juntas, em ordem, prontas para rodar.

## Resultado

[answer] 

Novos níveis de estado estacionário: h1 = 3,5156 m e h2 = 2,2500 m. Após 10 min, o nível do tanque 2 é h2 = 1,4541 m. O nível do tanque 2 chega a 2,0 m em t = 33,33 min.

[figura; controles: qf] 

### Por que o nível do tanque 2 demora a reagir?

Em t = 0 as vazões q1 e q2 ainda valem 0,6 m³/min cada, então o nível do tanque 2 começa praticamente parado, enquanto o nível do tanque 1 já sobe. Só quando h1 − h2 aumenta a válvula entrega mais. Em 10 min, o tanque 1 está em 2,4166 m e o tanque 2 em apenas 1,4541 m.

### O nível do tanque 2 chega a 2,25 m?

Ele se aproxima do novo estado sem nunca o alcançar de fato, e desacelera à medida que chega perto. Quando passa por 2,0 m, em 33,33 min, ainda falta 2,25 − 2,00 = 0,25 m. Por isso o programa integra até 1000 min na verificação: só assim o nível do tanque 2 imprime 2,2500 m.

### O que acontece com a diferença entre os níveis?

A diferença h1 − h2 é o que empurra a vazão pela válvula, e precisa subir de 0,5625 m para 1,2656 m para a válvula passar de 0,6 a 0,9 m³/min. Por isso o nível do tanque 1 sobe mais que o do tanque 2: de 1,5625 a 3,5156 m, contra de 1,0 a 2,25 m.

### Leve a alimentação nova a 1,2 m³/min

Com mais vazão, os dois níveis sobem mais e mais rápido: o nível do tanque 2 cruza 2,0 m bem antes, em 11,22 min, e os estados finais passam para 6,2500 m e 4,0000 m.

[in-your-code] No programa, troque q_novo = 0.9 por q_novo = 1.2: ele imprime Novo estado: h1 = 6.2500 m, h2 = 4.0000 m e h2 chega a 2.0 m em t = 11.22 min.

 Alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
