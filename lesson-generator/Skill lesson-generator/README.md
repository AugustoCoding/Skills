# lesson-generator — lições de simulação de fermentação

Transforma um exercício de fermentação numa **lição HTML** que ensina o aluno a programar aquela simulação em Python.

A skill não resolve o enunciado por ele nem dá uma aula de bioprocessos: ela mostra o programa sendo construído, passo a passo, e depois deixa o aluno mexer no resultado.

## Como funciona

O aluno cola o exercício e chama a skill. Não há entrevista, não há estado guardado, não há continuação prometida. O que sai é um arquivo:

```
exercício → diagnóstico silencioso → código rodado e conferido → lição aberta no navegador
```

A lição tem **três divisões**:

1. **Teoria** — breve. Equações em MathML, tabela de parâmetros com unidades, e para que servem.
2. **Código** — o centro. Blocos revelados um a um pelo aluno, cada um com título, trecho de código e o porquê daquela decisão. No fim, o programa completo colapsado com botão de copiar, e a resposta numérica atrás de um botão.
3. **Análise crítica** — o simulador de parâmetros, e a leitura do resultado daquele exercício: por que esta curva faz isto aqui, e o que muda quando você mexe naquilo.

**Não há teto de palavras.** A lição é tão longa quanto precisa para explicar direito: corta-se o que não ensina, nunca se abrevia o que ensina.

**Precisa de um exercício.** Pedido genérico ("me ensina quimiostato") está fora do escopo: o modelo diz isso em uma linha e responde normalmente, sem produzir lição.

## Estrutura

| Arquivo | Papel |
|---|---|
| `SKILL.md` | O que a skill é, como a sessão corre, as regras que não se negociam. Ponto de entrada. |
| `LESSON-FORMAT.md` | Como a lição é montada, divisão por divisão. |
| `templates/licao.html` | O esqueleto da lição, com a marcação de cada peça. Copiar sai mais rápido e mais fiel que deduzir da prosa — e por isso a marcação mora **só aqui**. |
| `templates/componente.js` | Esqueleto de componente de gráfico, para quando o exercício pedir uma figura que o `simulador.js` não faz. Roda como está; troca-se identidade, cálculo e leitura. |

**Componentes** (`assets/`), copiados para o workspace do aluno:

| Arquivo | Papel |
|---|---|
| `lesson.css` | Folha de estilo. Tipografia limpa, equações, tema claro/escuro, impressão. |
| `codigo.js` | A seção de código: revela os passos um a um, libera o programa completo no fim e injeta o botão de copiar. |
| `simulador.js` | O motor: integra o sistema de EDOs que a lição registra e desenha as variáveis de estado contra o tempo, com controles deslizantes. **Nenhum modelo vem pronto** — cada lição registra o do exercício dela, e por isso o gráfico não pode discordar do código ensinado. |
| `tema.js` | Botão de claro/escuro, que se injeta sozinho e lembra a escolha. |

## O workspace do aluno

```
aula-fermentacao/
  assets/                    cópia dos componentes
  nome-do-exercicio.html     uma lição por exercício
```

Nenhuma contabilidade é escrita — sem arquivo de estado, sem índice, sem registro. Componente novo, quando o exercício pedir uma figura que os existentes não fazem, entra em `assets/` do workspace. A pasta da skill é somente leitura durante a sessão.

## Sem estado, de propósito

Cada sessão trata de um exercício e termina nele. Não há missão, registro de aprendizado, glossário nem índice — a skill já teve tudo isso, e o custo de manter essa contabilidade aparecia como tempo de espera para o aluno.

A única memória é a própria lição: quando ele volta com uma dúvida, a resposta vai para o chat **e** para o HTML, no ponto exato onde a dúvida surgiu, com destaque de marca-texto. O arquivo é reaberto.

## Como usar

1. Instale como skill pessoal, em pasta com o nome do frontmatter: `~/.claude/skills/lesson-generator/`.
2. Abra uma sessão nova — skills são descobertas na abertura.
3. Chame `/lesson-generator` e cole o exercício.

A skill é `disable-model-invocation: true`: nunca ativa sozinha.

Para validar mudanças, use `../Testes Skill lesson-generator/`, onde cada execução tem sua pasta e seu registro de reprodutibilidade.
