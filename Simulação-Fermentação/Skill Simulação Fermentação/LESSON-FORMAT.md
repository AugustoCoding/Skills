# Formato da Lição

A lição é a unidade primária de ensino deste workspace, e **é a experiência inteira**. Um arquivo HTML autocontido em `./lessons/` que resolve **a questão inteira** que o aluno trouxe: ele abre, percorre e sai sabendo programar aquilo. Nada fica para um próximo arquivo, e nada exige abrir outro arquivo para ser entendido.

[SKILL.md](./SKILL.md) diz o que a lição precisa ser. Este documento diz como montá-la.

## O que o aluno quer

Ele não quer perder tempo. Isso não é preferência de estilo, é a restrição de projeto que decide o resto:

- **A estrela é programar.** Ele já tem alguma base de fermentação, mesmo que pequena. A teoria entra na dose mínima para o código fazer sentido; a explicação do código é onde a lição gasta o espaço dela.
- **Sem floreio.** Nada que não mude o que ele faz. Se uma frase pode sair sem que o aluno erre mais, ela sai.
- **Um lugar só.** Tudo que ele precisa ler ou manipular está no arquivo. Nenhum link interno, nenhuma consulta a outro documento, nenhuma continuação prometida.

## Nome do arquivo

O nome descreve **o conteúdo**, em kebab-case, curto o bastante para ele reconhecer a lição na lista seis meses depois:

```
lessons/quimiostato-washout-etanol.html
lessons/batelada-alcoolica-em-python.html
```

Sem numeração sequencial: a ordem vive em `lessons/INDEX.md`. Se o nome que você quer já existe, torne-o mais específico — nunca desambigue com sufixo numérico.

## O índice

`lessons/INDEX.md` é a ordem que o nome do arquivo não carrega. **Atualize na mesma ação em que cria a lição:**

```md
# Lições

| Data | Arquivo | Degrau | Alvo |
|---|---|---|---|
| 2026-08-30 | [batelada-alcoolica-em-python.html](./batelada-alcoolica-em-python.html) | 3–5 | Montar e programar a batelada com Monod, do balanço ao gráfico |
```

É arquivo de trabalho seu: serve para saber o que já existe e para a checagem de pré-requisito. O aluno não é mandado até ele.

## As quatro estações

Toda lição segue a mesma espinha, sempre nesta ordem:

| Estação | O que acontece |
|---|---|
| **Modelo** | As equações do caso, expostas e explicadas termo a termo |
| **Código** | O programa completo, comentado, construído passo a passo — a maior estação |
| **Resultado** | O que sai, os números-alvo para ele conferir o próprio código |
| **Crítica** | O que o modelo ignora, o que mudaria a resposta, e o interativo de parâmetros |

Enunciado com itens (a), (b), (c) mapeia neles quase sempre direto. **Enunciado sem itens é fatiado por elas** — a espinha não muda porque o professor da disciplina não numerou. Estação sem conteúdo naquele exercício simplesmente não aparece: um exercício que só pede interpretação de curva não tem estação de código.

A previsibilidade é o ponto. O aluno aprende onde as coisas ficam e para de procurar.

### Estação zero: a ponte

Quando `./learning-records/` mostra que falta um pré-requisito que o exercício exige, a ponte entra **como primeira seção do mesmo arquivo**, curta, e o resto segue normal. Nunca vira lição separada, nunca vira promessa.

Só dispara com lacuna registrada. Não por precaução.

## Orçamento

| Parte | Orçamento |
|---|---|
| Teoria de fermentação (estação de modelo, mais o que a de crítica precisar) | **máximo 400 palavras** |
| Explicação do código | **teto brando de 800 palavras** — passa se o exercício for mesmo complicado |
| Arquivo inteiro | ~1800 palavras acende a luz amarela: releia procurando floreio |

Acima dos números, vale a proporção: **a estação de código é sempre a maior da lição**. Se a teoria estiver competindo com ela, a teoria está errada, não o código.

Para calibrar: a lição do Teste 1 tinha 1607 palavras de exposição contra 847 de prática. É exatamente o inverso do que se quer.

## A estação de código

É por isso que a lição existe. Aqui você não economiza.

**O que vem pronto:** o programa inteiro, executável, comentado. Imports, parâmetros com unidade, função de derivadas, chamada do integrador, evento, plotagem com eixos rotulados. Ele copia, roda, e vê o resultado.

**Como explicar:** passo a passo, na ordem em que o programa executa. Para cada trecho que não é cerimônia:

- **o que faz** — uma frase;
- **por que este termo e não outro** — a escolha, nomeada. `solve_ivp` e não `odeint`; `Radau` e não `RK45` quando há rigidez; `t_eval` para a saída e não para o passo; evento para capturar o instante exato em vez de ler no gráfico;
- **o que quebraria** se aquilo faltasse — uma frase, sem virar catálogo de erros.

