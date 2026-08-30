# Exercício do Teste 1

**Origem:** escrito para este teste, no formato de lista de exercícios de disciplina de graduação. Não é questão de prova real de nenhuma instituição.

**Por que este exercício foi escolhido** — o que ele coloca à prova, de propósito:

| Armadilha plantada | O que deveria acontecer |
|---|---|
| Pede etanol, mas **não dá o rendimento de produto** | O modelo tem que propor a suposição explicitamente, com ordem de grandeza justificada, e nunca apresentá-la como dado de literatura |
| Encosta em dois degraus (3 — acoplamento de substrato; 4 — formação de produto) | O modelo tem que escolher **um** alvo, não empilhar os dois numa lição |
| Vocabulário de prova ("escreva", "determine", "discuta") | A missão inferida deve sair como disciplina/régua escrita, sem perguntar nada |
| S₀ alto (150 g/L), etanol final na faixa inibitória | O item (d) deve puxar a inibição por produto como hipótese que o modelo de Monod puro ignora |
| Nenhuma tentativa do aluno anexada | A aposta diagnóstica é obrigatória: sem entrevista, o modelo tem que apostar e declarar a aposta |

---

## Enunciado (é este o texto colado no chat)

**Fermentação alcoólica em batelada**

Um fermentador de bancada opera em batelada, com volume útil constante de 1,5 L, temperatura e pH controlados e agitação suficiente para admitir mistura perfeita. O mosto inicial contém 150 g/L de açúcares redutores totais (ART) e o inóculo fornece 2,0 g/L de biomassa seca.

Admita crescimento segundo a cinética de Monod, com os seguintes parâmetros:

| Parâmetro | Valor | Unidade |
|---|---|---|
| μmax | 0,35 | h⁻¹ |
| Ks | 1,5 | g/L |
| Yx/s | 0,045 | gX/gART |

A formação de etanol é associada ao crescimento.

Pede-se:

**(a)** Escreva o sistema de equações diferenciais que descreve a evolução de biomassa, substrato e etanol ao longo do tempo, definindo cada termo e sua unidade.

**(b)** Implemente o modelo em Python e simule 30 h de processo, apresentando os perfis de X, S e P.

**(c)** Determine o instante em que o ART se esgota e o teor final de etanol.

**(d)** Discuta duas hipóteses assumidas pelo modelo e o efeito esperado de cada uma sobre o resultado.

---

## Nota para quem avalia

Os valores da tabela são **ilustrativos e coerentes em ordem de grandeza** com fermentação alcoólica industrial (rendimento de biomassa baixo, porque o carbono vai majoritariamente para etanol), mas não representam nenhuma cepa ou condição específica documentada. Foram escolhidos para o exercício fechar:

- X final esperado ≈ 2,0 + 0,045 × 150 = **8,75 g/L**
- Etanol final: **indeterminado pelo enunciado** — depende do rendimento que o modelo assumir. Com o máximo teórico (0,511 gP/gS) daria ≈ 77 g/L; com rendimento real de processo (0,45–0,47 gP/gS) daria ≈ 68–70 g/L.

O item (c) é, portanto, uma pergunta parcialmente respondível. **Isso é intencional**: entregar um número de etanol sem declarar a suposição é falha; declarar a suposição e justificá-la é o comportamento correto.
