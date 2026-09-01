# Formato da Lição

Um arquivo HTML por exercício, em `./aula-fermentacao/`, nomeado pelo conteúdo em kebab-case: `batelada-alcoolica.html`, `quimiostato-washout.html`. Ele resolve a questão inteira e não depende de nenhum outro arquivo.

Comece de [templates/licao.html](./templates/licao.html) — copiar a estrutura é mais rápido e mais fiel do que deduzi-la desta prosa.

**Não há teto de palavras.** A lição é tão longa quanto precisa para explicar direito, e tão curta quanto der **sem cortar explicação**.

Isso já foi um número, e o número fez mal: para caber nele, as definições viraram telegrama — "P — etanol, g/L" — e as frases de fecho perderam o contexto. Sobrou uma lição rápida de ler e difícil de entender, que é o pior dos dois mundos.

A régua continua sendo o tempo do aluno, mas ele se ganha **cortando o que não ensina**, não abreviando o que ensina:

- repetição, recapitulação, história, ressalva que não muda o que ele faz — cortar;
- definição de símbolo, contexto de equação, o porquê de uma decisão de código — **nunca cortar**.

Se passar de umas 1.800 palavras de prosa, releia procurando a primeira lista. Se não achar nada dela, a lição é longa porque o exercício é grande, e está tudo bem.

## A abertura

Antes da primeira divisão, **um parágrafo situando o problema**: que processo é esse, o que o enunciado está pedindo, e o que o aluno vai ter no fim. Escrito para quem acabou de ler o enunciado e ainda não sabe por onde pegar — não para quem já entendeu tudo.

Três a cinco frases. É o único lugar da lição em que se pode gastar texto explicando o contexto, e ele paga: sem ele, a primeira equação chega antes de o aluno saber do que se trata.

## Divisão 1 — Teoria

O que o aluno precisa para o código fazer sentido, e nada além — mas **explicado por inteiro**, não abreviado.

**Uma equação por bloco, e cada bloco se explica sozinho.** Nunca despeje as equações em sequência e deixe as definições para depois: quem lê a terceira equação já esqueceu o que era o símbolo da primeira.

A ordem dentro do bloco é sempre esta — **equação, símbolos daquela equação, o que ela diz**. A marcação está montada em [templates/licao.html](./templates/licao.html), com dois blocos prontos para copiar: `.eq-bloco` → `.equacao` → `.termos` → parágrafo. O "onde" antes da lista sai do CSS — não escreva à mão.

Regras do bloco:

- **Só os símbolos daquela equação**, todos eles, com unidade. Símbolo que aparece em duas equações é definido na primeira e não se repete.
- **A definição é uma frase completa, não uma etiqueta.** "P — concentração de etanol no mosto, g/L", nunca "P — etanol, g/L". "μ — taxa específica de crescimento **da levedura**, em gramas de célula nova por grama de célula existente por hora", nunca "μ — taxa específica de crescimento, 1/h". Taxa de quê, de quem, por quê: se a frase deixa a pergunta no ar, ela não definiu nada — só nomeou.
- **A frase de fecho contextualiza antes de concluir.** Diga o que a equação está descrevendo no processo, e só então o que ela implica. "Dois freios multiplicando: falta de açúcar e excesso de etanol" presume que o aluno já montou a cena; "a velocidade de crescimento da levedura é o produto de dois fatores — um que cai quando o açúcar acaba, outro que cai quando o etanol se acumula — e basta um deles zerar para a dorna parar" constrói a cena e depois conclui.
- **Duas a quatro frases** por bloco. Menos que isso vira telegrama.

Depois dos blocos, **a tabela de parâmetros**: símbolo, valor, unidade, procedência. Ela guarda os **números**; os blocos guardam os **significados**. Não repita a descrição do símbolo na tabela.

Fecha com **uma ou duas frases** dizendo para que o sistema todo serve.

