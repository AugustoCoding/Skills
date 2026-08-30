# Exemplo 3 — Sessão de retorno, sem exercício na mão

O aluno volta sem trazer enunciado nenhum. A entrada normal da skill é um exercício; quando ele não vem, você não entrevista e não improvisa um currículo — você **busca o exercício no banco de casos** e continua o mesmo fluxo.

## O que o aluno diz

> "Voltei. O que a gente vê hoje?"

## O que NÃO fazer

Perguntar o que ele quer ver, se prefere batelada ou contínuo, quanto tempo tem hoje. Isso é entrevista com outro nome, e a resposta já está no workspace.

Também não fazer: escolher o tópico mais interessante do domínio. O workspace registra um buraco específico; ele é que manda.

## 1. Orientar, em silêncio

Na ordem de `rules.md`:

**`MISSION.md`** — disciplina de engenharia bioquímica, régua escrita, inferida na primeira sessão e reforçada desde então.

**`./learning-records/`**, do mais recente para trás:

| Registro | Conteúdo |
|---|---|
| `0001` | Acertou sinal e rendimento em `dS/dt`, sem consultar |
| `0002` | Entendeu Ks: unidade e significado |
| `0003` | Rodou `solve_ivp` e leu a curva de batelada |
| `0004` | Montou os três balanços do quimiostato; separou entrada de saída |

**`lessons/INDEX.md`** — três lições, a última `quimiostato-termo-de-diluicao.html`, degrau 6.

**`NOTES.md`** — ~3 h por semana; prefere ver a matemática antes do código; prova escrita é a régua.

**`./assets/`** — `lesson.css`, `quiz.js`, `simulador.js`. Nada novo é necessário.

## 2. Achar o exercício no banco

Sem enunciado do aluno, o exercício vem de `./cases/`, na pasta da skill. `0004` diz exatamente o que falta: estado estacionário, washout, produtividade. `cases/caso_continua_crescimento.md` cobre isso e já vem recortado em três lições — **A** (o balanço, já dada), **B** (μ = D em estado estacionário), **C** (washout e produtividade).

Alvo: **lição B — μ = D**. O caso a chama de "a lição mais importante do caso", e é o próximo buraco registrado.

Não pule para a C. Washout sem o estacionário é conta sem o conceito que a sustenta.

O mapa de progressão entra aqui só como **checagem**: a lição B exige os balanços do quimiostato (`0004`, com evidência) e o acoplamento de substrato (`0001`). Pré-requisitos de pé — pode ensinar o degrau direto, sem ponte.

## 3. Fundamentar

Fonte primária de `RESOURCES.md`: Herbert, Elsworth & Telling (1956), teoria do quimiostato. Conferir o link antes de citar — a entrada ainda está marcada `[a verificar]`.

Do banco: a seção "Loop de feedback" de `cases/caso_continua_crescimento.md`, que já traz a tabela de estado estacionário conferida. O caso é matéria-prima; o modelo esperado que está nele **não** vai para a lição.

## 4. Produzir a lição

`lessons/quimiostato-mu-igual-a-d.html`, a partir de `templates/licao.html`:

- **Gancho** — "na prova, 'quanto vale μ no estacionário' vale mais que a equação inteira; e a resposta é contraintuitiva."
- **Aposta declarada** — "aposto que você vai responder μ = μmax, ou tentar calcular Monod. Quase todo mundo responde. Se você já sabe que não é isso, pule para *Sua vez*."

  Note que a aposta aqui é uma **provocação de erro**: a concepção errônea do catálogo é tão universal que vale montar a lição em cima dela.
- **Recuperação** — de memória, sem consultar: escreva `dX/dt` do quimiostato. Espaçamento sobre `0004`.
- **Conhecimento** — uma ideia: no estacionário `dX/dt = 0` com X ≠ 0, e o que sobra é μ = D. A causalidade invertida — é a bomba que impõe a taxa de crescimento — nomeada explicitamente.
- **Prática** — "preveja e depois rode", com D como único controle:

