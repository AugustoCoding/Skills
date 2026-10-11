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
| inglês | 21:52:52 | 21:57:50 | cerca de 4 min 58 s |
| português | 21:53:25 | 21:58:49 | cerca de 5 min 24 s |

O início é a criação da sessão, um pouco antes do prompt; as duas rodaram ao mesmo tempo.

## 5. Saída

| Idioma | Arquivo entregue (em `lessons/`, a pasta padrão) | Tamanho |
|---|---|---|
| inglês | `pipe-friction-factor-and-pressure-drop.html` | 130 KB |
| português | `perda-de-carga-em-tubo-de-aco.html` | 130 KB |

Copiadas para [com-skill-en/](./com-skill-en/) e [com-skill-pt/](./com-skill-pt/). Nas duas, o programa completo foi levado ao editor da própria lição e rodado no navegador: imprime os números do gabarito e desenha a figura.

## 6. Avaliação

### Comparação entre os dois idiomas

| | Inglês | Português |
|---|---|---|
| Duração | cerca de 5 min | cerca de 5 min 24 s |
| Números | exatos (f = 0.02135; 138.2 kPa; 2.926 L/s) | certos, com três algarismos (f = 0,0214; 138,2 kPa; 2,93 L/s) |
| Resposta responde às duas perguntas | sim | sim |
| Pasta padrão (`lessons/`) | sim | sim |
| Idioma da lição inteira, `lang` e separador decimal | sim: `en`, ponto | sim: `pt-BR`, vírgula no texto; o programa imprime com ponto, como todo Python |
| Rótulos fixos no idioma | sim ("The problem", "Done in 4.4 s") | sim ("O exercício", "Pronto em 4,8 s", "claro") |
| Resposta no chat em até duas linhas, no idioma | sim | sim |
| Problemas do `check.py` na entrega | um aviso falso: conta à vista com expoente (1.709² = 2.92) | nenhum |
| Técnica e verificação | busca de raiz (`brentq`), duas vezes; Swamee-Jain e a perda recalculada na vazão achada | busca de raiz (`brentq`), duas vezes; Swamee-Jain e a vazão por fórmula explícita |
| Passos / observações / controles | 6 / 5 / ε e D | 5 / 5 / ε e D |
| Linha de código mais longa | 71 caracteres | 64 |
| Desvios de regra | nenhum | duas observações chamam curvas pela cor ("curva azul", "curva laranja"), e a laranja é rosa |

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | Na lição em português, duas observações chamam curvas pela cor: "Por que a curva laranja desce…" e "Onde a curva azul cruza…". A segunda série é rosa, não laranja, e o nome certo é o da legenda | Média: o aluno procura uma curva que não existe | SKILL.md, 4.4; `check.py` |
| 2 | O `check.py` acusou uma conta à vista certa, "1.709² = 2.92": não entendia expoente, nem que 1.709 tinha acabado de sair de outra conta verificada | Baixa: aviso falso, o modelo o avaliou e entregou | `check.py` |
| 3 | Um balanço com título fora do padrão ("…, por unidade de massa (J/kg)") aparece inteiro na cabeça da etapa e no sumário, porque o `lesson.js` só cortava ", em …" | Baixa: título longo | `lesson.js` |
| 4 | A skill em inglês funcionou nos dois idiomas: cada lição saiu inteira no idioma do enunciado, com `lang`, separador decimal, rótulos fixos e resposta no chat coerentes, e os dois modelos seguiram o fluxo inteiro (pasta padrão, conferência no navegador, duas linhas) | Confirmação | — |

## 8. Veredito

**Aprovado nos dois idiomas, com um erro de conteúdo na lição em português.** A tradução da skill funcionou: o Opus leu as instruções em inglês e escreveu cada lição inteira no idioma do enunciado, com os números do gabarito, a pasta padrão, a conferência no navegador e a resposta curta. O erro foi chamar curvas pela cor, e uma delas pela cor errada; como o objetivo é o Opus sem erros, a correção vai para a skill e o próximo teste confere.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| {a preencher} | Curva chamada pelo nome da legenda, nunca pela cor (regra e aviso no `check.py`); conta à vista com expoente e com resultado de conta anterior; nome do balanço cortado na primeira vírgula |