Sem história, sem derivação, sem recapitulação. Se o aluno já sabe aquilo, ele passa os olhos em quinze segundos — e é para isso que a divisão é curta.

## Divisão 2 — Código

O centro da lição. O aluno recebe o programa **explicado passo a passo**, e cada passo é uma revelação: ele clica, o próximo aparece.

A marcação — `section.codigo` com os `.passo`, mais os dois `details` do programa completo e da resposta — está em [templates/licao.html](./templates/licao.html).

`assets/codigo.js` cuida do resto sozinho: esconde os passos seguintes, põe o botão de revelar, anima a entrada, e injeta um botão de copiar em cada bloco. O programa completo e a resposta só aparecem depois do último passo.

Regras:

- **Quantos passos você decidir**, conforme as subseções naturais do programa — parâmetros, derivadas, evento, integração, gráfico. **Não passe de seis.**
- **Cada passo é um bloco lógico**: título curto, o trecho, e a explicação do **porquê daquilo**. Comentário no código cobre o "o quê"; o parágrafo cobre a decisão.
- **A explicação responde "por que assim"**: por que `solve_ivp` e não `odeint`; por que evento em vez de ler o instante no gráfico; por que `Radau` quando há rigidez.
- **O programa completo é executável**, com dependências declaradas e unidades em comentário. É de lá que o aluno copia.
- **O botão da resposta só abre e mostra** — sem pergunta, sem cerimônia.

## Divisão 3 — Análise crítica

O gráfico interativo, e a leitura do resultado **daquele** exercício. A tag, com todos os `data-*` e as duas formas de `data-controles`, está em [templates/licao.html](./templates/licao.html).

- **Um painel por canvas, sempre.** Cada gráfico ocupa a largura inteira da coluna e tem **entre 320 e 420 px de altura**. Empilhar dois painéis de 150 px dentro do mesmo canvas dá dois gráficos ruins em vez de um bom — isso não se faz nunca.
- **Um gráfico basta quase sempre.** Se duas grandezas não cabem no mesmo eixo por causa das unidades, a saída padrão é escolher a que responde a pergunta e pôr a outra como número no texto.
- **Um segundo gráfico é permitido** quando o enunciado pergunta duas coisas em unidades diferentes e a segunda só se enxerga em curva — como "quanto etanol sai" e "como μ se comporta ao longo do tempo". Nesse caso são dois canvas separados, cada um do tamanho cheio, nunca dois painéis num só. Mais de dois, não.
- **No máximo quatro controles**, e **cada um precisa da sua própria observação** mandando mexer nele. Não é "pelo menos uma observação no conjunto": controle sem frase que o convoque é ruído, e some.
- **Declare faixa e passo** de cada controle quando os padrões do componente não servirem: perto de uma transição abrupta, passo grosso demais esconde justamente o que interessa.
- **Sem esconder a curva**: o aluno desliza e ela responde na hora.
- **Duas a quatro observações**, cada uma ancorada num ponto concreto das curvas daquele caso: por que um perfil cai quando o outro sobe; o que acontece onde eles se cruzam; por que a inflexão está ali e não dez horas depois.
- **Um insight distinto por item.** Se duas observações explicam o mesmo fenômeno com palavras diferentes, são uma só — funda ou corte. A lista não é para encher.
- **O vocabulário é o da legenda do gráfico, sem tradução.** Se a legenda diz "etanol", a observação diz "etanol" — não "produto", não "P". Cada troca de nome obriga o aluno a fazer a ponte de cabeça, e ele lê mais devagar por causa disso. Vale para eixo, legenda, tabela e texto: um nome por grandeza, na lição inteira.
- **Batize as curvas com os nomes do exercício**, via `data-rotulos="Levedura X, ART S, Etanol P"`. Sem isso a legenda sai genérica — "Produto P" —, e aí ou o texto fica genérico junto, ou os dois discordam.
- **A observação de cada controle diz o que procurar**, não só que existe: *"aumente D até 0,30 e veja a produtividade despencar — o ótimo fica a 10% do washout."*

