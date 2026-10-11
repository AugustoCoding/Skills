# Teste 13 — trocador de calor nos três modelos: as correções do Teste 12 pegaram?

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 13 |
| Data | 2026-10-11 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | O mesmo exercício no Opus, no Sonnet e no Haiku 5.5: as três correções de `91fe9cd` pegaram nos três (resposta completa, pasta padrão, resposta curta no chat)? Num problema de conta direta, sem método numérico obrigatório, o quadro da técnica se adapta? Como os três se comparam? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `91fe9cd` — Resposta completa, pasta padrao e resposta curta ao aluno |
| Branch | `skill-geral` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 12

- `91fe9cd`: a resposta responde com número a todas as perguntas, e o programa imprime cada um (aviso no `conferir.py` se a resposta remeter a outra parte); sem pasta indicada, nenhuma pasta ao `nova_licao.py`; resposta ao aluno em duas linhas no máximo.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, uma sessão nova por modelo, iniciada à mão |
| Esforço | médio nos três (o padrão de Opus, Sonnet e Haiku 5.5 no Claude Code) |

| Modelo | Diretório de trabalho (vazio, fora do repositório) | Saída no teste |
|---|---|---|
| `claude-opus-5-5` | `~\testes-lesson-generator\teste-13-opus` | `com-skill-opus/` |
| `claude-sonnet-5-5` | `~\testes-lesson-generator\teste-13-sonnet` | `com-skill-sonnet/` |
| `claude-haiku-5-5` | `~\testes-lesson-generator\teste-13-haiku` | `com-skill-haiku/` |

## 4. Entrada

### Prompt exato (turno 1, o mesmo nos três)

```text
/lesson-generator Num trocador de calor de tubo duplo em contracorrente, 0,50 kg/s de água quente entram a 90 °C e aquecem 0,80 kg/s de água fria que entram a 20 °C. O calor específico das duas correntes é 4,18 kJ/(kg·K), o coeficiente global de troca é 1,2 kW/(m²·K) e a área de troca é 6,0 m². Calcule a taxa de calor trocado e as temperaturas de saída das duas correntes. Que área seria necessária para a água quente sair a 50 °C?
```

### Cronômetro

| Modelo | Início | Fim do turno 1 | Duração |
|---|---|---|---|
| Opus 5.5 | 01:46:09 | 01:51:26 | 5 min 16 s |
| Sonnet 5.5 | 01:46:36 | 01:52:41 | 6 min 05 s |
| Haiku 5.5 | 01:46:58 | 01:50:11 | 3 min 13 s |

As três sessões rodaram ao mesmo tempo, o que pode ter alongado um pouco cada uma.

## 5. Saída

| Modelo | Arquivo entregue (em `licoes/`, a pasta padrão) | Tamanho |
|---|---|---|
| Opus 5.5 | `trocador-de-calor-em-contracorrente.html` | 139 KB |
| Sonnet 5.5 | `trocador-de-calor-em-contracorrente.html` | 138 KB |
| Haiku 5.5 | `trocador-de-calor-contracorrente.html` | 123 KB |

Copiadas para [com-skill-opus/](./com-skill-opus/), [com-skill-sonnet/](./com-skill-sonnet/) e [com-skill-haiku/](./com-skill-haiku/). Nas três, o programa completo foi levado ao editor da própria lição e rodado no navegador: imprime os números do gabarito e desenha a figura.

## 6. Avaliação

### Comparação entre os três modelos

| | Opus 5.5 | Sonnet 5.5 | Haiku 5.5 |
|---|---|---|---|
| Duração | 5 min 16 s | 6 min 05 s | 3 min 13 s |
| Números | exatos (128,10 kW; 28,71 °C; 58,31 °C; 1,88 m²) | exatos | exatos |
| Resposta responde às três perguntas | sim | sim | sim |
| Pasta padrão (`licoes/`) | sim | sim | sim |
| Resposta no chat em até duas linhas | sim | não, cerca de oito linhas | não, longa |
| Problemas do `conferir.py` na entrega | um aviso: técnica com 115 palavras | nenhum | nenhum |
| Quadro da técnica numa conta direta | "Busca de raiz": resolve a equação da MLDT com `brentq`, embora exista fórmula fechada | "Fórmula fechada": a conta analítica, executada pelo Python | "Fórmula fechada da efetividade": ε-NTU |
| Verificação | ε-NTU, independente da busca | MLDT com as saídas calculadas, e a área conferida de volta | UA·MLDT com as saídas calculadas |
| Passos / observações / controles | 7 / 5 / U e vazão | 7 / 4 / U | 7 / 3 / U |
| Linha de código mais longa | 60 caracteres | 64 | 80 (a recomendação é até 70) |
| Saída do programa | rotulada, com unidade | rotulada, com unidade | rótulos curtos, a maioria sem unidade |
| Desvios de regra | técnica acima do tamanho | resposta longa no chat | resposta longa no chat; não abriu a lição no navegador antes de entregar |

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | A regra das duas linhas no chat não pegou no Sonnet nem no Haiku: os dois resumem a lição, a resposta e as escolhas | Baixa: não afeta a lição, só o tempo do aluno | SKILL.md, passo 8 |
| 2 | O Haiku entregou sem abrir a lição no navegador | Média: o editor funcionou, mas por sorte | SKILL.md, passo da conferência |
| 3 | O Opus escolheu busca de raiz (`brentq` na MLDT) num problema com fórmula fechada; a lição está certa e a ε-NTU entra como verificação, mas a técnica principal é a menos direta | Baixa: escolha defensável, mas contraria "analítico primeiro" | SKILL.md, técnica |
| 4 | O quadro da técnica do Opus passou de 110 palavras (aviso do `conferir.py`, não corrigido antes de entregar) | Baixa | Lição do Opus |
| 5 | O Haiku imprime rótulos curtos sem unidade (`C_q: 2.09`, `área: 1.88 m²` só no fim) e tem uma linha de 80 caracteres | Baixa: o aluno lê a saída com menos contexto | Lição do Haiku |

## 8. Veredito

**Aprovado nos três.** As correções de `91fe9cd` que dependem da forma pegaram em todos: a resposta responde às três perguntas, com o programa imprimindo cada número, e a lição sai na pasta padrão. Os números são exatos nos três, e o editor roda o programa e mostra a figura nos três.

O que ainda não pega nos modelos menores é o que depende só de julgamento: a resposta curta no chat (Sonnet e Haiku) e a conferência no navegador (Haiku). O Haiku foi o mais rápido (3 min 13 s) e o Sonnet o mais lento (6 min 05 s); o Opus é o único que cumpriu o fluxo inteiro, mas escolheu o caminho numérico onde havia fórmula.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
