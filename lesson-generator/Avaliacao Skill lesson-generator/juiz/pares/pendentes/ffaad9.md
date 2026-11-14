# Comparação ffaad9

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/ffaad9.json`.

# Enunciado enviado ao modelo

A reação em fase gasosa A → 2 B, de primeira ordem (−r'A = k C_A, com k = 1,0·10⁻³ m³/(kg de catalisador·s)), ocorre num reator de leito fixo isotérmico a 500 K. A alimentação é A puro, a 10 bar, com 5,0 mol/s (gás ideal, R = 8,314 J/(mol·K)). A perda de carga segue dy/dW = −α (1 + εX)/(2y), com y = P/P0, ε a variação relativa do número de mols na conversão completa e α = 0,005 kg⁻¹. Calcule a massa de catalisador para 80% de conversão (kg), a pressão na saída do leito (bar) e a massa de catalisador que seria necessária sem perda de carga (kg).


==================== LIÇÃO 1 ====================

Reatores catalíticos · sistema de EDOs com evento

# Leito fixo com perda de carga

[problem] 

A reação em fase gasosa A → 2 B, de primeira ordem, com −r'A = k·CA e k = 1,0·10⁻³ m³/(kg de catalisador·s), ocorre num reator de leito fixo isotérmico a T = 500 K. A alimentação é A puro, a P0 = 10 bar, com FA0 = 5,0 mol/s; o gás é ideal, com R = 8,314 J/(mol·K). A perda de carga segue dy/dW = −α(1 + εX)/(2y), com y = P/P0, ε a variação relativa do número de mols na conversão completa e α = 0,005 kg⁻¹.

A massa de catalisador para 80% de conversão, em kg.

A pressão na saída do leito, em bar.

A massa de catalisador que seria necessária sem perda de carga, em kg.

O gás atravessa o catalisador, reage e perde pressão por atrito; como cada mol de A vira dois de B, o gás se expande e a pressão cai cada vez mais depressa. Menos pressão quer dizer gás mais diluído e reação mais lenta, e por isso o leito real precisa de mais catalisador. No fim, você terá um programa que integra conversão e pressão ao longo do leito, para quando a conversão chega a 80% e compara com o leito ideal, sem perda de carga.

## Modelo

### Balanço de massa do componente A, em mols

 ⟦A que entra na fatia − A que sai da fatia − A consumido na fatia = 0⟧ 

(princípio) A não aparece nem some sem motivo, e o reator opera em regime permanente, sem acúmulo. O volume de controle é uma fatia fina do leito, que contém uma massa dW de catalisador.

 ⟦F_A |_W {entra} − F_A |_W + d W {sai} − ( − r_A^(′) ) ⋅ d W {consumido na fatia} = 0⟧ 

FA — vazão molar de A que atravessa a seção do leito na posição considerada, mol/s

W — massa de catalisador percorrida desde a entrada do leito, kg

−r'A — velocidade de consumo de A por massa de catalisador, mol/(kg·s)

(tradução) Cada palavra vira uma vazão de A, em mol/s. Dividindo por dW e fazendo a fatia tender a zero, a diferença entre entrada e saída vira a derivada: dFA/dW = r'A.

 ⟦F_A = F_A 0 ( 1 − X ) ⇒ F_A 0 (d X)/(d W) = − r_A^(′)⟧ 

X — conversão de A, a fração do A alimentado que já reagiu até a posição W, adimensional

FA0 — vazão molar de A na alimentação, mol/s

(definição) Escrever o balanço em conversão deixa a meta do enunciado, X = 0,80, diretamente na variável que o programa integra.

 ⟦− r_A^(′) = k ⋅ C_A⟧ 

k — constante de velocidade por massa de catalisador, m³/(kg·s)

CA — concentração de A no gás, na posição W, mol/m³

(cinética) Primeira ordem, como diz o enunciado.

 ⟦C_A = C_A 0 (1 − X)/(1 + ε X) {A consumido e gás expandido} ⋅ y {pressão mais baixa} C_A 0 = (P_0 )/(R T)⟧ 

CA0 — concentração de A na alimentação, mol/m³

ε — variação relativa do número de mols do gás quando a conversão é completa, adimensional

y — pressão relativa, a pressão P na posição W dividida pela pressão de entrada P0, adimensional

(hipótese) Gás ideal e leito isotérmico: CA = FA/v, e a vazão volumétrica v cresce com os mols (fator 1 + εX) e com a queda de pressão (fator 1/y). Se o leito não fosse isotérmico, entraria ainda o fator T0/T, e seria preciso um balanço de energia para saber T ao longo do leito.

 ⟦ε = y_A 0 ⋅ δ = 1 ⋅ ( 2 − 1 ) = 1⟧ 

yA0 — fração molar de A na alimentação; A puro, então vale 1

δ — mols de gás ganhos por mol de A que reage: 2 de B menos 1 de A

(definição) Com conversão completa, cada mol alimentado vira dois: o número de mols dobra, e ε = 1. Não confunda yA0, uma fração molar, com a pressão relativa y.

[final] 

 ⟦(d X)/(d W) {avanço da conversão} = (k C_A 0 )/(F_A 0 ) {escala da reação} ⋅ (1 − X)/(1 + ε X) {A restante, diluído} ⋅ y {efeito da pressão}⟧ 

(álgebra) Substituir a cinética e a concentração no balanço e dividir por FA0.

A equação diz quanto a conversão avança por quilograma de catalisador. O avanço diminui por dois motivos que o leito ideal também tem (A sendo consumido e o gás se expandindo) e por um terceiro, só do leito real: o fator y, menor que 1, que dilui o gás. Como y muda ao longo do leito, essa equação não pode ser resolvida sozinha: precisa andar junto com a da perda de carga.

[eq-block] Perda de carga no leito: 

 ⟦(d y)/(d W) = − (α ( 1 + ε X ))/(2 y)⟧ 

α — parâmetro de perda de carga, que reúne o atrito do gás com as partículas e a geometria do leito, kg⁻¹

É a equação de Ergun reescrita em termos de y e W, dada pelo enunciado. A pressão cai mais depressa quando há mais gás passando (fator 1 + εX) e quando a pressão já está baixa (fator 1/y), porque gás menos denso escoa mais rápido e atrita mais.

[eq-block] Solução analítica sem perda de carga: 

 ⟦W_sem = (F_A 0 )/(k C_A 0 ) [ ( 1 + ε ) ln (1)/(1 − X) − ε X ]⟧ 

Wsem — massa de catalisador para atingir a conversão X se a pressão não caísse, kg

Com α = 0, y fica igual a 1 e o balanço de A tem variáveis separáveis: basta integrar (1 + εX)/(1 − X) dX de 0 até 0,80. É essa fórmula que responde à terceira pergunta.

Parâmetro | Valor | Unidade | Fonte | 

k | 1,0·10⁻³ | m³/(kg·s) | enunciado | 

T | 500 | K | enunciado | 

P0 | 10 | bar | enunciado | 

FA0 | 5,0 | mol/s | enunciado | 

α | 0,005 | kg⁻¹ | enunciado | 

X na saída | 0,80 | — | enunciado | 

R | 8,314 | J/(mol·K) | constante | 

CA0 | 240,56 | mol/m³ | calculadoP0/(RT), com 10 bar = 10·10⁵ Pa | 

ε | 1 | — | calculado1·(2 − 1) | 

limite de integração | 200 | kg | escolhabem além do necessário; o evento para antes | 

leito da figura | 70 | kg | escolhapassa da massa com perda de carga | 

tolerância relativa | 10⁻⁸ | — | escolhaerro muito menor que o 0,1 kg impresso | 

[technique] 

[technique-name] Integração numérica com evento

O problema é um sistema de duas equações diferenciais acopladas, X e y ao longo de W, com valores conhecidos na entrada e o comprimento do leito como incógnita. Para resolver esse tipo de problema, vamos usar a integração numérica com evento: o computador avança pelo leito em pequenos passos e para no ponto exato em que X chega a 0,80. Ela serve aqui porque o acoplamento com a pressão impede uma fórmula fechada, mas as derivadas são fáceis de calcular em qualquer ponto. Em Python, a função que faz isso é solve_ivp, da biblioteca SciPy. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados do problema e grandezas derivadas

[purpose] Reunir no início do programa todos os dados, com unidades, e calcular as duas grandezas que o modelo usa e o enunciado não dá diretamente: CA0 e ε.

```
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# Dados do enunciado
k = 1.0e-3 # constante de velocidade, m³/(kg·s)
T = 500.0 # temperatura do leito, K
P0 = 10.0 # pressão na entrada, bar
FA0 = 5.0 # vazão molar de A na entrada, mol/s
R = 8.314 # constante dos gases, J/(mol·K)
alfa = 0.005 # parâmetro de perda de carga, 1/kg
X_meta = 0.80 # conversão desejada

