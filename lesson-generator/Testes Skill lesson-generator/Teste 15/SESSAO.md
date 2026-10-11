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
| 23:16:36 | 23:21:06 | cerca de 4 min 30 s |

O início é a criação da sessão, um pouco antes do prompt.

## 5. Saída

| Arquivo entregue (em `lessons/`, a pasta padrão) | Tamanho |
|---|---|
| `destilacao-diferencial-de-benzeno-e-tolueno.html` | 133 KB |

Copiada para [com-skill/](./com-skill/). O programa completo, levado ao editor da própria lição e rodado no navegador, imprime os números do gabarito e desenha a figura; a saída aparece, com a divisão no meio da tela.

## 6. Avaliação

| Critério | Resultado |
|---|---|
| Números | certos: W = 24,80 mol, D = 75,20 mol, x̄D = 0,599; para 0,70, xW = 0,465, W = 84,96 mol, D = 15,04 mol |
| Resposta responde às três perguntas | sim, com os valores impressos pelo programa |
| Técnica | fórmula fechada de Rayleigh para a primeira pergunta ("uma conta direta nas fórmulas acima"); busca de raiz (`brentq`) para a segunda, que não se isola. O quadro nomeia a busca de raiz, o único método numérico, e diz que a primeira resposta é conta direta |
| Verificação | a integral de Rayleigh por `quad` dá o mesmo W = 24,80 mol |
| Dedução | três balanços (global, benzeno no refervedor, benzeno na operação inteira) e o equilíbrio em bloco próprio; nomes curtos no sumário ("Massa global no refervedor") |
| Idioma | inteira em português, `pt-BR`, vírgula decimal no texto, rótulos fixos em português ("Pronto em 1,9 s") |
| Curvas | chamadas pelo nome da legenda ("as mols no refervedor", "a fração média no destilado"), nenhuma pela cor |
| Observações | três de leitura e uma de controle (α), todas com números deste exercício; a de controle confere (α = 3,0: 31,25 mol, 0,636, primeiro vapor 0,750, parada em 0,365) |
| `check.py` na entrega | nenhum erro nem aviso |
| Fluxo | pasta padrão, conferência no navegador, resposta de duas linhas em português |
| Passos / observações / controles | 6 / 4 / α |
| Linha de código mais longa | 67 caracteres |

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | Nenhum erro. As correções do Teste 14 pegaram: curvas pelo nome, saída do editor, nome curto do balanço | Confirmação | — |

## 8. Veredito

**Aprovado sem ressalvas.** Números exatos, as três perguntas respondidas com o que o programa imprime, a fórmula fechada usada onde ela existe e a busca de raiz onde não, verificação independente, lição inteira em português e nenhum aviso do `check.py`. É o critério combinado para o merge da `traducao-ingles` na main: o Opus sem erros.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
