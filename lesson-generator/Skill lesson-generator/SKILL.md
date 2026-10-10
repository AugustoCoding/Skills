---
name: lesson-generator
description: Gera uma lição HTML interativa que ensina a programar em Python a solução de um exercício de engenharia química. Use SOMENTE quando o usuário pedir esta skill pelo nome (lesson-generator), por exemplo "use a lesson-generator neste exercício". Não a use por conta própria para exercícios ou dúvidas de engenharia química sem esse pedido.
disable-model-invocation: true
argument-hint: "Cole o exercício que você quer aprender a resolver programando"
---

# lesson-generator

## 1. Objetivo

A partir de um exercício de engenharia química, você produz uma **lição**: um arquivo HTML que ensina o aluno a programar a solução em Python. O aluno conhece a engenharia, mas não sabe programar nem tem experiência com simulação.

**Critério de qualidade.** A lição deve ensinar o máximo no menor tempo, tanto o de leitura do aluno quanto o de geração. Uma lição correta que exige meia hora para ser gerada falhou tanto quanto uma lição rasa. Quando esta skill não cobrir uma situação, escolha a opção que melhor atende a esse critério.

**Divisão de responsabilidades.** A engenharia e a programação são suas: você resolve o exercício e escolhe a técnica. A forma é da skill e já está pronta. **Seu trabalho é copiar e preencher**: trocar cada `{…}` do template (`templates/licao.html`) e copiar de `templates/pecas.html` a peça mais próxima do exercício, ajustando símbolos, rótulos e contas. Você não deve escrever CSS, JavaScript além da função `calcular` da figura, nem marcação nova, e não deve ler os arquivos de `assets/`. Só monte uma peça do zero se nenhuma servir, no mesmo padrão das existentes.

## 2. Glossário

| Termo | Significado |
|---|---|
| modelo | o modelo matemático do exercício (balanços e equações); quem executa a skill é sempre "você" |
| lição | o arquivo HTML final, entregue ao aluno |
| rascunho | a cópia de trabalho, em `.rascunho-<nome>/`, apagada na entrega |
| seção | uma das quatro divisões da lição: abertura, O modelo, O código, O resultado |
| etapa | um item da dedução de um balanço (`ol.deducao > li`) |
| passo | um item da seção O código (`div.passo`) |
| peça | um trecho pronto de `templates/pecas.html`: um balanço ou uma figura |
| figura | um gráfico do `grafico.js`, com até quatro controles deslizantes |

Os verbos **deve** e **não deve** indicam regras obrigatórias; **pode** indica uma opção; **recomenda-se** indica a escolha preferível, que pode ser contrariada com motivo.

## 3. Fluxo de trabalho

Se o pedido não traz um exercício concreto (por exemplo, "me ensina reator tubular"), responda em uma linha que a skill precisa de um enunciado e atenda o pedido normalmente, sem gerar lição.

Você não deve entrevistar o aluno (infira do enunciado o que precisaria perguntar) nem criar arquivos de estado ou anotações sobre ele.

Rode os scripts da sua pasta de trabalho, com caminhos completos, sem entrar na pasta do rascunho: no Windows, um terminal dentro dela impede que ela seja apagada.

1. **Diagnóstico.** Leia o enunciado e identifique o que ele pede, os dados que dá, os que faltam e o tipo de problema matemático.
2. **Números.** Calcule os resultados com contas rápidas, conforme a seção 5.
3. **Rascunho.** Rode `python <pasta desta skill>/scripts/nova_licao.py "<nome do exercício>" [pasta]`. Passe a pasta só se o aluno indicou uma. O script informa onde está o rascunho e para onde a lição irá.
4. **Preenchimento.** O template tem cada elemento uma vez, como padrão: repita-o quantas vezes o exercício pedir (balanços, etapas, passos, observações), troque cada `{…}`, inclusive os de dentro de atributos, e apague o que não for usado. O conteúdo concreto vem de `templates/pecas.html`: uma dedução completa de exemplo, as equações dos balanços, as equações complementares e as figuras.
5. **Conferência.** Rode `python <pasta desta skill>/scripts/conferir.py <rascunho.html>`. Todo ERRO deve ser corrigido; todo AVISO deve ser avaliado. O script roda os passos colados em ordem, compara a resposta com o que o programa imprime, acusa `{…}` esquecido e lista os números do texto para a revisão de procedência (seção 5).
6. **Verificação visual, se houver navegador.** Sirva a pasta do rascunho (`python -m http.server 8730 --bind 127.0.0.1`), abra a lição por `http://`, confirme que as figuras desenham e leia o console, onde o `grafico.js` avisa sobre curva achatada, controle sem faixa e valor não finito. Sem navegador, o passo 5 basta.
7. **Entrega.** Rode `python <pasta desta skill>/scripts/empacotar.py <rascunho.html>`, que gera o arquivo único, grava a lição no destino e apaga o rascunho. Depois disso, a lição não muda.
8. **Resposta ao aluno.** Em até duas linhas: onde está a lição e o convite a perguntar no chat. A sessão termina na entrega: você não deve fazer commit nem outra ação que o aluno não pediu.

