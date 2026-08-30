# Formato da Lição

A lição é a unidade primária de ensino deste workspace, e **é a experiência inteira** — não um anexo à conversa. Um arquivo HTML autocontido em `./lessons/`, que o aluno abre e percorre sozinho: ele prevê, tenta, confere e recebe resposta dentro do próprio arquivo.

[SKILL.md](./SKILL.md) diz o que a lição precisa ser. Este documento diz como montá-la neste domínio.

## Nome do arquivo

O nome descreve **o conteúdo**, em kebab-case, curto o bastante para o aluno reconhecer a lição na lista seis meses depois:

```
lessons/quimiostato-washout-etanol.html
lessons/sinal-de-dsdt.html
lessons/monod-o-que-ks-significa.html
```

Sem numeração sequencial. O `000N` dizia "esta é a quarta lição do curso", e não há mais curso numerado: cada lição nasce do exercício que o aluno trouxe, na ordem em que ele os trouxe. Nome de conteúdo é o que ele consegue procurar.

Se o nome que você quer já existe, o problema é o nome: torne-o mais específico (`quimiostato-washout.html` → `quimiostato-washout-com-inibicao.html`). Nunca desambigue com sufixo numérico — reintroduz a numeração pela porta dos fundos e não diz nada.

## O índice

`lessons/INDEX.md` é a ordem que o nome do arquivo deixou de carregar. **Atualize-o na mesma ação em que cria a lição** — uma linha, no fim da tabela:

```md
# Lições

| Data | Arquivo | Degrau | Alvo |
|---|---|---|---|
| 2026-08-30 | [sinal-de-dsdt.html](./sinal-de-dsdt.html) | 3 | Acoplar consumo de substrato ao crescimento, com o sinal certo |
| 2026-09-04 | [quimiostato-washout.html](./quimiostato-washout.html) | 6 | Prever o D crítico e escolher o D que maximiza produtividade |
```

Serve a três coisas: você lê o índice ao abrir a sessão para saber o que já existe; a coluna **Degrau** é metade da checagem de pré-requisito (a outra metade é `./learning-records/`, onde está a evidência); e o aluno ganha uma porta de entrada para o que já recebeu.

Degrau é o do mapa de progressão de [SKILL.md](./SKILL.md), e ali ele é **referência**, não currículo: a coluna registra o que a lição exigiu, não uma posição em uma trilha.

## Anatomia

Não é camisa de força, mas a ordem importa: conhecimento com atrito baixo primeiro, habilidade com atrito alto depois.

1. **O gancho** — uma ou duas frases ligando a lição ao exercício que o aluno trouxe e à missão inferida. Por que *isto*, por que *agora*. Se você não consegue escrever este parágrafo, escolheu o alvo errado.
2. **A aposta declarada** — uma linha dizendo em que ponto você apostou que ele travou: *"Aposto que o seu problema não é o `solve_ivp`, é o sinal de `dS/dt`. Se eu errei, comece direto pela prática — e me diga."* Sem entrevista, a aposta é sua; declará-la é o que a torna corrigível.
3. **A pergunta de recuperação** — antes de ensinar, cobre algo de uma lição anterior, de memória. É espaçamento embutido e custa três linhas. Na primeira lição do workspace, cobre um pré-requisito do próprio exercício.
4. **O conhecimento** — o mínimo necessário para a habilidade do dia. Uma ideia. Fórmulas com todas as variáveis definidas e todas as unidades. Citações com link para `RESOURCES.md`.
5. **O modelo à vista** — as equações do caso, com cada termo anotado no que significa fisicamente. É aqui que se cria o hábito de ler equação como processo. As **hipóteses escondidas no enunciado** entram aqui, nomeadas: o que este modelo está fingindo que não existe.
6. **A prática** — o loop de feedback, dentro do arquivo. Onde a dificuldade entra de propósito. Um exercício, dos padrões abaixo, mais a escada de dicas.
7. **A verificação** — dois a quatro itens de quiz, curtos, de recuperação e não de reconhecimento.
8. **A fonte primária** — uma leitura ou vídeo recomendado, de `RESOURCES.md`, com o que procurar lá dentro.
9. **O fecho** — o que ficou comprimido em `./reference/`, link para lições vizinhas quando existirem, e o lembrete de que ele pode perguntar a você o que ficou obscuro. O lembrete não é decorativo: é o canal pelo qual a lição é corrigida depois (veja "Nota de dúvida").

