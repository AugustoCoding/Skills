# Comparação ae70ea

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/ae70ea.json`.

# Enunciado enviado ao modelo

Ar úmido está a 32 °C, com umidade relativa de 55% e pressão total de 101,325 kPa. A pressão de vapor da água é dada por log10 Psat = 8,07131 − 1730,63/(233,426 + T), com Psat em mmHg e T em °C (760 mmHg = 101,325 kPa). Calcule a umidade absoluta (kg de água por kg de ar seco), a temperatura de orvalho (°C) e a entalpia do ar, h = 1,006 T + W (2501 + 1,86 T), em kJ por kg de ar seco. Se esse ar for resfriado até 15 °C e sair saturado, quanta água condensa, em gramas por kg de ar seco?


==================== LIÇÃO 1 ====================

Termodinâmica · cálculo direto de propriedades do ar úmido

# Ar úmido e condensação por resfriamento

[problem] 

Ar úmido está a T = 32 °C, com umidade relativa φ = 55% e pressão total P = 101,325 kPa (760 mmHg). A pressão de vapor da água é dada por log₁₀ Psat = 8,07131 − 1730,63/(233,426 + T), com Psat em mmHg e T em °C.

Calcule a umidade absoluta W, em kg de água por kg de ar seco.

Calcule a temperatura de orvalho, em °C.

Calcule a entalpia do ar, h = 1,006 T + W(2501 + 1,86 T), em kJ por kg de ar seco.

Se esse ar for resfriado até 15 °C e sair saturado, quanta água condensa, em gramas por kg de ar seco?

Ao resfriar o ar, a água nele contida se torna líquida quando a temperatura desce até o orvalho. No fim, você terá um programa que calcula a umidade, o orvalho, a entalpia e a água condensada, e desenha a curva que explica o resultado.

## Modelo

### Balanço de massa de água, em kg por kg de ar seco

 ⟦water in = water out as vapor + water out as liquid⟧ 

(princípio) A água não some: a que entra no ar sai como vapor ou como líquido. O volume de controle é o ar dentro da serpentina, por kg de ar seco.

 ⟦W {water in} = W_s {water out as vapor} + W_c {water out as liquid}⟧ 

W — umidade absoluta do ar que entra a 32 °C, kg de água por kg de ar seco

Ws — umidade absoluta de saturação a 15 °C, a que o ar pode reter como vapor na saída, kg/kg

Wc — água que sai como líquido (condensada), kg/kg

(tradução) Cada palavra vira uma quantidade de água por kg de ar seco.

 ⟦W_s = W_sat ( 15 °C )⟧ 

(premissa) O ar sai saturado, como diz o enunciado. Se não saísse, a saída teria mais vapor do que a saturação permite, e menos água condensaria: o resultado sairia menor.

 ⟦liquid leaves the air at once⟧ 

(premissa) O líquido sai do ar assim que se forma. Se ficasse suspenso no ar, continuaria contando como água no balanço e a umidade do ar não cairia.

[final] 

 ⟦W_c {condensed water} = W {humidity at inlet} − W_s {saturation at outlet}⟧ 

(álgebra) Isolamos o termo de líquido do balanço da etapa 2.

A água que condensa é o excesso da umidade de entrada sobre a umidade que o ar, já saturado a 15 °C, consegue manter. O balanço se fecha: o que entra está no vapor que sai e no líquido que se separa.

[eq-block] Equação de Antoine: 

 ⟦log 10 P_sat = 8,07131 − (1730,63)/(233,426 + T)⟧ 

Psat — pressão de saturação da água, em mmHg

T — temperatura, em °C

Dada pelo enunciado. Relaciona a pressão em que a água evapora com a temperatura.

[eq-block] Pressão parcial do vapor: 

 ⟦p_v = φ ⋅ P_sat⟧ 

φ — umidade relativa, a fração do vapor que o ar já tem em relação à saturação

pv — pressão parcial do vapor no ar, em mmHg

A umidade relativa é a razão entre a pressão de vapor do ar e a de saturação, na mesma temperatura.

[eq-block] Umidade absoluta: 

 ⟦W = 0,622 ⋅ (p_v )/(P − p_v )⟧ 

W — umidade absoluta do ar, kg de água por kg de ar seco

P — pressão total do ar, em mmHg

Vem da razão entre as massas molares da água (18,02) e do ar seco (28,97), 0,622, e da pressão parcial do vapor. Com Psat no lugar de pv, o mesmo cálculo dá a umidade de saturação Ws.

[eq-block] Entalpia do ar úmido: 

 ⟦h = 1,006 ⋅ T + W ( 2501 + 1,86 ⋅ T )⟧ 

h — entalpia do ar, por kg de ar seco, em kJ/kg

Dada pelo enunciado: soma o calor sensível do ar seco ao calor do vapor de água contido nele.

Parâmetro | Valor | Unidade | Fonte | 

T | 32 | °C | dadotemperatura do ar | 

φ | 0,55 | adimensional | dado55% | 

P | 760 | mmHg | dado101,325 kPa = 760 mmHg | 

T2 | 15 | °C | dadotemperatura final do resfriamento | 

A, B, C de Antoine | 8,07131; 1730,63; 233,426 | — | dadoequação da pressão de saturação | 

1,006; 2501; 1,86 | — | — | dadocoeficientes da entalpia | 

0,622 | 0,622 | adimensional | constante18,02/28,97 = 0,622, razão das massas molares | 

[technique] 

[technique-name] Cálculo direto com fórmulas

Este problema não tem incógnita escondida: cada propriedade sai de substituições em fórmulas, sem iteração. Para resolver este tipo de problema, vamos usar o cálculo direto, aplicando cada fórmula na ordem em que os resultados dependem uns dos outros. Ele serve aqui porque a equação de Antoine pode ser invertida em forma fechada, o que dá a temperatura de orvalho sem método numérico; um método numérico entra só como conferência. Em Python, a função que faz as contas com logaritmos é np.log10, da biblioteca NumPy. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados e pressão de saturação

[purpose] Guardar os dados em variáveis e escrever a equação de Antoine como uma função que o programa pode usar quantas vezes precisar.

```
import numpy as np
import matplotlib.pyplot as plt

