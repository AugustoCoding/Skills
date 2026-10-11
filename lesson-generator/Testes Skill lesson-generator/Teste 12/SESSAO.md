# Teste 12 — otimização, com o enunciado na abertura e sem caixas de erro

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 12 |
| Data | 2026-10-11 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | Num problema de otimização, a skill produz a lição certa e rápida? O quadro do enunciado, o nome curto da técnica, o "como" em lista e a ausência das caixas de erro funcionam como previsto? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `440c1f7` — Enunciado no comeco da licao, editor em dois blocos e sem caixas opcionais |
| Branch | `skill-geral` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 11

- `547a34d`: nome da técnica com até quatro palavras (aviso no `conferir.py`); o "como" pode ser uma lista (`ul.como`), e um passo pesado pode virar dois.
- `440c1f7`: a abertura começa pelo enunciado (`div.enunciado`, exigido pelo `conferir.py`); saem as caixas "o erro que parece certo" e "como saber que está certo" (recusadas pelo `conferir.py`); o editor em dois blocos.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, sessão nova iniciada à mão |
| Modelo | `claude-opus-5-5` |
| Esforço | médio |
| Diretório de trabalho | `~\testes-lesson-generator\teste-12`, pasta vazia fora do repositório |

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator A reação reversível e exotérmica A ⇌ B, de primeira ordem nos dois sentidos, é conduzida em fase líquida num CSTR com tempo de residência de 10 min, alimentado só com A. A 350 K, a constante de velocidade direta vale 0,050 min⁻¹ e a constante de equilíbrio vale 20. A energia de ativação da reação direta é 60 kJ/mol, e o calor de reação é −80 kJ/mol, ambos constantes. Em que temperatura o reator deve operar para a conversão de A ser máxima, e qual é essa conversão? Como muda a temperatura ótima se o tempo de residência dobrar?
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
