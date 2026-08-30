# Exemplo 2 — O aluno traz um enunciado, quer a resposta, e depois volta com uma dúvida

O momento de maior risco da skill. Também o de maior oportunidade: ele tem um problema concreto e está motivado. E é o exemplo que mostra o ciclo inteiro — entrega, dúvida pontual, lição corrigida.

## O que o aluno manda

> "Preciso entregar isso amanhã: 'modele um quimiostato com vazão de entrada e saída, concentração de substrato na alimentação e taxa de diluição D. Simule e explique.' Pode me dar o código?"

## O que NÃO fazer

Dar o código. Ele roda, o aluno entrega, e a habilidade fica exatamente onde estava. Pior: da próxima vez ele volta com o mesmo pedido, porque o precedente foi estabelecido.

Também não fazer: recusar e mandar estudar. Ele tem prazo real, e a postura útil não é a punitiva.

E não fazer, agora que não há entrevista: perguntar "me mostra até onde você chegou". A informação que essa pergunta buscava já está no workspace.

## O que fazer

### 1. Diagnosticar em silêncio

Pelo protocolo de [templates/resposta.md](../templates/resposta.md): regime contínuo, variáveis X/S/P, parâmetros D e Sin dados, degrau **6**.

`./learning-records/` (o workspace já existe, é a terceira sessão):

| Registro | Conteúdo |
|---|---|
| `0001` | Acertou sinal e rendimento em `dS/dt`, sem consultar |
| `0002` | Entendeu Ks: sabe a unidade e que Ks alto é baixa afinidade |
| `0003` | Rodou `solve_ivp` com o modelo de batelada e leu a curva |

Degraus 1 a 3 e 5 com evidência; degrau 6 sem nada. Pré-requisito satisfeito: a lição pode ser o próprio exercício, sem ponte.

### 2. Apostar

Ele tem a batelada montada e nunca viu regime contínuo. Pelo catálogo de `rules.md`, o erro quase certo deste enunciado é **o termo de diluição** — e, logo atrás, a inversão de causalidade μ = D. A aposta não é "ele não sabe modelar"; é "ele não sabe o que a vazão faz com cada balanço".

Declarada na lição:

> "Aposto que o seu problema não é montar EDO — você já fez isso na batelada. É o que a vazão faz com cada uma das três equações. Se eu errei, vá direto para *Sua vez*."

### 3. Construir a lição em torno da aposta

`lessons/quimiostato-em-python.html` — a questão inteira, terminando em código que roda antes do prazo dele.

- **Gancho** — o prazo é real e está nomeado: "amanhã você entrega isto entendendo, o que também serve para a prova depois."
- **Aposta declarada** — "seu problema não é montar EDO, você já fez isso na batelada; é o que a vazão faz com cada uma das três equações. Se já sabe, pule para o código."
- **Recuperação** — de memória, sem consultar: escreva o `dS/dt` da batelada. Espaçamento sobre o registro `0001`.
- **Estação 1, modelo** — as três equações do contínuo em MathML, ao lado das da batelada, com a coluna "o que a vazão acrescentou" preenchida e anotada. Uma ideia só: entra e sai caldo a uma taxa D, e o caldo leva o que estiver dissolvido ou suspenso nele. Sem washout, sem produtividade — isso é a estação de crítica.
- **Estação 2, código** — a maior. O quimiostato em `solve_ivp`, com os parâmetros D e Sin em variável nomeada, e a explicação de por que o termo de diluição aparece em todas as três derivadas mas o de alimentação só em uma.
- **Explorador de variantes** — D abaixo e acima do crítico, com a curva mudando de estado estacionário para washout. Duas escolhas corretas de operação, não um erro de código.
- **Estação 3, resultado** — previsão ("X estabiliza, some, ou oscila?"), e atrás do clique os números conferidos: X\*, S\* e o tempo até o estacionário.
- **Estação 4, crítica** — hipóteses (mistura perfeita, sem retenção celular, rendimento constante), previsão sobre o efeito de aumentar D, e o simulador com D como controle.
- **Verificação** — duas perguntas, uma delas com o distrator "em estado estacionário μ = μmax", direto do catálogo.
- **Fecho** — uma frase. A pergunta sobre o estacionário **não** é deixada para depois: ela está resolvida na estação de crítica, porque a lição resolve a questão inteira.

