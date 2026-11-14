# Comparação befa4f

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/befa4f.json`.

# Enunciado enviado ao modelo

A constante de velocidade de uma reação de primeira ordem foi medida em cinco temperaturas: 30 °C, 0,0082 min⁻¹; 40 °C, 0,0205 min⁻¹; 50 °C, 0,0512 min⁻¹; 60 °C, 0,1130 min⁻¹; 70 °C, 0,2510 min⁻¹. Ajuste a equação de Arrhenius por regressão linear de ln k contra 1/T (T em kelvin, R = 8,314 J/(mol·K)). Calcule a energia de ativação (kJ/mol), ln A (com A em min⁻¹), o coeficiente de determinação R² do ajuste e a constante de velocidade prevista a 85 °C (min⁻¹).


==================== LIÇÃO 1 ====================

Cinética química · regressão linear

# Equação de Arrhenius

[problem] 

A constante de velocidade k de uma reação de primeira ordem foi medida em cinco temperaturas: 30 °C, 0,0082 min⁻¹; 40 °C, 0,0205 min⁻¹; 50 °C, 0,0512 min⁻¹; 60 °C, 0,1130 min⁻¹; 70 °C, 0,2510 min⁻¹. A equação de Arrhenius deve ser ajustada por regressão linear de ln k contra 1/T, com T em kelvin e R = 8,314 J/(mol·K).

A energia de ativação Ea, em kJ/mol.

O logaritmo do fator pré-exponencial, ln A, com A em min⁻¹.

O coeficiente de determinação R² do ajuste.

A constante de velocidade prevista a 85 °C, em min⁻¹.

Quando a temperatura sobe, a reação acelera de forma exponencial, e a equação de Arrhenius descreve essa aceleração com apenas dois parâmetros. Ao final, você terá um programa que transforma cinco medições em uma reta, extrai dela os dois parâmetros, mede a qualidade do ajuste e prevê a constante de velocidade em uma temperatura que não foi medida.

## Modelo

[eq-block] Equação de Arrhenius: 

 ⟦k = A ⋅ exp ( − (E_a )/(R ⋅ T) )⟧ 

k — constante de velocidade da reação de primeira ordem, em min⁻¹

A — fator pré-exponencial, a constante de velocidade que se teria com temperatura infinita, em min⁻¹

Ea — energia de ativação, a barreira de energia que as moléculas precisam vencer para reagir, em J/mol

R — constante dos gases, 8,314 J/(mol·K)

T — temperatura absoluta em que k foi medida, em K

A lei de Arrhenius é dada pelo enunciado, não é deduzida de um balanço. Ela diz que k cresce com T e que esse crescimento é mais forte quanto maior for Ea.

[eq-block] Linearização: 

 ⟦ln k {y} = ln A {intercepto} + ( − (E_a )/(R) ) {inclinação} ⋅ (1)/(T) {x}⟧ 

x = 1/T — inverso da temperatura absoluta, em K⁻¹

y = ln k — logaritmo natural da constante de velocidade, sem unidade (com k em min⁻¹)

a = ln A — intercepto da reta, sem unidade

b = −Ea/R — inclinação da reta, em K

Aplicando o logaritmo natural aos dois lados da lei de Arrhenius, o produto vira soma (ln(A·eu) = ln A + u) e a exponencial desaparece. O resultado é a equação de uma reta, y = a + b·x. Assim, a inclinação fornece Ea = −b·R e o intercepto fornece ln A diretamente.

[eq-block] Mínimos quadrados: 

 ⟦b = (∑ ( x_i − x {¯} ) ( y_i − y {¯} ))/(∑ ( x_i − x {¯} )^(2) ) , a = y {¯} − b ⋅ x {¯}⟧ 

x̄, ȳ — médias dos cinco valores de x e de y

xi, yi — par de ordem i (de 1 a 5), isto é, 1/T e ln k da i-ésima medição

Entre todas as retas possíveis, a de mínimos quadrados é a que torna mínima a soma dos quadrados das distâncias verticais entre os pontos e a reta. Essa condição tem solução em fórmula fechada, que é a mostrada acima.

[eq-block] Coeficiente de determinação: 

 ⟦R^(2) = 1 − (∑ ( y_i − y {^} i )^(2) {resíduo da reta} )/(∑ ( y_i − y {¯} )^(2) {variação total} )⟧ 

ŷi — valor de ln k dado pela reta ajustada em xi, sem unidade

O numerador mede o que a reta não explica; o denominador, quanto os dados variam em torno da média. Se a reta passa por todos os pontos, o numerador é zero e R² = 1; se a reta não explica nada além da média, R² = 0. Nota: R² (ajuste) e R (constante dos gases) são grandezas diferentes.

Parâmetro | Valor | Unidade | Fonte | 

R | 8,314 | J/(mol·K) | dadono enunciado | 

T medidas | 30, 40, 50, 60, 70 | °C | dadono enunciado | 

k medidas | 0,0082; 0,0205; 0,0512; 0,1130; 0,2510 | min⁻¹ | dadono enunciado | 

conversão °C → K | 273,15 | K | constante físicaT(K) = T(°C) + 273,15 | 

T de previsão | 85 | °C | dadono enunciado | 

[technique] 

[technique-name] Regressão linear

Temos cinco pontos que, depois de linearizados, devem ficar sobre uma reta, mas que contêm erro de medição e por isso não caem exatamente nela. Para esse tipo de problema, usaremos a regressão linear por mínimos quadrados, que encontra a reta que fica o mais perto possível de todos os pontos ao mesmo tempo. Ela se encaixa aqui porque a linearização transformou a equação de Arrhenius em y = a + b·x, e uma reta tem fórmula fechada, sem iterações; o método numérico serve só de verificação. Em Python, a função que faz isso é np.polyfit, da biblioteca NumPy. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados e linearização

[purpose] Guardar as medições em vetores e calcular as duas grandezas que formam a reta: 1/T e ln k.

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import linregress

R = 8.314 # constante dos gases, J/(mol·K)
T_C = np.array([30, 40, 50, 60, 70]) # temperatura, °C
k = np.array([0.0082, 0.0205, 0.0512, 0.1130, 0.2510]) # 1/min

T = T_C + 273.15 # temperatura absoluta, K
x = 1 / T # abscissa do ajuste, 1/K
y = np.log(k) # ordenada do ajuste, ln(1/min)
```