Curta. Se o aluno leva mais de quinze ou vinte minutos, a lição tem dois alvos escondidos dentro — divida.

## A escada de dicas

O aluno não é conduzido por chat, então o "devolva o menor passo e espere" tem que existir **dentro do HTML**. É o que faz a classe `.escada`: uma pilha de `<details>`, cada um um degrau, do empurrão mínimo até a resposta.

```html
<div class="escada">
  <details>
    <summary>Não sei por onde começar</summary>
    <p>Quais são as variáveis de estado, e a unidade de cada uma? Escreva as três antes de abrir o próximo degrau.</p>
  </details>
  <details>
    <summary>Montei o balanço, mas não sei se está certo</summary>
    <p>Confira a unidade dos dois lados de <code>dS/dt</code>. A unidade denuncia sozinha.</p>
  </details>
  <details>
    <summary>Quero ver o balanço fechado</summary>
    <div class="equacao">dS/dt = −(1/Yx/s)·μ·X</div>
  </details>
</div>
```

Regras:

- **Do menor empurrão até a resposta, nessa ordem.** O primeiro degrau é sempre uma pergunta, nunca um pedaço da solução.
- **Três a quatro degraus.** Mais que isso vira menu, e menu se abre inteiro.
- **A resposta fica no último degrau**, e só nele. Abrir custa um clique consciente: é esse o atrito que substitui a sua espera no chat.
- **Cada `<summary>` nomeia um estado do aluno**, não um número. "Errei o sinal" abre; "Dica 2" não.
- A escada é a rede de segurança da aposta declarada: se você apostou no ponto errado, o degrau certo continua ali.

## Padrões de exercício

Os quatro loops de feedback que funcionam neste domínio. Escolha um por lição.

### Preveja e depois rode

O aluno descreve ou desenha a curva esperada **antes** de ver o resultado; então roda o simulador de `assets/simulador.js` e confronta. O erro de previsão é o conteúdo. Use `data-prever="1"` para manter as curvas ocultas até ele registrar a previsão.

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

Plante **um** defeito. Dois viram caça ao tesouro e o loop de feedback perde a mira. O diagnóstico fica no último degrau da escada, nunca ao lado do código.

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
- **O feedback é a correção que ele vai receber na hora**, e talvez a única. Escreva-o como escreveria a resposta no chat: nomeie a concepção errônea que leva àquela alternativa.

## Nota de dúvida

Quando o aluno volta com uma pergunta sobre uma lição já entregue, a resposta vai para **dois lugares**: o chat (direto, agora) e o **HTML daquela lição**, no ponto exato do texto onde a dúvida surgiu.

A marca é a classe `.nota-duvida` de `assets/lesson.css`, em duas formas:

```html
<!-- bloco: uma explicação inteira, enxertada logo depois do trecho que gerou a dúvida -->
<p class="nota-duvida">
  <span class="rotulo">Dúvida — 30/08</span>
  Yx/s é gX/gS: divide-se o ganho de biomassa pelo rendimento para saber quanto
  substrato sumiu. Multiplicar dá um número menor, e a curva de S ainda cai —
  por isso o erro passa despercebido.
</p>

<!-- em linha: uma frase enxertada no meio do parágrafo existente -->
<p>… μ depende de S <mark class="nota-duvida">— e é só por isso que a curva
deixa de ser exponencial quando o substrato acaba</mark>, o que muda a forma …</p>
```

