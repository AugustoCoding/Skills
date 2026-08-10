# Caso Guiado — Fermentação Contínua com Crescimento

## Problema
Modelar um quimiostato com entrada de substrato e saída de caldo, avaliando a dinâmica para um valor de D.

## Modelo esperado
- \(dX/dt = (\mu - D)X\)
- \(dS/dt = D(S_{in} - S) - (1/Y_{X/S})\mu X\)
- \(dP/dt = -DP + Y_{P/X}\mu X\)

## Código de referência
- Incluir `D` e `S_in` como parâmetros.
- Simular até aproximação do estado estacionário.
- Comparar comportamento para ao menos um cenário de D.

## Explicação modelo
A diluição remove biomassa e produto do reator. Se D for alto demais, pode ocorrer washout. O equilíbrio depende da competição entre crescimento celular e remoção por fluxo.
