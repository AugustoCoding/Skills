"""Solucoes de referencia das questoes da avaliacao.

    python gabarito.py            imprime o gabarito
    python gabarito.py --gravar   grava gabarito.json, ao lado deste arquivo

Cada funcao Qnn resolve uma questao de questoes.json e devolve os valores das
perguntas, na unidade pedida no enunciado e com as mesmas chaves. Onde ha
forma fechada, ela e usada ou confere o resultado numerico (assert).

Este arquivo nao vai para o modelo em teste: a sessao de teste roda numa pasta
vazia, fora do repositorio.
"""

import json
import sys
from pathlib import Path

import numpy as np
from scipy.integrate import quad, solve_bvp, solve_ivp
from scipy.optimize import brentq, curve_fit, fsolve, minimize_scalar

R = 8.314  # J/(mol K)


def Q01():
    # Mistura de acidos: balancos de HNO3, de H2SO4 e global.
    M = np.array([[0.22, 0.90, 0.00],
                  [0.56, 0.00, 0.96],
                  [1.00, 1.00, 1.00]])
    b = np.array([0.28 * 1500, 0.60 * 1500, 1500])
    f1, f2, f3 = np.linalg.solve(M, b)
    assert abs(0.22 * f1 + 0.10 * f2 + 0.04 * f3 - 0.12 * 1500) < 1e-9   # agua
    return {"m_residual": f1, "m_nitrico": f2, "m_sulfurico": f3}


def Q02():
    # Peng-Robinson, CO2 a 320 K e 80 bar.
    T, P, Tc, Pc, w, Mm = 320.0, 80e5, 304.13, 73.77e5, 0.224, 44.01
    kappa = 0.37464 + 1.54226 * w - 0.26992 * w ** 2
    a = 0.45724 * R ** 2 * Tc ** 2 / Pc * (1 + kappa * (1 - (T / Tc) ** 0.5)) ** 2
    b = 0.07780 * R * Tc / Pc
    A, B = a * P / (R * T) ** 2, b * P / (R * T)
    roots = np.roots([1, -(1 - B), A - 3 * B ** 2 - 2 * B, -(A * B - B ** 2 - B ** 3)])
    real = roots[abs(roots.imag) < 1e-9].real
    assert len(real) == 1
    Z = real[0]
    v = Z * R * T / P                                   # m3/mol
    assert abs(R * T / (v - b) - a / (v * (v + b) + b * (v - b)) - P) < 1e-3
    return {"Z": Z, "v": v * 1e6, "rho": Mm / 1000 / v,
            "v_ideal": R * T / P * 1e6}


def Q03():
    # Reforma a vapor: duas reacoes em equilibrio, 1000 K e 5 bar.
    K1, K2, P = 26.0, 1.40, 5.0

    def res(e):
        e1, e2 = e
        n = 4 + 2 * e1
        ch4, h2o, co, h2, co2 = 1 - e1, 3 - e1 - e2, e1 - e2, 3 * e1 + e2, e2
        return [co * h2 ** 3 * P ** 2 - K1 * ch4 * h2o * n ** 2,
                co2 * h2 - K2 * co * h2o]

    e1, e2 = fsolve(res, [0.8, 0.3], xtol=1e-12)
    assert 0 < e2 < e1 < 1 and max(abs(np.array(res([e1, e2])))) < 1e-8
    return {"xi1": e1, "xi2": e2, "conversao_CH4": e1 * 100,
            "y_H2": (3 * e1 + e2) / (4 + 2 * e1)}