# Dados do problema
T = 32.0 # temperatura do ar, °C
phi = 0.55 # umidade relativa, adimensional
P = 760.0 # pressão total, mmHg (101,325 kPa)
T2 = 15.0 # temperatura final, °C

def p_sat(T):
 # pressão de saturação da água, mmHg, com T em °C
 return 10 ** (8.07131 - 1730.63 / (233.426 + T))
```

[how] import numpy as np carrega a biblioteca de cálculo numérico com o apelido np, e import matplotlib.pyplot as plt carrega o módulo de gráficos com o apelido plt. Cada linha T = … guarda um número em um nome: T é a temperatura, em °C. Um texto depois de # é um comentário, ignorado pelo Python. def p_sat(T): define uma função chamada p_sat que recebe uma temperatura T, em °C; o bloco indentado abaixo é o que ela faz. return entrega o resultado de volta a quem chamou a função. 10 ** x é 10 elevado a x, que é a inversa do logaritmo de base 10 da equação de Antoine.

[so-far] O programa agora tem os dados e sabe calcular a pressão de saturação para qualquer temperatura. Ainda não imprime nada.

[step] 

### Umidade absoluta do ar

[purpose] Achar a pressão do vapor a partir da umidade relativa e, dela, a umidade absoluta.

```
ps = p_sat(T) # pressão de saturação, mmHg
pv = phi * ps # pressão parcial do vapor, mmHg
W = 0.622 * pv / (P - pv) # umidade absoluta, kg/kg
print(f"Psat a {T:.0f} °C: {ps:.2f} mmHg")
print(f"Umidade absoluta: {W:.5f} kg/kg")
```

[how] p_sat(T) chama a função da etapa anterior com o valor de T e recebe de volta a pressão de saturação. phi * ps multiplica a umidade relativa pela saturação, o que dá a pressão do vapor no ar. A linha de W aplica a fórmula da umidade absoluta. A linha print(...) mostra um texto na tela. Dentro de f"…", cada {nome:formato} é trocado pelo valor da variável: :.2f mostra dois decimais, :.5f cinco, e :.0f nenhum.

[so-far] O programa agora imprime a pressão de saturação a 32 °C e a umidade absoluta do ar.

[step] 

### Temperatura de orvalho e conferência

[purpose] Achar a temperatura em que o ar já está saturado com a água que tem. Como a equação de Antoine pode ser invertida, a resposta sai de uma fórmula. Uma segunda conta, pela raiz, serve para conferir.

```
Td = 1730.63 / (8.07131 - np.log10(pv)) - 233.426 # °C
print(f"Temperatura de orvalho: {Td:.1f} °C")

