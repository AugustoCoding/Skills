# lesson-generator

Skill para assistentes de IA (Claude Code, claude.ai, ChatGPT/Codex) que transforma um exercício de engenharia química numa **lição HTML interativa**, que ensina o aluno a programar a solução em Python.

A lição não entrega apenas a resposta nem é uma aula de teoria: ela deduz o modelo, constrói o programa passo a passo, verifica o resultado e deixa o aluno explorá-lo numa figura interativa e num editor de Python embutido.

## Princípios de projeto

1. **O conhecimento técnico é do modelo de linguagem; a forma é da skill.** O modelo de linguagem já domina engenharia química e sabe escolher a técnica numérica adequada (integrar, achar raiz, ajustar, otimizar). Por isso a skill não contém teoria nem um catálogo de métodos, que limitaria as soluções ao que estivesse listado. Ela define apenas a forma pedagógica: a estrutura da lição, os critérios de cada seção e o tratamento dos números. No Teste 7, a remoção de todo o conteúdo de domínio que a skill carregava não reduziu a correção das simulações.
2. **Copiar e preencher, em vez de gerar.** Página, estilo e comportamento estão prontos em templates e componentes. O modelo de linguagem preenche um esqueleto e copia peças de um catálogo, o que reduz o tempo e o custo de geração e uniformiza as lições.
3. **Regras verificáveis ficam em scripts.** O que pode ser garantido por script, componente ou template não fica como instrução em texto. Toda mudança na estrutura da lição atualiza o verificador (`conferir.py`) no mesmo commit, e a lição de referência deve passar nele sem erro.
4. **Todo número é rastreável.** Cada valor citado na lição é impresso pelo programa entregue e tem procedência declarada: dado do enunciado, derivado ou escolha justificada.

## Estrutura da lição

A lição tem quatro seções, sempre nesta ordem:

1. **Abertura**: o processo e o que o exercício pede.
2. **O modelo**: cada balanço deduzido do princípio de conservação até a equação final, em etapas etiquetadas (princípio, tradução, cinética, hipótese, álgebra, definição); a tabela de parâmetros com procedência; e o quadro da técnica, que nomeia o método de solução e justifica a escolha.
3. **O código**: até seis passos, cada um em três partes (intenção, sintaxe, o que o programa passou a fazer), uma verificação independente e o programa completo.
4. **O resultado**: a resposta numérica, a figura com até quatro controles e observações ancoradas nos valores deste exercício.

Ao lado da lição há um **editor de Python** que roda no próprio navegador: o aluno monta o programa trazendo os passos da lição, executa e vê a saída e os gráficos.

## Organização do repositório

```
lesson-generator/
  README.md                        este documento
  publicar_claude_ai.py            gera o .zip para enviar ao claude.ai
  Skill lesson-generator/          a skill: apenas o que o modelo de linguagem usa
  Modelo Skill lesson-generator/   a lição de referência, onde a estrutura é revisada
  Testes Skill lesson-generator/   as execuções de teste, com o registro de cada uma
```

A pasta da skill contém apenas o que entra no contexto do modelo de linguagem. Este README, a lição de referência e os testes ficam fora dela por servirem ao desenvolvimento, e não à geração.

### A skill (`Skill lesson-generator/`)

| Arquivo | Função |
|---|---|
| `SKILL.md` | As instruções que o modelo de linguagem segue: objetivo, glossário, fluxo de trabalho, estrutura da lição, tratamento dos números e restrições técnicas. |
| `agents/openai.yaml` | Configuração para Codex/ChatGPT: a skill só é ativada quando o usuário a chama. |
| `templates/licao.html` | O esqueleto da lição, com marcadores `{…}` a preencher. |
| `templates/pecas.html` | O catálogo de peças prontas: balanços de massa e de energia (tanque, tubo, separador) e uma figura por tipo de problema (EDOs no tempo, perfil, dois eixos, varredura, cruzamento de curvas, dados contra modelo). Abre no navegador com todas as peças funcionando. |
| `scripts/nova_licao.py` | Cria o rascunho da lição (o template e a cópia dos componentes) e registra o destino da entrega. |
| `scripts/conferir.py` | Verifica o rascunho: executa os passos do código em ordem, compara a resposta com o que o programa imprime, checa a estrutura de cada seção, acusa marcadores não preenchidos e lista os números do texto para a revisão de procedência. |
| `scripts/empacotar.py` | Gera a lição como arquivo HTML único, sem comentários, grava no destino e apaga o rascunho. |

### Componentes (`Skill lesson-generator/assets/`)

| Arquivo | Função |
|---|---|
| `lesson.css` | A folha sobre o fundo da página, tipografia (escala única de tamanhos; fonte monoespaçada só em código), equações, blocos pedagógicos, temas claro e escuro, impressão, e o sistema de cores: uma cor por seção, uma por grandeza da figura, vermelho reservado a erros. |
| `codigo.js` | As linhas do tempo da dedução, do código e das observações: tudo começa recolhido, cada item recolhido é uma faixa alinhada, o próximo a ler é sinalizado e cada item se recolhe pelo marcador ou pelo título. O sumário à esquerda, montado da estrutura, com o progresso de cada parte e a seção atual. Também o botão de copiar e o realce de sintaxe do Python. |
| `grafico.js` | Figuras do tipo x contra y: a lição registra a conta e o componente desenha, com controles, segundo eixo, pontos experimentais e leitura sob o cursor. Inclui integrador (RK4), busca de raiz e `linspace`, e emite avisos no console sobre problemas que o autor não vê, como uma curva achatada. |
| `editor.js` | O editor de Python (Pyodide, baixado no primeiro uso). Começa vazio; cada bloco de código da lição tem um botão que o acrescenta ao editor. A saída mostra texto, erros e figuras. |
| `tema.js` | O botão de tema claro ou escuro. |

## Entrega

O aluno recebe **um único arquivo HTML**, com todos os componentes embutidos: abre com dois cliques, sem pastas auxiliares. A entrega é a mesma em todos os ambientes. Apenas o editor requer internet, para baixar o Python na primeira execução.

A lição não é editada depois de entregue e a skill não guarda estado entre sessões. Dúvidas são respondidas no chat; uma lição ampliada, se pedida, é uma lição nova.

## Uso

**Claude Code.** Instale a pasta `Skill lesson-generator/` como skill pessoal em `~/.claude/skills/lesson-generator/` (uma junção ou link simbólico mantém a instalação sincronizada com o repositório), abra uma sessão nova e chame `/lesson-generator` seguido do exercício. A skill tem `disable-model-invocation: true` e nunca é ativada por iniciativa do modelo.

**claude.ai.** Rode `python publicar_claude_ai.py`, que gera `dist/lesson-generator.zip` com o frontmatter aceito pelo claude.ai, e envie o arquivo em Configurações › Recursos › Skills. Lá não há bloqueio de ativação automática; a descrição da skill restringe o uso a pedidos explícitos.

**Codex/ChatGPT.** O arquivo `agents/openai.yaml` desativa a invocação implícita; a skill é chamada pelo nome.

## Desenvolvimento e validação

Mudanças na estrutura da lição são feitas sobre a lição de referência (`Modelo Skill lesson-generator/`), cujo README descreve o fluxo. Cada versão relevante da skill é validada por uma execução registrada em `Testes Skill lesson-generator/`, com o exercício, as armadilhas planejadas, o gabarito, a avaliação e as correções resultantes.