def Q04():
    # Tanque com entrada constante e saida por orificio.
    D, d, Cd, Q, h0, g = 1.2, 0.025, 0.62, 1.5e-3, 0.50, 9.81
    A, a = np.pi * D ** 2 / 4, np.pi * d ** 2 / 4
    hss = (Q / (Cd * a)) ** 2 / (2 * g)

    def f(t, h):
        return [(Q - Cd * a * np.sqrt(2 * g * h[0])) / A]

    def ev(t, h):
        return h[0] - 1.0
    ev.terminal = True
    s = solve_ivp(f, [0, 36000], [h0], events=ev, dense_output=True, rtol=1e-10, atol=1e-12)
    # Forma fechada implicita: t(h), com u = raiz(h) e us = raiz(hss).
    c, us = Cd * a * np.sqrt(2 * g) / A, np.sqrt(hss)

    def t_de(h):
        u, u0 = np.sqrt(h), np.sqrt(h0)
        return 2 / c * ((u0 - u) + us * np.log((us - u0) / (us - u)))
    assert abs(t_de(1.0) - s.t_events[0][0]) < 1e-3
    return {"h_estacionario": hss, "h_10min": s.sol(600)[0], "t_1m": s.t_events[0][0] / 60}


def Q05():
    # Placa em resfriamento: serie analitica, conferida por diferencas finitas.
    k, rho, cp, L, Ti, Tinf, h = 15.0, 7900.0, 500.0, 0.02, 500.0, 60.0, 400.0
    alpha, Bi = k / (rho * cp), h * L / k
    zs = [brentq(lambda z: z * np.tan(z) - Bi, n * np.pi + 1e-9, n * np.pi + np.pi / 2 - 1e-9)
          for n in range(60)]

    def theta(x, t):
        Fo = alpha * t / L ** 2
        return sum(4 * np.sin(z) / (2 * z + np.sin(2 * z)) * np.exp(-z * z * Fo) * np.cos(z * x / L)
                   for z in zs)

    def T(x, t):
        return Tinf + (Ti - Tinf) * theta(x, t)
    t150 = brentq(lambda t: T(0, t) - 150, 10, 5000)

    # Metodo das linhas, como conferencia.
    N = 81
    dx = L / (N - 1)

    def f(t, u):
        du = np.empty(N)
        du[1:-1] = alpha * (u[2:] - 2 * u[1:-1] + u[:-2]) / dx ** 2
        du[0] = 2 * alpha * (u[1] - u[0]) / dx ** 2
        du[-1] = 2 * alpha * (u[-2] - u[-1] - dx * h / k * (u[-1] - Tinf)) / dx ** 2
        return du
    s = solve_ivp(f, [0, 120], np.full(N, Ti), method="BDF", rtol=1e-8, atol=1e-8)
    assert abs(s.y[0, -1] - T(0, 120)) < 0.3 and abs(s.y[-1, -1] - T(L, 120)) < 0.3
    return {"T_centro_120s": T(0, 120), "T_superficie_120s": T(L, 120), "t_centro_150C": t150}


def Q06():
    # Espessura economica de isolamento num tubo de vapor.
    r1, Ts, Tinf, k, h, L = 0.05, 180.0, 25.0, 0.05, 10.0, 100.0
    energia, horas, isolante, anual = 0.15, 8000.0, 1800.0, 0.20

    def q(e):                                            # W
        r2 = r1 + e
        return 2 * np.pi * L * (Ts - Tinf) / (np.log(r2 / r1) / k + 1 / (h * r2))

    def custo(e):                                        # R$/ano
        vol = np.pi * ((r1 + e) ** 2 - r1 ** 2) * L
        return q(e) / 1000 * horas * energia + anual * isolante * vol
    m = minimize_scalar(custo, bounds=(1e-4, 0.5), method="bounded", options={"xatol": 1e-10})
    return {"e_otima": m.x * 100, "q_otimo": q(m.x) / 1000, "custo_minimo": m.fun,
            "custo_sem_isolamento": 2 * np.pi * r1 * L * h * (Ts - Tinf) / 1000 * horas * energia}


def Q07():
    # Absorvedor: numero de unidades de transferencia com equilibrio curvo.
    Y1, Y2, LG, HOG = 0.08, 0.008, 2.2, 0.60

    def Yeq(X):
        return 1.5 * X + 12 * X ** 2
    X1 = (Y1 - Y2) / LG
    NOG, _ = quad(lambda Y: 1 / (Y - Yeq((Y - Y2) / LG)), Y2, Y1, epsabs=1e-12)
    Xmax = brentq(lambda X: Yeq(X) - Y1, 0, 1)
    return {"X_saida": X1, "LG_minima": (Y1 - Y2) / Xmax, "NOG": NOG, "altura": NOG * HOG}


