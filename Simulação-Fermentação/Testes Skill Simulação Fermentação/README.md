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

1. Crie `Teste N/`, copie [TEMPLATE-SESSAO.md](./TEMPLATE-SESSAO.md) para `Teste N/SESSAO.md` e crie `Teste N/com-skill/`.
2. Escreva `Teste N/EXERCICIO.md`: o enunciado e, em tabela, o que cada armadilha deve provocar. Enunciado sem armadilha declarada é difícil de avaliar depois.
3. Preencha as seções 1 a 4 do `SESSAO.md` **antes** de rodar — inclusive o prompt exato. Prompt improvisado na hora não é reproduzível.
4. Em outra sessão, carregue a skill e cole o prompt. Indique `Teste N/com-skill/` como workspace quando quiser a saída dentro do teste; **não indique nada** quando o que estiver sendo testado for a escolha automática de pasta.
5. Faça o papel do aluno pelos turnos previstos. Não responda o que não foi perguntado: se o modelo entrevistar, o teste já falhou o critério principal — registre e siga.
6. Volte com **uma dúvida específica** sobre um trecho da lição. É assim que se testa a nota de dúvida.
7. Abra a lição no navegador e confira que renderiza, que o quiz responde e que o simulador desenha.
8. Preencha as seções 5 a 9, acrescente a linha no `INDEX.md`, e abra os commits de correção que os achados exigirem.

Para comparar com e sem a skill, rode o mesmo prompt nas duas condições e guarde a saída crua em `sem-skill/`. A diferença que interessa não é a qualidade do código produzido: é se o modelo ensinou ou apenas resolveu.

## O que olhar ao avaliar

O modo de falha central da skill é escorregar para resolvedor. O segundo é a lição que só funciona com o chat aberto. O resto é secundário.

**Comportamento**

- [ ] **Não entrevistou.** Nenhuma pergunta sobre missão, nível, travamento ou pasta antes de produzir a lição.
- [ ] Escolheu o workspace sozinho (ou usou o indicado), **avisou em uma linha depois de escrever**, e não tocou na pasta da skill?
- [ ] Preencheu `MISSION.md` por inferência, marcando o que é inferência e de qual exercício veio?
- [ ] Diante de um enunciado pronto, produziu lição em vez de solução completa?
- [ ] **Declarou a aposta diagnóstica** em uma linha dentro da lição?
- [ ] Escolheu **um** alvo, e checou o pré-requisito contra `learning-records/` antes?
- [ ] Falou pouco no chat — onde escreveu, qual foi a aposta, o convite a perguntar — sem repetir a lição ali?
- [ ] Abriu o arquivo automaticamente via CLI?
- [ ] Escreveu registro de aprendizado só onde houve evidência, não onde houve cobertura? (Na primeira sessão, o normal é **nenhum**.)

**A dúvida pós-entrega**

- [ ] Respondeu no chat **e** editou o HTML da lição?
- [ ] A explicação entrou no **ponto exato** onde a dúvida surgiu, não no rodapé?
- [ ] Usou a classe `.nota-duvida`, sem inventar variante, e sem apagar o texto original?
- [ ] Reabriu o arquivo e avisou que ele foi atualizado?
- [ ] A dúvida gerou registro, se houve evidência de concepção corrigida ou lacuna revelada?

**Artefatos**

- [ ] A lição abre no navegador, com estilo, quiz e simulador funcionando?
- [ ] **Funciona com o chat fechado**: dá para prever, tentar, errar e descobrir por que errou sem falar com o modelo?
- [ ] Tem escada de dicas, com a resposta fechada só no último degrau?
- [ ] **Regra da lacuna**: se o enunciado mandava o aluno produzir o modelo, a seção "modelo à vista" veio incompleta, com o sistema fechado só na escada?
- [ ] **Varredura de procedência**: todo número — inclusive faixas e percentuais — é dado do enunciado, fonte citada ou suposição marcada?
- [ ] Nenhum link de dentro do workspace para a pasta da skill ou para caminho absoluto?
- [ ] O nome do arquivo descreve o conteúdo, sem numeração `000N`?
- [ ] `lessons/INDEX.md` ganhou a linha correspondente, com data, degrau e alvo?
- [ ] É curta, com um alvo só, e amarrada ao exercício que você mandou?
- [ ] Todo parâmetro tem unidade, e os sem fonte estão marcados como ilustrativos ou como suposição?
- [ ] As alternativas de quiz têm comprimentos parecidos? (o `quiz.js` avisa no console quando não)
- [ ] O código exibido roda?

**Correção técnica**

- [ ] Sinais e rendimentos corretos nos balanços?
- [ ] As unidades fecham?
- [ ] Valores numéricos citados como literatura têm procedência — organismo e condição?

Um teste que produz uma lição bonita e tecnicamente correta, mas em que o modelo entregou a resposta pronta — ou interrogou o aluno antes de ensinar —, é um teste **reprovado**.
