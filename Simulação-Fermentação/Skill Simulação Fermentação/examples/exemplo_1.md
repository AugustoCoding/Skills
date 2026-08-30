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

`lessons/batelada-com-monod-em-python.html`, a partir de `templates/licao.html`. O nome já diz o que a lição é: o exercício inteiro, terminando em código que roda.

- **Gancho** — o exercício dele, nomeado, e o que ele vai ter no fim: o gráfico X/S rodando na máquina dele.
- **Aposta declarada** — uma linha: "aposto que `dX/dt = μX` você escreve de olhos fechados e o problema é o `dS/dt`; se não for, pule para o código."
- **Recuperação** — não há lição anterior, então esta seção não aparece.
- **Estação 1, modelo** — as três equações em MathML, cada termo anotado com unidade. Yx/s dividindo, com o porquê em duas frases. Teoria dentro das 400 palavras: nada de derivar Monod da cinética enzimática.
- **Estação 2, código** — a maior. O programa inteiro: `solve_ivp`, função de derivadas, evento para capturar o esgotamento, plotagem com eixos rotulados. Explicado na ordem em que executa — por que `solve_ivp` e não `odeint`, por que o evento em vez de ler o gráfico, o que `t_eval` faz e o que ele não faz.
- **Explorador de variantes** — `t_eval` com 300 pontos contra 12: mesma integração, saída diferente, e a transição do substrato some entre dois pontos na versão esparsa. Escolha correta contra escolha correta.
- **Estação 3, resultado** — previsão ("em quanto tempo o substrato acaba: perto de 25 h, de 15 h, ou muito antes?"), e atrás do clique os números conferidos: X final 10,1 g/L, esgotamento em ≈ 7,9 h.
- **Estação 4, crítica** — as cinco hipóteses com a consequência de cada uma, previsão sobre o efeito de dobrar μmax, e o simulador com controles de μmax e Ks.
- **Verificação** — duas perguntas: uma numérica (quanto S é consumido até X dobrar) e uma de escolha com distrator do catálogo.
- **Fecho** — uma frase. Sem leitura recomendada, sem link interno, sem promessa de continuação.

Registrar em `lessons/INDEX.md`:

```md
| 2026-08-30 | [batelada-com-monod-em-python.html](./batelada-com-monod-em-python.html) | 3–5 | Montar a batelada com Monod e programá-la, do balanço ao gráfico |
```

Abrir para ele:

```bash
start "" "aula-fermentacao/lessons/batelada-com-monod-em-python.html"
```

### 6. Falar pouco

Três linhas no chat, e só:

> "Abri sua primeira lição — ela resolve o exercício inteiro e termina com o código rodando.
> Escrevi em `./aula-fermentacao/`; se preferir outro lugar, digo e eu movo.
> Apostei que o seu problema é o `dS/dt`, não o `dX/dt`. Se eu errei o alvo, me fala que eu remonto."

Os quatro itens estão lá dentro, na ordem das estações. O que não está é a chance de ele ler tudo sem fazer nada: os números do item (c) só aparecem depois que ele registra a previsão.

## O que fica registrado

| Arquivo | O que foi escrito |
|---|---|
| `MISSION.md` | missão inferida, marcada como inferência de confiança baixa |
| `lessons/batelada-com-monod-em-python.html` | a lição, com a questão inteira |
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
