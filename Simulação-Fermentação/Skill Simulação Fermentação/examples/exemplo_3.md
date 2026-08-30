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

Sem enunciado do aluno, o exercício vem de `./cases/`, na pasta da skill. O registro `0004` diz exatamente o que falta: estado estacionário, washout, produtividade. `cases/caso_continua_crescimento.md` cobre isso.

O caso não vira lição inteiro — ele cobre três ou quatro degraus e a lição resolve **uma questão fechada**. Recorte dele um problema com enunciado próprio, do tamanho de uma questão de prova:

> "Um quimiostato opera com Sin = 20 g/L e D ajustável. Determine o D que maximiza a produtividade de biomassa, e mostre o que acontece acima do D crítico."

Isso dá as quatro estações sem sobra: modelo (estacionário, μ = D), código (varredura de D em Python), resultado (o D ótimo e o crítico, com números), crítica (por que produtividade não é concentração).

O mapa de progressão entra só como **checagem**: a questão exige os balanços do quimiostato (`0004`, com evidência) e o acoplamento de substrato (`0001`). Pré-requisitos de pé — sem estação zero.

## 3. Fundamentar e conferir

De `RESOURCES.md`: Herbert, Elsworth & Telling (1956), teoria do quimiostato — a entrada ainda está marcada `[a verificar]`, então ou se confere antes de citar, ou o número entra como suposição declarada.

Do banco: a seção "Loop de feedback" de `cases/caso_continua_crescimento.md`, que já traz a tabela de estado estacionário conferida. O caso é matéria-prima sua; o modelo esperado que está nele não é copiado para a lição — a lição escreve o dela, com as unidades no lugar.

E antes de escrever qualquer número na lição: rodar a varredura de D em Python, com tolerância apertada, e guardar D crítico, D ótimo e a produtividade máxima.

## 4. Produzir a lição

`lessons/quimiostato-d-otimo-e-washout.html`:

- **Gancho** — "na prova, 'qual D usar' vale mais que a equação; e a resposta é contraintuitiva."
- **Aposta declarada** — "aposto que sua primeira resposta seria μ = μmax. Quase todo mundo responde isso. Se você já sabe que não é, pule para o código."
- **Recuperação** — de memória: escreva o `dX/dt` do quimiostato. Espaçamento sobre `0004`.
- **Estação 1, modelo** — em MathML: `dX/dt = 0` com X ≠ 0 obriga μ = D, e daí `S* = Ks·D/(μmax − D)`. A causalidade invertida, nomeada: é a bomba que impõe a taxa de crescimento. Dentro das 400 palavras.
- **Estação 2, código** — a maior. A varredura de D: laço sobre valores de D, estado estacionário por integração longa, cálculo de `D·X*`, gráfico de produtividade contra D. Explicado passo a passo — por que integrar até o estacionário em vez de resolver o algébrico direto, e o que acontece com o integrador perto do washout.
- **Explorador de variantes** — D abaixo, no ótimo e acima do crítico. Três operações corretas, com a curva mudando de figura em cada uma.
- **Estação 3, resultado** — previsão ("se eu dobrar D, a produtividade dobra, cai pela metade, ou faz outra coisa?"), e atrás do clique os números conferidos: D crítico, D ótimo, produtividade máxima.
- **Estação 4, crítica** — por que o D que maximiza concentração não é o que maximiza produtividade; o que reciclo celular mudaria; previsão antes do simulador, com D como controle.
- **Concessão à régua** — como a prova é escrita, um item pede a dedução de `S*` no papel, a partir de μ = D. A missão manda.
- **Verificação** — duas perguntas: uma numérica (calcule o D crítico) e uma de escolha com "D alto sempre dá mais produto", do catálogo.
- **Fecho** — uma frase. Sem "na próxima lição": o washout está resolvido aqui.

Índice e abertura:

```md
| 2026-09-11 | [quimiostato-d-otimo-e-washout.html](./quimiostato-d-otimo-e-washout.html) | 6–10 | Achar o D que maximiza produtividade e prever o washout, em Python |
```

```bash
start "" "aula-fermentacao/lessons/quimiostato-d-otimo-e-washout.html"
```

## 5. Falar pouco

> "Hoje: por que, num quimiostato em regime, quem manda na taxa de crescimento é a bomba. Abri a lição.
> Apostei que sua primeira resposta seria μ = μmax — a lição foi montada em cima disso.
> Vem com dúvida depois, que eu enxerto a resposta no próprio arquivo."

## 6. Consolidar

Ele prevê que dobrar D dobra μ — acerta pelo motivo errado, achando que "mais vazão, mais crescimento". No quiz numérico, calcula S* corretamente. Volta perguntando:

> "Então se eu aumentar muito o D o μ acompanha sempre?"

Resposta no chat, nota enxertada na lição logo depois do bloco de μ = D, arquivo reaberto. A resposta já estava na estação de crítica — a nota traz para o ponto onde a dúvida nasceu o que ele leria três parágrafos adiante.

`learning-records/0005-mu-imposto-por-d.md`

```md
# Em quimiostato, μ é imposto por D

O aluno deduziu μ = D a partir de dX/dt = 0 com X ≠ 0, e calculou S* corretamente
a partir daí. Ainda lê a relação como "mais vazão faz crescer mais", em vez de
"a vazão seleciona a taxa de crescimento possível".

Evidência: previsão registrada antes de revelar os números, e item numérico de
S* correto de primeira.

Implicações: degrau 6 vencido no cálculo, não na leitura causal — ele ainda
lê "mais vazão faz crescer mais". Cobrar isso num exercício de batelada
alimentada, onde a mesma confusão reaparece com volume variável.
```

Promover a `GLOSSARY.md`: **estado estacionário** e **taxa de diluição (D)**, ambos usados corretamente e com unidade.

Atualizar `reference/equacoes.html`? Não é preciso: a seção de estado estacionário já cobre. Não fragmente a referência.

## O erro que quase se cometeu

Ir para inibição por produto, porque é o tópico mais interessante do domínio. Estaria fora da zona: o degrau 6 tinha um buraco registrado, o aluno tem prova em novembro, e conceito novo sobre base incompleta não gruda. O registro `0004` existia justamente para impedir esse erro — é para isso que os registros servem.

O segundo erro, mais fácil de cometer agora que não há entrevista: **perguntar** o que ele quer ver hoje. A pergunta parece atenciosa e devolve ao aluno uma decisão que ele não tem como tomar bem — ele não sabe o que não sabe. Os registros sabem.