# Grandezas derivadas
CA0 = P0 * 1e5 / (R * T) # concentração de A na entrada, mol/m³
eps = 1.0 * (2 - 1) # yA0 · (2 − 1): A puro, 1 mol vira 2
print(f"CA0 = {CA0:.2f} mol/m³ eps = {eps:.0f}")
```

[how] import traz bibliotecas para o programa: numpy (apelidada np) para contas com vetores e funções como o logaritmo, solve_ivp da SciPy para integrar as equações, e matplotlib.pyplot (apelidada plt) para o gráfico. Cada linha nome = valor guarda um número numa variável; o que vem depois de # é comentário, ignorado pelo Python. 1.0e-3 é a notação científica 1,0·10⁻³, e P0 * 1e5 converte bar em Pa, para que CA0 saia em mol/m³ com R em J/(mol·K). O print(f"...") mostra um texto em que cada {…} é trocado pelo valor da variável; :.2f significa "com duas casas decimais" e :.0f, "sem casas decimais".

[so-far] O programa tem os dados e imprime CA0 = 240,56 mol/m³ e ε = 1.

[step] 

### Modelo escrito como função

[purpose] Traduzir as duas equações do modelo, o balanço de A e a perda de carga, numa função que recebe a posição no leito e o estado do gás e devolve as duas derivadas.

```
def leito(W, z, alfa):
 X, y = z # conversão e P/P0
 CA = CA0 * (1 - X) / (1 + eps * X) * y # mol/m³
 dXdW = k * CA / FA0 # 1/kg
 dydW = -alfa * (1 + eps * X) / (2 * y) # 1/kg
 return [dXdW, dydW]
```

[how] def cria uma função: um bloco de código com nome, que recebe valores entre parênteses e devolve um resultado com return. As linhas recuadas são o corpo da função. Ela recebe a massa percorrida W, em kg; o estado z, uma lista com os dois valores [X, y]; e o parâmetro alfa, que fica como argumento para que possamos usar a mesma função com α = 0,005 e com α = 0. A linha X, y = z é um desempacotamento: separa a lista em duas variáveis com nomes legíveis, o primeiro elemento em X e o segundo em y. As três linhas seguintes são as equações do modelo, na mesma ordem: concentração, balanço de A e perda de carga. A função devolve a lista das derivadas, na mesma ordem do estado. W não aparece nas contas, porque nenhum dado muda ao longo do leito, mas precisa estar lá: solve_ivp sempre chama a função com a posição primeiro e o estado depois.

[so-far] O programa sabe calcular, em qualquer ponto do leito, quanto a conversão e a pressão relativa mudam por quilograma de catalisador; ainda não integra nada.

[step] 

### Evento que encerra o leito na conversão desejada

[purpose] A massa do leito é a incógnita: em vez de escolher onde parar, pedimos ao integrador que pare sozinho onde X chega a 0,80.

```
def atinge_meta(W, z, alfa):
 return z[0] - X_meta # zero quando X = 0,80
atinge_meta.terminal = True
```

[how] Um evento é uma função que o integrador vigia: ela recebe os mesmos argumentos que leito e devolve um número; quando esse número troca de sinal entre dois passos, o integrador localiza com precisão o ponto em que ele vale zero. Aqui o número é X − 0,80: negativo no início, zero na meta. z[0] é o primeiro elemento da lista do estado, a conversão (em Python a contagem começa em 0; z[1] seria y). A linha atinge_meta.terminal = True pendura na função um atributo, uma informação extra que solve_ivp lê: True quer dizer "quando este evento acontecer, pare a integração". Sem ela, o integrador anotaria o ponto e seguiria até o fim do intervalo.

[so-far] O programa tem o modelo e o critério de parada; falta integrar.

[step] 

### Integração do leito real

[purpose] Integrar as duas equações desde a entrada até o evento e ler, no ponto de parada, a massa de catalisador e a pressão.

```
sol = solve_ivp(leito, [0, 200], [0.0, 1.0], args=(alfa,),
 events=atinge_meta, rtol=1e-8, atol=1e-10)