# Conferência: a temperatura em que a saturação iguala W
from scipy.optimize import brentq
Tc = brentq(lambda t: 0.622*p_sat(t)/(P - p_sat(t)) - W, 0, 40)
print(f"Conferência por raiz: {Tc:.1f} °C")
```

[how] A primeira linha é a equação de Antoine resolvida para T: np.log10(pv) calcula o logaritmo de base 10 da pressão do vapor, e a conta devolve a temperatura em que a saturação é igual a pv. from scipy.optimize import brentq traz o método de busca de raiz da biblioteca SciPy. brentq recebe quatro coisas: a função a ser zerada, aqui lambda t: … (uma função sem nome, que recebe t e devolve a diferença entre a umidade de saturação naquela temperatura e W); e os limites 0 e 40, entre os quais a diferença muda de sinal, o que garante que existe uma raiz. O método chama essa função várias vezes, com valores de t cada vez mais próximos da raiz, até a faixa ficar menor que cerca de 2 · 10⁻¹² °C, muito além das casas impressas. A raiz é devolvida em Tc. O lambda usa W, já calculado na etapa anterior.

[so-far] O programa imprime a temperatura de orvalho pelas duas contas, que devem coincidir.

[step] 

### Entalpia do ar úmido

[purpose] Calcular a entalpia do ar a partir da temperatura e da umidade já achadas.

```
h = 1.006 * T + W * (2501 + 1.86 * T) # kJ/kg ar seco
print(f"Entalpia: {h:.1f} kJ/kg ar seco")
```

[how] A linha aplica a fórmula do enunciado com os nomes do programa: T é a temperatura, W a umidade, e os números 1,006, 2501 e 1,86 são os coeficientes dados. Parênteses mostram a ordem das contas: primeiro 2501 + 1.86 * T, depois a multiplicação por W.

[so-far] O programa imprime a entalpia do ar, por kg de ar seco.

[step] 

### Água que condensa

[purpose] Calcular a umidade de saturação a 15 °C e subtrair da umidade de entrada: a diferença é a água que sai como líquido.

```
W2 = 0.622 * p_sat(T2) / (P - p_sat(T2)) # saturação a 15 °C
Wc = W - W2 # água condensada, kg/kg
print(f"Umidade de saturação a 15 °C: {W2:.5f} kg/kg")
print(f"Água condensada: {Wc * 1000:.2f} g/kg ar seco")
```

[how] A linha W2 = … aplica a mesma fórmula da umidade absoluta, mas com a pressão de saturação a T2, 15 °C, no lugar de pv. Como p_sat é uma função, ela aparece duas vezes na fórmula. Wc = W - W2 é o balanço da água: o que entra menos o que sai como vapor. Wc * 1000 converte kg em g, porque o enunciado pede gramas.

[so-far] O programa imprime a umidade de saturação a 15 °C e a água condensada, em g/kg de ar seco.

[step] 

### Gráfico da umidade contra a temperatura

[purpose] Desenhar a curva de saturação e o caminho do ar durante o resfriamento, para ver onde a condensação começa.

```
Ts = np.linspace(10, 40, 301) # curva de saturação
Ws = 0.622 * p_sat(Ts) / (P - p_sat(Ts))
Tr = np.linspace(T2, T, 171) # resfriamento de 32 a 15 °C
Wr = np.minimum(W, 0.622*p_sat(Tr)/(P - p_sat(Tr)))
plt.plot(Ts, Ws, label="Umidade absoluta de saturação")
plt.plot(Tr, Wr, label="Umidade absoluta do ar")
plt.xlabel("Temperatura (°C)")
plt.ylabel("Umidade absoluta (kg água/kg ar seco)")
plt.legend()
plt.show()
```

[how] np.linspace(a, b, n) cria n números igualmente espaçados de a a b: é a lista de temperaturas em que a curva será calculada. Como p_sat aceita uma lista e devolve uma lista, a fórmula de Ws funciona para todas as temperaturas de uma vez. np.minimum(W, …) compara, ponto a ponto, a umidade do ar com a de saturação e fica com a menor: o ar mantém a umidade W até encostar na saturação, e daí segue a curva. plt.plot(x, y, label=…) desenha uma linha; plt.xlabel e plt.ylabel põem os títulos dos eixos; plt.legend() mostra a legenda com os nomes; plt.show() abre a janela do gráfico.

[so-far] O programa agora termina com o gráfico: a curva de saturação e, em linha reta no alto e depois na curva, o caminho do ar.

[step] 

### Programa completo

```
import numpy as np
import matplotlib.pyplot as plt

