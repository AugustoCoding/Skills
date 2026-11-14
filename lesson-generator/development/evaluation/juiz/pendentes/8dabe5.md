# Pacote 8dabe5

Julgue conforme `juiz/JUIZ.md` e grave a resposta em `juiz/respostas/8dabe5.json`.

## Enunciado enviado ao modelo

An exothermic liquid-phase reaction A → B, first order in A, is carried out in a jacketed batch reactor. The rate constant is k = 6.0×10⁶ exp(−E/(RT)) s⁻¹, with E = 60 kJ/mol and R = 8.314 J/(mol·K). The initial concentration of A is 2000 mol/m³, the heat of reaction is −80 kJ/mol, and the volumetric heat capacity of the mixture is ρ·cp = 4.0×10⁶ J/(m³·K). The jacket stays at 300 K and removes heat with UA/V = 2000 W/(m³·K). The reactor starts at 320 K. Calculate the maximum temperature (K) and the time at which it occurs (min), the conversion after 30 min (%) and the time to reach 95% conversion (min).

## Itens a julgar

- `M.balanco1.leitura` — balanço 1: a equação final vem com o parágrafo do que ela representa e do que implica _(dica: o parágrafo existe; diga se descreve o processo e uma implicação)_
- `M.balanco1.hipotese4` — balanço 1, passo 4 (hipótese): diz o que aconteceria se ela não valesse _(dica: assumption A liquid-phase reaction changes the density very little. If the volume changed…)_
- `M.balanco2.leitura` — balanço 2: a equação final vem com o parágrafo do que ela representa e do que implica _(dica: o parágrafo existe; diga se descreve o processo e uma implicação)_
- `M.balanco2.hipotese3` — balanço 2, passo 3 (hipótese): diz o que aconteceria se ela não valesse _(dica: assumption The mixture keeps the same heat capacity as A turns into B, and the jacket flu…)_
- `M.bloco1.origem` — equação complementar 1: diz de onde vem e o que afirma _(dica: Arrhenius law)_
- `M.simbolo.V` — símbolo V: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.C_A` — símbolo C_A: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.t` — símbolo t: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.r` — símbolo r: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.k` — símbolo k: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.ρ` — símbolo ρ: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.c_p` — símbolo c_p: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.T` — símbolo T: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.H` — símbolo H: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.U` — símbolo U: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.A` — símbolo A: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.T_j` — símbolo T_j: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.ΔH` — símbolo ΔH: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.k_0` — símbolo k_0: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.E` — símbolo E: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.simbolo.R` — símbolo R: definido onde aparece pela primeira vez, em frase completa e com unidade _(dica: marque na se não for uma grandeza (operador, índice, número))_
- `M.constante.E` — o valor E = 60000 do programa está na tabela de parâmetros _(dica: não achei o número na tabela: pode estar em outra unidade; se não estiver, faltou)_
- `M.constante.dH` — o valor dH = 80000 do programa está na tabela de parâmetros _(dica: não achei o número na tabela: pode estar em outra unidade; se não estiver, faltou)_
- `M.tecnica.tipo` — técnica: diz que tipo de problema matemático é, em palavras comuns
- `M.tecnica.porque` — técnica: diz por que ela serve para este caso
- `M.tecnica.python` — técnica: nomeia a função de Python e a biblioteca _(dica: há um <code>; confirme função e biblioteca)_
- `M.termo.integrator` — termo de método numérico "integrator": explicado em palavras comuns na primeira vez que aparece
- `M.termo.tolerance` — termo de método numérico "tolerance": explicado em palavras comuns na primeira vez que aparece
- `C.funcao.np.exp` — passo 2: função de biblioteca np.exp(…): explicado o que ela faz e o que recebe
- `C.funcao.solve_ivp` — passo 3: função de biblioteca solve_ivp(…): explicado o que ela faz
- `C.arg.solve_ivp.posição1` — passo 3: argumento de solve_ivp, posição 1 (balances): o que é e por que tem esse valor
- `C.arg.solve_ivp.posição2` — passo 3: argumento de solve_ivp, posição 2 ([0, 7200]): o que é e por que tem esse valor
- `C.arg.solve_ivp.posição3` — passo 3: argumento de solve_ivp, posição 3 ([CA0, T0]): o que é e por que tem esse valor
- `C.arg.solve_ivp.args` — passo 3: argumento de solve_ivp, args ((UA_V, Tj)): o que é e por que tem esse valor
- `C.arg.solve_ivp.events` — passo 3: argumento de solve_ivp, events (reach95): o que é e por que tem esse valor
- `C.arg.solve_ivp.dense_output` — passo 3: argumento de solve_ivp, dense_output (True): o que é e por que tem esse valor
- `C.arg.solve_ivp.rtol` — passo 3: argumento de solve_ivp, rtol (1e-8): o que é e por que tem esse valor
- `C.arg.solve_ivp.atol` — passo 3: argumento de solve_ivp, atol (1e-8): o que é e por que tem esse valor
- `C.funcao.np.linspace` — passo 4: função de biblioteca np.linspace(…): explicado o que ela faz
- `C.arg.np.linspace.posição1` — passo 4: argumento de np.linspace, posição 1 (0): o que é e por que tem esse valor
- `C.arg.np.linspace.posição2` — passo 4: argumento de np.linspace, posição 2 (3600): o que é e por que tem esse valor
- `C.arg.np.linspace.posição3` — passo 4: argumento de np.linspace, posição 3 (3601): o que é e por que tem esse valor
- `C.funcao.print` — passo 4: função nativa print(…): explicado o que ela faz e o que recebe
- `C.funcao.trapezoid` — passo 5: função de biblioteca trapezoid(…): explicado o que ela faz
- `C.arg.trapezoid.posição1` — passo 5: argumento de trapezoid, posição 1 (k_t[:1801]): o que é e por que tem esse valor
- `C.arg.trapezoid.posição2` — passo 5: argumento de trapezoid, posição 2 (t[:1801]): o que é e por que tem esse valor
- `C.funcao.plt.subplots` — passo 6: função de biblioteca plt.subplots(…): explicado o que ela faz
- `C.funcao.plt.show` — passo 6: função de biblioteca plt.show(…): explicado o que ela faz
- `C.mecanismo.solve_ivp.balances` — passo 3: o mecanismo de solve_ivp com a função balances: quem a chama, quantas vezes, com que valores e o que é feito com o que ela devolve
- `C.mecanismo.solve_ivp.reach95` — passo 3: o mecanismo de solve_ivp com a função reach95: quem a chama, quantas vezes, com que valores e o que é feito com o que ela devolve
- `C.construcao.def` — definição de função com def: explicado o que é e o que faz neste programa
- `C.construcao.return` — return: o que a função devolve: explicado o que é e o que faz neste programa
- `C.construcao.fstring` — f-string: texto com valores dentro de chaves: explicado o que é e o que faz neste programa
- `C.construcao.indice` — índice entre colchetes, como y[0]: explicado o que é e o que faz neste programa
- `C.construcao.fatia` — fatia entre colchetes, como x[1:] ou y[:, -1]: explicado o que é e o que faz neste programa
- `C.construcao.desempacotamento` — desempacotamento: várias variáveis recebem de uma vez: explicado o que é e o que faz neste programa
- `C.construcao.tupla` — tupla: valores entre parênteses, separados por vírgula: explicado o que é e o que faz neste programa
- `C.construcao.lista` — lista: valores entre colchetes: explicado o que é e o que faz neste programa
- `C.construcao.atributo` — atributo de um objeto, depois do ponto: explicado o que é e o que faz neste programa _(dica: no programa: .argmax, .plot, .set_xlabel, .set_ylabel, .sol, .t_events, .twinx)_
- `C.construcao.funcao_argumento` — função passada como argumento a outra função: explicado o que é e o que faz neste programa
- `C.construcao.argumento_nomeado` — argumento passado por nome (nome=valor): explicado o que é e o que faz neste programa
- `C.construcao.import_as` — import … as: o apelido da biblioteca: explicado o que é e o que faz neste programa
- `C.construcao.from_import` — from … import: trazer uma função pelo nome: explicado o que é e o que faz neste programa
- `C.verificacao.presente` — o programa faz uma verificação do resultado e a lição a explica
- `C.verificacao.independente` — a verificação é independente: não reusa a relação que produziu o resultado _(dica: marque faltou se não houver verificação)_
- `C.precisao` — o critério de precisão do resultado numérico é explicado no passo em que o método é usado
- `R.controle1.codigo` — observação de controle 1 (Raise UA/V to 4000 W/(m³·K)): dá a mesma mudança no código e o que o programa imprime
- `R.controle2.codigo` — observação de controle 2 (Start the reactor at 300 K, the jacket temperature): dá a mesma mudança no código e o que o programa imprime
- `R.leitura1.ancorada` — observação 1 (Why does the temperature rise first and then fall?): cita um valor ou trecho da curva deste exercício; não serviria a outro
- `R.leitura2.ancorada` — observação 2 (Why is the conversion already 95 % at 18.0 min, after the p…): cita um valor ou trecho da curva deste exercício; não serviria a outro

## Lição

Reaction engineering · system of ordinary differential equations

# Exothermic batch reactor with a cooling jacket

[problem] 

An exothermic liquid-phase reaction A → B, first order in A, takes place in a jacketed batch reactor. The rate constant is k = k0·exp(−E/(RT)), with k0 = 6.0×10⁶ s⁻¹, E = 60 kJ/mol and R = 8.314 J/(mol·K). The initial concentration of A is CA(0) = 2000 mol/m³, the heat of reaction is ΔH = −80 kJ/mol and the volumetric heat capacity of the mixture is ρcp = 4.0×10⁶ J/(m³·K). The jacket stays at Tj = 300 K and removes heat with UA/V = 2000 W/(m³·K). The reactor starts at T(0) = 320 K.

What is the maximum temperature of the reactor, in K?

At what time does the maximum occur, in min?

What is the conversion of A after 30 min, in %?

How long does it take to reach 95 % conversion, in min?

The reaction releases heat and the jacket removes it. The heat warms the liquid, which speeds the reaction up; meanwhile A is consumed and the rate eventually falls. At the end you will have a Python program that follows concentration and temperature over time and answers the four questions.

## Model

### Mass balance of component A, in moles

 ⟦accumulation of A = in − out − consumption⟧ 

(principle) A does not appear or disappear for no reason. The control volume is the liquid inside the reactor.

 ⟦(d ( V ⋅ C_A ))/(d t) {accumulation} = 0 {nothing enters} − 0 {nothing leaves} − r ⋅ V {consumption}⟧ 

CA — concentration of reactant A inside the reactor, mol/m³

V — volume of liquid in the reactor, m³

r — reaction rate per volume of liquid, mol/(m³·s)

(translation) A batch reactor has no feed and no outlet, so both stream terms are zero. Each remaining word becomes a molar flow of A, in mol/s.

 ⟦r = k ⋅ C_A⟧ 

k — rate constant of the reaction, which depends on the temperature as in the Arrhenius law below, 1/s

(kinetics) First order in A, as the problem states.

 ⟦V = constant⟧ 

(assumption) A liquid-phase reaction changes the density very little. If the volume changed noticeably, V would stay inside the derivative and would need a balance of its own.

[final] 

 ⟦(d C_A )/(d t) {accumulation of A} = − k ⋅ C_A {consumption}⟧ 

(algebra) Everything divided by V, which is constant.

The concentration of reactant A only falls, at a speed proportional to itself. The catch is that k depends on the temperature, so this equation cannot be solved alone: it needs the energy balance.

### Energy balance of the liquid, in joules

 ⟦accumulation of energy = heat released by the reaction − heat removed by the jacket⟧ 

(principle) Energy is conserved. The control volume is the same liquid; with no streams, energy only changes through the reaction and the exchange with the jacket.

 ⟦ρ c_p ⋅ V ⋅ (d T)/(d t) {accumulation of energy} = ( − Δ H ) ⋅ r ⋅ V {heat of reaction} − U A ⋅ ( T − T_j ) {exchange with the jacket}⟧ 

T — temperature of the liquid in the reactor, K

ρcp — volumetric heat capacity of the mixture, the energy needed to warm 1 m³ by 1 K, J/(m³·K)

ΔH — heat of reaction per mole of A reacted, negative because the reaction is exothermic, J/mol

UA — overall heat transfer coefficient times jacket area, W/K

Tj — temperature of the jacket, K

(translation) The reaction releases (−ΔH) joules per mole, at r·V moles per second. The jacket takes heat away when the liquid is hotter than it, and would bring heat in if it were colder.

 ⟦ρ c_p = constant , T_j = constant⟧ 

(assumption) The mixture keeps the same heat capacity as A turns into B, and the jacket fluid is so well supplied that its temperature does not move. If the jacket warmed up, it would need an energy balance of its own and would remove less heat.

[final] 

 ⟦(d T)/(d t) {heating rate} = ( ( − ΔH ) ⋅ k ⋅ C_A {heat released} − (U A)/(V) ⋅ ( T − T_j ) {heat removed} )/(ρ c_p )⟧ 

(algebra) Everything divided by V, with r = kCA; this gives the form with UA/V used in the problem.

The temperature rises while the heat released exceeds the heat removed and falls when the order reverses. The maximum is the instant when the two are equal, and its value depends on how much A is left at that moment.

[eq-block] Arrhenius law: 

 ⟦k = k_0 ⋅ exp ( − (E)/(R ⋅ T) )⟧ 

k0 — pre-exponential factor, 1/s

E — activation energy, J/mol

R — gas constant, 8.314 J/(mol·K)

Given by the problem. It couples the two balances: the temperature sets k, and k sets how fast heat is released. The temperature must be in kelvin.

Parameter | Value | Unit | Source | 

k0 | 6.0×10⁶ | 1/s | given | 

E | 60 000 | J/mol | given 60 kJ/mol | 

R | 8.314 | J/(mol·K) | constant | 

CA(0) | 2000 | mol/m³ | given | 

ΔH | −80 000 | J/mol | given −80 kJ/mol | 

ρcp | 4.0×10⁶ | J/(m³·K) | given | 

UA/V | 2000 | W/(m³·K) | given | 

Tj | 300 | K | given | 

T(0) | 320 | K | given | 

Simulated time | 7200 | s | choice 2 h, enough for A to be almost gone | 

Tolerances | 10⁻⁸ | — | choice tight enough that the first decimal of the answers does not change | 

[technique] 

[technique-name] Numerical integration

The unknowns CA and T change with time and each derivative depends on both: a system of ordinary differential equations with no formula, because k depends on the temperature. To solve this kind of problem, we will use numerical integration: starting from the initial values, the computer advances time in many small steps, using the derivatives to estimate the next values, and chooses the step size by itself to keep the error small. It fits because we know the starting state and the rules of change. In Python, the function that does this is solve_ivp, from the library scipy.integrate. See the next section to learn how to use it.

## Code

[step] 

### Libraries and data

[purpose] Load the tools and give a name to every value of the problem, in SI units (seconds, joules, moles, metres, kelvin) so no conversion is needed later.

```
import numpy as np
from scipy.integrate import solve_ivp, trapezoid
import matplotlib.pyplot as plt