W_pc = sol.t_events[0][0] # kg
y_saida = sol.y_events[0][0][1] # P/P0 na saída
print(f"Massa com perda de carga: {W_pc:.1f} kg")
print(f"Pressão na saída: {y_saida * P0:.2f} bar "
 f"(y = {y_saida:.3f})")
```

[how] solve_ivp parte do estado inicial e avança em passos. A cada passo, chama leito várias vezes, centenas no total, sempre com um valor de W, a lista atual [X, y] em z e o valor de alfa; com as derivadas devolvidas, estima o estado no fim do passo. Os argumentos:

[how] 

leito — a função do modelo, passada sem parênteses: entregamos a função em si, para que solve_ivp a chame quantas vezes precisar.

[0, 200] — o intervalo de W, em kg: começa na entrada e vai, no máximo, até 200 kg, bem além do necessário; o evento interrompe antes.

[0.0, 1.0] — o estado na entrada: X = 0 (nada reagiu) e y = 1 (pressão igual a P0), na mesma ordem em que leito desempacota z.

args=(alfa,) — valores extras que solve_ivp acrescenta, depois de W e z, em cada chamada de leito e de atinge_meta: é por esse caminho que alfa chega lá dentro. Os parênteses formam uma tupla, uma sequência fixa de valores; a vírgula é obrigatória, porque (alfa) sem ela seria só um número entre parênteses.

events=atinge_meta — a função de evento do passo anterior.

rtol=1e-8 e atol=1e-10 — as tolerâncias relativa e absoluta: o integrador estima o erro de cada passo e encurta o passo até esse erro ficar abaixo de 10⁻⁸ do valor (ou de 10⁻¹⁰ em termos absolutos). Esse é o critério de precisão: com erro dessa ordem, o resultado impresso com uma casa decimal, em kg, não muda; a verificação do próximo passo confirma isso.

[how] O resultado sol é um objeto com vários campos. sol.t_events é uma lista com uma entrada por evento; [0] pega a do nosso único evento, e o segundo [0], a primeira vez que ele ocorreu: é a massa W em que X = 0,80. sol.y_events[0][0] é o estado nesse ponto, [X, y], e o [1] final pega y. Multiplicar por P0 dá a pressão em bar. Duas strings seguidas, entre parênteses, são juntadas pelo Python numa só: assim a linha longa fica dividida em duas.

[so-far] O programa imprime a massa de catalisador para 80% de conversão e a pressão na saída do leito real.

[step] 

### Leito sem perda de carga e verificação

[purpose] Responder à terceira pergunta com a fórmula analítica, conferir o integrador contra ela e medir o efeito da perda de carga.

```
# Sem perda de carga (y = 1): solução analítica
W_sem = FA0 / (k * CA0) * ((1 + eps) * np.log(1 / (1 - X_meta))
 - eps * X_meta)
print(f"Massa sem perda de carga (fórmula): {W_sem:.1f} kg")

# Verificação: o mesmo integrador com alfa = 0
chk = solve_ivp(leito, [0, 200], [0.0, 1.0], args=(0.0,),
 events=atinge_meta, rtol=1e-8, atol=1e-10)
print(f"Massa sem perda de carga (integrada): "
 f"{chk.t_events[0][0]:.1f} kg")
print(f"Catalisador a mais pela perda de carga: "
 f"{(W_pc / W_sem - 1) * 100:.1f} %")

# Leito real com só W_sem de catalisador
curto = solve_ivp(leito, [0, W_sem], [0.0, 1.0], args=(alfa,),
 rtol=1e-8, atol=1e-10)
print(f"Conversão do leito real com {W_sem:.1f} kg: "
 f"{curto.y[0][-1]:.3f}")
```

[how] np.log é o logaritmo natural, ln. A fórmula ocupa duas linhas porque está dentro de parênteses abertos: o Python só considera a instrução terminada quando eles se fecham. A verificação chama solve_ivp com os mesmos argumentos do passo anterior (events=atinge_meta para parar em 0,80, rtol=1e-8 e atol=1e-10 com o mesmo critério de precisão), mudando só args=(0.0,): em cada chamada, leito recebe alfa = 0, a pressão não cai e o problema vira exatamente o da fórmula. As duas contas são independentes, uma integra passo a passo e a outra usa a integral exata, e se concordam, o integrador, o evento e as tolerâncias estão funcionando. A última integração não tem events=; mantém rtol e atol: vai de 0 até W_sem e devolve o perfil inteiro em curto.y, uma tabela com uma linha por variável; curto.y[0] é a linha da conversão e [-1], índice negativo, pega o último elemento, a saída do leito.

[so-far] O programa imprime a massa sem perda de carga pelos dois caminhos, quanto catalisador a perda de carga acrescenta e a conversão que o leito real teria com a massa do leito ideal.

[step] 

### Perfis ao longo do leito e figura

[purpose] Calcular X e y em pontos igualmente espaçados até 70 kg, com e sem perda de carga, e desenhar os perfis.

```
# Perfis ao longo do leito, até 70 kg
W = np.linspace(0, 70, 201)
com = solve_ivp(leito, [0, 70], [0.0, 1.0], args=(alfa,),
 t_eval=W, rtol=1e-8, atol=1e-10)
sem = solve_ivp(leito, [0, 70], [0.0, 1.0], args=(0.0,),
 t_eval=W, rtol=1e-8, atol=1e-10)

fig, ax = plt.subplots()
ax.plot(W, com.y[0], label="Conversão com perda de carga")
ax.plot(W, sem.y[0], label="Conversão sem perda de carga")
ax.set_xlabel("Massa de catalisador percorrida (kg)")
ax.set_ylabel("Conversão de A")
ax2 = ax.twinx()
ax2.plot(W, com.y[1], "g--", label="Pressão relativa y")
ax2.set_ylabel("Pressão relativa y = P/P0")
ax.legend(loc="center right")
ax2.legend(loc="lower right")
plt.show()
```

[how] 

np.linspace(0, 70, 201) cria 201 valores igualmente espaçados de 0 a 70 kg, um a cada 0,35 kg.

t_eval=W pede a solve_ivp que devolva o estado exatamente nesses pontos, para desenhar curvas suaves; os passos internos continuam escolhidos pelas tolerâncias rtol=1e-8 e atol=1e-10, as mesmas de antes. Sem events=, a integração vai até os 70 kg.

args=(alfa,) leva α = 0,005 a cada chamada de leito no leito real; args=(0.0,) leva α = 0 no leito ideal.

plt.subplots() devolve dois objetos, a figura e o eixo, desempacotados em fig, ax; ax.plot(x, y, label=…) desenha uma curva com o nome que vai para a legenda.

ax.twinx() cria um segundo eixo vertical, à direita, que compartilha o eixo horizontal: a conversão e a pressão relativa têm escalas diferentes. "g--" pede linha verde tracejada.

legend(loc=…) põe a legenda de cada eixo num canto, e plt.show() abre a janela com o gráfico.

[so-far] O programa está completo: imprime todas as respostas e mostra os perfis de conversão e pressão ao longo do leito.

[step] 

### Programa completo

```
import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt

