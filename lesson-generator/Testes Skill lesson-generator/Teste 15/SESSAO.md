# Teste 15 — destilação em batelada: o Opus sem erros?

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 15 |
| Data | 2026-10-11 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | Confirmar as correções do Teste 14 (curvas pelo nome da legenda, saída do editor, fonte menor) e a regra da fórmula fechada como técnica, numa lição em português. Critério para o merge na main: o Opus sem erros. |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `ae7e1c7` — Fonte base da licao de 19 para 17 px |
| Branch | `traducao-ingles` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 14

- `01a700b`: curva chamada pelo nome da legenda, nunca pela cor (regra e aviso no `check.py`); contas à vista com expoente; nome do balanço cortado na primeira vírgula.
- `a9da9d4`: a saída do editor nunca some (divisão guardada como fração, altura mínima da saída).
- `fcf428b`: a divisão entre código e saída abre no meio da altura da tela.
- `ae7e1c7`: fonte base de 19 para 17 px.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, sessão nova iniciada à mão |
| Modelo | `claude-opus-5-5` |
| Esforço | médio (o padrão do Opus 5.5 no Claude Code) |
| Diretório de trabalho | `~\testes-lesson-generator\teste-15`, pasta vazia fora do repositório |

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator Uma mistura de 100 mol de benzeno e tolueno, com fração molar de benzeno de 0,50, é destilada em batelada num refervedor simples (um único estágio de equilíbrio), com volatilidade relativa constante de 2,5. A destilação é interrompida quando a fração de benzeno no refervedor cai para 0,20. Quantos mols restam no refervedor e qual é a fração média de benzeno no destilado coletado? Em que fração de benzeno no refervedor seria preciso parar para que o destilado médio tivesse 0,70 de benzeno?
```

### Cronômetro

| Início | Fim do turno 1 | Duração |
|---|---|---|
| | | |

## 5. Saída

## 6. Avaliação

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|

## 8. Veredito

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
