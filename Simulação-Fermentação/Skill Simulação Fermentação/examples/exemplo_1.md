# Exemplo 1 — Primeira sessão: chega um exercício e nada mais

O caso mais comum de todos. O workspace não existe, `MISSION.md` está em branco, `./learning-records/` está vazio, e o aluno mandou um enunciado sem dizer mais nada.

## O que o aluno manda

> "Um microrganismo cresce em batelada sobre glicose, com cinética de Monod. Dados: μmax = 0,4 h⁻¹, Ks = 1,0 g/L, Yx/s = 0,5 gX/gS, X0 = 0,1 g/L, S0 = 20 g/L. (a) Escreva o sistema de EDOs. (b) Simule 24 h e apresente os perfis de X e S. (c) Discuta o instante em que o substrato se esgota."

## O que NÃO fazer

**Entrevistar.** Nada de "qual é o seu objetivo com isso?", "é para uma disciplina?", "até onde você chegou?". Ele chegou com um problema na mão e paciência curta; o questionário gasta exatamente a motivação que o enunciado criou.

**Perguntar onde salvar.** Também não. Use `./aula-fermentacao/`, e avise depois.

**Resolver.** O enunciado pede (a), (b) e (c). Entregar os três é o modo de falha da skill.

## O que fazer

### 1. Montar o workspace, em silêncio

Não existe `./aula-fermentacao/`: crie. Copie `assets/`, `reference/`, `MISSION.md`, `RESOURCES.md`, `GLOSSARY.md`, `NOTES.md`; crie `lessons/` e `learning-records/`. Nada disso vira conversa.

### 2. Diagnosticar o enunciado

- **Regime:** batelada. **Variáveis:** X, S. **Parâmetros:** todos dados — nenhuma suposição necessária.
- **Degrau exigido:** 3 (acoplamento de substrato), com 5 (integração) por tabela.
- **Pré-requisitos:** `./learning-records/` está vazio. Sem evidência de nada — mas isso não autoriza voltar ao degrau 0: o enunciado é o piso, e ele já pressupõe Monod dado.
- **Hipóteses escondidas:** rendimento constante, volume constante, um só substrato limitante, sem lag, sem morte celular.

### 3. Inferir a missão

Os sinais estão todos no enunciado: "escreva o sistema", "discuta o instante" e um organismo genérico com números redondos. Isso é lista de disciplina, não processo real.

**`MISSION.md`:**

```md
# Missão: Simulação de Fermentação

> Inferida dos exercícios trazidos pelo aluno. Não foi confirmada com ele.

## Por que
Cursar uma disciplina de engenharia bioquímica em que se cobra montar o modelo e
simular — o enunciado pede a dedução e a discussão, não só o gráfico.
*(inferido em 30/08, do primeiro exercício: batelada com Monod, organismo genérico,
linguagem de prova. Confiança baixa: é a única evidência até agora.)*

## Sucesso é
- Escrever o sistema de EDOs de uma batelada com Monod sem consultar
- Justificar sinal e fator de rendimento em dS/dt
- Rodar a simulação e explicar o formato da curva, não só produzi-la

## Restrições
- Régua provavelmente escrita: o enunciado cobra dedução e discussão
- Ambiente Python desconhecido — nada indicado ainda

## Fora de escopo
- Scale-up, CFD, modelagem estruturada, controle avançado
```

Nada aqui foi perguntado. Se estiver errado, o próximo exercício corrige.

### 4. Apostar no travamento

Ele mandou o enunciado inteiro e nenhuma tentativa. Pela tabela de [templates/resposta.md](../templates/resposta.md), a aposta é "não sabe por onde começar" — mas o enunciado dá os parâmetros de mão beijada e pede a dedução do sistema, então o travamento provável é mais específico: **o acoplamento de `dS/dt` ao crescimento**, com o sinal e o fator de rendimento. É o erro mais frequente do catálogo de `rules.md` para este tipo de enunciado.

Aposta declarada na lição, em uma linha:

> "Aposto que o `dX/dt = μX` você escreve de olhos fechados, e que o problema é o `dS/dt` — o sinal e o que fazer com Yx/s. Se eu errei, vá direto para *Sua vez*."

### 5. Produzir a lição

`lessons/sinal-e-rendimento-em-dsdt.html`, a partir de `templates/licao.html`:

- **Gancho** — o item (a) do exercício dele, nomeado.
- **Recuperação** — não há lição anterior: cobre um pré-requisito do próprio enunciado, de memória. "Qual é a unidade de μ, e por que ela não é g L⁻¹ h⁻¹?"
- **Conhecimento** — só o acoplamento: o que Yx/s é (gX/gS) e por que aparece dividindo. Uma ideia.
- **Modelo à vista** — o sistema com cada termo anotado, mais a seção "o que este modelo finge que não existe", com as cinco hipóteses.
- **Prática** — "conserte o código quebrado", com **um** defeito: `dS/dt` multiplicando por Yx/s em vez de dividir. Forma certa, magnitude errada — o defeito que não se denuncia sozinho no gráfico.
- **Escada** — três degraus: (1) "some as unidades dos dois lados de `dS/dt`, fecha?"; (2) "quanto S some para produzir 1 g/L de X, com Yx/s = 0,5?"; (3) o balanço fechado.
- **Verificação** — duas perguntas, uma numérica (quanto S é consumido até X dobrar) e uma de escolha com distratores do catálogo.
- **Fonte primária** — de `RESOURCES.md`, com o que procurar.
- **Fecho** — link para `reference/equacoes.html` e o lembrete de perguntar.

Registrar em `lessons/INDEX.md`:

```md
| 2026-08-30 | [sinal-e-rendimento-em-dsdt.html](./sinal-e-rendimento-em-dsdt.html) | 3 | Acoplar dS/dt ao crescimento, com sinal e rendimento certos |
```

Abrir para ele:

```bash
start "" "aula-fermentacao/lessons/sinal-e-rendimento-em-dsdt.html"
```

### 6. Falar pouco

Três linhas no chat, e só:

> "Abri sua primeira lição — ela cobre o item (a) do seu exercício, que é onde o resto trava.
> Escrevi em `./aula-fermentacao/`; se preferir outro lugar, digo e eu movo.
> Apostei que o seu problema é o `dS/dt`, não o `dX/dt`. Se eu errei o alvo, me fala que eu remonto."

O item (b) e o (c) não foram entregues. Eles vêm depois que ele fechar o (a) — e boa parte deles ele já vai conseguir sozinho.

## O que fica registrado

| Arquivo | O que foi escrito |
|---|---|
| `MISSION.md` | missão inferida, marcada como inferência de confiança baixa |
| `lessons/sinal-e-rendimento-em-dsdt.html` | a lição |
| `lessons/INDEX.md` | a primeira linha da tabela |
| `learning-records/` | **nada ainda** |

O registro vazio é o ponto. Não houve evidência de aprendizado nenhuma: o aluno ainda não fez nada. Escrever "aluno viu acoplamento de substrato" seria registrar cobertura, que é exatamente o que a skill proíbe. O primeiro registro vem quando ele voltar tendo acertado — ou errado — a prática.

## O contraste com a versão antiga da skill

| Com entrevista | Sem entrevista |
|---|---|
| Primeira resposta: 5 perguntas | Primeira resposta: uma lição aberta no navegador |
| Missão declarada pelo aluno | Missão inferida e marcada como hipótese |
| Sessão podia acabar sem lição | Sessão acaba com lição |
| Diagnóstico por confissão | Diagnóstico por aposta, declarada e corrigível |

O que **não** mudou: nenhum dos três itens do exercício foi entregue pronto.
