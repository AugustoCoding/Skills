---
name: lesson-generator
description: Transforma um exercício de engenharia química numa lição HTML interativa que ensina o aluno a programar a solução em Python.
disable-model-invocation: true
allow_implicit_invocation: false
argument-hint: "Cole o exercício que você quer aprender a resolver programando"
---

O aluno tem um exercício de engenharia química na mão e quer sair sabendo **programar a solução em Python**. Você transforma o exercício numa lição: um arquivo HTML que ele abre, percorre e usa para escrever o código.

**A régua é a reação dele no fim:** *"ganhei muito com isso, e foi rápido demais"*. As duas metades contam. Uma lição correta e completa que custou meia hora falhou tanto quanto uma lição rasa, e é essa régua que decide qualquer dúvida de desenho que este documento não responda.

**A engenharia e a programação são suas.** Você sabe resolver o exercício, de qualquer área, e sabe escolher a técnica: integrar, achar raiz, ajustar, otimizar, discretizar. A skill não traz teoria nem catálogo de técnicas, de propósito: uma lista de métodos viraria o formato que todo exercício tenta imitar. **A forma pedagógica é da skill**: este documento, o esqueleto em [templates/licao.html](./templates/licao.html) e os componentes em `assets/`.

## Precisa de um exercício

A skill só funciona em cima de um problema concreto: uma questão de lista, uma prova antiga, um caso de planta. Se o pedido for genérico ("me ensina reator tubular"), **diga em uma linha que a skill precisa de um enunciado e responda normalmente**, como assistente comum, sem produzir lição:

> "Essa skill monta a lição em cima de um exercício seu. Sem um, te explico direto aqui."

## Como a sessão corre

O aluno manda o exercício e ativa a skill. É só isso que acontece na entrada.

**Você não o entrevista.** Não pergunta o nível dele, até onde ele chegou nem onde salvar. O que precisaria ser perguntado, você infere do enunciado. **Você não guarda estado**: cada sessão trata de um exercício e termina nele, e o que dura é o HTML.

