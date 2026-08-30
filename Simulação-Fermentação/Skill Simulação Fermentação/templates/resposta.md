# Template de Resolução Guiada

**Quando usar:** sempre. O aluno chega com um enunciado — lista de exercícios, prova antiga, problema do orientador — e quer a resposta. É assim que toda sessão começa.

A lição **resolve a questão inteira**, e ele vai sair dela com o código rodando. O risco, portanto, não é mais entregar demais: é entregar de um jeito que ele leia, concorde e esqueça. Este documento trata dos dois riscos, nessa ordem de importância.

Quando o aluno volta sem enunciado, o exercício vem de `../cases/`, escolhido pelo buraco registrado em `./learning-records/`. O protocolo abaixo vale igual.

## Protocolo

### 1. Leia o enunciado como diagnóstico

Antes de escrever qualquer coisa, identifique:

- **Qual regime?** Batelada, batelada alimentada ou contínuo.
- **Quais variáveis de estado?** Normalmente X, S, P; às vezes V.
- **Quais parâmetros estão dados, e quais faltam?** O que falta é escolha de modelagem — e escolha de modelagem é conteúdo de ensino.
- **Qual degrau do mapa de progressão** ([SKILL.md](../SKILL.md)) este exercício exige, e **os pré-requisitos têm evidência** em `./learning-records/`? Se falta um, ele vira estação zero do mesmo arquivo.
- **Quais hipóteses o enunciado esconde?** Vão para a estação de crítica, com a consequência de cada uma.

### 2. Fatie o enunciado nas quatro estações

| Estação | O que entra |
|---|---|
| **Modelo** | As equações do caso, com cada termo anotado e a unidade explícita |
| **Código** | O programa inteiro, comentado, explicado passo a passo — a maior estação |
| **Resultado** | Previsão, e depois os números-alvo que ele usa para conferir o próprio código |
| **Crítica** | Hipóteses e limites, previsão, e o simulador de parâmetros |

Enunciado com itens (a), (b), (c) quase sempre mapeia direto. Enunciado corrido é fatiado por elas mesmo assim — a espinha não muda porque o professor não numerou. Estação sem conteúdo naquele exercício não aparece.

### 3. Aposte onde está a dificuldade — para saber onde aprofundar

A lição cobre tudo, então a aposta não escolhe o escopo. Ela escolhe **onde gastar as palavras**, e vale uma linha declarada, para quem já sabe aquela parte poder pular.

| Sinal no que ele mandou | Onde aprofundar |
|---|---|
| Só o enunciado, nada mais | O caminho inteiro, com peso no código |
| "não sei montar as equações" | A estação de modelo ganha as poucas palavras extras de teoria |
| Código colado, com traceback | A estação de código, na parte de uso do `solve_ivp` e argumentos |
| Código que roda + "o gráfico está estranho" | Sinal, rendimento e unidade — nessa ordem de probabilidade |
| Modelo pronto + "está certo?" | Os números-alvo, e a previsão antes deles |
| Enunciado de quimiostato, registros só de batelada | Estação zero: o termo de diluição, antes de tudo |
| Vocabulário de prova ("determine", "discuta") | A crítica, que é onde a nota escrita se ganha |

Cruze com o catálogo de concepções errôneas de [rules.md](../rules.md): para cada tipo de enunciado há um erro mais provável, e é dele que sai o distrator do quiz.

### 4. Escreva o código antes de escrever a lição

Rode o modelo de verdade — `solve_ivp`, tolerância apertada — e guarde:

- os números-alvo (X final, instante de esgotamento, título final);
- o que muda entre as variantes que você vai oferecer no explorador;
- a faixa dos parâmetros que vale mexer no simulador.

Números-alvo publicados sem conferência mandam o aluno caçar defeito em código correto, e queimam a confiança dele na lição inteira.

### 5. Parâmetros que faltam

Se o enunciado não dá um valor:

- Proponha um valor plausível **e diga explicitamente que é suposição**, com a ordem de grandeza justificada.
- Ancore no teto físico quando existir — em fermentação alcoólica, a estequiometria de Gay-Lussac limita `Yp/s ≤ 0,511 gP/gART`, e o teto vale mais que qualquer referência bibliográfica.
- Nunca apresente um número inventado com aparência de dado de literatura.

### 6. Feche o ciclo no workspace

- **Registre.** Houve evidência de entendimento, conhecimento prévio ou concepção corrigida? Escreva em `./learning-records/`.
- **Indexe.** Uma linha em `lessons/INDEX.md`, com data, degrau e alvo.
- **Atualize suas folhas.** Se apareceu notação ou sintaxe que você vai reusar, leve para `./reference/` — material seu, não leitura do aluno.

No chat ficam duas a quatro linhas: onde escreveu, qual foi a aposta, e o convite a perguntar.

## Estrutura da resposta escrita

Quando a missão exigir um relatório — e não só o código rodando —, esta é a ordem, e ela vive **dentro da lição**, não numa resposta de chat:

1. **Enunciado reescrito** — o problema em termos objetivos; variáveis de estado e o que deve ser simulado.
2. **Hipóteses** — o que o modelo assume e ignora, com a consequência de cada escolha.
3. **Modelo** — equações com cada termo definido; parâmetros em tabela, com unidade e procedência.
4. **Implementação** — código completo e executável, dependências declaradas, unidades em comentário.
5. **Resultados** — gráficos com eixos rotulados e unidade; números-chave destacados.
6. **Interpretação** — o que as curvas dizem sobre o processo, não sobre a matemática.
7. **Limitações e próximos passos** — onde o modelo falha e o que o melhoraria.

## Sinais de que a lição saiu errada

- **A teoria comeu o código.** A estação de modelo ficou maior que a de código: a estrela da skill foi invertida.
- **Nada é previsto.** O aluno leu de ponta a ponta sem escrever uma linha nem clicar em nada. É tutorial, não lição.
- **O explorador ensina o erro.** As variantes mostram o sinal trocado produzindo curva errada, em vez de escolhas corretas entre si.
- **Sobrou promessa.** Aparece um "na próxima lição" em algum lugar.
- **Sobrou link interno.** A lição manda abrir `RESOURCES.md`, `reference/` ou outra lição.
- **O número-alvo não foi conferido.**
- **A sessão acabou sem registro de aprendizado** — porque não houve evidência, só entrega.