Índice e abertura:

```md
| 2026-09-04 | [quimiostato-em-python.html](./quimiostato-em-python.html) | 6 | Montar e programar o quimiostato, com o termo de diluição no lugar certo |
```

```bash
start "" "aula-fermentacao/lessons/quimiostato-em-python.html"
```

### 4. Falar pouco

> "Abri a lição — ela te leva às três equações do quimiostato em uns 15 minutos, e você entrega entendendo.
> Apostei que o travamento é o termo de vazão, não a montagem de EDO em geral.
> Qualquer coisa que ficar obscura, pergunta aqui."

O código foi dado, inteiro e explicado — é o que ele precisa para entregar amanhã. O que não foi dado foi o resultado: os números só aparecem depois que ele registra a previsão.

## Ele volta, uma hora depois, com uma dúvida

> "Entendi o `dX/dt = μX − DX`. Mas por que o `dS/dt` tem `+D·Sin` e o `dP/dt` não tem nada parecido? O produto também não sai?"

Boa pergunta, e revela exatamente o que ficou incompleto na lição: ela explicou o que **entra e sai**, mas não separou as duas coisas.

### 1. Responder no chat, direto

> "Sai, sim — o `−D·P` está lá. O que o produto não tem é o termo de **entrada**: a alimentação é meio fresco, com substrato e sem produto. Por isso o S ganha `+D·Sin` e o P não ganha nada: `Pin = 0`. Se você alimentasse com caldo já contendo produto, apareceria um `+D·Pin` idêntico."

### 2. Editar o HTML daquela lição

No ponto exato — logo depois da tabela onde as três equações aparecem lado a lado, na estação de modelo, que é onde a dúvida nasceu:

```html
<p class="nota-duvida">
  <span class="rotulo">Dúvida — 04/09</span>
  Cada balanço ganha um termo de <em>saída</em> (−D·C, para qualquer C que esteja
  no caldo) e, só se houver o que entrar, um termo de <em>entrada</em> (+D·C<sub>in</sub>).
  A alimentação é meio fresco: tem substrato, não tem produto nem células. Por isso
  S ganha +D·S<sub>in</sub>, e P e X ganham só a saída. Alimentar com caldo já
  contendo produto acrescentaria +D·P<sub>in</sub> exatamente igual.
</p>
```

O texto original fica onde estava. A nota acrescenta a distinção que faltava.

### 3. Reabrir e avisar

```bash
start "" "aula-fermentacao/lessons/quimiostato-termo-de-diluicao.html"
```

> "Reabri a lição — sua pergunta virou uma nota destacada logo abaixo da tabela das três equações, que é onde ela faltava."

### 4. Registrar

A dúvida é evidência de primeira qualidade: ele leu as três equações, comparou-as e notou uma assimetria real. Isso é leitura de modelo, não decoreba.

`learning-records/0004-entrada-e-saida-sao-termos-distintos.md`

```md
# Entrada e saída são termos distintos no balanço do quimiostato

O aluno montou os três balanços e perguntou por que dP/dt não tem análogo de
+D·Sin. Percebeu a assimetria sozinho, lendo o modelo — não foi apontada.

Evidência: formulou a pergunta a partir da comparação entre as três equações,
com o termo de saída já corretamente identificado em cada uma.

Implicações: degrau 6 na metade — os balanços estão de pé, falta o estado
estacionário (μ = D), washout e produtividade. A confusão entrada/saída
costuma voltar em batelada alimentada (degrau 8); vale a nota.
```

Promover a `GLOSSARY.md`: **taxa de diluição (D)**, se ele a usou com a unidade correta.

## O contraste

| Se você desse o código | O que aconteceu |
|---|---|
| Entrega feita em 2 minutos | Entrega feita em 25 minutos |
| Nenhum degrau vencido | Degrau 6 na metade, com evidência |
| Nenhum registro | Um registro forte, vindo de uma pergunta dele |
| A dúvida nunca apareceria | A dúvida virou nota permanente na lição |
| Volta pedindo o próximo código | Volta perguntando sobre o estacionário |

O prazo dele foi respeitado nos dois casos.
