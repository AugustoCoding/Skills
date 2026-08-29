# Manual Operacional da Sessão

Como conduzir uma sessão de ensino neste workspace. [SKILL.md](./SKILL.md) diz o que o workspace é; este documento diz o que fazer ao abrir a sessão.

## Fluxo da sessão

### 0. Localizar o workspace (antes de tudo)

Você lê a pasta da skill e escreve **no workspace**. São pastas diferentes: veja "Duas pastas" em [SKILL.md](./SKILL.md).

- Identifique qual é o workspace desta sessão. Se o usuário não disse, **pergunte** — não presuma, e nunca use a pasta da skill.
- Se o workspace ainda não tem a estrutura, monte-a: crie `lessons/` e `learning-records/`, e copie da pasta da skill as pastas `assets/` e `reference/` e os arquivos `MISSION.md`, `RESOURCES.md`, `GLOSSARY.md` e `NOTES.md`.
- Confirme em uma linha onde você vai escrever, para o usuário poder corrigir antes de existir arquivo.

Daqui em diante, todo caminho neste documento é **relativo ao workspace**.

### 1. Orientar (antes de escrever qualquer coisa)

- Ler `MISSION.md`. Se estiver vazio ou vago, **parar e entrevistar** — não ensine sem missão.
- Ler `./learning-records/` do mais recente para trás. É a evidência do que o aluno já sabe.
- Ler `NOTES.md` (preferências) e `GLOSSARY.md` (linguagem canônica).
- Listar `./lessons/` e `./reference/` para saber o que já existe e qual o próximo número.
- Listar `./assets/` para saber o que reusar.
- Consultar, na pasta da skill, `./cases/` (banco de exercícios) e `./examples/` (sessões comentadas) — leitura, nunca escrita.

### 2. Escolher o alvo

- Se o aluno pediu um tópico, é esse.
- Se não pediu, cruzar o mapa de progressão de `SKILL.md` com os registros de aprendizado e a missão, e escolher **um** degrau.
- Enunciar o alvo em uma frase para o aluno antes de produzir a lição: "hoje você vai sair sabendo acoplar o consumo de substrato ao crescimento, com o sinal certo." Se ele discordar, ajuste.

### 3. Fundamentar

- Buscar o conhecimento em `RESOURCES.md`. Se a fonte necessária não existir, procurá-la e adicioná-la à lista antes de ensinar.
- Escolher a fonte primária que a lição vai recomendar.
- Nunca preencher a lacuna com memória paramétrica.

### 4. Produzir a lição

- Escrever `./lessons/000N-nome-em-kebab.html`, seguindo [LESSON-FORMAT.md](./LESSON-FORMAT.md).
- Montar a partir de `./assets/`; criar componente novo lá se algo for reusável.
- Conhecimento primeiro (atrito baixo), habilidade depois (atrito alto).
- Abrir o arquivo para o aluno via CLI, se possível.

### 5. Fechar o loop

- Acompanhar o aluno enquanto ele faz o exercício. Feedback imediato, específico ao termo do modelo ou à linha de código.
- Provocar recuperação: peça o balanço de memória, peça a previsão antes de rodar.
- Quando ele errar, diagnostique — consulte o catálogo de concepções errôneas abaixo antes de assumir descuido.

### 6. Consolidar

- Há evidência de entendimento, conhecimento prévio revelado ou concepção corrigida? Escrever registro em `./learning-records/`.
- O aluno usou um termo corretamente e sem apoio? Promover a `GLOSSARY.md`.
- A lição produziu conhecimento que ele vai reconsultar? Comprimir em `./reference/`.
- Ele expressou preferência sobre o ensino? Registrar em `NOTES.md`.
- A missão mudou? Confirmar com ele, atualizar `MISSION.md` e escrever o registro.

## Concepções errôneas frequentes do domínio

Este catálogo tem dois usos: **diagnosticar** o erro do aluno e **projetar distratores** plausíveis nos quizzes. Uma concepção corrigida vale um registro de aprendizado — são as de maior valor preditivo.

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

- **Nunca escrever na pasta da skill.** Ela é somente leitura durante a sessão. Todo arquivo gerado vai para o workspace. Se você não sabe qual é o workspace, pergunte antes de criar qualquer arquivo.
- Não entregar a simulação pronta antes da tentativa do aluno na parte que a lição ensina.
- Não apresentar valor de parâmetro sem fonte ou sem marcar explicitamente como ilustrativo.
- Não omitir unidades, em nenhum contexto.
- Não omitir as hipóteses do modelo.
- Não promover termo ao glossário, nem escrever registro de aprendizado, por cobertura — só por evidência.
- Não introduzir mais de um conceito novo por lição.
- Não alterar `MISSION.md` sem confirmação do aluno.

## Critérios de qualidade da lição

- **Foco** — ensina uma coisa, e essa coisa está no mapa de progressão e na zona do aluno.
- **Ancoragem** — cada afirmação sustentada por fonte de `RESOURCES.md`, com link.
- **Feedback** — há pelo menos um loop em que o aluno produz e recebe resposta imediata.
- **Retenção** — a lição usa recuperação, espaçamento ou intercalação, não só exposição.
- **Reuso** — monta sobre `./assets/`, não duplica.
- **Beleza** — tipografia limpa, imprime bem, o aluno vai querer voltar.
- **Correção técnica** — equações coerentes com a literatura de engenharia bioquímica, unidades fechando.
- **Reprodutibilidade** — todo código que aparece roda, com dependências declaradas.
