# Comparação ef3fa7

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/ef3fa7.json`.

# Enunciado enviado ao modelo

Uma coluna de recheio absorve um soluto de uma corrente gasosa com um solvente puro, em contracorrente. Em razões molares (mol de soluto por mol de inerte), o gás entra com Y = 0,080 e deve sair com Y = 0,008. A razão entre as vazões molares de solvente e de gás inerte é L/G = 2,2, e o equilíbrio é Y* = 1,5 X + 12 X². A altura de uma unidade de transferência global do gás é H_OG = 0,60 m. Calcule a razão molar do soluto no líquido de saída, a razão L/G mínima, o número de unidades de transferência N_OG = ∫ dY/(Y − Y*) e a altura de recheio (m).


==================== LIÇÃO 1 ====================

Operações unitárias · integral em forma fechada

# Absorção em coluna de recheio

[problem] 

Uma coluna de recheio absorve um soluto de uma corrente gasosa com um solvente puro, em contracorrente. As composições são razões molares (mol de soluto por mol de inerte). O gás entra no fundo com Y1 = 0,080 e deve sair no topo com Y2 = 0,008; o solvente entra puro no topo, X2 = 0. A razão entre as vazões molares de solvente e de gás inerte é L/G = 2,2. O equilíbrio é Y* = 1,5 X + 12 X², e a altura de uma unidade de transferência global do gás é HOG = 0,60 m.

A razão molar do soluto no líquido de saída, X1.

A razão L/G mínima.

O número de unidades de transferência NOG = ∫ dY/(Y − Y*).

A altura de recheio Z, em m.

O gás sobe pelo recheio e cede soluto ao líquido que desce; em cada altura, o que empurra a transferência é a distância entre a composição do gás e a de equilíbrio com o líquido daquela seção. Ao final, você terá um programa que traça a linha de operação, encontra a L/G mínima, calcula NOG por uma fórmula fechada, confere o valor com uma integração numérica e dá a altura de recheio.

## Modelo

### Balanço de massa do soluto, em mols

 ⟦soluto que entra = soluto que sai⟧ 

(princípio) Em regime permanente o soluto não se acumula: tudo o que entra sai. O volume de controle é a parte de cima da coluna, do topo até uma seção qualquer da altura.

 ⟦G ⋅ Y {gás que sobe pela seção} + L ⋅ X_2 {solvente no topo} = G ⋅ Y_2 {gás que sai no topo} + L ⋅ X {líquido que desce pela seção}⟧ 

G — vazão molar de gás inerte (sem o soluto), mol/s

L — vazão molar de solvente (sem o soluto), mol/s

Y — razão molar do soluto no gás na seção considerada, mol de soluto/mol de gás inerte

X — razão molar do soluto no líquido na mesma seção, mol de soluto/mol de solvente

Y2, X2 — razões molares do gás que sai e do líquido que entra, ambos no topo

(tradução) Cada vazão de soluto é a vazão do inerte vezes a razão molar: mol de inerte/s × mol de soluto/mol de inerte = mol de soluto/s.

 ⟦G , L = constantes ao longo da coluna⟧ 

(hipótese) O gás inerte não se dissolve e o solvente não evapora; só o soluto passa de uma fase para a outra. É por isso que se usam razões molares: com elas as vazões de referência não mudam. Se o inerte se dissolvesse, G e L variariam com a altura e a linha de operação deixaria de ser reta.

 ⟦X_2 = 0⟧ 

(hipótese) O solvente entra puro, como diz o enunciado. Com solvente reciclado, ainda com soluto, a linha começaria em X2 > 0 e a força motriz no topo seria menor.

[final] 

 ⟦Y = Y_2 {topo} + (L)/(G) ( X − X_2 ) {soluto ganho pelo líquido}⟧ 

(álgebra) Isolar Y e dividir por G.

É a linha de operação: liga a composição do gás à do líquido na mesma seção, do topo (X2, Y2) até o fundo (X1, Y1). Aplicada no fundo, onde Y = Y1, dá a primeira resposta: X1 = X2 + (Y1 − Y2)/(L/G).

[eq-block] Equilíbrio líquido–gás: 

 ⟦Y* = 1,5 ⋅ X + 12 ⋅ X^(2)⟧ 

Y* — razão molar do soluto que o gás teria se estivesse em equilíbrio com o líquido de razão X, mol de soluto/mol de gás inerte

Dado no enunciado. O termo quadrático encurva a curva para cima: quanto mais soluto o líquido já tem, mais caro fica dissolver o próximo.

[eq-block] Razão L/G mínima: 

 ⟦( (L)/(G) )_mín = (Y_1 − Y_2 )/(X_1^(*) − X_2 ) X_1^(*) = (− 1,5 + √(1,5^(2) + 4 ⋅ 12 ⋅ Y_1 ))/(2 ⋅ 12)⟧ 

X1* — razão no líquido em equilíbrio com o gás que entra, raiz positiva de 12 X² + 1,5 X − Y1 = 0, mol de soluto/mol de solvente

Reduzir L/G gira a linha de operação em torno do topo e a aproxima da curva de equilíbrio. Onde as duas se tocam a força motriz é zero e a coluna precisaria de altura infinita. Como a curva se encurva para cima, ela fica abaixo da reta em todo o caminho, e o primeiro toque é no fundo, em Y = Y1, com o líquido saturado em X1*. O programa confere essa afirmação.

[eq-block] Altura de recheio: 

 ⟦Z = H_O G ⋅ N_O G N_O G = ∫_Y_2^(Y_1) (d Y)/(Y − Y*)⟧ 

Z — altura de recheio, m

NOG — número de unidades de transferência global do gás, adimensional

HOG — altura de recheio equivalente a uma unidade de transferência, m

NOG mede a dificuldade da separação: soma a variação de Y dividida pela força motriz Y − Y*. Onde a força motriz é pequena, cada pedaço de Y custa muito recheio. HOG mede o desempenho do recheio e é dado.

[eq-block] Integral em forma fechada: 

 ⟦Y − Y* = c + b ⋅ u − a ⋅ u^(2) = a ( u_+ − u ) ( u − u_− )⟧ 

 ⟦N_O G = (1)/(s) ln (u_+ ( u_1 − u_− ))/(( − u_− ) ( u_+ − u_1 ))⟧ 

u — quanto o gás já tem de soluto acima da saída, Y − Y2; vai de 0 no topo a u1 = Y1 − Y2 no fundo

a, b, c — coeficientes da força motriz: a = 12/(L/G)², b = 1 − 1,5/(L/G), c = Y2

u+, u− — raízes de a·u² − b·u − c = 0, uma positiva e outra negativa: (b ± s)/(2a)

s — √(b² + 4ac), que também é igual a a(u+ − u−)

Pela linha de operação, X = u/(L/G). Levado ao equilíbrio, isso faz a força motriz virar um polinômio de grau 2 em u. Uma função 1/(polinômio de grau 2) se integra por frações parciais: ela se separa em 1/(u+ − u) e 1/(u − u−), e cada parte dá um logaritmo. Com L/G acima do mínimo, a raiz u+ fica além de u1 e o argumento do logaritmo é positivo.

Parâmetro | Valor | Unidade | Origem | 

Y1 | 0,080 | mol soluto/mol gás inerte | enunciado | 

Y2 | 0,008 | mol soluto/mol gás inerte | enunciado | 

X2 | 0 | mol soluto/mol solvente | enunciadosolvente puro | 

L/G | 2,2 | mol solvente/mol gás inerte | enunciado | 

HOG | 0,60 | m | enunciado | 

coeficientes do equilíbrio | 1,5 e 12 | adimensional | enunciado | 

[technique] 

[technique-name] Integral em forma fechada

O problema é uma integral de uma variável entre limites conhecidos, mais contas diretas. Para resolver esse tipo de problema, vamos usar a integral em forma fechada obtida acima: uma fórmula que dá NOG sem aproximação. Ela cabe porque a força motriz é um polinômio de grau 2 em Y; a integração numérica fica como verificação. Em Python, as contas se fazem com as operações da biblioteca numpy (np.sqrt, np.log), e a verificação usa a função quad, da biblioteca scipy.integrate. Veja a próxima seção para aprender a usá-las.

## Código

[step] 

### Bibliotecas e dados

[purpose] Carregar as ferramentas e guardar os dados do enunciado em variáveis com nome, para que cada conta mais adiante leia como a equação do modelo.

```
import numpy as np
from scipy.integrate import quad
import matplotlib.pyplot as plt

