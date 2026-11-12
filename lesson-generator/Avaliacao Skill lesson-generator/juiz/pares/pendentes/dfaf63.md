# Comparação dfaf63

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/dfaf63.json`.

# Enunciado enviado ao modelo

Uma coluna de pratos absorve um soluto diluído de um gás com um solvente puro, em contracorrente. O equilíbrio é y = 1,2 x e a razão molar entre líquido e gás é L/G = 1,8, ambos constantes. Deseja-se recuperar 95% do soluto. Pela equação de Kremser, calcule o fator de absorção, o número de estágios teóricos (com decimais), o número inteiro de estágios a instalar e a recuperação obtida com esse número inteiro (%). Qual é a razão L/G mínima para essa recuperação?


==================== LIÇÃO 1 ====================

Operações unitárias · cálculo direto (forma fechada)

# Absorção em coluna de pratos

[problem] 

Uma coluna de pratos absorve um soluto diluído de uma corrente gasosa com um solvente puro, em contracorrente. O equilíbrio é y = m·x, com m = 1,2 (adimensional). A razão molar entre líquido e gás é L/G = 1,8 mol/mol, e m e L/G são constantes ao longo da coluna. Deseja-se recuperar Rd = 95% do soluto que entra com o gás. Pela equação de Kremser, pede-se:

o fator de absorção A;

o número de estágios teóricos N, com decimais;

o número inteiro de estágios a instalar;

a recuperação R obtida com esse número inteiro, em %;

a razão L/G mínima para recuperar 95%.

O gás sobe pela coluna e perde soluto em cada prato para o líquido que desce. Quanto mais pratos, maior a recuperação, mas ela depende também de quanto solvente se usa. Ao final, você terá um programa curto que responde às cinco perguntas e um gráfico da recuperação contra o número de estágios.

## Modelo

### Balanço de massa do soluto na coluna, em mols

 ⟦soluto que entra = soluto que sai⟧ 

(princípio) O soluto não aparece nem desaparece, e em regime permanente nada se acumula. O volume de controle é a parte da coluna que vai do topo até a saída do líquido do prato n. Os pratos são numerados do topo (prato 1) ao fundo (prato N).

 ⟦G ⋅ y_n + 1 {gás que sobe do prato n+1} + L ⋅ x_0 {líquido que entra no topo} = G ⋅ y_1 {gás que sai no topo} + L ⋅ x_n {líquido que desce do prato n}⟧ 

G — vazão molar de gás que atravessa a coluna, mol/h.

L — vazão molar de líquido que atravessa a coluna, mol/h.

yn — fração molar de soluto no gás que deixa o prato n, adimensional; yN+1 é a do gás que entra pelo fundo.

xn — fração molar de soluto no líquido que deixa o prato n, adimensional; x0 é a do líquido que entra pelo topo.

(tradução) Cada termo é uma vazão molar de corrente vezes sua fração molar de soluto. Em cima, entra o solvente; embaixo, entra o gás a tratar.

 ⟦x_0 = 0 ⇒ y_n + 1 = y_1 + (L)/(G) {razão constante} x_n⟧ 

(hipótese) O solvente chega puro (x0 = 0) e o soluto é diluído, de modo que L e G não mudam ao longo da coluna. Se o soluto fosse concentrado, G diminuiria para cima e L aumentaria para baixo, e a razão L/G deixaria de ser constante. Se o solvente chegasse com soluto, sobraria o termo L·x0.

 ⟦y_n = m ⋅ x_n ⇒ y_n + 1 = y_1 + (L)/(m ⋅ G) y_n⟧ 

m — inclinação da reta de equilíbrio y = m·x, adimensional.

(hipótese) Prato ideal (teórico): o gás e o líquido que saem do prato estão em equilíbrio. Se o prato real não chegasse ao equilíbrio, yn ficaria abaixo de m·xn e seriam necessários mais pratos reais que teóricos.

 ⟦A = (L)/(m ⋅ G) {fator de absorção} ⇒ y_n + 1 = y_1 + A ⋅ y_n⟧ 

A — fator de absorção, razão entre a vazão de líquido e a que o equilíbrio exigiria para o gás, adimensional.

(definição) Agrupar L/(m·G) em um só número simplifica tudo o que vem a seguir. Com A grande, o líquido tem folga para absorver o soluto.

 ⟦y_N + 1 = y_1 ( 1 + A + A^(2) + … + A^(N) ) {soma geométrica} = y_1 (A^(N + 1) − 1)/(A − 1)⟧ 

(álgebra) A relação do passo anterior liga cada prato ao seguinte. Aplicando-a do prato 1 (onde y2 = y1·(1 + A)) até o prato N, aparece uma soma de potências de A, que tem fórmula fechada quando A ≠ 1.

 ⟦R = (y_N + 1 − y_1 )/(y_N + 1 ) {soluto absorvido / soluto que entra}⟧ 

R — recuperação do soluto, fração do soluto do gás de entrada que passa para o líquido, adimensional (0,95 equivale a 95%).

(definição) O gás entra com G·yN+1 de soluto e sai com G·y1; a diferença foi absorvida. Como G é constante, ele se cancela.

[final] 

 ⟦R {recuperação} = (A^(N + 1) − A)/(A^(N + 1) − 1) {equação de Kremser}⟧ 

(álgebra) Substituindo a soma geométrica na definição, R = 1 − (A − 1)/(AN+1 − 1), que reorganizada dá a equação ao lado.

A equação de Kremser dá a recuperação de um soluto diluído em uma coluna com N pratos ideais. Ela implica que, para A > 1, a recuperação cresce com N e tende ao total do soluto; para A < 1, ela tem um teto igual a A, não importa quantos pratos existam. Quando A = 1 exato, a fórmula é indeterminada e o limite é R = N/(N + 1).

[eq-block] Estágios para uma recuperação desejada: 

 ⟦N = (ln ( (A − R_d )/(1 − R_d ) ))/(ln ( A )) − 1⟧ 

Rd — meta de recuperação, a fração do soluto que se deseja absorver, adimensional.

É a equação de Kremser com R = Rd e isolando N: AN+1 = (A − Rd)/(1 − Rd), e o logaritmo traz o expoente para baixo. O resultado é contínuo; como não existe meio prato, o número de pratos a instalar é o inteiro seguinte.

[eq-block] Razão L/G mínima: 

 ⟦(L)/(G)_mín = R_d ⋅ m⟧ 

Com infinitos pratos (N → ∞) e A < 1, a equação de Kremser dá R = A. Para atingir a meta Rd é preciso A ≥ Rd, ou seja, L/G ≥ Rd·m. Abaixo desse valor nenhuma coluna, por maior que seja, alcança a meta; no valor exato, seriam necessários infinitos pratos.

Parâmetro | Valor | Unidade | Fonte | 

m | 1,2 | adimensional | dadoinclinação do equilíbrio y = m·x | 

L/G | 1,8 | mol/mol | dado | 

Rd | 0,95 | adimensional | dado95% de recuperação | 

A | 1,5 | adimensional | calculadoL/(m·G) = 1,8/1,2 | 

Faixa do gráfico | 0 a 12 | estágios | escolhamostra a curva passando pela meta e se aproximando do teto | 

[technique] 

[technique-name] Cálculo direto

Aqui não há equação diferencial nem sistema a resolver: a equação de Kremser já está na forma fechada, e basta isolar o número de estágios. Para este tipo de problema, usaremos o cálculo direto de uma fórmula, sem método numérico iterativo. Ele serve porque a fórmula foi obtida sem aproximação além das hipóteses do modelo, e dá o resultado exato de uma só vez. Em Python, as funções que fazem isso são np.log e np.ceil, da biblioteca NumPy. Como conferência, o programa repete o cálculo prato a prato, que é um caminho independente. Veja a próxima seção para aprender a usá-las.

## Código

[step] 

### Dados e fator de absorção

[purpose] Guardar os dados do exercício em variáveis com nome e calcular o fator de absorção A.

```
import numpy as np
import matplotlib.pyplot as plt

