# Formato do `MISSION.md`

`MISSION.md` fica na raiz do workspace. Captura a *razão* pela qual o aluno está aprendendo a simular fermentação. Toda decisão de ensino — o que a lição exige dele, qual fonte trazer, qual nível de rigor cobrar — deve poder ser rastreada até este documento.

Ele é **inferido, nunca perguntado**. O aluno não é entrevistado em nenhum momento: você lê a missão nos exercícios que ele manda, escreve o que inferiu, marca que é inferência, e corrige quando um exercício novo contradiz o que estava lá.

## Template

```md
# Missão: Simulação de Fermentação

> Inferida dos exercícios trazidos pelo aluno. Não foi confirmada com ele — o que
> estiver errado aqui se corrige sozinho conforme chegam exercícios novos.

## Por que
{1 a 3 frases. O objetivo concreto e real, como você o infere. O que muda no
trabalho, no curso ou na pesquisa do aluno quando ele tiver essa habilidade.}
*(inferido em 30/08, do exercício de quimiostato com linguagem de prova)*

## Sucesso é
- {Uma coisa específica e observável que o aluno vai conseguir fazer}
- {Outra}

## Restrições
- {Prazo, régua de avaliação, ambiente Python, base matemática aparente — o que
  o enunciado e o histórico do workspace deixam ver}

## Fora de escopo
- {Tópicos adjacentes que os exercícios não tocam e que não vale perseguir agora,
  protegendo a zona de desenvolvimento proximal}
```

Marque a procedência de cada inferência importante: a data e o exercício que a produziu. É o que permite saber, três sessões depois, se a missão ainda descreve a realidade ou se envelheceu.

## Sinais de inferência

Um enunciado diz mais sobre o aluno do que ele diria numa entrevista. O que ler:

**O gatilho — de onde veio o exercício**
- Vocabulário de prova ("determine", "calcule", "assinale", itens a, b, c) → disciplina, régua escrita, prazo de semestre.
- Enunciado com dados experimentais em tabela → laboratório, IC, TCC; a régua é o ajuste.
- Processo nomeado com detalhe industrial (dorna, mosto, teor alcoólico, ART) → estágio ou trabalho; a régua é alguém no processo.
- Trecho de artigo, figura a reproduzir → pesquisa; a régua é o orientador.

**O objeto — o que ele está modelando**
- Microrganismo, substrato e produto citados → há processo real; ancore os exemplos nele.
- Números redondos e organismo genérico ("um microrganismo cresce em glicose") → exercício de disciplina; ancorar na régua, não no processo.
- Presença de dados → o degrau 9 (ajuste) está no horizonte, mesmo que o exercício de hoje não peça.

**O regime — batelada, alimentada ou contínuo**
- Está no enunciado, quase sempre. Se o próprio aluno confunde o regime, isso é conteúdo de lição e vale registro.

**A régua — quem avalia e em que forma**
- "Modele e simule" → código roda e gráfico apresentável.
- "Deduza", "mostre que" → papel e caneta; a lição tem que exigir reconstrução escrita.
- "Discuta o resultado" → interpretação vale tanto quanto o número.

**A base — o que ele já consegue fazer**
- O que veio junto do enunciado é o melhor sinal: código colado, tentativa parcial, silêncio.
- `./learning-records/` é a evidência acumulada, e vale mais que qualquer sinal do enunciado do dia.
- Erro de sintaxe Python básico → nível de programação baixo; não gaste lição com modelagem sofisticada.
- `solve_ivp` usado corretamente com o modelo errado → o problema é bioprocesso, não código.

**O limite — prazo e ambiente**
- Datas no enunciado, menção a entrega, "prova na sexta" → prazo real.
- Notebook Colab colado, caminhos de arquivo, versão de biblioteca → ambiente; anote em `NOTES.md`.

Nada disso vira pergunta. Vira hipótese escrita em `MISSION.md`, com data.

## Regras

- **Não pergunte, infira.** Nem no início, nem quando a missão mudar. Se a inferência estiver errada, o aluno corrige ao ler — e o custo de errar uma inferência marcada é muito menor que o de um questionário na porta de entrada.
- **Missão vazia não bloqueia a lição.** Na primeira sessão você tem um exercício e nada mais: escreva a missão que ele sugere, marque como inferência de baixa confiança, e ensine. A lição não espera pela missão.
- **Uma missão por workspace.** Se o aluno quer aprender simulação de fermentação e, digamos, análise estatística de dados ômicos, são dois workspaces.
- **Concreto vence abstrato.** "Simular a dorna de etanol da usina onde estagia, para o supervisor, em novembro" vence "aprender bioprocessos". "Passar em Engenharia Bioquímica II" é concreto e perfeitamente válido — a prova é uma régua real.
- **Prefira a hipótese explícita à missão de fachada.** Se os sinais não sustentam nada, escreva o pouco que sustentam e diga que é pouco: "exercício de disciplina, régua provavelmente escrita, sem processo real identificado". Missão vaga marcada como vaga é útil; missão vaga com cara de certeza dirige errado.
- **A missão define o rigor.** Um aluno que precisa passar numa prova escrita precisa reconstruir balanços à mão; um que precisa entregar um gráfico para o supervisor precisa de código robusto e de leitura crítica de resultado. São cursos diferentes a partir do mesmo conteúdo.
- **Revise quando um exercício contradisser.** É comum o aluno mudar de contexto no meio do caminho. Atualize o arquivo, marque a data, e escreva registro de aprendizado se a mudança for evidência de algo que ele aprendeu.
- **Mantenha curto.** Se `MISSION.md` passa de uma tela, deixou de ser bússola e virou plano de curso.
