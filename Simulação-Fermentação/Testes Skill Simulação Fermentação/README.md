# Testes da Skill Simulação Fermentação

Cada execução de teste tem sua própria pasta aqui, e **essa pasta é o workspace** da sessão: todo arquivo que o modelo gerar ao usar a skill vai para dentro dela.

```
Testes Skill Simulação Fermentação/
  Teste 1/
  Teste 2/
  ...
```

A pasta da skill (`../Skill Simulação Fermentação/`) é somente leitura durante o teste. Se aparecer arquivo novo lá depois de uma execução, o teste falhou numa regra estrutural da skill — vale registrar como achado.

## O que fica em cada `Teste N/`

```
Teste N/
  SESSAO.md         o que foi testado: exercício inicial, falas do "aluno", observações
  MISSION.md        \
  RESOURCES.md       |  gerados pelo modelo a partir das sementes da skill
  GLOSSARY.md        |
  NOTES.md          /
  lessons/INDEX.md  o índice das lições
  lessons/*.html    as lições produzidas, nomeadas pelo conteúdo
  reference/        folhas de consulta
  learning-records/ registros de aprendizado
  assets/           cópia dos componentes, para as lições abrirem
```

`SESSAO.md` é o único arquivo escrito por você, não pelo modelo. Registre o mínimo para o teste ser reproduzível: o exercício que você mandou, o papel que fez de aluno (que dúvida levantou depois, onde errou de propósito) e o que chamou atenção no resultado.

## Como rodar um teste

1. Crie `Teste N/` vazia.
2. Carregue `../Skill Simulação Fermentação/SKILL.md` no contexto do modelo.
3. Diga que o workspace é `Teste N/` — indicação explícita vence o padrão. Para testar também a escolha automática de pasta, **não diga nada** e verifique se o modelo criou `./aula-fermentacao/` e avisou onde escreveu.
4. Mande um exercício, e só. Não responda a entrevista nenhuma: se o modelo perguntar a missão, o nível ou até onde você chegou, o teste já falhou o critério principal.
5. Depois da lição entregue, volte com **uma dúvida específica** sobre um trecho dela — é assim que se testa a nota de dúvida.
6. Ao final, escreva `SESSAO.md` e abra as lições geradas no navegador para conferir que renderizam.

Para a comparação com e sem a skill, rode o mesmo exercício inicial nas duas condições e guarde as duas saídas — por exemplo em `Teste N/com-skill/` e `Teste N/sem-skill/`. A diferença que interessa não é a qualidade do código produzido: é se o modelo ensinou ou apenas resolveu.

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