## 4. Estrutura da lição

A lição tem quatro seções, nesta ordem: abertura, O modelo, O código e O resultado. Não há exercício extra no fim.

**Extensão.** Não há limite de palavras. Corte o que não ensina (repetição, contexto histórico, ressalvas sem consequência); nunca abrevie o que ensina (definição de símbolo, contexto de uma equação, motivo de uma decisão).

**Cor.** Cada grandeza mostrada numa figura deve levar a cor da sua série em todos os lugares: equação, lista de símbolos, tabela e texto, inclusive no nome ("o reagente A"). Parâmetros e o restante ficam sem cor. Todo símbolo citado no texto deve ser marcado (`span.var-N` ou, sem cor, `span.param`), para sair em itálico e no tamanho da equação. A marcação está no template.

### 4.1 Abertura

Três a cinco frases: o processo, o que o enunciado pede e o que o aluno terá no fim.

### 4.2 O modelo

**Todo balanço deve ser deduzido**, do princípio de conservação até a forma usada no código, uma etapa por item. Motivo: ver de onde a equação vem ensina o aluno a montar o balanço do próximo exercício.

- O título do balanço deve dizer a natureza (massa ou energia), se é global ou de qual componente, e a unidade. Exemplo: "Balanço de massa do componente A, em mols".
- A primeira etapa é o princípio, em palavras, com o volume de controle; a segunda, a tradução de cada palavra em símbolos, com uma chave sob cada termo.
- Cada etapa seguinte deve fazer uma única operação e declarar o tipo: princípio, tradução, cinética, hipótese, álgebra ou definição.
- Toda hipótese deve dizer o que aconteceria se ela não valesse, porque é a hipótese que muda de um exercício para outro.
- A última etapa é a equação do modelo, com as chaves, seguida de um parágrafo que descreve o que ela representa no processo e, depois, o que ela implica.
- Um balanço que repetiria as etapas de outro já deduzido mostra o princípio e a tradução e resume o restante numa etapa.
- A ordem dos balanços é a que a dedução exige: por exemplo, o global vem antes do de componente quando este depende dele.

Uma equação que não é balanço (lei de velocidade dada, correlação) não se deduz: ela entra num bloco próprio (`div.eq-bloco`), com o nome dela em `data-titulo`.

- Cada símbolo deve ser definido onde aparece pela primeira vez, numa frase completa, com unidade: "concentração do reagente A dentro do reator, mol/L", e não "concentração, mol/L".
- Recomenda-se uma chave, de duas a cinco palavras, em cada termo com significado físico próprio; não em etapas de álgebra pura.
- Equações exibidas devem estar em MathML; código nunca.

Depois da dedução, a seção O modelo tem apenas mais dois elementos:

1. **A tabela de parâmetros**, com valor, unidade e procedência de cada um.
2. **O quadro da técnica**, que fecha a seção em quatro ou cinco frases, nesta sequência:
   - o tipo de problema matemático, em palavras simples;
   - "para resolver esse tipo de problema, vamos usar" a técnica, com o nome dela destacado também no texto (`span.termo`);
   - por que ela serve neste caso;
   - "em Python, quem faz isso é a função" tal, "da biblioteca" tal;
   - "Confira a próxima seção para aprender a usá-la."

   Se a resposta sai de uma conta direta, sem método numérico, a técnica é essa conta, e o recurso de Python é o que a executa (as operações do NumPy, por exemplo).

Todo termo de simulação ou de método numérico (integrador, passo de integração, tolerância, convergência) deve ser explicado em palavras simples na primeira vez que aparece.

### 4.3 O código

O programa é explicado em no máximo seis passos, seguidos de um último passo com o programa completo.

- O título de cada passo é o que o aluno vê antes de abri-lo: deve anunciar o conteúdo sem revelar a resposta.
- Cada passo deve ter três partes, nesta ordem:
  1. **para quê** (`p.para-que`), antes do código: a intenção do passo;
  2. **como** (`p.como`), depois do código: a sintaxe de cada elemento novo, como o que é um `def`, o que a função recebe e devolve, o que significa cada formato de impressão;
  3. **até aqui** (`p.agora`), por último: o que o programa passou a fazer.
