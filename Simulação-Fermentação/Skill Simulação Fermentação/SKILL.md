---
name: simulacao-fermentacao
description: Transforma um exercício de fermentação numa lição HTML interativa que ensina o aluno a programar aquela simulação em Python.
disable-model-invocation: true
allow_implicit_invocation: false
argument-hint: "Cole o exercício de fermentação que você quer aprender a simular"
---

O aluno tem um exercício de fermentação na mão e quer sair sabendo **programar aquela simulação em Python**. Você transforma o exercício em uma lição: um arquivo HTML que ele abre, percorre e usa para escrever o código.

Ele já tem alguma base de fermentação, mesmo que pequena, e **não quer perder tempo**.

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
4. **Abra o arquivo** com um comando de CLI.
5. **Fale pouco**: onde escreveu, e o convite a perguntar. Duas linhas. Repetir a lição no chat desfaz o motivo de ela existir.

## Como achar os números

**Resolva analiticamente primeiro, sempre que existir solução fechada.** Estado estacionário de quimiostato, balanço de massa em batelada, tempo de enchimento — tudo isso sai de uma linha de álgebra, na hora, e é mais confiável que integrar.

**Use a integração para confirmar, não para descobrir.** Os dois batendo é o que autoriza publicar o número. Discordando, o errado é quase sempre a integração.

Isso não é preciosismo: perto de uma bifurcação — um quimiostato operando junto do washout, por exemplo — a convergência é lenta e o integrador devolve um valor estabilizado que **não é** o estado estacionário. Já aconteceu de a integração dar biomassa cinco vezes maior que a verdadeira, com aparência perfeitamente plausível.

**Gaste pouco nisso.** O teto é de **integrações**: uma dúzia de pontos integrados basta para sustentar uma lição, e varrer trezentos é para artigo. Avaliação de fórmula fechada é grátis — pode ter milhares, e um gráfico feito de solução analítica não precisa de moderação. Se um script passar de meio minuto, o problema é o script, não o computador.

Quando não houver solução analítica, integre com tolerância apertada e **diga na lição que o número é numérico**, com o critério que você usou para dizer que convergiu.

## Onde escrever

**Não pergunte.** Use a pasta que o aluno indicar; se ele não indicar, use `./aula-fermentacao/` no diretório atual, criando-a se preciso. Se ele indicar uma pasta, escreva **nela** — não crie outra dentro.

```
aula-fermentacao/
  assets/                    componentes, copiados da skill
  nome-do-exercicio.html     uma lição por exercício
```

Copie da pasta da skill **os componentes que a lição carrega** — não a pasta inteira: cópia que ninguém usa só confunde. Atualize a cópia quando a skill tiver componente mais novo, porque lição que usa componente ausente abre quebrada.

**Se o exercício pedir algo que os componentes não fazem, escreva o componente.** Um exercício de contínuo que pede a curva de produtividade contra D precisa de um gráfico de varredura, e o `simulador.js` só desenha contra o tempo; um regime que não está registrado precisa do modelo dele. Nesses casos, escreva o arquivo novo em `assets/` do workspace, com o mesmo cuidado dos que já estão lá, e use. **Não deixe a figura central do exercício de fora da lição porque a peça não existia** — é a lição que manda, não o inventário.

O que você **não** escreve é contabilidade: nada de arquivo de estado, índice, registro ou anotação sobre o aluno.

A pasta da skill é **somente leitura**: se aparecer arquivo novo lá, algo saiu errado.

## Quando ele volta com uma dúvida

Responda em **dois lugares**: no chat, direto, e **dentro do HTML daquela lição**, no ponto exato onde a dúvida surgiu. Depois reabra o arquivo e diga em uma linha que ele foi atualizado.

Não apague o texto original: a nota acrescenta. Se o trecho estava errado, corrija e explique a correção na nota. É a única memória que a skill tem. O formato da nota está em [LESSON-FORMAT.md](./LESSON-FORMAT.md).

## Erros do domínio que corrompem a simulação

Use para conferir o próprio código e para escrever a análise crítica:

- **μ não é dX/dt.** μ é taxa específica (1/h); dX/dt é volumétrica (g·L⁻¹·h⁻¹).
- **Ks não é onde o crescimento para.** É onde μ = μmax/2. Ks alto é baixa afinidade.
- **`dS/dt` é negativo em batelada**, e `Yx/s` **divide**, não multiplica: Yx/s é gX/gS.
- **Em quimiostato, μ = D no estacionário**, não μmax. É a vazão que impõe a taxa de crescimento.
- **Em volume variável, o termo de diluição `F/V` entra em todas as equações de concentração**, e `dV/dt = F`.
- **`X0 = 0` é ponto fixo trivial** — a reta plana não é bug do integrador.
- **`t_eval` não é o passo de integração**, só onde a saída é interpolada.
- **Constantes de tempo muito diferentes pedem método implícito** (`Radau`, `BDF`).
- **Concentração levemente negativa é artefato numérico**, não biologia.
- **Confundir hora com minuto** entre parâmetros e janela é o erro de unidade mais frequente.
