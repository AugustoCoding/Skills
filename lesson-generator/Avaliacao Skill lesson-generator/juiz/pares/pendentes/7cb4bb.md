# Comparação 7cb4bb

Compare conforme `juiz/COMPARACAO.md` e grave a resposta em `juiz/pares/respostas/7cb4bb.json`.

# Enunciado enviado ao modelo

The initial rate of an enzymatic reaction was measured at seven substrate concentrations: S = 0.5, 1.0, 2.0, 4.0, 8.0, 16.0 and 32.0 mM gave v = 1.65, 3.10, 4.70, 7.05, 8.60, 10.20 and 10.85 µmol/min. Fit the Michaelis–Menten equation, v = Vmax·S/(Km + S), by nonlinear least squares on v, and calculate Vmax (µmol/min), Km (mM) and the rate predicted at S = 5.0 mM (µmol/min). For comparison, calculate Vmax and Km from the Lineweaver–Burk linearization (unweighted linear regression of 1/v against 1/S).


==================== LIÇÃO 1 ====================

Biochemical engineering · Nonlinear regression

# Fitting the Michaelis–Menten equation

[problem] 

The initial rate v (µmol/min) of an enzymatic reaction was measured at seven substrate concentrations S (mM): 0.5, 1.0, 2.0, 4.0, 8.0, 16.0 and 32.0 mM gave v = 1.65, 3.10, 4.70, 7.05, 8.60, 10.20 and 10.85 µmol/min. The rate is described by the Michaelis–Menten equation, v = Vmax·S/(Km + S).

Fit the equation by nonlinear least squares on v and calculate Vmax (µmol/min).

Calculate Km (mM) from the same fit.

Calculate the rate predicted at S = 5.0 mM (µmol/min).

For comparison, calculate Vmax and Km from the Lineweaver–Burk linearization (unweighted linear regression of 1/v against 1/S).

An enzyme speeds up a reaction until all its sites are busy, so the rate climbs with substrate and then levels off. Two numbers describe that curve: the plateau Vmax and the concentration Km at which the enzyme is half-way there. At the end you will have a Python program that finds both numbers from the data in two different ways, and you will see why the two ways disagree.

## Model

### Mass balance of the enzyme–substrate complex, in mol/L

 ⟦accumulation of complex = formation − breakdown⟧ 

(principle) The enzyme E binds the substrate S to form a complex ES, which either falls apart again or releases the product and frees the enzyme. The complex does not appear or disappear for no reason. The control volume is the liquid of the assay, which is well mixed.

 ⟦(d C_ES )/(d t) {accumulation} = k_1 ⋅ E ⋅ S {formation} − ( k_− 1 + k_cat ) ⋅ C_ES {breakdown}⟧ 

CES — concentration of the enzyme–substrate complex in the assay, mM

E — concentration of free enzyme (not bound to substrate) in the assay, mM

S — substrate concentration in the assay, mM

k1 — rate constant of complex formation, 1/(mM·min)

k−1 — rate constant of the complex falling apart back into E and S, 1/min

kcat — rate constant of the complex releasing product and freeing the enzyme, 1/min

(translation) Each word becomes a rate in mM/min. The breakdown has two exits, each proportional to the complex present.

 ⟦(d C_ES )/(d t) = 0 ⇒ k_1 ⋅ E ⋅ S = ( k_− 1 + k_cat ) ⋅ C_ES⟧ 

(assumption) Quasi-steady state: after a very short start, the complex is formed as fast as it breaks down, so its concentration is constant. This holds in an initial-rate experiment, where the substrate greatly exceeds the enzyme. If the enzyme were comparable to the substrate, the complex would keep changing and the equation below would no longer describe the data.

 ⟦E_0 {total enzyme} = E {free} + C_ES {bound}⟧ 

E0 — total enzyme concentration in the assay, free plus bound, mM

(principle) The enzyme is a catalyst: it is never consumed, only shared between free and bound forms, so its total is constant.

 ⟦C_ES = (E_0 ⋅ S)/(K_m + S) , K_m = (k_− 1 + k_cat )/(k_1 )⟧ 

Km — Michaelis constant, the substrate concentration at which half of the enzyme is bound, mM

(algebra) (definition) Replace E by E0 − CES in the previous balance and solve for CES. The combination of the three rate constants is given the name Km.

 ⟦v = V ⋅ k_cat ⋅ C_ES⟧ 

v — initial rate of product formation in the assay, µmol/min

V — volume of the assay mixture, L, the same in every run (mM · L = µmol)