def Q08():
    # McCabe-Thiele com volatilidade relativa constante.
    alpha, zF, xD, xB = 2.5, 0.50, 0.95, 0.05
    yF = alpha * zF / (1 + (alpha - 1) * zF)
    Rmin = (xD - yF) / (yF - zF)
    Rr = 1.5 * Rmin
    yi = Rr / (Rr + 1) * zF + xD / (Rr + 1)             # cruzamento das linhas (q = 1)
    n, x, y, alim = 0, xD, xD, None
    while True:
        n += 1
        x = y / (alpha - (alpha - 1) * y)                # equilibrio
        if alim is None and x <= zF:
            alim = n
        if x <= xB:
            break
        if alim is None:
            y = Rr / (Rr + 1) * x + xD / (Rr + 1)        # retificacao
        else:
            y = xB + (yi - xB) / (zF - xB) * (x - xB)    # esgotamento
    return {"R_min": Rmin, "R": Rr, "N_estagios": n, "estagio_alimentacao": alim}


def Q09():
    # Batelada nao isotermica com camisa.
    CA0, k0, E, dH, rcp, UAV, T0, Tc = 2000.0, 6.0e6, 60000.0, -80000.0, 4.0e6, 2000.0, 320.0, 300.0

    def f(t, y):
        X, T = y
        r = k0 * np.exp(-E / (R * T)) * CA0 * (1 - X)
        return [r / CA0, (-dH * r - UAV * (T - Tc)) / rcp]

    def e95(t, y):
        return y[0] - 0.95
    s = solve_ivp(f, [0, 20000], [0, T0], events=e95, dense_output=True, rtol=1e-10, atol=1e-12)
    m = minimize_scalar(lambda t: -s.sol(t)[1], bounds=(0, 6000), method="bounded",
                        options={"xatol": 1e-6})
    return {"T_pico": -m.fun, "t_pico": m.x / 60, "X_30min": s.sol(1800)[0] * 100,
            "t_95": s.t_events[0][0] / 60}


Q10_T = [30, 40, 50, 60, 70]                              # C
Q10_K = [0.0082, 0.0205, 0.0512, 0.1130, 0.2510]          # 1/min


def Q10():
    # Arrhenius por regressao linear de ln k contra 1/T.
    x, y = 1 / (np.array(Q10_T) + 273.15), np.log(Q10_K)
    slope, lnA = np.polyfit(x, y, 1)
    r2 = np.corrcoef(x, y)[0, 1] ** 2
    return {"Ea": -slope * R / 1000, "lnA": lnA, "k_85C": np.exp(lnA + slope / (85 + 273.15)),
            "R2": r2}


def Q11():
    # Tanque aquecido com controlador PI: degrau de 50 para 60 C no setpoint.
    tau, Kp, Kc, tauI, T0, r = 10.0, 0.8, 5.0, 2.0, 50.0, 10.0

    def f(t, s):
        y, I = s
        e = r - y
        return [(-y + Kp * Kc * (e + I / tauI)) / tau, e]
    s = solve_ivp(f, [0, 60], [0, 0], dense_output=True, rtol=1e-10, atol=1e-12)
    m = minimize_scalar(lambda t: -s.sol(t)[0], bounds=(0, 15), method="bounded",
                        options={"xatol": 1e-8})
    return {"T_max": T0 - m.fun, "t_pico": m.x, "T_3min": T0 + s.sol(3)[0],
            "sobressinal": (-m.fun - r) / r * 100}


Q12_X = [0.40, 0.35, 0.30, 0.25, 0.20, 0.15, 0.10, 0.05]  # kg agua / kg solido seco
Q12_R = [1.50, 1.50, 1.50, 1.50, 1.20, 0.90, 0.55, 0.25]  # kg / (m2 h)


