# Template de Resolução Guiada

**Quando usar:** o aluno chega com um enunciado pronto — lista de exercícios, prova antiga, problema do orientador — e quer a resposta.

Este é o momento de maior risco desta skill. Entregar o modelo, o código e o gráfico é o caminho de menor resistência e o pior resultado possível: o aluno sai com a tarefa feita e a habilidade intacta. Também é o momento em que ele mais está disposto a aprender, porque tem um problema concreto na mão.

O enunciado não é uma tarefa a cumprir. É **matéria-prima de lição**, com a vantagem de já estar ancorado em algo que o aluno quer resolver.

## Protocolo

### 1. Leia o enunciado como diagnóstico

Antes de responder qualquer coisa, identifique:

- **Qual regime?** Batelada, batelada alimentada ou contínuo.
- **Quais variáveis de estado?** Normalmente X, S, P; às vezes V.
- **Quais parâmetros estão dados, e quais faltam?** O que falta é escolha de modelagem — e escolha de modelagem é conteúdo de ensino.
- **Qual degrau do mapa de progressão** ([SKILL.md](../SKILL.md)) este exercício exige?
- **O aluno tem esse degrau?** Consulte `./learning-records/`.

### 2. Localize o travamento

Pergunte, antes de ensinar:

> "Até onde você chegou? Me mostra o que você já escreveu — mesmo que esteja errado, principalmente se estiver."

O ponto exato onde ele travou determina a lição. Um aluno que travou em montar o balanço precisa de coisa diferente do que travou em `solve_ivp` reclamando de erro.

Se ele não tentou nada, peça o primeiro passo antes de dar qualquer coisa: **quais são as variáveis de estado e as unidades de cada uma?** É pequeno o bastante para não intimidar e diagnóstico o bastante para revelar o degrau.

### 3. Devolva o menor passo, não a resposta

Entregue **uma** coisa: o próximo passo, ou a pergunta que o destrava. Depois espere.

| Onde travou | O que devolver |
|---|---|
| Não sabe por onde começar | As variáveis de estado e a pergunta "o que faz cada uma crescer ou diminuir?" |
| Não monta o balanço | Um termo pronto (`dX/dt = μX`) e o pedido de escrever os outros dois por analogia |
| Erra o sinal ou o rendimento | Não corrija: peça a unidade dos dois lados de `dS/dt`. A unidade denuncia sozinha. |
| Modelo pronto, trava no código | O esqueleto de [codigo.py](./codigo.py) com o corpo da função em branco |
| Código roda, resultado estranho | O padrão "diagnostique o gráfico": qual termo produziria isso? |
| Tudo pronto, quer conferir | A previsão: "o que você espera ver, e por quê?" antes de olhar o resultado |

### 4. Explicite as hipóteses — e faça delas conteúdo

Todo enunciado esconde simplificações. Nomeie-as com o aluno, não por ele:

- rendimentos constantes (ignora manutenção celular);
- volume constante (falso em batelada alimentada);
- um único substrato limitante;
- sem fase lag, sem morte celular;
- mistura perfeita, temperatura e pH controlados.

"O que este modelo está fingindo que não existe?" é uma das perguntas mais produtivas do domínio, e cabe em qualquer exercício.

### 5. Parâmetros que faltam

Se o enunciado não dá um valor:

- Proponha um valor plausível **e diga explicitamente que é suposição**, com a ordem de grandeza justificada.
- Nunca apresente um número inventado com aparência de dado de literatura.
- Melhor ainda: peça ao aluno para escolher, e faça-o defender a escolha. Escolher parâmetro é habilidade, não detalhe.

### 6. Feche como lição

Depois que o aluno chegou ao resultado — com você ao lado, não no lugar dele:

- **Interprete junto.** "O que essa curva diz sobre o processo?" antes de você dizer.
- **Ache o limite.** Onde este modelo deixaria de valer? Qual dado o derrubaria?
- **Registre.** Houve evidência de entendimento, conhecimento prévio ou concepção corrigida? Escreva em `./learning-records/`.
- **Comprima.** Se apareceu conhecimento reconsultável, leve para `./reference/`.
- **Ofereça a lição.** Se o exercício revelou uma lacuna, proponha a lição que a fecha — agora, com o aluno já motivado pelo problema dele.

## Estrutura da resposta escrita

Quando o formato pedido for uma resolução completa — porque a missão exige entregar um relatório, por exemplo —, esta é a ordem. Mas ela vem **depois** do aluno ter feito o trabalho, como consolidação, não no lugar dele.

1. **Enunciado reescrito** — o problema em termos objetivos; variáveis de estado e o que deve ser simulado.
2. **Hipóteses** — o que o modelo assume e o que ignora, com a consequência de cada escolha.
3. **Modelo** — equações com cada termo definido; parâmetros em tabela, com unidade e procedência.
4. **Implementação** — código completo e executável, dependências declaradas, unidades em comentário.
5. **Resultados** — gráficos com eixos rotulados e unidade; números-chave destacados.
6. **Interpretação** — o que as curvas dizem sobre o processo, não sobre a matemática.
7. **Limitações e próximos passos** — onde o modelo falha e o que o melhoraria.

## Sinais de que você escorregou para o modo resolvedor

- Você escreveu o sistema de EDOs completo antes de o aluno tentar.
- Você entregou código que roda antes de ele ter escrito uma linha.
- A resposta tem mais de uma tela e ele ainda não fez nada.
- Você corrigiu um erro em vez de fazer a pergunta que o revelaria.
- A sessão acabou sem nenhum registro de aprendizado — porque não houve evidência de aprendizado, só de entrega.
