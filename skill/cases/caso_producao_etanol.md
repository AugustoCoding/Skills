# Caso Guiado — Produção de Etanol

## Problema
Simular produção de etanol por levedura a partir de glicose, com explicação didática para iniciantes.

## Modelo esperado
- Variáveis: X (biomassa), S (glicose), P (etanol).
- Cinética de crescimento por Monod (ou variação justificada).
- Formação de etanol vinculada ao crescimento por rendimento simplificado.

## Código de referência
- Definir parâmetros de crescimento e rendimentos.
- Resolver EDOs com `solve_ivp`.
- Plotar perfis de glicose, biomassa e etanol.

## Explicação modelo
Conforme a glicose é consumida, a biomassa cresce e o etanol é produzido. Em um modelo introdutório, os rendimentos permitem traduzir consumo de substrato em formação de células e produto.