# Dados do enunciado (razões molares: mol de soluto/mol de inerte)
Y1 = 0.080 # gás na entrada (fundo da coluna)
Y2 = 0.008 # gás na saída (topo da coluna)
X2 = 0.0 # solvente puro entra no topo
LG = 2.2 # L/G, mol de solvente/mol de gás inerte
H_OG = 0.60 # altura de uma unidade de transferência, m
```

[how] import numpy as np carrega a biblioteca de contas numéricas com o apelido np; daqui em diante, np.sqrt é a raiz quadrada dela. from scipy.integrate import quad traz só a função quad, que usa o nome sem prefixo. matplotlib.pyplot, apelidada plt, desenha gráficos. Um nome seguido de = guarda um valor; o texto depois de # é comentário, ignorado pelo Python. No código, a vírgula decimal vira ponto: 0.080.

[so-far] O programa conhece os dados, mas ainda não calcula nada.

[step] 

### Equilíbrio, linha de operação e líquido de saída

[purpose] Escrever as duas relações entre Y e X como funções reutilizáveis e aplicar a linha de operação no fundo da coluna.

```
def Y_eq(X):
 """Razão no gás em equilíbrio com o líquido de razão X."""
 return 1.5 * X + 12 * X**2

def Y_op(X, LG):
 """Linha de operação: balanço de soluto do topo até X."""
 return Y2 + LG * (X - X2)

X1 = X2 + (Y1 - Y2) / LG
print(f"X1 (líquido de saída) = {X1:.4f}")
```

[how] def cria uma função: um nome, entre parênteses o que ela recebe e, recuado abaixo, o que faz. return devolve o resultado a quem chamou. O texto entre três aspas é uma descrição, sem efeito no cálculo. ** é potência: X**2 é X². Y_op recebe LG como argumento, em vez de ler a variável global, para poder ser chamada também com a L/G mínima. X1 é a linha de operação resolvida para X em Y = Y1. Em print(f"…"), o f permite pôr variáveis entre chaves dentro do texto, e :.4f mostra o número com 4 casas decimais.

[so-far] O programa imprime a razão do soluto no líquido de saída.

[step] 

### Razão L/G mínima

[purpose] Achar o líquido que estaria em equilíbrio com o gás de entrada e, com ele, a inclinação da linha de operação que toca a curva no fundo.

```
# X1* resolve 12 X² + 1,5 X − Y1 = 0 (raiz positiva)
X1_eq = (-1.5 + np.sqrt(1.5**2 + 4 * 12 * Y1)) / (2 * 12)
LG_min = (Y1 - Y2) / (X1_eq - X2)
print(f"X1* (equilíbrio com Y1) = {X1_eq:.4f}")
print(f"(L/G)mín = {LG_min:.3f}")
print(f"L/G de operação = {LG / LG_min:.2f} vezes o mínimo")
```

[how] A primeira linha é a fórmula de Bhaskara com o sinal +, que dá a única raiz positiva; a outra raiz é negativa e não tem sentido físico. np.sqrt calcula a raiz quadrada. A última linha divide a L/G de operação pela mínima, que é o modo usual de dizer quanto de folga o projeto tem.

[so-far] O programa imprime também X1*, a L/G mínima e quantas vezes a operação está acima dela.

[step] 

### Número de unidades de transferência e altura

[purpose] Calcular NOG pela fórmula fechada e multiplicar por HOG.

```
def N_OG_fechada(LG):
 """N_OG pela integral analítica (frações parciais)."""
 a = 12 / LG**2 # Y − Y* = c + b·u − a·u²
 b = 1 - 1.5 / LG
 c = Y2
 u1 = Y1 - Y2
 s = np.sqrt(b**2 + 4 * a * c)
 u_mais = (b + s) / (2 * a) # raiz positiva
 u_menos = (b - s) / (2 * a) # raiz negativa
 arg = u_mais * (u1 - u_menos) / (-u_menos * (u_mais - u1))
 return np.log(arg) / s