# Dados do problema
T = 32.0 # temperatura do ar, °C
phi = 0.55 # umidade relativa, adimensional
P = 760.0 # pressão total, mmHg (101,325 kPa)
T2 = 15.0 # temperatura final, °C

def p_sat(T):
 # pressão de saturação da água, mmHg, com T em °C
 return 10 ** (8.07131 - 1730.63 / (233.426 + T))

ps = p_sat(T) # pressão de saturação, mmHg
pv = phi * ps # pressão parcial do vapor, mmHg
W = 0.622 * pv / (P - pv) # umidade absoluta, kg/kg
print(f"Psat a {T:.0f} °C: {ps:.2f} mmHg")
print(f"Umidade absoluta: {W:.5f} kg/kg")

Td = 1730.63 / (8.07131 - np.log10(pv)) - 233.426 # °C
print(f"Temperatura de orvalho: {Td:.1f} °C")

# Conferência: a temperatura em que a saturação iguala W
from scipy.optimize import brentq
Tc = brentq(lambda t: 0.622*p_sat(t)/(P - p_sat(t)) - W, 0, 40)
print(f"Conferência por raiz: {Tc:.1f} °C")

h = 1.006 * T + W * (2501 + 1.86 * T) # kJ/kg ar seco
print(f"Entalpia: {h:.1f} kJ/kg ar seco")

W2 = 0.622 * p_sat(T2) / (P - p_sat(T2)) # saturação a 15 °C
Wc = W - W2 # água condensada, kg/kg
print(f"Umidade de saturação a 15 °C: {W2:.5f} kg/kg")
print(f"Água condensada: {Wc * 1000:.2f} g/kg ar seco")