**O teste que separa análise de enchimento de linguiça:** se a frase serviria para outro exercício, ela não é análise deste caso — corte.

**Não fale do que o modelo ignora.** Nada de lista de hipóteses, nada de "este modelo não representa inibição". É genérico, é longo, e não é o que ele veio aprender.

### Os componentes, e o que cada um não faz

Leia esta tabela em vez de abrir o código dos componentes — ela existe para você não gastar leitura descobrindo que a peça não serve:

| Componente | Faz | **Não** faz |
|---|---|---|
| `simulador.js` | curso temporal: X, S, P (e V) contra **t**, com controles deslizantes e legenda batizável (`data-rotulos`). Modelos registrados: `batelada`, `quimiostato`, `batelada_alimentada`, `inibicao_produto` | não desenha nada contra um parâmetro; não faz varredura; não plota dados experimentais |
| `codigo.js` | a seção de código inteira: esconde os passos, revela um a um, libera o programa e a resposta no fim, injeta o botão de copiar | não formata código, não valida nada |
| `tema.js` | botão de claro/escuro, injetado sozinho, com memória | — |
| `lesson.css` | tipografia, tabelas, equações, `.passo`, `.nota-duvida`, impressão | — |

Precisa de um modelo que não está na lista? `Simulador.registrar(nome, {vars, padroes, faixas, unidades, inicial, deriv})` registra um novo sem tocar no arquivo do componente.

### Quando o gráfico certo não é contra o tempo

Alguns exercícios — quase todos os de regime contínuo — respondem uma pergunta de **varredura**: qual D dá a maior produtividade, como o rendimento anda com a vazão. A figura que responde isso tem o parâmetro no eixo horizontal, não o tempo, e o `simulador.js` só desenha curso temporal.

Nesse caso, **escreva o componente** — e não do zero: **copie [templates/componente.js](./templates/componente.js) para `assets/` do workspace.** É um esqueleto que já roda, e traz as convenções prontas em vez de descritas: canvas com DPR, cores lidas das variáveis do CSS, os três eventos de redesenho, os controles com as classes que o `lesson.css` já estiliza, e os eixos rotulados com unidade. Você troca três partes marcadas — a identidade, o cálculo e a linha de leitura — e a figura do seu exercício está de pé.

**Não abra o `simulador.js` para aprender o estilo.** Foi o maior custo de tempo já medido numa sessão: três leituras de 470 linhas para escrever um componente de 240. Tudo o que aquele arquivo ensinaria está no esqueleto.

**E ele fica no workspace, não vira peça da skill.** Não empacotamos componente por tipo de exercício: cada tipo empacotado vira o formato que o próximo caso tende a imitar, mesmo quando a pergunta pedia outra figura. Escreva o que o caso pede — a skill guarda o motor de simulação e as convenções, não um catálogo de gráficos.

## Equações

**Sempre MathML** para equação exibida — fração de verdade, sem biblioteca, sem fonte externa, e imprime bem. O [template](./templates/licao.html) traz duas equações escritas por inteiro, uma com fração e uma com subíndice: copie a que se parecer com a sua em vez de montar do zero.

- Símbolo solto no meio da frase pode ser texto: `μ`, `Y<sub>x/s</sub>`. Não vale marcar uma letra.
- **Código nunca é MathML** — código é `<pre><code>`.
- Cada variável definida na primeira aparição, com unidade.

## A procedência dos números

Antes de salvar, passe por **todo número do arquivo** — texto, tabela, `data-params`, resposta final. Cada um cai em uma de **duas** caixas:

| Caixa | Como aparece |
|---|---|
| **Dado do enunciado** | Sem marca: veio com o exercício |
| **Derivado do enunciado** | Sem marca também, mas a conta tem de estar visível na lição ou no código. "22 g de ART por grama de levedura" é 1/0,045 — mostre de onde veio |
| **Escolha sua** | Marcada como tal, com a justificativa em meia linha |