N_OG = N_OG_fechada(LG)
Z = H_OG * N_OG
print(f"N_OG = {N_OG:.3f}")
print(f"Altura de recheio Z = {Z:.2f} m")
```

[how] Cada linha da função é uma linha do bloco “Integral em forma fechada”, na mesma ordem: os coeficientes a, b, c, o comprimento u1 do intervalo, s, as duas raízes e o argumento do logaritmo. As variáveis criadas dentro de uma função só existem lá dentro; só o valor do return sai. np.log é o logaritmo natural. A função recebe L/G como argumento para que mudar a vazão de solvente seja trocar um número na chamada.

[so-far] O programa responde às quatro perguntas.

[step] 

### Verificação independente

[purpose] Conferir a fórmula fechada com uma integração numérica que não usa as raízes nem o logaritmo, e conferir que o ponto de toque com a L/G mínima é mesmo o fundo.

```
def integrando(Y, LG):
 X = X2 + (Y - Y2) / LG # X na mesma seção, pela linha
 return 1 / (Y - Y_eq(X))

N_quad, erro = quad(integrando, Y2, Y1, args=(LG,))
print(f"N_OG por quad = {N_quad:.3f} (erro estimado {erro:.0e})")
print(f"Força motriz no topo = {Y2 - Y_eq(X2):.4f}")
print(f"Força motriz no fundo = {Y1 - Y_eq(X1):.4f}")

X_teste = np.linspace(X2, X1_eq, 401)[:-1]
folga = Y_op(X_teste, LG_min) - Y_eq(X_teste)
print(f"Menor folga com (L/G)mín antes do fundo = {folga.min():.4f}")
```

[how] integrando é o 1/(Y − Y*) do enunciado, escrito como ele é: para cada Y, acha o X da mesma seção e divide. A integração numérica aproxima a área sob essa curva somando muitas fatias estreitas. quad faz isso escolhendo sozinha onde avaliar, e aperta as fatias até a estimativa do erro ficar abaixo de cerca de 10⁻⁸ (essa meta é a sua tolerância). Os argumentos:

[how] 

integrando — a função a integrar, passada pelo nome, sem parênteses. Não é você quem a chama: quad a chama algumas dezenas de vezes, cada vez com um Y diferente no primeiro argumento, e soma os valores devolvidos com pesos.

Y2, Y1 — os limites de integração, do topo ao fundo.

args=(LG,) — valores extras que quad repassa a cada chamada, depois de Y: é por esse caminho que LG chega ao segundo argumento de integrando. Os parênteses formam uma tupla (uma lista que não se altera); a vírgula é obrigatória, porque (LG) sem ela seria só o número entre parênteses.

[how] quad devolve dois valores, a integral e a estimativa do erro; N_quad, erro = … separa os dois em variáveis (isso se chama desempacotar). O formato :.0e mostra o erro em notação científica. Depois, np.linspace(X2, X1_eq, 401) cria 401 valores igualmente espaçados de X2 a X1*, e [:-1] descarta o último, o fundo, onde a folga é zero por construção. Y_op e Y_eq aceitam esse vetor inteiro e devolvem um vetor; folga.min() é o menor valor dele. Se a curva cruzasse a reta antes do fundo, esse mínimo seria negativo.

[so-far] O programa confirma NOG por um segundo caminho, mostra a força motriz nas duas pontas da coluna e confirma onde fica o ponto de toque.

[step] 

### Diagrama Y–X

[purpose] Desenhar a curva de equilíbrio, a linha de operação e a linha com a L/G mínima no mesmo diagrama.

```
X = np.linspace(0, 0.045, 200)
plt.plot(X, Y_eq(X), label="Curva de equilíbrio")
Xo = np.linspace(X2, X1, 50)
plt.plot(Xo, Y_op(Xo, LG), label="Linha de operação")
Xm = np.linspace(X2, X1_eq, 50)
plt.plot(Xm, Y_op(Xm, LG_min), "--", label="Linha com (L/G)mín")
plt.xlabel("X (mol soluto/mol solvente)")
plt.ylabel("Y (mol soluto/mol gás inerte)")
plt.legend()
plt.show()
```

[how] plt.plot(x, y, label=…) traça uma curva e lhe dá o nome que vai para a legenda; "--" pede linha tracejada. Cada linha de operação é traçada só entre o topo e o seu fundo. xlabel e ylabel dão nome aos eixos, legend mostra a legenda e show abre a janela.

[so-far] O programa está completo: imprime os resultados e mostra o diagrama.

[step] 

### Programa completo

```
import numpy as np
from scipy.integrate import quad
import matplotlib.pyplot as plt