[how] import traz uma biblioteca; as np dá a ela o apelido curto np. np.array([...]) cria um vetor a partir de uma lista entre colchetes: operações com ele valem para todos os elementos de uma vez, e por isso T_C + 273.15 soma 273,15 a cada temperatura e 1 / T inverte cada uma. np.log(k) é o logaritmo natural (base e), também elemento a elemento. O texto depois de # é comentário e o Python o ignora. Em código, o separador decimal é sempre o ponto.

[so-far] O programa agora tem os cinco pontos (x, y) prontos para receber a reta.

[step] 

### Ajuste da reta

[purpose] Pedir ao NumPy a reta de mínimos quadrados que passa pelos pontos.

```
slope, intercept = np.polyfit(x, y, 1) # y = intercept + slope*x
```

[how] 

np.polyfit(x, y, 1) ajusta um polinômio por mínimos quadrados.

x — vetor das abscissas, 1/T.

y — vetor das ordenadas, ln k, na mesma ordem e com o mesmo tamanho de x.

1 — grau do polinômio. Grau 1 é uma reta; ela é o que a linearização prevê.

A função devolve os coeficientes do maior grau para o menor, isto é, [inclinação, intercepto]. A atribuição slope, intercept = ... é um desempacotamento: o primeiro valor da lista vai para slope e o segundo para intercept.

[so-far] O programa agora conhece a inclinação b e o intercepto a, mas ainda não imprime nada.

[step] 

### Parâmetros de Arrhenius e qualidade do ajuste

[purpose] Converter inclinação e intercepto em Ea e ln A, e medir quão bem a reta representa os dados.

```
Ea = -slope * R / 1000 # energia de ativação, kJ/mol
lnA = intercept # ln(A), com A em 1/min

y_fit = intercept + slope * x # ln k dado pela reta
ss_res = np.sum((y - y_fit)**2) # o que a reta não explica
ss_tot = np.sum((y - np.mean(y))**2) # variação total de y
R2 = 1 - ss_res / ss_tot

print(f"inclinação = {slope:.1f} K")
print(f"Ea = {Ea:.2f} kJ/mol")
print(f"ln A = {lnA:.4f}")
print(f"R² = {R2:.5f}")
```