Ts = np.linspace(10, 40, 301) # curva de saturação
Ws = 0.622 * p_sat(Ts) / (P - p_sat(Ts))
Tr = np.linspace(T2, T, 171) # resfriamento de 32 a 15 °C
Wr = np.minimum(W, 0.622*p_sat(Tr)/(P - p_sat(Tr)))
plt.plot(Ts, Ws, label="Umidade absoluta de saturação")
plt.plot(Tr, Wr, label="Umidade absoluta do ar")
plt.xlabel("Temperatura (°C)")
plt.ylabel("Umidade absoluta (kg água/kg ar seco)")
plt.legend()
plt.show()
```

As seis etapas, coladas na ordem, formam o programa completo, pronto para rodar no editor.

## Resultado

[answer] 

Umidade absoluta do ar: W = 0,01644 kg de água por kg de ar seco. Temperatura de orvalho: 21,8 °C. Entalpia: 74,3 kJ por kg de ar seco. Água condensada ao resfriar até 15 °C: 5,84 g por kg de ar seco.

### Umidade absoluta contra a temperatura, com o caminho do resfriamento

[figura; controles: phi] 

### Em que temperatura a água começa a condensar?

A umidade absoluta do ar fica horizontal em 0,01644 kg/kg até encostar na umidade absoluta de saturação, em 21,8 °C. Abaixo disso, o ar segue a curva de saturação, e a água sai.

### Quanta água o ar retém a 15 °C?

No fim do caminho, a umidade absoluta de saturação vale 0,01060 kg/kg. A diferença vertical entre o início e o fim do caminho, 0,01644 − 0,01060 = 0,00584 kg/kg, é a água condensada: 5,84 g/kg.

### Leve φ até 0,80

A linha horizontal sobe e o orvalho passa de 21,8 °C para 28,1 °C: o ar encosta na saturação mais cedo, e a condensação aumenta para 13,60 g/kg.

[in-your-code] Troque phi = 0.55 por phi = 0.80 e rode o programa. Ele imprime Umidade absoluta: 0.02420 kg/kg, Temperatura de orvalho: 28.1 °C, Entalpia: 94.1 kJ/kg ar seco e Água condensada: 13.60 g/kg ar seco.

 Algo não ficou claro? Pergunte no chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Psicrometria · cálculo direto

# Ar úmido: umidade, orvalho e condensação

[problem] 

Ar úmido está a T = 32 °C, com umidade relativa UR = 55% e pressão total P = 101,325 kPa. A pressão de vapor da água é dada por log10 Psat = 8,07131 − 1730,63/(233,426 + T), com Psat em mmHg e T em °C (760 mmHg = 101,325 kPa). A entalpia do ar é h = 1,006 T + W (2501 + 1,86 T), em kJ por kg de ar seco. Depois, o ar é resfriado até T2 = 15 °C e sai saturado.

A umidade absoluta W do ar inicial, em kg de água por kg de ar seco.

A temperatura de orvalho Td, em °C.

A entalpia h do ar inicial, em kJ por kg de ar seco.

A massa de água que condensa no resfriamento, em g por kg de ar seco.

O ar úmido é uma mistura de ar seco e vapor de água. Esfriá-lo diminui a quantidade de vapor que ele pode carregar, e o excesso vira líquido. Ao final, você terá um programa em Python que calcula as quatro respostas e desenha a curva de saturação.

## Modelo

### Balanço de massa de água, em kg por kg de ar seco

 ⟦água que entra = água que sai no ar + água que condensa⟧ 

(princípio) A água não some: o que entra no resfriador sai como vapor no ar ou como líquido condensado. O volume de controle é o resfriador, em regime permanente, e a base de cálculo é 1 kg de ar seco.

 ⟦W_1 {vapor que entra} = W_2 {vapor que sai} + m_c {líquido}⟧ 

W1 — umidade absoluta do ar que entra, isto é, kg de vapor por kg de ar seco.

W2 — umidade absoluta do ar que sai, kg de vapor por kg de ar seco.

mc — massa de água líquida condensada por kg de ar seco, kg/kg.

(tradução) Cada palavra vira uma massa de água por kg de ar seco. Como o ar seco é a base, ele não aparece na conta.

 ⟦W_2 = W_sat ( T_2 )⟧ 

Wsat(T) — umidade absoluta do ar saturado na temperatura T, kg/kg.

(hipótese) O ar sai saturado, como diz o enunciado. Se saísse com menos vapor que o máximo, W2 seria menor e condensaria mais do que o calculado.

 ⟦o ar seco passa sem perdas⟧ 

(hipótese) Só a água muda de fase: nada de ar seco se dissolve no líquido. Se parte dele se dissolvesse, a base de 1 kg de ar seco deixaria de ser a mesma na entrada e na saída.

[final] 

 ⟦m_c {água condensada} = W_1 {vapor que entra} − W_2 {vapor que sai}⟧ 

(álgebra) Isolamos mc na equação da tradução.

A água condensada é a diferença entre a umidade que o ar tinha e a que cabe nele a 15 °C. Ela só é positiva se o ar entrar com mais vapor do que o ar saturado a T2 comporta.

[eq-block] Pressão de vapor: 

 ⟦log ( P_sat ) = A − (B)/(C + T)⟧ 

Psat — pressão de vapor da água na temperatura T, mmHg (dividida por 760/101,325 para virar kPa).

A, B, C — coeficientes 8,07131, 1730,63 e 233,426; T em °C.

Esta é a equação dada no enunciado, com o logaritmo na base 10: ela diz a maior pressão que o vapor pode ter, nessa temperatura, antes de começar a condensar.

[eq-block] Pressão parcial do vapor: 

 ⟦p_v = UR ⋅ P_sat ( T )⟧ 

pv — pressão parcial do vapor de água no ar, kPa.

UR — umidade relativa: fração (entre 0 e 1) da pressão de saturação que o vapor realmente tem, adimensional.

É a própria definição de umidade relativa: 55% significa que o vapor está a 55% da pressão em que saturaria.

[eq-block] Umidade absoluta: 

 ⟦W = 0,62198 ⋅ (p_v )/(P − p_v )⟧ 

W — umidade absoluta do ar, kg de vapor por kg de ar seco.

P — pressão total da mistura, kPa; P − pv é a pressão parcial do ar seco.

Para gases ideais, a razão entre os mols de vapor e de ar seco é a razão entre as pressões parciais, pv/(P − pv); multiplicada pela razão das massas molares (água/ar), 0,62198, ela vira razão de massas. A umidade de saturação Wsat(T) é a mesma conta com pv = Psat(T).

[eq-block] Temperatura de orvalho: 

 ⟦T_d = (B)/(A − log ( p_v )) − C⟧ 

Td — temperatura de orvalho, °C: a temperatura em que o ar, esfriado sem mudar pv, fica saturado.

No orvalho, Psat(Td) = pv. Basta isolar T na equação de pressão de vapor, com pv em mmHg.

Parâmetro | Valor | Unidade | Fonte | 

T | 32 | °C | dado | 

UR | 0,55 | — | dado55% | 

P | 101,325 | kPa | dado | 

T2 | 15 | °C | dado | 

A, B, C | 8,07131; 1730,63; 233,426 | —, °C, °C | dado | 

razão das massas molares água/ar | 0,62198 | kg/kg | constante física | 

[technique] 

[technique-name] Cálculo direto

Aqui as incógnitas saem de equações explícitas, uma depois da outra: nenhuma delas depende de uma resposta que ainda não temos. Para esse tipo de problema, vamos usar o cálculo direto, que é aplicar as fórmulas em sequência. Ele serve porque até a temperatura de orvalho tem fórmula fechada: basta inverter a equação de pressão de vapor. Em Python, a função que faz o trabalho pesado é np.log10, da biblioteca NumPy, junto das operações aritméticas comuns; uma busca de raiz numérica entra só para conferir o resultado. Veja na próxima seção como usá-la.

## Código

[step] 

### Dados e pressão de vapor

[purpose] Guardar os dados do problema em variáveis e transformar a equação de pressão de vapor numa função reutilizável, que vamos chamar para 32 °C, 15 °C e outras temperaturas.

```
import numpy as np
from scipy.optimize import brentq
import matplotlib.pyplot as plt

