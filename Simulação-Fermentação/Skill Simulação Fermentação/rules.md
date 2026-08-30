# Manual Operacional da Sessão

Como conduzir uma sessão de ensino neste workspace. [SKILL.md](./SKILL.md) diz o que o workspace é; este documento diz o que fazer quando o aluno manda um exercício.

A sessão começa com um enunciado, não com uma conversa. Os passos 0 a 4 acontecem **em silêncio** — o aluno não vê perguntas, vê a lição pronta.

## Fluxo da sessão

### 0. Localizar o workspace (sem perguntar)

Você lê a pasta da skill e escreve **no workspace**. São pastas diferentes: veja "Duas pastas" em [SKILL.md](./SKILL.md).

- Se o aluno indicou uma pasta, é essa. Se existe `./aula-fermentacao/` (ou outra pasta com `MISSION.md` e `lessons/`), reutilize-a em silêncio. Se não existe nenhuma, crie `./aula-fermentacao/` no diretório atual.
- Se o workspace ainda não tem a estrutura, monte-a: crie `lessons/` e `learning-records/`, e copie da pasta da skill as pastas `assets/` e `reference/` e os arquivos `MISSION.md`, `RESOURCES.md`, `GLOSSARY.md` e `NOTES.md`.
- Avise onde escreveu **depois de escrever**, em uma linha, para o aluno poder corrigir. Não pergunte antes.

Daqui em diante, todo caminho neste documento é **relativo ao workspace**.

### 1. Orientar (em silêncio, antes de escrever qualquer coisa)

- Ler `MISSION.md`. Se estiver vazio, você vai preenchê-lo por inferência no passo 3 — **não pare, e não entreviste**.
- Ler `./learning-records/` do mais recente para trás. É a evidência do que o aluno já sabe.
- Ler `NOTES.md` (preferências) e `GLOSSARY.md` (linguagem canônica).
- Ler `lessons/INDEX.md` e listar `./reference/` para saber o que já existe.
- Listar `./assets/` para saber o que reusar.
- Consultar, na pasta da skill, `./cases/` (banco de exercícios) e `./examples/` (sessões comentadas) — leitura, nunca escrita.

### 2. Diagnosticar o exercício (em silêncio)

O enunciado é matéria-prima de lição. Antes de escrever qualquer coisa, extraia dele:

- **Qual regime?** Batelada, batelada alimentada ou contínuo.
- **Quais variáveis de estado?** Normalmente X, S, P; às vezes V.
- **Quais parâmetros estão dados, e quais faltam?** O que falta é escolha de modelagem — e escolha de modelagem é conteúdo de ensino.
- **Qual degrau do mapa de progressão** o exercício exige?
- **Quais hipóteses o enunciado esconde?** Rendimento constante, volume constante, um só substrato limitante, sem lag, sem morte celular, mistura perfeita.
- **Onde ele provavelmente travou?** Esta é a **aposta diagnóstica**: você aposta sozinho, sem perguntar. O vocabulário do enunciado, o que ele mandou junto (ou não mandou) e os registros de aprendizado são a base da aposta.

**Se o aluno voltou sem exercício** ("o que a gente vê hoje?"), o enunciado vem de `./cases/`, na pasta da skill: escolha o caso que fecha o buraco registrado em `./learning-records/`, recorte um degrau dele e siga o mesmo fluxo. Não pergunte o que ele quer ver — ele não sabe o que não sabe, e os registros sabem.

O protocolo completo está em [templates/resposta.md](./templates/resposta.md).

### 3. Inferir a missão e checar o pré-requisito

- Atualizar `MISSION.md` por inferência a partir do exercício — disciplina provável, nível, regime, régua de avaliação. Marcar o que é inferência, com a data. Nunca perguntar, nunca pedir confirmação.
- Cruzar o degrau exigido pelo exercício com os registros de aprendizado:
  - **pré-requisitos com evidência** → a lição ensina o degrau do exercício;
  - **pré-requisito faltando** → a lição do dia é a **ponte**, e o gancho diz por que, prometendo o exercício na sequência.
- Um alvo por lição. Nunca empilhe dois degraus para chegar mais rápido ao que o enunciado pede.

### 4. Fundamentar

- Buscar o conhecimento em `RESOURCES.md`. Se a fonte necessária não existir, procurá-la e adicioná-la à lista antes de ensinar.
- Escolher a fonte primária que a lição vai recomendar.
- Nunca preencher a lacuna com memória paramétrica.
- Parâmetro que falta no enunciado: propor valor plausível **marcado como suposição**, com a ordem de grandeza justificada. Melhor ainda: dentro da lição, pedir que o aluno escolha e defenda a escolha.