m = 1.2 # inclinação do equilíbrio y = m x (adimensional)
LG = 1.8 # razão molar líquido/gás, L/G (mol/mol)
R = 0.95 # recuperação desejada (fração, 0.95 = 95 %)

A = LG / m # fator de absorção (adimensional)
print(f"Fator de absorção A = {A:.3f}")
```

[how] import numpy as np carrega a biblioteca de cálculo numérico NumPy e lhe dá o apelido np; o mesmo vale para matplotlib.pyplot, que desenha gráficos, apelidada de plt. Uma linha como m = 1.2 cria uma variável: um nome que guarda um valor. O texto depois de # é comentário e o Python o ignora. No código, o separador decimal é sempre o ponto. O operador / divide. Em f"…{A:.3f}", o f antes das aspas permite colocar uma variável entre chaves; o :.3f pede 3 casas depois da vírgula.

[so-far] O programa agora conhece os dados e imprime o fator de absorção.

[step] 

### Estágios teóricos

[purpose] Isolar N na equação de Kremser para a recuperação desejada, obtendo um número com decimais.

```
# A^(N+1) = (A - R) / (1 - R); o logaritmo isola N
razao = (A - R) / (1 - R)
N = np.log(razao) / np.log(A) - 1 # estágios teóricos (–)
print(f"(A - R)/(1 - R) = {razao:.2f}")
print(f"Estágios teóricos N = {N:.3f}")
```

[how] np.log(x) é o logaritmo natural de x: recebe um número e devolve um número. A razão np.log(razao) / np.log(A) é o expoente N + 1 tal que A elevado a ele vale razao; subtrair 1 dá N. Em {razao:.2f} o formato pede 2 casas decimais.

[so-far] O programa agora imprime a razão e o número de estágios teóricos, ainda com decimais.

[step] 

### Estágios inteiros e recuperação obtida

[purpose] Arredondar o número de estágios para cima e recalcular a recuperação que a coluna real entregará.

```
N_int = int(np.ceil(N)) # estágios a instalar (inteiro)
R_int = (A**(N_int + 1) - A) / (A**(N_int + 1) - 1)
print(f"Estágios a instalar = {N_int}")
print(f"Recuperação com {N_int} estágios = {100 * R_int:.2f} %")
```

[how] np.ceil(x) arredonda x para o inteiro seguinte (para cima), pois arredondar para baixo deixaria a coluna aquém da meta; o resultado ainda é um decimal como 5.0, e int(…) o converte em inteiro. O operador ** é a potência: A**(N_int + 1) é A elevado a N_int + 1. A segunda linha é a equação de Kremser com o número inteiro de estágios. Multiplicar por 100 converte a fração em porcentagem.

[so-far] O programa agora também imprime quantos estágios instalar e a recuperação real, um pouco acima da meta.

[step] 

### Razão L/G mínima

[purpose] Calcular o menor L/G que ainda permite atingir a meta, com infinitos pratos.

```
LG_min = R * m # (L/G) mínimo (mol/mol)
print(f"L/G mínimo = {LG_min:.2f}")
```

[how] É uma multiplicação simples, a fórmula do modelo: R * m. O * multiplica. O formato :.2f pede 2 casas decimais.

[so-far] O programa agora imprime também o L/G mínimo.

[step] 

### Verificação prato a prato

[purpose] Conferir os resultados por um caminho independente da fórmula: percorrer os pratos um a um com a relação yn+1 = y1 + A·yn, sem usar potências nem logaritmos.

```
def recuperacao_por_pratos(A, n_pratos):
 y1 = 1.0 # y no topo (base arbitrária)
 y = y1 # y que sai do prato 1
 for n in range(1, n_pratos + 1):
 y = y1 + A * y # y(n+1) = y1 + A * y(n)
 return (y - y1) / y # (y fundo - y topo) / y fundo

