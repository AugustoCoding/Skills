---
name: lesson-generator
description: Gera uma lição HTML interativa que ensina a programar em Python a solução de um exercício de engenharia química. Use SOMENTE quando o usuário pedir esta skill pelo nome (lesson-generator), por exemplo "use a lesson-generator neste exercício". Não a use por conta própria para exercícios ou dúvidas de engenharia química sem esse pedido.
disable-model-invocation: true
argument-hint: "Cole o exercício que você quer aprender a resolver programando"
---

O aluno tem um exercício de engenharia química e quer sair sabendo **programar a solução em Python**. Você transforma o exercício numa lição: um arquivo HTML que ele abre, percorre e usa para escrever o código.

**A régua é a reação dele no fim:** *"ganhei muito com isso, e foi rápido demais"*. As duas metades contam: uma lição correta que custou meia hora falhou tanto quanto uma rasa. É essa régua que decide o que este documento não responder.

**A engenharia e a programação são suas**: você resolve o exercício e escolhe a técnica. A skill não traz teoria nem catálogo de métodos, de propósito. **A forma é da skill**: este documento, o esqueleto em [templates/licao.html](./templates/licao.html), as peças prontas em [templates/pecas.html](./templates/pecas.html) e os componentes em `assets/`, que cuidam sozinhos do comportamento da página.

**Você só copia e preenche. Não fabrique estrutura.** A página, os estilos, as seções e o comportamento já estão prontos: o seu trabalho é trocar o texto entre chaves do template e, para as equações e a figura, copiar a peça de `pecas.html` mais parecida com o exercício e trocar símbolos, rótulos e contas. Não escreva CSS, nem JavaScript além do `calcular` da figura, nem marcação nova, nem leia os `assets/`. Só monte uma peça do zero quando nenhuma do catálogo servir, e no mesmo padrão. É isso que deixa a lição rápida e barata.

## A sessão

Se o pedido não traz um exercício concreto ("me ensina reator tubular"), diga em uma linha que a skill precisa de um enunciado e responda normalmente, sem lição.

Não entreviste o aluno nem guarde estado: o que precisaria ser perguntado, você infere do enunciado. A lição é entregue pronta, num arquivo único, e não é editada depois.

Rode os scripts da sua pasta de trabalho, com caminhos, sem entrar na pasta do rascunho: no Windows, um terminal dentro dela impede que ela seja apagada.