def Q12():
    # Tempo de secagem pela regra dos trapezios sobre os dados.
    X, Rt, carga = np.array(Q12_X), np.array(Q12_R), 20.0

    def tempo(i, j):
        xs, inv = X[i:j + 1][::-1], 1 / Rt[i:j + 1][::-1]
        return carga * float(np.sum((xs[1:] - xs[:-1]) * (inv[1:] + inv[:-1]) / 2))
    return {"t_constante": tempo(0, 3), "t_decrescente": tempo(3, 7), "t_total": tempo(0, 7)}


def Q13():
    # Pontos de bolha e de orvalho, Raoult com Antoine (mmHg, C).
    ant = [(6.87776, 1171.530, 224.366), (6.90240, 1268.115, 216.900)]
    P, z = 760.0, 0.40

    def ps(i, T):
        A, B, C = ant[i]
        return 10 ** (A - B / (T + C))
    Tb = brentq(lambda T: z * ps(0, T) + (1 - z) * ps(1, T) - P, 50, 110)
    To = brentq(lambda T: z * P / ps(0, T) + (1 - z) * P / ps(1, T) - 1, 50, 110)
    return {"T_bolha": Tb, "y_hexano": z * ps(0, Tb) / P, "T_orvalho": To,
            "x_hexano_orvalho": z * P / ps(0, To)}


def Q14():
    # Velocidade terminal com Schiller-Naumann.
    rp, rf, mu, g = 2500.0, 998.0, 1.0e-3, 9.81

    def cd(Re):
        return 24 / Re * (1 + 0.15 * Re ** 0.687)

    def res(v, d):
        return (rp - rf) * g * np.pi * d ** 3 / 6 - cd(rf * v * d / mu) * rf * v ** 2 / 2 * np.pi * d ** 2 / 4

    def vt(d):
        return brentq(res, 1e-9, 5, args=(d,), xtol=1e-14)
    d = 0.5e-3
    v = vt(d)
    Re = rf * v * d / mu
    d2 = brentq(lambda dd: vt(dd) - 0.02, 1e-5, 1e-3, xtol=1e-12)
    return {"v_terminal": v * 100, "Re": Re, "v_Stokes": (rp - rf) * g * d ** 2 / (18 * mu) * 100,
            "d_2cm_s": d2 * 1000}


def Q15():
    # Psicrometria: conta direta com Antoine para a agua.
    T, UR, P = 32.0, 0.55, 101.325

    def ps(t):                                           # kPa
        return 10 ** (8.07131 - 1730.63 / (233.426 + t)) * 101.325 / 760
    pv = UR * ps(T)
    W = 0.622 * pv / (P - pv)
    Td = 1730.63 / (8.07131 - np.log10(pv * 760 / 101.325)) - 233.426
    W15 = 0.622 * ps(15) / (P - ps(15))
    return {"W": W, "T_orvalho": Td, "entalpia": 1.006 * T + W * (2501 + 1.86 * T),
            "condensado": (W - W15) * 1000}


def Q16():
    # Aleta de pino com conveccao e radiacao, ponta adiabatica.
    D, L, k, Tb, Tinf, h, eps, sig = 0.008, 0.10, 200.0, 600.0, 300.0, 15.0, 0.8, 5.67e-8
    Ac = np.pi * D ** 2 / 4

    def f(x, y):
        return np.vstack([y[1], 4 / (k * D) * (h * (y[0] - Tinf) + eps * sig * (y[0] ** 4 - Tinf ** 4))])

    def bc(a, b):
        return np.array([a[0] - Tb, b[1]])
    x = np.linspace(0, L, 41)
    s = solve_bvp(f, bc, x, np.vstack([np.full_like(x, 500.0), np.zeros_like(x)]), tol=1e-8, max_nodes=20000)
    assert s.success
    m = np.sqrt(4 * h / (k * D))
    q_conv = np.sqrt(h * np.pi * D * k * Ac) * (Tb - Tinf) * np.tanh(m * L)
    return {"T_ponta": s.sol(L)[0], "q": -k * Ac * s.sol(0)[1], "q_so_conveccao": q_conv,
            "T_ponta_so_conveccao": Tinf + (Tb - Tinf) / np.cosh(m * L)}


