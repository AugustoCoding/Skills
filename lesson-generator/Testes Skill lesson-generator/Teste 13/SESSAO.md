# Teste 13 — trocador de calor com o Haiku 5.5: as correções do Teste 12 pegaram?

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 13 |
| Data | 2026-10-11 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | Com o Haiku 5.5, o modelo que mostrou os desvios do Teste 12, as três correções de `91fe9cd` pegaram (resposta completa, pasta padrão, resposta curta no chat)? E num problema de conta direta, sem método numérico obrigatório, o quadro da técnica se adapta? |

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
| Cliente | Claude Code desktop, sessão nova iniciada à mão |
| Modelo | `claude-haiku-5-5` |
| Esforço | médio (o padrão do Haiku 5.5 no Claude Code) |
| Diretório de trabalho | `~\testes-lesson-generator\teste-13`, pasta vazia fora do repositório |

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator Num trocador de calor de tubo duplo em contracorrente, 0,50 kg/s de água quente entram a 90 °C e aquecem 0,80 kg/s de água fria que entram a 20 °C. O calor específico das duas correntes é 4,18 kJ/(kg·K), o coeficiente global de troca é 1,2 kW/(m²·K) e a área de troca é 6,0 m². Calcule a taxa de calor trocado e as temperaturas de saída das duas correntes. Que área seria necessária para a água quente sair a 50 °C?
```

### Cronômetro

| | Horário |
|---|---|
| Início | |
| Fim do turno 1 | |
| **Duração** | |

## 5. Saída

## 6. Avaliação

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|

## 8. Veredito

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
