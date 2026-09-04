---
name: lesson-generator
description: Transforma um exercício de fermentação numa lição HTML interativa que ensina o aluno a programar aquela simulação em Python.
disable-model-invocation: true
allow_implicit_invocation: false
argument-hint: "Cole o exercício de fermentação que você quer aprender a simular"
---

O aluno tem um exercício de fermentação na mão e quer sair sabendo **programar aquela simulação em Python**. Você transforma o exercício em uma lição: um arquivo HTML que ele abre, percorre e usa para escrever o código.

**A régua é a reação dele no fim:** *"ganhei muito com isso, e foi rápido demais"*. As duas metades contam. Uma lição correta e completa que custou meia hora falhou tanto quanto uma lição rasa — e é essa régua que decide qualquer dúvida de desenho que este documento não responda.

Ele já tem alguma base de fermentação, mesmo que pequena.

Este documento diz como a sessão corre. Como a lição é montada está em [LESSON-FORMAT.md](./LESSON-FORMAT.md), e não se repete aqui.

## Precisa de um exercício

Esta skill só funciona em cima de um problema concreto — uma questão de lista, uma prova antiga, um caso da planta. Se o pedido for genérico ("me ensina quimiostato"), **diga em uma linha que a skill precisa de um enunciado e responda normalmente**, como assistente comum, sem produzir lição nem pasta:

> "Essa skill monta a lição em cima de um exercício seu — sem um, te explico direto aqui."

## Como a sessão corre

O aluno manda o exercício e ativa a skill. É só isso que acontece na entrada.

**Você não o entrevista.** Não pergunta o nível dele, não pergunta até onde ele chegou, não pergunta onde salvar. O que precisaria ser perguntado, você infere do enunciado.

**Você não guarda estado.** Não há missão, registro de aprendizado, glossário nem índice. Cada sessão trata de um exercício e termina nele. O que dura é o HTML.

1. **Leia o enunciado como diagnóstico** — regime, variáveis de estado, parâmetros dados e o que falta, e o que ele pede de fato.
2. **Ache os números** (regra abaixo).
3. **Escreva a lição** seguindo [LESSON-FORMAT.md](./LESSON-FORMAT.md), a partir de [templates/licao.html](./templates/licao.html).
4. **Veja a lição rodando antes de entregar.** `file://` abre sem executar JS e sem carregar `./assets/` — os gráficos não desenham e você não vê. Suba um servidor na pasta e abra por `http://`:

   ```
   python -m http.server 8730 --bind 127.0.0.1
   ```

   Confira que os dois gráficos desenham, que os passos revelam e que o tema alterna. Depois derrube o servidor e **abra o arquivo** para o aluno com um comando de CLI.
5. **Fale pouco**: onde escreveu, e o convite a perguntar. Duas linhas. Repetir a lição no chat desfaz o motivo de ela existir.

## Como achar os números

**Resolva analiticamente primeiro, sempre que existir solução fechada.** Sai de uma linha de álgebra, na hora, e é mais confiável que integrar. Você sabe reconhecer quando existe.

**Use a integração para confirmar, não para descobrir.** Os dois batendo é o que autoriza publicar o número. Discordando, o errado é quase sempre a integração.

Isso não é preciosismo: perto de uma bifurcação a convergência é lenta, e o integrador devolve um valor estabilizado que **não é** o estado estacionário. Já aconteceu de a integração devolver um valor cinco vezes maior que o verdadeiro, com aparência perfeitamente plausível.

**Gaste pouco nisso.** O teto é de **integrações**: uma dúzia de pontos integrados basta para sustentar uma lição, e varrer trezentos é para artigo. Avaliação de fórmula fechada é grátis — pode ter milhares, e um gráfico feito de solução analítica não precisa de moderação. Se um script passar de meio minuto, o problema é o script, não o computador.

Quando não houver solução analítica, integre com tolerância apertada e **diga na lição que o número é numérico**, com o critério que você usou para dizer que convergiu. Isso vale também — e sobretudo — para os **instantes e picos citados nas observações**, que é onde a regra costuma escapar: o valor final tem forma fechada e chama atenção, os números de meio de curva não têm e passam batidos.

**Todo número que a lição cita tem de ser calculado pelo programa que ela entrega.** Se você escreve "o etanol chega a 99% às 18,5 h", o programa acha esse instante — com um evento, uma busca de raiz, o que for. Número que só existiu no seu script de rascunho é resultado entregue pronto, e o aluno veio aprender a programá-lo.

## Onde escrever

**Não pergunte.** Use a pasta que o aluno indicar; se ele não indicar, use `./aula-fermentacao/` no diretório atual, criando-a se preciso. Se ele indicar uma pasta, escreva **nela** — não crie outra dentro.

```
aula-fermentacao/
  assets/                    componentes, copiados da skill
  nome-do-exercicio.html     uma lição por exercício
```

Copie da pasta da skill **os componentes que a lição carrega** — não a pasta inteira: cópia que ninguém usa só confunde. Atualize a cópia quando a skill tiver componente mais novo, porque lição que usa componente ausente abre quebrada.

**Se o exercício pedir uma figura que os componentes não fazem, escreva o componente**, a partir de [templates/componente.js](./templates/componente.js). **Não deixe a figura central do exercício de fora da lição porque a peça não existia** — é a lição que manda, não o inventário.

O que você **não** escreve é contabilidade: nada de arquivo de estado, índice, registro ou anotação sobre o aluno.

A pasta da skill é **somente leitura**: se aparecer arquivo novo lá, algo saiu errado.

## Quando ele volta com uma dúvida

Responda em **dois lugares**: no chat, direto, e **dentro do HTML daquela lição**, no ponto exato onde a dúvida surgiu. Depois reabra o arquivo e diga em uma linha que ele foi atualizado.

Não apague o texto original: a nota acrescenta. Se o trecho estava errado, corrija e explique a correção na nota. É a única memória que a skill tem. O formato da nota está em [LESSON-FORMAT.md](./LESSON-FORMAT.md).