# Dados do enunciado
k = 1.0e-3 # constante de velocidade, m³/(kg·s)
T = 500.0 # temperatura do leito, K
P0 = 10.0 # pressão na entrada, bar
FA0 = 5.0 # vazão molar de A na entrada, mol/s
R = 8.314 # constante dos gases, J/(mol·K)
alfa = 0.005 # parâmetro de perda de carga, 1/kg
X_meta = 0.80 # conversão desejada

# Grandezas derivadas
CA0 = P0 * 1e5 / (R * T) # concentração de A na entrada, mol/m³
eps = 1.0 * (2 - 1) # yA0 · (2 − 1): A puro, 1 mol vira 2
print(f"CA0 = {CA0:.2f} mol/m³ eps = {eps:.0f}")

def leito(W, z, alfa):
 X, y = z # conversão e P/P0
 CA = CA0 * (1 - X) / (1 + eps * X) * y # mol/m³
 dXdW = k * CA / FA0 # 1/kg
 dydW = -alfa * (1 + eps * X) / (2 * y) # 1/kg
 return [dXdW, dydW]

def atinge_meta(W, z, alfa):
 return z[0] - X_meta # zero quando X = 0,80
atinge_meta.terminal = True

sol = solve_ivp(leito, [0, 200], [0.0, 1.0], args=(alfa,),
 events=atinge_meta, rtol=1e-8, atol=1e-10)
W_pc = sol.t_events[0][0] # kg
y_saida = sol.y_events[0][0][1] # P/P0 na saída
print(f"Massa com perda de carga: {W_pc:.1f} kg")
print(f"Pressão na saída: {y_saida * P0:.2f} bar "
 f"(y = {y_saida:.3f})")

# Sem perda de carga (y = 1): solução analítica
W_sem = FA0 / (k * CA0) * ((1 + eps) * np.log(1 / (1 - X_meta))
 - eps * X_meta)
print(f"Massa sem perda de carga (fórmula): {W_sem:.1f} kg")

# Verificação: o mesmo integrador com alfa = 0
chk = solve_ivp(leito, [0, 200], [0.0, 1.0], args=(0.0,),
 events=atinge_meta, rtol=1e-8, atol=1e-10)
print(f"Massa sem perda de carga (integrada): "
 f"{chk.t_events[0][0]:.1f} kg")
print(f"Catalisador a mais pela perda de carga: "
 f"{(W_pc / W_sem - 1) * 100:.1f} %")

# Leito real com só W_sem de catalisador
curto = solve_ivp(leito, [0, W_sem], [0.0, 1.0], args=(alfa,),
 rtol=1e-8, atol=1e-10)
print(f"Conversão do leito real com {W_sem:.1f} kg: "
 f"{curto.y[0][-1]:.3f}")

# Perfis ao longo do leito, até 70 kg
W = np.linspace(0, 70, 201)
com = solve_ivp(leito, [0, 70], [0.0, 1.0], args=(alfa,),
 t_eval=W, rtol=1e-8, atol=1e-10)
sem = solve_ivp(leito, [0, 70], [0.0, 1.0], args=(0.0,),
 t_eval=W, rtol=1e-8, atol=1e-10)

