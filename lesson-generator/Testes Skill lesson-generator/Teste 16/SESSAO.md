# Teste 16 — reator tubular adiabático, no Opus e no Codex

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 16 |
| Data | montado em 2026-10-15; rodado em 2026-11-09 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | Confirmar as correções de `fc03748` (vindas da execução no Codex do Teste 15) no Opus e no Codex, com o mesmo prompt em inglês, num problema com balanço de massa e de energia. |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `fc03748` — Skill no Codex: pasta temporaria local, formatos de impressao e entrega obrigatoria |
| Branch | `traducao-ingles` (igual à main, `a94d6fc`) |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* nos dois: `~/.claude/skills/lesson-generator` e `~/.codex/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 15

- `fc03748`: `check.py` com a pasta temporária ao lado da lição e o aviso de formato de impressão não explicado; `lesson.js` tira a pontuação final dos rótulos de tipo; `SKILL.md`: a tarefa só termina com o `pack.py`, e a verificação não pode reaproveitar a relação que produziu o resultado.

## 3. Ambiente

| Agente | Modelo | Esforço | Diretório de trabalho (vazio, fora do repositório) | Saída no teste |
|---|---|---|---|---|
| Claude Code desktop | `claude-opus-5-5` | médio | `~\testes-lesson-generator\teste-16-opus` | `com-skill-opus/` |
| Codex Desktop | `gpt-6-luna` | médio | `~\testes-lesson-generator\teste-16-codex` | `com-skill-codex/` |

## 4. Entrada

### Prompt exato (turno 1)

No Claude Code, com `/lesson-generator`; no Codex, com `$lesson-generator`. O enunciado é o mesmo:

```text
/lesson-generator A liquid-phase, first-order, irreversible reaction A → B runs in an adiabatic tubular reactor (PFR). The feed enters at 10 L/min, with 2.0 mol/L of A, at 300 K. The rate constant is 0.05 min⁻¹ at 300 K and the activation energy is 60 kJ/mol. The heat of reaction is −50 kJ/mol, and the volumetric heat capacity of the liquid is 4.0 kJ/(L·K), both constant. What reactor volume is needed for 80% conversion, and at what temperature does the stream leave? What volume would an isothermal reactor at 300 K need for the same conversion?
```

### Cronômetro

| Agente | Início | Fim do turno 1 | Duração |
|---|---|---|---|
| Opus | 09:03:54 | 09:11:38 | cerca de 7 min 44 s |
| Codex | 09:03:44 | 09:07:33 | cerca de 3 min 50 s |

O início do Opus é a criação da sessão, um pouco antes do prompt; as duas rodaram ao mesmo tempo.

**Diferença no prompt do Codex:** o projeto selecionado no Codex continuava sendo o "Skillzona", que aponta para a pasta do Teste 15. O Augusto acrescentou ao fim do prompt "Faça na pasta ~\testes-lesson-generator\teste-16-codex". O Codex passou essa pasta ao `new_lesson.py`, como a skill manda quando o aluno indica uma pasta, e a lição saiu direto nela (sem `lessons/`). Para escrever lá, fora da pasta do projeto, ele pediu permissão a cada comando, e o revisor automático do Codex aprovou.

## 5. Saída

| Agente | Arquivo entregue | Tamanho |
|---|---|---|
| Opus | `teste-16-opus\lessons\adiabatic-pfr-first-order.html` | 137 KB |
| Codex | `teste-16-codex\adiabatic-pfr.html` | 112 KB |

Copiadas para [com-skill-opus/](./com-skill-opus/) e [com-skill-codex/](./com-skill-codex/). Nas duas, o programa completo, levado ao editor da própria lição e rodado no navegador, imprime os números do gabarito e desenha a figura.

## 6. Avaliação

### Comparação

| | Opus 5.5 | gpt-6-luna |
|---|---|---|
| Duração | cerca de 7 min 44 s | cerca de 3 min 50 s |
| Números | certos: 135,6 L; 320,0 K; 321,9 L (2,37 vezes) | certos: 135,55 L; 320,00 K; 321,89 L |
| Resposta responde às três perguntas | sim | sim |
| Pasta | padrão (`lessons/`) | a indicada no prompt, como a skill manda |
| Técnica | integração numérica (`solve_ivp` com evento em X = 0,8); o isotérmico pela fórmula fechada | integração numérica (`solve_ivp`); o isotérmico pela fórmula fechada; o quadro não tem a frase "to solve this kind of problem, we will use" |
| Verificação independente | duas: a reta adiabática (T₀ + ΔT_ad·X) e o volume por `quad`, contra o `solve_ivp` | **nenhuma**: o volume isotérmico é "calculado independentemente", mas não confere o adiabático |
| Formatos de impressão explicados | sim | não (`.2f`) |
| Argumentos explicados | todos | `events=`, `dense_output=`, `label=`, `color=` e `linestyle=` sem explicação |
| Passos colados = programa completo | sim | **não**: os passos têm um `brentq` importado e não usado, e os dados escritos de outro jeito |
| Idioma | inteira em inglês, `en` | inteira em inglês, `en` |
| Observações / controles | 3 de leitura e 2 de controle (T₀ e C_A0), todas conferidas (T₀ = 310 K: 65,5 L e 330,0 K; C_A0 = 1,0: 201,8 L e 310,0 K) | 2 de leitura, nenhum controle |
| Tamanho | 4.102 palavras, 6 passos | 1.233 palavras, 3 passos |
| `check.py` na entrega | nenhum erro nem aviso | **6 ERROs e 1 aviso**: entregue assim |
| Fluxo | conferência no navegador, resposta de duas linhas | sem navegador; resposta de três linhas, que avisa dos erros |
| Desvios de regra | nenhum | empacotou com ERROs; verificação ausente; explicação incompleta |

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | Opus sem erros: números, duas verificações independentes, todos os argumentos e formatos explicados, observações de controle conferidas. As correções de `fc03748` não pioraram nada | Confirmação | — |
| 2 | O Codex rodou o `check.py`, viu 6 ERROs, tentou corrigir com um comando que falhou por aspas no PowerShell e rodou o `pack.py` mesmo assim. A skill diz que todo ERRO deve ser corrigido, mas nada impedia a entrega | Alta: a lição saiu com o programa dos passos diferente do completo | `pack.py` |
| 3 | A lição do Codex não tem verificação do resultado principal e explica pouco o código, os mesmos problemas do Teste 15. São julgamento do modelo; a regra já está no SKILL.md | Média | — |
| 4 | No Codex, a pasta de trabalho é a do projeto selecionado; o projeto "Skillzona" ainda apontava para o Teste 15. Indicar a pasta no prompt funcionou, com pedidos de permissão a cada comando | Ambiente | — |

## 8. Veredito

**Opus aprovado sem ressalvas; Codex reprovado.** O Opus entregou uma lição completa e certa, com o fluxo inteiro. O Codex acertou os números em metade do tempo, mas entregou com 6 ERROs do `check.py`, sem verificação e com explicação rasa. O que dava para garantir por script entrou em `29c477a`: o `pack.py` agora roda o `check.py` e se recusa a entregar com ERRO.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `29c477a` | O `pack.py` roda o `check.py` antes e se recusa a empacotar um rascunho com ERRO |