1. **Leia o enunciado como diagnóstico**: o que ele pede de fato, que dados dá e quais faltam, e **que tipo de problema matemático** ele é. A lição vai dizer isso ao aluno.
2. **Ache os números** ([Os números](#os-números)). Rode também **os passos da lição colados em ordem**: é exatamente o programa que o aluno vai montar no editor, e ele tem de rodar e imprimir os mesmos números.
3. **Escreva a lição** a partir de [templates/licao.html](./templates/licao.html), seguindo [A lição](#a-lição). A marcação de cada peça mora no template: copiar é mais rápido e mais fiel do que deduzir desta prosa.
4. **Veja a lição rodando antes de entregar.** Por `file://` o JS não carrega os `./assets/`, então suba um servidor na pasta da lição e abra por `http://`:

   ```
   python -m http.server 8730 --bind 127.0.0.1
   ```

   Confira que as figuras desenham, que os passos abrem, que o tema alterna e que cada bloco de código tem o seu "→ editor". (O editor em si precisa de internet para baixar o Python; não dependa dele para conferir a lição.) **Leia o console**: o `grafico.js` avisa ali sobre curva achatada, controle sem faixa e valor não finito, coisas que você não enxergaria de outro jeito. Depois derrube o servidor e **abra o arquivo** para o aluno com um comando de CLI.
5. **Fale pouco**: diga onde escreveu e convide a perguntar, em duas linhas. Repetir a lição no chat desfaz o motivo de ela existir.

## Onde escrever

Esta é a decisão em que a skill mais erra, então siga à risca:

- **O aluno indicou uma pasta?** Escreva **diretamente nela**. Não crie subpasta dentro.
- **Não indicou?** Use `./licoes/` no diretório atual, criando-a se preciso.

```
licoes/
  assets/                    os componentes que a lição carrega, copiados da skill
  nome-do-exercicio.html     uma lição por exercício, em kebab-case: cstr-partida.html
```

Copie da skill **só os componentes que a lição carrega**, e atualize a cópia se a da skill for mais nova. Componente que você escrever fica nesse `assets/`, não na skill.

Nada de contabilidade: nenhum arquivo de estado, índice, registro ou anotação sobre o aluno. A pasta da skill é **somente leitura**.

## A lição

Um arquivo HTML por exercício, que resolve a questão inteira. Ela tem **quatro momentos, sempre nesta ordem**: abertura, modelo, código e resultado. A ordem segue o caminho de quem aprende: saber do que se trata, entender as equações, ver o programa nascer e ler o resultado. Não há exercício extra no fim: o aluno veio resolver o problema dele, e a lição termina nele.

O que vai **dentro** de cada momento é decisão sua, e é o exercício que manda: quantas equações, quantos passos, que figura, que verificação. Abaixo está para que serve cada momento e o que ele não pode deixar de fazer.

**Não há teto de palavras.** A régua é o tempo do aluno, e ele se ganha **cortando o que não ensina**, não abreviando o que ensina:

- repetição, recapitulação, história e ressalva que não muda o que ele faz: cortar;
- definição de símbolo, contexto de equação e o porquê de uma decisão de código: **nunca cortar**.

### A cor ensina

A lição é **colorida de propósito**, porque cor bem usada é informação que o aluno lê sem esforço. Nenhuma cor é enfeite: cada uma marca uma categoria, e a categoria tem sempre a mesma cor na lição inteira.

- **Cada grandeza que aparece no gráfico tem a cor da sua série** em todo lugar: na equação, na lista de símbolos, na tabela, no texto e na legenda. A primeira série é `var-1`, a segunda `var-2`, na ordem de `series` do `registrar`. Quando o aluno vê C<sub>A</sub> em azul na equação, já sabe qual é a curva dela. O nome no texto também leva a cor: "o <span class="var-1">reagente A</span>".
- **Parâmetros têm a cor de parâmetro** (`param`): tudo o que é dado fixo da conta, como constantes, vazões, volumes e concentrações de alimentação.
- **Grandeza que não está no gráfico nem é parâmetro** fica sem cor. Se ela importa a ponto de pedir cor, provavelmente pede uma curva.

A marcação é a classe no elemento (`<msub class="var-1">` no MathML, `<code class="var-1">` na lista e na tabela, `<span class="var-1">` no texto). O resto da cor sai sozinho: o título de cada momento, as etiquetas de procedência e o realce do código.

### 1. Abertura

Antes de tudo, **um parágrafo situando o problema**: que processo é esse, o que o enunciado pede e o que o aluno vai ter no fim. Três a cinco frases, para quem acabou de ler o enunciado e ainda não sabe por onde pegar. Sem ele, a primeira equação chega antes de o aluno saber do que se trata.

### 2. Modelo

As equações que o código vai resolver: diferenciais, algébricas, um balanço, uma correlação, um modelo a ajustar.

**Todo balanço (de massa, de componente, de energia, de quantidade de movimento) é deduzido**, do princípio de conservação até a forma que o código usa, um passo por linha. Mostrar só a equação final ensina a resolver **este** exercício; mostrar de onde ela vem ensina a montar o balanço do próximo.

- **O título diz a natureza do balanço**: massa ou energia (ou quantidade de movimento), global ou de qual componente, e em que unidade. "Balanço de massa do componente A, em mols". A classe `balanco-massa`, `balanco-energia` ou `balanco-movimento` põe a etiqueta colorida antes do título.
- **O primeiro passo é o princípio em palavras** ("acúmulo = entrada − saída + geração − consumo"), com o volume de controle e a unidade ditos na frase.
- **O segundo traduz cada palavra em símbolos**, com uma chave sob cada termo dizendo qual palavra ele é. É o passo que o aluno mais erra sozinho.
- **Cada passo seguinte faz uma coisa só, e diz qual** com uma etiqueta de tipo: `princípio` (a conservação em palavras), `tradução` (palavras viram vazões e concentrações), `cinética` (a lei de velocidade ou outra relação constitutiva), `hipótese` (volume constante, mistura perfeita, regime permanente, adiabático), `álgebra` (rearranjo, substituição) ou `definição` (um grupo ganha nome, como τ = V/F).
- **A hipótese diz o que aconteceria se ela não valesse**: "se o tanque estivesse enchendo, o volume precisaria de um balanço próprio". É a hipótese que muda de um exercício para outro.
- **O último passo é a equação do modelo** (`final`). Ele leva as chaves e, **dentro dele**, o parágrafo que explica o que ela diz: monte a cena (o que a equação descreve no processo) antes de concluir o que ela implica.
- **A dedução abre um passo de cada vez**, e o passo fechado mostra só a etiqueta do próximo ("próximo: hipótese"). Por isso tudo o que pertence a um passo fica dentro do `<li>` dele.
- **Dois balanços parecidos não repetem a dedução inteira**: o segundo mostra o princípio e a tradução, e junta numa linha os passos iguais aos do primeiro, com todas as etiquetas.

**Equação que não é balanço** (lei de velocidade dada, correlação, equação de estado) não se deduz: entra num bloco próprio, ou como passo de `cinética`.

**Símbolos e chaves:**

- **Defina cada símbolo onde ele aparece pela primeira vez**, com unidade, e não o defina de novo.
- **A definição é uma frase completa, não uma etiqueta.** "C<sub>A</sub> — concentração do reagente A dentro do reator, mol/L", nunca "C<sub>A</sub> — concentração, mol/L". Concentração de quê, taxa de quem, medida onde: se a frase deixa a pergunta no ar, ela só nomeou o símbolo.
- **Cada termo com significado físico próprio ganha uma chave**, com o que ele é em duas a cinco palavras: "acúmulo", "entra menos sai", "consumo pela reação". Sem chave em equação de um termo, em passo de pura álgebra ou em termo de um símbolo só, **exceto na tradução**, onde todo termo leva a sua palavra, até um "0".
- **Equação exibida é sempre MathML**, sem biblioteca. Símbolo solto no meio da frase pode ser texto: `k`, `C<sub>A</sub>`. Código nunca é MathML.

Depois das deduções vem **a tabela de parâmetros** (símbolo, valor, unidade, procedência). Ela guarda os números; as deduções guardam os significados. A procedência começa por uma etiqueta (`proc-enunciado`, `proc-derivado` ou `proc-escolha`), seguida da conta ou da justificativa.

O momento fecha com **o tipo de problema**: duas ou três frases dizendo que problema matemático é este (valor inicial, sistema algébrico, contorno, ajuste, otimização) e por que isso decide a ferramenta. É a parte que o aluno leva para o próximo exercício.

A dedução é a única parte longa do modelo. Fora dela, ele não cresce: sem história e sem recapitulação, ou a lição vira uma aula de teoria com um apêndice de código.

### 3. Código

O centro da lição: o programa **explicado passo a passo**, numa linha do tempo. O próximo passo aparece fechado (a bolinha e o título) até o aluno clicar nele; o `codigo.js` cuida disso, e a lição só escreve os `.passo`.

- **Até seis passos**, seguindo as divisões naturais do programa.
- **O título do passo é o que o aluno vê antes de abrir**: diz o que vem sem entregar a resposta. "Os balanços de A e de B", não "O balanço de B tem dois termos".
- **Cada passo tem o trecho e o porquê.** O comentário no código cobre o "o quê"; o parágrafo cobre a decisão: por que este método, esta tolerância, um evento em vez de ler o instante no gráfico. Sem explicar o óbvio ("aqui importamos o numpy").
- **A verificação é obrigatória**: pelo menos uma conta independente que confere o resultado, como a solução analítica de um caso particular, um balanço que fecha ou um caso-limite. Num passo próprio ou num `.confira`. Saber desconfiar do número que o programa imprime é metade de saber programar uma simulação.
- **O critério de um número numérico vai no passo onde o método é escolhido**: ali ele é o porquê de uma decisão, não uma ressalva.
- **Os passos, colados em ordem, são o programa completo, e rodam.** O aluno monta o programa no editor trazendo passo por passo; se um passo depende de uma linha que nenhum passo mostrou, ou repete um import, o programa dele quebra. Só os comentários de seção podem existir apenas no programa completo.
- **O programa completo e a resposta ficam no fim**, atrás de botões que só abrem e mostram. O programa é executável, com dependências declaradas e unidades em comentário.

### 4. Resultado

A figura que responde o exercício, e a leitura **daquele** resultado.

**A figura é a que a pergunta pede**: uma grandeza contra o tempo, um perfil ao longo do reator, uma varredura de parâmetro, uma curva de equilíbrio, dados contra o modelo ajustado. O `grafico.js` desenha qualquer x contra y: a lição registra a conta (a mesma do programa, em JS) e ele cuida de eixos, legenda, controles e tema. O contrato está no cabeçalho do arquivo; o essencial, no template.

- **Um painel por canvas**, com 320 a 420 px de altura. Duas figuras no máximo.
- **Segundo eixo quando a escala pedir**: duas grandezas de ordens de grandeza diferentes no mesmo eixo viram, a menor, uma reta rente ao fundo. O `grafico.js` avisa no console.
- **Até quatro controles, cada um convocado pela sua própria observação**, com faixa e passo que alcançam o que ela manda procurar: se a observação diz "leve até 222" e o passo é 5, o slider para em 220 e em 225.
- **As observações são uma linha do tempo** (`ol.observacoes`), abertas uma de cada vez, com a figura sempre à vista. O título de cada uma é o que se vê com ela fechada: uma pergunta ("Por que B demora mais que A?") ou, nas de controle, a ação ("Leve k até 0,30 1/min"). Nunca a conclusão.
- **Duas a quatro observações de leitura da curva, mais uma por controle**, cada uma ancorada num ponto concreto **deste** resultado e com um insight próprio: se duas explicam a mesma coisa, junte.
- **A observação de controle tem o seu `.no-seu-codigo`**: a mesma mudança no programa que o aluno montou no editor, e o que ele deve imprimir. O slider mostra a resposta, mas é mexendo no código que ele aprende.
- **Um nome por grandeza na lição inteira**: se a legenda diz "reagente A", o texto nunca diz "o reagente" num lugar e "C<sub>A</sub>" em outro.

**O teste da análise:** se a frase serviria para outro exercício, ela não é análise deste caso. Corte. E não fale do que o modelo ignora: uma lista de hipóteses não é o que o aluno veio aprender.

### O editor

Toda lição tem, ao lado, **um editor de Python que roda ali mesmo**. Ele vem sozinho com o `editor.js`, e a lição não escreve nada para ele: uma bolinha na borda direita abre o painel, o editor começa vazio, cada bloco de código ganha um "→ editor" que acrescenta o trecho ao fim do programa, e embaixo fica a saída, com o `print`, os erros e as figuras do matplotlib. É por causa dele que os passos colados precisam formar o programa, e que o `.no-seu-codigo` fala do programa montado.

### A caixa de ferramentas

Opcionais: use cada uma quando ela pagar o tempo que custa. A lista não é exaustiva.

| Elemento | Quando paga | Marcação |
|---|---|---|
| **Pense antes** | No passo em que prever ensina mais que ler: o sinal de um termo, a condição de parada, o chute inicial. Uma ou duas vezes por lição | `<p class="pense">` no `.passo` |
| **O erro que parece certo** | Um erro plausível (unidade trocada, sinal invertido, chute na raiz errada), dito **com o sintoma** pelo qual ele aparece na saída | `<div class="armadilha">` |
| **Conferência extra** | Uma segunda verificação que pega outra classe de erro | `<div class="confira">` |
| **Segundo eixo** | Duas grandezas de escalas muito diferentes na mesma figura | `{ nome, eixo: 2 }` e `eixoY2` |
| **Dados contra modelo** | Exercício de ajuste: pontos medidos e curva ajustada | `{ nome, tipo: "pontos" }` |
| **Tabela de resultados** | A resposta é um punhado de valores discretos | `<table>` |
| **Diagrama** | Geometria ou fluxos importam para o balanço: correntes, reciclo, volume de controle | SVG em linha, cores do CSS |
| **Nota lateral** | Um comentário que enriquece sem interromper | `<aside class="lateral">` |
| **Termo destacado** | Um ou dois por momento, para o conceito que volta | `<span class="termo">` |

Componente novo só para o que não é x contra y, como um diagrama interativo. Ele fica no `assets/` da lição e segue as convenções do cabeçalho do `grafico.js`.

## Os números

**Resolva analiticamente primeiro**, sempre que existir solução fechada: sai de uma linha de álgebra e é mais confiável que o método numérico. **Use o numérico para confirmar, não para descobrir.** Os dois batendo é o que autoriza publicar o número; quando discordam, o errado é quase sempre o numérico, que perto de uma bifurcação ou de uma raiz múltipla devolve com toda a calma um valor plausível e errado.

**Gaste pouco nisso.** Uma dúzia de pontos resolvidos numericamente sustenta uma lição; avaliar fórmula fechada é grátis. Se um script passar de meio minuto, o problema é o script. Sem solução analítica, use tolerância apertada, e o critério vai para o passo do código onde o método é escolhido. Isso vale sobretudo para instantes, picos e cruzamentos citados nas observações: o valor final chama atenção, os números de meio de curva passam batidos.

**Todo número que a lição cita é impresso pelo programa que ela entrega.** Se você escreve "a conversão chega a 90% em 18,5 min", o programa acha esse instante. Se calcular um número exigiria um passo a mais do que a lição comporta, **não cite o número**. Número que só existiu no seu rascunho é resultado entregue pronto.

**Antes de salvar, passe um `grep` por todos os algarismos do arquivo** (texto, tabela, `padroes`, resposta) e confira um a um. O número escondido no meio de uma frase é onde a procedência vaza, e contam também faixas, percentuais e ordens de grandeza "ilustrativas". Cada um cai numa caixa:

- **Dado do enunciado**: sem marca.
- **Derivado do enunciado**: sem marca, mas com a conta visível na lição ou no código.
- **Escolha sua**: marcada na tabela, com a justificativa em meia linha. Contam aqui condições iniciais, horizontes, chutes e tolerâncias que o enunciado não deu.

A faixa de um slider é configuração, não afirmação: não precisa de procedência, mas precisa fazer sentido físico. **Não cite literatura**: uma citação lembrada de memória tem cara de dado verificado e não é.

## Requisitos técnicos

- **Autocontida**, exceto pelos componentes de `./assets/`. Abre e funciona sem internet, com uma exceção: o editor baixa o Python (Pyodide) no primeiro "Rodar".
- **Carrega** `lesson.css`, `tema.js`, `codigo.js` e `editor.js` (depois do `codigo.js`, de quem usa o realce), mais `grafico.js` se houver figura e qualquer componente que você escrever.
- **Só bibliotecas que o Pyodide tem**: numpy, scipy, matplotlib, pandas, sympy. Se o exercício pedir outra (CoolProp, Cantera…), use-a, mas diga no passo que a importa que aquele trecho só roda no Python do computador.
- **Todo código exibido roda. Todo parâmetro tem unidade. Todo eixo tem rótulo com unidade.** O código sai colorido como numa IDE sem nada a fazer; um bloco que não seja Python leva `class="sem-realce"`.
- **Nenhum link que tire o aluno da lição**, e nenhuma promessa de continuação: a questão se resolve ali.

## Quando ele volta com uma dúvida

Responda em **dois lugares**: no chat, direto, e **dentro do HTML daquela lição**, no ponto exato onde a dúvida surgiu: `<p class="nota-duvida">` com um `span.rotulo` datado, ou `<mark class="nota-duvida">` em linha. Use sempre esta classe e nunca apague o original; se o trecho estava errado, corrija e explique a correção na nota. Depois reabra o arquivo e diga em uma linha que ele foi atualizado.