def Q17():
    # Kremser: estagios teoricos de um absorvedor diluido.
    m, LG, rec = 1.2, 1.8, 0.95
    A = LG / m
    N = np.log((1 / (1 - rec)) * (1 - 1 / A) + 1 / A) / np.log(A)
    Ni = int(np.ceil(N))
    frac = (A ** (Ni + 1) - A) / (A ** (Ni + 1) - 1)     # recuperacao com Ni estagios
    return {"A": A, "N_teorico": N, "N_inteiro": Ni, "recuperacao": frac * 100,
            "LG_minima": m * rec}


def Q18():
    # Evaporador de duplo efeito, alimentacao direta, areas iguais.
    F, xF, x2, TF, Ts, T2, cp, U1, U2 = 10000.0, 0.10, 0.40, 60.0, 120.0, 50.0, 4.0, 2.5, 1.5

    def lam(T):                                          # kJ/kg
        return 2501 - 2.4 * T
    Vt = F * (1 - xF / x2)

    def res(u):
        S, V1, T1, A = u
        V2 = Vt - V1
        return [S * lam(Ts) + F * cp * (TF - T1) - V1 * lam(T1),
                V1 * lam(T1) + (F - V1) * cp * (T1 - T2) - V2 * lam(T2),
                S * lam(Ts) / 3600 - U1 * A * (Ts - T1),
                V1 * lam(T1) / 3600 - U2 * A * (T1 - T2)]
    S, V1, T1, A = fsolve(res, [4000, 3700, 90, 50], xtol=1e-12)
    assert max(abs(np.array(res([S, V1, T1, A])))) < 1e-6
    return {"T1": T1, "area": A, "vapor_aquecimento": S, "economia": Vt / S, "V1": V1}


def Q19():
    # CSTR exotermico com camisa: tres estados estacionarios.
    q, V, CA0, T0, Tc, k0, ER, dH, rho, Cp, UA = 100.0, 100.0, 1.0, 350.0, 300.0, 7.2e10, 8750.0, -5.0e4, 1000.0, 0.239, 5.0e4

    def CA(T):
        return CA0 / (1 + V / q * k0 * np.exp(-ER / T))

    def res(T):
        return q * rho * Cp * (T0 - T) + (-dH) * V * k0 * np.exp(-ER / T) * CA(T) - UA * (T - Tc)
    Ts = np.linspace(300, 420, 2401)
    roots = [brentq(res, a, b) for a, b in zip(Ts[:-1], Ts[1:]) if res(a) * res(b) < 0]
    assert len(roots) == 3
    return {"T_baixo": roots[0], "T_medio": roots[1], "T_alto": roots[2],
            "X_baixo": (1 - CA(roots[0]) / CA0) * 100, "X_alto": (1 - CA(roots[2]) / CA0) * 100}


def Q20():
    # Leito fixo isotermico com perda de carga (Ergun na forma de alfa).
    P0, T, FA0, k, eps, alpha = 10e5, 500.0, 5.0, 1.0e-3, 1.0, 0.005
    CA0 = P0 / (R * T)

    def f(W, s):
        X, y = s
        return [k * CA0 * (1 - X) / (1 + eps * X) * y / FA0, -alpha * (1 + eps * X) / (2 * y)]

    def e80(W, s):
        return s[0] - 0.80
    e80.terminal = True
    s = solve_ivp(f, [0, 150], [0, 1], events=e80, rtol=1e-10, atol=1e-12)
    W, y = s.t_events[0][0], s.y_events[0][0][1]
    v0 = FA0 / CA0
    W_sem = v0 / k * ((1 + eps) * np.log(1 / (1 - 0.8)) - eps * 0.8)
    return {"W_80": W, "P_saida": y * P0 / 1e5, "W_sem_perda": W_sem}


Q21_S = [0.5, 1.0, 2.0, 4.0, 8.0, 16.0, 32.0]             # mM
Q21_V = [1.65, 3.10, 4.70, 7.05, 8.60, 10.20, 10.85]      # umol/min