[how] -slope * R aplica Ea = −b·R, em J/mol; a divisão por 1000 converte para kJ/mol. np.sum(...) soma todos os elementos de um vetor; np.mean(y) é a média de y; **2 eleva ao quadrado cada elemento. ss_res e ss_tot são o numerador e o denominador da fórmula de R². Em print(f"..."), o f antes das aspas permite inserir valores entre chaves; :.2f mostra 2 casas decimais em ponto fixo, :.4f mostra 4, :.5f mostra 5 e :.1f mostra 1. Usamos 5 casas em R² porque ele fica muito perto de 1 e menos casas esconderiam a diferença.

[so-far] O programa agora imprime Ea, ln A e R².

[step] 

### Previsão em outra temperatura

[purpose] Usar a reta ajustada para calcular k em 85 °C, onde não há medição.

```
T_pred_C = 85 # temperatura de previsão, °C
T_pred = T_pred_C + 273.15 # em kelvin
k_pred = np.exp(lnA + slope / T_pred) # 1/min
print(f"k({T_pred_C} °C) = {k_pred:.4f} 1/min")
```

[how] np.exp é a exponencial eu, que desfaz o logaritmo: a reta fornece ln k = a + b/T, e a exponencial recupera k. Dentro das chaves do f"...", {T_pred_C} sem formato escreve o valor como está.

[so-far] O programa agora também imprime a constante prevista a 85 °C.

[step] 

### Verificação independente

[purpose] Confirmar o resultado por dois caminhos que não repetem a conta de np.polyfit.

```
res = linregress(x, y) # outra rotina de regressão
print(f"linregress: Ea = {-res.slope*R/1000:.2f} kJ/mol,"
 f" R² = {res.rvalue**2:.5f}")

# Ea só com os extremos (30 °C e 70 °C): reta por 2 pontos
Ea_ext = R * np.log(k[-1] / k[0]) / (x[0] - x[-1]) / 1000
print(f"Ea (extremos) = {Ea_ext:.2f} kJ/mol")
```

[how] linregress(x, y) recebe os dois vetores e devolve um objeto com vários resultados; o atributo res.slope é a inclinação e res.rvalue é o coeficiente de correlação r, cujo quadrado é o R² de uma reta. Os índices k[-1] e k[0] pegam o último e o primeiro elementos do vetor (70 °C e 30 °C); em Python, a contagem começa em 0 e o índice −1 é o último. A segunda conta usa apenas a inclinação da reta que passa pelos dois pontos extremos, Ea = R·ln(k70/k30)/(1/T30 − 1/T70). Como os pontos quase alinham, esse valor deve ficar muito próximo do ajuste com os cinco pontos.

[so-far] O programa agora confirma Ea e R²: os valores impressos coincidem com os do passo anterior.

[step] 

### Gráfico dos dados e da reta

[purpose] Desenhar ln k contra 1000/T, com as medições e a reta ajustada estendida até a temperatura de previsão.

```
x_fit = np.linspace(1/T_pred, x[0], 50) # de 85 °C a 30 °C
plt.plot(1000*x, y, "o", label="Medições")
plt.plot(1000*x_fit, intercept + slope*x_fit, label="Ajuste")
plt.xlabel("1000/T (1000/K)")
plt.ylabel("ln k (k em 1/min)")
plt.legend()
plt.show()
```

[how] 

np.linspace(a, b, 50) cria 50 valores igualmente espaçados de a a b; aqui, de 1/T a 85 °C até 1/T a 30 °C, o que desenha a reta também além dos dados.

plt.plot(x, y, "o", label=...) — x e y são as coordenadas; "o" pede só círculos, sem ligar os pontos; label é o nome que aparece na legenda.

Na segunda chamada, sem formato, os pontos são ligados por uma linha. Multiplicamos x por 1000 apenas para que os números do eixo fiquem em torno de 3, mais legíveis.

plt.xlabel e plt.ylabel escrevem os rótulos dos eixos, com unidade; plt.legend() mostra a legenda; plt.show() abre a janela com o gráfico.

[so-far] O programa agora termina mostrando o gráfico.

[step] 

### Programa completo

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import linregress

