# Formato da Lição

Um arquivo HTML por exercício, em `./aula-fermentacao/`, nomeado pelo conteúdo em kebab-case: `batelada-alcoolica.html`, `quimiostato-washout.html`. Ele resolve a questão inteira e não depende de nenhum outro arquivo.

Comece de [templates/licao.html](./templates/licao.html) — copiar a estrutura é mais rápido e mais fiel do que deduzi-la desta prosa.

**Teto maleável: 1.000 palavras visíveis.** Se estourar, o que encolhe é a teoria. Código e análise crítica são o que o aluno veio buscar.

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
    <pre><code>mu_max = 0.40   # 1/h
Ks     = 1.0    # g/L
y0 = [X0, S0, V0]</code></pre>
    <p>Tudo em uma tupla só porque <code>solve_ivp</code> integra vetor, não variáveis soltas.</p>
  </div>

  <div class="passo">
    <h3>A função de derivadas</h3>
    <pre><code>def derivadas(t, y, F): ...</code></pre>
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

`assets/codigo.js` cuida do resto sozinho: esconde os passos seguintes, põe o botão de revelar, anima a entrada, e injeta um botão de copiar em cada bloco de código. O programa completo e a resposta só aparecem depois do último passo.

Regras:

- **Quantos passos você decidir**, conforme o tamanho do programa e as subseções naturais dele — parâmetros, derivadas, evento, integração, gráfico. **Não passe de seis.**
- **Cada passo é um bloco lógico**, não uma linha solta: título curto, o trecho de código, e a explicação do **porquê daquilo**, não do que a linha faz.
- **A explicação responde "por que assim"**: por que `solve_ivp` e não `odeint`; por que evento em vez de ler o instante no gráfico; por que `Radau` quando há rigidez. Comentário no código cobre o "o quê"; o parágrafo cobre a decisão.
- **O programa completo é executável**, com dependências declaradas e unidades em comentário. É de lá que o aluno copia.
- **A resposta numérica sai de integração conferida**, nunca de estimativa, e o botão só abre e mostra — sem pergunta, sem cerimônia.

## Divisão 3 — Análise crítica

O simulador, e a leitura do resultado **daquele** exercício.

```html
<div class="simulador"
     data-modelo="batelada"
     data-tempo="30"
     data-params="mu_max=0.35, Ks=1.5, Yxs=0.045, X0=2, S0=150"
     data-controles="mu_max, S0"></div>
```

- **No máximo quatro controles**, e só de parâmetros que a análise discute. Parâmetro que não aparece no texto não vira slider.
- **Sem `data-prever`**: o aluno desliza e a curva responde na hora. Esconder a curva mata o que o componente tem de melhor.
- **Duas a quatro observações**, cada uma ancorada num ponto concreto das curvas daquele caso: por que um perfil cai quando o outro sobe; o que acontece onde eles se cruzam; por que a inflexão está ali e não dez horas depois.
- **Pelo menos uma observação manda mexer** num controle e diz o que procurar: *"aumente F e veja o pico de ART subir junto — o enchimento acelera, mas o açúcar acumulado dobra."*

**O teste que separa análise de enchimento de linguiça:** se a frase serviria para outro exercício, ela não é análise deste caso — corte.

**Não fale do que o modelo ignora.** Nada de lista de hipóteses, nada de "este modelo não representa inibição". É genérico, é longo, e não é o que ele veio aprender.

## Equações

**Sempre MathML** para equação exibida — fração de verdade, sem biblioteca, sem fonte externa, e imprime bem:

```html
<math display="block">
  <mfrac><mrow><mi>d</mi><mi>S</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac>
  <mo>=</mo><mo>−</mo>
  <mfrac><mn>1</mn><msub><mi>Y</mi><mrow><mi>x</mi><mo>/</mo><mi>s</mi></mrow></msub></mfrac>
  <mo>⋅</mo><mi>μ</mi><mo>⋅</mo><mi>X</mi>
</math>
```

- Símbolo solto no meio da frase pode ser texto: `μ`, `Y<sub>x/s</sub>`. Não vale marcar uma letra.
- **Código nunca é MathML** — código é `<pre><code>`.
- Cada variável definida na primeira aparição, com unidade.

## A varredura de procedência

Antes de salvar, passe por **todo número do arquivo** — texto, tabela, `data-params`, resposta final. Cada um cai em uma de **duas** caixas:

| Caixa | Como aparece |
|---|---|
| **Dado do enunciado** | Sem marca: veio com o exercício |
| **Suposição sua** | Marcada como suposição, com ordem de grandeza justificada e o teto físico quando existir |

Não há terceira caixa. **Não cite literatura**: uma citação lembrada de memória tem cara de dado verificado e não é. Faixas e percentuais contam como número — "entre 85 e 92% do teórico" soa como prosa e passa batido, e foi assim que já vazou antes.

Sem fonte e com o número necessário, declare como estimativa sua e siga.

## Nota de dúvida

Quando o aluno volta com uma pergunta sobre a lição, a resposta vai para o chat **e** para o HTML, no ponto exato onde a dúvida surgiu:

```html
<p class="nota-duvida">
  <span class="rotulo">Dúvida — 30/08</span>
  Yx/s é gX/gS: divide-se o ganho de biomassa pelo rendimento para saber quanto
  substrato sumiu.
</p>
```

Existe também em linha: `<mark class="nota-duvida">…</mark>`.

No ponto exato, nunca no rodapé. Sempre esta classe, sem variante. Sem apagar o original. Depois, reabra o arquivo e avise em uma linha.

## Requisitos técnicos

- **Autocontido**, exceto pelos componentes de `./assets/`, que ficam ao lado do arquivo. Abre com duplo clique, sem servidor e sem internet.
- **Carrega quatro arquivos**: `lesson.css`, `tema.js`, `codigo.js`, `simulador.js`.
- **Nenhum link interno.** Link externo, nunca — não há mais citação de fonte.
- **Botão de tema** vem junto com `tema.js`, sem markup na lição.
- **Todo código exibido roda.** **Todo parâmetro tem unidade.** **Todo gráfico tem eixos rotulados.**
- Imprime bem: `lesson.css` já traz as regras.

## Modos de falha

- **A aula de teoria com apêndice de código.** A divisão 1 cresce, o código vira resumo. É o modo de falha mais provável.
- **A análise crítica genérica.** "O modelo assume mistura perfeita." Serve para qualquer exercício, logo não serve para este.
- **O passo que explica o óbvio.** "Aqui importamos o numpy." Se o comentário no código já diz, o parágrafo não repete.
- **Sete passos, oito passos.** Vira clicar por clicar, e a revelação perde a graça.
- **O número não conferido.** Manda o aluno caçar defeito em código correto e queima a confiança na lição inteira.
- **O slider decorativo.** Controle de parâmetro que a análise não menciona.
- **A lição que promete continuação.** Não existe próxima: a questão se resolve aqui.