(kinetics) Product leaves only through the second exit of the complex, at the rate kcat·CES per litre; multiplying by the volume gives µmol/min.

[final] 

 ⟦v = V_max {maximum rate} ⋅ (S)/(K_m + S) {fraction of enzyme bound} , V_max = V ⋅ k_cat ⋅ E_0⟧ 

Vmax — maximum rate, reached when all the enzyme is bound to substrate, µmol/min

(algebra) Insert CES of the previous step into the rate and group V·kcat·E0 into Vmax.

At low S the fraction bound is small and the rate grows almost in proportion to S. At high S the fraction approaches 1 and the rate levels off at Vmax. When S = Km the fraction is exactly one half. The individual rate constants never appear: the experiment can only tell Vmax and Km, and these are the two unknowns to find.

Parameter | Value | Unit | Source | 

Vmax, Km | unknown | µmol/min, mM | derivedfound by the fit to the seven measurements | 

S (prediction) | 5.0 | mM | givenconcentration where the rate is asked | 

starting guess of Vmax | 10.0 | µmol/min | choicejust below the largest measured rate, 10.85 | 

starting guess of Km | 2.0 | mM | choiceinside the range of measured S, order of magnitude is enough | 

tolerance of the slope check | 1e-6 | — | choicefar below the size of the terms being summed | 

[technique] 

[technique-name] Nonlinear least squares

Fitting means finding the Vmax and Km that bring the curve closest to the seven points, where "close" is the sum of the squared vertical gaps. To solve this kind of problem, we will use nonlinear least squares: from a starting guess, the computer improves the two values step by step until that sum stops decreasing. It fits here because the equation is not a straight line in the unknowns, so there is no direct formula. In Python, the function that does this is curve_fit, from the library SciPy. The Lineweaver–Burk line is fitted by np.polyfit from NumPy. See the next section to learn how to use them.

## Code

[step] 

### Data and model function

[purpose] Put the measurements in the program and teach it to calculate the rate for any Vmax and Km.

```
import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt

# Measurements: initial rate at each substrate concentration
S = np.array([0.5, 1.0, 2.0, 4.0, 8.0, 16.0, 32.0]) # mM
v = np.array([1.65, 3.10, 4.70, 7.05, 8.60, 10.20, 10.85]) # µmol/min

def mm(S, Vmax, Km):
 return Vmax * S / (Km + S) # µmol/min
```

[how] A line starting with # is a comment: Python ignores it. import numpy as np loads the NumPy library and gives it the short name np; from scipy.optimize import curve_fit takes one function from SciPy; matplotlib.pyplot draws figures. np.array([...]) turns a list of numbers into an array, a column of numbers on which arithmetic acts on all entries at once. def mm(S, Vmax, Km): defines a function called mm: the names in parentheses are what it receives, the indented lines are what it does, and return hands the result back. Because S will be an array, mm returns an array of seven rates at once, in µmol/min.

[so-far] The program knows the data and the model equation, and calculates nothing yet.

[step] 

### Nonlinear fit

[purpose] Let SciPy search for the Vmax and Km that minimize the sum of squared gaps, then predict the rate at 5.0 mM.

```
# Nonlinear least squares on v
popt, pcov = curve_fit(mm, S, v, p0=[10.0, 2.0])
Vmax, Km = popt
v5 = mm(5.0, Vmax, Km)
print(f"NLS: Vmax = {Vmax:.2f} µmol/min, Km = {Km:.2f} mM")
print(f"Rate at S = 5.0 mM: {v5:.2f} µmol/min")
```

[how] curve_fit does not run mm once: it calls it many times, each time with the whole array S as the first argument and a new trial pair of values as the next two. After each call it compares the returned rates with v, calculates the sum of squares and adjusts the trial pair. That is why the first argument of mm must be the measured variable and the others the unknowns, in that order. Its arguments:

[how] 

mm — our function, handed over without parentheses (we pass the function itself, not its result).

S — the substrate concentrations, mM, passed as the first argument in each call.

v — the measured rates, µmol/min, which the results of mm are compared with.

p0=[10.0, 2.0] — the starting guess, a list in the same order as the unknowns of mm: 10.0 µmol/min for Vmax (a little below the largest rate measured) and 2.0 mM for Km.