R = 8.314 # constante dos gases, J/(mol·K)
T_C = np.array([30, 40, 50, 60, 70]) # temperatura, °C
k = np.array([0.0082, 0.0205, 0.0512, 0.1130, 0.2510]) # 1/min

T = T_C + 273.15 # temperatura absoluta, K
x = 1 / T # abscissa do ajuste, 1/K
y = np.log(k) # ordenada do ajuste, ln(1/min)

slope, intercept = np.polyfit(x, y, 1) # y = intercept + slope*x

Ea = -slope * R / 1000 # energia de ativação, kJ/mol
lnA = intercept # ln(A), com A em 1/min

y_fit = intercept + slope * x # ln k dado pela reta
ss_res = np.sum((y - y_fit)**2) # o que a reta não explica
ss_tot = np.sum((y - np.mean(y))**2) # variação total de y
R2 = 1 - ss_res / ss_tot

print(f"inclinação = {slope:.1f} K")
print(f"Ea = {Ea:.2f} kJ/mol")
print(f"ln A = {lnA:.4f}")
print(f"R² = {R2:.5f}")

T_pred_C = 85 # temperatura de previsão, °C
T_pred = T_pred_C + 273.15 # em kelvin
k_pred = np.exp(lnA + slope / T_pred) # 1/min
print(f"k({T_pred_C} °C) = {k_pred:.4f} 1/min")

res = linregress(x, y) # outra rotina de regressão
print(f"linregress: Ea = {-res.slope*R/1000:.2f} kJ/mol,"
 f" R² = {res.rvalue**2:.5f}")

# Ea só com os extremos (30 °C e 70 °C): reta por 2 pontos
Ea_ext = R * np.log(k[-1] / k[0]) / (x[0] - x[-1]) / 1000
print(f"Ea (extremos) = {Ea_ext:.2f} kJ/mol")