R_check = recuperacao_por_pratos(A, N_int)
R_inf = recuperacao_por_pratos(R, 500)
print(f"Verificação prato a prato: {100 * R_check:.2f} %")
print(f"500 pratos com A = {R}: {100 * R_inf:.2f} %")
```

[how] Um def define uma função própria: recuperacao_por_pratos recebe dois valores, A e n_pratos, e devolve um resultado com return. As linhas recuadas pertencem a ela. O for n in range(1, n_pratos + 1) repete o bloco recuado com n valendo 1, 2, …, n_pratos (o range não inclui o último número, por isso o + 1); a cada volta, y passa de y(n) para y(n+1). Ao final, y é o valor do gás que entra no fundo, e o return aplica a definição de recuperação. A primeira chamada usa o A do exercício e N_int pratos: deve reproduzir R_int. A segunda usa A igual à meta (que é exatamente o L/G mínimo dividido por m) e 500 pratos, como substituto de infinitos: a recuperação deve ficar na meta, confirmando o L/G mínimo.

[so-far] O programa agora confere a recuperação com 5 estágios e a razão mínima por um caminho independente da fórmula fechada.

[step] 

### Gráfico da recuperação

[purpose] Desenhar a recuperação em função do número de estágios, com a meta e a coluna instalada.

```
n = np.linspace(0, 12, 241) # estágios (–)
Rn = (A**(n + 1) - A) / (A**(n + 1) - 1) # recuperação (fração)

