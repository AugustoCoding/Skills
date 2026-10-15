# Teste 16 — reator tubular adiabático, no Opus e no Codex

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 16 |
| Data | 2026-10-15 |
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
| Opus | | | |
| Codex | | | |

## 5. Saída

## 6. Avaliação

### Comparação

| | Opus 5.5 | gpt-6-luna |
|---|---|---|
| Duração | | |
| Números | | |
| Resposta responde às três perguntas | | |
| Pasta padrão (`lessons/`) | | |
| Técnica | | |
| Verificação independente | | |
| Formatos de impressão explicados | | |
| Idioma | | |
| Problemas do `check.py` na entrega | | |
| Desvios de regra | | |

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|

## 8. Veredito

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