O que é cerimônia repetida a cada exercício — `import numpy as np`, `plt.xlabel(...)` — é comentado no código e não ganha parágrafo.

**O interativo obrigatório:** pelo menos um explorador de variantes (`assets/variantes.js`), que troca uma linha do código à vista e redesenha o gráfico ao lado. As variantes são **escolhas corretas e relevantes**, nunca erros plantados: método de integração, presença de evento, densidade de `t_eval`, tolerância. O aluno vê o que muda quando ele decide diferente — não vê como se erra.

## A estação de resultado

Os números-alvo, impressos: *"se o seu código estiver certo, X final = 8,75 g/L e o ART esgota em ≈ 4,5 h."* É o teste objetivo que ele aplica sozinho — curva parecida engana, `8,75` não.

**Confira os números antes de escrevê-los.** Rode o modelo de verdade, com tolerância apertada, e só então publique. Número-alvo errado é pior que número-alvo nenhum: ele manda o aluno caçar defeito em código correto.

Aqui entra a **primeira previsão** (veja abaixo).

## A estação de crítica

O que o modelo finge que não existe, e o que isso custa na resposta. Rendimento constante, volume constante, um substrato limitante, sem lag, sem morte celular, sem inibição. Cada hipótese com a consequência, não só o nome — é item de prova, não rodapé.

Aqui entra o **simulador de parâmetros** (`assets/simulador.js`) com controles deslizantes, e a **segunda previsão** antes dele.

## Previsão e revelação

O atrito da lição são **duas previsões**, e só:

1. antes dos números-alvo da estação de resultado;
2. antes do interativo da estação de crítica.

Cada uma é uma pergunta curta com um campo, e a resposta fica **atrás de um clique**. Sem isso a previsão vira ritual: o olho lê o número antes de a mão escrever.

```html
<div class="previsao">
  <p><strong>Antes de revelar:</strong> em quanto tempo o ART acaba — perto de 25 h, de 15 h, ou muito antes?</p>
  <textarea placeholder="Sua previsão, antes de abrir."></textarea>
</div>

<div class="revelar">
  <details>
    <summary>Revelar os números</summary>
    <p>X final = 8,75 g/L · ART esgotado em ≈ 4,5 h · etanol final = 67,5 g/L.</p>
  </details>
</div>
```

No simulador, `data-prever="1"` já faz esse papel: mantém as curvas ocultas até o clique.

Duas previsões, não quatro. Cada uma custa tempo dele e só se paga onde há algo objetivo para conferir depois.

## Equações

**Sempre MathML nativo** para equação exibida. Renderiza fração de verdade, subscrito de verdade, itálico matemático — sem biblioteca, sem fonte externa, e imprime bem:

```html
<math display="block">
  <mfrac><mrow><mi>d</mi><mi>S</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac>
  <mo>=</mo><mo>−</mo>
  <mfrac><mn>1</mn><msub><mi>Y</mi><mrow><mi>x</mi><mo>/</mo><mi>s</mi></mrow></msub></mfrac>
  <mo>⋅</mo><mi>μ</mi><mo>⋅</mo><mi>X</mi>
</math>
```

É verboso de escrever. É o custo de a equação sair com cara de livro didático em vez de linha de terminal, e ele é seu, não do aluno.

Regras:

- **Equação exibida** — sempre `<math display="block">`, dentro de `.equacao`.
- **Símbolo solto no meio da frase** — pode ser texto: `μ`, `Y<sub>x/s</sub>`, `dS/dt`. Não vale a pena marcar em MathML o que é uma letra.
- **Código Python nunca é MathML.** Código é `<pre><code>`, com a formatação de código.
- **Cada variável definida na primeira aparição**, com unidade.

## Exposição: o que fica e o que sai

**Fica:**

- as hipóteses do modelo, com a consequência de cada uma — é o que cai na prova;
- a nota lateral de curiosidade, **uma por lição no máximo**: a origem histórica, a ressalva boa. É o único enfeite tolerado, e existe porque uma lição sem nenhuma respiração vira manual;
- a pergunta de recuperação da lição anterior, **quando existir lição anterior** — três linhas, e é o único espaçamento que restou;
- a citação de fonte **onde há número**: parâmetro de literatura vem com organismo e condição, e link externo direto para a fonte.

**Sai:**

- o bloco "Leia isto" com leitura recomendada;
- link para `RESOURCES.md`, para `reference/`, para outras lições — **nenhum link interno**;
- citação em afirmação sem número;
- recapitulação do que já foi dito na própria lição;
- promessa de continuação: "na próxima lição veremos…" não existe mais.

## Quiz

**Duas perguntas**, ao final, ligadas ao que ele acabou de fazer. Use `assets/quiz.js`.

