# Missão: Simulação de Fermentação

> Inferida dos exercícios trazidos pelo aluno. Não foi confirmada com ele — o que
> estiver errado aqui se corrige sozinho conforme chegam exercícios novos.

## Por que

Passar em uma disciplina de Engenharia Bioquímica / Bioprocessos, em que a avaliação
mistura dedução no papel e código que roda. O aluno precisa sair sabendo montar o
sistema de EDOs de um fermentador, implementá-lo em Python e **defender as hipóteses**
do modelo por escrito — não apenas obter o número.
*(inferido em 30/08/2026, do exercício de fermentação alcoólica em batelada: itens (a) a (d),
verbos "escreva", "implemente", "determine", "discuta", parâmetros redondos e fornecidos
prontos, sem dados experimentais.)*

O tema — ART, mosto, fermentador de bancada, etanol — é o vocabulário
sucroenergético brasileiro, o que sugere um curso nacional com viés de fermentação
alcoólica.
*(inferido em 30/08/2026, do mesmo exercício.)*

## Sucesso é

- Escrever do zero, sem consultar, o sistema `dX/dt`, `dS/dt`, `dP/dt` de uma
  batelada com Monod, com o sinal e o fator de rendimento certos.
- Perceber sozinho quando um parâmetro necessário **não foi dado** no enunciado, e
  arbitrar um valor defensável em vez de travar.
- Implementar o modelo com `solve_ivp` e obter o instante de esgotamento do
  substrato por evento, não por leitura visual do gráfico.
- Escrever, por conta própria, o item "discuta as hipóteses" — que é onde a nota
  costuma ser ganha ou perdida.

## Restrições

- **Régua escrita.** O item (a) pede definição de "cada termo e sua unidade" e o
  item (d) pede discussão: a avaliação cobra texto, não só código. Lições devem
  exigir reconstrução no papel, não só cliques.
- **Prazo provável de semestre**, com o exercício em mãos agora.
  *(inferido em 30/08/2026 — não há data explícita.)*
- **Ambiente Python desconhecido.** Até que ele diga, assumir apenas
  `numpy` + `scipy` + `matplotlib`, sem dependências exóticas.
- Base matemática: cálculo e EDOs em nível de graduação; o enunciado já usa notação
  diferencial sem explicá-la.

## Fora de escopo

- Modelagem estruturada e metabolismo em escala genômica.
- Transferência de oxigênio, kLa e scale-up — o enunciado zera isso ao declarar
  "agitação suficiente" e "temperatura e pH controlados".
- Controle avançado, CFD, otimização de planta.
- Ajuste de parâmetros a dados experimentais (degrau 9): não há tabela de dados em
  nenhum exercício ainda.
