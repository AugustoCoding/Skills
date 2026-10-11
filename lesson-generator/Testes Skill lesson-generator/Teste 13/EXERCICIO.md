# Teste 13 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

> Num trocador de calor de tubo duplo em contracorrente, 0,50 kg/s de água quente entram a 90 °C e aquecem 0,80 kg/s de água fria que entram a 20 °C. O calor específico das duas correntes é 4,18 kJ/(kg·K), o coeficiente global de troca é 1,2 kW/(m²·K) e a área de troca é 6,0 m². Calcule a taxa de calor trocado e as temperaturas de saída das duas correntes. Que área seria necessária para a água quente sair a 50 °C?

## Por que este exercício

- **Transferência de calor**, uma área que nenhum teste usou.
- **Conta direta**, sem método numérico obrigatório: o método ε-NTU dá tudo em fórmula fechada. É o caso em que a skill diz que "a técnica é essa conta, e o recurso de Python é o que a executa".
- **Três perguntas**: testa a regra nova de a resposta responder a todas, com o programa imprimindo cada número.
- **Rodado nos três modelos** (Opus, Sonnet e Haiku 5.5), para comparar e para ver se as correções de `91fe9cd` pegaram, sobretudo no Haiku, que mostrou os desvios: a resposta incompleta, a pasta errada e a resposta longa no chat.

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | Qual corrente tem a menor capacidade térmica | C = vazão × cp para as duas; a quente é C<sub>min</sub> | Tomar a fria como C<sub>min</sub> |
| 2 | Contracorrente | A fórmula de ε da contracorrente | A de correntes paralelas |
| 3 | Unidades | kJ/(kg·K) com kg/s dá kW/K, e U em kW/(m²·K) | Fator mil |
| 4 | Duas temperaturas de saída desconhecidas | O balanço de energia de cada corrente, com q | Uma só saída calculada |
| 5 | Área para uma saída dada | Inverter a relação ε–NTU (fórmula ou busca de raiz) | Tentativa e erro manual |
| 6 | Verificação | Um caminho independente: a média logarítmica das diferenças de temperatura (LMTD) com as saídas calculadas dá o mesmo q | Nenhuma conferência |
| 7 | Três perguntas | A resposta traz q, as duas saídas e a área nova, todos impressos pelo programa | Resposta que remete a outra parte |

## Gabarito

Calculado pelo método ε-NTU (contracorrente) e guardado fora do repositório até as sessões terminarem.

| Grandeza | Valor |
|---|---|
| C<sub>q</sub> (quente, C<sub>min</sub>) | 2,090 kW/K |
| C<sub>f</sub> | 3,344 kW/K |
| C<sub>r</sub> | 0,625 |
| NTU | 3,445 |
| ε | 0,8756 |
| Calor trocado | 128,1 kW |
| Saída da quente | 28,7 °C |
| Saída da fria | 58,3 °C |

Para a quente sair a 50 °C: q = 83,6 kW, ε = 0,5714, NTU = 1,081, **A = 1,88 m²**, e a fria sai a 45,0 °C.