Regras:

- **No ponto exato**, não no fim do arquivo. Nota de dúvida no rodapé é apêndice; no ponto exato, ela reescreve a lição.
- **Sempre a mesma classe.** Mesmo visual em toda lição de todo aluno — é o que faz o aluno reconhecer, ao reabrir, que aquele trecho nasceu de uma pergunta dele. Não crie variantes.
- **Não apague o texto original.** A nota acrescenta; o trecho que gerou a confusão continua ali. Se ele estava errado, corrija-o e explique a correção na nota.
- **Rótulo com a data** quando a lição já tem mais de uma nota: a ordem das dúvidas é informação.
- **Reabra o arquivo** para o aluno depois de editar, e diga em uma linha que ele foi atualizado.
- Uma dúvida esclarecida assim costuma valer **registro de aprendizado** — é evidência de primeira qualidade, de concepção corrigida ou de lacuna revelada. Vale a regra de sempre: por evidência, nunca por cobertura.

## Requisitos técnicos

- **HTML autocontido**, exceto pelos links relativos aos componentes de `./assets/`. Deve abrir com duplo clique, sem servidor e sem internet.
- **A lição funciona com o chat fechado.** Este é o teste: um aluno que abre o arquivo e nunca mais fala com você consegue prever, tentar, errar, ver por que errou e chegar ao fim. Se algum passo depende de você responder, o passo está no lugar errado.
- **Linka `assets/lesson.css`.** Sempre. É o que faz o conjunto parecer um curso.
- **Reusa `assets/quiz.js` e `assets/simulador.js`** em vez de reimplementar. Se precisar de algo novo e reusável, escreva componente novo em `./assets/` e linke.
- **Âncoras HTML** para outras lições e para os documentos de `./reference/`, com caminho relativo (`../reference/equacoes.html`). Entre lições, use o nome de conteúdo (`./sinal-de-dsdt.html`).
- **Imprime bem.** O aluno pode querer estudar no papel; `lesson.css` já traz as regras de impressão.
- **Todo código exibido roda.** Se aparece na lição, é executável, com as dependências declaradas.
- **Todo parâmetro tem unidade e procedência.** Valor sem fonte vem marcado como ilustrativo, explicitamente. Parâmetro que faltava no enunciado aparece como suposição declarada, com a ordem de grandeza justificada.
- **Todo gráfico tem eixos rotulados com unidade.** O gráfico é parte da explicação, não decoração.

Comece a partir de [templates/licao.html](./templates/licao.html).

## Modos de falha

- **A lição que resolve.** Ensina explicando a solução completa. O aluno acompanha, concorda e não retém nada. É o modo de falha padrão desta skill — e ele fica mais perto quando o exercício chega pronto, já pedindo a resposta.
- **A lição que precisa do chat.** A prática diz "me mande sua previsão que eu confiro". O aluno fecha o arquivo e acabou. Se o loop não fecha dentro do HTML, não é loop.
- **A lição que aposta e não avisa.** Você apostou no ponto de travamento — legítimo — mas não declarou a aposta nem deixou escada. Quando a aposta erra, o aluno não tem para onde ir.
- **A lição com dois alvos.** Monod e `solve_ivp` na mesma lição. A memória de trabalho estoura e nenhum dos dois gruda.
- **A lição bonita e desancorada.** Tipografia impecável, quimiostato genérico, nada a ver com o exercício que ele trouxe. Some da memória em uma semana.
- **O quiz de reconhecimento.** Alternativas em que a certa é obviamente a certa. Mede leitura atenta, não conhecimento.
- **O parâmetro inventado.** Um μmax plausível sem fonte. Ensina um número errado com aparência de dado.
- **A lição sem loop.** Só exposição, nenhum momento em que o aluno produz algo e recebe resposta. É leitura, não lição.
