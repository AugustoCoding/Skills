# Lições

| Data | Arquivo | Degrau | Alvo |
|---|---|---|---|
| 2026-08-30 | [acoplar-substrato-e-etanol-pelo-rendimento.html](./acoplar-substrato-e-etanol-pelo-rendimento.html) | 3 (tocando o 4) | Acoplar `dS/dt` e `dP/dt` ao crescimento pelos fatores de rendimento, com o sinal certo — e arbitrar o `Yp/x` que o enunciado não deu, usando o teto estequiométrico como régua |

## Próximo passo previsto

Implementação em `solve_ivp` (degrau 5): o item (b) do exercício de fermentação
alcoólica escrito em Python, com evento para capturar o instante de esgotamento do
ART e as armadilhas de `t_eval`, tolerância e passo adaptativo. Prometido no fecho da
lição acima.
