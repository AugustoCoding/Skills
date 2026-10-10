---
name: lesson-generator
description: Gera uma lição HTML interativa que ensina a programar em Python a solução de um exercício de engenharia química. Use SOMENTE quando o usuário pedir esta skill pelo nome (lesson-generator), por exemplo "use a lesson-generator neste exercício". Não a use por conta própria para exercícios ou dúvidas de engenharia química sem esse pedido.
disable-model-invocation: true
argument-hint: "Cole o exercício que você quer aprender a resolver programando"
---

O aluno tem um exercício de engenharia química e quer sair sabendo **programar a solução em Python**. Você transforma o exercício numa lição: um arquivo HTML que ele abre, percorre e usa para escrever o código.

**A régua é a reação dele no fim:** *"ganhei muito com isso, e foi rápido demais"*. As duas metades contam: uma lição correta que custou meia hora falhou tanto quanto uma rasa. É essa régua que decide o que este documento não responder.

**A engenharia e a programação são suas**: você resolve o exercício e escolhe a técnica. A skill não traz teoria nem catálogo de métodos, de propósito. **A forma é da skill**: este documento, o esqueleto em [templates/licao.html](./templates/licao.html) (toda a marcação mora lá) e os componentes em `assets/`, que cuidam sozinhos do comportamento da página.

## A sessão

Se o pedido não traz um exercício concreto ("me ensina reator tubular"), diga em uma linha que a skill precisa de um enunciado e responda normalmente, sem lição.

Não entreviste o aluno nem guarde estado: o que precisaria ser perguntado, você infere do enunciado. A lição é entregue pronta, num arquivo único, e não é editada depois.

1. **Leia o enunciado como diagnóstico**: o que ele pede, que dados dá e quais faltam, e que tipo de problema matemático ele é.
2. **Ache os números** ([Os números](#os-números)).
3. **Monte o rascunho** com `python <pasta desta skill>/scripts/nova_licao.py "<nome do exercício>" [pasta]`, passando a pasta só se o aluno indicou uma. O script diz onde está o rascunho e para onde a lição vai.
4. **Escreva a lição** no rascunho, trocando o conteúdo do template.
5. **Confira** com `python <pasta desta skill>/scripts/conferir.py <rascunho.html>` e corrija todo ERRO; os AVISOS, confira. Ele roda os passos colados em ordem (o programa que o aluno monta no editor), compara a resposta com o que o programa imprime e lista os números do texto para a revisão de procedência.
6. **Entregue** com `python <pasta desta skill>/scripts/empacotar.py <rascunho.html>`: ele junta tudo num arquivo único, grava na pasta do aluno e apaga o rascunho.
7. **Se você tiver um navegador, veja a lição rodando**: sirva a pasta da entrega (`python -m http.server 8730 --bind 127.0.0.1`), abra por `http://` e confira que as figuras desenham e os passos abrem. **Leia o console**: o `grafico.js` avisa ali sobre curva achatada, controle sem faixa e valor não finito. Sem navegador, o `conferir.py` basta.
8. **Fale pouco**: onde está a lição e o convite a perguntar, em duas linhas.

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
- Um segundo balanço parecido mostra o princípio e a tradução e junta o resto numa linha.

Equação que não é balanço (lei de velocidade dada, correlação) não se deduz: entra num bloco próprio.

- **Defina cada símbolo onde ele aparece pela primeira vez, com unidade, numa frase completa**: "concentração do reagente A dentro do reator, mol/L", nunca "concentração, mol/L".
- **Chave** em cada termo com significado físico próprio, com duas a cinco palavras; não em passo de pura álgebra.
- Equação exibida é MathML; código nunca é.

Depois, **a tabela de parâmetros** (valor, unidade, procedência) e **o tipo de problema**: duas ou três frases sobre que problema matemático é este e por que isso decide a ferramenta. Fora da dedução, o modelo não cresce.

### Código

O programa explicado **em até seis passos, mais o programa completo como o último**.

- **O título do passo** é o que o aluno vê antes de abrir: diz o que vem sem entregar a resposta.
- **Cada passo tem o trecho e o porquê**: o comentário cobre o "o quê", o parágrafo cobre a decisão (por que este método, esta tolerância, este evento). Nada de explicar o óbvio.
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

Use quando pagar o tempo que custa: **pense antes** (num ou dois passos em que prever ensina mais que ler), **o erro que parece certo** (com o sintoma pelo qual ele aparece na saída), **conferência extra**, **segundo eixo**, **dados contra modelo**, **tabela de resultados**, **diagrama**, **nota lateral**, **termo destacado**. A marcação de cada um está no template. Componente novo só para o que não é x contra y, e ele fica no `assets/` da lição.

## Os números

**Resolva analiticamente primeiro** e use o numérico para confirmar, não para descobrir; quando discordam, o errado é quase sempre o numérico. Gaste pouco: uma dúzia de pontos integrados basta, e script de mais de meio minuto é script errado.

**Todo número que a lição cita é impresso pelo programa que ela entrega**, sobretudo os instantes, picos e cruzamentos das observações, que passam batidos. Se calcular um número exigiria mais um passo, não o cite.

**Revise cada número da lista que o `conferir.py` imprime**, inclusive faixas e percentuais no meio de frases. Cada número é **dado do enunciado**, **derivado** (com a conta visível) ou **escolha sua** (marcada na tabela, com o motivo em meia linha: condições iniciais, horizontes, tolerâncias). Faixa de slider não precisa de procedência, mas precisa fazer sentido físico. Não cite literatura.

## Requisitos

- Abre sem internet, exceto o editor, que baixa o Python na primeira vez.
- Só bibliotecas que o Pyodide tem (numpy, scipy, matplotlib, pandas, sympy). Se precisar de outra, diga no passo que a importa que aquele trecho só roda no computador.
- Todo código roda; todo parâmetro e todo eixo têm unidade. Bloco de código que não é Python leva `sem-realce`.
- Nenhum link para fora e nenhuma promessa de continuação.

## Depois da entrega

A lição não é editada. Dúvida se responde no chat. Se o aluno pedir explicitamente uma lição com algo a mais, é uma lição nova, com outro nome.
