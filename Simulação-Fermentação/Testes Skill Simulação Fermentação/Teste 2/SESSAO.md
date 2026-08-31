# Teste 2 — a lição reescrita em torno do código

Preencha os campos vazios durante e depois da sessão. Os campos já preenchidos descrevem o que foi preparado antes.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 2 |
| Data | 2026-08-30 |
| Quem rodou | Augusto |
| Foco | A lição resolve a questão inteira num arquivo, com a estação de código maior que a teoria, duas previsões, equações em MathML e nenhum link interno — a partir de um enunciado corrido, sem itens? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit | `644d79b` — "Ensinar o simulador a batelada alimentada e corrigir a legenda" |
| Branch | `main` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/simulacao-fermentacao` → `Simulação-Fermentação/Skill Simulação Fermentação/`. Aponta para o repositório: escrita indevida na pasta da skill apareceria no `git status` |
| Nome da pasta instalada | `simulacao-fermentacao` |

Diferença central para o Teste 1 (`a2285bd`): a lição deixou de ser "uma coisa por vez, o resto na próxima" e passou a resolver a questão inteira num arquivo, com quatro estações fixas e a estação de código como a maior. Saíram a escada de dicas, a regra da lacuna e todos os links internos; entraram MathML, botão de tema e o explorador de variantes.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code (versão não registrada) |
| Modelo | Opus 5 — `claude-opus-5` |
| Modo | Esforço médio |
| Acesso à web | Não registrado |
| Permissões | Não registrado |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

Para comparar com o Teste 1, rode com o **mesmo modelo e o mesmo modo** (Opus 5, esforço médio). Trocar as duas coisas ao mesmo tempo — versão da skill e modelo — deixa a diferença sem dono.

## 4. Entrada

### O estado inicial do workspace

`Teste 2/com-skill/` começa **vazio**. É a regra do protocolo: todo teste parte do zero, para que a saída seja inteiramente atribuível àquela execução e à versão da skill registrada acima.

Isso significa que o modelo tem de montar a estrutura do workspace, inferir a missão do nada e **não** produzir pergunta de recuperação — não há lição anterior — nem ponte de pré-requisito, porque não há lacuna registrada.

### Prompt exato (turno 1)

A skill é `disable-model-invocation: true`: só ativa quando você a chama. Por isso o prompt começa com a barra. Copie deste bloco, sem editar:

```text
/simulacao-fermentacao

O workspace desta sessão é "Simulação-Fermentação/Testes Skill Simulação Fermentação/Teste 2/com-skill/". Escreva ali tudo o que você gerar.

Tenho outro exercício:

Uma dorna de propagação de 5 L opera em batelada alimentada, aerada, com temperatura e pH controlados e mistura perfeita. O inóculo ocupa 1,0 L e traz 1,0 g/L de levedura e 5 g/L de ART residual. A alimentação é mosto a 200 g/L de ART, bombeado a vazão constante.

Admita crescimento segundo Monod, com μmax = 0,40 h⁻¹, Ks = 1,0 g/L e Yx/s = 0,50 gX/gART.

