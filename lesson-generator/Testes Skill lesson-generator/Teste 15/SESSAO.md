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
| `fc03748` | Da execução no Codex (seção 10): pasta temporária do `check.py` ao lado da lição; aviso de formato de impressão não explicado; rótulo de tipo sem pontuação; entrega obrigatória e verificação que não reusa a própria relação |

## 10. Execução paralela: Codex

O Augusto instalou a skill no Codex (cópia idêntica à da branch, `ae7e1c7`) e rodou o mesmo prompt, na subpasta `teste-15\Luna 6 medium`. Avaliação pelo registro da sessão do Codex (`~\.codex\sessions`) e pela lição.

| Campo | Valor |
|---|---|
| Cliente | Codex Desktop, `cli_version` 0.162.0-alpha.17.2 |
| Modelo | `gpt-6-luna`, esforço médio |
| Chamada | `$lesson-generator` com o enunciado |

### Duas execuções

| Execução | Início | Fim | Resultado |
|---|---|---|---|
| 1 | 20:36:32 | 20:37:21 | **Não entregou.** Leu a skill, o template e as peças, fez as contas certas (24,80 mol; 0,599; 0,4646) e parou, respondendo só com os números. Perguntado, admitiu: "Não houve bloqueio técnico — foi um erro meu." |
| 2 | 20:40:13 | 20:42:15 | **Entregou em cerca de 2 min.** Rascunho com `new_lesson.py`, a lição inteira escrita de uma vez, `check.py` (um erro de argumento não explicado, corrigido), `pack.py`. Sem navegador, não fez a conferência visual, o que a skill permite |

### O ambiente do Codex

O `check.py` falhou na primeira tentativa: ele rodava os passos numa pasta temporária do sistema, e o sandbox do Codex só deixa escrever na pasta de trabalho. O modelo contornou sozinho (`$env:TEMP` apontado para a pasta de trabalho).

### A lição da execução 2

Copiada para [com-skill-codex/](./com-skill-codex/).

| Critério | Resultado |
|---|---|
| Números | certos: 24,803 mol; 0,598953; parar em 0,464585 (casas demais: seis decimais na resposta) |
| Idioma | inteira em português, `pt-BR`, vírgula decimal |
| Tamanho | 1.573 palavras, contra 3.439 da lição do Opus; 3 passos e o programa completo, contra 6 |
| Dedução | três balanços e o equilíbrio em bloco; o resultado integrado de Rayleigh aparece numa etapa marcada como "hipótese", e o bloco do equilíbrio vem depois da etapa que o usa |
| Técnica | fórmula fechada para a primeira pergunta e busca de raiz para a segunda, como a regra pede |
| Verificação | **circular**: recalcula W·x + D·x̄ com o x̄ que saiu dessa mesma conta, e dá 50 mol sempre. Nenhuma conferência independente (a do Opus foi a integral numérica) |
| Explicação do código | rasa: o passo 2 tem `def`, `brentq` e seis `print` com formatos `.2f`, `.3f` e `.6f`, e o "como" explica só o `brentq` |
| Rótulos de tipo | escritos com ponto ("Princípio."), e a etapa aparece como "Princípio. do balanço…" |
| Figura | uma curva (fração média no destilado) com os dois pontos de parada; sem controles e com duas observações, o mínimo |
| Resposta no chat | três linhas em português |
| `check.py` na entrega | nenhum erro nem aviso (os avisos novos de `fc03748` acusariam os formatos) |

### Veredito da execução no Codex

**Funciona, mas com uma lição mais pobre.** A skill roda no Codex sem adaptação, e a segunda execução entregou a lição certa em metade do tempo do Opus. A primeira desistiu antes de escrever a lição, a verificação é circular e a explicação do código é rasa. O que dava para garantir por script entrou em `fc03748`; o resto (verificação independente, profundidade da explicação) é julgamento do modelo e ficou como regra no SKILL.md.