def Q21():
    # Michaelis-Menten: minimos quadrados nao lineares e Lineweaver-Burk.
    S, v = np.array(Q21_S), np.array(Q21_V)

    def mm(S, Vm, Km):
        return Vm * S / (Km + S)
    (Vm, Km), _ = curve_fit(mm, S, v, p0=[10, 2])
    slope, inter = np.polyfit(1 / S, 1 / v, 1)
    return {"Vmax": Vm, "Km": Km, "Vmax_LB": 1 / inter, "Km_LB": slope / inter,
            "v_5mM": mm(5.0, Vm, Km)}


def Q22():
    # Dois tanques interativos: degrau na vazao de entrada.
    A1, A2, c1, c2, q0, q1 = 2.0, 1.5, 0.8, 0.6, 0.6, 0.9
    h2i = (q0 / c2) ** 2
    h1i = h2i + (q0 / c1) ** 2
    h2f = (q1 / c2) ** 2
    h1f = h2f + (q1 / c1) ** 2

    def f(t, h):
        a = c1 * np.sqrt(max(h[0] - h[1], 0))
        return [(q1 - a) / A1, (a - c2 * np.sqrt(h[1])) / A2]

    def ev(t, h):
        return h[1] - 2.0
    s = solve_ivp(f, [0, 300], [h1i, h2i], events=ev, dense_output=True, rtol=1e-10, atol=1e-12)
    return {"h1_final": h1f, "h2_final": h2f, "h2_10min": s.sol(10)[1], "t_h2_2m": s.t_events[0][0]}


def Q23():
    # Quimiostato com Monod.
    mu, Ks, Y, S0, D = 0.45, 0.8, 0.5, 20.0, 0.30
    S = Ks * D / (mu - D)
    X = Y * (S0 - S)

    def prod(d):
        return d * Y * (S0 - Ks * d / (mu - d))
    Dw = mu * S0 / (Ks + S0)
    m = minimize_scalar(lambda d: -prod(d), bounds=(0.01, Dw), method="bounded", options={"xatol": 1e-12})
    Dopt = mu * (1 - np.sqrt(Ks / (Ks + S0)))
    assert abs(m.x - Dopt) < 1e-6
    return {"S": S, "X": X, "D_lavagem": Dw, "D_otima": Dopt, "produtividade_maxima": prod(Dopt)}


def Q24():
    # Temperatura adiabatica de chama do metano, Cp/R = A + B T + D / T^2.
    cps = {"CO2": (5.457, 1.045e-3, -1.157e5), "H2O": (3.470, 1.450e-3, 0.121e5),
           "N2": (3.280, 0.593e-3, 0.040e5), "O2": (3.639, 0.506e-3, -0.227e5)}
    dHc, Tr = -802600.0, 298.15

    def dH(sp, T):                                       # J/mol, de Tr a T
        A, B, D = cps[sp]
        return R * (A * (T - Tr) + B / 2 * (T ** 2 - Tr ** 2) - D * (1 / T - 1 / Tr))

    def Tad(exc):
        n = {"CO2": 1, "H2O": 2, "O2": 2 * exc, "N2": 2 * (1 + exc) * 79 / 21}
        return brentq(lambda T: dHc + sum(n[s] * dH(s, T) for s in n), 400, 4000)
    return {"T_20": Tad(0.20), "T_100": Tad(1.00),
            "excesso_1500K": brentq(lambda e: Tad(e) - 1500, 0, 5) * 100}


def todas():
    out = {}
    for name in sorted(n for n in globals() if n[0] == "Q" and n[1:].isdigit()):
        out[name] = {k: float(v) for k, v in globals()[name]().items()}
    return out


if __name__ == "__main__":
    g = todas()
    for qn, vals in g.items():
        print(qn + "  " + "  ".join(f"{k}={v:.6g}" for k, v in vals.items()))
    if "--gravar" in sys.argv:
        dest = Path(__file__).with_name("gabarito.json")
        dest.write_text(json.dumps(g, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
        print("gravado em", dest.name)
