# Formato da Lição

Um arquivo HTML por exercício, em `./aula-fermentacao/`, nomeado pelo conteúdo em kebab-case: `batelada-alcoolica.html`, `quimiostato-washout.html`. Ele resolve a questão inteira e não depende de nenhum outro arquivo.

Comece de [templates/licao.html](./templates/licao.html) — copiar a estrutura é mais rápido e mais fiel do que deduzi-la desta prosa.

**Teto maleável: 1.000 palavras de prosa.** Conte antes de salvar, e conte assim:

- **entra** todo o texto que o aluno lê — títulos, parágrafos, itens de lista, células de tabela, rótulos, o conteúdo dos `<details>`;
- **não entra** o que está dentro de `<pre>`, `<script>` ou `<math>`.

O código não tem teto: ele é o que o aluno veio buscar, e capá-lo brigaria com a regra de que a divisão 2 é o centro da lição. As equações também não contam — MathML vira uma enxurrada de tokens de uma letra que inflaria a conta sem que ninguém tivesse escrito mais nada.

Se a prosa estourar, o que encolhe é a teoria.

## Divisão 1 — Teoria

Curta. O que o aluno precisa para o código fazer sentido, e nada além.

- **As equações do caso**, em MathML, cada termo anotado no que significa fisicamente.
- **A tabela de parâmetros**: símbolo, valor, unidade, procedência. Definir bem as variáveis é o que sustenta o resto.
- **Uma ou duas frases** dizendo para que o sistema serve.

Sem história, sem derivação, sem recapitulação. Se o aluno já sabe aquilo, ele passa os olhos em quinze segundos — e é para isso que a divisão é curta.

## Divisão 2 — Código

O centro da lição. O aluno recebe o programa **explicado passo a passo**, e cada passo é uma revelação: ele clica, o próximo aparece.

```html
<section class="codigo">
  <div class="passo">
    <h3>Os parâmetros e o estado inicial</h3>
    <pre><code>mu_max = 0.30   # 1/h
Ks     = 1.0    # g/L
y0 = [X0, S0, P0]</code></pre>
    <p>Tudo em uma lista só porque <code>solve_ivp</code> integra vetor, não variáveis soltas.</p>
  </div>

  <div class="passo">
    <h3>A função de derivadas</h3>
    <pre><code>def derivadas(t, y, D): ...</code></pre>
    <p>Tempo primeiro, estado depois: é a ordem que o <code>solve_ivp</code> exige.</p>
  </div>

  <details class="programa">
    <summary>Ver o programa completo</summary>
    <pre><code>{o programa inteiro, executável}</code></pre>
  </details>

  <details class="resposta">
    <summary>Ver a resposta</summary>
    <p>{os números finais}</p>
  </details>
</section>
```

`assets/codigo.js` cuida do resto sozinho: esconde os passos seguintes, põe o botão de revelar, anima a entrada, e injeta um botão de copiar em cada bloco. O programa completo e a resposta só aparecem depois do último passo.

Regras:

- **Quantos passos você decidir**, conforme as subseções naturais do programa — parâmetros, derivadas, evento, integração, gráfico. **Não passe de seis.**
- **Cada passo é um bloco lógico**: título curto, o trecho, e a explicação do **porquê daquilo**. Comentário no código cobre o "o quê"; o parágrafo cobre a decisão.
- **A explicação responde "por que assim"**: por que `solve_ivp` e não `odeint`; por que evento em vez de ler o instante no gráfico; por que `Radau` quando há rigidez.
- **O programa completo é executável**, com dependências declaradas e unidades em comentário. É de lá que o aluno copia.
- **O botão da resposta só abre e mostra** — sem pergunta, sem cerimônia.

## Divisão 3 — Análise crítica

O gráfico interativo, e a leitura do resultado **daquele** exercício.

```html
<div class="simulador"
     data-modelo="quimiostato"
     data-tempo="300"
     data-params="mu_max=0.30, Ks=1.0, Yxs=0.05, Ypx=8, D=0.27, Sin=100"
     data-controles="D:0.05:0.32:0.005"></div>
```

- **No máximo quatro controles**, e **cada um precisa da sua própria observação** mandando mexer nele. Não é "pelo menos uma observação no conjunto": controle sem frase que o convoque é ruído, e some.
- **Declare faixa e passo** de cada controle quando os padrões do componente não servirem: perto de uma transição abrupta, passo grosso demais esconde justamente o que interessa.
- **Sem esconder a curva**: o aluno desliza e ela responde na hora.
- **Duas a quatro observações**, cada uma ancorada num ponto concreto das curvas daquele caso: por que um perfil cai quando o outro sobe; o que acontece onde eles se cruzam; por que a inflexão está ali e não dez horas depois.
- **A observação de cada controle diz o que procurar**, não só que existe: *"aumente D até 0,30 e veja a produtividade despencar — o ótimo fica a 10% do washout."*

**O teste que separa análise de enchimento de linguiça:** se a frase serviria para outro exercício, ela não é análise deste caso — corte.

