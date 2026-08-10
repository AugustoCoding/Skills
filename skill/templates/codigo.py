"""Esqueleto de simulação de fermentação em Python (referência educacional)."""

import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt


# Parâmetros cinéticos e de processo (substitua pelos valores do enunciado)
mu_max = 0.40      # 1/h
Ks = 1.0           # g/L
Yxs = 0.5          # gX/gS
Ypx = 0.2          # gP/gX


# Condições iniciais
X0 = 0.1           # g/L (biomassa)
S0 = 20.0          # g/L (substrato)
P0 = 0.0           # g/L (produto)
y0 = [X0, S0, P0]


def modelo_batelada(t, y):
    """Modelo simplificado com cinética de Monod para batelada."""
    X, S, P = y

    # Taxa específica de crescimento (Monod)
    mu = mu_max * S / (Ks + S)

    # Equações diferenciais
    dXdt = mu * X
    dSdt = -(1 / Yxs) * dXdt
    dPdt = Ypx * dXdt

    return [dXdt, dSdt, dPdt]


# Janela de simulação
t_span = (0, 24)                      # horas
t_eval = np.linspace(*t_span, 300)    # pontos de avaliação

sol = solve_ivp(modelo_batelada, t_span, y0, t_eval=t_eval)


# Plotagem dos resultados
plt.plot(sol.t, sol.y[0], label="Biomassa (X)")
plt.plot(sol.t, sol.y[1], label="Substrato (S)")
plt.plot(sol.t, sol.y[2], label="Produto (P)")
plt.xlabel("Tempo (h)")
plt.ylabel("Concentração (g/L)")
plt.title("Simulação de fermentação em batelada")
plt.legend()
plt.tight_layout()
plt.show()