# Dados do enunciado (razões molares: mol de soluto/mol de inerte)
Y1 = 0.080 # gás na entrada (fundo da coluna)
Y2 = 0.008 # gás na saída (topo da coluna)
X2 = 0.0 # solvente puro entra no topo
LG = 2.2 # L/G, mol de solvente/mol de gás inerte
H_OG = 0.60 # altura de uma unidade de transferência, m

def Y_eq(X):
 """Razão no gás em equilíbrio com o líquido de razão X."""
 return 1.5 * X + 12 * X**2

def Y_op(X, LG):
 """Linha de operação: balanço de soluto do topo até X."""
 return Y2 + LG * (X - X2)

X1 = X2 + (Y1 - Y2) / LG
print(f"X1 (líquido de saída) = {X1:.4f}")

# X1* resolve 12 X² + 1,5 X − Y1 = 0 (raiz positiva)
X1_eq = (-1.5 + np.sqrt(1.5**2 + 4 * 12 * Y1)) / (2 * 12)
LG_min = (Y1 - Y2) / (X1_eq - X2)
print(f"X1* (equilíbrio com Y1) = {X1_eq:.4f}")
print(f"(L/G)mín = {LG_min:.3f}")
print(f"L/G de operação = {LG / LG_min:.2f} vezes o mínimo")

def N_OG_fechada(LG):
 """N_OG pela integral analítica (frações parciais)."""
 a = 12 / LG**2 # Y − Y* = c + b·u − a·u²
 b = 1 - 1.5 / LG
 c = Y2
 u1 = Y1 - Y2
 s = np.sqrt(b**2 + 4 * a * c)
 u_mais = (b + s) / (2 * a) # raiz positiva
 u_menos = (b - s) / (2 * a) # raiz negativa
 arg = u_mais * (u1 - u_menos) / (-u_menos * (u_mais - u1))
 return np.log(arg) / s

N_OG = N_OG_fechada(LG)
Z = H_OG * N_OG
print(f"N_OG = {N_OG:.3f}")
print(f"Altura de recheio Z = {Z:.2f} m")

def integrando(Y, LG):
 X = X2 + (Y - Y2) / LG # X na mesma seção, pela linha
 return 1 / (Y - Y_eq(X))

N_quad, erro = quad(integrando, Y2, Y1, args=(LG,))
print(f"N_OG por quad = {N_quad:.3f} (erro estimado {erro:.0e})")
print(f"Força motriz no topo = {Y2 - Y_eq(X2):.4f}")
print(f"Força motriz no fundo = {Y1 - Y_eq(X1):.4f}")

X_teste = np.linspace(X2, X1_eq, 401)[:-1]
folga = Y_op(X_teste, LG_min) - Y_eq(X_teste)
print(f"Menor folga com (L/G)mín antes do fundo = {folga.min():.4f}")

