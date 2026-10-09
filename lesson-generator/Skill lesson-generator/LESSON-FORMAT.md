# Formato da Lição

Um arquivo HTML por exercício, nomeado pelo conteúdo em kebab-case: `cstr-estados-multiplos.html`, `flash-rachford-rice.html`. Ele resolve a questão inteira e não depende de nenhum outro arquivo além dos componentes de `./assets/`.

Comece de [templates/licao.html](./templates/licao.html). A marcação de cada peça mora lá, e copiar é mais rápido e mais fiel do que deduzir desta prosa.

## A forma: momentos fixos, conteúdo livre

A lição tem **cinco momentos, sempre nesta ordem**: abertura, modelo, código, resultado e sua vez. A ordem é fixa porque segue o caminho de quem aprende: saber do que se trata, entender as equações, ver o programa nascer, ler o resultado e programar sozinho.

O que vai **dentro** de cada momento é decisão sua, e é o exercício que manda: quantas equações, quantos passos, que tipo de figura, que verificação. Este documento diz para que serve cada momento e o que ele não pode deixar de fazer. Não diz como o problema se resolve, porque isso você já sabe.

**Não há teto de palavras.** A régua é o tempo do aluno, e ele se ganha **cortando o que não ensina**, não abreviando o que ensina:

- repetição, recapitulação, história e ressalva que não muda o que ele faz: cortar;
- definição de símbolo, contexto de equação e o porquê de uma decisão de código: **nunca cortar**.

## A cor ensina

A lição é **colorida de propósito**, porque cor bem usada é informação que o aluno lê sem esforço. Nenhuma cor é enfeite: cada uma marca uma categoria, e a categoria tem sempre a mesma cor na lição inteira.

- **Cada grandeza que aparece no gráfico tem a cor da sua série** em todo lugar onde aparece: na equação, na lista de símbolos, na tabela, no texto e na legenda. A primeira série é `var-1`, a segunda `var-2`, e assim por diante, na ordem de `series` do `registrar`. Quando o aluno vê C<sub>A</sub> em azul na equação, ele já sabe qual é a curva dela.
- **Parâmetros têm a cor de parâmetro** (`param`): tudo o que é dado fixo da conta, como constantes, vazões, volumes e concentrações de alimentação.
- **Grandeza que não está no gráfico nem é parâmetro** fica sem cor. Se ela importa a ponto de pedir cor, provavelmente pede uma curva.
- O nome da grandeza no texto também leva a cor: "o <span class="var-1">reagente A</span>" liga a frase à curva.

A marcação é a classe no elemento: `<msub class="var-1">` ou `<mi class="param">` no MathML, `<code class="var-1">` na lista e na tabela, `<span class="var-1">` no texto. O template mostra cada caso.

O resto da cor sai sozinho do CSS e dos componentes: o título de cada momento tem a sua cor, a procedência na tabela vira etiqueta colorida, e o código Python é pintado como numa IDE.

## 1. Abertura

Antes de tudo, **um parágrafo situando o problema**: que processo é esse, o que o enunciado pede e o que o aluno vai ter no fim. Três a cinco frases, para quem acabou de ler o enunciado e ainda não sabe por onde pegar. Sem ele, a primeira equação chega antes de o aluno saber do que se trata.

## 2. Modelo

As equações que o código vai resolver. Podem ser diferenciais, algébricas, um balanço, uma correlação, um modelo a ajustar: o que o exercício pedir.

### Balanço se deduz, do princípio até o modelo

**Toda equação de balanço (de massa, de componente, de energia, de quantidade de movimento) é deduzida na lição**, do princípio de conservação até a forma que o código usa, um passo por linha. Mostrar só a equação final ensina a resolver **este** exercício; mostrar de onde ela vem ensina a montar o balanço do próximo.

