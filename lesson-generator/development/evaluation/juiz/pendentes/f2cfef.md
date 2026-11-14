# Pacote f2cfef

Julgue conforme `juiz/JUIZ.md` e grave a resposta em `juiz/respostas/f2cfef.json`.

## Enunciado enviado ao modelo

A constante de velocidade de uma reação de primeira ordem foi medida em cinco temperaturas: 30 °C, 0,0082 min⁻¹; 40 °C, 0,0205 min⁻¹; 50 °C, 0,0512 min⁻¹; 60 °C, 0,1130 min⁻¹; 70 °C, 0,2510 min⁻¹. Ajuste a equação de Arrhenius por regressão linear de ln k contra 1/T (T em kelvin, R = 8,314 J/(mol·K)). Calcule a energia de ativação (kJ/mol), ln A (com A em min⁻¹), o coeficiente de determinação R² do ajuste e a constante de velocidade prevista a 85 °C (min⁻¹).

## Itens a julgar

- `M.bloco1.origem` — equação complementar 1: diz de onde vem e o que afirma _(dica: Lei de Arrhenius)_
- `M.bloco2.origem` — equação complementar 2: diz de onde vem e o que afirma _(dica: Lei de Arrhenius linearizada)_
- `M.simbolo.k` — símbolo k: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.A` — símbolo A: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.E_a` — símbolo E_a: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.R` — símbolo R: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.T` — símbolo T: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.tecnica.tipo` — técnica: diz que tipo de problema matemático é, em palavras comuns
- `M.tecnica.porque` — técnica: diz por que ela serve para este caso
- `M.tecnica.python` — técnica: nomeia a função de Python e a biblioteca _(dica: há um <code>; confirme função e biblioteca)_
- `M.termo.resíduo` — termo de método numérico "resíduo": explicado em palavras comuns na primeira vez que aparece
- `C.funcao.np.array` — passo 1: função de biblioteca np.array(…): explicado o que ela faz e o que recebe
- `C.funcao.np.log` — passo 2: função de biblioteca np.log(…): explicado o que ela faz e o que recebe
- `C.funcao.linregress` — passo 3: função de biblioteca linregress(…): explicado o que ela faz
- `C.arg.linregress.posição1` — passo 3: argumento de linregress, posição 1 (x): o que é e por que tem esse valor
- `C.arg.linregress.posição2` — passo 3: argumento de linregress, posição 2 (y): o que é e por que tem esse valor
- `C.funcao.print` — passo 3: função nativa print(…): explicado o que ela faz e o que recebe
- `C.funcao.round` — passo 3: função nativa round(…): explicado o que ela faz e o que recebe
- `C.funcao.np.exp` — passo 4: função de biblioteca np.exp(…): explicado o que ela faz e o que recebe
- `C.funcao.np.sum` — passo 5: função de biblioteca np.sum(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.plot` — passo 6: função de biblioteca plt.plot(…): explicado o que ela faz
- `C.arg.plt.plot.posição1` — passo 6: argumento de plt.plot, posição 1 (x): o que é e por que tem esse valor
- `C.arg.plt.plot.posição2` — passo 6: argumento de plt.plot, posição 2 (y): o que é e por que tem esse valor
- `C.arg.plt.plot.posição3` — passo 6: argumento de plt.plot, posição 3 ("o"): o que é e por que tem esse valor
- `C.arg.plt.plot.label` — passo 6: argumento de plt.plot, label ("Pontos medidos"): o que é e por que tem esse valor
- `C.funcao.plt.xlabel` — passo 6: função de biblioteca plt.xlabel(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.ylabel` — passo 6: função de biblioteca plt.ylabel(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.legend` — passo 6: função de biblioteca plt.legend(…): explicado o que ela faz
- `C.funcao.plt.show` — passo 6: função de biblioteca plt.show(…): explicado o que ela faz
- `C.construcao.lista` — lista: valores entre colchetes: explicado o que é e o que faz neste programa
- `C.construcao.atributo` — atributo de um objeto, depois do ponto: explicado o que é e o que faz neste programa _(dica: no programa: .intercept, .mean, .rvalue, .slope)_
- `C.construcao.argumento_nomeado` — argumento passado por nome (nome=valor): explicado o que é e o que faz neste programa
- `C.construcao.potencia` — operador ** (potência): explicado o que é e o que faz neste programa
- `C.construcao.import_as` — import … as: o apelido da biblioteca: explicado o que é e o que faz neste programa
- `C.construcao.from_import` — from … import: trazer uma função pelo nome: explicado o que é e o que faz neste programa
- `C.verificacao.presente` — o programa faz uma verificação do resultado e a lição a explica
- `C.verificacao.independente` — a verificação é independente: não reusa a relação que produziu o resultado _(dica: marque faltou se não houver verificação)_
- `R.leitura1.ancorada` — observação 1 (Quão bem a reta passa pelos cinco pontos?): cita um valor ou trecho da curva deste exercício; não serviria a outro
- `R.leitura2.ancorada` — observação 2 (Qual o significado da inclinação?): cita um valor ou trecho da curva deste exercício; não serviria a outro
- `R.leitura3.ancorada` — observação 3 (Quanto k cresce de 30 °C a 70 °C?): cita um valor ou trecho da curva deste exercício; não serviria a outro
- `R.leitura4.ancorada` — observação 4 (Quão coerente é a previsão a 85 °C?): cita um valor ou trecho da curva deste exercício; não serviria a outro

## Lição

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