x_fit = np.linspace(1/T_pred, x[0], 50) # de 85 °C a 30 °C
plt.plot(1000*x, y, "o", label="Medições")
plt.plot(1000*x_fit, intercept + slope*x_fit, label="Ajuste")
plt.xlabel("1000/T (1000/K)")
plt.ylabel("ln k (k em 1/min)")
plt.legend()
plt.show()
```

Os passos juntos, em ordem, formam o programa pronto para rodar.

## Resultado

[answer] 

Energia de ativação: Ea = 73,98 kJ/mol. Logaritmo do fator pré-exponencial: ln A = 24,5447 (A em min⁻¹). Coeficiente de determinação: R² = 0,99987. Constante de velocidade prevista a 85 °C: k = 0,7399 min⁻¹.

[figura; controles: Tp] 

### Os pontos medidos ficam sobre a reta?

Ficam, com desvios muito pequenos: R² = 0,99987. Isso confirma que ln k medido varia linearmente com 1/T, ou seja, que a equação de Arrhenius descreve bem esta reação entre 30 °C e 70 °C.

### Por que o gráfico cai da esquerda para a direita?

O eixo horizontal é 1000/T, então a esquerda é a temperatura alta. Nela, ln k medido é maior e a reta de ajuste sobe. A inclinação negativa, −8898,6 K, vem de −Ea/R.

### O valor de Ea depende de todos os pontos?

Pouco. Usar só os extremos, 30 °C e 70 °C, dá 73,98 kJ/mol, o mesmo valor do ajuste com cinco pontos (73,98 kJ/mol). Quando os dados são bons, qualquer par de pontos distantes conta a mesma história.

### Leve a temperatura de previsão até 100 °C

A reta de ajuste se estende para a esquerda, para além dos pontos medidos, e o valor de k lido no gráfico sobe de 0,7399 min⁻¹ (85 °C) para 2,0089 min⁻¹. Isso é extrapolação: só vale se a reação continuar seguindo Arrhenius fora da faixa de 30 °C a 70 °C medida.

[in-your-code] No programa, troque T_pred_C = 85 por T_pred_C = 100. A linha impressa passa a ser k(100 °C) = 2.0089 1/min, e a reta do gráfico se estende até 100 °C.

 Alguma dúvida? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Cinética química · ajuste de reta por mínimos quadrados

# Ajuste de Arrhenius por regressão linear

[problem] 

A constante de velocidade k de uma reação de primeira ordem foi medida em cinco temperaturas: 30 °C, 0,0082 min⁻¹; 40 °C, 0,0205 min⁻¹; 50 °C, 0,0512 min⁻¹; 60 °C, 0,1130 min⁻¹; 70 °C, 0,2510 min⁻¹. Ajuste a equação de Arrhenius por regressão linear de ln k contra 1/T, com T em kelvin e R = 8,314 J/(mol·K).

Calcular a energia de ativação Ea, em kJ/mol.

Calcular ln A, com A em min⁻¹.

Calcular o coeficiente de determinação R² do ajuste.

Calcular a constante de velocidade prevista a 85 °C, em min⁻¹.

Uma reação química ganha velocidade quando a temperatura sobe, e a lei de Arrhenius descreve essa dependência. Ao final, você terá um programa que lê as cinco medidas, ajusta a lei aos dados, mostra a qualidade do ajuste e prevê a constante em outra temperatura.

## Modelo

[eq-block] Lei de Arrhenius: 

 ⟦k = A ⋅ exp ( − (E_a )/(R ⋅ T) )⟧ 

k — constante de velocidade, em min⁻¹

A — fator pré-exponencial, em min⁻¹

Ea — energia de ativação, em J/mol

R — constante dos gases, 8,314 J/(mol·K)

T — temperatura absoluta, em kelvin

A lei diz que k cresce de forma exponencial com T: quanto maior Ea, mais sensível a reação é a uma mudança de temperatura. Não é um balanço, então não há derivação: é uma lei dada, que vamos usar na forma linear.

[eq-block] Lei de Arrhenius linearizada: 

 ⟦ln k = ln A − (E_a )/(R) ⋅ (1)/(T)⟧ 

Tomando o logaritmo natural dos dois lados, o produto vira soma e o exponencial desaparece: ln k = ln A − (Ea/R)·(1/T). Comparando com a reta y = b + m·x, temos y = ln k, x = 1/T, b = ln A e m = −Ea/R. Logo, a regressão linear de ln k contra 1/T entrega a inclinação e o intercepto, e deles saem Ea e ln A.

Parâmetro | Valor | Unidade | Fonte | 

R | 8,314 | J/(mol·K) | constanteconstante dos gases | 

conversão de °C para K | 273,15 | K | constante0 °C = 273,15 K | 

temperatura de previsão | 85 | °C | dadopedida no enunciado; em kelvin, 85 + 273,15 = 358,15 K | 

[technique] 

[technique-name] Ajuste por mínimos quadrados

Temos cinco pontos medidos que não caem exatamente numa reta, e queremos a reta que melhor os representa. Para resolver esse tipo de problema, vamos usar a regressão linear por mínimos quadrados, que escolhe a reta que torna mínima a soma dos quadrados dos resíduos (as distâncias verticais entre cada ponto e a reta). É uma conta direta, sem tentativa e erro, e serve aqui porque a lei de Arrhenius, depois do logaritmo, é uma reta em 1/T. Em Python, a função que faz isso é linregress, da biblioteca scipy.stats. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados do experimento

[purpose] Guardar as medidas em vetores, para que o Python faça as contas sobre todas de uma vez.

```
import numpy as np # vetores e funções matemáticas

# Dados medidos
T_C = np.array([30, 40, 50, 60, 70]) # °C
k = np.array([0.0082, 0.0205, 0.0512, 0.1130, 0.2510]) # 1/min
R = 8.314 # J/(mol·K)
```

[how] 

import numpy as np traz a biblioteca NumPy para o programa, com o apelido np, que se usa em todas as funções dela.

np.array([...]) cria um vetor numérico a partir da lista entre colchetes. Ele tem cinco posições, uma por temperatura, na mesma ordem: T_C[0] é 30 e k[0] é 0.0082. A posição começa em zero, por isso [0] é o primeiro elemento.

# começa um comentário: o Python ignora o texto até o fim da linha. O ponto é o separador decimal no código.

[so-far] Os dados estão no programa, prontos para os cálculos.

[step] 

### Linearização: reta de ln k contra 1/T

[purpose] Transformar os dados nas variáveis da reta: x = 1/T e y = ln k.

```
# Linearização: ln k = ln A - (Ea/R)·(1/T)
T = T_C + 273.15 # temperatura absoluta, K
x = 1 / T # 1/K
y = np.log(k) # ln k, com k em 1/min
```

[how] 

T_C + 273.15 soma 273,15 a cada elemento do vetor, de uma vez, dando a temperatura em kelvin.

1 / T divide 1 por cada elemento de T, gerando um vetor de inversos.

np.log(k) calcula o logaritmo natural de cada elemento de k.

[so-far] x e y são os cinco pares de pontos da reta.

[step] 

### Ajuste da reta e dos parâmetros

[purpose] Achar a reta que melhor passa pelos pontos e, dela, tirar Ea e ln A.

```
from scipy.stats import linregress # regressão linear