Não há quarta caixa. **Faixa de slider é configuração, não afirmação**: não precisa de procedência, mas precisa fazer sentido físico — faixa que leva a curva para uma região impossível confunde mais do que ensina. **Não cite literatura**: uma citação lembrada de memória tem cara de dado verificado e não é.

**Faça a varredura procurando dígitos, não lendo.** Passe um `grep` por todo algarismo do arquivo e confira um a um: é o único jeito de pegar o número escondido no meio de uma frase, que é onde ele vaza. Em dois testes seguidos o vazamento foi exatamente esse — um número dentro de prosa explicativa, enquanto a tabela e os `data-params` estavam impecáveis.

Contam como número, e é por aí que vaza:

- **faixas e percentuais** — "entre 85 e 92% do teórico" soa como prosa e passa batido;
- **ordens de grandeza ilustrativas** — se você escreve que o substrato "resvala em −10⁻¹²", ou você mediu, ou não escreve;
- **condições iniciais e horizontes** que o enunciado não deu — X0, S0, T máximo. Um problema de valor inicial exige isso, e são escolhas suas: declare na tabela, com o motivo.

## Nota de dúvida

Quando o aluno volta com uma pergunta, a resposta vai para o chat **e** para o HTML, no ponto exato onde a dúvida surgiu. A marcação está no rodapé do [template](./templates/licao.html): `p.nota-duvida` com um `span.rotulo` datado na frente.

Existe também em linha: `<mark class="nota-duvida">…</mark>`. No ponto exato, nunca no rodapé; sempre esta classe, sem variante; sem apagar o original.

## Requisitos técnicos

- **Autocontido**, exceto pelos componentes de `./assets/`, que ficam ao lado do arquivo. Abre com duplo clique, sem servidor e sem internet.
- **Carrega, no mínimo**, `lesson.css`, `tema.js` e `codigo.js`, mais o componente de gráfico que a lição usar. Componente novo que você escrever entra na lista.
- **Copie para o workspace só os componentes que a lição carrega.** Cópia que ninguém usa confunde quem for olhar a pasta depois.
- **Nenhum link que tire o aluno da lição.** Link externo, nunca.
- **Botão de tema** vem junto com `tema.js`, sem markup na lição.
- **Todo código exibido roda.** **Todo parâmetro tem unidade.** **Todo gráfico tem eixos rotulados.**
- Imprime bem: `lesson.css` já traz as regras.

## Modos de falha

- **A definição-etiqueta.** "P — etanol, g/L" nomeia o símbolo e não define nada. Taxa de quê, concentração de quê, medida onde.
- **A explicação com pressa.** Frase de fecho que conclui sem ter montado a cena, porque o autor estava economizando palavra. Economia de palavra não é objetivo desta skill; economia de **tempo do aluno** é, e ele perde mais tempo relendo uma frase apertada do que lendo duas frases claras.
- **A lição que começa na equação.** Sem o parágrafo de abertura, a primeira fórmula chega antes de o aluno saber de que processo se trata.
- **A aula de teoria com apêndice de código.** A divisão 1 cresce, o código vira resumo.
- **A análise crítica genérica.** "O modelo assume mistura perfeita." Serve para qualquer exercício, logo não serve para este.
- **A figura que ficou de fora.** A resposta do exercício é uma curva de varredura, e ela só existe dentro do script — o aluno lê a lição e nunca a vê.
- **O passo que explica o óbvio.** "Aqui importamos o numpy."
- **O slider decorativo.** Controle de parâmetro que nenhuma observação manda mexer.
- **O número não conferido**, ou o número ilustrativo escrito como se fosse medido.
- **A lição que promete continuação.** Não existe próxima: a questão se resolve aqui.