fig, ax = plt.subplots()
ax.plot(W, com.y[0], label="Conversão com perda de carga")
ax.plot(W, sem.y[0], label="Conversão sem perda de carga")
ax.set_xlabel("Massa de catalisador percorrida (kg)")
ax.set_ylabel("Conversão de A")
ax2 = ax.twinx()
ax2.plot(W, com.y[1], "g--", label="Pressão relativa y")
ax2.set_ylabel("Pressão relativa y = P/P0")
ax.legend(loc="center right")
ax2.legend(loc="lower right")
plt.show()
```

Os seis passos juntos, na ordem, prontos para rodar.

## Resultado

[answer] 

Massa de catalisador para conversão X = 0,80: 56,5 kg. Pressão na saída do leito: 7,49 bar (y = 0,749). Massa de catalisador sem perda de carga: 50,3 kg.

[figura; controles: alfa] 

### O que a perda de carga custa em conversão?

As duas curvas de conversão saem juntas e se afastam ao longo do leito. Com os 50,3 kg do leito ideal, a conversão sem perda de carga chega a 0,80, mas a conversão com perda de carga fica em 0,773: a pressão menor dilui o gás, CA cai e a reação anda mais devagar. Para chegar a 0,80, o leito real precisa de 56,5 kg, 12,4% a mais de catalisador.

### Quanto de pressão se perde até a saída?

A pressão relativa y termina em 0,749 nos 56,5 kg: o gás entra a 10 bar e sai a 7,49 bar, uma perda de 10 − 7,49 = 2,51 bar, cerca de um quarto da pressão de entrada.

### Por que a pressão relativa cai cada vez mais depressa?

A curva da pressão relativa y se curva para baixo, em vez de cair em linha reta. Os dois fatores da equação de perda de carga crescem ao longo do leito: 1 + εX vai de 1 na entrada a 1 + 0,80 = 1,8 na saída, porque a reação dobra os mols de gás, e 1/y aumenta à medida que a pressão cai. Mais gás, e menos denso, escoa mais rápido e atrita mais.

### Leve α a 0,008 kg⁻¹

Um leito com partículas menores ou mais compacto tem α maior. A pressão relativa y despenca e a conversão com perda de carga se afasta muito mais da conversão sem perda de carga, que não depende de α. A conversão 0,80 ainda é alcançada, mas só perto do fim do leito da figura, com a pressão na saída abaixo da metade da de entrada.

[in-your-code] No programa, troque alfa = 0.005 por alfa = 0.008. Ele passa a imprimir Massa com perda de carga: 65.5 kg, Pressão na saída: 4.17 bar (y = 0.417) e Catalisador a mais pela perda de carga: 30.3 %; a massa sem perda de carga continua 50,3 kg.

 Ficou alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Engenharia das reações · EDOs com valor inicial

# Reator de leito fixo com perda de carga

[problem] 

A reação em fase gasosa A → 2 B, de primeira ordem, com taxa −r′A = k·CA e k = 1,0·10⁻³ m³/(kg de catalisador·s), ocorre num reator de leito fixo isotérmico a T = 500 K. A alimentação é A puro, a P0 = 10 bar, com vazão molar FA0 = 5,0 mol/s. O gás é ideal, com R = 8,314 J/(mol·K). A pressão relativa y = P/P0 cai ao longo do leito segundo dy/dW = −α·(1 + εX)/(2y), em que W é a massa de catalisador percorrida, X é a conversão de A, ε é a variação relativa do número de mols na conversão completa e α = 0,005 kg⁻¹.

Qual a massa de catalisador necessária para a conversão de 80% (kg)?

Qual a pressão na saída do leito (bar)?

Qual seria a massa de catalisador necessária sem perda de carga (kg)?

O gás entra no leito a 10 bar e, ao reagir, produz mais mols do que consome: o escoamento acelera e a pressão cai mais depressa, o que por sua vez deixa A mais diluído e a reação mais lenta. Ao final da lição você terá um programa em Python que resolve esse acoplamento, responde às três perguntas e desenha a conversão e a pressão ao longo do leito.

## Modelo

### Balanço de massa do componente A, em mols

 ⟦acúmulo de A = entra − sai − consumo⟧ 

(princípio) O A não surge nem desaparece sem motivo. O volume de controle é uma fatia fina do leito, que contém uma massa ΔW de catalisador.

 ⟦(d N_A )/(d t) {acúmulo de A na fatia} = F_A ( W ) {entra} − F_A ( W + ΔW ) {sai} − ( − r_A^(′) ) ⋅ ΔW {consumo na fatia}⟧ 

NA — quantidade de A contida na fatia, mol

FA — vazão molar de A que atravessa a seção do leito, mol/s

W — massa de catalisador percorrida desde a entrada do leito, kg

ΔW — massa de catalisador da fatia, kg

−r′A — velocidade de consumo de A por massa de catalisador, mol/(kg·s)

(tradução) Cada palavra vira uma vazão molar de A: entra pela face de massa W e sai pela face de massa W + ΔW; o consumo é a velocidade por kg vezes os kg da fatia.

 ⟦(d N_A )/(d t) = 0⟧ 

(hipótese) Regime permanente: nada muda com o tempo em cada ponto do leito. Se o leito estivesse em partida, o acúmulo não seria nulo e as variáveis dependeriam também do tempo, o que exigiria equações com derivadas parciais.

 ⟦(d F_A )/(d W) = − ( − r_A^(′) )⟧ 

(álgebra) Dividindo tudo por ΔW e fazendo ΔW → 0, a diferença entre a vazão que sai e a que entra, por kg, vira a derivada de FA.

 ⟦(d X)/(d W) = (( − r_A^(′) ))/(F_A 0 )⟧ 

X — conversão de A, fração de A alimentado que já reagiu, adimensional

FA0 — vazão molar de A na entrada do leito, mol/s

(definição) (álgebra) A conversão é definida por FA = FA0(1 − X); portanto dFA = −FA0 dX, e a equação anterior passa a ter X como incógnita.

 ⟦( − r_A^(′) ) = k ⋅ C_A⟧ 

k — constante cinética de primeira ordem, m³/(kg de catalisador·s)

CA — concentração de A no gás, no ponto considerado do leito, mol/m³

(cinética) Primeira ordem em A, como o enunciado informa.

 ⟦F_T = F_T 0 ( 1 + ε X )⟧ 

 ⟦ε = y_A0 ⋅ δ = 1 ⋅ ( 2 − 1 ) = 1⟧ 

FT, FT0 — vazão molar total de gás em um ponto do leito e na entrada, mol/s

ε — variação relativa do número de mols entre conversão nula e completa, adimensional

yA0 — fração molar de A na entrada, adimensional (1, pois a alimentação é A puro)

δ — mols produzidos menos mols consumidos por mol de A que reage: 2 − 1 = 1, adimensional

(definição) Cada mol de A que reage dá dois de B, então o total cresce de 1 mol por mol de A convertido. Com X = 1 o total dobra: ε = 1.

 ⟦v = v_0 ⋅ (1 + ε X)/(y)⟧ 

v, v0 — vazão volumétrica do gás num ponto do leito e na entrada, m³/s

y — pressão relativa, P/P0, adimensional

(hipótese) Gás ideal e isotérmico: v = FTRT/P e v0 = FT0RT/P0; dividindo uma pela outra, R e T se cancelam. Se o gás fosse real ou a temperatura variasse, um fator de compressibilidade e a razão de temperaturas apareceriam nesta equação. A vazão volumétrica cresce com a conversão (mais mols) e com a queda de pressão (o gás expande).

 ⟦C_A = (F_A )/(v) = C_A 0 ⋅ (1 − X)/(1 + ε X) ⋅ y⟧ 

CA0 — concentração de A na entrada, FA0/v0 = P0/(RT), mol/m³

(álgebra) A concentração é a vazão molar de A dividida pela vazão volumétrica; substituímos FA = FA0(1 − X) e a expressão de v.

[final] 

 ⟦(d X)/(d W) {ganho de conversão por kg} = (k)/(v_0 ) {velocidade específica na entrada} ⋅ (1 − X)/(1 + ε X) {A restante, diluído pela expansão} ⋅ y {efeito da pressão}⟧ 

(álgebra) Substituição da concentração na cinética e desta na equação de X; FA0 e CA0 se juntam em v0 = FA0/CA0.

A equação diz quanta conversão cada kg de catalisador acrescenta. A reação desacelera por dois motivos: o A vai acabando (fator 1 − X) e o gás se expande ao reagir (1 + εX no denominador). Além disso, tudo é multiplicado por y: se a pressão cai, a concentração e a velocidade caem junto. Como y também depende de X, as duas equações precisam ser resolvidas ao mesmo tempo.

[eq-block] Perda de carga no leito: 

 ⟦(d y)/(d W) {queda de pressão relativa por kg} = − α {resistência do leito} ⋅ (1 + ε X)/(2 y) {gás acelerado}⟧ 

y — pressão relativa no leito, P/P0, adimensional (vale 1 na entrada)

α — parâmetro de perda de carga do leito, kg⁻¹

Esta equação é dada pelo enunciado e não é deduzida aqui. A pressão cai porque o gás sofre atrito com as partículas, e cai mais depressa quando o gás escoa mais rápido, isto é, quando X é maior ou y é menor. Multiplicando por 2y, obtém-se d(y²)/dW = −α(1 + εX), forma que usaremos na verificação.

Parâmetro | Valor | Unidade | Origem | 

k | 1,0·10⁻³ | m³/(kg·s) | enunciado | 

T | 500 | K | enunciado | 

P0 | 10,0·10⁵ | Pa | enunciado 10 bar = 10·10⁵ Pa | 

FA0 | 5,0 | mol/s | enunciado | 

R | 8,314 | J/(mol·K) | constante | 

α | 0,005 | kg⁻¹ | enunciado | 

X desejada | 0,8 | — | enunciado 80% | 

ε | 1 | — | derivado 1·(2 − 1) = 1 | 

CA0 | 240,6 | mol/m³ | derivado P0/(RT) | 

v0 | 0,02079 | m³/s | derivado FA0/CA0 | 

k/v0 | 0,04811 | kg⁻¹ | derivado k dividido por v0 | 

massa final da integração | 200 | kg | escolha bem acima da resposta; a integração para antes, na conversão-alvo | 

tolerâncias relativa e absoluta | 1e-8 e 1e-10 | — | escolha muito mais finas que os 3 algarismos que serão impressos | 

[technique] 

[technique-name] Integração numérica

As incógnitas X e y variam ao longo do leito, cada uma com sua derivada em relação a W e dependendo da outra, com valores conhecidos na entrada: é um sistema de equações diferenciais com valor inicial. Para resolver esse tipo de problema, vamos usar a integração numérica, em que o computador avança de pouco em pouco na massa de catalisador, escolhendo o tamanho de cada passo para manter o erro pequeno. Ela serve aqui porque as equações são acopladas e não têm solução analítica conjunta; sem perda de carga (α = 0), porém, há fórmula fechada, que será a resposta da terceira pergunta, com o integrador como verificação. Em Python, a função que faz isso é solve_ivp, da biblioteca scipy.integrate. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados e grandezas derivadas

[purpose] Guardar em variáveis os dados do enunciado, com unidades coerentes (SI), e calcular a concentração e a vazão volumétrica na entrada.

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# Dados do enunciado
k = 1.0e-3 # constante cinética, m3/(kg cat.s)
T = 500.0 # temperatura, K
P0 = 10.0e5 # pressão de entrada (10 bar), Pa
FA0 = 5.0 # vazão molar de A na entrada, mol/s
R = 8.314 # constante dos gases, J/(mol.K)
alfa = 0.005 # parâmetro da perda de carga, 1/kg
X_alvo = 0.8 # conversão desejada, adimensional

# Variação do número de mols (A -> 2 B, alimentação A pura)
yA0 = 1.0 # fração molar de A na entrada
eps = yA0 * (2 - 1) # adimensional

# Grandezas derivadas
CA0 = P0 / (R * T) # concentração de A na entrada, mol/m3
v0 = FA0 / CA0 # vazão volumétrica na entrada, m3/s
kv = k / v0 # k dividido por v0, 1/kg
print(f"CA0 = {CA0:.1f} mol/m3, v0 = {v0:.5f} m3/s")
print(f"k/v0 = {kv:.5f} 1/kg, eps = {eps:.0f}")
```

