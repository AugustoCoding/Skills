# Exemplo 1 — Primeira sessão, missão vazia

O caso mais comum de todos, e o que mais se erra: o aluno chega com um pedido genérico e `MISSION.md` está em branco.

## O que o aluno diz

> "Quero aprender a simular fermentação em Python."

## O que NÃO fazer

Começar a ensinar. Aqui a tentação é produzir imediatamente uma lição sobre batelada com Monod — é o começo óbvio, parece prestativo, e é errado. Sem missão você não tem critério para escolher o degrau, o nível de rigor, nem o contexto do exemplo. A lição sai genérica, o aluno acha interessante, e nada gruda.

## O que fazer

**Entrevistar.** É o primeiro trabalho, não um preâmbulo. Perguntas de `MISSION-FORMAT.md`, do concreto para o abstrato — quatro ou cinco, não um questionário.

> "Antes de qualquer coisa: o que aconteceu que fez você precisar disso agora? É uma disciplina, um estágio, uma IC, um TCC?
>
> E se estiver tudo resolvido daqui a três meses, o que você vai estar entregando, e para quem?
>
> Existe um processo específico — microrganismo, substrato, produto — ou é o exercício de uma disciplina?
>
> Por último: o que você já consegue fazer hoje? Já escreveu Python? Já resolveu EDO numericamente? Já viu Monod?"

### Resposta do aluno

> "É pra Engenharia Bioquímica II, prova em novembro. O professor cobra montar o modelo no papel e depois simular. Eu programo um pouco em Python, fiz Cálculo Numérico mas não lembro quase nada de EDO. Monod eu já vi na aula, mas não entendi direito o Ks."

### O que isso produz

**`MISSION.md`:**

```md
# Missão: Simulação de Fermentação

## Por que
Passar em Engenharia Bioquímica II, prova em novembro. O professor cobra montar o
modelo à mão e depois simular em Python — as duas coisas, e a prova escrita é a régua.

## Sucesso é
- Escrever de memória, no papel, o sistema de EDOs de uma batelada com Monod
- Explicar o que Ks significa e o que ele muda na curva
- Implementar o modelo em Python e produzir o gráfico X/S/P
- Reconhecer o regime (batelada, contínuo, alimentada) a partir do enunciado

## Restrições
- Prova em novembro; ~3 h por semana
- Programa um pouco em Python; fez Cálculo Numérico mas não retém EDO
- Papel e caneta importam tanto quanto o código: a régua principal é escrita

## Fora de escopo
- Scale-up industrial, CFD, modelagem estruturada, controle avançado
```

**Registro de aprendizado inicial** — a fala sobre conhecimento prévio já é evidência:

`learning-records/0001-conhecimento-previo-inicial.md`

```md
# Conhecimento prévio: Python sim, EDO não, Monod parcial

O aluno programa em Python em nível básico e cursou Cálculo Numérico, mas declara
não reter EDO. Já foi exposto a Monod em aula e identifica Ks como ponto de
confusão específico.

Implicações: entrar pelo degrau 2 (o que Ks significa), não pelo degrau 0. Não
gastar lição com sintaxe de Python. Tratar a integração numérica (degrau 5) como
reconstrução, não como assunto novo. "Não entendi o Ks" é o alvo da lição 1.
```

**`NOTES.md`:** prazo de novembro, ~3 h/semana, prova escrita é a régua principal — as lições precisam exigir reconstrução no papel, não só código que roda.

## Por que a entrevista mudou o curso

Sem ela, a lição 1 seria "batelada com Monod", cobrindo os degraus 1 a 3 de uma vez, com código pronto. Com ela:

- o alvo é **só Ks** — o aluno nomeou o travamento;
- a lição tem que exigir recuperação **no papel**, porque a prova é escrita;
- não se gasta tempo com sintaxe de Python;
- os exemplos podem ser genéricos: a missão é acadêmica, não há processo real para ancorar.

Um aluno que respondesse "preciso modelar a dorna da usina onde estagio" receberia um curso completamente diferente a partir do mesmo conteúdo.

## O que fica registrado

| Arquivo | O que foi escrito |
|---|---|
| `MISSION.md` | missão completa, confirmada com o aluno |
| `learning-records/0001-…` | conhecimento prévio declarado, com implicações |
| `NOTES.md` | prazo, carga semanal, régua escrita |
| `lessons/` | **nada ainda** — a primeira sessão pode legitimamente não produzir lição |