X = np.linspace(0, 0.045, 200)
plt.plot(X, Y_eq(X), label="Curva de equilíbrio")
Xo = np.linspace(X2, X1, 50)
plt.plot(Xo, Y_op(Xo, LG), label="Linha de operação")
Xm = np.linspace(X2, X1_eq, 50)
plt.plot(Xm, Y_op(Xm, LG_min), "--", label="Linha com (L/G)mín")
plt.xlabel("X (mol soluto/mol solvente)")
plt.ylabel("Y (mol soluto/mol gás inerte)")
plt.legend()
plt.show()
```

Os seis passos juntos, na ordem, prontos para rodar.

## Resultado

[answer] 

Razão molar do soluto no líquido de saída: X1 = 0,0327 mol de soluto/mol de solvente.

Razão L/G mínima: 1,786 mol de solvente/mol de gás inerte (com X1* = 0,0403).

Número de unidades de transferência: NOG = 4,997 (a integração numérica com quad dá o mesmo 4,997).

Altura de recheio: Z = 3,00 m.

[figura; controles: LG] 

### Onde a força motriz é menor?

No topo, a distância vertical entre a linha de operação e a curva de equilíbrio é 0,0080 (o próprio Y2, porque o solvente entra puro); no fundo ela é 0,0181. A força motriz no topo é menos da metade da do fundo, e por isso a última parte da remoção, perto de Y2, é a que mais pesa na integral.

### Quão longe do mínimo a coluna opera?

A L/G de 2,2 é 1,23 vezes a mínima de 1,786. A linha de operação termina no fundo em X1 = 0,0327, à esquerda do ponto em que tocaria a curva de equilíbrio, X1* = 0,0403. É essa distância que mantém a força motriz de 0,0181 no fundo.

### Por que o toque é no fundo e não no meio?

A curva de equilíbrio se encurva para cima, então uma reta que sai do topo e alcança a curva em X1* fica acima dela em todo o caminho. O programa confirma: com a L/G mínima, a menor folga antes do fundo é 0,0001, positiva. Com uma curva encurvada para baixo, o toque poderia ser uma tangência no meio, e a fórmula de L/G mínima usada aqui não valeria.

### Leve L/G até 1,80

A linha de operação gira em torno do topo, desce e quase encosta na curva de equilíbrio no fundo; a força motriz ali cai para quase zero e o recheio necessário dispara. Abaixo de 1,786 a linha cruza a curva e a separação pedida fica impossível.

[in-your-code] No programa, troque LG = 2.2 por LG = 1.8. Ele imprime X1 (líquido de saída) = 0.0400, N_OG = 12.527, Altura de recheio Z = 7.52 m e Força motriz no fundo = 0.0008. A altura fica 7,52/3,00 = 2,5 vezes maior para gastar 1,8 em vez de 2,2 mol de solvente por mol de gás inerte.

 Ficou alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Absorção de gases · integral definida

# Absorção em coluna de recheio

[problem] 

Uma coluna de recheio absorve um soluto de uma corrente gasosa com um solvente puro, em contracorrente. As composições são razões molares (mol de soluto por mol de inerte no gás; mol de soluto por mol de solvente no líquido). O gás entra com Yent = 0,080 e deve sair com Ysai = 0,008. A razão entre as vazões molares de solvente e de gás inerte é L/G = 2,2. O equilíbrio é Y* = 1,5 X + 12 X². A altura de uma unidade de transferência global do gás é HOG = 0,60 m.

A razão molar do soluto no líquido de saída, Xsai.

A razão L/G mínima.

O número de unidades de transferência NOG = ∫ dY / (Y − Y*).

A altura de recheio, Z, em metros.

O gás sobe pela coluna e perde soluto para o líquido que desce. Quanto mais perto do equilíbrio, mais devagar o soluto passa de uma fase à outra, e é isso que decide a altura. Ao final, você terá um programa que calcula as quatro respostas e desenha a curva de equilíbrio com a linha de operação.

## Modelo

### Balanço de massa do soluto na coluna, em mols

 ⟦acúmulo de soluto = entra − sai⟧ 

(princípio) O soluto não aparece nem desaparece sem motivo. O volume de controle é o trecho da coluna que vai de uma seção qualquer, a uma altura intermediária, até o topo.

 ⟦0 {acúmulo} = G ⋅ Y {gás entra pela seção} + L ⋅ 0 {solvente puro entra no topo} − G ⋅ Y_sai {gás sai no topo} − L ⋅ X {líquido sai pela seção}⟧ 

G — vazão molar de gás inerte, que atravessa a coluna sem se transferir, mol/s

L — vazão molar de solvente, que escoa pela coluna sem evaporar, mol/s

Y — mols de soluto por mol de inerte no gás, na seção considerada, mol/mol

X — mols de soluto por mol de solvente no líquido, na mesma seção, mol/mol

Ysai — mols de soluto por mol de inerte no gás que sai pelo topo, mol/mol

(tradução) Cada palavra vira uma vazão molar de soluto. O solvente entra puro, então não traz soluto.

 ⟦G = constante , L = constante⟧ 

(hipótese) O regime é permanente (por isso o acúmulo é zero), e as vazões de inerte e de solvente não mudam ao longo da coluna, porque é só o soluto que muda de fase. Se usássemos a vazão total de gás, ela diminuiria ao longo da coluna e G não seria constante. Se o regime não fosse permanente, o termo de acúmulo voltaria à equação.

[final] 

 ⟦X = (G)/(L) {inverso de L/G} ( Y − Y_sai ) {soluto já retirado do gás}⟧ 

(álgebra) Isolando X na equação do passo 2, com o acúmulo igual a zero.

Esta é a linha de operação: uma reta que liga a composição do líquido à do gás em cada altura, com inclinação L/G. No fundo, onde Y = Yent, ela dá Xsai = (Yent − Ysai) / (L/G). Quanto maior L/G, menos soluto cada mol de solvente precisa carregar.

### Balanço de massa do soluto numa fatia do recheio, em mols

 ⟦acúmulo de soluto = entra no gás − sai no gás − passa ao líquido⟧ 

(princípio) O volume de controle é a fatia de recheio de espessura dz, só a fase gasosa. O soluto que o gás perde na fatia é o que passa ao líquido.

 ⟦0 {acúmulo} = G ⋅ Y ( z ) {entra no gás} − G ⋅ Y ( z + d z ) {sai no gás} − K_Y a ⋅ ( Y − Y* ) ⋅ S ⋅ d z {passa ao líquido}⟧ 

z — altura medida a partir do fundo da coluna, onde o gás entra, m

Y* — composição do gás que estaria em equilíbrio com o líquido da seção, mol/mol de inerte

KYa — coeficiente global de transferência de massa do gás vezes a área de contato por volume de recheio, mol/(s·m³·(mol/mol))

S — área da seção transversal da coluna, m²

(tradução) A taxa de transferência por volume é proporcional à força motriz Y − Y*: a distância ao equilíbrio.

 ⟦− G (d Y)/(d z) = K_Y a ⋅ S ⋅ ( Y − Y* )⟧ 

(álgebra) Passa o termo Y(z + dz) − Y(z) para o outro lado, divide por dz e faz dz tender a zero: a diferença vira a derivada.

 ⟦H_OG = (G)/(K_Y a ⋅ S)⟧ 

HOG — altura de uma unidade de transferência global do gás, m

(definição) Agrupa tudo o que depende do recheio e das vazões numa única altura. O enunciado dá seu valor.

 ⟦Z = H_OG ⋅ ∫_Y_sai^(Y_ent) (d Y)/(Y − Y*) {N OG , número de unidades}⟧ 

Z — altura de recheio da coluna, m

NOG — número de unidades de transferência global do gás, adimensional

(álgebra) Com HOG, fica dY/dz = −(Y − Y*)/HOG. Separando as variáveis e integrando de z = 0 (Y = Yent) até z = Z (Y = Ysai), o sinal de menos troca os limites.

[final] 

 ⟦Z = H_OG ⋅ N_OG⟧ 

(hipótese) KYa constante ao longo da coluna, o que mantém HOG constante e o tira de dentro da integral. Se ele variasse com a altura, HOG teria de ficar dentro da integral.

Cada unidade de transferência equivale a uma altura HOG de recheio, e NOG conta quantas unidades são necessárias. Onde a força motriz Y − Y* é pequena, o integrando é grande e a separação fica cara em altura.

[eq-block] Equilíbrio: 

 ⟦Y_eq = m_1 X + m_2 X^(2)⟧ 

m1, m2 — coeficientes da curva de equilíbrio, adimensionais: 1,5 e 12.

É o Y* do enunciado, dado como lei do equilíbrio. A curva sobe cada vez mais depressa com X (concavidade para cima).

[eq-block] Razão L/G mínima: 

 ⟦X_eq = (− m_1 + √(m_1^(2) + 4 m_2 Y_ent ))/(2 m_2 ) , ( L / G )_mín = (Y_ent − Y_sai )/(X_eq )⟧ 

Xeq — razão molar do soluto num líquido em equilíbrio com o gás de entrada, mol/mol de solvente

Com pouco solvente, o líquido sai tão carregado que chega a ficar em equilíbrio com o gás de entrada: ali a força motriz é zero e a coluna precisaria de altura infinita. A raiz de 12 X² + 1,5 X = Yent dá Xeq, e a inclinação da linha de operação que termina nesse ponto é o L/G mínimo. Como a curva de equilíbrio tem concavidade para cima, o ponto de encontro é no fundo; o programa confere isso.

[eq-block] Integral por frações parciais: 

 ⟦Y − Y* = c + b u − A u^(2) , N_OG = (1)/(s) ln [ (r_1 )/(| r_2 |) ⋅ (Δ − r_2 )/(r_1 − Δ) ]⟧ 

u — Y − Ysai, quanto o gás já está acima da composição de saída, mol/mol

c, b, A — c = Ysai, b = 1 − m1·G/L e A = m2·(G/L)², coeficientes do polinômio em u, adimensionais (c em mol/mol)

s, r1, r2 — s = √(b² + 4Ac) e r1,2 = (b ± s)/(2A), as raízes do polinômio, mol/mol

Δ — Yent − Ysai, mol/mol

Trocando X = (G/L)u na equação do equilíbrio, a força motriz fica um polinômio de segundo grau em u. Fatorando o polinômio pelas raízes e separando em frações parciais, a integral de 0 a Δ vira a expressão acima.

Parâmetro | Valor | Unidade | Fonte | 

Yent | 0,080 | mol/mol de inerte | enunciado | 

Ysai | 0,008 | mol/mol de inerte | enunciado | 

L/G | 2,2 | mol/mol | enunciado | 

m1 | 1,5 | adimensional | enunciado | 

m2 | 12 | adimensional | enunciado | 

HOG | 0,60 | m | enunciado | 

[technique] 

[technique-name] Integral analítica

Falta calcular uma integral definida, a área sob a curva 1/(Y − Y*) entre Ysai e Yent. Para resolver esse tipo de problema, vamos usar a integração analítica: achar uma fórmula exata para a área, em vez de somar fatias. Ela serve aqui porque a força motriz é um polinômio de segundo grau, e esse caso tem solução exata por frações parciais. Em Python, as funções que fazem isso são np.sqrt e np.log, da biblioteca NumPy; a integração numérica quad, da biblioteca SciPy, entra só para conferir. Veja a próxima seção para aprender a usá-las.

## Código

[step] 

### Dados e curva de equilíbrio

[purpose] Importar as bibliotecas, guardar os dados do enunciado em variáveis e escrever o equilíbrio como uma função.

```
import numpy as np
from scipy.integrate import quad
import matplotlib.pyplot as plt

