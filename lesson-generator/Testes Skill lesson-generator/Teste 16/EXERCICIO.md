# Teste 16 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

> A liquid-phase, first-order, irreversible reaction A → B runs in an adiabatic tubular reactor (PFR). The feed enters at 10 L/min, with 2.0 mol/L of A, at 300 K. The rate constant is 0.05 min⁻¹ at 300 K and the activation energy is 60 kJ/mol. The heat of reaction is −50 kJ/mol, and the volumetric heat capacity of the liquid is 4.0 kJ/(L·K), both constant. What reactor volume is needed for 80% conversion, and at what temperature does the stream leave? What volume would an isothermal reactor at 300 K need for the same conversion?

## Por que este exercício

- **Confirmar as correções da execução no Codex do Teste 15** (`fc03748`): a pasta temporária do `check.py` ao lado da lição, o aviso de formato de impressão não explicado, os rótulos de tipo sem pontuação, a entrega obrigatória e a verificação que não reaproveita a própria relação.
- **Opus e Codex lado a lado**, agora que os dois leem a skill pela junction.
- **Em inglês**, alternando com o Teste 15.
- **Balanço de massa e de energia juntos**, uma área nova: o balanço de energia adiabático dá T como função linear de X, e o volume sai de uma integral sem fórmula fechada (a temperatura entra na exponencial de Arrhenius). A comparação com o isotérmico tem fórmula fechada.

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | Balanço de energia | T = T₀ + ΔT_ad·X, com ΔT_ad = (−ΔH)·C_A0/(ρc_p) = 25 K | Temperatura constante |
| 2 | Arrhenius com referência | k(T) = k₀·exp[E/R·(1/T₀ − 1/T)] | Usar k₀ como fator pré-exponencial |
| 3 | Unidades | E em J/mol com R = 8,314 J/(mol·K); ρc_p em kJ/(L·K) com ΔH em kJ/mol | Fator mil |
| 4 | Sem fórmula fechada | Integração numérica (`quad` na integral de projeto ou `solve_ivp` em V) | Fórmula isotérmica aplicada ao adiabático |
| 5 | Isotérmico | V = (v₀/k₀)·ln[1/(1 − X)], fórmula fechada | Integrar numericamente o que tem fórmula, sem dizer |
| 6 | Verificação | Independente: o outro método numérico (EDO contra integral), ou o caso isotérmico como limite (ΔH → 0) | Reaproveitar a mesma integral |
| 7 | Formatos de impressão | Cada tipo de formato explicado ao aparecer | `.2f` sem explicação |

## Gabarito

Calculado com `quad` na equação de projeto e conferido com `solve_ivp`; guardado fora do repositório até as sessões terminarem.

| Grandeza | Valor |
|---|---|
| ΔT_ad | 25,0 K |
| Volume do PFR adiabático para X = 0,80 | **135,55 L** |
| Temperatura de saída | **320,0 K** |
| Volume do PFR isotérmico a 300 K | **321,89 L** (fórmula fechada: (v₀/k₀)·ln 5) |