Preciso escolher a vazão de alimentação e defender a escolha: a dorna tem que encher sem deixar açúcar acumular no meio, porque açúcar sobrando vira etanol e o rendimento em levedura cai. Quero simular isso em Python, saber quanto tempo leva para encher a dorna e quanta levedura sai no final.
```

O enunciado e o gabarito das armadilhas estão em [EXERCICIO.md](./EXERCICIO.md). **Não mande o EXERCICIO.md para o modelo.**

### Turnos seguintes, na ordem

Só mande o próximo depois que ele terminar o anterior.

| # | O que o "aluno" diz | O que essa fala testa |
|---|---|---|
| 2 | `Se eu dobrar a vazão, sai o dobro de levedura?` | Se a lição já respondeu isso (a colheita não depende de F) ou se o aluno teve de perguntar — e o ciclo da nota de dúvida no ponto exato |
| 3 | `Por que você escolheu essa vazão e não uma menor?` | Se a escolha de projeto foi defendida com número e trade-off, ou apresentada como se fosse dado do enunciado |

### O que este teste **não** cobre

- **Escolha automática de pasta.** O workspace é indicado no prompt, porque a saída precisa cair dentro de `Teste 2/`.
- **Sessão de retorno** — recuperação, índice que cresce, missão revisada e ponte de pré-requisito só existem em workspace com histórico. Como todo teste parte do zero, esses comportamentos precisam de um teste com dois exercícios na mesma sessão. Fica anotado como próximo alvo.
- **Retorno sem exercício** (o fallback para `cases/`).

## 5. Saída

**A sessão foi interrompida depois do turno 1.** Passou de 15 minutos para produzir uma lição, e o teste foi encerrado ali: os turnos 2 e 3 não foram executados, porque havia problema suficiente para corrigir antes de seguir.

```text
com-skill/
  MISSION.md · NOTES.md · GLOSSARY.md · RESOURCES.md
  lessons/INDEX.md
  lessons/batelada-alimentada-vazao-da-dorna.html   25 KB
  assets/  (+ modelo-propagacao.js, escrito pelo modelo)
  reference/
```

Palavras por seção da lição:

| Seção | Palavras |
|---|---|
| O modelo | 485 |
| **O código** | **1.062** |
| O resultado | 714 |
| O que este modelo finge que não existe | 379 |
| Verificação | 53 |
| **Total visível** | **2.839** |

## 6. Avaliação

**O que funcionou** — a inversão pegou: a estação de código (1.062) ficou maior que a de modelo (485), contra 1.607 de teoria e 847 de prática no Teste 1. Cinco equações em MathML, botão de tema, duas previsões, explorador de variantes, simulador, quiz de duas perguntas, nenhum link interno, nenhuma promessa de continuação, nenhum registro de aprendizado inventado. E resolveu bem a armadilha central: calculou que a vazão sem acúmulo seria 0,004 L/h, o que levaria 1.000 h para encher, e usou isso para mostrar que o critério do enunciado não fecha.

**O que estourou** — 2.839 palavras contra o teto brando de 1.800, e 485 de teoria contra o teto de 400. `NOTES.md` foi preenchido com notas de trabalho sem o aluno ter dito nada espontaneamente. E o modelo escreveu um componente novo (`modelo-propagacao.js`) em vez de usar o `batelada_alimentada` que existia — a justificativa dele é defensável, mas custou tempo.

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | **Mais de 15 minutos** para produzir uma lição. A causa é estrutural: 9.088 palavras de leitura obrigatória, mais formatos, casos, exemplos e templates, para gerar nove arquivos por sessão — dos quais 25 KB só de lição | bloqueia | a skill inteira |
| 2 | Os orçamentos de palavras não seguraram nada, porque eram prosa e não estrutura | atrapalha | `LESSON-FORMAT.md` |
| 3 | `NOTES.md` preenchido sem preferência espontânea do aluno | cosmético | resolvido: o arquivo deixou de existir |
| 4 | Componente novo escrito para um regime que o simulador já cobria | atrapalha | resolvido: o explorador morreu e a lista de modelos ficou visível |

## 8. Veredito

**Interrompido.** O formato novo funcionou — a inversão teoria/código aconteceu, e a lição estava tecnicamente correta —, mas o custo de produzi-la inviabilizava o uso. Não faz sentido avaliar retenção numa lição que o aluno espera quinze minutos para receber.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `f756788` | **Achado 1** — a skill perdeu o estado inteiro (missão, registros, glossário, notas, índice) e caiu de 30 arquivos para 9, de 9.088 para 2.146 palavras de leitura obrigatória. O workspace do aluno passou de nove itens para dois |
| `f756788` | **Achado 2** — a lição virou três divisões com teto de 1.000 palavras, e morreram quiz, previsões, recuperação e aposta declarada. Menos itens obrigatórios, menos escrita |
| `f756788` | **Achados 3 e 4** — `NOTES.md` deixou de existir; o explorador de variantes foi removido e a análise crítica passou a usar só o simulador |