plt.plot(n, 100 * Rn, label="Recuperação do soluto")
plt.axhline(100 * R, linestyle="--", color="gray",
 label="Meta de recuperação")
plt.plot(N_int, 100 * R_int, "o", color="black",
 label="Coluna instalada")
plt.xlabel("Número de estágios teóricos (–)")
plt.ylabel("Recuperação do soluto (%)")
plt.legend()
plt.grid(True)
plt.show()
```

[how] 

np.linspace(0, 12, 241) cria uma lista de 241 números igualmente espaçados de 0 a 12: o primeiro e o segundo argumentos são os extremos, o terceiro é a quantidade de pontos (241 dá passo de 0,05 estágio).

A linha de Rn é a mesma equação de Kremser, aplicada de uma vez a todos os valores de n: o NumPy faz a conta ponto a ponto.

plt.plot(x, y, label=…) desenha uma curva: n no eixo horizontal, 100 * Rn no vertical (em %), label é o nome que aparece na legenda.

plt.axhline(y, …) traça uma linha horizontal na altura y, aqui 100 * R; linestyle="--" a faz tracejada, color="gray" a deixa cinza e label a nomeia.

A segunda plt.plot marca um único ponto, (N_int, 100 * R_int); o argumento "o" pede um círculo em vez de linha e color="black" o pinta de preto.

plt.xlabel e plt.ylabel escrevem os rótulos dos eixos, com unidade; plt.legend() mostra a legenda; plt.grid(True) liga a grade; plt.show() abre o gráfico.

[so-far] O programa agora calcula, confere e desenha tudo.

[step] 

### Programa completo

```
import numpy as np
import matplotlib.pyplot as plt

m = 1.2 # inclinação do equilíbrio y = m x (adimensional)
LG = 1.8 # razão molar líquido/gás, L/G (mol/mol)
R = 0.95 # recuperação desejada (fração, 0.95 = 95 %)

A = LG / m # fator de absorção (adimensional)
print(f"Fator de absorção A = {A:.3f}")

# A^(N+1) = (A - R) / (1 - R); o logaritmo isola N
razao = (A - R) / (1 - R)
N = np.log(razao) / np.log(A) - 1 # estágios teóricos (–)
print(f"(A - R)/(1 - R) = {razao:.2f}")
print(f"Estágios teóricos N = {N:.3f}")

N_int = int(np.ceil(N)) # estágios a instalar (inteiro)
R_int = (A**(N_int + 1) - A) / (A**(N_int + 1) - 1)
print(f"Estágios a instalar = {N_int}")
print(f"Recuperação com {N_int} estágios = {100 * R_int:.2f} %")

LG_min = R * m # (L/G) mínimo (mol/mol)
print(f"L/G mínimo = {LG_min:.2f}")

def recuperacao_por_pratos(A, n_pratos):
 y1 = 1.0 # y no topo (base arbitrária)
 y = y1 # y que sai do prato 1
 for n in range(1, n_pratos + 1):
 y = y1 + A * y # y(n+1) = y1 + A * y(n)
 return (y - y1) / y # (y fundo - y topo) / y fundo

R_check = recuperacao_por_pratos(A, N_int)
R_inf = recuperacao_por_pratos(R, 500)
print(f"Verificação prato a prato: {100 * R_check:.2f} %")
print(f"500 pratos com A = {R}: {100 * R_inf:.2f} %")

n = np.linspace(0, 12, 241) # estágios (–)
Rn = (A**(n + 1) - A) / (A**(n + 1) - 1) # recuperação (fração)

