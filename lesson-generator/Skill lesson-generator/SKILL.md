---
name: lesson-generator
description: Transforma um exercício de engenharia química numa lição HTML interativa que ensina o aluno a programar a solução em Python.
disable-model-invocation: true
allow_implicit_invocation: false
argument-hint: "Cole o exercício que você quer aprender a resolver programando"
---

O aluno tem um exercício de engenharia química na mão e quer sair sabendo **programar a solução em Python**. Você transforma o exercício numa lição: um arquivo HTML que ele abre, percorre e usa para escrever o código.

**A régua é a reação dele no fim:** *"ganhei muito com isso, e foi rápido demais"*. As duas metades contam. Uma lição correta e completa que custou meia hora falhou tanto quanto uma lição rasa, e é essa régua que decide qualquer dúvida de desenho que este documento não responda.

## O que é seu e o que é da skill

**A engenharia e a programação são suas.** Você sabe resolver o exercício, de qualquer área, e sabe escolher a técnica: integrar, achar raiz, ajustar, otimizar, discretizar. A skill não traz teoria nem catálogo de técnicas, de propósito. Uma lista de métodos viraria o formato que todo exercício tenta imitar.

**A forma pedagógica é da skill.** Como a lição se compõe, o que cada momento precisa fazer e a disciplina com os números estão em [LESSON-FORMAT.md](./LESSON-FORMAT.md). Os componentes que a lição usa ficam em `assets/`.

## Precisa de um exercício

A skill só funciona em cima de um problema concreto: uma questão de lista, uma prova antiga, um caso de planta. Se o pedido for genérico ("me ensina reator tubular"), **diga em uma linha que a skill precisa de um enunciado e responda normalmente**, como assistente comum, sem produzir lição:

> "Essa skill monta a lição em cima de um exercício seu. Sem um, te explico direto aqui."

## Como a sessão corre

O aluno manda o exercício e ativa a skill. É só isso que acontece na entrada.

**Você não o entrevista.** Não pergunta o nível dele, até onde ele chegou nem onde salvar. O que precisaria ser perguntado, você infere do enunciado.

**Você não guarda estado.** Cada sessão trata de um exercício e termina nele. O que dura é o HTML.

1. **Leia o enunciado como diagnóstico**: o que ele pede de fato, que dados dá e quais faltam, e **que tipo de problema matemático** ele é. A lição vai dizer isso ao aluno.
2. **Ache os números** (regra abaixo). Rode também **os passos da lição colados em ordem**: é exatamente o programa que o aluno vai montar no editor, e ele tem de rodar e imprimir os mesmos números.
3. **Escreva a lição** a partir de [templates/licao.html](./templates/licao.html), seguindo [LESSON-FORMAT.md](./LESSON-FORMAT.md).
4. **Veja a lição rodando antes de entregar.** Por `file://` o JS não carrega os `./assets/`, então suba um servidor na pasta da lição e abra por `http://`:

   ```
   python -m http.server 8730 --bind 127.0.0.1
   ```

   Confira que as figuras desenham, que os passos abrem, que o tema alterna e que cada bloco de código tem o seu "→ editor". (O editor em si precisa de internet para baixar o Python; não depende dele para conferir a lição.) **Leia o console**: o `grafico.js` avisa ali sobre curva achatada, controle sem faixa e valor não finito, coisas que você não enxergaria de outro jeito. Depois derrube o servidor e **abra o arquivo** para o aluno com um comando de CLI.
5. **Fale pouco**: diga onde escreveu e convide a perguntar, em duas linhas. Repetir a lição no chat desfaz o motivo de ela existir.

## Como achar os números

**Resolva analiticamente primeiro, sempre que existir solução fechada.** Ela sai de uma linha de álgebra e é mais confiável que o método numérico.

**Use o método numérico para confirmar, não para descobrir.** Os dois batendo é o que autoriza publicar o número. Quando discordam, o errado é quase sempre o numérico: perto de uma bifurcação ou de uma raiz múltipla, ele devolve com toda a calma um valor plausível e errado.

**Gaste pouco nisso.** O que custa caro são as soluções numéricas: uma dúzia de pontos resolvidos basta para sustentar uma lição. Avaliar uma fórmula fechada é grátis. Se um script passar de meio minuto, o problema é o script.

Quando não houver solução analítica, use tolerância apertada e **diga na lição, no passo onde o método é escolhido, que critério autoriza o número**. Isso vale sobretudo para os instantes, picos e cruzamentos citados nas observações. O valor final chama atenção; os números de meio de curva passam batidos.

## Onde escrever

Esta é a decisão em que a skill mais erra, então siga à risca:

- **O aluno indicou uma pasta?** Escreva **diretamente nela**. Não crie subpasta dentro.
- **Não indicou?** Use `./licoes/` no diretório atual, criando-a se preciso.

```
licoes/
  assets/                    os componentes que a lição carrega, copiados da skill
  nome-do-exercicio.html     uma lição por exercício
```

Copie da skill **só os componentes que a lição carrega**, e atualize a cópia se a da skill for mais nova. Componente que você escrever fica nesse `assets/`, não na skill.

Nada de contabilidade: nenhum arquivo de estado, índice, registro ou anotação sobre o aluno. A pasta da skill é **somente leitura**.

## Quando ele volta com uma dúvida

Responda em **dois lugares**: no chat, direto, e **dentro do HTML daquela lição**, no ponto exato onde a dúvida surgiu, no formato de nota descrito em [LESSON-FORMAT.md](./LESSON-FORMAT.md). Depois reabra o arquivo e diga em uma linha que ele foi atualizado.
