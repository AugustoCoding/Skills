# Testes da Skill Simulação Fermentação

Cada execução de teste tem sua própria pasta aqui, com a documentação do teste e a saída do modelo lado a lado. O objetivo não é só saber se funcionou: é conseguir **reproduzir** a execução meses depois e enxergar a evolução da skill entre uma versão e outra.

```
Testes Skill Simulação Fermentação/
  INDEX.md            histórico: uma linha por teste
  TEMPLATE-SESSAO.md  o registro em branco, para copiar
  Teste 1/
  Teste 2/
  ...
```

A pasta da skill (`../Skill Simulação Fermentação/`) é somente leitura durante o teste. Se aparecer arquivo novo lá depois de uma execução, o teste falhou numa regra estrutural da skill — vale registrar como achado.

## O que fica em cada `Teste N/`

```
Teste N/
  SESSAO.md      o registro do teste: versão da skill, ambiente, prompt exato, avaliação
  EXERCICIO.md   o enunciado usado como entrada, e o que ele testa de propósito
  com-skill/     workspace do modelo COM a skill — tudo que ele gerar cai aqui
  sem-skill/     opcional: a mesma entrada, sem a skill, para comparar
```

`SESSAO.md` e `EXERCICIO.md` são escritos por você; `com-skill/` é escrito pelo modelo. Manter os dois lados separados é o que permite apagar e refazer a execução sem perder a documentação.

**`com-skill/` começa sempre vazio.** Todo teste parte do zero — nada de aproveitar o workspace de um teste anterior. É o que torna a saída inteiramente atribuível àquela execução e àquela versão da skill; um workspace herdado mistura o que o modelo fez agora com o que ele fez antes, e um artefato velho lá dentro ainda pode servir de molde para o novo.

A consequência a ter em mente: os comportamentos de **sessão de retorno** — pergunta de recuperação, índice que cresce, missão revisada, ponte de pré-requisito — não aparecem em workspace vazio. Para testá-los, mande dois exercícios na mesma sessão e avalie o segundo.

**`EXERCICIO.md` não vai para o modelo.** Ele contém o gabarito das armadilhas plantadas no enunciado. Para o modelo vai só o bloco de prompt de `SESSAO.md`.

## Rastreabilidade

Um teste só vale se der para responder, depois, "com o que exatamente isso foi rodado?". O `SESSAO.md` registra, no mínimo:

- **commit da skill** e branch, mais se havia alteração não commitada;
- **como a skill foi instalada** e com que nome de pasta;
- **modelo exato**, cliente e versão, modo e permissões;
- **se havia acesso à web** — muda o comportamento, porque `RESOURCES.md` vem todo `[a verificar]` e a skill proíbe citar fonte não conferida;
- **o prompt literal**, e os turnos seguintes na ordem, com o que cada um testa;
- **os achados** e o commit que os corrigiu.

Depois de fechar o teste, acrescente a linha em [INDEX.md](./INDEX.md).

## Como rodar um teste

1. Crie `Teste N/`, copie [TEMPLATE-SESSAO.md](./TEMPLATE-SESSAO.md) para `Teste N/SESSAO.md` e crie `Teste N/com-skill/` **vazia**.
2. Escreva `Teste N/EXERCICIO.md`: o enunciado e, em tabela, o que cada armadilha deve provocar. Enunciado sem armadilha declarada é difícil de avaliar depois.
3. Preencha as seções 1 a 4 do `SESSAO.md` **antes** de rodar — inclusive o prompt exato. Prompt improvisado na hora não é reproduzível.
4. Em outra sessão, carregue a skill e cole o prompt. Indique `Teste N/com-skill/` como workspace quando quiser a saída dentro do teste; **não indique nada** quando o que estiver sendo testado for a escolha automática de pasta.
5. Faça o papel do aluno pelos turnos previstos. Não responda o que não foi perguntado: se o modelo entrevistar, o teste já falhou o critério principal — registre e siga.
6. Volte com **uma dúvida específica** sobre um trecho da lição. É assim que se testa a nota de dúvida.
7. Abra a lição no navegador e confira que renderiza, que o quiz responde e que o simulador desenha.
8. Preencha as seções 5 a 9, acrescente a linha no `INDEX.md`, e abra os commits de correção que os achados exigirem.