- **Recuperação, não reconhecimento.** Resposta numérica ou aberta vale mais que múltipla escolha.
- **Alternativas do mesmo tamanho.** Nenhuma pista de formatação — o `quiz.js` avisa no console quando os comprimentos denunciam.
- **Distratores vêm do catálogo** de concepções errôneas de [rules.md](./rules.md). Distrator que ninguém escolheria não mede nada.
- **Feedback explica o mecanismo**, não só corrige: "1/h, porque μ é taxa por unidade de biomassa — o X que multiplica é quem carrega g/L".

Duas, não quatro: a previsão já mediu se ele antecipou; o quiz mede se ficou.

## Tema claro e escuro

Toda lição carrega o botão de tema (`assets/tema.js`), que alterna claro e escuro e lembra a escolha entre lições. Dois estados apenas. Se o navegador bloquear o armazenamento — acontece abrindo por `file://` —, o botão continua funcionando naquela página.

## Nota de dúvida

Quando o aluno volta com uma pergunta sobre uma lição já entregue, a resposta vai para **dois lugares**: o chat, agora, e o **HTML daquela lição**, no ponto exato onde a dúvida surgiu.

```html
<p class="nota-duvida">
  <span class="rotulo">Dúvida — 30/08</span>
  Yx/s é gX/gS: divide-se o ganho de biomassa pelo rendimento para saber quanto
  substrato sumiu.
</p>
```

Também existe em linha: `<mark class="nota-duvida">…</mark>`.

- **No ponto exato**, não no rodapé.
- **Sempre a mesma classe**, sem variante inventada — é o que faz o aluno reconhecer que aquele trecho nasceu de uma pergunta dele.
- **Não apague o texto original.** Se ele estava errado, corrija e explique a correção na nota.
- **Reabra o arquivo** e diga em uma linha que ele foi atualizado.
- Costuma valer **registro de aprendizado**: é evidência de concepção corrigida ou lacuna revelada.

## A varredura de procedência

Antes de salvar, passe por **todo número do arquivo** — texto, tabela, `data-params`, quiz, números-alvo. Cada um cai em uma destas três caixas, e não existe quarta:

| Caixa | Como aparece |
|---|---|
| **Dado do enunciado** | Sem marca: veio com o exercício |
| **Fonte citada** | Link externo direto, com organismo e condição |
| **Suposição sua** | Marcada como suposição, com ordem de grandeza justificada e o teto físico quando existir |

Faixas e percentuais contam. "Entre 85 e 92% do teórico" soa como prosa, passa pela revisão, e chega ao aluno com autoridade de dado publicado — foi assim que vazou no Teste 1.

Sem fonte e com o número necessário: declare como estimativa sua e **abra uma lacuna em `RESOURCES.md`**, dizendo qual fonte falta.

Esta varredura é passo separado, feito no fim, com o arquivo pronto na frente. A regra de procedência já está escrita em três lugares desta skill e ainda assim escapou, porque escrever consome a atenção que a checagem exigiria.

## Requisitos técnicos

- **HTML autocontido**, exceto pelos componentes de `./assets/`. Abre com duplo clique, sem servidor e sem internet.
- **A lição funciona com o chat fechado e sem abrir outro arquivo.** É o teste: um aluno que abre a lição e nunca mais fala com você chega ao fim sabendo rodar aquele código.
- **Linka `assets/lesson.css`** e carrega `assets/tema.js`. Sempre.
- **Reusa `assets/quiz.js`, `assets/simulador.js` e `assets/variantes.js`** em vez de reimplementar.
- **Nenhum link para dentro do workspace.** Link externo, só para fonte de número.
- **Imprime bem** — `lesson.css` já traz as regras.
- **Todo código exibido roda**, com dependências declaradas.
- **Todo parâmetro tem unidade e procedência.**
- **Todo gráfico tem eixos rotulados com unidade.**

Comece a partir de [templates/licao.html](./templates/licao.html).

## Modos de falha

- **A aula de fermentação com um apêndice de código.** A teoria toma a lição, o código aparece no fim como resumo. Inverte a estrela da skill e é o modo de falha mais provável agora.
- **O tutorial que se lê no automático.** Tudo explicado, nada previsto, nenhum clique: o aluno acompanha, concorda e não retém. As duas previsões existem exatamente contra isso.
- **A lição que promete continuação.** "Na próxima veremos `solve_ivp`" — não existe próxima. A questão se resolve aqui.
- **A lição que manda abrir outro arquivo** para entender o que está lendo.
- **O explorador que ensina o erro.** Variantes são escolhas corretas entre si. Mostrar o sinal trocado produzindo curva errada é catálogo de defeito, não exploração.
- **O número sem caixa.** Faixa plausível escrita com autoridade de dado publicado.
- **O número-alvo errado.** Manda o aluno caçar defeito em código correto, e queima a confiança dele na lição inteira.
- **O quiz de reconhecimento.** Alternativas em que a certa é obviamente a certa.