# --- Data of the problem ---
k0 = 6.0e6 # pre-exponential factor, 1/s
E = 60e3 # activation energy, J/mol
R = 8.314 # gas constant, J/(mol K)
CA0 = 2000.0 # initial concentration of A, mol/m3
dH = -80e3 # heat of reaction, J/mol
rho_cp = 4.0e6 # volumetric heat capacity, J/(m3 K)
UA_V = 2000.0 # heat transfer, W/(m3 K)
Tj = 300.0 # jacket temperature, K
T0 = 320.0 # initial temperature, K
```

[how] import loads a library. from scipy.integrate import solve_ivp, trapezoid takes two functions from scipy.integrate: the integrator and a function that integrates a series of points (used in the check). import numpy as np loads NumPy under the short name np; matplotlib.pyplot as plt loads the plotting tool. A line starting with # is a comment, ignored by Python. name = value stores a value under a name; 6.0e6 means 6.0×10⁶ and 60e3 means 60×10³.

[so-far] The program knows all the data of the exercise.

[step] 

### Balance function

[purpose] Write the two derivatives of the model in a function, the only piece of the program that carries the engineering.

```
# --- Balances: derivatives of the state y = [CA, T] ---
def balances(t, y, UA_V, Tj):
 CA, T = y
 k = k0 * np.exp(-E / (R * T)) # 1/s
 r = k * CA # mol/(m3 s)
 dCA = -r # mol/(m3 s)
 dT = ((-dH) * r - UA_V * (T - Tj)) / rho_cp # K/s
 return [dCA, dT]