```html
<div class="simulador" data-modelo="quimiostato" data-tempo="120"
     data-params="mu_max=0.4, Ks=1.0, Yxs=0.5, Ypx=0.2, D=0.2, Sin=20, X0=0.5"
     data-controles="D" data-prever="1"></div>
```

  Previsão pedida por escrito antes do reveal: *se eu dobrar D, o que acontece com μ no estacionário — dobra, cai pela metade, ou não muda?*

- **Escada** — três degraus: (1) "escreva `dX/dt = 0` e não divida por X ainda: o que a equação diz?"; (2) "X é zero? Se não é, o que pode ser zero no produto `(μ − D)·X`?"; (3) μ = D, com a leitura física.
- **Concessão à régua** — como a prova é escrita, um item pede a **dedução** de `S* = Ks·D/(μmax − D)` no papel, a partir de μ = D. A missão manda.
- **Verificação** — duas perguntas. Uma de escolha com o distrator "μ = μmax" (o erro que a lição inteira ataca), uma numérica: dado D = 0,2 h⁻¹, μmax e Ks, calcule S*.
- **Fecho** — link para `reference/equacoes.html`, seção de estado estacionário, e a pergunta que abre a lição C: "e se D passar de μmax?"

Índice e abertura:

```md
| 2026-09-11 | [quimiostato-mu-igual-a-d.html](./quimiostato-mu-igual-a-d.html) | 6 | Deduzir μ = D no estado estacionário e ler a causalidade invertida |
```

```bash
start "" "aula-fermentacao/lessons/quimiostato-mu-igual-a-d.html"
```

## 5. Falar pouco

> "Hoje: por que, num quimiostato em regime, quem manda na taxa de crescimento é a bomba. Abri a lição.
> Apostei que sua primeira resposta seria μ = μmax — a lição foi montada em cima disso.
> Vem com dúvida depois, que eu enxerto a resposta no próprio arquivo."

## 6. Consolidar

Ele prevê que dobrar D dobra μ — acerta pelo motivo errado, achando que "mais vazão, mais crescimento". No quiz numérico, calcula S* corretamente. Volta perguntando:

> "Então se eu aumentar muito o D o μ acompanha sempre?"

Resposta no chat, nota enxertada na lição logo depois do bloco de μ = D, arquivo reaberto — e a pergunta dele é exatamente a porta da lição C.

`learning-records/0005-mu-imposto-por-d.md`

```md
# Em quimiostato, μ é imposto por D

O aluno deduziu μ = D a partir de dX/dt = 0 com X ≠ 0, e calculou S* corretamente
a partir daí. Ainda lê a relação como "mais vazão faz crescer mais", em vez de
"a vazão seleciona a taxa de crescimento possível".

Evidência: dedução feita no degrau 2 da escada, sem abrir o degrau 3; item
numérico de S* correto de primeira.

Implicações: degrau 6 quase completo. A leitura causal ainda invertida é
justamente o que a lição C (washout) corrige — quando D passa de μmax, não há
μ que acompanhe. Próximo alvo natural.
```

Promover a `GLOSSARY.md`: **estado estacionário** e **taxa de diluição (D)**, ambos usados corretamente e com unidade.

Atualizar `reference/equacoes.html`? Não é preciso: a seção de estado estacionário já cobre. Não fragmente a referência.

## O erro que quase se cometeu

Ir para inibição por produto, porque é o tópico mais interessante do domínio. Estaria fora da zona: o degrau 6 tinha um buraco registrado, o aluno tem prova em novembro, e conceito novo sobre base incompleta não gruda. O registro `0004` existia justamente para impedir esse erro — é para isso que os registros servem.

O segundo erro, mais fácil de cometer agora que não há entrevista: **perguntar** o que ele quer ver hoje. A pergunta parece atenciosa e devolve ao aluno uma decisão que ele não tem como tomar bem — ele não sabe o que não sabe. Os registros sabem.