T = 32.0 # temperatura do ar, °C
UR = 0.55 # umidade relativa, fração
P = 101.325 # pressão total, kPa
T2 = 15.0 # temperatura final do resfriamento, °C

def psat(T):
 """Pressão de vapor da água, kPa (T em °C)."""
 mmHg = 10**(8.07131 - 1730.63/(233.426 + T))
 return mmHg*101.325/760

print(f"Psat(32 °C) = {psat(T):.3f} kPa")
```

[how] As linhas com # são comentários: o Python as ignora, e usamos para anotar a unidade. import … as … carrega uma biblioteca com um apelido. def psat(T): define uma função: psat é o nome, T é o que ela recebe e return é o que devolve a quem a chamou. O texto entre aspas triplas é só documentação. ** é potência (10**x é 10x), / é divisão e o fator 101.325/760 converte mmHg em kPa. Como a conversão está dentro da função, a variável mmHg existe só ali dentro. No print, o prefixo f deixa o texto receber valores entre chaves, e :.3f mostra o número com 3 casas decimais.

[so-far] O programa conhece os dados e calcula a pressão de vapor da água a 32 °C.

[step] 

### Umidade absoluta do ar

[purpose] Calcular a pressão parcial do vapor e a umidade absoluta do ar a 32 °C. Como a mesma conta será repetida para o ar saturado a 15 °C, ela também vira função.

```
def umidade(pv):
 """Umidade absoluta, kg água/kg ar seco (pv em kPa)."""
 return 0.62198*pv/(P - pv)

pv = UR*psat(T) # pressão parcial do vapor, kPa
W = umidade(pv) # umidade absoluta, kg/kg
print(f"pv = {pv:.3f} kPa")
print(f"W = {W:.5f} kg/kg")
```

[how] A função umidade(pv) recebe a pressão parcial do vapor e devolve a umidade. Ela usa P, definida fora dela, e o número 0.62198 é a razão entre as massas molares da água e do ar. Na linha pv = UR*psat(T), o Python primeiro chama psat(T), que devolve 4,743 kPa, e depois multiplica por UR. O formato :.5f mostra 5 casas decimais, porque a umidade é um número pequeno.

[so-far] O programa calcula a pressão parcial do vapor e a umidade absoluta do ar inicial.

[step] 

### Orvalho, com duas verificações

[purpose] Obter a temperatura de orvalho invertendo a equação de pressão de vapor, e conferi-la por dois caminhos que não usam essa inversão.

```
A, B, C = 8.07131, 1730.63, 233.426
logpv = np.log10(pv*760/101.325) # log10 de pv em mmHg
Td = B/(A - logpv) - C # temperatura de orvalho, °C
print(f"Td = {Td:.2f} °C")

