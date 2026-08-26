# Estudo de Caso: Produção de Etanol

## Objetivo

Modelar conceitualmente a produção de etanol por *Saccharomyces cerevisiae* a partir de glicose.

## Variáveis relevantes

- Biomassa: \(X\)
- Glicose: \(S\)
- Etanol: \(P\)
- Temperatura, pH, alimentação e viabilidade celular

## Modelo inicial

Comece por Monod para crescimento e por Luedeking-Piret para formação de produto. Caso a concentração de etanol aumente, inclua um termo de inibição calibrado a dados experimentais.

## Estratégia de operação

Em batelada alimentada, a alimentação pode manter glicose residual baixa, reduzindo risco de inibição osmótica e permitindo controlar a taxa de crescimento. A estratégia deve respeitar limites de transferência de calor, espuma e capacidade de remoção de CO2.

## Indicadores

- Conversão de glicose
- Rendimento em etanol \(Y_{P/S}\)
- Produtividade volumétrica
- Concentração final de etanol
- Viabilidade celular

## Validação

Compare previsões de biomassa, substrato e produto com amostras temporais. Reporte condições iniciais, unidades, método analítico e incerteza.