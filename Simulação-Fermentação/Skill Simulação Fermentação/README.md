# Skill: Simulação de Fermentação em Python

Skill de **ensino**, com estado, para levar um aluno a modelar e simular processos de fermentação em Python ao longo de várias sessões.

A distinção importa: a skill não resolve enunciados. Ela ensina o aluno a resolvê-los. Entregar o modelo, o código e o gráfico prontos é o modo de falha que ela existe para evitar — parece ajuda e produz retenção zero.

## Como funciona

O aluno manda um exercício e ativa a skill. **Não há entrevista**: nem sobre a missão, nem sobre o nível, nem sobre onde ele travou, nem sobre onde salvar os arquivos. Tudo isso é inferido do próprio exercício e do estado do workspace. O que ele recebe de volta é uma **lição** aberta no navegador.

```
exercício → diagnóstico silencioso → aposta declarada → lição que resolve tudo → registro
```

1. **Exercício** — a entrada. Se ele voltar sem um, o exercício vem do banco `cases/`, escolhido pelo buraco registrado.
2. **Diagnóstico silencioso** — regime, variáveis, parâmetros que faltam, degrau exigido, hipóteses escondidas, e a checagem de pré-requisito contra `learning-records/`.
3. **Aposta declarada** — onde o aluno provavelmente travou. Dita em uma linha dentro da lição, para ser corrigível.
4. **Lição** — um HTML autocontido e bonito que **resolve a questão inteira**, em quatro estações fixas: modelo · código · resultado · crítica. A estação de código é a maior: programar é a estrela. Tem que funcionar com o chat fechado e sem abrir outro arquivo.
5. **Registro** — evidência de aprendizado, nunca cobertura de conteúdo.

Dúvida depois da entrega é respondida **duas vezes**: no chat, e dentro do HTML da lição, no ponto exato onde ela apareceu, com destaque de marca-texto (`.nota-duvida`). O arquivo é reaberto para o aluno.

## Estrutura

**Ponto de entrada**

| Arquivo | Papel |
|---|---|
| `SKILL.md` | A skill. Filosofia, mapa de progressão do domínio, o que é cada peça. Comece por aqui. |
| `system_prompt.md` | Persona do professor: papel, postura, limites. |
| `rules.md` | Manual da sessão, com o catálogo de concepções errôneas do domínio. |

**Sementes** — copiadas para o workspace no início e preenchidas lá, nunca aqui

| Caminho | Conteúdo |
|---|---|
| `MISSION.md` | A razão do aluno, **inferida** dos exercícios. Ancora toda decisão de ensino. Começa vazia. |
| `RESOURCES.md` | Fontes confiáveis e comunidades. |
| `GLOSSARY.md` | Linguagem canônica; termo entra por evidência, não por exposição. |
| `NOTES.md` | Preferências de ensino e ambiente técnico, só quando expressas espontaneamente. |
| `reference/` | Folhas de consulta prontas: `equacoes.html`, `python-simulacao.html`. |

**Formatos** — `MISSION-FORMAT.md`, `RESOURCES-FORMAT.md`, `GLOSSARY-FORMAT.md`, `LEARNING-RECORD-FORMAT.md`, `LESSON-FORMAT.md`.

**Componentes e apoio**

| Caminho | Conteúdo |
|---|---|
| `assets/lesson.css` | Folha de estilo compartilhada. Toda lição linka. Traz `.revelar` (resposta atrás de um clique), `.nota-duvida` (destaque das dúvidas respondidas depois), o estilo das equações em MathML e o do botão de tema. |
| `assets/tema.js` | Botão de claro e escuro; injeta-se sozinho e lembra a escolha entre lições. |
| `assets/variantes.js` | Explorador da estação de código: troca uma linha do programa e redesenha o gráfico. Só escolhas corretas entre si, nunca erros plantados. |
| `assets/quiz.js` | Quiz com feedback imediato; avisa quando as alternativas dão pista pelo comprimento. |
| `assets/simulador.js` | Integrador RK4 e plotagem em canvas: batelada, quimiostato e inibição por produto, com controles deslizantes. |
| `cases/` | Banco de exercícios com degrau, loop de feedback, erros comuns e critérios de evidência. É de onde sai o exercício quando o aluno volta sem um. |
| `examples/` | Três sessões de ensino comentadas. |
| `templates/` | Esqueletos de lição, referência, código Python e resolução guiada. |

## Definição e workspace

Esta pasta é a **definição** da skill e é **somente leitura** durante uma sessão. Tudo que o modelo gera vai para um **workspace** separado:

```
<workspace>/
  MISSION.md  RESOURCES.md  GLOSSARY.md  NOTES.md
  lessons/INDEX.md  a ordem das lições: data, arquivo, degrau, alvo
  lessons/*.html    as lições, nomeadas pelo conteúdo (sem numeração)
  reference/        folhas de consulta (as sementes, mais o que for criado)
  learning-records/ registros de aprendizado, no estilo ADR, numerados 000N
  assets/           cópia dos componentes, para as lições renderizarem
```

O modelo **não pergunta** onde é o workspace: usa a pasta indicada, ou uma pasta existente com `MISSION.md` e `lessons/`, ou cria `./aula-fermentacao/` no diretório atual — e avisa em uma linha, depois de escrever, para o aluno corrigir se quiser.

A separação é o que permite vários alunos — ou várias execuções de teste — sem contaminação entre eles, e mantém a definição da skill estável. `assets/` e `reference/` são **copiados** para o workspace, não linkados: as lições referenciam `../assets/lesson.css` por caminho relativo, e o workspace precisa ser portátil.

Os nomes de lição descrevem o conteúdo (`quimiostato-washout-etanol.html`), sem numeração sequencial; a ordem cronológica vive em `lessons/INDEX.md`. Os registros de aprendizado continuam numerados.

## Como usar

1. Carregue `SKILL.md` no contexto do modelo. Ele referencia o resto conforme precisa.
2. Mande o exercício. Se quiser um workspace específico, diga junto — se não disser, o modelo escolhe e avisa.
3. O modelo monta a estrutura do workspace se ela não existir, infere a missão, aposta no travamento e entrega a lição aberta no navegador. A primeira sessão termina com lição na tela e, normalmente, **nenhum** registro de aprendizado — ainda não houve evidência.

Para validar a skill, use `../Testes Skill Simulação Fermentação/`, onde cada execução tem sua própria pasta `Teste N/` como workspace. O protocolo está no README de lá.

A skill é marcada `disable-model-invocation: true` e `allow_implicit_invocation: false`: nunca ativa sozinha, só por chamada explícita.

## Comece por aqui

- Para entender a filosofia: `SKILL.md`.
- Para ver como uma sessão acontece: `examples/exemplo_1.md` (primeira sessão, só um exercício na mão), `exemplo_2.md` (aluno quer a resposta pronta, e depois volta com uma dúvida), `exemplo_3.md` (retorno sem exercício, escolhendo no banco de casos).
- Para escrever a primeira lição: `LESSON-FORMAT.md` e `templates/licao.html`.

## Estado

Em desenvolvimento. As lições e os registros começam vazios por definição — enchem-se com o uso. As entradas de `RESOURCES.md` são sementes marcadas `[a verificar]`: edição, DOI e link precisam ser conferidos antes de qualquer citação em lição.