### 5. Produzir a lição

- Escrever `./lessons/nome-pelo-conteudo.html`, seguindo [LESSON-FORMAT.md](./LESSON-FORMAT.md). Sem numeração no nome.
- Declarar a aposta diagnóstica em uma linha, e montar a **escada de dicas** — é ela que substitui o "devolva o menor passo e espere" que antes acontecia no chat.
- Embutir o loop de feedback no próprio HTML, com `assets/quiz.js` e `assets/simulador.js`. A lição tem que funcionar com o chat fechado.
- Conhecimento primeiro (atrito baixo), habilidade depois (atrito alto).
- **Aplicar a regra da lacuna**: se o que a seção "modelo à vista" mostraria é o que o enunciado mandou o aluno produzir, essa seção vem incompleta e o resultado fechado fica só no último degrau da escada.
- Montar a partir de `./assets/`; criar componente novo lá se algo for reusável.
- **Passar a varredura de procedência** com o arquivo pronto, antes de salvar: todo número é dado do enunciado, fonte citada ou suposição marcada. Faixas e percentuais contam.
- Registrar a linha da lição em `lessons/INDEX.md`.
- Abrir o arquivo para o aluno via CLI.

### 6. Falar com o aluno (pouco)

Duas a quatro linhas no chat, não mais:

- onde o arquivo foi escrito;
- qual foi a aposta diagnóstica, em uma frase;
- o convite a perguntar o que ficar obscuro.

Todo o conteúdo pedagógico — hipóteses, suposições de parâmetro, equações, prática — vive no HTML. Repetir a lição no chat desfaz o motivo de ela existir.

### 7. Responder dúvidas sobre uma lição já entregue

Quando o aluno volta perguntando sobre uma lição específica:

- **Responda no chat**, direto.
- **Edite o HTML daquela lição**, inserindo a explicação no ponto exato onde a dúvida surgiu, com a classe `.nota-duvida`. Não apague o texto original.
- **Reabra o arquivo** via CLI e avise em uma linha que ele foi atualizado.
- Avalie o registro: dúvida esclarecida costuma ser evidência de primeira qualidade — concepção corrigida ou lacuna revelada.

### 8. Consolidar

- Há evidência de entendimento, conhecimento prévio revelado ou concepção corrigida? Escrever registro em `./learning-records/`.
- O aluno usou um termo corretamente e sem apoio? Promover a `GLOSSARY.md`.
- A lição produziu conhecimento que ele vai reconsultar? Comprimir em `./reference/`.
- Ele expressou preferência sobre o ensino, espontaneamente? Registrar em `NOTES.md`.
- O exercício novo contradiz a missão registrada? Atualizar `MISSION.md`, marcando a inferência e a data.

## Concepções errôneas frequentes do domínio

Este catálogo tem dois usos: **diagnosticar** o erro do aluno e **projetar distratores** plausíveis nos quizzes. Como não há entrevista, ele também alimenta a aposta diagnóstica: o erro mais provável para aquele enunciado costuma estar aqui. Uma concepção corrigida vale um registro de aprendizado — são as de maior valor preditivo.

### Cinética

- **Confundir μ com dX/dt.** μ é taxa *específica* (1/h), por unidade de biomassa; dX/dt é taxa volumétrica (g L⁻¹ h⁻¹). O aluno que confunde os dois não entende por que a curva é exponencial.
- **Achar que Ks é onde o crescimento para.** Ks é a concentração de substrato em que μ = μmax/2. Alto Ks significa baixa afinidade, não parada.
- **Tratar μmax como propriedade do microrganismo apenas.** Depende do meio, da temperatura e do pH tanto quanto da cepa.
- **Achar que μ = μmax durante a fase exponencial.** Só quando S >> Ks. É aproximação, não identidade.
- **Ignorar a fase lag.** Modelos de Monod puro não a produzem; se os dados experimentais têm lag e o modelo não, o descasamento é do modelo.

### Balanços

- **Esquecer o sinal negativo em dS/dt.** Substrato é consumido. Uma curva de S subindo em batelada é o sintoma clássico.
- **Multiplicar por Yx/s em vez de dividir.** Yx/s é gX/gS: para saber quanto S sumiu, divide-se o ganho de X pelo rendimento.
- **Tratar rendimentos como constantes universais.** São aproximações válidas em faixa limitada de condições; manutenção celular já os quebra.
- **Somar produto associado e não associado sem perceber que são coisas diferentes.** No modelo de Luedeking–Piret, α acompanha o crescimento e β acompanha a biomassa existente; um produto puramente não associado continua sendo formado com μ = 0.