[how] import numpy as np carrega a biblioteca de cálculo numérico e dá a ela o apelido np; from scipy.integrate import solve_ivp traz só a função de integração. Uma linha começada por # é comentário: o Python a ignora. 1.0e-3 é notação científica (1,0·10⁻³). Em código o separador decimal é sempre o ponto. A pressão foi convertida de bar para Pa (1 bar = 10⁵ Pa), para ficar coerente com R em J/(mol·K). Em f"...", o que está entre chaves é calculado e inserido no texto; depois dos dois-pontos vem o formato: .1f é um decimal, .5f são cinco, .0f nenhum.

[so-far] O programa conhece todos os dados e imprime CA0, v0, k/v0 e eps.

[step] 

### Função com as equações do modelo

[purpose] Escrever as duas derivadas, dX/dW e dy/dW, numa função que o integrador possa chamar.

```
def balancos(W, estado, kv, alfa, eps):
 X, y = estado # desempacota a lista
 dXdW = kv * (1 - X) / (1 + eps * X) * y
 dydW = -alfa * (1 + eps * X) / (2 * y)
 return [dXdW, dydW]
```

[how] def define uma função: balancos é o nome, e o que está entre parênteses são os valores que ela recebe. O integrador a chamará muitas vezes, cada vez com a massa atual em W, com os valores atuais de X e y em estado e com os três valores extras kv, alfa e eps, que ele repassa sem alterar. estado chega sempre como uma lista, mesmo que tivesse um só elemento; X, y = estado a desempacota: o primeiro elemento vai para X e o segundo para y. O return devolve uma lista com as duas derivadas, na mesma ordem do estado. O integrador usa essas derivadas para decidir o próximo passo. Note que W não aparece nas contas: as equações só dependem de X e y, mas o integrador sempre manda W primeiro.

[so-far] O modelo está programado, mas nada foi calculado ainda.

[step] 

### Integração até a conversão-alvo

[purpose] Integrar a partir da entrada do leito e parar exatamente quando X chegar a 0,8; a massa nesse instante e a pressão ali são as respostas das duas primeiras perguntas.

```
def atingiu_alvo(W, estado, kv, alfa, eps):
 return estado[0] - X_alvo # zero quando X = X_alvo

atingiu_alvo.terminal = True # encerra a integração ali
atingiu_alvo.direction = 1 # só com X crescendo

sol = solve_ivp(
 balancos, [0, 200], [0.0, 1.0],
 args=(kv, alfa, eps), events=atingiu_alvo,
 dense_output=True, rtol=1e-8, atol=1e-10,
)
W80 = sol.t_events[0][0] # massa de catalisador, kg
y_saida = sol.y_events[0][0][1] # pressão relativa na saída
P_saida = y_saida * P0 / 1e5 # pressão na saída, bar

print(f"Massa para X = {X_alvo:.0%}: {W80:.1f} kg")
print(f"Pressão na saída: {P_saida:.2f} bar")
```

