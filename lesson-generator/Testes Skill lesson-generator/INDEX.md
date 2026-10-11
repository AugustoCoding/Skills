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
| [8](./Teste%208/SESSAO.md) | 2026-10-10 | `4f11200` | Opus 5.5, esforço médio | A skill reescrita num exercício de separação (flash, raiz) | Aprovado com ressalvas: números certos, 10 min 37 s, 3 achados de script | `eb1befa` — rascunho, resposta com dados da tabela, nome do controle, sessão sem commit |
| [9](./Teste%209/SESSAO.md) | 2026-10-10 | `fec2854` | Opus 5.5, esforço médio | Prompt de aluno, pasta de aluno, skill em registro técnico | Aprovado: 5 min 02 s, números certos, editor ok; relatório barrado pelo filtro | `574dec5` — vírgula decimal, avisos de formato e de número não impresso, constante física, protocolo |
| [10](./Teste%2010/SESSAO.md) | 2026-10-10 | `b266a1e` | Opus 5.5, esforço médio | Ajuste de cinética a dados (`curve_fit`): mecanismo explicado e figura no programa | Aprovado: 5 min 09 s, nenhum achado na lição | `ca6a63a` — `conferir.py` aceita dados do programa e contas à vista, refazendo a conta |
| [11](./Teste%2011/SESSAO.md) | 2026-10-10 | `6503118` | Opus 5.5, esforço médio | Template só com padrões, num problema de valor de contorno (`solve_bvp`) | Aprovado: 4 min 09 s, números exatos, regras novas cumpridas | `547a34d` — nome curto da técnica, "como" em lista |
| [12](./Teste%2012/SESSAO.md) | 2026-10-11 | `440c1f7` | Opus 5.5, esforço médio | Otimização (`minimize_scalar`), enunciado em quadro, sem caixas de erro | Aprovado sem ressalvas: 4 min 11 s, números exatos. Paralelo com Sonnet 5.5 (esforço médio): 4 min 56 s, números exatos, regras cumpridas; resposta final longa. Paralelo com Haiku 5.5: 4 min 29 s, números certos, mas a resposta não responde a uma pergunta | `91fe9cd` — resposta completa, pasta padrão, resposta curta ao aluno |
| [13](./Teste%2013/SESSAO.md) | 2026-10-11 | `91fe9cd` | Opus, Sonnet e Haiku 5.5, esforço médio | Conta direta (ε-NTU) nos três modelos: as correções do Teste 12 pegaram? | Aprovado nos três: números exatos, resposta completa e pasta padrão. Opus 5 min 16 s, fluxo completo, mas busca de raiz onde havia fórmula; Sonnet 6 min 05 s e Haiku 3 min 13 s, resposta longa no chat; Haiku sem conferência no navegador | {a preencher} |
| [14](./Teste%2014/SESSAO.md) | 2026-10-11 | `6997737` | Opus 5.5, esforço médio | A skill em inglês, com enunciado em inglês e em português (perda de carga, Colebrook) | Aprovado nos dois idiomas: cada lição inteira no idioma do enunciado, números certos, fluxo completo, cerca de 5 min cada. Erro na lição em português: curvas chamadas pela cor, uma delas errada | `01a700b` — curva pelo nome da legenda, contas com expoente, nome curto do balanço; `a9da9d4` — saída do editor que sumia |

## Como usar

- Uma linha por teste, na ordem em que foram rodados.
- **Commit da skill** é o que torna a comparação possível: dois testes com vereditos diferentes só dizem alguma coisa se der para ver que a definição mudou no meio.
- **Correções que saíram** fecha o ciclo: teste que não gerou correção nem confirmação explícita foi teste desperdiçado.
- O detalhe fica em `Teste N/SESSAO.md`; esta tabela é só o índice.