[how] curve_fit returns two things, a tuple (two values joined together), unpacked into popt (the best values, [Vmax, Km]) and pcov (their uncertainty, which we do not use). Vmax, Km = popt unpacks the list into two names. In the f-string (text starting with f"), {Vmax:.2f} inserts the value with 2 decimals. The search stops when the sum of squares no longer decreases by more than a default tolerance, much finer than the 2 decimals we print; the next steps check the result.

[so-far] The program has the fitted Vmax, Km and the rate at 5.0 mM, and prints them.

[step] 

### Lineweaver–Burk line

[purpose] Repeat the estimate by the classical shortcut: invert the equation to get a straight line and fit it by linear regression.

```
# Lineweaver-Burk: straight line of 1/v against 1/S
slope, intercept = np.polyfit(1 / S, 1 / v, 1)
Vmax_lb = 1 / intercept # µmol/min
Km_lb = slope / intercept # mM
v5_lb = mm(5.0, Vmax_lb, Km_lb) # µmol/min
print(f"LB: Vmax = {Vmax_lb:.2f} µmol/min, Km = {Km_lb:.2f} mM")
print(f"LB rate at S = 5.0 mM: {v5_lb:.2f} µmol/min")
```

[how] Inverting v = Vmax·S/(Km + S) gives 1/v = 1/Vmax + (Km/Vmax)·(1/S): a line whose intercept is 1/Vmax and whose slope is Km/Vmax. np.polyfit(x, y, deg) fits a polynomial of degree deg by least squares; here x is 1 / S (each entry inverted), y is 1 / v and 1 is the degree, a straight line. It returns the coefficients from the highest power down, so [slope, intercept], unpacked as before. Then Vmax_lb = 1 / intercept and Km_lb = slope / intercept undo the algebra above. The last two lines of the step use mm again to predict the rate at 5.0 mM with these values.

[so-far] The program has a second pair of values, Vmax_lb and Km_lb, obtained without any iterative search.

[step] 

### Comparing the fits and checking the solution

[purpose] Measure how well each curve fits the data and confirm, with a calculation independent of curve_fit, that its answer is truly a minimum.

```
# Compare the two fits and check the NLS solution
def sse(Vm, K):
 return np.sum((v - mm(S, Vm, K)) ** 2) # (µmol/min)^2

print(f"SSE (NLS) = {sse(Vmax, Km):.3f} (µmol/min)^2")
print(f"SSE (LB) = {sse(Vmax_lb, Km_lb):.3f} (µmol/min)^2")
res_lb = v[-1] - mm(S[-1], Vmax_lb, Km_lb)
print(f"LB residual at S = 32 mM: {res_lb:.3f} µmol/min")

# At a minimum of the SSE, its slope in Vmax and in Km is zero
res = v - mm(S, Vmax, Km)
g_V = np.sum(res * S / (Km + S))
g_K = np.sum(res * Vmax * S / (Km + S) ** 2)
ok = abs(g_V) < 1e-6 and abs(g_K) < 1e-6
print(f"Slope of the SSE vanishes: {ok}")
```

[how] sse is our function for the sum of squared residuals, with the residual being measured minus calculated rate; np.sum(...) adds the seven squares, and ** is the power. The two print lines compare the methods; v[-1] and S[-1] are the last entries of the arrays (index −1 counts from the end), i.e. the point at 32 mM. The check: at the minimum of the sum of squares, its slope in the direction of Vmax and of Km must be zero. We write those slopes by differentiating the model by hand: g_V and g_K are (up to a constant factor) the sums of the residuals times ∂v/∂Vmax = S/(Km + S) and ∂v/∂Km = −Vmax·S/(Km + S)², with the sign flipped in the second. curve_fit never uses these formulas, so the check is independent. abs(...) < 1e-6 asks whether the absolute value is below 10−6, and and requires both; ok becomes True or False. The tolerance 10−6 is much smaller than the terms being added, which are of order 0.1 to 1.

[so-far] The program prints the SSE of both fits, the Lineweaver–Burk residual at 32 mM and the verdict of the slope check, which must be True.

[step] 

### Trying values by hand

[purpose] Reproduce in code what the sliders of the figure do: pick Vmax and Km yourself and see the sum of squares.

```
# Try values by hand and see the SSE (as the sliders do)
Vmax_try, Km_try = 11.93, 2.94 # µmol/min, mM
print(f"SSE (trial) = {sse(Vmax_try, Km_try):.3f} (µmol/min)^2")
```

[how] Vmax_try, Km_try = 11.93, 2.94 assigns two names in one line (a tuple on the right is unpacked to the names on the left). The values are the fit rounded to two decimals, in µmol/min and mM. Changing them and running again is how you explore, as the observations below suggest.

[so-far] The program prints the SSE for your trial values.

[step] 

### Data against the fitted curves

[purpose] Draw the measurements and both curves, to see the difference between the methods.

```
# Figure: data against the two fitted curves
Sc = np.linspace(0, 32, 200) # mM
plt.plot(S, v, "o", label="Measurements")
plt.plot(Sc, mm(Sc, Vmax, Km), label="Model")
plt.plot(Sc, mm(Sc, Vmax_lb, Km_lb), "--", label="Lineweaver-Burk")
plt.xlabel("Substrate concentration S (mM)")
plt.ylabel("Initial rate v (µmol/min)")
plt.legend()
plt.show()
```

[how] np.linspace(0, 32, 200) makes 200 evenly spaced concentrations from 0 to 32 mM (start, stop, number), enough for a smooth curve. plt.plot(x, y, "o", label=...) draws the points as circles ("o") and "--" draws a dashed line; label is the name in the legend. plt.xlabel and plt.ylabel name the axes with their units, plt.legend() shows the legend and plt.show() opens the figure.

[so-far] The program fits, compares, checks and draws.

[step] 

### Complete program

```
import numpy as np
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt

# Measurements: initial rate at each substrate concentration
S = np.array([0.5, 1.0, 2.0, 4.0, 8.0, 16.0, 32.0]) # mM
v = np.array([1.65, 3.10, 4.70, 7.05, 8.60, 10.20, 10.85]) # µmol/min

def mm(S, Vmax, Km):
 return Vmax * S / (Km + S) # µmol/min

# Nonlinear least squares on v
popt, pcov = curve_fit(mm, S, v, p0=[10.0, 2.0])
Vmax, Km = popt
v5 = mm(5.0, Vmax, Km)
print(f"NLS: Vmax = {Vmax:.2f} µmol/min, Km = {Km:.2f} mM")
print(f"Rate at S = 5.0 mM: {v5:.2f} µmol/min")

# Lineweaver-Burk: straight line of 1/v against 1/S
slope, intercept = np.polyfit(1 / S, 1 / v, 1)
Vmax_lb = 1 / intercept # µmol/min
Km_lb = slope / intercept # mM
v5_lb = mm(5.0, Vmax_lb, Km_lb) # µmol/min
print(f"LB: Vmax = {Vmax_lb:.2f} µmol/min, Km = {Km_lb:.2f} mM")
print(f"LB rate at S = 5.0 mM: {v5_lb:.2f} µmol/min")

# Compare the two fits and check the NLS solution
def sse(Vm, K):
 return np.sum((v - mm(S, Vm, K)) ** 2) # (µmol/min)^2

print(f"SSE (NLS) = {sse(Vmax, Km):.3f} (µmol/min)^2")
print(f"SSE (LB) = {sse(Vmax_lb, Km_lb):.3f} (µmol/min)^2")
res_lb = v[-1] - mm(S[-1], Vmax_lb, Km_lb)
print(f"LB residual at S = 32 mM: {res_lb:.3f} µmol/min")

# At a minimum of the SSE, its slope in Vmax and in Km is zero
res = v - mm(S, Vmax, Km)
g_V = np.sum(res * S / (Km + S))
g_K = np.sum(res * Vmax * S / (Km + S) ** 2)
ok = abs(g_V) < 1e-6 and abs(g_K) < 1e-6
print(f"Slope of the SSE vanishes: {ok}")

# Try values by hand and see the SSE (as the sliders do)
Vmax_try, Km_try = 11.93, 2.94 # µmol/min, mM
print(f"SSE (trial) = {sse(Vmax_try, Km_try):.3f} (µmol/min)^2")

# Figure: data against the two fitted curves
Sc = np.linspace(0, 32, 200) # mM
plt.plot(S, v, "o", label="Measurements")
plt.plot(Sc, mm(Sc, Vmax, Km), label="Model")
plt.plot(Sc, mm(Sc, Vmax_lb, Km_lb), "--", label="Lineweaver-Burk")
plt.xlabel("Substrate concentration S (mM)")
plt.ylabel("Initial rate v (µmol/min)")
plt.legend()
plt.show()
```

The steps together, in order, ready to run.

## Result

[answer] 

Nonlinear least squares on v: Vmax = 11.93 µmol/min and Km = 2.94 mM. The predicted rate at S = 5.0 mM is 7.51 µmol/min. Lineweaver–Burk linearization: Vmax = 12.47 µmol/min and Km = 3.23 mM.

Method | Vmax (µmol/min) | Km (mM) | Rate at 5.0 mM (µmol/min) | SSE (µmol/min)² | 

Nonlinear least squares | 11.93 | 2.94 | 7.51 | 0.095 | 

Lineweaver–Burk | 12.47 | 3.23 | 7.57 | 0.386 | 

[figura; controles: Vmax, Km] 

### Has the rate reached the plateau at the highest concentration?

Not quite. At 32 mM the measured rate is 10.85 µmol/min, while the plateau of the Model is 11.93 µmol/min, a gap of 11.93 − 10.85 = 1.08 µmol/min. Because Km is 2.94 mM, even the highest concentration, more than ten times that value, leaves the enzyme slightly short of saturation, so Vmax is always an extrapolation just above the last point.

### Does the choice of method change the prediction at 5.0 mM?

Hardly: the nonlinear fit predicts 7.51 µmol/min and Lineweaver–Burk 7.57 µmol/min. Within the range of the data the two curves are close, because each pair Vmax, Km was adjusted to the same points. The differences between the methods show up in the parameters themselves (12.47 against 11.93 µmol/min), which is what matters when extrapolating.

### Why do the two methods disagree?

They minimize different things. Nonlinear least squares minimizes the gaps in v, which are the quantity measured, and reaches a sum of squares of 0.095 (µmol/min)². The linearization minimizes the gaps in 1/v; inverting makes the small rates, measured at low S, dominate the line, and leaves the points at high S almost without weight. As a result its sum of squares in v is 0.386 (µmol/min)², four times larger, and at 32 mM the residual of its curve is −0.475 µmol/min, meaning the curve lies above the measurement.

### Take Vmax up to 12.47 µmol/min

With Km held at 2.94 mM, the whole Model curve rises toward the plateau and passes above the points at high S. The readout jumps from 0.095 to 0.878 (µmol/min)², much worse than the Lineweaver–Burk fit (0.386), showing that the two parameters must be moved together.

[in-your-code] In step 5 write Vmax_try, Km_try = 12.47, 2.94: the program prints SSE (trial) = 0.878 (µmol/min)^2.

### Take Km up to 3.23 mM

A larger Km makes the Model curve rise more slowly at low S, so it falls below the points at 1.0 and 4.0 mM, while the plateau stays at 11.93 µmol/min. The sum of squares grows from 0.095 to 0.388 (µmol/min)².

[in-your-code] In step 5 write Vmax_try, Km_try = 11.93, 3.23: the program prints SSE (trial) = 0.388 (µmol/min)^2.

 Something unclear? Ask in the chat.

==================== FIM DA LIÇÃO 1 ====================


==================== LIÇÃO 2 ====================

Enzyme kinetics · nonlinear regression

# Fitting the Michaelis–Menten equation by nonlinear least squares

[problem] 

The initial rate of an enzymatic reaction was measured at seven substrate concentrations. S = 0.5, 1.0, 2.0, 4.0, 8.0, 16.0 and 32.0 mM gave v = 1.65, 3.10, 4.70, 7.05, 8.60, 10.20 and 10.85 µmol/min. The rate is to be described by the Michaelis–Menten equation, with the parameters Vmax and Km.

Fit the Michaelis–Menten equation by nonlinear least squares on v, and calculate Vmax (µmol/min) and Km (mM).

Calculate the rate predicted at S = 5.0 mM (µmol/min).

For comparison, calculate Vmax and Km from the Lineweaver–Burk linearization (unweighted linear regression of 1/v against 1/S).

An enzyme turns substrate into product at a rate that rises with the substrate concentration and levels off at a maximum. At the end you will have a program that fits the curve to the seven measurements, predicts the rate at 5.0 mM and compares the result with the textbook straight-line method.

## Model

[eq-block] Michaelis–Menten rate law: 

 ⟦v = (V_max ⋅ S)/(K_m + S)⟧ 

v — initial rate of the reaction at substrate concentration S, the model rate, µmol/min

S — substrate concentration in the solution, mM

Vmax — rate reached when S is very large, µmol/min

Km — substrate concentration at which the rate is half of Vmax, mM

This is a given rate law, so it is not derived. It says that the rate rises with S and levels off at Vmax. Because the two parameters enter the curve in a non-linear way, the curve cannot be fitted by a straight line in S.

[eq-block] Lineweaver–Burk linearization: 

 ⟦(1)/(v) = (K_m )/(V_max ) ⋅ (1)/(S) + (1)/(V_max )⟧ 

Taking reciprocals of the Michaelis–Menten equation gives a straight line, in 1/S and 1/v, whose intercept is 1/Vmax and whose slope is Km/Vmax. A straight-line fit is simple, but it fits the reciprocals, not the rates, so it changes which errors matter most.

Parameter | Value | Unit | Source | 

Vmax, starting guess | 11.0 | µmol/min | choicejust above the largest measured rate, 10.85 µmol/min, so the search starts in the right range | 

Km, starting guess | 3.0 | mM | choicenear the middle of the S values; only a starting point, the fit does not depend on it | 

S and v | 7 pairs | mM and µmol/min | giventhe measurements of the problem | 

[technique] 

[technique-name] Nonlinear least squares

This is a fitting problem: find the Vmax and Km for which the curve passes closest to the seven measured rates. To solve this kind of problem, we will use nonlinear least squares, a method that starts from a guess and adjusts the two values step by step to reduce the sum of squared differences, stopping when it no longer improves (convergence). It fits because the curve is not a straight line, so no direct formula gives the answer. In Python, the function that does this is curve_fit, from the library scipy.optimize. See the next section to learn how to use it.

## Code

[step] 

### Entering the data and the model

[purpose] The program needs the seven measurements as lists it can calculate with, and the model written as a function it can call.

```
import numpy as np # arrays and calculations

# Measurements: substrate S in mM, rate v in µmol/min
S = np.array([0.5, 1.0, 2.0, 4.0, 8.0, 16.0, 32.0])
v = np.array([1.65, 3.10, 4.70, 7.05, 8.60, 10.20, 10.85])

def mm(S, Vmax, Km):
 # Michaelis-Menten rate: Vmax*S/(Km + S), in µmol/min
 return Vmax * S / (Km + S)
```

[how] 

import numpy as np loads the numerical library and calls it np, the usual short name.

np.array([...]) turns a list of numbers into an array: one object that holds the seven values, so a single operation acts on all of them at once.

def mm(S, Vmax, Km): defines a function named mm. It receives the substrate S (an array) and the two parameters Vmax and Km (numbers), in that order.

return sends the result back to whoever called the function: the array of rates, one per value of S.

[so-far] The program now holds the measurements and a function that computes the model rate for any S, Vmax and Km.

[step] 

### Fitting the curve to the data

[purpose] Let the computer search for the Vmax and Km that bring the curve closest to the seven points, and print the answer with its uncertainty.

```
from scipy.optimize import curve_fit

p0 = [11.0, 3.0] # starting guess: Vmax, Km
(Vmax, Km), cov = curve_fit(mm, S, v, p0=p0)
err = np.sqrt(np.diag(cov)) # standard errors of Vmax, Km

v5 = mm(5.0, Vmax, Km) # rate predicted at S = 5.0 mM
print(f"Vmax = {Vmax:.2f} ± {err[0]:.2f} µmol/min")
print(f"Km = {Km:.2f} ± {err[1]:.2f} mM")
print(f"v at S = 5.0 mM: {v5:.2f} µmol/min")
```

[how] Each new element, and each argument of curve_fit, one by one:

[how] 

curve_fit(mm, S, v, p0=p0) calls mm many times. The first argument, mm, is the function it calls; S and v are the data it compares with the model.

p0=p0 is the starting guess, one value per parameter, in the order of the arguments of mm (Vmax first, then Km). Each call of mm receives the current guess as its last two arguments.

In each call, curve_fit computes the rates for the current guess and the sum of the squared differences from v. It then changes Vmax and Km in the direction that lowers that sum, and repeats. It stops when a further change would lower the sum by a negligible amount (about one part in a hundred million): the result has converged.

(Vmax, Km), cov = unpacks the two things that curve_fit returns: the best values, which are assigned to Vmax and Km in that order, and the covariance matrix cov.

np.diag(cov) takes the diagonal of the covariance matrix, the variances of Vmax and Km. np.sqrt gives their square roots: the standard errors, the uncertainty of each value.

f"{Vmax:.2f}" prints the value with two decimals; err[0] is the first element of the array of errors, the one of Vmax.

[so-far] The program fits Vmax and Km, computes the rate at 5.0 mM, and prints the three results.

[step] 

### Checking the fit: model against data

[purpose] Compare the model with each measurement, measure the total error, and test trial values by hand. Then confirm that the fit is at its minimum.

```
pred = mm(S, Vmax, Km) # model rate at each S
for Si, vi, pi in zip(S, v, pred):
 print(f"S = {Si:4.1f} measured {vi:6.2f} model {pi:6.2f}")

def ssr(Vm, Km):
 # sum of squared differences, (µmol/min)^2
 return np.sum((v - mm(S, Vm, Km))**2)

print(f"Sum of squared residuals: {ssr(Vmax, Km):.4f}")

# Trial values by hand: change them to test other guesses
Vtry, Ktry = 11.93, 2.94 # µmol/min, mM
print(f"Trial values give: {ssr(Vtry, Ktry):.4f}")

# Independent check: at the minimum, both sums are zero
r = v - pred # residuals, µmol/min
dVmax = S / (Km + S) # d(model)/d(Vmax)
dKm = -Vmax * S / (Km + S)**2 # d(model)/d(Km)
print(f"Check, both near 0: {np.sum(r*dVmax):.1e} {np.sum(r*dKm):.1e}")
```

[how] 

zip(S, v, pred) pairs the three arrays element by element, so each loop turn gets one substrate value, its measured rate and its predicted rate.

for Si, vi, pi in ...: runs the indented lines once per pair. The format {Si:4.1f} prints the value in a width of four characters with one decimal, so the columns line up.

def ssr(Vm, Km): defines a function that returns the sum of the squared residuals for any pair of parameters. **2 squares each element and np.sum adds them all, so the larger a difference, the more it weighs.

Vtry, Ktry = 11.93, 2.94 assigns two numbers at once. Change them to test a guess: the sum printed is the total error of that guess.

The format :.1e prints a number in scientific notation with one decimal: 4.7e-10 means 0.00000000047, practically zero.

dVmax and dKm are the partial derivatives of the model with respect to each parameter: how much the rate changes when that parameter changes. A minimum of the sum of squares is a point where the residuals, weighted by each derivative, add up to zero.

[so-far] The program shows the model against each measurement, the total error, and a check that is near zero, so the fit is at its minimum.

[step] 

### Comparing with the straight-line method

[purpose] Obtain Vmax and Km from a straight line, the textbook method, to compare with the fit.

```
# Lineweaver-Burk: 1/v = (Km/Vmax)*(1/S) + 1/Vmax, a straight line
x = 1 / S # 1/mM
y = 1 / v # min/µmol
slope, intercept = np.polyfit(x, y, 1)
Vmax_lb = 1 / intercept # µmol/min
Km_lb = slope * Vmax_lb # mM
print(f"Lineweaver-Burk: Vmax = {Vmax_lb:.2f} µmol/min")
print(f"Lineweaver-Burk: Km = {Km_lb:.2f} mM")
print(f"v at S = 5.0 mM: {mm(5.0, Vmax_lb, Km_lb):.2f} µmol/min")
ssr_lb = np.sum((v - mm(S, Vmax_lb, Km_lb))**2)
print(f"Lineweaver-Burk sum of squares: {ssr_lb:.4f}")
```

[how] 

x = 1 / S and y = 1 / v compute the reciprocal of each element of the arrays: the two axes of the straight line.

np.polyfit(x, y, 1) fits a polynomial of degree 1, that is a straight line, to the points (x, y) by unweighted least squares. The three arguments are the x values, the y values and the degree.

slope, intercept = unpacks the two coefficients. The slope comes first because polyfit lists the coefficients from the highest power down.

1 / intercept and slope * Vmax_lb invert the line: the intercept is 1/Vmax and the slope is Km/Vmax.

[so-far] The program now holds the two estimates and their sums of squares, to compare with the fit of the previous step.

[step] 

### Drawing the fitted curve

[purpose] Draw the model over the measurements, so the fit can be seen against the data.

```
import matplotlib.pyplot as plt

Sg = np.linspace(0, 32, 201) # a fine grid of S, mM
plt.plot(Sg, mm(Sg, Vmax, Km), label="Model rate")
plt.plot(S, v, "o", label="Measured rate")
plt.xlabel("Substrate concentration S (mM)")
plt.ylabel("Initial rate v (µmol/min)")
plt.legend()
plt.show()
```

[how] 

np.linspace(0, 32, 201) returns 201 evenly spaced values from 0 to 32, both ends included: a fine grid, so the curve is drawn smooth.

plt.plot(x, y) draws a line through the points; with the third argument "o" it draws only the circles, which is what the measurements need.

label= gives each series the name that the legend shows.

plt.show() opens the figure in the editor.

[so-far] The program draws the model curve over the seven measurements.

[step] 

### Complete program

```
import numpy as np # arrays and calculations

# Measurements: substrate S in mM, rate v in µmol/min
S = np.array([0.5, 1.0, 2.0, 4.0, 8.0, 16.0, 32.0])
v = np.array([1.65, 3.10, 4.70, 7.05, 8.60, 10.20, 10.85])

def mm(S, Vmax, Km):
 # Michaelis-Menten rate: Vmax*S/(Km + S), in µmol/min
 return Vmax * S / (Km + S)

from scipy.optimize import curve_fit

p0 = [11.0, 3.0] # starting guess: Vmax, Km
(Vmax, Km), cov = curve_fit(mm, S, v, p0=p0)
err = np.sqrt(np.diag(cov)) # standard errors of Vmax, Km

v5 = mm(5.0, Vmax, Km) # rate predicted at S = 5.0 mM
print(f"Vmax = {Vmax:.2f} ± {err[0]:.2f} µmol/min")
print(f"Km = {Km:.2f} ± {err[1]:.2f} mM")
print(f"v at S = 5.0 mM: {v5:.2f} µmol/min")

pred = mm(S, Vmax, Km) # model rate at each S
for Si, vi, pi in zip(S, v, pred):
 print(f"S = {Si:4.1f} measured {vi:6.2f} model {pi:6.2f}")

def ssr(Vm, Km):
 # sum of squared differences, (µmol/min)^2
 return np.sum((v - mm(S, Vm, Km))**2)

print(f"Sum of squared residuals: {ssr(Vmax, Km):.4f}")

# Trial values by hand: change them to test other guesses
Vtry, Ktry = 11.93, 2.94 # µmol/min, mM
print(f"Trial values give: {ssr(Vtry, Ktry):.4f}")

# Independent check: at the minimum, both sums are zero
r = v - pred # residuals, µmol/min
dVmax = S / (Km + S) # d(model)/d(Vmax)
dKm = -Vmax * S / (Km + S)**2 # d(model)/d(Km)
print(f"Check, both near 0: {np.sum(r*dVmax):.1e} {np.sum(r*dKm):.1e}")

# Lineweaver-Burk: 1/v = (Km/Vmax)*(1/S) + 1/Vmax, a straight line
x = 1 / S # 1/mM
y = 1 / v # min/µmol
slope, intercept = np.polyfit(x, y, 1)
Vmax_lb = 1 / intercept # µmol/min
Km_lb = slope * Vmax_lb # mM
print(f"Lineweaver-Burk: Vmax = {Vmax_lb:.2f} µmol/min")
print(f"Lineweaver-Burk: Km = {Km_lb:.2f} mM")
print(f"v at S = 5.0 mM: {mm(5.0, Vmax_lb, Km_lb):.2f} µmol/min")
ssr_lb = np.sum((v - mm(S, Vmax_lb, Km_lb))**2)
print(f"Lineweaver-Burk sum of squares: {ssr_lb:.4f}")

import matplotlib.pyplot as plt

Sg = np.linspace(0, 32, 201) # a fine grid of S, mM
plt.plot(Sg, mm(Sg, Vmax, Km), label="Model rate")
plt.plot(S, v, "o", label="Measured rate")
plt.xlabel("Substrate concentration S (mM)")
plt.ylabel("Initial rate v (µmol/min)")
plt.legend()
plt.show()
```

The steps above, pasted in order, form this program, ready to run in the editor.

## Result

[answer] 

Nonlinear least squares gives Vmax = 11.93 ± 0.14 µmol/min and Km = 2.94 ± 0.12 mM, where ± is one standard error. The predicted rate at S = 5.0 mM is 7.51 µmol/min. The Lineweaver–Burk line gives Vmax = 12.47 µmol/min and Km = 3.23 mM, and a rate of 7.57 µmol/min at 5.0 mM.

[figura; controles: Vmax, Km] 

### Does the model pass through the measured points?

Closely. At S = 4.0 mM the model rate is 6.88 µmol/min, against 7.05 measured: 7.05 − 6.88 = 0.17 µmol/min, the largest gap of the seven. Every other point is closer.

### Where does the curve level off?

It does not reach its plateau within the data. At S = 32.0 mM the model rate is 10.92 µmol/min, while Vmax is 11.93: the value of Vmax is read beyond the data, as the curve approaches it.

### Take Km up to 6.00 mM

The curve rises more slowly at small S, so the points at 0.5 and 1.0 mM now lie above it. The model rate is pulled away from the points and the sum of squared residuals in the figure rises from 0.0954 to 16.7693 (µmol/min)².

[in-your-code] In the program, change the line to Vtry, Ktry = 11.93, 6.00. It prints Trial values give: 16.7693.

### Take Vmax down to 10.00 µmol/min

The plateau drops below the high-S points, at 8.0 to 32.0 mM, and the sum of squared residuals rises from 0.0954 to 10.0221 (µmol/min)².

[in-your-code] In the program, change the line to Vtry, Ktry = 10.00, 2.94. It prints Trial values give: 10.0221.

 Something unclear? Ask in the chat.

==================== FIM DA LIÇÃO 2 ====================