- **O título diz sempre a natureza do balanço**: de massa ou de energia (ou de quantidade de movimento), global ou de qual componente, e em que unidade ele é escrito. "Balanço de massa do componente A, em mols", "Balanço de energia do líquido do reator". A classe `balanco-massa`, `balanco-energia` ou `balanco-movimento` põe a etiqueta colorida antes do título, para que, numa lição com os dois, massa e energia se distingam de relance. A frase do princípio repete a natureza, e por que o balanço é escrito naquela unidade.
- **O primeiro passo é o princípio em palavras**: "acúmulo = entrada − saída + geração − consumo", com o volume de controle dito na frase.
- **O segundo traduz cada palavra em símbolos**, com uma chave sob cada termo dizendo qual palavra ele é. É o passo que o aluno mais erra sozinho.
- **Cada passo seguinte faz uma coisa só, e diz qual** com uma etiqueta de tipo:

| Tipo | O que o passo faz |
|---|---|
| `princípio` | A lei de conservação, em palavras |
| `tradução` | Palavras viram vazões, concentrações, volumes |
| `cinética` | Entra a lei de velocidade, ou outra relação constitutiva |
| `hipótese` | Uma simplificação física: volume constante, mistura perfeita, regime permanente, adiabático |
| `álgebra` | Rearranjo, divisão, substituição |
| `definição` | Um grupo ganha nome próprio, como τ = V/F |

- **A hipótese diz o que aconteceria se ela não valesse.** "Se o tanque estivesse enchendo, o volume precisaria de um balanço próprio." É a hipótese que muda de um exercício para outro, e é por ela que o aluno reconhece o próximo caso.
- **O último passo é a equação do modelo**, marcado como `final`. Ele leva as chaves e, **dentro dele**, o parágrafo que explica o que ela diz.
- **A dedução abre um passo de cada vez**, como os passos do código: o passo fechado mostra só a etiqueta do tipo do próximo ("próximo: hipótese"), e o aluno clica para ver qual é. Por isso tudo o que pertence a um passo fica dentro do `<li>` dele.
- **Dois balanços parecidos não repetem a dedução inteira.** O segundo mostra o princípio e a tradução, que mudam, e junta numa linha os passos iguais aos do primeiro, com as etiquetas de todos eles.

**Equação que não é balanço** (uma lei de velocidade dada, uma correlação, uma equação de estado) não se deduz: ela entra num bloco próprio, ou como passo de `cinética` dentro da dedução.

### Símbolos, chaves e frases

- **Defina cada símbolo no passo em que ele aparece pela primeira vez**, todos eles, com unidade. Um símbolo já definido não se define de novo.
- **A definição é uma frase completa, não uma etiqueta.** "C<sub>A</sub> — concentração do reagente A dentro do reator, mol/L", nunca "C<sub>A</sub> — concentração, mol/L". Concentração de quê, taxa de quem, medida onde: se a frase deixa a pergunta no ar, ela só nomeou o símbolo.
- **Cada termo com significado físico próprio ganha uma chave.** Numa equação de dois ou mais termos, ponha uma chave horizontal sob cada termo, com o que ele é em duas a cinco palavras: "acúmulo", "entra menos sai", "consumo pela reação". A chave mostra a **estrutura** da equação de relance; a lista de símbolos continua dizendo o que cada letra é. Não ponha chave em equação de um termo, nem em passo intermediário de pura álgebra, nem em termo de um símbolo só, **exceto no passo da tradução**: ali todo termo leva a sua palavra, até um "0" de entrada que não existe, porque é a chave que mostra de qual palavra cada termo veio.
- **A frase do passo diz o que foi feito e por quê**, em uma a três frases. O parágrafo depois da equação final monta a cena antes de concluir: o que a equação descreve no processo, e só então o que ela implica.

### Tabela e tipo de problema

Depois das deduções vem **a tabela de parâmetros**, com símbolo, valor, unidade e procedência. Ela guarda os números; as deduções guardam os significados. A procedência começa por uma etiqueta (`proc-enunciado`, `proc-derivado` ou `proc-escolha`), e o que vem depois dela é a conta ou a justificativa.

O momento fecha com **o tipo de problema**: duas ou três frases dizendo que problema matemático é este (valor inicial, sistema algébrico, problema de contorno, ajuste, otimização, o que for) e por que isso decide a ferramenta.

Sem história e sem recapitulação. A dedução é a única parte longa do modelo, e ela se paga: é o que o aluno reaproveita.

## 3. Código