```

[how] def balances(t, y, UA_V, Tj): defines a function, a named block of code that receives values and returns a result. The integrator will call it many times, each time with the current time t in s, the current state y and the two extra values UA_V and Tj, and will use what it returns to decide the next step. The state always arrives as a list; CA, T = y is unpacking: the first element goes to CA, the second to T. np.exp is the exponential. The last line, return [dCA, dT], gives back a list with the two derivatives, in the same order as the state. The -dH turns the negative heat of reaction into heat released. The time t is not used because the equations do not depend on it explicitly, but the integrator always passes it first.

[so-far] Given a state, the program can now compute how fast it changes.

[step] 

### Event and integration

[purpose] Ask the integrator to advance from 0 to 2 h and to note when the concentration of A drops to 5 % of its initial value, which is 95 % conversion.

```
# --- Event: CA falls to 5 % of the initial value ---
def reach95(t, y, UA_V, Tj):
 return y[0] - 0.05 * CA0
# --- Integration over 2 h ---
sol = solve_ivp(balances, [0, 7200], [CA0, T0], args=(UA_V, Tj),
 events=reach95, dense_output=True,
 rtol=1e-8, atol=1e-8)
```

[how] The function reach95 is an event function: the integrator calls it with the same arguments as balances and records the instant at which the value it returns crosses zero. Here it returns y[0] - 0.05 * CA0; y[0] is the first element of the state (Python counts from 0), the concentration of A, so the result is zero at 95 % conversion. The call solve_ivp receives:

[how] 

balances — the function written before, passed without parentheses: we hand over the function itself and solve_ivp calls it.

[0, 7200] — initial and final times, s.

[CA0, T0] — initial state, in the same order as the derivatives.

args=(UA_V, Tj) — extra values that solve_ivp appends to every call of balances and reach95. It is a tuple (a fixed list in parentheses); the comma matters when there is a single item.

events=reach95 — the event function to watch.

dense_output=True — keeps a continuous solution, so we can ask for the state at any instant afterwards.

rtol=1e-8, atol=1e-8 — tolerances: the largest relative and absolute error accepted at each step. The integrator shrinks the step until its estimated error is below them. Tightening them until the first decimal of the answers stopped changing is the precision criterion.

[so-far] The variable sol holds the whole solution and the instant of the event.

[step] 

### Reading the four answers

[purpose] Sample the solution every second up to 60 min and extract the quantities that the exercise asks for.

```
# --- Results on a 1 s grid, up to 60 min ---
t = np.linspace(0, 3600, 3601) # s
CA, T = sol.sol(t)
i = T.argmax()
X30 = 1 - sol.sol(1800)[0] / CA0
t95 = sol.t_events[0][0]

