# Exemplo 3 — Sessão de retorno, calculando a zona de desenvolvimento proximal

O aluno volta sem pedir nada específico. É você quem escolhe o alvo — e a escolha é o trabalho.

## O que o aluno diz

> "Voltei. O que a gente vê hoje?"

## 1. Orientar

Ler o workspace antes de escrever qualquer coisa, na ordem de `rules.md`:

**`MISSION.md`** — passar em Engenharia Bioquímica II em novembro; a régua é prova escrita.

**`./learning-records/`**, do mais recente para trás:

| Registro | Conteúdo |
|---|---|
| `0001` | Conhecimento prévio: Python básico, EDO esquecida, Ks confuso |
| `0002` | Entendeu Ks: sabe a unidade e que Ks alto é baixa afinidade |
| `0003` | Monta `dS/dt` com sinal e rendimento corretos, sem consultar |
| `0004` | Balanço do quimiostato e μ = D, deduzido por ele |

**`NOTES.md`** — ~3 h por semana; prefere ver a matemática antes do código; prova escrita exige reconstrução no papel.

**`./lessons/`** — existem `0001` a `0004`. A próxima é `0005`.

**`./assets/`** — `lesson.css`, `quiz.js`, `simulador.js`. Nada novo é necessário.

## 2. Escolher o alvo

Cruzando o mapa de progressão com os registros:

- degraus 1 a 3: vencidos, com evidência;
- degrau 5 (integração): usado, mas nunca isolado — funciona porque ele copia o esqueleto;
- degrau 6: **parcialmente** vencido. `0004` registra explicitamente que falta washout e produtividade;
- degraus 4 e 7 (produto, inibição): não tocados.

O degrau 6 está aberto, com registro dizendo exatamente o que falta, e cai na prova. É o alvo. Os degraus 4 e 7 seriam conceito novo com o 6 ainda pela metade — dois alvos, o modo de falha clássico.

Alvo: **washout e o D que maximiza produtividade.**

Enunciar antes de produzir:

> "Você já sabe que μ = D no estacionário. Hoje você sai sabendo prever o que acontece quando D fica alto demais, e escolher o D que dá mais produto por hora — que não é o que dá mais produto por litro. Serve?"

## 3. Fundamentar

Fonte primária de `RESOURCES.md`: Herbert, Elsworth & Telling (1956), teoria do quimiostato. Conferir o link antes de citar — a entrada ainda está marcada `[a verificar]`.

Do banco de exercícios: `cases/caso_continua_crescimento.md`, seção "Loop de feedback", que já traz a tabela de estado estacionário conferida.

## 4. Produzir a lição

`lessons/0005-washout-e-produtividade.html`, a partir de `templates/licao.html`:

- **Gancho** — "na prova, 'qual D usar' vale mais que 'qual é a equação'."
- **Recuperação** — de memória, sem consultar: escreva `dX/dt` do quimiostato e diga quanto vale μ no estacionário. Espaçamento sobre `0004`.
- **Conhecimento** — só o D crítico e a produtividade `D·X*`. Uma ideia. Nada de reciclo, nada de inibição.
- **Prática** — preveja e depois rode, com D como único controle:

```html
<div class="simulador" data-modelo="quimiostato" data-tempo="120"
     data-params="mu_max=0.4, Ks=1.0, Yxs=0.5, Ypx=0.2, D=0.2, Sin=20, X0=0.5"
     data-controles="D" data-prever="1"></div>
```

  Previsão pedida por escrito antes do reveal: *a partir de qual D a biomassa some, e o que acontece com a produtividade um pouco antes disso?*

- **Verificação** — duas perguntas. Uma numérica (dado μmax e Sin, calcule o D crítico), uma de escolha com distratores tirados do catálogo de `rules.md`: "D alto sempre dá mais produto" e "o melhor D é o de maior concentração".
- **Concessão à régua** — como a prova é escrita, um item pede a **dedução** de `S* = Ks·D/(μmax − D)` no papel, não no simulador. A missão manda.
- **Fonte primária** — Herbert et al. (1956), indicando a seção sobre washout.
- **Fecho** — link para `reference/equacoes.html`, seção de estado estacionário, e o lembrete de perguntar.

Abrir para ele:

```bash
start "" "lessons/0005-washout-e-produtividade.html"
```

## 5. Fechar o loop

Ele prevê que a biomassa cai gradualmente até zero conforme D aumenta. Roda: X* cai devagar e depois **despenca** perto de 0,381 1/h. Previsão parcialmente errada — e o erro é o conteúdo.

> "Você acertou a direção e errou a forma. Olha `S* = Ks·D/(μmax − D)`: o que acontece com o denominador quando D se aproxima de μmax?"

Ele vê a assíntota. Entende que S* dispara, X* colapsa, e que o washout é uma transição abrupta, não um desvanecimento.

## 6. Consolidar

`learning-records/0005-washout-e-a-assintota.md`

```md
# Washout é transição abrupta, não desvanecimento

O aluno previu queda gradual de X* com D crescente e, confrontado com a simulação,
identificou a origem na assíntota de S* = Ks·D/(μmax − D) quando D → μmax.

Evidência: explicou a forma da curva pelo denominador da expressão, sem ajuda
além de uma pergunta orientadora.

Implicações: degrau 6 completo. Próximo alvo natural é o degrau 4 (formação de
produto) ou o 7 (inibição), com o caso de etanol.
```

Promover a `GLOSSARY.md`: **washout** e **produtividade volumétrica**, ambos usados corretamente e com unidade.

Atualizar `reference/equacoes.html`? Não é preciso: a seção de estado estacionário já cobre. Não fragmente a referência.

`NOTES.md`: registrar que a previsão escrita antes do reveal funcionou bem com este aluno — vale repetir o padrão.

## O erro que quase se cometeu

Ir para inibição por produto, porque é o tópico mais interessante do domínio. Estaria fora da zona: o degrau 6 tinha um buraco registrado, o aluno tem prova em novembro, e conceito novo sobre base incompleta não gruda. O registro `0004` existia justamente para impedir esse erro — é para isso que os registros servem.
