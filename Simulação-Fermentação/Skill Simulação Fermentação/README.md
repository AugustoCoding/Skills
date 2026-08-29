# Skill: Simulação de Fermentação em Python

Skill de **ensino**, com estado, para levar um aluno a modelar e simular processos de fermentação em Python ao longo de várias sessões.

A distinção importa: a skill não resolve enunciados. Ela ensina o aluno a resolvê-los. Entregar o modelo, o código e o gráfico prontos é o modo de falha que ela existe para evitar — parece ajuda e produz retenção zero.

## Como funciona

A pasta é, ao mesmo tempo, a definição da skill e o **workspace de ensino**: o estado do aprendizado do aluno vive dentro dela e cresce a cada sessão. O ciclo é sempre o mesmo:

```
missão → zona de desenvolvimento proximal → lição → loop de feedback → registro
```

1. **Missão** — por que o aluno quer isto. Sem ela, não se ensina: entrevista-se.
2. **Zona de desenvolvimento proximal** — o que ensinar agora, calculado a partir dos registros de aprendizado e do mapa de progressão do domínio (11 degraus, de "ler uma curva" a "escolher o D que maximiza produtividade").
3. **Lição** — um HTML autocontido e bonito, curto, que ensina uma coisa só.
4. **Loop de feedback** — o aluno produz, recebe resposta imediata. Prever antes de rodar, consertar código quebrado, diagnosticar gráfico.
5. **Registro** — evidência de aprendizado, nunca cobertura de conteúdo.

## Estrutura

**Ponto de entrada**

| Arquivo | Papel |
|---|---|
| `SKILL.md` | A skill. Filosofia, mapa de progressão do domínio, o que é cada peça. Comece por aqui. |
| `system_prompt.md` | Persona do professor: papel, postura, limites. |
| `rules.md` | Manual da sessão, com o catálogo de concepções errôneas do domínio. |

**Estado do aprendizado** (cresce com o uso)

| Caminho | Conteúdo |
|---|---|
| `MISSION.md` | A razão do aluno. Ancora toda decisão de ensino. |
| `RESOURCES.md` | Fontes confiáveis e comunidades. |
| `GLOSSARY.md` | Linguagem canônica; termo entra por evidência, não por exposição. |
| `NOTES.md` | Preferências de ensino e ambiente técnico. |
| `lessons/` | As lições produzidas, `000N-nome.html`. |
| `reference/` | Folhas de consulta: `equacoes.html`, `python-simulacao.html`. |
| `learning-records/` | Registros de aprendizado, no estilo ADR. |

**Formatos** — `MISSION-FORMAT.md`, `RESOURCES-FORMAT.md`, `GLOSSARY-FORMAT.md`, `LEARNING-RECORD-FORMAT.md`, `LESSON-FORMAT.md`.

**Componentes e apoio**

| Caminho | Conteúdo |
|---|---|
| `assets/lesson.css` | Folha de estilo compartilhada. Toda lição linka. |
| `assets/quiz.js` | Quiz com feedback imediato; avisa quando as alternativas dão pista pelo comprimento. |
| `assets/simulador.js` | Integrador RK4 e plotagem em canvas: batelada, quimiostato e inibição por produto, com controles deslizantes. |
| `cases/` | Banco de exercícios com degrau, loop de feedback, erros comuns e critérios de evidência. |
| `examples/` | Três sessões de ensino comentadas. |
| `templates/` | Esqueletos de lição, referência, código Python e resolução guiada. |

## Como usar

1. Carregue `SKILL.md` no contexto do modelo. Ele referencia o resto conforme precisa.
2. Trate a pasta como workspace: o modelo lê e escreve nela ao longo das sessões.
3. Na primeira sessão, `MISSION.md` está vazio — o trabalho é entrevistar, e pode acabar sem nenhuma lição produzida. Isso é o comportamento correto.

A skill é marcada `disable-model-invocation: true` e `allow_implicit_invocation: false`: nunca ativa sozinha, só por chamada explícita.

## Comece por aqui

- Para entender a filosofia: `SKILL.md`.
- Para ver como uma sessão acontece: `examples/exemplo_1.md` (missão vazia), `exemplo_2.md` (aluno quer a resposta pronta), `exemplo_3.md` (calculando a zona de desenvolvimento proximal).
- Para escrever a primeira lição: `LESSON-FORMAT.md` e `templates/licao.html`.

## Estado

Em desenvolvimento. As lições e os registros começam vazios por definição — enchem-se com o uso. As entradas de `RESOURCES.md` são sementes marcadas `[a verificar]`: edição, DOI e link precisam ser conferidos antes de qualquer citação em lição.
