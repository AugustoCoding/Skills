# Exercício do Teste 5

**Origem:** escrito para este teste. Não é questão de prova real de nenhuma instituição.

**O que muda:** batelada com inibição por produto — quatro equações, que é o que faz a estrutura nova da teoria aparecer. E o enunciado pede uma grandeza em unidade diferente das concentrações, que é a tentação do segundo painel.

## Enunciado (é este o texto colado no chat)

Uma dorna de 50 m³ fermenta mosto de altíssima gravidade, com 260 g/L de ART. O inóculo entra a 1,0 g/L de levedura, e a fermentação é anaeróbia, com temperatura controlada.

A levedura segue Monod com inibição linear pelo etanol: o crescimento cai proporcionalmente conforme o etanol sobe, e cessa quando ele chega a 90 g/L. Os parâmetros são μmax = 0,35 h⁻¹, Ks = 1,5 g/L, Yx/s = 0,045 gX/gART e Yp/x = 9,0 gP/gX.

Quero simular 72 h dessa batelada em Python, saber quanto etanol sai no final e quanto açúcar sobra — e entender como a taxa específica de crescimento se comporta ao longo do processo.

---

## O que este teste responde

| Pergunta | Como saber |
|---|---|
| **A teoria virou um bloco por equação?** São quatro: a de μ com inibição, e as três derivadas. Cada uma deve vir com os símbolos **dela** logo abaixo, e uma frase do que ela significa | Olhe a divisão 1: equação, "onde", símbolos, frase. Se as quatro vierem empilhadas e as definições depois, a mudança não pegou |
| **Resistiu ao segundo painel?** O enunciado pede μ (1/h) junto de concentrações (g/L). A regra manda escolher a que responde a pergunta e pôr a outra no texto | Um canvas, um painel, 320 a 420 px. Dois painéis empilhados é reprovação do item |
| **Batizou as curvas?** É lição de etanol e levedura, não de "produto" e "biomassa" | `data-rotulos` na tag do gráfico, e o texto usando os mesmos nomes da legenda |
| **Cada observação tem insight próprio?** | Se duas dizem a mesma coisa com palavras diferentes, o item falhou |
| **Foi pelo analítico?** A resposta central sai de uma linha de álgebra, sem integrar | Ver o relatório de execução: quantas integrações, e se o número saiu de fórmula |

Armadilhas de conteúdo:

- **O açúcar não acaba.** A fermentação para por inibição com **37,8 g/L de ART sobrando** na dorna. Quem escrever que o substrato se esgota errou o fenômeno central.
- **O teto de 105,3 g/L nunca é alcançado.** Se todo o ART virasse etanol, dariam 0,045 × 9,0 × 260 = 105,3 g/L. O etanol para em 90 porque a inibição chega antes.
- **O volume de 50 m³ não entra em nada** — as concentrações não dependem dele. Serve para converter em massa total, se a lição quiser.
- **O modelo `inibicao_produto` já existe** em `assets/simulador.js`. Escrever componente novo aqui é trabalho desperdiçado.

## Números conferidos

Rodados com o modelo `inibicao_produto` do simulador, 72 h:

| t (h) | Levedura X (g/L) | ART S (g/L) | Etanol P (g/L) | μ (1/h) |
|---|---|---|---|---|
| 6 | 5,49 | 160,2 | 40,4 | 0,191 |
| 12 | 9,97 | 60,7 | 80,7 | 0,035 |
| 18 | 10,88 | 40,4 | 88,9 | 0,0040 |
| 24 | 10,99 | 38,1 | 89,9 | 0,0004 |
| 36 a 72 | 11,00 | 37,8 | 90,0 | ~0 |

**Conferência analítica, sem integrar** — é assim que a skill manda achar o número:

- ART consumido até o etanol travar: `Pmax / (Yx/s · Yp/x)` = 90 / 0,405 = **222,2 g/L**
- **ART que sobra** = 260 − 222,2 = **37,8 g/L**
- **Levedura final** = 1,0 + 0,045 × 222,2 = **11,0 g/L**
- Etanol final = **90,0 g/L**, o próprio Pmax

O interessante para a análise crítica: **μ cai quase 50 vezes entre 6 h e 18 h**, e da 24ª hora em diante a dorna está parada. Metade do tempo de batelada não produz nada.

## Nota para quem avalia

Os parâmetros são coerentes com fermentação alcoólica de altíssima gravidade: Yx/s baixo porque o carbono vai para o etanol, Yp/s = 0,405 gP/gART (abaixo do teto de Gay-Lussac, 0,511), e inibição cessando perto de 90 g/L de etanol. Não representam cepa documentada, e a lição não deve citá-los como se representassem.

A inibição é **linear** — μ multiplicado por (1 − P/Pmax) —, que é a forma implementada no componente. Se a lição usar outra forma, o gráfico e o código vão discordar.