# --- Dados do enunciado ---
Y_in = 0.080 # soluto no gás de entrada, mol/mol de inerte
Y_out = 0.008 # soluto no gás de saída, mol/mol de inerte
LG = 2.2 # solvente / inerte, mol/mol
H_OG = 0.60 # altura de uma unidade de transferência, m
m1 = 1.5 # coeficiente linear do equilíbrio, adimensional
m2 = 12.0 # coeficiente quadrático do equilíbrio, adimensional

def Y_eq(X):
 # Y* em equilíbrio com X (mol/mol de solvente)
 return m1 * X + m2 * X**2
```

[how] import numpy as np carrega a biblioteca NumPy, de contas numéricas, com o apelido np; o mesmo vale para plt, que desenha gráficos. from scipy.integrate import quad traz só a função quad, que será usada na verificação. Uma linha nome = valor guarda o valor sob esse nome; o que vem depois de # é comentário e o Python ignora. def Y_eq(X): define uma função: ela recebe um valor, chamado X dentro dela, e o return devolve o resultado. X**2 é X ao quadrado.

[so-far] O programa conhece todos os dados e sabe calcular Y* para qualquer X.

[step] 

### Líquido de saída e razão L/G mínima

[purpose] Calcular as duas respostas que saem de contas diretas: Xsai pelo balanço, e o L/G mínimo pela raiz da equação de segundo grau.

```
# --- Líquido de saída e L/G mínima ---
X_out = (Y_in - Y_out) / LG # mol/mol de solvente
X_eq = (-m1 + np.sqrt(m1**2 + 4 * m2 * Y_in)) / (2 * m2)
LG_min = (Y_in - Y_out) / X_eq # mol/mol

print(f"X_out = {X_out:.5f} mol/mol")
print(f"X em equilíbrio com Y_in = {X_eq:.5f} mol/mol")
print(f"(L/G) mínima = {LG_min:.3f} mol/mol")
```

[how] np.sqrt(...) é a raiz quadrada. print(f"...") escreve texto na tela; o f antes das aspas permite colocar uma variável entre chaves. Dentro das chaves, :.5f pede 5 casas depois da vírgula, e :.3f pede 3.

[so-far] O programa imprime Xsai, Xeq e o L/G mínimo.

[step] 

### Força motriz ao longo da coluna

[purpose] Escrever Y − Y* como função de Y, usando a linha de operação para achar o X de cada altura, e olhar seu valor nas pontas.

```
# --- Força motriz Y - Y* ---
def forca_motriz(Y, LG):
 X = (Y - Y_out) / LG # linha de operação
 return Y - Y_eq(X) # mol/mol de inerte

