# Template de Resolução Guiada

**Quando usar:** sempre. O aluno chega com um enunciado — lista de exercícios, prova antiga, problema do orientador — e quer a resposta. É assim que toda sessão começa.

Este é o momento de maior risco desta skill. Entregar o modelo, o código e o gráfico é o caminho de menor resistência e o pior resultado possível: o aluno sai com a tarefa feita e a habilidade intacta. Também é o momento em que ele mais está disposto a aprender, porque tem um problema concreto na mão.

O enunciado não é uma tarefa a cumprir. É **matéria-prima de lição**, com a vantagem de já estar ancorado em algo que o aluno quer resolver.

E você não vai perguntar nada antes de começar. O diagnóstico continua inteiro — só deixa de ser conversa e vira **aposta**, declarada dentro da lição.

Quando o aluno volta sem enunciado, o exercício vem de `../cases/`, escolhido pelo buraco registrado em `./learning-records/`. O protocolo abaixo vale igual.

## Protocolo

### 1. Leia o enunciado como diagnóstico

Antes de escrever qualquer coisa, identifique:

- **Qual regime?** Batelada, batelada alimentada ou contínuo.
- **Quais variáveis de estado?** Normalmente X, S, P; às vezes V.
- **Quais parâmetros estão dados, e quais faltam?** O que falta é escolha de modelagem — e escolha de modelagem é conteúdo de ensino.
- **Qual degrau do mapa de progressão** ([SKILL.md](../SKILL.md)) este exercício exige?
- **O aluno tem esse degrau?** Consulte `./learning-records/`. Se falta pré-requisito, a lição do dia é a ponte, não o exercício.
- **Quais hipóteses o enunciado esconde?** Elas são conteúdo, não rodapé.

### 2. Aposte no travamento

Você não pergunta "até onde você chegou?". Você aposta — e a aposta é boa, porque o material do diagnóstico está quase todo no que ele mandou:

| Sinal no que ele mandou | Aposta razoável |
|---|---|
| Só o enunciado, nada mais | Não sabe por onde começar: variáveis de estado e unidades |
| Enunciado + "não sei montar as equações" | O balanço, não o código |
| Código colado, com traceback | Sintaxe/uso de `solve_ivp`, não o modelo |
| Código que roda + "o gráfico está estranho" | Sinal, rendimento ou unidade — nessa ordem de probabilidade |
| Modelo escrito corretamente + "está certo?" | Falta confiança, não habilidade: peça previsão antes de confirmar |
| Enunciado de quimiostato, registros só de batelada | O termo de diluição, e a inversão de causalidade μ = D |
| Vocabulário de prova ("determine", "calcule") | A régua é escrita: exigir reconstrução no papel, não só código |

Cruze com o catálogo de concepções errôneas de [rules.md](../rules.md): para cada tipo de enunciado, há um erro que é o mais provável de todos. É nele que se aposta.

**Declare a aposta dentro da lição**, em uma linha, logo depois do gancho. Aposta declarada é aposta corrigível: se ele já sabia aquilo, pula direto para a prática e te diz.

### 3. Construa a lição em torno da aposta — não devolva a resposta

A tabela abaixo era, antes, o que você devolveria no chat e esperaria. Agora é **como a lição é montada**: o que entra no corpo do texto e o que entra em cada degrau da escada de dicas.

| Aposta | O corpo da lição entrega | Primeiro degrau da escada |
|---|---|---|
| Não sabe por onde começar | As variáveis de estado, com unidades | "O que faz cada uma crescer ou diminuir?" |
| Não monta o balanço | Um termo pronto (`dX/dt = μX`) e o pedido de escrever os outros por analogia | "Confira a unidade dos dois lados" |
| Erra o sinal ou o rendimento | O exercício "conserte o código quebrado", com o defeito plantado | "Some as unidades de `dS/dt`. Fecha?" |
| Modelo pronto, trava no código | O esqueleto de [codigo.py](./codigo.py) com o corpo da função em branco | "O que a função tem que devolver, e em que ordem?" |
| Código roda, resultado estranho | O padrão "diagnostique o gráfico" | "Qual termo produziria uma curva assim?" |
| Tudo pronto, quer conferir | O padrão "preveja e depois rode", com `data-prever="1"` | "O que você espera ver, e por quê?" |

A resposta fechada existe — no **último** degrau da escada, nunca no corpo. O aluno chega nela se precisar, e o clique é dele.

### 4. Explicite as hipóteses — e faça delas conteúdo

Todo enunciado esconde simplificações. Nomeie-as **na lição**, na seção do modelo:

- rendimentos constantes (ignora manutenção celular);
- volume constante (falso em batelada alimentada);
- um único substrato limitante;
- sem fase lag, sem morte celular;
- mistura perfeita, temperatura e pH controlados.

"O que este modelo está fingindo que não existe?" é uma das perguntas mais produtivas do domínio, cabe em qualquer exercício, e funciona bem como item de quiz.

### 5. Parâmetros que faltam

Se o enunciado não dá um valor:

- Proponha um valor plausível **e diga explicitamente que é suposição**, com a ordem de grandeza justificada.
- Nunca apresente um número inventado com aparência de dado de literatura.
- Melhor ainda: dentro da lição, peça que o aluno escolha e defenda a escolha. Escolher parâmetro é habilidade, não detalhe.

### 6. Feche como lição

A lição já é o fechamento — mas o ciclo só termina no workspace:

- **Interprete dentro do arquivo.** "O que essa curva diz sobre o processo?" antes de a lição dizer.
- **Ache o limite.** Onde este modelo deixaria de valer? Qual dado o derrubaria? Vale como último item de quiz.
- **Registre.** Houve evidência de entendimento, conhecimento prévio ou concepção corrigida? Escreva em `./learning-records/`.
- **Comprima.** Se apareceu conhecimento reconsultável, leve para `./reference/`.
- **Indexe.** Uma linha em `lessons/INDEX.md`, com data, degrau e alvo.

No chat ficam duas a quatro linhas: onde escreveu, qual foi a aposta, e o convite a perguntar.

## Estrutura da resposta escrita

Quando o formato pedido for uma resolução completa — porque a missão exige entregar um relatório, por exemplo —, esta é a ordem. Mas ela vem **depois** de o aluno ter feito o trabalho, como consolidação, e mora em `./reference/` ou no fecho da lição, não no lugar dele.

1. **Enunciado reescrito** — o problema em termos objetivos; variáveis de estado e o que deve ser simulado.
2. **Hipóteses** — o que o modelo assume e o que ignora, com a consequência de cada escolha.
3. **Modelo** — equações com cada termo definido; parâmetros em tabela, com unidade e procedência.
4. **Implementação** — código completo e executável, dependências declaradas, unidades em comentário.
5. **Resultados** — gráficos com eixos rotulados e unidade; números-chave destacados.
6. **Interpretação** — o que as curvas dizem sobre o processo, não sobre a matemática.
7. **Limitações e próximos passos** — onde o modelo falha e o que o melhoraria.

## Sinais de que você escorregou para o modo resolvedor

- O corpo da lição traz o sistema de EDOs completo antes de qualquer coisa que o aluno tenha que produzir.
- A escada de dicas tem um degrau só, e é a resposta.
- Você escreveu a explicação inteira no chat, e o HTML virou resumo do que já foi dito.
- A lição não tem nenhum momento em que o aluno escreve, prevê ou escolhe algo.
- Você corrigiu um erro em vez de montar o exercício que o revelaria.
- A sessão acabou sem nenhum registro de aprendizado — porque não houve evidência de aprendizado, só de entrega.
