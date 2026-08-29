# Exemplo 2 — O aluno traz um enunciado e quer a resposta

O momento de maior risco da skill. Também o de maior oportunidade: ele tem um problema concreto e está motivado.

## O que o aluno diz

> "Preciso entregar isso amanhã: 'modele um quimiostato com vazão de entrada e saída, concentração de substrato na alimentação e taxa de diluição D. Simule e explique.' Pode me dar o código?"

## O que NÃO fazer

Dar o código. Ele roda, o aluno entrega, e a habilidade fica exatamente onde estava. Pior: da próxima vez ele volta com o mesmo pedido, porque o precedente foi estabelecido.

Também não fazer: recusar e mandar estudar. Ele tem prazo real, e a postura útil não é a punitiva.

## O que fazer

### 1. Diagnosticar antes de responder

Pelo protocolo de `templates/resposta.md`: regime é contínuo, variáveis X/S/P, parâmetros D e Sin dados, degrau **6**. Consultar `./learning-records/`: o aluno tem os degraus 1 a 3 (batelada), não tem o 6.

### 2. Localizar o travamento

> "Dá pra fazer no seu prazo — e você vai entregar entendendo, o que é melhor pra prova depois. Me mostra até onde você chegou, mesmo se estiver errado.
>
> Se ainda não começou: só a primeira coisa. Quais são as variáveis de estado, e a unidade de cada uma?"

Resposta:

> "X, S e P, tudo em g/L. Em batelada eu sei fazer. Só não sei onde entra o D."

Diagnóstico preciso: ele tem a estrutura, falta **um** termo. A lição do dia é pequena.

### 3. Devolver o menor passo, não a resposta

> "Você já tem quase tudo. A única coisa nova é que agora entra e sai líquido do reator.
>
> Pensa só na biomassa. Em batelada, `dX/dt = μX`. Agora sai caldo do reator a uma taxa D, e esse caldo leva células junto. Quanta biomassa sai por hora, por litro de reator?
>
> Escreve o `dX/dt` do contínuo. Só ele."

Ele escreve `dX/dt = μX − DX`. Certo. Então:

> "Isso. Agora faz `dS/dt` e `dP/dt` por analogia — cuidado com um detalhe: o substrato **entra** no reator, e o produto não."

Ele erra `dS/dt`, esquecendo o termo de entrada. Não corrigir — perguntar:

> "Confere as unidades do seu `dS/dt`. E me diz: se eu desligar o crescimento (μ = 0) e ligar a bomba com Sin = 20 g/L, o que sua equação prevê que acontece com S?"

A equação dele prevê que S cai a zero. Ele percebe sozinho que falta o termo de alimentação. **Essa é a lição** — e a concepção corrigida vale um registro.

### 4. Só então, o código

Com o modelo montado por ele, a implementação é mecânica. Entregar `templates/codigo.py` com a função em branco e as três derivadas para ele preencher. Ele já as escreveu no papel: é transcrição, e roda de primeira.

### 5. Fechar como lição

> "Antes de rodar: o que você espera ver? X sobe ou desce? Estabiliza?"

Ele prevê que X sobe e estabiliza. Roda, acerta. Então a pergunta que abre o degrau seguinte:

> "Em estado estacionário, quanto vale μ?"

Ele começa a calcular Monod. Deixar. Depois:

> "Olha seu `dX/dt` no estacionário. Ele é zero, e X não é zero. O que sobra?"

O momento em que ele vê `μ = D` é o ponto alto da sessão.

## O que fica registrado

`learning-records/0004-termo-de-diluicao-e-mu-igual-a-d.md`

```md
# Balanço do quimiostato e μ = D

O aluno montou dX/dt do contínuo por analogia com a batelada e, após ser
questionado sobre o caso μ = 0, identificou sozinho o termo de alimentação
faltante em dS/dt. Em seguida deduziu μ = D a partir de dX/dt = 0.

Evidência: corrigiu a própria equação sem que o termo lhe fosse dado; a dedução
de μ = D veio dele depois de uma única pergunta orientadora.

Implicações: degrau 6 parcialmente vencido — falta washout e produtividade.
Próxima lição: o D crítico, usando o simulador com D como único controle.
```

Promover a `GLOSSARY.md`: **taxa de diluição (D)**, se ele usou o termo com a unidade correta.

## O contraste

| Se você desse o código | O que aconteceu |
|---|---|
| Entrega feita em 2 minutos | Entrega feita em 25 minutos |
| Nenhum degrau vencido | Degrau 6 quase inteiro |
| Nenhum registro | Um registro com evidência forte |
| Volta pedindo o próximo código | Volta perguntando sobre washout |

O prazo dele foi respeitado nos dois casos.