# Verificações independentes
print(f"Psat(100 °C) = {psat(100.0):.2f} kPa")
Td_chk = brentq(lambda t: umidade(psat(t)) - W, 0, T)
print(f"Td (raiz) = {Td_chk:.2f} °C")
```

[how] 

A, B, C = 8.07131, 1730.63, 233.426 — desempacotamento: três valores separados por vírgula formam uma tupla (uma lista de valores fixos), e cada um vai para uma variável, na ordem.

np.log10(x) — logaritmo decimal, vindo do NumPy (np). A pressão pv é multiplicada por 760/101.325 porque a equação pede mmHg.

brentq(f, a, b) — procura uma raiz, isto é, o valor de t em que f(t) vale zero. f é uma função nossa passada como argumento: lambda t: … é uma função de uma linha, sem nome, que recebe t e devolve a umidade de saturação em t menos W. O brentq a chama várias vezes com valores de t entre a e b, olha o sinal do que ela devolve e estreita o intervalo até achar onde o sinal muda.

a = 0 e b = T (32 °C) — extremos do intervalo de busca, em °C. Em 0 °C o ar está acima da saturação (resultado positivo) e em 32 °C ele está abaixo (resultado negativo), então o orvalho está entre os dois.

[how] A precisão: o brentq para quando o intervalo fica menor que sua tolerância padrão (2·10−12 °C), muito além das 2 casas que mostramos. A verificação é independente porque usa a umidade em vez da pressão parcial e não inverte a equação. Já psat(100.0) deve dar perto de 101,325 kPa, a pressão em que a água ferve a 100 °C: ela confirma que os coeficientes e a conversão estão certos.

[so-far] O programa calcula a temperatura de orvalho e a confirma por duas verificações.

[step] 

### Entalpia como função

[purpose] Calcular a entalpia do ar. Como a fórmula depende de duas entradas, ela também vira função.

```
def entalpia(T, W):
 """Entalpia do ar úmido, kJ/kg de ar seco."""
 return 1.006*T + W*(2501 + 1.86*T)

h = entalpia(T, W)
print(f"h = {h:.2f} kJ/kg")
```

[how] É a mesma ideia de def do passo 1, agora com dois argumentos separados por vírgula: na chamada entalpia(T, W), o primeiro valor entra em T e o segundo em W, nessa ordem. Dentro da função, T e W são nomes locais, que só coincidem com as variáveis de fora porque passamos essas variáveis na chamada. O resultado sai em kJ por kg de ar seco.

[so-far] O programa calcula também a entalpia do ar inicial.

[step] 

### Resfriamento e água condensada

[purpose] Calcular a umidade do ar depois de saturado a 15 °C e a diferença para a umidade inicial, que é a água que condensa.

```
W2 = umidade(psat(T2)) # ar saturado a 15 °C, kg/kg
agua = (W - W2)*1000 # água condensada, g/kg de ar seco
print(f"W2 = {W2:.5f} kg/kg")
print(f"Condensa = {agua:.2f} g/kg")
```

[how] umidade(psat(T2)) encadeia as funções: psat devolve a pressão de vapor a 15 °C, que vale também a pressão parcial do ar saturado, e esse valor entra em umidade. A diferença W - W2 está em kg/kg; multiplicar por 1000 converte para g/kg.

[so-far] O programa calcula quanto vapor condensa ao resfriar o ar até 15 °C.

[step] 

### Curva de saturação e ponto de orvalho

[purpose] Desenhar a umidade de saturação contra a temperatura e marcar a umidade do ar: é o que você verá ao rodar o programa.

```
Tv = np.linspace(0, 40, 161) # temperaturas, °C
Wsat = umidade(psat(Tv)) # saturação, kg/kg
plt.plot(Tv, Wsat*1000, label="Umidade de saturação")
plt.plot(Tv, np.full_like(Tv, W*1000), label="Umidade do ar")
plt.plot([Td], [W*1000], "ko") # ponto de orvalho
plt.xlabel("Temperatura (°C)")
plt.ylabel("Umidade absoluta (g/kg ar seco)")
plt.legend()
plt.show()
```

[how] 

np.linspace(0, 40, 161) — 161 temperaturas igualmente espaçadas de 0 a 40 °C (passo de 0,25 °C).

umidade(psat(Tv)) — as funções aceitam o vetor inteiro de uma vez e devolvem um vetor, com a umidade de saturação em cada temperatura.

plt.plot(x, y, label=…) — traça y contra x; label é o nome na legenda. Multiplicamos por 1000 para ler em g/kg.

np.full_like(Tv, W*1000) — vetor do mesmo tamanho de Tv com o valor W*1000 repetido: a reta horizontal da umidade do ar.

plt.plot([Td], [W*1000], "ko") — um único ponto (listas de um elemento); "ko" significa cor preta (k) e marcador de círculo (o).

plt.xlabel, plt.ylabel, plt.legend() — rótulos dos eixos com unidade e a legenda. plt.show() abre a figura.

[so-far] O programa termina mostrando a figura.

[step] 

### Programa completo

```
import numpy as np
from scipy.optimize import brentq
import matplotlib.pyplot as plt

