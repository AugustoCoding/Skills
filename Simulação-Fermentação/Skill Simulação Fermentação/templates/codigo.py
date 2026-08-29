"""Esqueleto de simulação de fermentação em Python.

Uso pedagógico: este arquivo é o ponto de partida do aluno, não a resposta
pronta. As três formas de usá-lo, em ordem crescente de dificuldade:

  1. COM LACUNAS — apague o corpo de `modelo_batelada` e entregue o resto.
     O aluno escreve só as três derivadas. É o exercício certo para quem já
     entende o balanço e está aprendendo a mecânica do `solve_ivp`.

  2. QUEBRADO — plante UM defeito e peça para encontrar. Sugestões, da mais
     evidente à mais sutil: sinal de `dSdt` invertido; `* Yxs` no lugar de
     `/ Yxs`; `X0 = 0`; `t_span` em minutos com parâmetros em horas; `Ks` e
     `mu_max` trocados na expressão de Monod. Plante um só — dois viram caça
     ao tesouro e o loop de feedback perde a mira.

  3. COMPLETO — como está aqui, para consolidar depois que o aluno chegou
     ao resultado por conta própria.

Convenções obrigatórias, que este arquivo materializa:
  · toda variável e todo parâmetro com unidade em comentário;
  · `f(t, y)` — tempo primeiro (o antigo `odeint` usa a ordem inversa);
  · parâmetros por `args`, não por variável global;
  · `sol.success` verificado antes de plotar;
  · eixos rotulados com unidade.

Dependências: numpy, scipy, matplotlib.
Referência: ../reference/python-simulacao.html
"""

import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt


# --------------------------------------------------------------------------
# Parâmetros
# --------------------------------------------------------------------------
# ATENÇÃO: valores ilustrativos. Foram escolhidos para produzir uma curva de
# forma reconhecível e NÃO representam nenhum microrganismo específico.
# μmax, Ks e rendimentos variam ordens de grandeza conforme cepa, meio,
# temperatura e pH. Ao usar um valor de literatura, registre a fonte E a
# condição experimental a que ele se refere.

mu_max = 0.40    # 1/h     taxa específica máxima de crescimento
Ks = 1.0         # g/L     constante de saturação de Monod (μ = μmax/2 aqui)
Yxs = 0.5        # gX/gS   rendimento de biomassa em substrato
Ypx = 0.2        # gP/gX   rendimento de produto em biomassa


# --------------------------------------------------------------------------
# Condições iniciais
# --------------------------------------------------------------------------
# X0 = 0 é ponto fixo: sem inóculo, nada cresce e a curva é uma reta plana.
# Isso é matemática, não bug no integrador.

X0 = 0.1         # g/L     biomassa
S0 = 20.0        # g/L     substrato
P0 = 0.0         # g/L     produto
y0 = [X0, S0, P0]


# --------------------------------------------------------------------------
# Modelo
# --------------------------------------------------------------------------

def modelo_batelada(t, y, mu_max, Ks, Yxs, Ypx):
    """Batelada com cinética de Monod, volume constante.

    Hipóteses — o que este modelo finge que não existe:
      · rendimentos constantes (ignora manutenção celular);
      · um único substrato limitante;
      · sem fase lag, sem morte celular, sem inibição;
      · mistura perfeita, temperatura e pH controlados.

    Args:
        t: tempo, h (não usado: o sistema é autônomo, mas a assinatura exige)
        y: [X, S, P] em g/L
    Returns:
        [dX/dt, dS/dt, dP/dt] em g/(L·h)
    """
    X, S, P = y

    # Proteção contra S levemente negativo — artefato numérico do fim da
    # batelada, não biologia.
    S = max(S, 0.0)

    mu = mu_max * S / (Ks + S)      # 1/h — taxa ESPECÍFICA, por unidade de X

    dXdt = mu * X                   # g/(L·h) — taxa volumétrica
    dSdt = -dXdt / Yxs              # negativo: substrato é CONSUMIDO.
                                    # Yxs divide, não multiplica: gX/gS.
    dPdt = Ypx * dXdt               # produto associado ao crescimento

    return [dXdt, dSdt, dPdt]


# --------------------------------------------------------------------------
# Evento: quando o substrato acaba?
# --------------------------------------------------------------------------

def substrato_esgotado(t, y, *args):
    """Cruza zero quando S atinge 0,01 g/L."""
    return y[1] - 0.01


substrato_esgotado.terminal = False   # registra o instante, não interrompe
substrato_esgotado.direction = -1     # só no cruzamento descendente


# --------------------------------------------------------------------------
# Integração
# --------------------------------------------------------------------------
# t_eval escolhe ONDE a saída é interpolada — não é o passo de integração,
# que é adaptativo e interno. Tolerâncias padrão do SciPy (1e-3 / 1e-6) são
# frouxas para este problema, em que X começa em 0,1 e S em 20 g/L.

t_span = (0.0, 24.0)                        # h — mesma unidade dos parâmetros
t_eval = np.linspace(*t_span, 300)

sol = solve_ivp(
    modelo_batelada,
    t_span,
    y0,
    t_eval=t_eval,
    args=(mu_max, Ks, Yxs, Ypx),
    events=substrato_esgotado,
    method="RK45",
    rtol=1e-8,
    atol=1e-10,
)

# Nunca plote sem checar: a integração pode ter abortado no meio.
if not sol.success:
    raise RuntimeError(f"Integração falhou: {sol.message}")

X, S, P = sol.y                             # sol.y tem forma (n_vars, n_t)


# --------------------------------------------------------------------------
# Leitura do resultado
# --------------------------------------------------------------------------

print(f"X final: {X[-1]:.2f} g/L")
print(f"S final: {S[-1]:.2f} g/L")
print(f"P final: {P[-1]:.2f} g/L")
print(f"Produtividade média: {P[-1] / t_span[1]:.3f} g/(L·h)")

if sol.t_events[0].size > 0:
    print(f"Substrato esgotado em: {sol.t_events[0][0]:.2f} h")

# Checagem de balanço: o substrato consumido tem que aparecer como biomassa
# e produto. O que sobra é o que o modelo ignora.
consumido = S0 - S[-1]
formado = (X[-1] - X0) / Yxs
print(f"S consumido: {consumido:.2f} g/L | previsto pelo rendimento: {formado:.2f} g/L")


# --------------------------------------------------------------------------
# Gráfico
# --------------------------------------------------------------------------
# Eixos rotulados COM unidade. O gráfico é parte da explicação.
# Traço diferente por série: a figura continua legível impressa em preto.

fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(sol.t, X, "-", label="Biomassa X")
ax.plot(sol.t, S, "--", label="Substrato S")
ax.plot(sol.t, P, ":", label="Produto P")

ax.set_xlabel("Tempo (h)")
ax.set_ylabel("Concentração (g/L)")
ax.set_title("Fermentação em batelada — cinética de Monod")
ax.legend()
fig.tight_layout()
plt.show()
