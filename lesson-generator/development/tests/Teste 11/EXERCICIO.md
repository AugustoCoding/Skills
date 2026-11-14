# Teste 11 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

> Uma pastilha de catalisador em forma de placa, com 4 mm de espessura, está exposta dos dois lados a um gás em que a concentração do reagente A na superfície da pastilha é 10 mol/m³. Dentro da pastilha, A se difunde com difusividade efetiva de 2,0·10⁻⁹ m²/s e é consumido por uma reação de primeira ordem com k = 2,0·10⁻³ s⁻¹ (por volume de pastilha). Calcule o perfil de concentração de A dentro da pastilha, a concentração no centro e o fator de efetividade. O que acontece com o fator de efetividade se a pastilha tiver o dobro da espessura?

## Por que este exercício

- **Problema de valor de contorno**: uma EDO de segunda ordem no espaço, com uma condição em cada ponta. Nenhum teste usou; a técnica natural é `solve_bvp`, e o quadro da técnica e a explicação do mecanismo precisam dar conta dela.
- **Primeiro teste depois da reorganização**: o template só com padrões e o conteúdo concreto no `pecas.html`, que não tem um balanço de difusão. O modelo precisa montar a peça no mesmo padrão.
- **Regras novas**: símbolos marcados no texto, `data-titulo` em equação complementar, linhas de código curtas, figura no programa.

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | Espessura de 4 mm, exposta dos dois lados | Usar a simetria: meia espessura L = 2 mm, com derivada nula no centro | Domínio de 4 mm com concentração dada só de um lado |
| 2 | Unidades em mm e m | Converter L para metros | φ errado por um fator de mil |
| 3 | Problema de contorno, não de valor inicial | `solve_bvp` (ou tiro), com a condição em cada ponta explicada | `solve_ivp` com um chute de derivada sem dizer por quê |
| 4 | EDO de segunda ordem | Reescrever como duas de primeira ordem, e explicar por quê | Sistema mal montado |
| 5 | Fator de efetividade | Definição explicada (velocidade real sobre a velocidade se todo o interior estivesse em C<sub>s</sub>), calculado pelo fluxo na superfície ou pela integral | Número sem definição |
| 6 | Solução analítica existe | Conferir contra tanh(φ)/φ e C<sub>s</sub>/cosh(φ) | Nenhuma conferência |
| 7 | Dobro da espessura | O módulo de Thiele dobra, e o fator de efetividade cai quase à metade | Resposta qualitativa sem número |

## Gabarito

Calculado com `solve_bvp` (tol 10⁻⁸) e conferido pela solução analítica (η = tanh φ / φ; centro = C<sub>s</sub>/cosh φ), guardado fora do repositório até a sessão terminar.

| Grandeza | Pastilha de 4 mm (L = 2 mm) | Pastilha de 8 mm (L = 4 mm) |
|---|---|---|
| Módulo de Thiele φ | 2,000 | 4,000 |
| Concentração no centro | 2,658 mol/m³ | 0,366 mol/m³ |
| Fator de efetividade η | 0,4820 | 0,2498 |