plt.plot(n, 100 * Rn, label="Recuperação do soluto")
plt.axhline(100 * R, linestyle="--", color="gray",
 label="Meta de recuperação")
plt.plot(N_int, 100 * R_int, "o", color="black",
 label="Coluna instalada")
plt.xlabel("Número de estágios teóricos (–)")
plt.ylabel("Recuperação do soluto (%)")
plt.legend()
plt.grid(True)
plt.show()
```

Os passos juntos, em ordem, prontos para rodar.

## Resultado

[answer] 

Fator de absorção A = 1,500. Número de estágios teóricos N = 4,914. Estágios a instalar: 5. Recuperação obtida com 5 estágios: R = 95,19%, um pouco acima da meta de 95%. Razão L/G mínima para recuperar 95%: 1,14 mol/mol, contra 1,8 mol/mol usado.

[figura; controles: LG] 

### Onde a curva cruza a meta?

A curva Recuperação do soluto encontra a linha Meta de recuperação em 4,914 estágios, o número teórico. Como só se instalam pratos inteiros, com 5 a curva já está em 95,19%, acima da linha; com um prato a menos, ficaria abaixo dela.

### Por que a curva sobe cada vez mais devagar?

Cada prato absorve uma fração do soluto que ainda resta no gás, e esse resto diminui a cada prato. Como A = 1,5 é maior que 1, a Recuperação do soluto continua crescendo e tende ao total do soluto, sem nunca chegar a ele.

### Leve L/G até 1,14 mol/mol

Com L/G = 1,14, o fator de absorção A fica igual à meta Rd. A Recuperação do soluto deixa de cruzar a linha Meta de recuperação e se achata sob ela, aproximando-se de 95% sem alcançá-la: é o L/G mínimo. O indicador do gráfico passa a avisar que a meta é inalcançável.

[in-your-code] No programa, troque por LG = 1.14. Ele imprime Fator de absorção A = 0.950 e (A - R)/(1 - R) = 0.00; como o logaritmo de zero não existe, N sai infinito e o int(np.ceil(N)) falha com OverflowError. O erro é o aviso de que nenhum número de estágios basta.

 Ficou alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Operações de transferência de massa · equação algébrica

# Absorção em colunas de pratos: estágios pela equação de Kremser

[problem] 

Uma coluna de pratos absorve um soluto diluído de um gás, com um solvente puro, em contracorrente. O equilíbrio é y = 1,2 x, com y e x em mol/mol de soluto nas fases gás e líquido. A razão molar entre líquido e gás é L/G = 1,8, constante. Deseja-se recuperar 95 % do soluto.

o fator de absorção A;

o número de estágios teóricos N, com decimais;

o número inteiro de estágios a instalar;

a recuperação obtida com esse número inteiro, em %;

a razão L/G mínima para essa recuperação.

Cada prato é um estágio: o gás sobe e o líquido desce, e em cada prato o soluto passa de uma fase à outra até o equilíbrio. Ao final, você terá um programa que calcula N pela equação de Kremser, confere o resultado estágio a estágio e desenha a recuperação em função do número de estágios.

## Modelo

### Balanço de massa do soluto A nos n pratos do topo, em mol/h

 ⟦soluto que entra = soluto que sai⟧ 

(princípio) Em regime permanente, sem reação, o soluto não se acumula. O volume de controle são os pratos de 1 a n, do topo até o prato n.

 ⟦G ⋅ y_n + 1 {gás que entra por baixo} + L ⋅ x_0 {líquido que entra por cima} = G ⋅ y_1 {gás que sai pelo topo} + L ⋅ x_n {líquido que sai do prato n}⟧ 

G, L — vazões molares de gás inerte e de solvente, mol/h

yn — fração molar de soluto no gás que sai do prato n, mol/mol

xn — fração molar de soluto no líquido que sai do prato n, mol/mol

(tradução) Cada palavra vira uma vazão de soluto. O prato 1 é o do topo; o gás entra no prato n vindo do prato n+1.

 ⟦x_0 = 0⟧ 

(premissa) O solvente entra puro, como diz o enunciado. Se não fosse, o termo L·x0 não se anularia, e a reta de operação não passaria pela origem.

 ⟦G e L constantes ao longo da coluna⟧ 

(premissa) O enunciado dá a razão L/G constante, e a solução é diluída. Se as vazões variassem, cada prato precisaria de um balanço global próprio.

 ⟦y_n + 1 = y_1 + (L)/(G) ⋅ x_n⟧ 

(álgebra) Dividindo o balanço por G, com x0 = 0. Esta é a reta de operação, que liga o gás e o líquido de cada prato.

 ⟦y_n + 1 = y_1 + A ⋅ y_n⟧ 

A — fator de absorção, A = (L/G)/m, adimensional

(álgebra) Substituindo xn = yn/m, que vem da reta de equilíbrio abaixo. Cada prato repete a mesma relação: esta é uma recorrência, em que o gás de cada prato depende do anterior.

 ⟦y_N + 1 = y_1 ( 1 + A + ⋯ + A^(N) ) = y_1 (A^(N + 1) − 1)/(A − 1)⟧ 

(álgebra) Desenrolando a recorrência, o resultado é a soma de uma progressão geométrica de razão A, com N+1 termos.

[final] 

 ⟦φ = (A^(N + 1) − A)/(A^(N + 1) − 1)⟧ 

φ — fração do soluto recuperada, φ = (yin − yout)/yin, adimensional; a Recuperação da figura é 100·φ

(definição) (álgebra) Com yN+1 = yin e y1 = yout, a razão yout/yin = (A − 1)/(AN+1 − 1) leva a φ.

Esta é a equação de Kremser. Ela relaciona a recuperação, o fator de absorção e o número de estágios. Quando N cresce e A > 1, AN+1 cresce sem limite e φ tende a 1 (100 %). Quando A < 1, AN+1 tende a zero e φ tende a A: com infinitos estágios, a recuperação máxima é A, e a razão mínima satisfaz A = φalvo, ou seja, L/G mínimo = φalvo·m = 0,95 · 1,2 = 1,14.

[eq-block] Reta de equilíbrio: 

 ⟦y = m ⋅ x⟧ 

m — inclinação da reta de equilíbrio, 1,2, mol/mol por mol/mol, adimensional

Em cada prato, o líquido que sai e o gás que sai estão em equilíbrio. O enunciado dá a reta, e ela é usada no passo de substituição acima.

Parâmetro | Valor | Unidade | Fonte | 

m | 1,2 | adimensional | dadoinclinação do equilíbrio | 

L/G | 1,8 | adimensional | dadorazão constante | 

φalvo | 0,95 | adimensional | dado95 % do soluto | 

A | 1,50 | adimensional | calculado(1,8)/(1,2) = 1,50 | 

[technique] 

[technique-name] Solução em forma fechada

Este é um problema algébrico: uma equação relaciona a recuperação, o fator de absorção e o número de estágios, e pede-se o valor de um deles. Para resolver este tipo de problema, usaremos a solução em forma fechada da equação de Kremser, uma fórmula que dá o resultado direto, sem iterar. Ela serve porque a soma dos estágios já foi feita na derivação, e basta isolar N com logaritmos. Em Python, a função que calcula logaritmos é math.log, da biblioteca math. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados e fator de absorção

[purpose] Guardar os dados em variáveis e calcular A.

```
import math # log e ceil
import numpy as np # vetores para o gráfico
import matplotlib.pyplot as plt # gráfico
from scipy.optimize import brentq # busca de raiz (verificação)