print(f"Maximum temperature: {T[i]:.1f} K")
print(f"Time of the maximum: {t[i] / 60:.1f} min")
print(f"Conversion at 30 min: {100 * X30:.1f} %")
print(f"Time to 95 % conversion: {t95 / 60:.1f} min")
```

[how] np.linspace(0, 3600, 3601) builds 3601 equally spaced values from 0 to 3600 s, one per second. sol.sol(t) evaluates the continuous solution at all of them and returns two rows, which we unpack into CA and T. T.argmax() is the position of the largest temperature, so T[i] is the maximum and t[i] the instant it occurs. The conversion is 1 − CA/CA0, evaluated at 1800 s (30 min); sol.sol(1800)[0] takes the first element (the concentration) of the state at that instant. sol.t_events[0][0] is the first instant of the first (and only) event. print(f"…") prints text; in an f-string each {…} is replaced by the value, and :.1f means one decimal place. Dividing by 60 converts seconds to minutes.

[so-far] The program prints the four numbers requested. The search for the maximum covers the first 60 min.

[step] 

### Independent check

[purpose] Confirm the conversion with a calculation that does not use the integrator's concentration.

```
# --- Check: conversion from the integral of k over time ---
k_t = k0 * np.exp(-E / (R * T))
X_check = 1 - np.exp(-trapezoid(k_t[:1801], t[:1801]))
print(f"Check, conversion at 30 min: {100 * X_check:.1f} %")
```

[how] For a first-order reaction, CA = CA(0)·exp(−∫k dt), so the conversion is 1 − exp(−∫k dt). The line k_t = … computes k at every second from the temperature curve alone. trapezoid(y, x) estimates the area under the points by adding up trapezoids, and [:1801] keeps the first 1801 values, from 0 to 1800 s. The two conversions agree, which shows that the concentration and the temperature produced by the integrator are consistent with each other.

[so-far] The program also prints the checked value, which matches the conversion at 30 min.

[step] 

### Figure

[purpose] Draw concentration and temperature against time, on two vertical axes because their units differ.

```
# --- Figure ---
fig, ax1 = plt.subplots()
ax1.plot(t / 60, CA, color="tab:blue")
ax1.set_xlabel("Time (min)")
ax1.set_ylabel("Concentration of A (mol/m3)", color="tab:blue")
ax2 = ax1.twinx()
ax2.plot(t / 60, T, color="tab:red")
ax2.set_ylabel("Temperature (K)", color="tab:red")
plt.show()
```

[how] plt.subplots() creates the figure and its axes, ax1. ax1.plot(x, y, color=…) draws a curve; the time is divided by 60 to show minutes. ax1.twinx() creates a second axis, ax2, that shares the horizontal axis but has its own vertical scale. set_xlabel and set_ylabel write the axis labels with units, and plt.show() opens the window with the figure.

[so-far] The program is complete: it computes, prints, checks and draws.

[step] 

### Complete program

```
import numpy as np
from scipy.integrate import solve_ivp, trapezoid
import matplotlib.pyplot as plt

