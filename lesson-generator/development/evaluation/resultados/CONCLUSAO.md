# Conclusão: qual modelo usar com a skill lesson-generator

Escrita em 13/11/2026, a partir dos blocos A e B completos: 24 questões, três modelos, 72 execuções, todas julgadas item a item e comparadas duas a duas. Os números estão em [RESUMO.md](./RESUMO.md); a métrica, no [README](../README.md). O Fable 5.2 não foi avaliado.

## Recomendação

**Use o Claude Opus 5.5.** Ele entrega a melhor lição nas duas medidas, é o mais rápido e o mais previsível, e nunca passou de 6 minutos.

**Melhor custo-benefício: Claude Sonnet 5.5.** A lição dele cumpre quase a mesma lista de itens que a do Opus (qualidade de 96,2% contra 96,6%, índice de 94,6% contra 96,3%), no mesmo tempo, por cerca de dois terços do custo; perde na leitura de conjunto do juiz, a medida mais sujeita ao viés do juiz ser um Opus (veja os limites).

**Não use o Claude Haiku 5.5 para gerar lições**, a não ser que o custo seja decisivo. As respostas saem certas, mas a lição explica menos, demora mais e, em 4 de 24 sessões, ele travou com um programa deixado rodando em segundo plano.

## Por quê

| | Opus 5.5 | Sonnet 5.5 | Haiku 5.5 |
|---|---|---|---|
| Lições entregues | 24 de 24 | 24 de 24 | 24 de 24 |
| Respostas certas (gabarito) | 100% | 100% | 100% |
| Qualidade (explicado e certo) | **96,6%** | 96,2% | 93,5% |
| Erro (do que afirmou, o que está errado) | **0,1%** | 0,4% | 0,9% |
| Tempo mediano | **3 min 45 s** | 3 min 48 s | 4 min 42 s |
| Sessões acima de 5 min / de 7 min | **3 / 0** | 5 / 0 | 9 / 4 |
| Índice (qualidade × fator de tempo) | **96,3%** | 94,6% | 83,8% |
| Comparação direta: vitórias | 43 de 48 | 23 de 48 | 6 de 48 |
| Custo estimado por lição, preço de API | US$ 0,82 | US$ 0,53 | US$ 0,05 |

**Os três acertam as contas.** Nenhuma das 72 lições errou uma resposta do gabarito, e todos os programas rodaram. A diferença entre os modelos está em quanto a lição explica e em quanto tempo leva, não em chegar ao número.

**Opus × Sonnet: empate na lista, vitória clara do Opus na leitura.**
- Pela lista de itens, os dois empatam: em qualidade, 12 questões para cada lado; no índice, o Opus fica 1,7 ponto à frente (placar 14–10, p = 0,54, sem diferença estatística).
- Na comparação direta, o juiz preferiu a lição do Opus em 20 de 24 questões (p = 0,002), e nos dois blocos (11–1 no A, 9–3 no B). As justificativas apontam sempre o mesmo tipo de vantagem: o Opus mostra de onde sai cada equação, substitui os dados nos balanços, justifica as hipóteses e explica o que cada argumento faz, enquanto o Sonnet tende a afirmar sem mostrar.
- Ou seja, os dois cumprem os mesmos itens, mas o Opus os explica de um jeito que o juiz julga ensinar melhor. É a diferença que a comparação direta foi criada para captar.
- O Opus ainda erra menos (0,1% contra 0,4%) e é mais regular no tempo.

**Haiku: correto, mas fraco como professor.** Perde do Sonnet em 22 de 24 questões no índice e em 19 de 24 na comparação direta; do Opus, em 19 e 23. A qualidade é só uns 3 pontos menor, mas a seção do código é a mais fraca de todas (89% de completude, contra 93% e 94%), e o tempo pesa: ele gera o dobro de texto do Opus (64 mil tokens de saída por lição, contra 25 mil) e, quando trava, a sessão chega a 9 minutos.

**Custo.** O Opus gera menos tokens que os outros dois, e por isso custa só cerca de 1,5 vez o Sonnet, embora o preço por token seja o dobro. No plano Pro, a conta é parecida: uma lição do Opus pesa mais no limite que uma do Sonnet, e as do Haiku quase não pesam. As estimativas usam os preços de API de novembro de 2026 (entrada, saída e leitura de cache publicadas; a escrita de cache foi suposta em 1,25 vez a entrada, e a leitura de cache do Haiku em 0,1 vez a entrada).

## Limites desta conclusão

- **O juiz é o Opus 5.5.** Ele não sabia que modelo escreveu cada lição, mas pode reconhecer o próprio estilo e preferi-lo. Isso pesa sobretudo na comparação direta Opus × Sonnet, a única medida em que o Opus se destaca com folga. Para confirmar, vale a conferência prevista no README (você julga uns vinte itens de cinco pacotes sorteados) e, se sobrar cota, refazer as 24 comparações Opus × Sonnet com o Sonnet como juiz.
- **Uma execução por questão.** A variação entre questões foi maior que a esperada entre repetições, mas um modelo pode ter tido uma sessão ruim por acaso; com 24 pares, isso dilui.
- **Esforço médio e Claude Code.** No claude.ai, ou com outro esforço, os tempos e o custo mudam; a ordem entre os modelos deve se manter, mas não foi medida.
- **O Fable 5.2 ficou de fora.** Pelo preço (o dobro do Opus por token), só valeria se a lição fosse claramente melhor; isso fica para uma rodada própria.