[how] Não sabemos de antemão quantos kg bastam, então usamos um evento: uma função que vale zero no ponto procurado. atingiu_alvo recebe os mesmos argumentos de balancos e devolve estado[0] - X_alvo, em que estado[0] é X (índice 0 = primeiro elemento). O integrador observa quando esse valor troca de sinal. Funções em Python aceitam atributos: .terminal = True manda encerrar a integração no evento e .direction = 1 só aceita o cruzamento com valor crescente.

[how] 

balancos — a função das derivadas, passada sem parênteses: entregamos a função em si, e o integrador a chama.

[0, 200] — massas inicial e final da integração, kg; 200 kg é mais que o necessário, e o evento encerra antes.

[0.0, 1.0] — valores iniciais, na mesma ordem do estado: X = 0 e y = 1 na entrada.

args=(kv, alfa, eps) — tupla com os valores extras enviados, a cada chamada, a balancos e a atingiu_alvo; a vírgula final é parte da sintaxe de tupla, aqui já há três elementos.

events=atingiu_alvo — a função de evento.

dense_output=True — guarda uma função interpoladora, sol.sol, para calcular X e y em qualquer massa depois (usada nas verificações e no gráfico).

rtol=1e-8, atol=1e-10 — tolerâncias: o erro admitido em cada passo é, no máximo, 10⁻⁸ vezes o valor da variável mais 10⁻¹⁰ em valor absoluto.

[how] sol.t_events é uma lista com um vetor por evento; [0] escolhe o primeiro (e único) evento e o segundo [0] a primeira ocorrência: a massa onde X = 0,8. No print, {X_alvo:.0%} escreve 0,8 como porcentagem (80%), e .1f e .2f escrevem um e dois decimais. De modo análogo, sol.y_events[0][0] é a lista [X, y] naquele ponto, e o índice [1] pega y. Multiplicar y por P0 dá a pressão em Pa, e dividir por 10⁵ converte para bar. Precisão: as tolerâncias foram escolhidas muito menores que a precisão pedida; um critério prático é apertá-las (por exemplo, para 1e-10 e 1e-12) e ver se os algarismos impressos mudam. Aqui não mudam.

[so-far] O programa imprime a massa de catalisador para 80% de conversão e a pressão de saída.

[step] 

### Caso sem perda de carga

[purpose] Calcular a massa necessária se a pressão fosse constante, para a terceira pergunta.

```
# Sem perda de carga (alfa = 0): solução analítica
W_sem = ((1 + eps) * np.log(1 / (1 - X_alvo))
 - eps * X_alvo) / kv # kg
print(f"Massa sem perda de carga: {W_sem:.1f} kg")
```

[how] Sem perda de carga, α = 0 e y = 1, e a equação fica dX/dW = (k/v0)(1 − X)/(1 + εX). Separando variáveis, (1 + εX)/(1 − X) = (1 + ε)/(1 − X) − ε, cuja integral de 0 a X é (1 + ε) ln[1/(1 − X)] − εX; igualando a (k/v0)W, obtém-se a fórmula do código. np.log é o logaritmo natural. A expressão foi quebrada em duas linhas: dentro de parênteses o Python aceita isso.

[so-far] O programa imprime também a massa sem perda de carga, por fórmula fechada.

[step] 

### Verificações independentes

[purpose] Confirmar os resultados por caminhos que não repetem o cálculo anterior.

```
# Verificação 1: o integrador, com alfa = 0, reproduz a fórmula
sol0 = solve_ivp(
 balancos, [0, 200], [0.0, 1.0],
 args=(kv, 0.0, eps), events=atingiu_alvo,
 rtol=1e-8, atol=1e-10,
)
print(f"Verificação, sem perda de carga: "
 f"{sol0.t_events[0][0]:.1f} kg")

# Verificação 2: y^2 = 1 - alfa * integral de (1 + eps*X) dW
Wg = np.linspace(0, W80, 2001) # malha de massas, kg
Xg, yg = sol.sol(Wg) # perfis ao longo do leito
f = 1 + eps * Xg
integral = np.sum((f[1:] + f[:-1]) / 2 * np.diff(Wg)) # kg
P_check = np.sqrt(1 - alfa * integral) * P0 / 1e5 # bar
print(f"Verificação da pressão de saída: {P_check:.2f} bar")
```

[how] A verificação 1 roda o mesmo integrador com 0.0 no lugar de alfa: o resultado numérico deve igualar a fórmula fechada. A verificação 2 usa outra forma da equação de pressão: multiplicando dy/dW por 2y, obtém-se d(y²)/dW = −α(1 + εX), logo y² = 1 − α·∫(1 + εX) dW. A integral é calculada à parte, pela regra dos trapézios, sobre o perfil de X, sem usar o y que o integrador encontrou. np.linspace(0, W80, 2001) cria 2001 massas igualmente espaçadas de 0 a W80; sol.sol(Wg) devolve X e y em todas elas, como duas linhas de uma matriz, desempacotadas em Xg e yg. f[1:] são os valores a partir do segundo, f[:-1] todos menos o último; somados e divididos por 2 dão a média de cada trecho, e np.diff(Wg) dá a largura de cada trecho. Na chamada de solve_ivp, args, events, rtol e atol têm o mesmo papel do passo anterior; só args=(kv, 0.0, eps) troca alfa por zero (e sem dense_output, pois aqui só interessa o evento). np.sum soma as áreas, e np.sqrt é a raiz quadrada.

[so-far] As duas verificações coincidem com as respostas: 50,3 kg e 7,49 bar.

[step] 

### Gráfico ao longo do leito

[purpose] Desenhar X e y em função da massa de catalisador.

```
plt.plot(Wg, Xg, label="Conversão X")
plt.plot(Wg, yg, label="Pressão relativa y")
plt.axvline(W_sem, color="gray", linestyle="--",
 label="W sem perda de carga")
plt.xlabel("Massa de catalisador W (kg)")
plt.ylabel("X e y (adimensionais)")
plt.legend()
plt.grid(True)
plt.show()
```

[how] plt.plot(x, y, label=...) traça uma curva, e label é o nome que aparece na legenda. plt.axvline(W_sem, ...) traça uma reta vertical em W_sem, com color="gray" e linestyle="--" (tracejada). plt.xlabel e plt.ylabel nomeiam os eixos, com unidades; plt.legend() mostra a legenda; plt.grid(True) liga a grade; plt.show() abre a figura.

[so-far] O programa calcula, verifica e desenha o perfil até a conversão de 80%.

