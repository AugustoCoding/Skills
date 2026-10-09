# Histórico de testes

Uma linha por execução. É daqui que se lê a evolução da skill: o que foi testado, com qual versão, e o que mudou por causa disso.

| Teste | Data | Commit da skill | Modelo | Foco | Veredito | Correções que saíram |
|---|---|---|---|---|---|---|
| [1](./Teste%201/SESSAO.md) | 2026-08-30 | `f385df4` | Opus 5, esforço médio | Primeira execução do fluxo sem entrevista | Aprovado, 2 achados | `10919df` — regra da lacuna, varredura de procedência, links fora do workspace |
| [2](./Teste%202/SESSAO.md) | 2026-08-30 | `9d600ba` | Opus 5, esforço médio | A lição reescrita em torno do código, com enunciado corrido | Interrompido: 15+ min | `58f0ea0` — skill enxugada, sem estado, três divisões |
| [3](./Teste%203/SESSAO.md) | 2026-08-30 | `58f0ea0` | Opus 5, esforço médio | A skill enxuta: sai em menos de 5 minutos? | Aprovado com ressalvas: 8 min | `bd01aac` — analítico primeiro, contar palavras, e a permissão de criar componente |
| [4](./Teste%204/SESSAO.md) | 2026-08-31 | `bd01aac` | Opus 5, esforço médio | Repetição controlada do Teste 3: as correções pegaram? | Aprovado: 6 min, componente escrito | `4c54a23` — régua do teto, tabela de componentes, procedência por grep, e o gráfico de painel único |
| [5](./Teste%205/SESSAO.md) | 2026-09-01 | `89677bf` | Opus 5, esforço médio | Teoria por equação, e a disciplina do gráfico | Aprovado com ressalvas: > 10 min | `a84f18d` — teto de palavras removido, parágrafo de abertura, definição por extenso, convenções de componente e o design novo |
| [6](./Teste%206/SESSAO.md) | 2026-09-01 | `fbe8760` | Opus 5, esforço médio | Sem teto de palavras: mais completa e mais rápida? | Aprovado com ressalva: 6 a 8 min, lição 88% maior | {a preencher} |
| [7](./Teste%207/SESSAO.md) | 2026-09-04 | `11ac5de` | Opus 5, esforço médio | A skill sem domínio: forma da skill, teoria do modelo | Aprovado com ressalva: 0 leituras do simulador, gráficos corrigidos, tempo não medido | {a preencher} |

## Como usar

- Uma linha por teste, na ordem em que foram rodados.
- **Commit da skill** é o que torna a comparação possível: dois testes com vereditos diferentes só dizem alguma coisa se der para ver que a definição mudou no meio.
- **Correções que saíram** fecha o ciclo: teste que não gerou correção nem confirmação explícita foi teste desperdiçado.
- O detalhe fica em `Teste N/SESSAO.md`; esta tabela é só o índice.
