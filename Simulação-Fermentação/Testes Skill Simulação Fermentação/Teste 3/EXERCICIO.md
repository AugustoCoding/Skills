# Exercício do Teste 3

**Origem:** escrito para este teste. Não é questão de prova real de nenhuma instituição.

**O que muda em relação aos anteriores:** regime contínuo (o terceiro e último dos clássicos), enunciado corrido, e **nenhum parâmetro faltando** — de propósito.

## Enunciado (é este o texto colado no chat)

Uma dorna contínua de 10 m³ opera em regime permanente, alimentada com mosto a 100 g/L de ART. A vazão de alimentação é ajustável.

A levedura segue Monod, com μmax = 0,30 h⁻¹, Ks = 1,0 g/L, Yx/s = 0,05 gX/gART e Yp/x = 8,0 gP/gX.

Quero um programa em Python que varra a taxa de diluição e me diga qual D dá a maior produtividade de etanol, e o que acontece se eu passar disso.

---

## Armadilhas plantadas

| Armadilha | O que deveria acontecer |
|---|---|
| **Nada falta nos parâmetros do modelo** | μmax, Ks, Yx/s, Yp/x e Sin estão todos dados: nenhum parâmetro cinético deveria ser inventado. **Mas um problema de valor inicial exige X0, S0, P0 e um horizonte de integração, e o enunciado não dá nenhum** — essas quatro escolhas são legítimas e devem aparecer declaradas na tabela, com justificativa. Errei ao escrever, na primeira versão deste gabarito, que nenhuma suposição deveria aparecer |
| **Concentração não é produtividade** | O etanol é mais concentrado em D baixo (39,9 g/L em D = 0,05) e a produtividade lá é a pior (2,0 g·L⁻¹·h⁻¹). Se a lição responder "use D baixo para mais etanol", errou o que foi perguntado |
| **O ótimo fica colado no precipício** | D ótimo = 0,270 e washout em 0,297: operar no ótimo é operar a 9% do washout. É a melhor observação de análise crítica que este caso oferece |
| **O volume de 10 m³ é irrelevante** | D é por unidade de volume e as concentrações não dependem do tamanho da dorna. Se o volume entrar no código como se importasse, o modelo usou o dado por reflexo |
| **Enunciado corrido, sem itens** | Tem que ser fatiado sozinho nas três divisões |
| **Regime já suportado** | O `quimiostato` existe em `assets/simulador.js`. Escrever um modelo novo é trabalho desperdiçado |

## Números conferidos

Rodados com o modelo `quimiostato` do simulador, integrando até o estado estacionário:

| D (1/h) | S* (g/L) | X* (g/L) | P* (g/L) | Produtividade (g·L⁻¹·h⁻¹) |
|---|---|---|---|---|
| 0,05 | 0,20 | 4,99 | 39,9 | 2,00 |
| 0,15 | 1,00 | 4,95 | 39,6 | 5,94 |
| 0,25 | 5,00 | 4,75 | 38,0 | 9,50 |
| **0,270** | 9,05 | 4,55 | 36,4 | **9,83 ← máximo** |
| 0,29 | 29,3 | 3,54 | 28,3 | 8,20 |
| 0,30 | 94,7 | 0,26 | 2,1 | 0,63 |
| 0,32 | 100 | 0 | 0 | 0 |

Conferência analítica, sem integrar:

- **D crítico** = μmax·Sin/(Ks + Sin) = 0,30 × 100/101 = **0,297 1/h**
- **D ótimo** = μmax·(1 − √(Ks/(Ks + Sin))) = 0,30 × (1 − √(1/101)) = **0,270 1/h**
- **S\*** = Ks·D/(μmax − D) · **X\*** = Yx/s·(Sin − S\*) · **P\*** = Yp/x·X\*

## Nota para quem avalia

O tempo é a métrica principal deste teste. A skill foi enxugada de 30 arquivos para 9 e de 9.088 para 2.146 palavras de leitura obrigatória exatamente por causa dos 15 minutos do Teste 2. Se a lição não sair em menos de cinco minutos, o problema não era o tamanho da skill — e é isso que precisamos descobrir.

Os parâmetros são coerentes em ordem de grandeza com fermentação alcoólica contínua (Yx/s baixo porque o carbono vai para etanol; Yp/s = 0,40, abaixo do teto de Gay-Lussac de 0,511). Não representam cepa documentada, e a lição não deve citá-los como se representassem.
