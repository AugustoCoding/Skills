# Teste 14 — a skill em inglês, com enunciado em inglês e em português

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 14 |
| Data | 2026-10-11 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | A skill traduzida para o inglês: a lição sai inteira no idioma do enunciado (texto, `lang`, separador decimal, rótulos fixos)? O fluxo com os scripts novos (`new_lesson.py`, `check.py`, `pack.py`) funciona? Uma área nova (mecânica dos fluidos, raiz dentro de raiz). |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `6997737` — Skill inteira em ingles, com nomes, classes e API traduzidos |
| Branch | `traducao-ingles` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 13

- `5dceb9d`: título longo no sumário quebra em linhas.
- `0f9f6c8`: rótulos fixos dos assets em português e inglês, pelo `lang`.
- `6997737`: a skill inteira em inglês, com arquivos, classes e API das figuras renomeados; a lição no idioma do enunciado; o `check.py` escolhe o separador decimal pelo `lang`; pasta padrão `lessons/`; regra nova: com fórmula fechada, ela é a técnica.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, uma sessão nova por idioma, iniciada à mão |
| Modelo | `claude-opus-5-5` |
| Esforço | médio (o padrão do Opus 5.5 no Claude Code) |

| Idioma | Diretório de trabalho (vazio, fora do repositório) | Saída no teste |
|---|---|---|
| inglês | `~\testes-lesson-generator\teste-14-en` | `com-skill-en/` |
| português | `~\testes-lesson-generator\teste-14-pt` | `com-skill-pt/` |

## 4. Entrada

### Prompt exato (turno 1)

**Inglês:**

```text
/lesson-generator Water at 20 °C (density 998 kg/m³, viscosity 1.002 mPa·s) flows at 5 L/s through 100 m of commercial steel pipe with an internal diameter of 50 mm and an absolute roughness of 0.045 mm. Calculate the Darcy friction factor and the pressure drop along the pipe. What flow rate would give a pressure drop of 50 kPa?
```

**Português:**

```text
/lesson-generator Água a 20 °C (densidade 998 kg/m³, viscosidade 1,002 mPa·s) escoa a 5 L/s por 100 m de tubo de aço comercial com diâmetro interno de 50 mm e rugosidade absoluta de 0,045 mm. Calcule o fator de atrito de Darcy e a perda de pressão ao longo do tubo. Que vazão daria uma perda de pressão de 50 kPa?
```

### Cronômetro

| Idioma | Início | Fim do turno 1 | Duração |
|---|---|---|---|
| inglês | | | |
| português | | | |

## 5. Saída

## 6. Avaliação

### Comparação entre os dois idiomas

| | Inglês | Português |
|---|---|---|
| Duração | | |
| Números | | |
| Resposta responde às duas perguntas | | |
| Pasta padrão (`lessons/`) | | |
| Idioma da lição inteira, `lang` e separador decimal | | |
| Rótulos fixos no idioma | | |
| Resposta no chat em até duas linhas, no idioma | | |
| Problemas do `check.py` na entrega | | |
| Técnica e verificação | | |
| Desvios de regra | | |

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|

## 8. Veredito

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
