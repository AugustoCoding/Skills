# Pacote 1fb3cc

Julgue conforme `juiz/JUIZ.md` e grave a resposta em `juiz/respostas/1fb3cc.json`.

## Enunciado enviado ao modelo

Esferas de vidro de 0,50 mm de diâmetro (ρ = 2500 kg/m³) sedimentam em água (ρ = 998 kg/m³, μ = 1,0·10⁻³ Pa·s; g = 9,81 m/s²). O coeficiente de arrasto segue a correlação de Schiller–Naumann, C_D = (24/Re)(1 + 0,15 Re^0,687). Calcule a velocidade terminal (cm/s), o número de Reynolds da partícula nessa velocidade e a velocidade que a lei de Stokes daria (cm/s). Que diâmetro de esfera (mm) tem velocidade terminal de 2,0 cm/s?

## Itens a julgar

- `M.balanco1.leitura` — balanço 1: a equação final vem com o parágrafo do que ela representa e do que implica _(dica: o parágrafo existe; diga se descreve o processo e uma implicação)_
- `M.balanco1.hipotese3` — balanço 1, passo 3 (hipótese): diz o que aconteceria se ela não valesse _(dica: hipótese Na velocidade terminal a esfera já não acelera. Se ela ainda acelerasse, o termo…)_
- `M.bloco1.origem` — equação complementar 1: diz de onde vem e o que afirma _(dica: Correlação de Schiller–Naumann)_
- `M.simbolo.F_p` — símbolo F_p: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.F_e` — símbolo F_e: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.F_D` — símbolo F_D: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.m` — símbolo m: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.a` — símbolo a: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.Δρ` — símbolo Δρ: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.g` — símbolo g: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.C_D` — símbolo C_D: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.ρ_f` — símbolo ρ_f: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.v_t` — símbolo v_t: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.Re` — símbolo Re: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.μ` — símbolo μ: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.constante.d` — o valor d = 0.0005 do programa está na tabela de parâmetros _(dica: não achei o número na tabela: pode estar em outra unidade; se não estiver, faltou)_
- `M.constante.v_2` — o valor v_2 = 0.02 do programa está na tabela de parâmetros _(dica: não achei o número na tabela: pode estar em outra unidade; se não estiver, faltou)_
- `M.tecnica.tipo` — técnica: diz que tipo de problema matemático é, em palavras comuns
- `M.tecnica.porque` — técnica: diz por que ela serve para este caso
- `M.tecnica.python` — técnica: nomeia a função de Python e a biblioteca _(dica: há um <code>; confirme função e biblioteca)_
- `M.termo.resíduo` — termo de método numérico "resíduo": explicado em palavras comuns na primeira vez que aparece
- `M.termo.tolerância` — termo de método numérico "tolerância": explicado em palavras comuns na primeira vez que aparece
- `C.funcao.brentq` — passo 3: função de biblioteca brentq(…): explicado o que ela faz
- `C.arg.brentq.posição1` — passo 3: argumento de brentq, posição 1 (residuo_v): o que é e por que tem esse valor
- `C.arg.brentq.posição2` — passo 3: argumento de brentq, posição 2 (1e-6): o que é e por que tem esse valor
- `C.arg.brentq.posição3` — passo 3: argumento de brentq, posição 3 (1.0): o que é e por que tem esse valor
- `C.arg.brentq.args` — passo 3: argumento de brentq, args ((d,)): o que é e por que tem esse valor
- `C.arg.brentq.xtol` — passo 3: argumento de brentq, xtol (1e-12): o que é e por que tem esse valor
- `C.funcao.print` — passo 3: função nativa print(…): explicado o que ela faz e o que recebe
- `C.funcao.abs` — passo 4: função nativa abs(…): explicado o que ela faz e o que recebe
- `C.funcao.np.linspace` — passo 6: função de biblioteca np.linspace(…): explicado o que ela faz
- `C.arg.np.linspace.posição1` — passo 6: argumento de np.linspace, posição 1 (0.05): o que é e por que tem esse valor
- `C.arg.np.linspace.posição2` — passo 6: argumento de np.linspace, posição 2 (1.0): o que é e por que tem esse valor
- `C.arg.np.linspace.posição3` — passo 6: argumento de np.linspace, posição 3 (96): o que é e por que tem esse valor
- `C.funcao.np.array` — passo 6: função de biblioteca np.array(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.plot` — passo 6: função de biblioteca plt.plot(…): explicado o que ela faz
- `C.arg.plt.plot.posição1` — passo 6: argumento de plt.plot, posição 1 (d_mm): o que é e por que tem esse valor
- `C.arg.plt.plot.posição2` — passo 6: argumento de plt.plot, posição 2 (v_sn * 100): o que é e por que tem esse valor
- `C.arg.plt.plot.label` — passo 6: argumento de plt.plot, label ("Velocidade terminal (Schiller–…): o que é e por que tem esse valor
- `C.funcao.plt.xlabel` — passo 6: função de biblioteca plt.xlabel(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.ylabel` — passo 6: função de biblioteca plt.ylabel(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.legend` — passo 6: função de biblioteca plt.legend(…): explicado o que ela faz
- `C.funcao.plt.grid` — passo 6: função de biblioteca plt.grid(…): explicado o que ela faz e o que recebe
- `C.funcao.plt.show` — passo 6: função de biblioteca plt.show(…): explicado o que ela faz
- `C.mecanismo.brentq.residuo_v` — passo 3: o mecanismo de brentq com a função residuo_v: quem a chama, quantas vezes, com que valores e o que é feito com o que ela devolve
- `C.mecanismo.brentq.residuo_v` — passo 4: o mecanismo de brentq com a função residuo_v: quem a chama, quantas vezes, com que valores e o que é feito com o que ela devolve
- `C.mecanismo.brentq.residuo_d` — passo 5: o mecanismo de brentq com a função residuo_d: quem a chama, quantas vezes, com que valores e o que é feito com o que ela devolve
- `C.mecanismo.brentq.residuo_v` — passo 6: o mecanismo de brentq com a função residuo_v: quem a chama, quantas vezes, com que valores e o que é feito com o que ela devolve
- `C.construcao.def` — definição de função com def: explicado o que é e o que faz neste programa
- `C.construcao.return` — return: o que a função devolve: explicado o que é e o que faz neste programa
- `C.construcao.compreensao` — compreensão de lista ou expressão geradora: explicado o que é e o que faz neste programa
- `C.construcao.fstring` — f-string: texto com valores dentro de chaves: explicado o que é e o que faz neste programa
- `C.construcao.tupla` — tupla: valores entre parênteses, separados por vírgula: explicado o que é e o que faz neste programa
- `C.construcao.funcao_argumento` — função passada como argumento a outra função: explicado o que é e o que faz neste programa
- `C.construcao.argumento_nomeado` — argumento passado por nome (nome=valor): explicado o que é e o que faz neste programa
- `C.construcao.potencia` — operador ** (potência): explicado o que é e o que faz neste programa
- `C.construcao.import_as` — import … as: o apelido da biblioteca: explicado o que é e o que faz neste programa
- `C.construcao.from_import` — from … import: trazer uma função pelo nome: explicado o que é e o que faz neste programa
- `C.verificacao.presente` — o programa faz uma verificação do resultado e a lição a explica
- `C.verificacao.independente` — a verificação é independente: não reusa a relação que produziu o resultado _(dica: marque faltou se não houver verificação)_
- `C.precisao` — o critério de precisão do resultado numérico é explicado no passo em que o método é usado
- `R.controle1.codigo` — observação de controle 1 (Leve a ρ do vidro até 3000 kg/m³): dá a mesma mudança no código e o que o programa imprime
- `R.leitura1.ancorada` — observação 1 (Essa velocidade respeita a lei de Stokes?): cita um valor ou trecho da curva deste exercício; não serviria a outro
- `R.leitura2.ancorada` — observação 2 (Quanto a velocidade real fica abaixo da de Stokes?): cita um valor ou trecho da curva deste exercício; não serviria a outro

## Lição

Fenômenos de transporte · equação não linear

# Velocidade terminal de uma esfera em água

[problem] 

Esferas de vidro de 0,50 mm de diâmetro, d = 0,50 mm, com massa específica ρp = 2500 kg/m³, sedimentam em água, com ρf = 998 kg/m³ e viscosidade μ = 1,0·10⁻³ Pa·s; g = 9,81 m/s². O coeficiente de arrasto segue a correlação de Schiller–Naumann, CD = (24/Re)(1 + 0,15 Re0,687).

Calcule a velocidade terminal, em cm/s.

Calcule o número de Reynolds da partícula nessa velocidade.

Calcule a velocidade que a lei de Stokes daria, em cm/s.

Que diâmetro de esfera, em mm, tem velocidade terminal de 2,0 cm/s?

A esfera cai, e a gravidade a acelera; o arrasto da água cresce com a velocidade e, em algum momento, equilibra o peso aparente da esfera. Dali em diante ela cai com velocidade constante, a velocidade terminal. No fim, você terá um programa que calcula essa velocidade, o número de Reynolds dela e o diâmetro que produz uma velocidade dada.

## Modelo

### Balanço de forças na esfera, em newtons

 ⟦resultante das forças sobre a esfera = massa × aceleração⟧ 

(princípio) A segunda lei de Newton, com a própria esfera como volume de controle: a soma das forças é igual à massa vezes a aceleração.

 ⟦F_p {peso} − F_e {empuxo} − F_D {arrasto} = m ⋅ a {massa × aceleração}⟧ 

Fp, Fe, FD — peso, empuxo e arrasto sobre a esfera, N

m, a — massa da esfera, em kg, e sua aceleração, em m/s²

(tradução) Cada palavra vira uma força, e o lado direito é a massa vezes a aceleração.

 ⟦a = 0⟧ 

(hipótese) Na velocidade terminal a esfera já não acelera. Se ela ainda acelerasse, o termo m·a seria diferente de zero, a velocidade continuaria mudando e o problema exigiria integrar no tempo.

 ⟦F_p − F_e = (π d^(3) )/(6) ⋅ Δρ ⋅ g⟧ 

Δρ — diferença entre as massas específicas do vidro e da água, kg/m³: Δρ = ρp − ρf

(definição) O peso menos o empuxo é o peso aparente da esfera, que depende só do volume da esfera, de Δρ e de g.

 ⟦F_D = C_D ⋅ (π d^(2) )/(4) ⋅ (ρ_f v_t^(2) )/(2)⟧ 

vt — velocidade terminal da esfera, em m/s: a incógnita do problema

CD — coeficiente de arrasto, adimensional

(definição) A força de arrasto é o coeficiente de arrasto vezes a área da seção transversal da esfera vezes a pressão dinâmica do fluido, ρf·vt2/2.

 ⟦C_D = (4 d Δρ g)/(3 ρ_f v_t^(2) )⟧ 

(álgebra) Igualar o peso aparente ao arrasto e isolar CD: o termo π cancela, e o d no numerador vem de d3/d2.

[final] 

 ⟦(4 d Δρ g)/(3 ρ_f v_t^(2) ) {C D exigido pelo balanço} = (24)/(Re) ( 1 + 0,15 Re^(0,687) ) {C D da correlação} , com Re = (ρ_f ⋅ v_t ⋅ d)/(μ)⟧ 

(álgebra) Substituir a correlação de arrasto no lugar de CD: a equação fica com uma só incógnita, vt.

O balanço exige que o arrasto seja igual ao peso aparente, e a correlação diz qual arrasto a água oferece em cada velocidade. Como vt aparece também dentro de Re, não há uma fórmula que isole a velocidade. Ainda assim, a equação se resolve: procuramos a velocidade em que as duas curvas se cruzam.

[eq-block] Correlação de Schiller–Naumann: 

 ⟦C_D = (24)/(Re) ( 1 + 0,15 Re^(0,687) )⟧ 

Re — número de Reynolds da partícula, ρf·vt·d/μ, adimensional

É uma correlação ajustada a dados experimentais: para Re pequeno, recai no arrasto de Stokes, CD = 24/Re, e o termo 0,15Re0,687 corrige o desvio quando Re cresce.

Parâmetro | Valor | Unidade | Fonte | 

d | 0,50 | mm | dadoenunciado | 

ρp | 2500 | kg/m³ | dadoenunciado (vidro) | 

ρf | 998 | kg/m³ | dadoenunciado (água) | 

μ | 1,0·10⁻³ | Pa·s | dadoenunciado (água) | 

g | 9,81 | m/s² | dadoenunciado | 

Δρ | 1502 | kg/m³ | derivado2500 − 998 | 

v2 | 2,0 | cm/s | dadovelocidade alvo da última pergunta | 

intervalo de busca | 10−6 a 1 | m/s | escolhacobre de uma velocidade muito baixa a uma muito alta | 

tolerância xtol | 10−12 | m/s | escolhaprecisão muito além da necessária para 3 algarismos | 

pontos da figura | 96 | — | escolhacurva lisa com pouco custo de cálculo | 

[technique] 

[technique-name] Busca de raiz

Este tipo de problema é uma equação em que a incógnita aparece dentro de si mesma, pelo número de Reynolds, e por isso não se isola numa fórmula. Para resolver este tipo de problema, vamos usar a busca de raiz: o método acha a velocidade que anula a diferença entre o arrasto exigido e o da correlação. Ele serve aqui porque essa diferença muda de sinal entre uma velocidade muito baixa e uma muito alta, o que garante uma raiz entre elas. Em Python, a função que faz isso é brentq, da biblioteca scipy.optimize. Veja a próxima seção para aprender a usá-la.

## Código

[step] 

### Dados em unidades SI

[purpose] Carregar as bibliotecas e guardar cada dado numa variável, com a unidade no comentário.

```
import numpy as np
from scipy.optimize import brentq
import matplotlib.pyplot as plt

# Dados do problema, em unidades SI
d = 0.50e-3 # diâmetro da esfera, m
rho_p = 2500.0 # massa específica do vidro, kg/m³
rho_f = 998.0 # massa específica da água, kg/m³
mu = 1.0e-3 # viscosidade dinâmica da água, Pa·s
g = 9.81 # aceleração da gravidade, m/s²
```

[how] 

import numpy as np — carrega a biblioteca de vetores e cálculo numérico, com o apelido np.

from scipy.optimize import brentq — carrega só a função brentq, a busca de raiz, do módulo optimize do SciPy.

import matplotlib.pyplot as plt — carrega a parte de desenho do matplotlib, com o apelido plt.

0.50e-3 — notação científica: 0,50 × 10−3, ou seja, 0,50 mm em metros.

[so-far] Até aqui, o programa só guarda os dados. Nenhuma conta foi feita.

[step] 

### Correlação e resíduo do balanço

[purpose] Escrever a correlação de arrasto e a diferença entre o arrasto exigido pelo balanço e o da correlação, em função da velocidade.

```
def cd_schiller(Re, c=0.15):
 # Correlação de Schiller–Naumann; c = 0,15 neste problema
 return 24 / Re * (1 + c * Re ** 0.687)

def residuo_v(v, d, c=0.15):
 # Balanço de forças menos a correlação, para a velocidade v, em m/s
 Re = rho_f * v * d / mu
 cd_balanco = 4 * d * (rho_p - rho_f) * g / (3 * rho_f * v ** 2)
 return cd_balanco - cd_schiller(Re, c)
```

[how] 

def nome(...): — define uma função: um bloco de contas com nome, que pode ser chamado de novo com valores diferentes. O que vem depois de return é o que a função devolve.

Re, v, d — argumentos de residuo_v: a velocidade, em m/s, e o diâmetro, em m, que a função recebe a cada chamada.

c=0.15 — argumento com valor padrão: se ninguém disser outro valor, c vale 0,15.

Re ** 0.687 — potência: o número de Reynolds elevado a 0,687.

rho_p, rho_f, mu, g — não são argumentos: a função lê esses nomes do topo do programa, por serem variáveis globais, e assim não precisam ser passados.

[so-far] O programa agora sabe calcular, para qualquer velocidade, quanto a diferença entre o balanço e a correlação vale. A busca de raiz ainda não começou.

[step] 

### Velocidade que anula o resíduo

[purpose] Procurar a velocidade em que a diferença vale zero e imprimir a velocidade e o número de Reynolds dela.

```
# Velocidade que anula o resíduo, procurada entre 1e-6 e 1 m/s
v_t = brentq(residuo_v, 1e-6, 1.0, args=(d,), xtol=1e-12)
Re_t = rho_f * v_t * d / mu
print(f"Velocidade terminal: {v_t * 100:.2f} cm/s")
print(f"Número de Reynolds: {Re_t:.1f}")
```

[how] 

brentq(f, a, b, ...) — procura a raiz de f entre a e b. Aqui, f é residuo_v, a = 10−6 m/s e b = 1 m/s. Ele chama residuo_v muitas vezes, com um valor de v de cada vez, e usa o sinal do resultado para fechar o intervalo.

args=(d,) — valores extras que brentq entrega a cada chamada, depois da velocidade. A vírgula final faz da expressão uma tupla de um elemento; sem ela, seria só o número.

xtol=1e-12 — critério de precisão: a busca para quando o intervalo que contém a raiz é menor que 10−12 m/s, ou seja, a velocidade sai com precisão de um trilionésimo de metro por segundo.

f"... {v_t * 100:.2f} cm/s" — texto com um valor dentro; v_t * 100 converte m/s em cm/s e .2f pede duas casas decimais.

[so-far] O programa imprime a velocidade terminal, em cm/s, e o número de Reynolds dela.

[step] 

### Lei de Stokes e verificações

[purpose] Calcular a velocidade de Stokes pela fórmula fechada e confirmar a raiz por dois caminhos independentes.

```
# Lei de Stokes, em forma fechada
v_stokes = g * d**2 * (rho_p - rho_f) / (18 * mu)
Re_stokes = rho_f * v_stokes * d / mu
print(f"Velocidade de Stokes: {v_stokes * 100:.2f} cm/s")
print(f"Reynolds da lei de Stokes: {Re_stokes:.1f}")
print(f"Razão Stokes/terminal: {v_stokes / v_t:.2f}")

# Verificação 1: com c = 0, a correlação vira 24/Re (Stokes)
v_teste = brentq(residuo_v, 1e-6, 1.0, args=(d, 0.0), xtol=1e-12)
print(f"Teste de Stokes, diferença: {abs(v_teste - v_stokes):.1e} m/s")

# Verificação 2: C_D·Re² = (4/3)·Ar, sem usar a velocidade
Ar = d**3 * rho_f * (rho_p - rho_f) * g / mu**2
print(f"C_D·Re² = {cd_schiller(Re_t) * Re_t**2:.2f}")
print(f"4/3·Ar = {4 / 3 * Ar:.2f}")
```

[how] 

d**2 — elevado ao quadrado: ** é a potência em Python.

args=(d, 0.0) — na verificação 1, o segundo argumento de residuo_v, c, vale zero. Com c = 0 a correlação vira 24/Re, e a raiz tem de ser exatamente a velocidade de Stokes.

Ar — o número de Arquimedes, d³ρfΔρ·g/μ². Ele não contém a velocidade, então o produto C_D·Re² calculado a partir de Re_t deve dar 4/3 de Ar.

xtol=1e-12 — a mesma precisão da etapa anterior: a busca para quando o intervalo tem menos de 10−12 m/s.

abs(...) — valor absoluto, a diferença sem sinal; .1e imprime em notação científica, com uma casa decimal.

[so-far] O programa agora tem a velocidade de Stokes, a razão entre as duas velocidades e duas verificações que confirmam a raiz.

[step] 

### Diâmetro para 2,0 cm/s

[purpose] Inverter a pergunta: a velocidade é fixa e o diâmetro é a incógnita.

```
# Diâmetro que dá 2,0 cm/s: agora a incógnita é d
v_2 = 0.020 # velocidade alvo, m/s
def residuo_d(d, v):
 # Mesmo balanço, com v fixo e d como incógnita
 Re = rho_f * v * d / mu
 cd_balanco = 4 * d * (rho_p - rho_f) * g / (3 * rho_f * v ** 2)
 return cd_balanco - cd_schiller(Re)

d_2 = brentq(residuo_d, 1e-6, 1e-3, args=(v_2,), xtol=1e-12)
print(f"Diâmetro para 2,0 cm/s: {d_2 * 1000:.3f} mm")
```

[how] 

residuo_d(d, v) — a incógnita vem primeiro. brentq chama a função como residuo_d(d, v_2): o primeiro argumento é o que ele varia, e o que está em args vem depois, na mesma ordem.

1e-6, 1e-3 — o intervalo de busca do diâmetro, de um micrômetro a um milímetro. A raiz tem de estar nele, e a faixa é larga o bastante para isso.

xtol=1e-12 — a mesma precisão de antes, agora sobre o diâmetro: a busca para com um intervalo menor que 10−12 m.

d_2 * 1000 — converte de metros para milímetros.

[so-far] O programa imprime o diâmetro que dá a velocidade de 2,0 cm/s.

[step] 

### Figura da velocidade contra o diâmetro

[purpose] Desenhar as duas velocidades em função do diâmetro, para comparar a correlação com a lei de Stokes.

```
# Figura: velocidade terminal e de Stokes contra o diâmetro
d_mm = np.linspace(0.05, 1.0, 96) # diâmetros, mm
v_sn = np.array([
 brentq(residuo_v, 1e-6, 1.0, args=(x * 1e-3,), xtol=1e-12)
 for x in d_mm # uma raiz por diâmetro
])
v_st = g * (d_mm * 1e-3)**2 * (rho_p - rho_f) / (18 * mu)

plt.plot(d_mm, v_sn * 100,
 label="Velocidade terminal (Schiller–Naumann)")
plt.plot(d_mm, v_st * 100, "--", label="Velocidade de Stokes")
plt.xlabel("Diâmetro da esfera (mm)")
plt.ylabel("Velocidade (cm/s)")
plt.legend()
plt.grid(True)
plt.show()
```

[how] 

np.linspace(0.05, 1.0, 96) — 96 valores igualmente espaçados de 0,05 a 1,0 mm.

[brentq(...) for x in d_mm] — lista por compreensão: repete a conta para cada x de d_mm e junta os resultados numa lista; np.array(...) a transforma num vetor.

args=(x * 1e-3,) — dentro da compreensão, o diâmetro x, convertido em metros, chega a residuo_v como o argumento d; a vírgula, de novo, faz da expressão uma tupla de um elemento.

xtol=1e-12 — a mesma precisão das etapas anteriores, agora em cada uma das 96 raízes.

"--" — o terceiro argumento de plt.plot é o estilo da linha: tracejada. label= dá o nome que aparece na legenda.

plt.show() — abre a janela com o desenho. Sem ela, nada aparece.

[so-far] Ao rodar, o programa imprime os resultados e abre a figura.

[step] 

### Programa completo

```
import numpy as np
from scipy.optimize import brentq
import matplotlib.pyplot as plt

# Dados do problema, em unidades SI
d = 0.50e-3 # diâmetro da esfera, m
rho_p = 2500.0 # massa específica do vidro, kg/m³
rho_f = 998.0 # massa específica da água, kg/m³
mu = 1.0e-3 # viscosidade dinâmica da água, Pa·s
g = 9.81 # aceleração da gravidade, m/s²

def cd_schiller(Re, c=0.15):
 # Correlação de Schiller–Naumann; c = 0,15 neste problema
 return 24 / Re * (1 + c * Re ** 0.687)

def residuo_v(v, d, c=0.15):
 # Balanço de forças menos a correlação, para a velocidade v, em m/s
 Re = rho_f * v * d / mu
 cd_balanco = 4 * d * (rho_p - rho_f) * g / (3 * rho_f * v ** 2)
 return cd_balanco - cd_schiller(Re, c)

# Velocidade que anula o resíduo, procurada entre 1e-6 e 1 m/s
v_t = brentq(residuo_v, 1e-6, 1.0, args=(d,), xtol=1e-12)
Re_t = rho_f * v_t * d / mu
print(f"Velocidade terminal: {v_t * 100:.2f} cm/s")
print(f"Número de Reynolds: {Re_t:.1f}")

# Lei de Stokes, em forma fechada
v_stokes = g * d**2 * (rho_p - rho_f) / (18 * mu)
Re_stokes = rho_f * v_stokes * d / mu
print(f"Velocidade de Stokes: {v_stokes * 100:.2f} cm/s")
print(f"Reynolds da lei de Stokes: {Re_stokes:.1f}")
print(f"Razão Stokes/terminal: {v_stokes / v_t:.2f}")

# Verificação 1: com c = 0, a correlação vira 24/Re (Stokes)
v_teste = brentq(residuo_v, 1e-6, 1.0, args=(d, 0.0), xtol=1e-12)
print(f"Teste de Stokes, diferença: {abs(v_teste - v_stokes):.1e} m/s")

# Verificação 2: C_D·Re² = (4/3)·Ar, sem usar a velocidade
Ar = d**3 * rho_f * (rho_p - rho_f) * g / mu**2
print(f"C_D·Re² = {cd_schiller(Re_t) * Re_t**2:.2f}")
print(f"4/3·Ar = {4 / 3 * Ar:.2f}")

# Diâmetro que dá 2,0 cm/s: agora a incógnita é d
v_2 = 0.020 # velocidade alvo, m/s
def residuo_d(d, v):
 # Mesmo balanço, com v fixo e d como incógnita
 Re = rho_f * v * d / mu
 cd_balanco = 4 * d * (rho_p - rho_f) * g / (3 * rho_f * v ** 2)
 return cd_balanco - cd_schiller(Re)

d_2 = brentq(residuo_d, 1e-6, 1e-3, args=(v_2,), xtol=1e-12)
print(f"Diâmetro para 2,0 cm/s: {d_2 * 1000:.3f} mm")

# Figura: velocidade terminal e de Stokes contra o diâmetro
d_mm = np.linspace(0.05, 1.0, 96) # diâmetros, mm
v_sn = np.array([
 brentq(residuo_v, 1e-6, 1.0, args=(x * 1e-3,), xtol=1e-12)
 for x in d_mm # uma raiz por diâmetro
])
v_st = g * (d_mm * 1e-3)**2 * (rho_p - rho_f) / (18 * mu)

plt.plot(d_mm, v_sn * 100,
 label="Velocidade terminal (Schiller–Naumann)")
plt.plot(d_mm, v_st * 100, "--", label="Velocidade de Stokes")
plt.xlabel("Diâmetro da esfera (mm)")
plt.ylabel("Velocidade (cm/s)")
plt.legend()
plt.grid(True)
plt.show()
```

As seis etapas, na ordem, formam este programa, pronto para rodar.

## Resultado

[answer] 

Velocidade terminal: vt = 7,35 cm/s. Número de Reynolds nessa velocidade: Re = 36,7. Velocidade de Stokes: 20,46 cm/s, mas com Re = 102,1, fora do alcance da lei. Diâmetro para 2,0 cm/s: 0,183 mm.

### Velocidade terminal e de Stokes contra o diâmetro

[figura; controles: rhop] 

### Essa velocidade respeita a lei de Stokes?

Não. Na velocidade de Stokes, o número de Reynolds seria 102,1, bem acima da faixa em que a lei vale. Com o Re real, 36,7, o arrasto já se afasta de 24/Re.

### Quanto a velocidade real fica abaixo da de Stokes?

A velocidade de Stokes é 2,78 vezes a terminal. Esse fator é exatamente 1 + 0,15·Re0,687, calculado com o Re real: o arrasto real cresce mais do que 24/Re. Na curva, a velocidade terminal fica sempre abaixo da velocidade de Stokes, e a distância aumenta com o diâmetro.

### Leve a ρ do vidro até 3000 kg/m³

[in-your-code] Na primeira linha de dados, troque rho_p = 2500.0 por rho_p = 3000.0 e rode de novo. O programa imprime Velocidade terminal: 8,97 cm/s e Número de Reynolds: 44,7. A esfera mais pesada cai mais depressa, e a curva sobe.

 Algo não ficou claro? Pergunte no chat.
