# Teste 2 — a lição reescrita em torno do código

Preencha os campos vazios durante e depois da sessão. Os campos já preenchidos descrevem o que foi preparado antes.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 2 |
| Data | {AAAA-MM-DD — dia da execução} |
| Quem rodou | Augusto |
| Foco | A lição resolve a questão inteira num arquivo, com a estação de código maior que a teoria, duas previsões, equações em MathML e nenhum link interno? E, num workspace que já existe, ela continua de onde parou em vez de recomeçar? |

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
| Cliente | {Claude Code CLI / desktop / web — e versão} |
| Modelo | {id exato} |
| Modo | {padrão / fast / esforço} |
| Acesso à web | {sim / não} |
| Permissões | {ex: edições aceitas sem prompt} |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

Para comparar com o Teste 1, rode com o **mesmo modelo e o mesmo modo** (Opus 5, esforço médio). Trocar as duas coisas ao mesmo tempo — versão da skill e modelo — deixa a diferença sem dono.

## 4. Entrada

### O estado inicial do workspace

`Teste 2/com-skill/` **já vem preenchido**, com a saída do Teste 1 dentro: missão inferida, dois registros de aprendizado, uma lição no índice. As pastas `assets/` e `reference/` foram atualizadas para a versão atual da skill, como manda o passo 0 do `rules.md`.

É de propósito: o Teste 1 verificou a primeira sessão, este verifica a **sessão de retorno** — recuperação, índice que cresce, missão revisada e a ponte de pré-requisito.

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

- **Escolha automática de pasta.** O workspace é indicado no prompt, porque a saída precisa cair dentro de `Teste 2/`. Fica para o Teste 3.
- **Sessão de retorno sem exercício** (o fallback para `cases/`). Também Teste 3.

## 5. Saída

Onde o modelo escreveu: `Teste 2/com-skill/`

```text
{cole aqui a árvore do que foi gerado, marcando o que é novo}
```

**Meça as palavras por estação.** Foi isso que revelou o problema do Teste 1, e é o número que diz se a inversão teoria/código pegou:

| Estação | Palavras |
|---|---|
| Modelo (teoria de fermentação) | {≤ 400} |
| Código | {deve ser a maior} |
| Resultado | |
| Crítica | |

## 6. Avaliação

**Comportamento**

- [ ] Não entrevistou
- [ ] Avisou onde escreveu, em uma linha, depois de escrever
- [ ] **Continuou o workspace** em vez de recomeçar: leu os registros, atualizou `MISSION.md`, acrescentou linha ao `INDEX.md`
- [ ] Pergunta de recuperação presente, cobrando algo da lição anterior
- [ ] Resolveu a questão inteira num arquivo, sem prometer continuação
- [ ] Declarou em uma linha onde apostou que estava a dificuldade
- [ ] **Ponte como estação zero**, já que o registro `0001` deixa o degrau 3 em aberto
- [ ] Falou pouco no chat
- [ ] Abriu o arquivo via CLI
- [ ] Registro de aprendizado só por evidência

**Estrutura da lição**

- [ ] Quatro estações na ordem: modelo · código · resultado · crítica
- [ ] **A estação de código é a maior** (se a teoria for maior, é reprovação direta)
- [ ] Teoria de fermentação dentro das 400 palavras
- [ ] Código completo, comentado, explicado passo a passo, com as escolhas justificadas
- [ ] Duas previsões, cada uma com a resposta atrás de um clique
- [ ] Explorador de variantes com escolhas corretas entre si, sem erro plantado
- [ ] Simulador de parâmetros na crítica, usando o modelo `batelada_alimentada` que já existe
- [ ] Equações em MathML, não em texto cru
- [ ] Botão de claro/escuro presente e funcionando
- [ ] Nenhum link interno, nenhuma promessa de continuação
- [ ] **Não imitou o formato da lição antiga** que estava no workspace
- [ ] Quiz com duas perguntas

**Conteúdo específico deste exercício**

- [ ] Fatiou o enunciado corrido nas quatro estações sem inventar anatomia nova
- [ ] **Escolheu a vazão com número e defendeu a escolha**, em vez de tratá-la como dado
- [ ] Reconheceu que "sem acumular açúcar" **não fecha** com vazão constante e inóculo pequeno, e negociou o trade-off
- [ ] Nomeou o etanol e o efeito Crabtree como o que o modelo ignora — sem inventar `Yp/x`
- [ ] Tratou o processo como **aeróbio**; se falou em fermentação alcoólica com Yx/s = 0,5, é erro técnico

**Correção técnica**

- [ ] Levedura final ≈ 80,7 g/L (403 g), e **independente da vazão**
- [ ] Tempo para encher = 4/F h, coerente com a vazão escolhida
- [ ] O termo de diluição `F/V` aparece nas três equações, e `dV/dt = F`
- [ ] Números-alvo conferidos rodando o modelo — recalcule pelo menos um
- [ ] Varredura de procedência: todo número é dado do enunciado, fonte citada ou suposição marcada
- [ ] Nenhum link de dentro do workspace para fora dele

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| | | | |

## 8. Veredito

{aprovado / reprovado} — {uma frase}

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| | |
