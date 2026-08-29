# Caso Guiado — Fermentação em Batelada Simples

## Problema
Simular por 24 h um processo em batelada com variáveis X, S e P e cinética de Monod.

## Modelo esperado
- \(dX/dt = \mu X\)
- \(dS/dt = -(1/Y_{X/S}) dX/dt\)
- \(dP/dt = Y_{P/X} dX/dt\)
- \(\mu = \mu_{max}S/(K_s + S)\)

## Código de referência
- Definir parâmetros e condições iniciais.
- Implementar função de EDO.
- Resolver com `solve_ivp`.
- Plotar X, S e P.

## Explicação modelo
O crescimento celular aumenta X; esse crescimento consome substrato S e gera produto P via rendimentos. A curva de S tende a cair enquanto X e P sobem, até limitação de substrato.
