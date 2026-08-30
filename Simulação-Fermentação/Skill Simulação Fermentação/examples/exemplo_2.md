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

`lessons/quimiostato-termo-de-diluicao.html`:

- **Gancho** — o prazo é real e está nomeado: "amanhã você entrega isto entendendo, o que também serve para a prova depois."
- **Recuperação** — de memória, sem consultar: escreva o `dS/dt` da batelada. Espaçamento sobre `0001`.
- **Conhecimento** — uma ideia só: entra e sai caldo a uma taxa D, e o caldo leva o que estiver dissolvido ou suspenso nele. Nada de washout, nada de produtividade — isso é a próxima lição.
- **Modelo à vista** — as três equações da batelada lado a lado com as do contínuo, com a coluna "o que a vazão acrescentou" **em branco para ele preencher**. Duas das três linhas vêm preenchidas; a de `dS/dt` não.
- **Prática** — "das unidades ao modelo": dada a tabela de parâmetros (D em h⁻¹, Sin em g/L), montar o balanço de substrato coerente. Depois, o simulador em `data-modelo="quimiostato"`, com previsão obrigatória antes do reveal.
- **Escada** — quatro degraus:
  1. "Quanta biomassa sai do reator por hora, por litro? Escreva o termo antes de abrir o próximo."
  2. "Confira as unidades do seu `dS/dt`. Fecha?"
  3. "Desligue o crescimento na sua equação (μ = 0) e ligue a bomba com Sin = 20 g/L. O que ela prevê que acontece com S? É isso mesmo?"
  4. As três equações fechadas.

  O degrau 3 é o coração da lição: é a pergunta que faz o aluno **descobrir sozinho** o termo de alimentação que faltava. No fluxo antigo ela era feita por você no chat, e o aluno tinha que estar online. Agora ela está no arquivo, e funciona às onze da noite.
- **Verificação** — duas perguntas, uma delas com o distrator "em estado estacionário μ = μmax", direto do catálogo.
- **Fecho** — a pergunta que abre a próxima lição, deixada em aberto de propósito: "no estacionário, `dX/dt = 0` e X não é zero. O que sobra?"

Índice e abertura:

```md
| 2026-09-04 | [quimiostato-termo-de-diluicao.html](./quimiostato-termo-de-diluicao.html) | 6 | Escrever os três balanços do quimiostato, com o termo de diluição |
```

```bash
start "" "aula-fermentacao/lessons/quimiostato-termo-de-diluicao.html"
```

### 4. Falar pouco

> "Abri a lição — ela te leva às três equações do quimiostato em uns 15 minutos, e você entrega entendendo.
> Apostei que o travamento é o termo de vazão, não a montagem de EDO em geral.
> Qualquer coisa que ficar obscura, pergunta aqui."

O código não foi dado. Ele sai da lição com o modelo escrito por ele, e a implementação vira transcrição.

## Ele volta, uma hora depois, com uma dúvida

> "Entendi o `dX/dt = μX − DX`. Mas por que o `dS/dt` tem `+D·Sin` e o `dP/dt` não tem nada parecido? O produto também não sai?"

Boa pergunta, e revela exatamente o que ficou incompleto na lição: ela explicou o que **entra e sai**, mas não separou as duas coisas.

### 1. Responder no chat, direto

> "Sai, sim — o `−D·P` está lá. O que o produto não tem é o termo de **entrada**: a alimentação é meio fresco, com substrato e sem produto. Por isso o S ganha `+D·Sin` e o P não ganha nada: `Pin = 0`. Se você alimentasse com caldo já contendo produto, apareceria um `+D·Pin` idêntico."

### 2. Editar o HTML daquela lição

No ponto exato — logo depois da tabela onde as três equações aparecem lado a lado, que é onde a dúvida nasceu:

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
