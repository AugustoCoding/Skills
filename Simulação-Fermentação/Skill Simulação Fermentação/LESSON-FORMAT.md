# Formato da Lição

A lição é a unidade primária de ensino deste workspace. Um arquivo HTML autocontido em `./lessons/`, nomeado `000N-nome-em-kebab.html`, com o número incrementando a cada nova lição.

[SKILL.md](./SKILL.md) diz o que a lição precisa ser. Este documento diz como montá-la neste domínio.

## Anatomia

Não é camisa de força, mas a ordem importa: conhecimento com atrito baixo primeiro, habilidade com atrito alto depois.

1. **O gancho** — uma ou duas frases ligando a lição à missão. Por que *isto*, por que *agora*. Se você não consegue escrever este parágrafo, escolheu o alvo errado.
2. **A pergunta de recuperação** — antes de ensinar, cobre algo da lição anterior, de memória. É espaçamento embutido e custa três linhas.
3. **O conhecimento** — o mínimo necessário para a habilidade do dia. Uma ideia. Fórmulas com todas as variáveis definidas e todas as unidades. Citações com link para `RESOURCES.md`.
4. **O modelo à vista** — as equações do caso, com cada termo anotado no que ele significa fisicamente. É aqui que se cria o hábito de ler equação como processo.
5. **A prática** — o loop de feedback. Onde a dificuldade entra de propósito. Um exercício, dos padrões abaixo.
6. **A verificação** — dois a quatro itens de quiz, curtos, de recuperação e não de reconhecimento.
7. **A fonte primária** — uma leitura ou vídeo recomendado, de `RESOURCES.md`, com o que procurar lá dentro.
8. **O fecho** — o que ficou comprimido em `./reference/`, link para a próxima lição quando existir, e o lembrete de que ele pode perguntar a você o que ficou obscuro.

Curta. Se o aluno leva mais de quinze ou vinte minutos, a lição tem dois alvos escondidos dentro — divida.

## Padrões de exercício

Os quatro loops de feedback que funcionam neste domínio. Escolha um por lição.

### Preveja e depois rode

O aluno descreve ou desenha a curva esperada **antes** de ver o resultado; então roda o simulador de `assets/simulador.js` e confronta. O erro de previsão é o conteúdo.

Perguntas que funcionam: onde S chega a zero? X para de crescer antes ou depois? o que muda se μmax dobrar? e se Ks dobrar? Ks alto e Ks baixo dão curvas visualmente diferentes — o aluno consegue dizer qual é qual sem rótulo?

O melhor exercício deste domínio. Barato de montar e implacável: previsão errada não tem como ser racionalizada depois.

### Conserte o código quebrado

Você entrega uma simulação com **um** defeito plantado. O aluno acha. Bons defeitos, em ordem crescente de dificuldade:

- sinal invertido em `dS/dt` — S sobe, denuncia sozinho no gráfico;
- multiplicação em vez de divisão por Yx/s — magnitude errada, forma certa: mais difícil;
- `X0 = 0` — a reta plana que parece bug do integrador e é matemática;
- janela de tempo em minutos com parâmetros em horas — curva "não sai do lugar";
- `Ks` e `μmax` trocados de lugar na expressão de Monod;
- termo de diluição faltando em uma só das três equações do quimiostato — o mais sutil, e o que mais ensina.

Plante **um** defeito. Dois viram caça ao tesouro e o loop de feedback perde a mira.

### Diagnostique o gráfico

Um resultado visivelmente errado, sem o código à vista. A pergunta não é "está errado?" e sim "qual termo do modelo produziu isso?". Força o aluno a percorrer o caminho equação → comportamento, que é o inverso do que ele treina em aula.

### Das unidades ao modelo

Uma tabela de parâmetros com valores e unidades, sem as equações. O aluno monta o sistema coerente. Serve para diagnosticar se ele entende os balanços ou se decorou o formato. Excelente como intercalação: misture parâmetros de batelada e de quimiostato e peça que ele decida qual regime os parâmetros descrevem.

## Regras de quiz

- **Recuperação, não reconhecimento.** "Qual é a unidade de Ks?" vale mais que "Ks é: (a) g/L (b) 1/h (c) adimensional" — quando puder, use resposta aberta ou numérica do `assets/quiz.js`.
- **Alternativas do mesmo tamanho.** Toda alternativa com o mesmo número de palavras e, se possível, de caracteres. Nenhuma pista de formatação: nada de a alternativa correta ser a mais longa, a mais precisa ou a mais cuidadosa.
- **Distratores plausíveis vêm do catálogo.** Use as concepções errôneas de [rules.md](./rules.md). Um distrator que ninguém escolheria não mede nada; um distrator que é a confusão real do aluno mede exatamente o que interessa.
- **Feedback explica o mecanismo.** Não "errado, é 1/h", mas "1/h, porque μ é taxa por unidade de biomassa: o X que multiplica é quem carrega g/L".
- **Duas a quatro perguntas.** Quiz longo vira prova, e prova sinaliza avaliação em vez de aprendizado.

## Requisitos técnicos

- **HTML autocontido**, exceto pelos links relativos aos componentes de `./assets/`. Deve abrir com duplo clique, sem servidor e sem internet.
- **Linka `assets/lesson.css`.** Sempre. É o que faz o conjunto parecer um curso.
- **Reusa `assets/quiz.js` e `assets/simulador.js`** em vez de reimplementar. Se precisar de algo novo e reusável, escreva componente novo em `./assets/` e linke.
- **Âncoras HTML** para outras lições e para os documentos de `./reference/`, com caminho relativo (`../reference/equacoes.html`).
- **Imprime bem.** O aluno pode querer estudar no papel; `lesson.css` já traz as regras de impressão.
- **Todo código exibido roda.** Se aparece na lição, é executável, com as dependências declaradas.
- **Todo parâmetro tem unidade e procedência.** Valor sem fonte vem marcado como ilustrativo, explicitamente.
- **Todo gráfico tem eixos rotulados com unidade.** O gráfico é parte da explicação, não decoração.

Comece a partir de [templates/licao.html](./templates/licao.html).

## Modos de falha

- **A lição que resolve.** Ensina explicando a solução completa. O aluno acompanha, concorda e não retém nada. É o modo de falha padrão desta skill.
- **A lição com dois alvos.** Monod e `solve_ivp` na mesma lição. A memória de trabalho estoura e nenhum dos dois gruda.
- **A lição bonita e desancorada.** Tipografia impecável, quimiostato genérico, nada a ver com a missão. Some da memória em uma semana.
- **O quiz de reconhecimento.** Alternativas em que a certa é obviamente a certa. Mede leitura atenta, não conhecimento.
- **O parâmetro inventado.** Um μmax plausível sem fonte. Ensina um número errado com aparência de dado.
- **A lição sem loop.** Só exposição, nenhum momento em que o aluno produz algo e recebe resposta. É leitura, não lição.