- Toda função de biblioteca deve ter todos os argumentos explicados, posicionais e nomeados: o que cada um é e por que tem aquele valor.
- Quando uma função sua é entregue a uma função de biblioteca (a função dos balanços ao `solve_ivp`, a de resíduo ao `brentq`), explique o mecanismo: quem a chama, quantas vezes, com que valores em cada argumento, e o que é feito com o que ela devolve. É isso que dá sentido à ordem dos argumentos, a `y[0]` (o estado chega sempre como lista, mesmo com uma só variável) e a `args=(…,)` (o caminho pelo qual um valor extra chega a cada chamada, e por que a vírgula).
- Toda construção que um iniciante não reconheceria (índice de lista, tupla, desempacotamento, função como argumento, atributo como `.terminal`) deve ser explicada com o que ela é e o que faz neste programa.
- A verificação é obrigatória: uma conta independente que confere o resultado (caso analítico, balanço que fecha, caso-limite).
- O critério de precisão de um resultado numérico deve ser explicado no passo em que o método é usado.
- Os passos, colados em ordem, devem formar exatamente o programa completo e rodar sem erro.
- O programa deve terminar com uma figura do matplotlib (`plt.show()`): a mesma da seção O resultado, ou uma versão simples dela. É o que o aluno vê ao rodar o código no editor.

### 4.4 O resultado

A seção começa pela **resposta**: os números que o exercício pede, com os mesmos valores e casas que o programa imprime. Depois vem a figura que a pergunta exige (no tempo, ao longo do reator, contra um parâmetro, dados contra modelo), registrada no `grafico.js` com a mesma conta do programa. A lição pode ter no máximo duas figuras.

- No máximo quatro controles. Cada um deve ser motivado por uma observação própria, e a faixa e o passo do controle devem alcançar o valor que essa observação pede.
- Duas a quatro observações de leitura da curva, mais uma por controle. Cada observação deve citar um valor ou um trecho de curva deste exercício; uma frase que serviria para outro exercício deve ser cortada.
- O título de cada observação é uma pergunta ou, nas observações de controle, a ação a fazer; nunca a conclusão.
- Cada observação de controle deve indicar a mesma mudança no código e o que o programa passa a imprimir.
- Cada grandeza deve ter um único nome na lição inteira, igual ao da legenda.
- Você não deve listar o que o modelo desconsidera.

### 4.5 Elementos opcionais

Cada opcional só deve ser usado se ensinar algo que o texto principal não ensina:

- com marcação no template: o erro que parece certo (com o sintoma pelo qual ele aparece na saída), conferência extra, tabela de resultados, nota lateral e termo destacado;
- como figuras do `pecas.html`: segundo eixo e dados contra modelo.

Você não deve criar componente nem figura que não seja do tipo x contra y: o que não couber nesse formato deve ser explicado em texto.

## 5. Números e procedência

**Cálculo prévio.** Antes de escrever, calcule os resultados com contas rápidas, só para saber o que a lição vai afirmar. Se existir solução analítica, mesmo de um caso particular ou de um limite, use-a para confirmar o resultado numérico. Se os dois discordarem, encontre o erro antes de prosseguir, sem presumir qual está certo. O programa deve rodar em menos de 30 s; se demorar mais, revise o método.

**Todo número citado na lição deve ser impresso pelo programa entregue**, inclusive os instantes, picos e cruzamentos mencionados nas observações. Valem também os dados do enunciado e uma conta simples feita à vista no texto com números já citados ("2,00 − 1,35 = 0,65 mol/L"). Se um número exigiria um passo a mais para ser calculado, não o cite.

**Procedência.** Revise cada número da lista impressa pelo `conferir.py`, inclusive faixas e percentuais no meio de frases. Todo número deve ser de um destes tipos:

- **dado do enunciado**;
- **derivado**, com a conta visível;
- **constante física** (a constante dos gases, por exemplo), sem fonte;
- **escolha sua**, marcada na tabela com o motivo em meia linha (condições iniciais, horizontes de tempo, tolerâncias).

A faixa de um controle não precisa de procedência, mas deve fazer sentido físico. Você não deve citar literatura.

**Formato.** No texto da lição, os números usam vírgula decimal ("350,4 L"), inclusive quando reproduzem a saída do programa; o ponto decimal fica só dentro do código.

## 6. Restrições técnicas

- A lição deve abrir sem internet. A exceção é o editor, que baixa o Python na primeira execução.
- Use apenas bibliotecas disponíveis no Pyodide (numpy, scipy, matplotlib, pandas, sympy). Se outra for indispensável, o passo que a importa deve avisar que aquele trecho só roda no computador.
- Todo código deve rodar; todo parâmetro e todo eixo devem ter unidade.
- Um bloco de código que não seja Python deve levar a classe `sem-realce`.
- Recomenda-se linhas de código de até 70 caracteres: numa folha estreita, a fonte do bloco encolhe para caber, e linha curta encolhe menos.
- A lição não deve ter links externos nem prometer continuação.

## 7. Após a entrega

A lição não é editada depois de entregue. Dúvidas do aluno são respondidas no chat. Se o aluno pedir explicitamente uma lição com algo a mais, ela é uma lição nova, com outro nome.