O centro da lição. O aluno recebe o programa **explicado passo a passo**, numa linha do tempo como a da dedução: cada passo tem a sua bolinha numerada, e o próximo aparece fechado (a bolinha e o título) até o aluno clicar nele. O `assets/codigo.js` cuida do mecanismo; a lição só escreve os `.passo`.

- **O título do passo é o que o aluno vê antes de abrir**, então ele precisa dizer o que vem sem entregar a resposta: "Os balanços de A e de B", não "O balanço de B tem dois termos".

- **Use quantos passos o programa pedir, até seis**, seguindo as divisões naturais dele.
- **Cada passo tem um título curto, o trecho e o porquê.** O comentário no código cobre o "o quê"; o parágrafo cobre a decisão. Por que este método e não outro, por que esta tolerância, por que um evento em vez de ler o instante no gráfico.
- **O código não explica o óbvio.** "Aqui importamos o numpy" não ensina nada.
- **A verificação é obrigatória.** A lição mostra pelo menos uma conta independente que confere o resultado: a solução analítica de um caso particular, um balanço que fecha, um caso-limite que dá o valor conhecido. Pode ser um passo próprio ou um `.confira` dentro de um passo. Saber desconfiar do número que o programa imprime é metade de saber programar uma simulação.
- **Um número que sai de método numérico tem o critério dito no passo onde o método é escolhido.** Ali o critério é o porquê de uma decisão de código, não uma ressalva.
- **O programa completo é executável**, com dependências declaradas e unidades em comentário. É dele que o aluno copia.
- **O código sai colorido como numa IDE**, sem nada a fazer: o `codigo.js` pinta todo `<pre><code>` da lição como Python. Um bloco que não seja Python leva `class="sem-realce"`.
- **A resposta fica atrás de um botão** que só abre e mostra.

## 4. Resultado

A figura que responde o exercício, e a leitura **daquele** resultado.

**A figura é a que a pergunta pede.** Pode ser uma grandeza contra o tempo, um perfil ao longo do reator, uma varredura de parâmetro, uma curva de equilíbrio ou dados contra o modelo ajustado. O `assets/grafico.js` desenha qualquer x contra y: a lição registra a conta (a mesma do programa Python, traduzida para JS) e ele cuida de eixos, legenda, controles e tema. O contrato completo está no cabeçalho do arquivo, e o essencial está no template.

- **Um painel por canvas**, na largura da coluna e com 320 a 420 px de altura. Duas figuras no máximo, cada uma no seu canvas.
- **Use um segundo eixo quando a escala pedir.** Duas grandezas na mesma unidade, mas com ordens de grandeza diferentes, não cabem no mesmo eixo: a menor vira uma reta rente ao fundo. O `grafico.js` avisa no console quando isso acontece.
- **Até quatro controles, cada um convocado pela sua própria observação.** Controle que nenhuma frase manda mexer é ruído.
- **A faixa e o passo de cada controle precisam alcançar o que a observação manda procurar.** Se a observação diz "leve até 222" e o passo é 5, o slider para em 220 e em 225.
- **As observações são uma linha do tempo** (`ol.observacoes`), abertas uma de cada vez, e a figura fica sempre à vista. Cada observação tem um título (`h3`), que é o que o aluno vê com ela fechada: uma pergunta ("Por que B demora mais que A?") ou, nas de controle, a ação ("Leve k até 0,30 1/min"). Nunca a conclusão.
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
- **A aula de teoria com apêndice de código**: o modelo cresce além da dedução dos balanços, e o código vira resumo.
- **O balanço que cai pronto**: a equação do modelo aparece sem a dedução, ou com a hipótese misturada à álgebra sem etiqueta.
- **O tipo de problema calado**: o código aparece sem que a lição diga que problema matemático ele resolve.
- **O número sem verificação**: a lição confia no que o programa imprimiu e não mostra como desconfiar.
- **A figura que não comunica**: a curva que o texto discute é uma reta rente ao fundo.
- **O slider decorativo**, que nenhuma observação manda mexer.
- **A análise genérica**, que serviria para qualquer exercício.
- **A "sua vez" que é só trocar um número**, e por isso não exige programar nada.
- **O número citado que o programa não imprime.**