m = 1.2 # inclinação da reta de equilíbrio, mol/mol
LG = 1.8 # razão molar L/G, mol/mol
R = 0.95 # recuperação alvo, adimensional

A = LG / m # fator de absorção, adimensional
print(f"Fator de absorção A = {A:.2f}")
```

[how] Cada linha que começa com import carrega uma biblioteca. math traz log (logaritmo natural) e ceil (arredondamento para cima). numpy é o pacote de vetores, e matplotlib.pyplot desenha o gráfico. brentq é uma função de busca de raiz, usada na verificação.

[how] 

m = 1.2: uma variável, com o ponto como separador decimal e a unidade no comentário.

f"... {A:.2f}": um texto em que {A:.2f} é trocado pelo valor de A com 2 casas decimais.

[so-far] O programa calcula A = 1,8/1,2 e imprime 1,50.

[step] 

### Estágios teóricos e instalados

[purpose] Isolar N da equação de Kremser e arredondar para o inteiro acima.

```
N_teo = math.log((A - R) / (1 - R)) / math.log(A) - 1 # estágios
N = math.ceil(N_teo) # instalar
print(f"Estágios teóricos = {N_teo:.2f}")
print(f"Estágios a instalar = {N}")
```

[how] Isolando N em φ = (AN+1 − A)/(AN+1 − 1), obtém-se AN+1 = (A − φ)/(1 − φ). Tomando o logaritmo dos dois lados, N+1 = ln((A − φ)/(1 − φ))/ln A.

[how] 

math.log(x): logaritmo natural de x. Ele recebe a razão entre dois números e devolve um número.

math.ceil(x): o menor inteiro maior ou igual a x. Com 4,91, devolve 5, que é o número de estágios a instalar.

[so-far] O programa imprime 4,91 estágios teóricos e 5 estágios a instalar.

[step] 

### Recuperação com o número inteiro e L/G mínimo

[purpose] Calcular a recuperação com 5 estágios e a razão mínima.

```
R_obt = (A**(N + 1) - A) / (A**(N + 1) - 1) # recuperação, adim.
print(f"Recuperação com {N} estágios = {100 * R_obt:.2f} %")

