# lesson-generator — aprender a programar a solução de um exercício

Transforma um exercício de engenharia química numa **lição HTML** que ensina o aluno a programar a solução em Python.

A skill não resolve o enunciado por ele nem dá aula de teoria: mostra o programa sendo construído, passo a passo, deixa o aluno mexer no resultado e, no fim, o faz programar uma variação sozinho.

## A ideia

**O modelo já sabe engenharia química e já sabe escolher a técnica.** Reator, flash, trocador, ajuste de cinética: ele resolve, e sabe quando integrar, achar raiz, ajustar ou otimizar. Por isso a skill não traz teoria nem catálogo de métodos. Uma lista de técnicas viraria o molde que todo exercício tentaria imitar.

**O que a skill traz é a forma pedagógica**: como a lição se compõe, o que cada parte precisa fazer, a disciplina com os números e os componentes que dão vida à página.

Isso saiu dos testes. No Teste 7, a seção de domínio que a skill carregava foi retirada inteira, e a simulação continuou fisicamente certa. Era peso morto.

## A lição

Cinco momentos, sempre nesta ordem. O conteúdo de cada um é o exercício que decide.

1. **Abertura**: que processo é este e o que ele pede.
2. **Modelo**: cada balanço **deduzido** do princípio de conservação até a equação final, com cada passo etiquetado (princípio, tradução, cinética, hipótese, álgebra, definição), e o **tipo de problema matemático**. É o que o aluno leva para o próximo exercício.
3. **Código**: passos revelados um a um, cada um com o porquê, mais uma verificação independente do resultado.
4. **Resultado**: a figura que responde a pergunta, com controles, e observações ancoradas **neste** caso, cada controle com a mesma mudança mostrada no código Python.
5. **Sua vez**: uma variação que o aluno programa sozinho, com dica e resposta escondidas.

Por cima disso, uma **caixa de ferramentas** opcional: pense antes, o erro que parece certo, segundo eixo, dados contra modelo, diagrama. O modelo usa cada uma quando ela paga o tempo que custa.

## Estrutura

| Arquivo | Papel |
|---|---|
| `SKILL.md` | O que é da skill e o que é do modelo, como a sessão corre, como achar os números, onde escrever. Ponto de entrada. |
| `LESSON-FORMAT.md` | Os cinco momentos (com a dedução dos balanços no modelo), a caixa de ferramentas, a cor, a procedência dos números. |
| `templates/licao.html` | O esqueleto da lição, com a marcação de cada peça. A marcação mora **só aqui**. |

**Componentes** (`assets/`), copiados para a pasta da lição:

| Arquivo | Papel |
|---|---|
| `lesson.css` | Tipografia, equações, blocos pedagógicos, tema claro/escuro, impressão — e as cores que ensinam: uma por grandeza do gráfico, uma para parâmetros, uma por momento, a procedência como etiqueta e o realce do código. |
| `codigo.js` | A seção de código: revela os passos, separa a pergunta do código no "pense antes", libera o programa e a resposta no fim, põe o botão de copiar e pinta o Python com cores de IDE. |
| `grafico.js` | Qualquer figura x contra y: a lição registra a conta, ele desenha, com controles, segundo eixo, pontos e leitura sob o cursor. Traz `integrar`, `raiz` e `linspace` para a conta não reinventar nada, e **avisa no console** o que o autor não enxerga, como uma curva achatada. |
| `tema.js` | Botão de claro/escuro, injetado sozinho. |

## Sem estado, de propósito

Cada sessão trata de um exercício e termina nele. A única memória é a própria lição: quando o aluno volta com uma dúvida, a resposta vai para o chat **e** para o HTML, no ponto exato onde a dúvida surgiu.

## Como usar

1. Instale como skill pessoal, numa pasta com o nome do frontmatter: `~/.claude/skills/lesson-generator/`.
2. Abra uma sessão nova, porque skills são descobertas na abertura.
3. Chame `/lesson-generator` e cole o exercício.

A skill é `disable-model-invocation: true`: nunca ativa sozinha.

Para validar mudanças, use `../Testes Skill lesson-generator/`.