**Não fale do que o modelo ignora.** Nada de lista de hipóteses, nada de "este modelo não representa inibição". É genérico, é longo, e não é o que ele veio aprender.

### Os componentes, e o que cada um não faz

Leia esta tabela em vez de abrir o código dos componentes — ela existe para você não gastar leitura descobrindo que a peça não serve:

| Componente | Faz | **Não** faz |
|---|---|---|
| `simulador.js` | curso temporal: X, S, P (e V) contra **t**, com controles deslizantes de parâmetro. Modelos registrados: `batelada`, `quimiostato`, `batelada_alimentada`, `inibicao_produto` | não desenha nada contra um parâmetro; não faz varredura; não plota dados experimentais |
| `codigo.js` | a seção de código inteira: esconde os passos, revela um a um, libera o programa e a resposta no fim, injeta o botão de copiar | não formata código, não valida nada |
| `tema.js` | botão de claro/escuro, injetado sozinho, com memória | — |
| `lesson.css` | tipografia, tabelas, equações, `.passo`, `.nota-duvida`, impressão | — |

Precisa de um modelo que não está na lista? `Simulador.registrar(nome, {vars, padroes, faixas, unidades, inicial, deriv})` registra um novo sem tocar no arquivo do componente.

### Quando o gráfico certo não é contra o tempo

Alguns exercícios — quase todos os de regime contínuo — respondem uma pergunta de **varredura**: qual D dá a maior produtividade, como o rendimento anda com a vazão. A figura que responde isso tem o parâmetro no eixo horizontal, não o tempo, e o `simulador.js` só desenha curso temporal.

Nesse caso, **escreva o componente**. Um gráfico de varredura em `assets/` do workspace, no mesmo estilo dos que já existem, e use. A figura central do exercício não fica de fora da lição porque a peça não existia.

## Equações

**Sempre MathML** para equação exibida — fração de verdade, sem biblioteca, sem fonte externa, e imprime bem:

```html
<math display="block">
  <mfrac><mrow><mi>d</mi><mi>S</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac>
  <mo>=</mo><mi>D</mi><mo>⋅</mo><mo>(</mo><msub><mi>S</mi><mi>in</mi></msub>
  <mo>−</mo><mi>S</mi><mo>)</mo>
</math>
```

- Símbolo solto no meio da frase pode ser texto: `μ`, `Y<sub>x/s</sub>`. Não vale marcar uma letra.
- **Código nunca é MathML** — código é `<pre><code>`.
- Cada variável definida na primeira aparição, com unidade.

## A procedência dos números

Antes de salvar, passe por **todo número do arquivo** — texto, tabela, `data-params`, resposta final. Cada um cai em uma de **duas** caixas:

| Caixa | Como aparece |
|---|---|
| **Dado do enunciado** | Sem marca: veio com o exercício |
| **Escolha sua** | Marcada como tal, com a justificativa em meia linha |

Não há terceira caixa. **Não cite literatura**: uma citação lembrada de memória tem cara de dado verificado e não é.

**Faça a varredura procurando dígitos, não lendo.** Passe um `grep` por todo algarismo do arquivo e confira um a um: é o único jeito de pegar o número escondido no meio de uma frase, que é onde ele vaza. Em dois testes seguidos o vazamento foi exatamente esse — um número dentro de prosa explicativa, enquanto a tabela e os `data-params` estavam impecáveis.

Contam como número, e é por aí que vaza:

- **faixas e percentuais** — "entre 85 e 92% do teórico" soa como prosa e passa batido;
- **ordens de grandeza ilustrativas** — se você escreve que o substrato "resvala em −10⁻¹²", ou você mediu, ou não escreve;
- **condições iniciais e horizontes** que o enunciado não deu — X0, S0, T máximo. Um problema de valor inicial exige isso, e são escolhas suas: declare na tabela, com o motivo.

## Nota de dúvida

Quando o aluno volta com uma pergunta, a resposta vai para o chat **e** para o HTML, no ponto exato onde a dúvida surgiu:

```html
<p class="nota-duvida">
  <span class="rotulo">Dúvida — 30/08</span>
  Yx/s é gX/gS: divide-se o ganho de biomassa pelo rendimento para saber quanto
  substrato sumiu.
</p>
```

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

- **A aula de teoria com apêndice de código.** A divisão 1 cresce, o código vira resumo.
- **A análise crítica genérica.** "O modelo assume mistura perfeita." Serve para qualquer exercício, logo não serve para este.
- **A figura que ficou de fora.** A resposta do exercício é uma curva de varredura, e ela só existe dentro do script — o aluno lê a lição e nunca a vê.
- **O passo que explica o óbvio.** "Aqui importamos o numpy."
- **O slider decorativo.** Controle de parâmetro que nenhuma observação manda mexer.
- **O número não conferido**, ou o número ilustrativo escrito como se fosse medido.
- **A lição que promete continuação.** Não existe próxima: a questão se resolve aqui.
