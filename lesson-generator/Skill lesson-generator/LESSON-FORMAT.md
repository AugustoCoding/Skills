# Formato da Lição

Um arquivo HTML por exercício, nomeado pelo conteúdo em kebab-case: `cstr-estados-multiplos.html`, `flash-rachford-rice.html`. Ele resolve a questão inteira e não depende de nenhum outro arquivo além dos componentes de `./assets/`.

Comece de [templates/licao.html](./templates/licao.html). A marcação de cada peça mora lá, e copiar é mais rápido e mais fiel do que deduzir desta prosa.

## A forma: momentos fixos, conteúdo livre

A lição tem **cinco momentos, sempre nesta ordem**: abertura, modelo, código, resultado e sua vez. A ordem é fixa porque segue o caminho de quem aprende: saber do que se trata, entender as equações, ver o programa nascer, ler o resultado e programar sozinho.

O que vai **dentro** de cada momento é decisão sua, e é o exercício que manda: quantas equações, quantos passos, que tipo de figura, que verificação. Este documento diz para que serve cada momento e o que ele não pode deixar de fazer. Não diz como o problema se resolve, porque isso você já sabe.

**Não há teto de palavras.** A régua é o tempo do aluno, e ele se ganha **cortando o que não ensina**, não abreviando o que ensina:

- repetição, recapitulação, história e ressalva que não muda o que ele faz: cortar;
- definição de símbolo, contexto de equação e o porquê de uma decisão de código: **nunca cortar**.

## 1. Abertura

Antes de tudo, **um parágrafo situando o problema**: que processo é esse, o que o enunciado pede e o que o aluno vai ter no fim. Três a cinco frases, para quem acabou de ler o enunciado e ainda não sabe por onde pegar. Sem ele, a primeira equação chega antes de o aluno saber do que se trata.

## 2. Modelo

As equações que o código vai resolver, e nada além delas. Podem ser diferenciais, algébricas, um balanço, uma correlação, um modelo a ajustar: o que o exercício pedir.

**Uma equação por bloco, e cada bloco se explica sozinho**, nesta ordem: equação, símbolos daquela equação, o que ela diz. Nunca despeje as equações em sequência deixando as definições para depois, porque quem lê a terceira já esqueceu o símbolo da primeira.

- **Defina só os símbolos daquela equação**, todos eles, com unidade. Um símbolo que já foi definido não se define de novo.
- **A definição é uma frase completa, não uma etiqueta.** "C<sub>A</sub> — concentração do reagente A dentro do reator, mol/L", nunca "C<sub>A</sub> — concentração, mol/L". Concentração de quê, taxa de quem, medida onde: se a frase deixa a pergunta no ar, ela só nomeou o símbolo.
- **A frase de fecho monta a cena antes de concluir.** Diga o que a equação descreve no processo, e só então o que ela implica. Use duas a quatro frases por bloco; menos que isso vira telegrama.

Depois dos blocos vem **a tabela de parâmetros**, com símbolo, valor, unidade e procedência. Ela guarda os números; os blocos guardam os significados.

O momento fecha com **o tipo de problema**: duas ou três frases dizendo que problema matemático é este (valor inicial, sistema algébrico, problema de contorno, ajuste, otimização, o que for) e por que isso decide a ferramenta. É a parte que o aluno leva para o próximo exercício, que nunca vai ser igual a este.

Sem história, sem derivação e sem recapitulação. Quem já sabe aquilo passa os olhos em quinze segundos.

## 3. Código

O centro da lição. O aluno recebe o programa **explicado passo a passo**, e cada passo é uma revelação: ele clica e o próximo aparece. O `assets/codigo.js` cuida do mecanismo.

- **Use quantos passos o programa pedir, até seis**, seguindo as divisões naturais dele.
- **Cada passo tem um título curto, o trecho e o porquê.** O comentário no código cobre o "o quê"; o parágrafo cobre a decisão. Por que este método e não outro, por que esta tolerância, por que um evento em vez de ler o instante no gráfico.
- **O código não explica o óbvio.** "Aqui importamos o numpy" não ensina nada.
- **A verificação é obrigatória.** A lição mostra pelo menos uma conta independente que confere o resultado: a solução analítica de um caso particular, um balanço que fecha, um caso-limite que dá o valor conhecido. Pode ser um passo próprio ou um `.confira` dentro de um passo. Saber desconfiar do número que o programa imprime é metade de saber programar uma simulação.
- **Um número que sai de método numérico tem o critério dito no passo onde o método é escolhido.** Ali o critério é o porquê de uma decisão de código, não uma ressalva.
- **O programa completo é executável**, com dependências declaradas e unidades em comentário. É dele que o aluno copia.
- **A resposta fica atrás de um botão** que só abre e mostra.