LG_min = R * m # L/G mínimo, mol/mol
print(f"L/G mínimo = {LG_min:.2f}")
```

[how] O operador ** eleva à potência: A**(N + 1) é AN+1. A linha de LG_min usa a conta da derivação: com infinitos estágios, A = φalvo, logo L/G = φalvo·m.

[how] 

{100 * R_obt:.2f}: converte a fração em % e mostra 2 casas decimais.

[so-far] O programa imprime a recuperação de 95,19 % e o L/G mínimo de 1,14.

[step] 

### Verificação: estágio a estágio e o limite

[purpose] Conferir o resultado por outro caminho, sem usar a fórmula fechada. Um balanço por prato é repetido N vezes e a raiz é buscada com o brentq.

```
def gas_no_fundo(y1):
 """Gás que chega ao fundo, dado o gás que sai do topo (y_in = 1)."""
 y = y1
 for _ in range(N): # um passo por prato
 x = y / m # líquido em equilíbrio com o gás do prato
 y = y1 + LG * x # balanço de soluto dos pratos de cima
 return y

y1 = brentq(lambda v: gas_no_fundo(v) - 1, 0.0, 1.0)
print(f"Verificação: recuperação = {100 * (1 - y1):.2f} %")

A_min = LG_min / m # em L/G mínimo, A = 0.95
N_big = 1000 # "muitos" estágios
R_lim = (A_min**(N_big + 1) - A_min) / (A_min**(N_big + 1) - 1)
print(f"Limite com {N_big} estágios: {100 * R_lim:.2f} %")
```

[how] Uma def cria uma função, nomeada e reutilizável. gas_no_fundo recebe y1, o gás que sai do topo, e devolve o gás que chega ao fundo. O for _ in range(N) repete o bloco N vezes, uma por prato; _ é um nome que não será usado.

[how] 

brentq(f, a, b): procura a raiz de f entre a e b (0 e 1). A função é chamada várias vezes com valores de v entre esses limites e devolve o v em que a diferença é zero. A tolerância padrão é muito menor que as casas decimais impressas, de modo que a raiz está exata para o que se mostra.

lambda v: gas_no_fundo(v) - 1: função sem nome, que recebe v e devolve a diferença entre o gás do fundo e 1. Ela é o argumento que o brentq recebe.

[so-far] A verificação imprime 95,19 %, a mesma recuperação da fórmula, por outro caminho. O limite com 1000 estágios, em L/G mínimo, imprime 95,00 %, confirmando o valor 1,14.

[step] 

### Figura: recuperação contra o número de estágios

[purpose] Desenhar a curva de Kremser e a meta de 95 %, para ver onde a curva cruza a meta.

```
N_s = np.linspace(1, 10, 91) # estágios, 1 a 10
rec = 100 * (A**(N_s + 1) - A) / (A**(N_s + 1) - 1) # em %
fig, ax = plt.subplots()
ax.plot(N_s, rec, label="Recuperação")
ax.plot(N_s, 95 * np.ones_like(N_s), "--", label="Meta (95 %)")
ax.set_xlabel("Número de estágios teóricos")
ax.set_ylabel("Recuperação do soluto (%)")
ax.legend()
plt.show()
```

[how] A função np.linspace(1, 10, 91) devolve 91 valores igualmente espaçados de 1 a 10. Os cálculos com A**(N_s + 1) são feitos para todos os valores de uma vez. ax.plot(x, y, label=…) desenha uma curva, e o "--" a torna tracejada. plt.show() mostra a figura.

[so-far] Uma janela com a curva de recuperação e a linha de meta aparece.

[step] 

### Programa completo

```
import math # log e ceil
import numpy as np # vetores para o gráfico
import matplotlib.pyplot as plt # gráfico
from scipy.optimize import brentq # busca de raiz (verificação)