res = linregress(x, y) # reta y = intercepto + inclinação·x
Ea = -res.slope * R / 1000 # energia de ativação, kJ/mol
lnA = res.intercept # ln A, com A em 1/min

print("Inclinação:", round(res.slope, 2), "K")
print("Energia de ativação:", round(Ea, 2), "kJ/mol")
print("ln A:", round(lnA, 2))
```

[how] 

from scipy.stats import linregress traz a função de regressão linear da biblioteca SciPy, sem precisar escrever o nome completo.

linregress(x, y) recebe dois vetores: x, os valores de 1/T (a variável independente), e y, os valores de ln k (a variável dependente). Ela devolve um objeto, aqui chamado res, que guarda o resultado em três atributos.

res.slope é o atributo com a inclinação da reta (em K). Um atributo se lê com ponto: o nome do objeto, um ponto e o nome da informação.

res.intercept é o intercepto, isto é, o valor de ln k quando 1/T é zero. Ele é ln A.

res.rvalue é o coeficiente de correlação r, que será usado na conferência.

-res.slope * R / 1000 aplica m = −Eₐ/R, isolando Eₐ = −m·R; a divisão por 1000 converte J/mol em kJ/mol.

print(texto, valor, unidade) escreve os itens separados por espaço. round(valor, 2) arredonda para 2 casas decimais.

[so-far] Os três parâmetros estão calculados e impressos.

[step] 

### Previsão em 85 °C

[purpose] Usar a lei de Arrhenius, com os parâmetros ajustados, para calcular k numa temperatura que não foi medida.

```
T85 = 85 + 273.15 # 85 °C em kelvin
k85 = np.exp(lnA - Ea * 1000 / (R * T85)) # 1/min
print("k a 85 °C:", round(k85, 4), "1/min")
```

[how] 

85 + 273.15 converte a temperatura pedida para kelvin, a unidade que a lei exige.

Ea * 1000 / (R * T85) é Eₐ/(R·T), com Eₐ em J/mol, para que as unidades batam com R.

np.exp(x) calcula o exponencial de x. Aqui o expoente é ln A − Eₐ/(R·T), e o exponencial devolve k.

[so-far] A constante prevista está impressa com 4 casas decimais.

[step] 

### Conferência do R² pelos resíduos

[purpose] Calcular o R² por outro caminho, para confirmar o valor que linregress dá.

```
y_reta = res.intercept + res.slope * x # o que a reta prevê em cada T
ss_res = np.sum((y - y_reta) ** 2) # soma dos quadrados dos resíduos
ss_tot = np.sum((y - y.mean()) ** 2) # variação total de ln k
print("R² pelos resíduos:", round(1 - ss_res / ss_tot, 5))
print("R² do linregress:", round(res.rvalue ** 2, 5))
```

[how] 

y - y_reta é o resíduo de cada ponto: o valor medido menos o valor da reta.

** 2 eleva cada elemento ao quadrado; np.sum(...) soma todos os elementos do vetor.

y.mean() é a média de y. ss_tot mede quanto ln k varia em torno dessa média.

1 - ss_res / ss_tot é a definição de R²: a fração da variação de ln k que a reta explica.

res.rvalue ** 2 eleva ao quadrado o r do linregress. A conta acima não usa esse valor, por isso confirma o resultado.

[so-far] Os dois R² saem iguais: o ajuste está conferido.

[step] 

### Figura dos pontos e da reta

[purpose] Desenhar os cinco pontos e a reta do ajuste, para ver o resultado.

```
import matplotlib.pyplot as plt # gráficos