## 4. Resultado

A figura que responde o exercício, e a leitura **daquele** resultado.

**A figura é a que a pergunta pede.** Pode ser uma grandeza contra o tempo, um perfil ao longo do reator, uma varredura de parâmetro, uma curva de equilíbrio ou dados contra o modelo ajustado. O `assets/grafico.js` desenha qualquer x contra y: a lição registra a conta (a mesma do programa Python, traduzida para JS) e ele cuida de eixos, legenda, controles e tema. O contrato completo está no cabeçalho do arquivo, e o essencial está no template.

- **Um painel por canvas**, na largura da coluna e com 320 a 420 px de altura. Duas figuras no máximo, cada uma no seu canvas.
- **Use um segundo eixo quando a escala pedir.** Duas grandezas na mesma unidade, mas com ordens de grandeza diferentes, não cabem no mesmo eixo: a menor vira uma reta rente ao fundo. O `grafico.js` avisa no console quando isso acontece.
- **Até quatro controles, cada um convocado pela sua própria observação.** Controle que nenhuma frase manda mexer é ruído.
- **A faixa e o passo de cada controle precisam alcançar o que a observação manda procurar.** Se a observação diz "leve até 222" e o passo é 5, o slider para em 220 e em 225.
- **Escreva duas a quatro observações de leitura da curva, mais uma por controle.** Cada uma fica ancorada num ponto concreto **deste** resultado: por que uma curva cai quando a outra sobe, o que acontece onde elas se cruzam, por que a inflexão está ali.
- **Cada observação traz um insight diferente.** Se duas explicam a mesma coisa com palavras diferentes, junte numa só.
- **A observação de controle tem o seu `.no-seu-codigo`**: a mesma mudança feita no programa Python, e o que ele deve imprimir. O slider mostra a resposta, mas é no terminal que o aluno aprende.
- **Use um nome por grandeza na lição inteira.** Se a legenda diz "reagente A", o texto diz "reagente A", nunca "o reagente" num lugar e "C<sub>A</sub>" em outro.

**O teste que separa análise de enchimento de linguiça:** se a frase serviria para outro exercício, ela não é análise deste caso. Corte.

Também não fale do que o modelo ignora. Uma lista de hipóteses não é o que o aluno veio aprender.

## 5. Sua vez

Uma variação do exercício para o aluno programar sozinho, partindo do programa da lição. É o único momento em que ele produz em vez de ler, e é ele que transforma "entendi" em "sei fazer".

- **Mude uma coisa que obrigue a mexer no código**, não só num número: outro regime de operação, um termo novo na equação, um evento diferente, outra grandeza a encontrar. Trocar só um parâmetro o slider já faz.
- **A variação cabe em poucas linhas de mudança.** O objetivo é aplicar o que acabou de ver, não começar outro projeto.
- **Dê uma dica**, que aponta onde no programa a mudança acontece sem escrever o código.
- **Dê a resposta**: o número que ele deve achar e só as linhas que mudam. Você chega nesse número **rodando** a variação, como qualquer outro número da lição.

## A caixa de ferramentas

Os elementos abaixo são opcionais. Use cada um quando ele pagar o tempo que custa. A lista não é exaustiva: se o exercício pede algo que não está aqui, faça.

| Elemento | Quando paga | Marcação |
|---|---|---|
| **Pense antes** | No passo em que prever ensina mais que ler: o sinal de um termo, a condição de parada, o chute inicial. Uma ou duas vezes por lição, não em todo passo | `<p class="pense">` dentro do `.passo`; o código só aparece depois do clique |
| **O erro que parece certo** | Quando existe um erro plausível que o aluno provavelmente cometeria, como unidade trocada, sinal invertido, chute inicial que cai na raiz errada ou passo grosso demais. Diga o erro **e o sintoma** pelo qual ele se denuncia na saída | `<div class="armadilha">` |
| **Conferência extra** | Quando uma segunda verificação, diferente da primeira, pega outra classe de erro | `<div class="confira">` |
| **Segundo eixo** | Duas grandezas com escalas muito diferentes na mesma figura | `{ nome, eixo: 2 }` e `eixoY2` no `registrar` |
| **Dados contra modelo** | Exercício de ajuste: os pontos medidos e a curva ajustada na mesma figura | `{ nome, tipo: "pontos" }` |
| **Tabela de resultados** | Quando a resposta é um punhado de valores discretos, e uma curva entre eles não ensinaria nada | `<table>` |
| **Diagrama** | Quando a geometria ou os fluxos importam para escrever o balanço, como correntes, reciclo ou volume de controle | SVG em linha, com as cores do CSS |
| **Nota lateral** | Para um comentário que enriquece mas não pode interromper a leitura | `<aside class="lateral">` |
| **Termo destacado** | Um ou dois por momento, para o conceito que o aluno vai reencontrar | `<span class="termo">` |
| **Cor da grandeza no texto** | Quando o texto cita muito uma curva, a cor liga a frase à figura | `<span class="var-1">` … `var-4`, na ordem das séries |

