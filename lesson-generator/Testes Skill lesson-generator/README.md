# Testes da skill lesson-generator

> **Nota de 2026-09-01.** A skill se chamava `simulacao-fermentacao` e as pastas tinham
> os nomes antigos. Os registros dos testes 1 a 4 preservam o nome e os caminhos da
> época — eles documentam o que foi rodado, e reescrevê-los falsificaria o histórico.
> Para repetir um teste antigo, troque o caminho pelo atual.

Cada execução de teste tem sua própria pasta aqui, com a documentação do teste e a saída do modelo lado a lado. O objetivo não é só saber se funcionou: é conseguir **reproduzir** a execução meses depois e enxergar a evolução da skill entre uma versão e outra.

```
Testes Skill lesson-generator/
  INDEX.md            histórico: uma linha por teste
  TEMPLATE-SESSAO.md  o registro em branco, para copiar
  Teste 1/
  Teste 2/
  ...
```

A pasta da skill (`../Skill lesson-generator/`) é somente leitura durante o teste. Se aparecer arquivo novo lá depois de uma execução, o teste falhou numa regra estrutural da skill — vale registrar como achado.

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
4. **Inicie a sessão à mão**, nova, numa pasta vazia fora do repositório, como a de um aluno (`~/testes-lesson-generator/teste-N/`), e cole o prompt como primeira mensagem. Uma sessão iniciada por outra (`start_session`) recebe o prompt embrulhado e não executa o `/lesson-generator` (Teste 9); uma sessão dentro do repositório acha o `SKILL.md` sozinha e mascara a invocação (Teste 8). Depois, copie a lição para `Teste N/com-skill/` e apague a pasta do aluno. Ela fica fora do repositório porque, dentro dele, a sessão recebe o contexto do git (branch, commits recentes, arquivos alterados) e pode explorar a lição de referência e os testes anteriores.
5. **Cronometre.** Marque a hora ao enviar o prompt e ao aparecer a última linha. É a métrica que mais dói quando escapa.
6. **Um turno só.** O teste avalia a produção da lição e para aí — nada de fazer o papel do aluno em turnos seguintes. Se o modelo entrevistar, o teste já falhou o critério principal: registre e encerre.
7. **Avalie pelo histórico e pela lição**, não por um relatório do modelo. O tempo sai dos registros da sessão; os passos, do histórico; os números, de uma conferência por fora; e a lição é aberta no navegador, com o editor rodando o programa. No Teste 9, pedir ao modelo um relato das próprias dúvidas foi barrado duas vezes pelo filtro de segurança (`reasoning_extraction`). O relatório é opcional e, se pedido, deve tratar só do documento da skill, sem pedir o raciocínio do modelo.
8. Abra a lição no navegador e confira que renderiza: os passos revelam, o botão de copiar copia, o gráfico desenha e o tema alterna.
9. Preencha as seções 5 a 9, acrescente a linha no `INDEX.md`, e abra os commits de correção que os achados exigirem.

Para comparar com e sem a skill, rode o mesmo prompt nas duas condições e guarde a saída crua em `sem-skill/`. A diferença que interessa não é a qualidade do código produzido: é se o modelo ensinou ou apenas resolveu.

## O que olhar ao avaliar

Dois modos de falha centrais: a **teoria comendo o código**, e a **análise crítica genérica** — aquela que fala do que o modelo ignora em vez de ler a curva daquele exercício. E, acima dos dois, o **tempo**: a lição precisa sair em minutos, não em um quarto de hora.

**Tempo e tamanho**

- [ ] A sessão inteira levou menos de 5 minutos?
- [ ] A lição ficou perto de 1.000 palavras visíveis? (meça — foi o número que revelou o problema nos dois primeiros testes)
- [ ] Código e análise crítica juntos pesam mais que a teoria?

**Comportamento**

- [ ] Não entrevistou: nenhuma pergunta antes de produzir a lição
- [ ] Não escreveu contabilidade: nenhum arquivo de estado, índice ou registro
- [ ] Se o exercício pedia uma figura que os componentes não fazem (varredura de parâmetro, por exemplo), **escreveu o componente** em vez de deixar a figura de fora
- [ ] Rodou o código antes de publicar os números
- [ ] Avisou onde escreveu, em uma linha, e abriu o arquivo via CLI
- [ ] Falou pouco no chat, sem repetir a lição ali
- [ ] Pedido genérico, sem exercício: recusou a lição em uma linha e respondeu normalmente

**Divisão 1 — teoria**

- [ ] Equações em **MathML**, com cara de livro, não em texto cru
- [ ] Tabela de parâmetros com símbolo, valor, unidade e procedência
- [ ] Breve: sem história, sem derivação, sem recapitulação

**Divisão 2 — código**

- [ ] Passos revelados um a um, **no máximo seis**
- [ ] Cada passo com título, trecho de código e o **porquê** da decisão (não o que a linha faz)
- [ ] Programa completo colapsado no fim, executável, com botão de copiar
- [ ] Resposta numérica atrás de um botão que só abre e mostra
- [ ] Botão de copiar funcionando em cada bloco

**Divisão 3 — análise crítica**

- [ ] Simulador com **no máximo quatro controles**, só de parâmetros que o texto discute
- [ ] A curva responde **na hora** ao slider (sem esconder atrás de clique)
- [ ] Duas a quatro observações, cada uma ancorada num ponto concreto da curva **deste** exercício
- [ ] Pelo menos uma manda mexer num controle e diz o que procurar
- [ ] **Nenhuma frase que serviria para outro exercício** — nada de lista de hipóteses ou "o modelo ignora X"

**Correção técnica**

- [ ] Os números batem? Recalcule pelo menos um por fora do integrador
- [ ] **Resolveu analiticamente onde havia solução fechada**, usando a integração para confirmar — e não o contrário
- [ ] Nenhum número ilustrativo escrito como se fosse medido
- [ ] Todo número é dado do enunciado ou suposição declarada — **nenhuma citação de literatura**
- [ ] Sinais, rendimentos e unidades corretos
- [ ] O botão de claro/escuro aparece e alterna
- [ ] Nenhum link interno, nenhuma promessa de continuação

Lição bonita e correta em que a teoria comeu o código, ou em que a análise crítica é genérica, é teste **reprovado**.
