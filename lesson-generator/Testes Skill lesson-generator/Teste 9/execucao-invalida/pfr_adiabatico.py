"""
Reator tubular (PFR) adiabático — reação A -> B, 1ª ordem, exotérmica, fase líquida.

Pergunta: que volume converte 90% de A, a que temperatura a corrente sai,
e como isso se compara com o mesmo reator mantido a 47 °C (isotérmico)?

Modelo
------
Balanço molar (PFR):      F_A0 dX/dV = -r_A = k(T) C_A0 (1 - X)
                     =>   dX/dV = k(T) (1 - X) / v0        (v0 = vazão volumétrica)

Balanço de energia (adiabático, fase líquida, rho*cp constante):
                          T = T0 + (-dH) C_A0 X / (rho*cp)

Arrhenius:                k(T) = k0 exp[ -(E/R) (1/T - 1/T0) ]
"""

import numpy as np
from scipy.integrate import solve_ivp, quad
import matplotlib.pyplot as plt

# ---------------------------------------------------------------------------
# 1) Dados do problema (sempre em unidades coerentes: L, min, mol, kJ, K)
# ---------------------------------------------------------------------------
T0 = 47.0 + 273.15      # K, temperatura de alimentação
CA0 = 2.0               # mol/L
v0 = 10.0               # L/min
k0 = 0.020              # 1/min, a T0
E = 80.0                # kJ/mol
R = 8.314e-3            # kJ/(mol·K)
dH = -50.0              # kJ/mol de A
rho_cp = 4.0            # kJ/(L·K)
X_alvo = 0.90


# ---------------------------------------------------------------------------
# 2) Funções do modelo
# ---------------------------------------------------------------------------
def temperatura(X):
    """Balanço de energia adiabático: T cresce linearmente com X."""
    return T0 + (-dH) * CA0 * X / rho_cp


def k(T):
    """Arrhenius escrita em relação à temperatura de referência T0."""
    return k0 * np.exp(-(E / R) * (1.0 / T - 1.0 / T0))


def dXdV(V, y):
    """Lado direito da EDO do PFR. y = [X]."""
    X = y[0]
    T = temperatura(X)
    return [k(T) * (1.0 - X) / v0]


# Evento: parar a integração quando X atingir o alvo
def atingiu_alvo(V, y):
    return y[0] - X_alvo
atingiu_alvo.terminal = True
atingiu_alvo.direction = 1


# ---------------------------------------------------------------------------
# 3) Caso adiabático — integra a EDO em V até X = 0,90
# ---------------------------------------------------------------------------
sol = solve_ivp(dXdV, t_span=(0.0, 5000.0), y0=[0.0], events=atingiu_alvo,
                max_step=1.0, rtol=1e-10, atol=1e-12, dense_output=True)
V_adiab = sol.t_events[0][0]
T_saida = temperatura(X_alvo)

# Conferência por outro caminho: V = v0 * integral de dX / [k(T(X)) (1 - X)]
V_adiab_quad, _ = quad(lambda X: v0 / (k(temperatura(X)) * (1.0 - X)), 0.0, X_alvo)

# ---------------------------------------------------------------------------
# 4) Caso isotérmico a 47 °C — tem solução analítica
# ---------------------------------------------------------------------------
V_iso = v0 / k0 * np.log(1.0 / (1.0 - X_alvo))

# ---------------------------------------------------------------------------
# 5) Resultados
# ---------------------------------------------------------------------------
print("=== PFR adiabático ===")
print(f"{'Volume para X = 0,90:':<28}{V_adiab:9.1f} L     (solve_ivp)")
print(f"{'':<28}{V_adiab_quad:9.1f} L     (quad, conferência)")
print(f"{'Temperatura de saída:':<28}{T_saida - 273.15:9.1f} °C    ({T_saida:.2f} K)")
print(f"{'k na saída:':<28}{k(T_saida):9.4f} 1/min ({k(T_saida)/k0:.1f}x k0)")
print()
print("=== PFR isotérmico a 47 °C ===")
print(f"{'Volume para X = 0,90:':<28}{V_iso:9.1f} L")
print()
print(f"{'Razão V_iso / V_adiab:':<28}{V_iso / V_adiab:9.2f}")

# ---------------------------------------------------------------------------
# 6) Perfis ao longo do reator
# ---------------------------------------------------------------------------
V = np.linspace(0.0, V_iso, 400)
X_ad = np.where(V <= V_adiab, sol.sol(np.minimum(V, V_adiab))[0], np.nan)
X_iso = 1.0 - np.exp(-k0 * V / v0)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4.2))
ax1.plot(V, X_ad, label="adiabático")
ax1.plot(V, X_iso, "--", label="isotérmico 47 °C")
ax1.axhline(X_alvo, color="gray", lw=0.8)
ax1.axvline(V_adiab, color="C0", lw=0.8, ls=":")
ax1.axvline(V_iso, color="C1", lw=0.8, ls=":")
ax1.set_xlabel("Volume do reator, V (L)")
ax1.set_ylabel("Conversão, X")
ax1.legend()
ax1.grid(alpha=0.3)

ax2.plot(V, temperatura(X_ad) - 273.15, label="adiabático")
ax2.plot(V, np.full_like(V, T0 - 273.15), "--", label="isotérmico 47 °C")
ax2.set_xlabel("Volume do reator, V (L)")
ax2.set_ylabel("Temperatura (°C)")
ax2.legend()
ax2.grid(alpha=0.3)

fig.tight_layout()
fig.savefig("perfis_pfr.png", dpi=130)
print("\nGráfico salvo em perfis_pfr.png")