1. **Leia o enunciado como diagnóstico**: o que ele pede, que dados dá e quais faltam, e que tipo de problema matemático ele é.
2. **Ache os números** ([Os números](#os-números)).
3. **Monte o rascunho** com `python <pasta desta skill>/scripts/nova_licao.py "<nome do exercício>" [pasta]`, passando a pasta só se o aluno indicou uma. O script diz onde está o rascunho e para onde a lição vai.
4. **Preencha a lição** no rascunho: troque cada `{…}` do template, apague o que não usar, e traga de `templates/pecas.html` os balanços e a figura que servirem.
5. **Confira** com `python <pasta desta skill>/scripts/conferir.py <rascunho.html>` e corrija todo ERRO; os AVISOS, confira. Ele roda os passos colados em ordem (o programa que o aluno monta no editor), compara a resposta com o que o programa imprime, acusa `{…}` esquecido e lista os números do texto para a revisão de procedência.
6. **Se você tiver um navegador, veja o rascunho rodando, antes de entregar**: sirva a pasta do rascunho (`python -m http.server 8730 --bind 127.0.0.1`), abra por `http://` e confira que as figuras desenham e os passos abrem. **Leia o console**: o `grafico.js` avisa ali sobre curva achatada, controle sem faixa e valor não finito. Sem navegador, o `conferir.py` basta.
7. **Entregue** com `python <pasta desta skill>/scripts/empacotar.py <rascunho.html>`: ele junta tudo num arquivo único, tira os comentários, grava na pasta do aluno e apaga o rascunho. Depois disso, a lição não muda.
8. **Fale pouco**: onde está a lição e o convite a perguntar, em duas linhas. A sessão termina na entrega: nada de commit nem outra ação que o aluno não pediu.

Nada de arquivo de estado ou anotação sobre o aluno.

## A lição

Quatro momentos, nesta ordem: **abertura**, **modelo**, **código** e **resultado**. O conteúdo de cada um é o exercício que decide. Não há exercício extra no fim.

**Não há teto de palavras**: o tempo do aluno se ganha cortando o que não ensina (repetição, história, ressalva que não muda nada), nunca abreviando o que ensina (definição de símbolo, contexto de equação, o porquê de uma decisão).

**A cor marca grandeza.** Cada grandeza que aparece no gráfico leva a cor da sua série em todo lugar: equação, lista de símbolos, tabela, texto (o nome também: "o reagente A"). Parâmetros e todo o resto ficam sem cor. O template mostra a marcação.

### Abertura

Três a cinco frases: que processo é esse, o que o enunciado pede e o que o aluno vai ter no fim.

### Modelo

**Todo balanço é deduzido**, do princípio de conservação até a forma que o código usa, um passo por item. Mostrar de onde a equação vem ensina a montar o balanço do próximo exercício.

- O título diz a natureza: massa ou energia, global ou de qual componente, e em que unidade ("Balanço de massa do componente A, em mols").
- O primeiro passo é o **princípio** em palavras, com o volume de controle. O segundo é a **tradução** de cada palavra em símbolos, com uma chave sob cada termo dizendo qual palavra ele é.
- Cada passo seguinte faz **uma coisa só** e diz qual: princípio, tradução, cinética, hipótese, álgebra ou definição. **A hipótese diz o que aconteceria se não valesse**: é ela que muda de um exercício para outro.
- O último passo é a equação do modelo, com as chaves e, dentro dele, o parágrafo que a explica: primeiro a cena, depois a conclusão.
- Um balanço que repetiria os passos de outro já deduzido mostra o princípio e a tradução e junta o resto numa linha. A ordem dos balanços é a que a dedução pede: o global vem antes do de componente quando este precisa dele.

Equação que não é balanço (lei de velocidade dada, correlação) não se deduz: entra num bloco próprio.

- **Defina cada símbolo onde ele aparece pela primeira vez, com unidade, numa frase completa**: "concentração do reagente A dentro do reator, mol/L", nunca "concentração, mol/L".
- **Chave** em cada termo com significado físico próprio, com duas a cinco palavras; não em passo de pura álgebra.
- Equação exibida é MathML; código nunca é.

Depois, **a tabela de parâmetros** (valor, unidade, procedência) e **a técnica**, que fecha o modelo em quatro ou cinco frases: o nome da ferramenta que resolve o exercício, destacado também no texto, e a linha "para resolver esse tipo de problema, vamos usar esta técnica, que serve aqui por isto e isto; em Python, quem faz isso é a função tal, da biblioteca tal; confira a próxima seção para aprender a usá-la". Se a resposta sai de conta direta, sem método numérico, a técnica é essa conta, e o recurso de Python é o que a faz (as operações do NumPy, por exemplo). Fora da dedução, o modelo não cresce.

**O aluno nunca simulou nada.** Termo de simulação ou de método numérico (integrador, passo, tolerância, convergência) só entra explicado em palavras do básico, na primeira vez que aparece.

### Código

O programa explicado **em até seis passos, mais o programa completo como o último**.

- **O título do passo** é o que o aluno vê antes de abrir: diz o que vem sem entregar a resposta.
- **Cada passo segue uma linha argumentativa**, em três tempos: **para quê** (a intenção, antes do código), **como** (a sintaxe de cada elemento novo, depois dele: o que é um `def`, o que a função recebe e devolve, o que significa cada formato) e **até aqui** (o que o programa ganhou com o passo). O aluno sabe a engenharia, não o Python.
- **Toda função de biblioteca tem todos os argumentos explicados**, um a um, os posicionais e os por nome: o que cada um é e por que este valor.
- **A verificação é obrigatória**: uma conta independente que confere o resultado (caso analítico, balanço que fecha, caso-limite).
- **O critério de um número numérico** vai no passo onde o método é escolhido.
- **Os passos, colados em ordem, são o programa completo e rodam**: nenhuma linha de código fica fora deles.

### Resultado

Abre com **a resposta**: os números que o exercício pede, como o programa os imprime. Depois, **a figura que a pergunta pede** (no tempo, ao longo do reator, contra um parâmetro, dados contra modelo), registrando no `grafico.js` a mesma conta do programa. Duas figuras no máximo.

- **Até quatro controles**, cada um convocado pela sua própria observação, com faixa e passo que alcançam o valor que ela manda procurar.
- **Duas a quatro observações de leitura da curva, mais uma por controle**, cada uma ancorada num ponto concreto deste resultado e com um insight próprio. O título de cada uma é uma pergunta ou, nas de controle, a ação; nunca a conclusão.
- **Cada observação de controle diz a mesma mudança no código** e o que o programa deve imprimir.
- **Um nome por grandeza** na lição inteira, o mesmo da legenda.

Se a frase serviria para outro exercício, não é análise deste: corte. E não liste o que o modelo ignora.

### Opcionais

Use quando pagar o tempo que custa: **o erro que parece certo** (com o sintoma pelo qual ele aparece na saída), **conferência extra**, **tabela de resultados**, **nota lateral** e **termo destacado**, cuja marcação está no template; **segundo eixo** e **dados contra modelo**, que são figuras do `pecas.html`. Não crie componente nem figura que não seja x contra y: o que não couber nelas, explique em texto.

## Os números

**Ache os números antes de escrever**, com contas rápidas: é para saber o que a lição vai dizer, não ainda o programa entregue, que usa a precisão que o critério dele pede. Se existir solução analítica, mesmo de um caso particular ou de um limite, use-a para confirmar o numérico; quando os dois discordam, ache o erro antes de seguir, sem presumir qual está certo. Script de mais de meio minuto é script errado.

**Todo número que a lição cita é impresso pelo programa que ela entrega**, sobretudo os instantes, picos e cruzamentos das observações, que passam batidos. Se calcular um número exigiria mais um passo, não o cite.

**Revise cada número da lista que o `conferir.py` imprime**, inclusive faixas e percentuais no meio de frases. Cada número é **dado do enunciado**, **derivado** (com a conta visível) ou **escolha sua** (marcada na tabela, com o motivo em meia linha: condições iniciais, horizontes, tolerâncias). Faixa de slider não precisa de procedência, mas precisa fazer sentido físico. Não cite literatura.

## Requisitos

- Abre sem internet, exceto o editor, que baixa o Python na primeira vez.
- Só bibliotecas que o Pyodide tem (numpy, scipy, matplotlib, pandas, sympy). Se precisar de outra, diga no passo que a importa que aquele trecho só roda no computador.
- Todo código roda; todo parâmetro e todo eixo têm unidade. Bloco de código que não é Python leva `sem-realce`.
- Nenhum link para fora e nenhuma promessa de continuação.

## Depois da entrega

A lição não é editada. Dúvida se responde no chat. Se o aluno pedir explicitamente uma lição com algo a mais, é uma lição nova, com outro nome.