# --- Data of the problem ---
k0 = 6.0e6 # pre-exponential factor, 1/s
E = 60e3 # activation energy, J/mol
R = 8.314 # gas constant, J/(mol K)
CA0 = 2000.0 # initial concentration of A, mol/m3
dH = -80e3 # heat of reaction, J/mol
rho_cp = 4.0e6 # volumetric heat capacity, J/(m3 K)
UA_V = 2000.0 # heat transfer, W/(m3 K)
Tj = 300.0 # jacket temperature, K
T0 = 320.0 # initial temperature, K

# --- Balances: derivatives of the state y = [CA, T] ---
def balances(t, y, UA_V, Tj):
 CA, T = y
 k = k0 * np.exp(-E / (R * T)) # 1/s
 r = k * CA # mol/(m3 s)
 dCA = -r # mol/(m3 s)
 dT = ((-dH) * r - UA_V * (T - Tj)) / rho_cp # K/s
 return [dCA, dT]

# --- Event: CA falls to 5 % of the initial value ---
def reach95(t, y, UA_V, Tj):
 return y[0] - 0.05 * CA0
# --- Integration over 2 h ---
sol = solve_ivp(balances, [0, 7200], [CA0, T0], args=(UA_V, Tj),
 events=reach95, dense_output=True,
 rtol=1e-8, atol=1e-8)