[step] 

### Programa completo

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# Dados do enunciado
k = 1.0e-3 # constante cinética, m3/(kg cat.s)
T = 500.0 # temperatura, K
P0 = 10.0e5 # pressão de entrada (10 bar), Pa
FA0 = 5.0 # vazão molar de A na entrada, mol/s
R = 8.314 # constante dos gases, J/(mol.K)
alfa = 0.005 # parâmetro da perda de carga, 1/kg
X_alvo = 0.8 # conversão desejada, adimensional

# Variação do número de mols (A -> 2 B, alimentação A pura)
yA0 = 1.0 # fração molar de A na entrada
eps = yA0 * (2 - 1) # adimensional

# Grandezas derivadas
CA0 = P0 / (R * T) # concentração de A na entrada, mol/m3
v0 = FA0 / CA0 # vazão volumétrica na entrada, m3/s
kv = k / v0 # k dividido por v0, 1/kg
print(f"CA0 = {CA0:.1f} mol/m3, v0 = {v0:.5f} m3/s")
print(f"k/v0 = {kv:.5f} 1/kg, eps = {eps:.0f}")

def balancos(W, estado, kv, alfa, eps):
 X, y = estado # desempacota a lista
 dXdW = kv * (1 - X) / (1 + eps * X) * y
 dydW = -alfa * (1 + eps * X) / (2 * y)
 return [dXdW, dydW]

def atingiu_alvo(W, estado, kv, alfa, eps):
 return estado[0] - X_alvo # zero quando X = X_alvo

atingiu_alvo.terminal = True # encerra a integração ali
atingiu_alvo.direction = 1 # só com X crescendo

sol = solve_ivp(
 balancos, [0, 200], [0.0, 1.0],
 args=(kv, alfa, eps), events=atingiu_alvo,
 dense_output=True, rtol=1e-8, atol=1e-10,
)
W80 = sol.t_events[0][0] # massa de catalisador, kg
y_saida = sol.y_events[0][0][1] # pressão relativa na saída
P_saida = y_saida * P0 / 1e5 # pressão na saída, bar

print(f"Massa para X = {X_alvo:.0%}: {W80:.1f} kg")
print(f"Pressão na saída: {P_saida:.2f} bar")

# Sem perda de carga (alfa = 0): solução analítica
W_sem = ((1 + eps) * np.log(1 / (1 - X_alvo))
 - eps * X_alvo) / kv # kg
print(f"Massa sem perda de carga: {W_sem:.1f} kg")

# Verificação 1: o integrador, com alfa = 0, reproduz a fórmula
sol0 = solve_ivp(
 balancos, [0, 200], [0.0, 1.0],
 args=(kv, 0.0, eps), events=atingiu_alvo,
 rtol=1e-8, atol=1e-10,
)
print(f"Verificação, sem perda de carga: "
 f"{sol0.t_events[0][0]:.1f} kg")

# Verificação 2: y^2 = 1 - alfa * integral de (1 + eps*X) dW
Wg = np.linspace(0, W80, 2001) # malha de massas, kg
Xg, yg = sol.sol(Wg) # perfis ao longo do leito
f = 1 + eps * Xg
integral = np.sum((f[1:] + f[:-1]) / 2 * np.diff(Wg)) # kg
P_check = np.sqrt(1 - alfa * integral) * P0 / 1e5 # bar
print(f"Verificação da pressão de saída: {P_check:.2f} bar")

plt.plot(Wg, Xg, label="Conversão X")
plt.plot(Wg, yg, label="Pressão relativa y")
plt.axvline(W_sem, color="gray", linestyle="--",
 label="W sem perda de carga")
plt.xlabel("Massa de catalisador W (kg)")
plt.ylabel("X e y (adimensionais)")
plt.legend()
plt.grid(True)
plt.show()
```

Os passos juntos, em ordem, prontos para rodar.

## Resultado

[answer] 

Massa de catalisador para 80% de conversão: 56,5 kg. Pressão na saída do leito: 7,49 bar. Massa de catalisador sem perda de carga: 50,3 kg.

[figura; controles: k, alfa] 

### Quanto catalisador a perda de carga custa?

Sem perda de carga bastam 50,3 kg para chegar a X = 0,8; com ela são necessários 56,5 kg, ou seja, 56,5 − 50,3 = 6,2 kg a mais. No caminho, a pressão cai de 10 bar para 7,49 bar, a concentração de A diminui na mesma proporção e cada kg de catalisador rende menos conversão.

### Por que a pressão cai cada vez mais depressa?

Em dy/dW = −α(1 + εX)/(2y), o numerador cresce com X, pois o gás produz mais mols e escoa mais rápido: com X = 0,8 ele vale 1 + 1·0,8 = 1,8, contra 1 na entrada. O denominador diminui junto com y. Resultado: a pressão vai de 10 bar a 7,49 bar, uma queda de 10 − 7,49 = 2,51 bar, e a curva de y se inclina mais perto da saída.

### Por que a conversão desacelera ao longo do leito?

A curva de X sobe com inclinação cada vez menor. Em dX/dW, o fator (1 − X)/(1 + εX) cai de 1 na entrada para (1 − 0,8)/(1 + 1·0,8) em X = 0,8: há menos A para reagir e ele está mais diluído pela expansão. A queda de y agrava o efeito.

### Reduza α e depois leve-o a zero

Com α = 2,5·10⁻³ kg⁻¹ (metade do valor original), a pressão de saída sobe para 8,92 bar e a massa necessária cai para 52,9 kg. Com α = 0, a curva de y fica reta em 1 e a massa chega a 50,3 kg, a resposta da terceira pergunta.

[in-your-code] No passo 1, troque para alfa = 0.0025: o programa imprime 52.9 kg e 8.92 bar. Com alfa = 0.0, imprime 50.3 kg e 10.00 bar (e a verificação 2 também dá 10.00 bar).

### Dobre k para 2,0·10⁻³ m³/(kg·s)

A massa necessária cai para 26,4 kg, metade dos 52,9 kg do caso anterior, e a pressão de saída é 8,92 bar, a mesma de α reduzido à metade. Não é coincidência: X e y dependem de k/v0 e de α apenas pela razão entre eles; dobrar k equivale a reduzir α à metade, e o leito, mais curto, perde menos pressão.

[in-your-code] No passo 1, troque para k = 2.0e-3: o programa imprime 26.4 kg e 8.92 bar.

 Algo não ficou claro? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