Componente novo só para o que não é x contra y, como um diagrama interativo ou um mapa de cores. Ele fica em `assets/` da pasta da lição e segue as convenções descritas no cabeçalho do `grafico.js`.

## Os números

Antes de salvar, passe por **todo número do arquivo**: texto, tabela, `padroes`, resposta e sua vez. Cada um cai numa destas caixas:

| Caixa | Como aparece |
|---|---|
| **Dado do enunciado** | Sem marca |
| **Derivado do enunciado** | Sem marca, mas com a conta visível na lição ou no código |
| **Escolha sua** | Marcada como tal na tabela, com a justificativa em meia linha. Contam aqui condições iniciais, horizontes, chutes e tolerâncias que o enunciado não deu |

**Todo número que a lição cita é impresso pelo programa que ela entrega.** Se você escreve "a conversão chega a 90% em 18,5 min", o programa acha esse instante. Se calcular um número exigiria um passo a mais do que a lição comporta, **não cite o número**. Número que só existiu no seu rascunho é resultado entregue pronto, e o aluno veio aprender a calculá-lo.

**Faça a varredura procurando dígitos, não lendo.** Passe um `grep` por todos os algarismos do arquivo e confira um a um. O número escondido no meio de uma frase é onde a procedência vaza, e contam também faixas, percentuais e ordens de grandeza "ilustrativas".

**A faixa de um slider é configuração, não afirmação**: não precisa de procedência, mas precisa fazer sentido físico.

**Não cite literatura.** Uma citação lembrada de memória tem cara de dado verificado e não é.

## Equações

- **Equação exibida é sempre MathML**: fração de verdade, sem biblioteca e sem fonte externa. O template traz uma equação com fração e outra com subíndice para copiar.
- Um símbolo solto no meio da frase pode ser texto: `k`, `C<sub>A</sub>`.
- **Código nunca é MathML.** Código é `<pre><code>`.

## Nota de dúvida

Quando o aluno volta com uma pergunta, a resposta vai para o chat **e** para o HTML, no ponto exato onde a dúvida surgiu: `<p class="nota-duvida">` com um `span.rotulo` datado, ou `<mark class="nota-duvida">` em linha. Use sempre esta classe e nunca apague o original. Se o trecho estava errado, corrija e explique a correção na nota.

## Requisitos técnicos

- **Autocontido**, exceto pelos componentes de `./assets/`. Abre sem internet.
- **Carrega** `lesson.css`, `tema.js` e `codigo.js`, mais `grafico.js` se houver figura, mais qualquer componente que você escrever. Copie para a pasta só o que a lição carrega.
- **Nenhum link que tire o aluno da lição.**
- **Todo código exibido roda. Todo parâmetro tem unidade. Todo eixo tem rótulo com unidade.**
- A lição não promete continuação: a questão se resolve ali.

## Modos de falha

- **A definição-etiqueta**, que nomeia o símbolo e não define nada.
- **A lição que começa na equação**, sem a abertura.
- **A aula de teoria com apêndice de código**: o modelo cresce e o código vira resumo.
- **O tipo de problema calado**: o código aparece sem que a lição diga que problema matemático ele resolve.
- **O número sem verificação**: a lição confia no que o programa imprimiu e não mostra como desconfiar.
- **A figura que não comunica**: a curva que o texto discute é uma reta rente ao fundo.
- **O slider decorativo**, que nenhuma observação manda mexer.
- **A análise genérica**, que serviria para qualquer exercício.
- **A "sua vez" que é só trocar um número**, e por isso não exige programar nada.
- **O número citado que o programa não imprime.**