# --- Results on a 1 s grid, up to 60 min ---
t = np.linspace(0, 3600, 3601) # s
CA, T = sol.sol(t)
i = T.argmax()
X30 = 1 - sol.sol(1800)[0] / CA0
t95 = sol.t_events[0][0]

print(f"Maximum temperature: {T[i]:.1f} K")
print(f"Time of the maximum: {t[i] / 60:.1f} min")
print(f"Conversion at 30 min: {100 * X30:.1f} %")
print(f"Time to 95 % conversion: {t95 / 60:.1f} min")

# --- Check: conversion from the integral of k over time ---
k_t = k0 * np.exp(-E / (R * T))
X_check = 1 - np.exp(-trapezoid(k_t[:1801], t[:1801]))
print(f"Check, conversion at 30 min: {100 * X_check:.1f} %")

# --- Figure ---
fig, ax1 = plt.subplots()
ax1.plot(t / 60, CA, color="tab:blue")
ax1.set_xlabel("Time (min)")
ax1.set_ylabel("Concentration of A (mol/m3)", color="tab:blue")
ax2 = ax1.twinx()
ax2.plot(t / 60, T, color="tab:red")
ax2.set_ylabel("Temperature (K)", color="tab:red")
plt.show()
```

The steps together, in order, ready to run.

## Result

[answer] 

Maximum temperature: 341.3 K, reached at 13.7 min. Conversion after 30 min: 99.2 %. Time to reach 95 % conversion: 18.0 min. The independent check gives 99.2 % at 30 min, the same value.

[figura; controles: UAV, T0] 

### Why does the temperature rise first and then fall?

At the start the temperature climbs from 320 K because the heat released by the reaction exceeds what the jacket removes. The peak, 341.3 K at 13.7 min, is the instant when the two are equal. After that, reactant A is so depleted that the heat released drops below the heat removed, and the liquid cools toward the jacket at 300 K.

### Why is the conversion already 95 % at 18.0 min, after the peak?

The reactant A concentration falls fastest while the temperature is high, around the peak at 13.7 min. By the time the liquid cools, little A is left; 99.2 % has reacted at 30 min.

### Raise UA/V to 4000 W/(m³·K)

A stronger jacket removes heat faster. The temperature peak becomes much smaller and arrives earlier, and as the liquid stays cooler the reaction is slower, so reaching a given conversion takes longer.

[in-your-code] In the program, set UA_V = 4000.0. It prints a maximum of 327.3 K at 10.5 min, a conversion of 88.6 % at 30 min and 67.0 min to reach 95 %.

### Start the reactor at 300 K, the jacket temperature

With no initial excess of temperature, the reaction still releases heat, so the temperature climbs above the jacket, but slowly, and the peak arrives late. Slow heating means a slow reaction for a long time.

[in-your-code] In the program, set T0 = 300.0. It prints a maximum of 316.0 K at 43.8 min, a conversion of 51.2 % at 30 min and 96.7 min to reach 95 %.

 Something unclear? Ask in the chat.