plt.plot(x, y, "o", label="Pontos medidos")
plt.plot(x, y_reta, "-", label="Reta do ajuste")
plt.xlabel("1/T (1/K)")
plt.ylabel("ln k (k em 1/min)")
plt.legend()
plt.show()
```

[how] 

plt.plot(x, y, "o", ...) desenha os pontos: o terceiro argumento, "o", pede um círculo em cada ponto, sem linha.

plt.plot(x, y_reta, "-", ...) desenha a reta: "-" pede uma linha contínua.

label="..." dá o nome de cada série, que aparece na legenda.

plt.xlabel e plt.ylabel escrevem os nomes dos eixos, com a unidade; plt.legend() escreve a legenda; plt.show() mostra a figura.

[so-far] A figura aparece no editor, com os pontos e a reta.

[step] 

### Programa completo

```
import numpy as np # vetores e funções matemáticas

# Dados medidos
T_C = np.array([30, 40, 50, 60, 70]) # °C
k = np.array([0.0082, 0.0205, 0.0512, 0.1130, 0.2510]) # 1/min
R = 8.314 # J/(mol·K)

# Linearização: ln k = ln A - (Ea/R)·(1/T)
T = T_C + 273.15 # temperatura absoluta, K
x = 1 / T # 1/K
y = np.log(k) # ln k, com k em 1/min

from scipy.stats import linregress # regressão linear

res = linregress(x, y) # reta y = intercepto + inclinação·x
Ea = -res.slope * R / 1000 # energia de ativação, kJ/mol
lnA = res.intercept # ln A, com A em 1/min

print("Inclinação:", round(res.slope, 2), "K")
print("Energia de ativação:", round(Ea, 2), "kJ/mol")
print("ln A:", round(lnA, 2))

T85 = 85 + 273.15 # 85 °C em kelvin
k85 = np.exp(lnA - Ea * 1000 / (R * T85)) # 1/min
print("k a 85 °C:", round(k85, 4), "1/min")

y_reta = res.intercept + res.slope * x # o que a reta prevê em cada T
ss_res = np.sum((y - y_reta) ** 2) # soma dos quadrados dos resíduos
ss_tot = np.sum((y - y.mean()) ** 2) # variação total de ln k
print("R² pelos resíduos:", round(1 - ss_res / ss_tot, 5))
print("R² do linregress:", round(res.rvalue ** 2, 5))

import matplotlib.pyplot as plt # gráficos

plt.plot(x, y, "o", label="Pontos medidos")
plt.plot(x, y_reta, "-", label="Reta do ajuste")
plt.xlabel("1/T (1/K)")
plt.ylabel("ln k (k em 1/min)")
plt.legend()
plt.show()
```

As seis partes, em ordem, formam o programa completo: é só executá-lo.

## Resultado

[answer] 

Energia de ativação: Ea = 73,98 kJ/mol.

Fator pré-exponencial: ln A = 24,54, com A em min⁻¹.

Coeficiente de determinação: R² = 0,99987.

Constante de velocidade prevista a 85 °C: k = 0,7399 min⁻¹.

### Pontos medidos e reta do ajuste

[figura; controles: nenhum] 

### Quão bem a reta passa pelos cinco pontos?

Muito bem: com R² = 0,99987, a reta do ajuste acompanha os pontos medidos de 30 °C a 70 °C, e quase toda a variação de ln k é explicada pela reta.

### Qual o significado da inclinação?

A inclinação é m = −8898,57 K. Como m = −Ea/R, a energia de ativação é 73,98 kJ/mol. A reta desce da esquerda para a direita porque ln k aumenta quando 1/T diminui, isto é, quando a temperatura sobe.

### Quanto k cresce de 30 °C a 70 °C?

A constante de velocidade sobe de 0,0082 min⁻¹ para 0,2510 min⁻¹ entre 30 °C e 70 °C: o valor a 70 °C é mais de vinte vezes o de 30 °C, em apenas 40 °C de aumento de temperatura.

### Quão coerente é a previsão a 85 °C?

A constante prevista, 0,7399 min⁻¹, é maior que 0,2510 min⁻¹ a 70 °C, como deve ser: a reação acelera com a temperatura, e 85 °C fica fora do intervalo medido, de 30 °C a 70 °C: é uma previsão por extrapolação, e vale enquanto a lei continuar válida ali.

 Algo ficou pouco claro? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