f_topo = forca_motriz(Y_out, LG)
f_fundo = forca_motriz(Y_in, LG)
print(f"Força motriz no topo = {f_topo:.5f}")
print(f"Força motriz no fundo = {f_fundo:.5f}")
```

[how] A função forca_motriz recebe dois argumentos, Y e LG, na ordem em que aparecem no def. Dentro dela, X vem da linha de operação e Y_eq(X) chama a função do primeiro passo. Ao chamar forca_motriz(Y_out, LG), o primeiro valor vai para Y e o segundo para LG. O topo é Y_out e o fundo é Y_in. O print usa :.5f, 5 casas decimais.

[so-far] O programa imprime a distância ao equilíbrio no topo e no fundo.

[step] 

### N_OG e altura de recheio

[purpose] Aplicar a fórmula da integral por frações parciais e multiplicar por HOG.

```
# --- N_OG pela integral analítica ---
def N_OG_fechado(LG):
 a = 1 / LG
 c = Y_out # termo constante
 b = 1 - m1 * a # coeficiente de u
 A = m2 * a**2 # coeficiente de -u^2
 s = np.sqrt(b**2 + 4 * A * c)
 r1 = (b + s) / (2 * A) # raiz maior
 r2 = (b - s) / (2 * A) # raiz menor (negativa)
 delta = Y_in - Y_out
 razao = (r1 / abs(r2)) * (delta - r2) / (r1 - delta)
 return np.log(razao) / s

N_OG = N_OG_fechado(LG)
Z = H_OG * N_OG # altura de recheio, m
print(f"N_OG = {N_OG:.3f}")
print(f"Altura de recheio = {Z:.3f} m")
```

[how] A função recebe LG e devolve NOG; como LG é argumento, dá para chamá-la com outros valores depois. a, c, b e A são os coeficientes do polinômio da seção anterior; s, r1 e r2, a raiz do discriminante e as duas raízes. abs(r2) é o valor absoluto, necessário porque r2 é negativo. np.log é o logaritmo natural. O resultado é multiplicado por H_OG para dar metros. O print usa :.3f, 3 casas decimais.

[so-far] O programa imprime NOG e a altura de recheio.

[step] 

### Verificação independente

[purpose] Conferir NOG por um caminho que não usa a fórmula, e conferir o L/G mínimo olhando se a força motriz some com um pouco menos de solvente.

```
# --- Verificações independentes ---
N_quad, erro = quad(lambda Y: 1 / forca_motriz(Y, LG), Y_out, Y_in)
print(f"N_OG por quad = {N_quad:.3f} (erro estimado {erro:.1e})")
print(f"Diferença entre os dois = {abs(N_quad - N_OG):.1e}")

Ys = np.linspace(Y_out, Y_in, 500)
acima = forca_motriz(Ys, 1.01 * LG_min).min()
abaixo = forca_motriz(Ys, 0.99 * LG_min).min()
print(f"Mínima força motriz com 1,01 (L/G)min = {acima:.5f}")
print(f"Mínima força motriz com 0,99 (L/G)min = {abaixo:.5f}")
```

[how] 

quad(f, a, b) calcula a integral numérica de f entre a e b, somando muitas fatias pequenas: f é a função a integrar, Y_out é o limite inferior e Y_in o superior.

lambda Y: 1 / forca_motriz(Y, LG) é uma função de uma linha, sem nome: o quad a chama dezenas de vezes, cada vez com um valor de Y entre os limites, e usa o que ela devolve para somar a área. Por isso a lambda fixa LG e deixa só Y livre.

quad devolve dois valores de uma vez (uma tupla): N_quad, erro = ... separa a integral e a estimativa do erro. O erro estimado é da ordem de 1e-10, muito menor que a precisão de três casas com que reportamos NOG, então a integral é confiável e a diferença entre os dois cálculos mede só o arredondamento. :.1e imprime em notação científica, com uma casa; :.3f e :.5f imprimem 3 e 5 casas decimais.

np.linspace(Y_out, Y_in, 500) gera 500 valores igualmente espaçados entre o início e o fim, e .min() pega o menor. Com 1.01 * LG_min (1% a mais de solvente) o menor valor deve ser positivo; com 0.99 * LG_min (1% a menos), negativo, pois a linha de operação cruzaria a curva de equilíbrio.

[so-far] O programa confirma NOG pelo quad e mostra o sinal da força motriz mínima em torno do L/G mínimo.

[step] 

### Gráfico

[purpose] Desenhar a curva de equilíbrio e as linhas de operação, a de projeto e a mínima.

```
# --- Gráfico ---
X = np.linspace(0, 0.05, 200)
plt.plot(X, Y_eq(X), label="Curva de equilíbrio")
plt.plot([0, X_out], [Y_out, Y_in], label="Linha de operação")
plt.plot([0, X_eq], [Y_out, Y_in], "--",
 label="Linha de operação mínima")
plt.xlabel("X (mol de soluto / mol de solvente)")
plt.ylabel("Y (mol de soluto / mol de inerte)")
plt.legend()
plt.show()
```

[how] np.linspace(0, 0.05, 200) gera 200 valores de X entre 0 e 0,05. plt.plot(x, y, label=...) desenha uma linha: a curva usa muitos pontos, e cada linha de operação é uma reta, por isso só dois pontos, [0, X_out] no eixo X e [Y_out, Y_in] no Y. O "--" torna a linha tracejada. plt.xlabel e plt.ylabel dão nome aos eixos, plt.legend() mostra os rótulos e plt.show() abre a janela do gráfico.

[so-far] O programa calcula as quatro respostas, as verificações e abre o gráfico.

[step] 

### Programa completo

```
import numpy as np
from scipy.integrate import quad
import matplotlib.pyplot as plt

