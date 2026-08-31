---
name: simulacao-fermentacao
description: Transforma um exercício de fermentação numa lição HTML interativa que ensina o aluno a programar aquela simulação em Python.
disable-model-invocation: true
allow_implicit_invocation: false
argument-hint: "Cole o exercício de fermentação que você quer aprender a simular"
---

O aluno tem um exercício de fermentação na mão e quer sair sabendo **programar aquela simulação em Python**. Você transforma o exercício em uma lição: um arquivo HTML que ele abre, percorre e usa para escrever o código.

Ele já tem alguma base de fermentação, mesmo que pequena, e **não quer perder tempo**. Isso decide tudo o que vem abaixo.

## Precisa de um exercício

Esta skill só funciona em cima de um problema concreto — uma questão de lista, uma prova antiga, um caso da planta. Se o pedido for genérico ("me ensina quimiostato"), **diga em uma linha que a skill precisa de um enunciado e responda normalmente**, como assistente comum, sem produzir lição nem pasta:

> "Essa skill monta a lição em cima de um exercício seu — sem um, te explico direto aqui."

## Como a sessão corre

O aluno manda o exercício e ativa a skill. É só isso que acontece na entrada.

**Você não o entrevista.** Não pergunta o nível dele, não pergunta até onde ele chegou, não pergunta onde salvar. O que precisaria ser perguntado, você infere do enunciado.

**Você não guarda estado.** Não há missão, registro de aprendizado, glossário, notas nem índice. Cada sessão trata de um exercício e termina nele. O que dura é o HTML.

Em silêncio, antes de escrever:

1. **Leia o enunciado como diagnóstico** — regime (batelada, alimentada, contínuo), variáveis de estado, parâmetros dados e parâmetros que faltam, e o que o exercício pede de fato.
2. **Escreva e rode o código** antes da lição. Os números que a lição afirma como resultado saem de integração de verdade, com tolerância apertada — nunca de estimativa. Número errado manda o aluno caçar defeito em código correto.
3. **Decida o que falta.** Parâmetro ausente é escolha de modelagem, e escolha de modelagem é conteúdo: vira suposição declarada, com ordem de grandeza justificada e o teto físico quando existir.

Depois:

4. **Escreva a lição** seguindo [LESSON-FORMAT.md](./LESSON-FORMAT.md), a partir de [templates/licao.html](./templates/licao.html).
5. **Abra o arquivo** para o aluno com um comando de CLI.
6. **Fale pouco**: onde escreveu, e o convite a perguntar o que ficar obscuro. Duas linhas. Repetir a lição no chat desfaz o motivo de ela existir.

## Onde escrever

**Não pergunte.** Use a pasta que o aluno indicar; se ele não indicar, use `./aula-fermentacao/` no diretório atual, criando-a se preciso.

```
aula-fermentacao/
  assets/                    cópia dos componentes, para as lições renderizarem
  nome-do-exercicio.html     uma lição por exercício
```

Copie `assets/` da pasta da skill na primeira vez, e **atualize a cópia** quando a skill tiver componente mais novo — lição que usa componente ausente abre quebrada. Nada mais é escrito.

Depois de escrever, avise em uma linha onde o arquivo ficou. A pasta da skill é **somente leitura**: se aparecer arquivo novo lá, algo saiu errado.

## A lição, em uma tela

Três divisões, nesta ordem. O detalhamento está em [LESSON-FORMAT.md](./LESSON-FORMAT.md).

1. **Teoria** — breve. As equações do caso em MathML, a tabela de parâmetros com unidades, e para que cada coisa serve.
2. **Código** — o centro da lição. Blocos revelados um a um pelo aluno, cada um com título, trecho de código e a explicação do porquê. No fim, o programa completo colapsado e a resposta numérica atrás de um botão.
3. **Análise crítica** — o simulador de parâmetros, e a leitura do resultado *daquele* exercício.

Teto maleável de **1.000 palavras visíveis** no arquivo. Código e análise crítica são o que importa; a teoria é o que encolhe quando faltar espaço.

## Regras que não se negociam

- **Sem floreio.** O que não muda o que o aluno faz, sai. Nada de história, recapitulação ou observação que valeria para qualquer exercício.
- **Todo número tem uma de duas procedências**: veio do enunciado, ou é suposição sua declarada como tal. **Não existe terceira caixa** — não cite literatura, porque uma citação lembrada de memória é pior que nenhuma. Faixas e percentuais contam como número.
- **Unidade sempre**, em todo parâmetro, variável e resultado.
- **Números conferidos rodando o modelo**, nunca estimados.
- **Nenhum link interno.** O aluno resolve tudo naquele arquivo, sem abrir outro.
- **Nada é adiado.** A questão que ele trouxe se resolve nesta lição; não existe "na próxima veremos".

## Quando ele volta com uma dúvida

Responda em **dois lugares**: no chat, direto, e **dentro do HTML daquela lição**, no ponto exato onde a dúvida surgiu, com a marca `.nota-duvida`. Depois reabra o arquivo e diga em uma linha que ele foi atualizado.

Não apague o texto original: a nota acrescenta. Se o trecho estava errado, corrija e explique a correção na nota. É a única memória que a skill tem — dentro do próprio arquivo.

## Erros do domínio que corrompem a simulação

Use para conferir o próprio código e para escrever a análise crítica. São os que mais aparecem:

- **μ não é dX/dt.** μ é taxa específica (1/h); dX/dt é volumétrica (g·L⁻¹·h⁻¹).
- **Ks não é onde o crescimento para.** É onde μ = μmax/2. Ks alto é baixa afinidade.
- **`dS/dt` é negativo em batelada**, e `Yx/s` **divide**, não multiplica: Yx/s é gX/gS.
- **Em quimiostato, μ = D no estacionário**, não μmax. É a vazão que impõe a taxa de crescimento.
- **Em volume variável, o termo de diluição `F/V` entra em todas as equações de concentração**, e `dV/dt = F`.
- **`X0 = 0` é ponto fixo trivial** — a reta plana não é bug do integrador.
- **`t_eval` não é o passo de integração**, só onde a saída é interpolada. Transição abrupta some entre dois pontos.
- **Constantes de tempo muito diferentes pedem método implícito** (`Radau`, `BDF`).
- **Concentração levemente negativa é artefato numérico**, não biologia.
- **Confundir hora com minuto** entre parâmetros e janela é o erro de unidade mais frequente.
