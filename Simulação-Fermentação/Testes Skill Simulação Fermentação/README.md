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
  SESSAO.md         o que foi testado: prompt inicial, falas do "aluno", observações
  MISSION.md        \
  RESOURCES.md       |  gerados pelo modelo a partir das sementes da skill
  GLOSSARY.md        |
  NOTES.md          /
  lessons/          as lições produzidas
  reference/        folhas de consulta
  learning-records/ registros de aprendizado
  assets/           cópia dos componentes, para as lições abrirem
```

`SESSAO.md` é o único arquivo escrito por você, não pelo modelo. Registre o mínimo para o teste ser reproduzível: o prompt inicial, o papel que você fez de aluno (o que respondeu na entrevista, onde errou de propósito) e o que chamou atenção no resultado.

## Como rodar um teste

1. Crie `Teste N/` vazia.
2. Carregue `../Skill Simulação Fermentação/SKILL.md` no contexto do modelo.
3. Diga explicitamente que o workspace é `Teste N/`. O modelo deve montar a estrutura ali antes de escrever qualquer coisa.
4. Faça o papel do aluno. Vale seguir um dos roteiros de `../Skill Simulação Fermentação/examples/` — eles descrevem as três situações que importam: missão vazia, aluno pedindo a resposta pronta, e sessão de retorno.
5. Ao final, escreva `SESSAO.md` e abra as lições geradas no navegador para conferir que renderizam.

Para a comparação com e sem a skill, rode o mesmo prompt inicial nas duas condições e guarde as duas saídas — por exemplo em `Teste N/com-skill/` e `Teste N/sem-skill/`. A diferença que interessa não é a qualidade do código produzido: é se o modelo ensinou ou apenas resolveu.

## O que olhar ao avaliar

O modo de falha central da skill é escorregar para resolvedor. O resto é secundário.

**Comportamento**

- [ ] Perguntou onde era o workspace, ou usou o indicado, sem escrever na pasta da skill?
- [ ] Com `MISSION.md` vazio, **entrevistou antes de ensinar** — mesmo com o "aluno" pedindo conteúdo direto?
- [ ] Diante de um enunciado pronto, devolveu o menor passo em vez da solução completa?
- [ ] Escolheu **um** alvo, e explicitou qual era antes de produzir a lição?
- [ ] Escreveu registro de aprendizado só onde houve evidência, não onde houve cobertura?

**Artefatos**

- [ ] A lição abre no navegador, com estilo, quiz e simulador funcionando?
- [ ] É curta, com um alvo só, e amarrada à missão declarada?
- [ ] Tem pelo menos um loop de feedback em que o aluno produz algo?
- [ ] Todo parâmetro tem unidade, e os sem fonte estão marcados como ilustrativos?
- [ ] As alternativas de quiz têm comprimentos parecidos? (o `quiz.js` avisa no console quando não)
- [ ] O código exibido roda?

**Correção técnica**

- [ ] Sinais e rendimentos corretos nos balanços?
- [ ] As unidades fecham?
- [ ] Valores numéricos citados como literatura têm procedência — organismo e condição?

Um teste que produz uma lição bonita e tecnicamente correta, mas em que o modelo entregou a resposta pronta, é um teste **reprovado**.