m = 1.2 # inclinação da reta de equilíbrio, mol/mol
LG = 1.8 # razão molar L/G, mol/mol
R = 0.95 # recuperação alvo, adimensional

A = LG / m # fator de absorção, adimensional
print(f"Fator de absorção A = {A:.2f}")

N_teo = math.log((A - R) / (1 - R)) / math.log(A) - 1 # estágios
N = math.ceil(N_teo) # instalar
print(f"Estágios teóricos = {N_teo:.2f}")
print(f"Estágios a instalar = {N}")

R_obt = (A**(N + 1) - A) / (A**(N + 1) - 1) # recuperação, adim.
print(f"Recuperação com {N} estágios = {100 * R_obt:.2f} %")

LG_min = R * m # L/G mínimo, mol/mol
print(f"L/G mínimo = {LG_min:.2f}")

def gas_no_fundo(y1):
 """Gás que chega ao fundo, dado o gás que sai do topo (y_in = 1)."""
 y = y1
 for _ in range(N): # um passo por prato
 x = y / m # líquido em equilíbrio com o gás do prato
 y = y1 + LG * x # balanço de soluto dos pratos de cima
 return y

y1 = brentq(lambda v: gas_no_fundo(v) - 1, 0.0, 1.0)
print(f"Verificação: recuperação = {100 * (1 - y1):.2f} %")

A_min = LG_min / m # em L/G mínimo, A = 0.95
N_big = 1000 # "muitos" estágios
R_lim = (A_min**(N_big + 1) - A_min) / (A_min**(N_big + 1) - 1)
print(f"Limite com {N_big} estágios: {100 * R_lim:.2f} %")

N_s = np.linspace(1, 10, 91) # estágios, 1 a 10
rec = 100 * (A**(N_s + 1) - A) / (A**(N_s + 1) - 1) # em %
fig, ax = plt.subplots()
ax.plot(N_s, rec, label="Recuperação")
ax.plot(N_s, 95 * np.ones_like(N_s), "--", label="Meta (95 %)")
ax.set_xlabel("Número de estágios teóricos")
ax.set_ylabel("Recuperação do soluto (%)")
ax.legend()
plt.show()
```

Os trechos acima, na ordem, formam o programa completo, pronto para rodar no editor.

## Resultado

[answer] 

Fator de absorção: A = 1,50.

Estágios teóricos: N = 4,91.

Estágios inteiros a instalar: 5.

Recuperação com 5 estágios: 95,19 %.

Razão L/G mínima: 1,14.

[figura; controles: LG] 

### Quantos estágios passam a meta?

A curva Recuperação cruza a linha Meta (95 %) em N = 4,91. Não se instala fração de prato: arredonda-se para cima, e são 5 estágios.

### Com 5 estágios, a meta é atingida?

Sim. Em 5 estágios, a Recuperação é 95,19 %, um pouco acima da Meta (95 %). A folga vem do arredondamento para cima.

### Leve L/G até 1,50

A curva com menos solvente sobe mais devagar, e a meta passa a ser cruzada mais à direita. O número de estágios teóricos sobe para 7,03, e a instalação passa a 8 estágios.

[in-your-code] Na linha LG = 1.8, troque o valor por LG = 1.5. O programa imprime Estágios teóricos = 7,03 e Estágios a instalar = 8.

 Algo ficou pouco claro? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
