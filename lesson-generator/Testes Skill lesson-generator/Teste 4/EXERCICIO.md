# Exercício do Teste 4

**Origem:** escrito para este teste. Não é questão de prova real de nenhuma instituição.

**É o mesmo enunciado do Teste 3, palavra por palavra.** De propósito.

O Teste 3 rodou com a skill em `58f0ea0` e deixou três coisas em aberto: 8 minutos contra a meta de 5, lição de 1.541 palavras contra o teto de 1.000, e a figura que responde a questão — a curva de produtividade contra D — fora da lição, porque a skill proibia criar componente novo.

As três foram corrigidas em `bd01aac`. Repetir o exercício é a única forma de saber se a correção pegou: mesma entrada, skill diferente, e a diferença tem dono. Comparar exercícios diferentes, como aconteceu entre o Teste 2 e o 3, mistura o efeito da skill com o efeito do enunciado.

## Enunciado (é este o texto colado no chat)

Uma dorna contínua de 10 m³ opera em regime permanente, alimentada com mosto a 100 g/L de ART. A vazão de alimentação é ajustável.

A levedura segue Monod, com μmax = 0,30 h⁻¹, Ks = 1,0 g/L, Yx/s = 0,05 gX/gART e Yp/x = 8,0 gP/gX.

Quero um programa em Python que varra a taxa de diluição e me diga qual D dá a maior produtividade de etanol, e o que acontece se eu passar disso.

---

## O que este teste responde

| Pergunta | Como saber |
|---|---|
| **A conferência analítica encurtou o tempo?** No Teste 3, mais da metade dos 8 minutos foi Python rodando: um timeout de 120 s, mais 40 s e 44 s. O estado estacionário deste caso sai de três linhas de álgebra | Cronômetro, e o relatório de execução: quantas execuções de Python, e quanto tempo cada uma |
| **A figura da varredura entrou na lição?** É a resposta da questão — produtividade contra D. O `simulador.js` só desenha contra o tempo, e agora a skill manda escrever o componente quando a peça não existe | Procure um gráfico de varredura no HTML. Se a curva só existir dentro do script Python, a correção não pegou |
| **Ele contou as palavras?** O teto é 1.000 e o Teste 3 saiu com 1.541, mirando sem medir | Meça |
| **Escreveu na pasta indicada?** O Teste 3 aninhou `aula-fermentacao/` dentro da pasta indicada | `ls` |
| **Repetiu os erros confessados?** No Teste 3: um número ilustrativo escrito como medido ("−10⁻¹²") e um slider decorativo (`Sin`, sem nenhuma observação que mandasse mexer nele) | Leia a lição procurando esses dois |

Armadilhas que continuam valendo, herdadas do Teste 3:

- **Concentração não é produtividade.** O etanol é mais concentrado em D baixo (39,9 g/L em D = 0,05) e a produtividade lá é a pior (2,0). Responder "use D baixo para mais etanol" é errar o que foi perguntado.
- **O ótimo fica colado no precipício**: D ótimo 0,270 contra washout em 0,297.
- **O volume de 10 m³ tem uso legítimo** — converter D em vazão (2,70 m³/h). No Teste 3 foi usado assim, e minha suspeita inicial de que seria distração estava errada.
- **Um problema de valor inicial exige X0, S0, P0 e horizonte**, que o enunciado não dá. Declará-los na tabela, com motivo, é o comportamento certo.

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

O tempo continua sendo a métrica principal, mas a hipótese mudou. No Teste 2 a suspeita era o tamanho da skill, e enxugá-la cortou o tempo pela metade. No Teste 3 a medição mostrou que o que sobrou é **execução de Python**, não leitura: 3 chamadas para ler a skill, 1 para escrever a lição, 8 para rodar código.

Se agora a lição sair em menos de 5 minutos, quem estava cobrando o preço era a conferência numérica. Se continuar em 8, a causa é outra e ainda não sabemos qual — e aí não adianta continuar cortando a skill.

Os parâmetros são coerentes em ordem de grandeza com fermentação alcoólica contínua (Yx/s baixo porque o carbono vai para etanol; Yp/s = 0,40, abaixo do teto de Gay-Lussac de 0,511). Não representam cepa documentada, e a lição não deve citá-los como se representassem.
