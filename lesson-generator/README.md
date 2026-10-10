# lesson-generator — aprender a programar a solução de um exercício

Transforma um exercício de engenharia química numa **lição HTML** que ensina o aluno a programar a solução em Python.

A skill não resolve o enunciado por ele nem dá aula de teoria: mostra o programa sendo construído, passo a passo, e deixa o aluno mexer no resultado.

## A ideia

**O modelo já sabe engenharia química e já sabe escolher a técnica.** Reator, flash, trocador, ajuste de cinética: ele resolve, e sabe quando integrar, achar raiz, ajustar ou otimizar. Por isso a skill não traz teoria nem catálogo de métodos. Uma lista de técnicas viraria o molde que todo exercício tentaria imitar.

**O que a skill traz é a forma pedagógica**: como a lição se compõe, o que cada parte precisa fazer, a disciplina com os números e os componentes que dão vida à página.

Isso saiu dos testes. No Teste 7, a seção de domínio que a skill carregava foi retirada inteira, e a simulação continuou fisicamente certa. Era peso morto.

## A lição

Quatro momentos, sempre nesta ordem. O conteúdo de cada um é o exercício que decide.

1. **Abertura**: que processo é este e o que ele pede.
2. **Modelo**: cada balanço **deduzido** do princípio de conservação até a equação final, com cada passo etiquetado (princípio, tradução, cinética, hipótese, álgebra, definição), e **a técnica** que vai resolvê-lo, com o nome e o porquê, em palavras do básico. É o que o aluno leva para o próximo exercício.
3. **Código**: passos revelados um a um, cada um com o porquê, mais uma verificação independente do resultado.
4. **Resultado**: a figura que responde a pergunta, com controles, e observações ancoradas **neste** caso, cada controle com a mesma mudança feita no código.

Ao lado da lição, um **editor de Python que roda ali mesmo**: o aluno monta o programa trazendo os passos da lição, roda e vê a saída e os gráficos.

Por cima disso, uma **caixa de ferramentas** opcional: o erro que parece certo, segundo eixo, dados contra modelo, diagrama. O modelo usa cada uma quando ela paga o tempo que custa.

## Estrutura

```
lesson-generator/
  README.md                        este arquivo
  Skill lesson-generator/          a skill: só o que o modelo usa
  Modelo Skill lesson-generator/   uma lição de exemplo, onde a estrutura é revisada ao vivo
  Testes Skill lesson-generator/   as execuções de teste, com o registro de cada uma
```

A pasta da skill tem só o que vai para o contexto do modelo. Este README, o modelo e os testes ficam fora dela de propósito: são para quem desenvolve a skill, e não ajudariam o modelo a escrever uma lição.

**A skill** (`Skill lesson-generator/`):

| Arquivo | Papel |
|---|---|
| `SKILL.md` | Tudo o que o modelo segue: como a sessão corre, onde escrever, a lição momento a momento, a cor, o editor, os números e os requisitos. |
| `templates/licao.html` | O esqueleto da lição, com a marcação de cada peça. A marcação mora **só aqui**. |
| `scripts/nova_licao.py` | Monta o rascunho da lição (o template e a cópia dos componentes) e anota para onde ela vai, sempre no lugar certo. |
| `scripts/empacotar.py` | Junta o rascunho e os componentes num **arquivo HTML único**, grava na pasta do aluno e apaga o rascunho. |
| `scripts/conferir.py` | Confere a lição pronta e diz o que corrigir: roda os passos colados em ordem, compara a resposta com o que o programa imprime, checa a estrutura e lista os números do texto para a revisão de procedência. |

**Regra do projeto:** o que pode ser garantido por script, componente ou template não fica como texto no `SKILL.md`. E toda mudança na estrutura da lição atualiza o `conferir.py` no mesmo commit; a lição modelo tem de passar nele sem erro.

**Componentes** (`Skill lesson-generator/assets/`), copiados para a pasta da lição:

| Arquivo | Papel |
|---|---|
| `lesson.css` | Tipografia, equações, blocos pedagógicos, tema claro/escuro, impressão — e as cores que ensinam: uma por grandeza do gráfico, uma para parâmetros, uma por momento, a procedência como etiqueta e o realce do código. |
| `codigo.js` | As linhas do tempo (dedução, código, observações), tudo começando recolhido, com o próximo item a ler pulsando, e cada item recolhível pela bolinha ou pelo título; as seções, também recolhidas de início; o botão de copiar; o realce do Python. |
| `grafico.js` | Qualquer figura x contra y: a lição registra a conta, ele desenha, com controles, segundo eixo, pontos e leitura sob o cursor. Traz `integrar`, `raiz` e `linspace` para a conta não reinventar nada, e **avisa no console** o que o autor não enxerga, como uma curva achatada. |
| `editor.js` | Um editor de Python ao lado da lição, que roda ali mesmo (Pyodide, baixado no primeiro uso). Começa vazio: cada bloco de código ganha um "→ editor" que o acrescenta ao fim, e o aluno monta o programa ele mesmo. Embaixo, a saída com texto, erros e figuras. As divisões se arrastam. |
| `tema.js` | Botão de claro/escuro, injetado sozinho. |

## Um arquivo, entregue pronto

O aluno recebe **um único arquivo HTML**, com os componentes embutidos: abre com dois cliques, em qualquer lugar, sem pasta ao lado e sem nada para extrair. É a mesma entrega no Claude Code e no chat do navegador. Só o editor usa a internet, para baixar o Python na primeira vez.

A lição não é editada depois de pronta, e a skill não guarda estado. Dúvida se responde no chat; uma lição com algo a mais, se o aluno pedir, é uma lição nova.

## Como usar

1. Instale a pasta `Skill lesson-generator/` como skill pessoal, com o nome do frontmatter: `~/.claude/skills/lesson-generator/`. Uma junção (ou link simbólico) para a pasta do repositório mantém a skill instalada sempre igual à do repositório.
2. Abra uma sessão nova, porque skills são descobertas na abertura.
3. Chame `/lesson-generator` e cole o exercício.

A skill é `disable-model-invocation: true`: nunca ativa sozinha.

Para mudar a estrutura da lição, trabalhe sobre `Modelo Skill lesson-generator/`, cujo README explica o fluxo. Para validar uma mudança, use `Testes Skill lesson-generator/`.