T = 32.0 # temperatura do ar, °C
UR = 0.55 # umidade relativa, fração
P = 101.325 # pressão total, kPa
T2 = 15.0 # temperatura final do resfriamento, °C

def psat(T):
 """Pressão de vapor da água, kPa (T em °C)."""
 mmHg = 10**(8.07131 - 1730.63/(233.426 + T))
 return mmHg*101.325/760

print(f"Psat(32 °C) = {psat(T):.3f} kPa")

def umidade(pv):
 """Umidade absoluta, kg água/kg ar seco (pv em kPa)."""
 return 0.62198*pv/(P - pv)

pv = UR*psat(T) # pressão parcial do vapor, kPa
W = umidade(pv) # umidade absoluta, kg/kg
print(f"pv = {pv:.3f} kPa")
print(f"W = {W:.5f} kg/kg")

A, B, C = 8.07131, 1730.63, 233.426
logpv = np.log10(pv*760/101.325) # log10 de pv em mmHg
Td = B/(A - logpv) - C # temperatura de orvalho, °C
print(f"Td = {Td:.2f} °C")

# Verificações independentes
print(f"Psat(100 °C) = {psat(100.0):.2f} kPa")
Td_chk = brentq(lambda t: umidade(psat(t)) - W, 0, T)
print(f"Td (raiz) = {Td_chk:.2f} °C")

def entalpia(T, W):
 """Entalpia do ar úmido, kJ/kg de ar seco."""
 return 1.006*T + W*(2501 + 1.86*T)

h = entalpia(T, W)
print(f"h = {h:.2f} kJ/kg")

W2 = umidade(psat(T2)) # ar saturado a 15 °C, kg/kg
agua = (W - W2)*1000 # água condensada, g/kg de ar seco
print(f"W2 = {W2:.5f} kg/kg")
print(f"Condensa = {agua:.2f} g/kg")

Tv = np.linspace(0, 40, 161) # temperaturas, °C
Wsat = umidade(psat(Tv)) # saturação, kg/kg
plt.plot(Tv, Wsat*1000, label="Umidade de saturação")
plt.plot(Tv, np.full_like(Tv, W*1000), label="Umidade do ar")
plt.plot([Td], [W*1000], "ko") # ponto de orvalho
plt.xlabel("Temperatura (°C)")
plt.ylabel("Umidade absoluta (g/kg ar seco)")
plt.legend()
plt.show()
```

Os passos juntos, em ordem, prontos para rodar.

## Resultado

[answer] 

Umidade absoluta: W = 0,01643 kg de água/kg de ar seco. Temperatura de orvalho: Td = 21,84 °C. Entalpia: h = 74,27 kJ/kg de ar seco. Água condensada no resfriamento: 5,84 g/kg de ar seco.

[figura; controles: UR] 

### Onde o ar começa a condensar?

A reta da umidade do ar cruza a curva da umidade de saturação em 21,84 °C, que é a temperatura de orvalho. Acima dela, a curva de saturação está acima da reta e o ar tem vapor de sobra para absorver; abaixo, o ar não pode mais carregar tudo.

### Quanto sobra no ar a 15 °C?

A 15 °C a umidade de saturação vale 0,01060 kg/kg, menor que os 0,01643 kg/kg do ar inicial. A distância vertical entre a reta e a curva nessa temperatura é a água condensada: 5,84 g por kg de ar seco.

### Leve a umidade relativa a 80%

A umidade do ar sobe e a reta sobe junto; ela cruza a curva de saturação mais perto de 32 °C, e a temperatura de orvalho passa a 28,11 °C. Com o ar mais úmido, um resfriamento pequeno já satura. A água condensada até 15 °C sobe para 13,60 g/kg.

[in-your-code] No código, troque UR = 0.55 por UR = 0.80. O programa passa a imprimir Td = 28.11 °C e Condensa = 13.60 g/kg.

 Algo ficou confuso? Pergunte no chat.

==================== FIM DA LIÇÃO 2 ====================