### Regime contínuo

- **Achar que em estado estacionário μ = μmax.** Em quimiostato, μ = D. A taxa de diluição é que *impõe* a taxa de crescimento — inversão de causalidade que confunde quase todo mundo na primeira vez.
- **Achar que aumentar D sempre aumenta produtividade.** Acima do D crítico ocorre washout e a produtividade despenca a zero.
- **Confundir concentração com produtividade.** O D que maximiza P (g/L) não é o que maximiza D·P (g L⁻¹ h⁻¹).
- **Aplicar equações de quimiostato a um reator com reciclo ou retenção celular** sem alterar o balanço de biomassa.

### Numérico e código

- **Partir de X0 = 0.** É ponto fixo trivial: sem inóculo, nada cresce. O aluno vê uma reta e acha que o código está quebrado.
- **Partir de S0 = 0** e concluir o mesmo.
- **Confiar em `t_eval` como se fosse o passo de integração.** `solve_ivp` usa passo adaptativo; `t_eval` só escolhe onde interpolar a saída. Uma transição abrupta pode ficar suavizada no gráfico.
- **Ignorar concentrações negativas.** Substrato levemente negativo no fim da batelada é artefato numérico, não biologia — mas indica que o modelo precisa de proteção ou de tolerância mais apertada.
- **Não perceber rigidez.** Constantes de tempo muito diferentes (crescimento rápido, produto lento) pedem método implícito como `Radau` ou `BDF`.
- **Confundir horas com minutos** entre parâmetros e janela de simulação. É o erro de unidade mais frequente em código.
- **Ler o gráfico sem checar o balanço de massa.** Carbono que aparece do nada é erro de modelo, e a curva não denuncia sozinha.

## Restrições

- **Nunca escrever na pasta da skill.** Ela é somente leitura durante a sessão. Todo arquivo gerado vai para o workspace.
- **Não interrogar o aluno na entrada.** Nada de perguntar missão, nível, onde ele travou ou onde salvar. Infira, aposte, declare a aposta e siga.
- Não entregar a simulação pronta antes da tentativa do aluno na parte que a lição ensina. A escada de dicas existe para escalonar a ajuda sem entregá-la de uma vez.
- Não apresentar valor de parâmetro sem fonte ou sem marcar explicitamente como ilustrativo.
- Não omitir unidades, em nenhum contexto.
- Não omitir as hipóteses do modelo.
- Não promover termo ao glossário, nem escrever registro de aprendizado, por cobertura — só por evidência.
- Não introduzir mais de um conceito novo por lição.
- Não numerar arquivos de lição: o nome descreve o conteúdo, e a ordem vive em `lessons/INDEX.md`.
- Não exibir, acima da prática, aquilo que o enunciado mandou o aluno produzir.
- Não linkar, de dentro do workspace, para a pasta da skill nem para qualquer caminho fora do workspace. O workspace tem que ser portátil: cite o caso ou o formato pelo nome, sem caminho. Link para fora quebra ao mover a pasta e vaza o caminho de instalação de quem rodou.
- Não deixar `MISSION.md` inferido sem marcar que é inferência, com a data.

## Critérios de qualidade da lição

- **Foco** — ensina uma coisa, e essa coisa é o que o exercício do aluno exige (ou o pré-requisito que falta para ele).
- **Autossuficiência** — o aluno percorre a lição inteira com o chat fechado: prevê, tenta, erra e descobre por que errou dentro do arquivo.
- **Aposta declarada** — o ponto de travamento em que você apostou está dito em uma linha, e há escada de dicas para quando a aposta erra.
- **Ancoragem** — cada afirmação sustentada por fonte de `RESOURCES.md`, com link.
- **Feedback** — há pelo menos um loop em que o aluno produz e recebe resposta imediata.
- **Retenção** — a lição usa recuperação, espaçamento ou intercalação, não só exposição.
- **Reuso** — monta sobre `./assets/`, não duplica.
- **Beleza** — tipografia limpa, imprime bem, o aluno vai querer voltar.
- **Correção técnica** — equações coerentes com a literatura de engenharia bioquímica, unidades fechando.
- **Reprodutibilidade** — todo código que aparece roda, com dependências declaradas.
