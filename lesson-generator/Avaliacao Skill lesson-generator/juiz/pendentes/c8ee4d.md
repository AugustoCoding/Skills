# Pacote c8ee4d

Julgue conforme `juiz/JUIZ.md` e grave a resposta em `juiz/respostas/c8ee4d.json`.

## Enunciado enviado ao modelo

Num ensaio de secagem de um sólido em bandeja, a taxa de secagem R, em kg de água/(m²·h), foi medida em função da umidade X, em kg de água por kg de sólido seco. Para X = 0,40; 0,35; 0,30; 0,25; 0,20; 0,15; 0,10 e 0,05, as taxas foram R = 1,50; 1,50; 1,50; 1,50; 1,20; 0,90; 0,55 e 0,25. A carga é de 20 kg de sólido seco por m² de superfície de secagem, e o tempo de secagem é t = (m_s/A) ∫ dX/R. Usando a regra dos trapézios sobre os pontos da tabela, calcule o tempo no período de taxa constante (de X = 0,40 a 0,25), o tempo no período de taxa decrescente (de X = 0,25 a 0,05) e o tempo total, em horas.

## Itens a julgar

- `M.balanco1.leitura` — balanço 1: a equação final vem com o parágrafo do que ela representa e do que implica _(dica: o parágrafo existe; diga se descreve o processo e uma implicação)_
- `M.balanco1.hipotese3` — balanço 1, passo 3 (hipótese): diz o que aconteceria se ela não valesse _(dica: hipótese O sólido seco não evapora nem sai da bandeja, então sua massa não muda (é por is…)_
- `M.simbolo.m_s` — símbolo m_s: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.X` — símbolo X: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.t` — símbolo t: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.R` — símbolo R: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.A` — símbolo A: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.X_0` — símbolo X_0: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.constante.ms_A` — o valor ms_A = 20 do programa está na tabela de parâmetros _(dica: não achei o número na tabela: pode estar em outra unidade; se não estiver, faltou)_
- `M.tecnica.tipo` — técnica: diz que tipo de problema matemático é, em palavras comuns
- `M.tecnica.porque` — técnica: diz por que ela serve para este caso
- `M.tecnica.python` — técnica: nomeia a função de Python e a biblioteca _(dica: há um <code>; confirme função e biblioteca)_
- `C.funcao.np.array` — passo 1: função de biblioteca np.array(…): explicado o que ela faz e o que recebe
- `C.funcao.range` — passo 2: função nativa range(…): explicado o que ela faz e o que recebe
- `C.funcao.len` — passo 2: função nativa len(…): explicado o que ela faz e o que recebe
- `C.funcao.print` — passo 2: função nativa print(…): explicado o que ela faz e o que recebe
- `C.funcao.trapezoid` — passo 4: função de biblioteca trapezoid(…): explicado o que ela faz
- `C.arg.trapezoid.posição1` — passo 4: argumento de trapezoid, posição 1 (inv_R[::-1]): o que é e por que tem esse valor
- `C.arg.trapezoid.posição2` — passo 4: argumento de trapezoid, posição 2 (X[::-1]): o que é e por que tem esse valor
- `C.funcao.simpson` — passo 4: função de biblioteca simpson(…): explicado o que ela faz
- `C.arg.simpson.posição1` — passo 4: argumento de simpson, posição 1 (inv_R[3:][::-1]): o que é e por que tem esse valor
- `C.arg.simpson.x` — passo 4: argumento de simpson, x (X[3:][::-1]): o que é e por que tem esse valor
- `C.funcao.np.concatenate` — passo 5: função de biblioteca np.concatenate(…): explicado o que ela faz e o que recebe
- `C.funcao.np.cumsum` — passo 5: função de biblioteca np.cumsum(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.plot` — passo 5: função de biblioteca plt.plot(…): explicado o que ela faz
- `C.arg.plt.plot.posição1` — passo 5: argumento de plt.plot, posição 1 (X): o que é e por que tem esse valor
- `C.arg.plt.plot.posição2` — passo 5: argumento de plt.plot, posição 2 (t_acum): o que é e por que tem esse valor
- `C.arg.plt.plot.posição3` — passo 5: argumento de plt.plot, posição 3 ("o-"): o que é e por que tem esse valor
- `C.funcao.plt.xlabel` — passo 5: função de biblioteca plt.xlabel(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.ylabel` — passo 5: função de biblioteca plt.ylabel(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.show` — passo 5: função de biblioteca plt.show(…): explicado o que ela faz
- `C.construcao.for` — laço for: explicado o que é e o que faz neste programa
- `C.construcao.fstring` — f-string: texto com valores dentro de chaves: explicado o que é e o que faz neste programa
- `C.construcao.indice` — índice entre colchetes, como y[0]: explicado o que é e o que faz neste programa
- `C.construcao.fatia` — fatia entre colchetes, como x[1:] ou y[:, -1]: explicado o que é e o que faz neste programa
- `C.construcao.tupla` — tupla: valores entre parênteses, separados por vírgula: explicado o que é e o que faz neste programa
- `C.construcao.lista` — lista: valores entre colchetes: explicado o que é e o que faz neste programa
- `C.construcao.argumento_nomeado` — argumento passado por nome (nome=valor): explicado o que é e o que faz neste programa
- `C.construcao.import_as` — import … as: o apelido da biblioteca: explicado o que é e o que faz neste programa
- `C.construcao.from_import` — from … import: trazer uma função pelo nome: explicado o que é e o que faz neste programa
- `C.verificacao.presente` — o programa faz uma verificação do resultado e a lição a explica
- `C.verificacao.independente` — a verificação é independente: não reusa a relação que produziu o resultado _(dica: marque faltou se não houver verificação)_
- `R.controle1.codigo` — observação de controle 1 (Reduza a carga para 10 kg/m²): dá a mesma mudança no código e o que o programa imprime
- `R.leitura1.ancorada` — observação 1 (Por que a curva começa como uma reta?): cita um valor ou trecho da curva deste exercício; não serviria a outro
- `R.leitura2.ancorada` — observação 2 (Qual intervalo pesa mais no tempo total?): cita um valor ou trecho da curva deste exercício; não serviria a outro
- `R.leitura3.ancorada` — observação 3 (A regra dos trapézios é boa o bastante aqui?): cita um valor ou trecho da curva deste exercício; não serviria a outro

## Lição

Operações unitárias · Integração numérica de dados tabelados

# Secagem em bandeja

[problem] 

Num ensaio de secagem de um sólido em bandeja, mediu-se a taxa de secagem R, em kg de água/(m²·h), em função da umidade X, em kg de água por kg de sólido seco:

X (kg água/kg sólido seco) | 0,40 | 0,35 | 0,30 | 0,25 | 0,20 | 0,15 | 0,10 | 0,05 | 

R (kg água/(m²·h)) | 1,50 | 1,50 | 1,50 | 1,50 | 1,20 | 0,90 | 0,55 | 0,25 | 

A carga é ms/A = 20 kg de sólido seco por m² de superfície de secagem, e o tempo de secagem é t = (ms/A) ∫ dX/R. Usando a regra dos trapézios sobre os pontos da tabela, calcule:

o tempo no período de taxa constante (de X = 0,40 a 0,25), em horas;

o tempo no período de taxa decrescente (de X = 0,25 a 0,05), em horas;

o tempo total de secagem, em horas.

Durante a secagem, a água sai do sólido e a umidade X cai de 0,40 até 0,05. No começo a taxa é constante; depois ela diminui. Ao final você terá um programa em Python que calcula o tempo de cada período e o tempo total, e uma curva do tempo decorrido contra a umidade.

## Modelo

### Balanço de massa de água no sólido, em kg

 ⟦acúmulo de água no sólido = − água evaporada⟧ 

(princípio) A água não some: se o sólido perde água, ela foi para o ar. O volume de controle é o sólido úmido na bandeja; nada de água entra nele.

 ⟦(d ( m_s ⋅ X ))/(d t) {acúmulo de água} = − R ⋅ A {água evaporada por hora}⟧ 

t — tempo de secagem decorrido desde o início do ensaio, h

ms — massa de sólido seco na bandeja, kg

X — umidade do sólido, em kg de água por kg de sólido seco

R — taxa de secagem, em kg de água evaporada por m² de superfície e por hora, kg/(m²·h)

A — área da superfície de secagem, m²

(tradução) A água no sólido vale ms·X. A evaporação é a taxa por área, R, vezes a área A.

 ⟦m_s = constante⟧ 

(hipótese) O sólido seco não evapora nem sai da bandeja, então sua massa não muda (é por isso que X é definida por kg de sólido seco). Se o sólido se desmanchasse ou perdesse material, ms teria de entrar na derivada.

 ⟦m_s ⋅ (d X)/(d t) = − R ⋅ A ⟹ d t = − (m_s )/(A) ⋅ (d X)/(R)⟧ 

(álgebra) Tirando ms da derivada e separando as variáveis: de um lado só o tempo, do outro só a umidade e a taxa.

[final] 

 ⟦t {tempo de secagem} = (m_s )/(A) {carga} ∫ X X_0 (d X)/(R) {inverso da taxa}⟧ 

X0 — umidade inicial do sólido, 0,40 kg de água/kg de sólido seco

(álgebra) Integrando de t = 0 (umidade X0) até o instante em que a umidade vale X; o sinal de menos some ao inverter os limites.

A equação diz que o tempo é a carga vezes a área sob a curva 1/R contra X. Onde a taxa é pequena, 1/R é grande e cada pedaço de umidade custa muito tempo: secar as últimas gotas é o trecho lento.

Parâmetro | Valor | Unidade | Fonte | 

ms/A | 20 | kg sólido seco/m² | dado | 

X0 | 0,40 | kg água/kg sólido seco | dado primeira linha da tabela | 

Xc (fim da taxa constante) | 0,25 | kg água/kg sólido seco | dado limite entre os dois períodos | 

Xf (umidade final) | 0,05 | kg água/kg sólido seco | dado | 

X, R | 8 pontos | kg/kg e kg/(m²·h) | dado tabela do enunciado | 

[technique] 

[technique-name] Integração numérica

Precisamos da área sob a curva 1/R contra X, mas só conhecemos R em oito pontos, sem fórmula. Para esse tipo de problema, usaremos a regra dos trapézios: ligamos pontos vizinhos por retas e somamos as áreas dos trapézios formados, cada uma igual à largura vezes a média das duas alturas. Ela serve porque os dados são uma tabela, não uma função. Em Python, a função que faz isso é trapezoid, da biblioteca scipy.integrate; faremos a conta à mão com o NumPy para ver cada trapézio e usaremos trapezoid como conferência. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Guardar a tabela em vetores

[purpose] Colocar os dados do ensaio no programa, cada grandeza num vetor com unidade nos comentários.

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import trapezoid, simpson

ms_A = 20.0 # carga de sólido seco, kg/m²
X = np.array([0.40, 0.35, 0.30, 0.25,
 0.20, 0.15, 0.10, 0.05]) # kg água/kg sólido seco
R = np.array([1.50, 1.50, 1.50, 1.50,
 1.20, 0.90, 0.55, 0.25]) # kg água/(m²·h)
```

[how] import traz uma biblioteca para o programa; as np dá o apelido np. from scipy.integrate import trapezoid, simpson traz só essas duas funções, que usaremos na conferência. np.array([...]) transforma a lista entre colchetes num vetor do NumPy, com o qual se faz conta com todos os elementos de uma vez. O nome ms_A representa ms/A, porque o nome de uma variável não pode ter barra. No código o separador decimal é sempre o ponto.

[so-far] O programa conhece a carga e os oito pontos medidos.

[step] 

### Área de cada trapézio

[purpose] Calcular o tempo gasto em cada intervalo entre dois pontos vizinhos da tabela.

```
inv_R = 1.0 / R # m²·h/kg água
dX = X[:-1] - X[1:] # kg água/kg sólido seco
dt = ms_A * dX * (inv_R[:-1] + inv_R[1:]) / 2 # h

for i in range(len(dt)):
 print(f"X de {X[i]:.2f} a {X[i+1]:.2f}: {dt[i]:.3f} h")
```

[how] Dividir um número por um vetor divide cada elemento: inv_R guarda 1/R de cada ponto. O índice X[:-1] é o vetor sem o último elemento e X[1:] é o vetor sem o primeiro; subtraindo um do outro, cada posição i dá X[i] - X[i+1], a largura do trapézio i, positiva porque X diminui. A linha de dt é a regra dos trapézios: carga × largura × média das duas alturas (1/R nas duas pontas). O laço for i in range(len(dt)) repete o print com i valendo 0, 1, 2… até o último intervalo (len conta os elementos; são 7 intervalos para 8 pontos). Na f-string, {X[i]:.2f} escreve o valor com 2 casas e {dt[i]:.3f}, com 3.

[so-far] O programa tem o tempo de cada um dos sete intervalos e os imprime.

[step] 

### Somar por período

[purpose] Juntar os intervalos nos dois períodos e no total, que são as respostas do exercício.

```
t_const = dt[:3].sum() # h
t_fall = dt[3:].sum() # h
t_total = t_const + t_fall # h
print(f"Taxa constante: {t_const:.3f} h")
print(f"Taxa decrescente: {t_fall:.3f} h")
print(f"Tempo total: {t_total:.3f} h")
```

[how] dt[:3] pega os três primeiros intervalos (posições 0, 1 e 2: de 0,40 a 0,25) e dt[3:] pega do quarto em diante (de 0,25 a 0,05). O método .sum() soma os elementos do vetor. Em :.3f, o f pede número decimal e o 3, três casas.

[so-far] O programa imprime o tempo da taxa constante, o da taxa decrescente e o total.

[step] 

### Conferir por outros caminhos

[purpose] Confirmar o resultado sem repetir a mesma conta: uma fórmula exata, a função pronta e um método mais refinado.

```
t_const_exato = ms_A * (0.40 - 0.25) / 1.50
t_trap = ms_A * trapezoid(inv_R[::-1], X[::-1])
t_simp = ms_A * simpson(inv_R[3:][::-1], x=X[3:][::-1])
print(f"Constante, fórmula exata: {t_const_exato:.3f} h")
print(f"Total com trapezoid(): {t_trap:.3f} h")
print(f"Decrescente com Simpson: {t_simp:.3f} h")
```

[how] 

Com R constante e igual a 1,50, a integral é só a largura 0,40 − 0,25 vezes 1/1,50: é a fórmula exata do período de taxa constante, que deve dar o mesmo que a soma dos trapézios.

[::-1] inverte a ordem de um vetor. É necessário porque trapezoid e simpson esperam X crescente; com X decrescente o resultado sairia negativo.

trapezoid(y, x): o primeiro argumento são as alturas (aqui 1/R) e o segundo, as posições onde elas foram medidas (aqui X). Retorna a área total dos trapézios; multiplicamos pela carga. Deve igualar t_total.

simpson(y, x=...): faz a mesma integral, mas ajustando uma parábola a cada três pontos em vez de retas entre dois. x= é um argumento nomeado: o nome diz o papel do valor. Usamos [3:] para pegar só o período decrescente, que tem 5 pontos (4 intervalos, número par que o método exige).

[so-far] O programa confere o período constante pela fórmula exata, o total pela função pronta, e mostra quanto a regra dos trapézios difere de um método mais refinado no período decrescente. Como 1/R é uma curva que sobe cada vez mais depressa, as retas passam acima da curva e os trapézios superestimam a área; a diferença para Simpson mede esse erro do método.

[step] 

### Desenhar o tempo decorrido

[purpose] Mostrar quanto tempo se passou até cada umidade da tabela.

```
t_acum = np.concatenate(([0.0], np.cumsum(dt))) # h
plt.plot(X, t_acum, "o-")
plt.xlabel("Umidade X (kg água/kg sólido seco)")
plt.ylabel("Tempo decorrido (h)")
plt.show()
```

[how] 

np.cumsum(dt) é a soma acumulada: o primeiro elemento é dt[0], o segundo é dt[0] + dt[1], e assim por diante.

np.concatenate(([0.0], ...)) cola o vetor [0.0] na frente, pois no início, em X = 0,40, ainda não passou tempo; os dois argumentos vão juntos numa tupla (os parênteses duplos).

plt.plot(X, t_acum, "o-"): X no eixo horizontal, o tempo no vertical; "o-" pede um círculo em cada ponto, ligados por linha.

plt.xlabel e plt.ylabel escrevem os nomes dos eixos, com unidade; plt.show() abre a figura.

[so-far] O programa termina mostrando a figura.

[step] 

### Programa completo

```
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import trapezoid, simpson

ms_A = 20.0 # carga de sólido seco, kg/m²
X = np.array([0.40, 0.35, 0.30, 0.25,
 0.20, 0.15, 0.10, 0.05]) # kg água/kg sólido seco
R = np.array([1.50, 1.50, 1.50, 1.50,
 1.20, 0.90, 0.55, 0.25]) # kg água/(m²·h)

inv_R = 1.0 / R # m²·h/kg água
dX = X[:-1] - X[1:] # kg água/kg sólido seco
dt = ms_A * dX * (inv_R[:-1] + inv_R[1:]) / 2 # h

for i in range(len(dt)):
 print(f"X de {X[i]:.2f} a {X[i+1]:.2f}: {dt[i]:.3f} h")

t_const = dt[:3].sum() # h
t_fall = dt[3:].sum() # h
t_total = t_const + t_fall # h
print(f"Taxa constante: {t_const:.3f} h")
print(f"Taxa decrescente: {t_fall:.3f} h")
print(f"Tempo total: {t_total:.3f} h")

t_const_exato = ms_A * (0.40 - 0.25) / 1.50
t_trap = ms_A * trapezoid(inv_R[::-1], X[::-1])
t_simp = ms_A * simpson(inv_R[3:][::-1], x=X[3:][::-1])
print(f"Constante, fórmula exata: {t_const_exato:.3f} h")
print(f"Total com trapezoid(): {t_trap:.3f} h")
print(f"Decrescente com Simpson: {t_simp:.3f} h")

t_acum = np.concatenate(([0.0], np.cumsum(dt))) # h
plt.plot(X, t_acum, "o-")
plt.xlabel("Umidade X (kg água/kg sólido seco)")
plt.ylabel("Tempo decorrido (h)")
plt.show()
```

Os passos juntos, em ordem, prontos para rodar.

## Resultado

[answer] 

Período de taxa constante (X de 0,40 a 0,25): 2,000 h. Período de taxa decrescente (X de 0,25 a 0,05): 6,096 h. Tempo total: 8,096 h.

[figura; controles: msA] 

### Por que a curva começa como uma reta?

Entre X = 0,40 e 0,25 a taxa vale 1,50 kg/(m²·h) nos quatro pontos, então cada passo de 0,05 em X custa o mesmo tempo, 0,667 h, e o tempo decorrido sobe em linha reta até 2,000 h.

### Qual intervalo pesa mais no tempo total?

O último, de X = 0,10 a 0,05, com 2,909 h: lá a taxa cai a 0,25 kg/(m²·h), o inverso 1/R é o maior da tabela e o tempo decorrido dispara. Esse único intervalo vale quase metade dos 6,096 h do período decrescente.

### A regra dos trapézios é boa o bastante aqui?

No período decrescente, Simpson dá 5,832 h contra 6,096 h dos trapézios: os trapézios superestimam (6,096 − 5,832 = 0,264 h), porque 1/R é uma curva que sobe cada vez mais depressa. No período constante os dois métodos coincidem, pois 1/R é uma reta. O exercício pede os trapézios, então a resposta é 8,096 h.

### Reduza a carga para 10 kg/m²

O tempo cai pela metade em todos os pontos, pois t é proporcional à carga ms/A: uma camada mais fina tem menos água por área para evaporar à mesma taxa.

[in-your-code] No programa, troque a primeira linha por ms_A = 10.0. Ele imprime 1.000 h na taxa constante, 3.048 h na decrescente e 4.048 h no total.

 Alguma dúvida? Pergunte no chat.