Para comparar com e sem a skill, rode o mesmo prompt nas duas condições e guarde a saída crua em `sem-skill/`. A diferença que interessa não é a qualidade do código produzido: é se o modelo ensinou ou apenas resolveu.

## O que olhar ao avaliar

Dois modos de falha centrais agora: a **teoria comendo o código** (a estrela da skill é programar) e o **tutorial que se lê no automático** (tudo explicado, nada previsto). O resto é secundário.

**Comportamento**

- [ ] **Não entrevistou.** Nenhuma pergunta sobre missão, nível, travamento ou pasta antes de produzir a lição.
- [ ] Escolheu o workspace sozinho (ou usou o indicado), **avisou em uma linha depois de escrever**, e não tocou na pasta da skill?
- [ ] Preencheu `MISSION.md` por inferência, marcando o que é inferência e de qual exercício veio?
- [ ] **Resolveu a questão inteira num arquivo só**, sem prometer continuação e sem mandar abrir outro documento?
- [ ] Declarou em uma linha onde apostou que estava a dificuldade?
- [ ] Faltando pré-requisito registrado, a ponte entrou como estação zero **do mesmo arquivo**?
- [ ] Falou pouco no chat — onde escreveu, qual foi a aposta, o convite a perguntar — sem repetir a lição ali?
- [ ] Abriu o arquivo automaticamente via CLI?
- [ ] Escreveu registro de aprendizado só onde houve evidência, não onde houve cobertura?

**A dúvida pós-entrega**

- [ ] Respondeu no chat **e** editou o HTML da lição?
- [ ] A explicação entrou no **ponto exato** onde a dúvida surgiu, não no rodapé?
- [ ] Usou a classe `.nota-duvida`, sem inventar variante, e sem apagar o texto original?
- [ ] Reabriu o arquivo e avisou que ele foi atualizado?

**Estrutura da lição**

- [ ] **Quatro estações** na ordem: modelo · código · resultado · crítica?
- [ ] **A estação de código é a maior da lição?** (se a teoria for maior, é reprovação direta)
- [ ] Teoria de fermentação dentro das 400 palavras?
- [ ] O código está **completo, comentado e explicado passo a passo**, com as escolhas justificadas — por que `solve_ivp`, por que o evento, o que `t_eval` faz?
- [ ] **Duas previsões**, cada uma com a resposta atrás de um clique — nem nenhuma, nem quatro?
- [ ] **Explorador de variantes** na estação de código, com escolhas **corretas entre si** e nenhum erro plantado?
- [ ] **Simulador de parâmetros** na estação de crítica?
- [ ] **Nenhum link interno**: nem `RESOURCES.md`, nem `reference/`, nem outra lição?
- [ ] Nenhuma promessa de continuação ("na próxima lição…")?
- [ ] Sem floreio — no máximo uma curiosidade lateral, nada de recapitulação?

**Artefatos**

- [ ] A lição abre no navegador, com estilo, quiz, simulador e explorador funcionando?
- [ ] **As equações estão em MathML**, com cara de livro, e não em texto cru?
- [ ] O **botão de claro/escuro** aparece e alterna, e o gráfico repinta junto?
- [ ] **Funciona com o chat fechado e sem abrir outro arquivo?**
- [ ] O nome do arquivo descreve o conteúdo, sem numeração `000N`?
- [ ] `lessons/INDEX.md` ganhou a linha correspondente, com data, degrau e alvo?
- [ ] Quiz com **duas** perguntas, alternativas de comprimento parecido? (o `quiz.js` avisa no console quando não)
- [ ] O código exibido roda?

**Correção técnica**

- [ ] **Os números-alvo foram conferidos rodando o modelo?** Recalcule pelo menos um.
- [ ] **Varredura de procedência**: todo número — inclusive faixas e percentuais — é dado do enunciado, fonte citada ou suposição marcada?
- [ ] Sinais e rendimentos corretos nos balanços? As unidades fecham?
- [ ] Nenhum link de dentro do workspace para a pasta da skill ou para caminho absoluto?

Um teste que produz uma lição bonita e correta, mas em que a teoria comeu o código, ou em que o aluno pôde ler tudo sem prever nada, é um teste **reprovado**.