# --- Dados do enunciado ---
Y_in = 0.080 # soluto no gás de entrada, mol/mol de inerte
Y_out = 0.008 # soluto no gás de saída, mol/mol de inerte
LG = 2.2 # solvente / inerte, mol/mol
H_OG = 0.60 # altura de uma unidade de transferência, m
m1 = 1.5 # coeficiente linear do equilíbrio, adimensional
m2 = 12.0 # coeficiente quadrático do equilíbrio, adimensional

def Y_eq(X):
 # Y* em equilíbrio com X (mol/mol de solvente)
 return m1 * X + m2 * X**2

# --- Líquido de saída e L/G mínima ---
X_out = (Y_in - Y_out) / LG # mol/mol de solvente
X_eq = (-m1 + np.sqrt(m1**2 + 4 * m2 * Y_in)) / (2 * m2)
LG_min = (Y_in - Y_out) / X_eq # mol/mol

print(f"X_out = {X_out:.5f} mol/mol")
print(f"X em equilíbrio com Y_in = {X_eq:.5f} mol/mol")
print(f"(L/G) mínima = {LG_min:.3f} mol/mol")

# --- Força motriz Y - Y* ---
def forca_motriz(Y, LG):
 X = (Y - Y_out) / LG # linha de operação
 return Y - Y_eq(X) # mol/mol de inerte

f_topo = forca_motriz(Y_out, LG)
f_fundo = forca_motriz(Y_in, LG)
print(f"Força motriz no topo = {f_topo:.5f}")
print(f"Força motriz no fundo = {f_fundo:.5f}")

# --- N_OG pela integral analítica ---
def N_OG_fechado(LG):
 a = 1 / LG
 c = Y_out # termo constante
 b = 1 - m1 * a # coeficiente de u
 A = m2 * a**2 # coeficiente de -u^2
 s = np.sqrt(b**2 + 4 * A * c)
 r1 = (b + s) / (2 * A) # raiz maior
 r2 = (b - s) / (2 * A) # raiz menor (negativa)
 delta = Y_in - Y_out
 razao = (r1 / abs(r2)) * (delta - r2) / (r1 - delta)
 return np.log(razao) / s

N_OG = N_OG_fechado(LG)
Z = H_OG * N_OG # altura de recheio, m
print(f"N_OG = {N_OG:.3f}")
print(f"Altura de recheio = {Z:.3f} m")

# --- Verificações independentes ---
N_quad, erro = quad(lambda Y: 1 / forca_motriz(Y, LG), Y_out, Y_in)
print(f"N_OG por quad = {N_quad:.3f} (erro estimado {erro:.1e})")
print(f"Diferença entre os dois = {abs(N_quad - N_OG):.1e}")

Ys = np.linspace(Y_out, Y_in, 500)
acima = forca_motriz(Ys, 1.01 * LG_min).min()
abaixo = forca_motriz(Ys, 0.99 * LG_min).min()
print(f"Mínima força motriz com 1,01 (L/G)min = {acima:.5f}")
print(f"Mínima força motriz com 0,99 (L/G)min = {abaixo:.5f}")

# --- Gráfico ---
X = np.linspace(0, 0.05, 200)
plt.plot(X, Y_eq(X), label="Curva de equilíbrio")
plt.plot([0, X_out], [Y_out, Y_in], label="Linha de operação")
plt.plot([0, X_eq], [Y_out, Y_in], "--",
 label="Linha de operação mínima")
plt.xlabel("X (mol de soluto / mol de solvente)")
plt.ylabel("Y (mol de soluto / mol de inerte)")
plt.legend()
plt.show()
```

Os passos juntos, na ordem, prontos para rodar.

## Resultado

[answer] 

Razão molar do soluto no líquido de saída: Xsai = 0,03273 mol/mol de solvente. Razão mínima: (L/G)mín = 1,786. Número de unidades de transferência: NOG = 4,997. Altura de recheio: Z = 2,998 m. A integração numérica com quad dá o mesmo NOG.

[figura; controles: LG] 

### Onde a linha de operação chega mais perto do equilíbrio?

No topo, onde X = 0: a linha de operação está em 0,008 e a curva de equilíbrio em zero, uma força motriz de 0,00800. No fundo ela é de 0,01806. Por isso a parte de cima da coluna é a mais difícil: o gás já está quase limpo e a separação que falta é pequena em valor absoluto, mas é nela que o integrando 1/(Y − Y*) é maior.

### Por que a L/G mínima é lida no fundo da coluna?

A curva de equilíbrio tem concavidade para cima, então a linha de operação mínima encosta nela na ponta de cima, em Y = 0,080, onde Xeq = 0,04032. A inclinação desse segmento dá 1,786, menor que os 2,2 do projeto. A verificação do programa confirma: com 1% a menos de solvente, a força motriz mínima fica negativa (−0,00101); com 1% a mais, ela fica positiva (0,00098).

### Leve L/G até 1,8

A linha de operação fica quase igual à linha de operação mínima, e as duas se aproximam da curva de equilíbrio na ponta de cima. A força motriz cai ali, NOG sobe de 4,997 para 12,527 e a altura passa de 2,998 m para 7,516 m. Gastar pouco solvente custa muito recheio.

[in-your-code] No programa, troque LG = 2.2 por LG = 1.8: ele passa a imprimir X_out = 0.04000, N_OG = 12.527 e Altura de recheio = 7.516 m.

 Alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
