# Histórico de testes

Uma linha por execução. É daqui que se lê a evolução da skill: o que foi testado, com qual versão, e o que mudou por causa disso.

| Teste | Data | Commit da skill | Modelo | Foco | Veredito | Correções que saíram |
|---|---|---|---|---|---|---|
| [1](./Teste%201/SESSAO.md) | 2026-08-30 | `a2285bd` | Opus 5, esforço médio | Primeira execução do fluxo sem entrevista | Aprovado, 2 achados | `a52f83f` — regra da lacuna, varredura de procedência, links fora do workspace |
| [2](./Teste%202/SESSAO.md) | 2026-08-30 | `644d79b` | Opus 5, esforço médio | A lição reescrita em torno do código, com enunciado corrido | Interrompido: 15+ min | `f756788` — skill enxugada, sem estado, três divisões |
| [3](./Teste%203/SESSAO.md) | {a rodar} | `f756788` | {a preencher} | A skill enxuta: sai em menos de 5 minutos? | — | — |

## Como usar

- Uma linha por teste, na ordem em que foram rodados.
- **Commit da skill** é o que torna a comparação possível: dois testes com vereditos diferentes só dizem alguma coisa se der para ver que a definição mudou no meio.
- **Correções que saíram** fecha o ciclo: teste que não gerou correção nem confirmação explícita foi teste desperdiçado.
- O detalhe fica em `Teste N/SESSAO.md`; esta tabela é só o índice.
