# Teste 1 — primeira execução do fluxo sem entrevista

Preencha os campos vazios **durante e depois** da sessão de teste. Os campos já preenchidos descrevem o que foi preparado antes.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 1 |
| Data | 2026-08-30 |
| Quem rodou | Augusto |
| Foco | O modelo com a skill produz uma lição sem entrevistar, apostando sozinho no travamento, e trata o parâmetro que falta como suposição declarada? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit | `f385df4` — "Mandar SKILL.md abrir rules.md e system_prompt.md" |
| Branch | `main` |
| Alterações locais não commitadas | não (na pasta da skill) |
| Como a skill foi carregada | *junction* `~/.claude/skills/simulacao-fermentacao` → `Simulação-Fermentação/Skill Simulação Fermentação/`. Aponta para o repositório, não é cópia: o que estiver no working tree é o que roda, e uma escrita indevida na pasta da skill apareceria no `git status` |
| Nome da pasta instalada | `simulacao-fermentacao` — bate com o `name:` do frontmatter |

Esta é a **primeira** execução depois da reescrita que tirou a entrevista da entrada (commit `e4c21e1`). Nenhum teste anterior existe para comparar.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code (versão não registrada) |
| Modelo | Opus 5 — `claude-opus-5` |
| Modo | Esforço médio |
| Acesso à web | Não registrado. O comportamento observado é consistente com não ter havido busca: as fontes citadas seguem `[a verificar]`, e a falta de rendimento prático virou lacuna aberta em `RESOURCES.md` em vez de ser resolvida |
| Permissões | Não registrado |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

Se a sessão não começar na raiz do repositório, ajuste o caminho do workspace no prompt abaixo.

## 4. Entrada

### Prompt exato (turno 1)

A skill é `disable-model-invocation: true`: ela **não** ativa quando o modelo quer, só quando você a chama. Por isso o prompt começa com a barra. Copie deste bloco, sem editar:

```text
/simulacao-fermentacao

O workspace desta sessão é "Simulação-Fermentação/Testes Skill Simulação Fermentação/Teste 1/com-skill/". Escreva ali tudo o que você gerar.

Preciso resolver este exercício:

Fermentação alcoólica em batelada

Um fermentador de bancada opera em batelada, com volume útil constante de 1,5 L, temperatura e pH controlados e agitação suficiente para admitir mistura perfeita. O mosto inicial contém 150 g/L de açúcares redutores totais (ART) e o inóculo fornece 2,0 g/L de biomassa seca.

Admita crescimento segundo a cinética de Monod, com μmax = 0,35 h⁻¹, Ks = 1,5 g/L e Yx/s = 0,045 gX/gART. A formação de etanol é associada ao crescimento.

Pede-se:
(a) Escreva o sistema de equações diferenciais que descreve a evolução de biomassa, substrato e etanol ao longo do tempo, definindo cada termo e sua unidade.
(b) Implemente o modelo em Python e simule 30 h de processo, apresentando os perfis de X, S e P.
(c) Determine o instante em que o ART se esgota e o teor final de etanol.
(d) Discuta duas hipóteses assumidas pelo modelo e o efeito esperado de cada uma sobre o resultado.
```

O enunciado e o raciocínio por trás de cada armadilha estão em [EXERCICIO.md](./EXERCICIO.md). **Não mande o EXERCICIO.md para o modelo** — ele contém o gabarito das armadilhas.

### Turnos seguintes, na ordem

Só mande o próximo depois de o modelo terminar o anterior. Não ofereça informação que ele não pediu — o teste é justamente se ele se vira sem perguntar.

| # | O que o "aluno" diz | O que essa fala testa |
|---|---|---|
| 2 | `Não entendi por que o Yx/s aparece dividindo em dS/dt, e não multiplicando.` | O ciclo da dúvida: resposta no chat **e** `.nota-duvida` enxertada no ponto exato do HTML, com reabertura do arquivo |
| 3 | `De onde saiu esse rendimento de etanol? Não estava no enunciado.` | Se a suposição foi declarada como suposição, com ordem de grandeza justificada — e não apresentada como dado de literatura |
| 4 | Pedido de histórico da sessão em markdown, salvo em arquivo. **Fora do roteiro** — acrescentado na hora; texto exato não registrado | Nada da skill. Produziu `com-skill/HISTORICO-SESSAO-2026-08-30.md` — relato do próprio modelo avaliado, não transcript independente. Serviu para preencher as seções 5 e 6 e foi **apagado ao fechar o teste**; continua recuperável no commit `c748310` |

### O que este teste **não** cobre

- **Escolha automática de pasta.** Aqui o workspace é indicado no prompt, porque a saída precisa cair dentro de `Teste 1/`. A regra "usa `./aula-fermentacao/` e avisa depois" fica para o Teste 2.
- **Sessão de retorno sem exercício** (o fallback para `cases/`). Também Teste 2 em diante.

## 5. Saída

Onde o modelo escreveu: `Teste 1/com-skill/` — correto, sem nada fora dali.

```text
com-skill/
  MISSION.md                          missão inferida, marcada com data e procedência
  RESOURCES.md                        + 1 lacuna nova (rendimento prático, sem fonte)
  GLOSSARY.md                         idêntico à semente
  NOTES.md                            idêntico à semente
  lessons/
    INDEX.md
    acoplar-substrato-e-etanol-pelo-rendimento.html   (24 KB, 2 notas de dúvida)
  learning-records/
    0001-yxs-divide-lacuna-revelada.md
    0002-desconfiou-de-parametro-sem-procedencia.md
  reference/  equacoes.html · python-simulacao.html   (idênticos às sementes)
  assets/     lesson.css · quiz.js · simulador.js     (idênticos às sementes)
```

**A pasta da skill ficou intacta.** Como a instalação é *junction*, qualquer escrita lá apareceria no `git status` do repositório — não apareceu nenhuma.

### Renderização, verificada servindo por HTTP

CSS carrega, canvas do simulador existe, curvas ocultas com botão "Revelar" presente, 3 itens de quiz com feedback certo/errado funcionando, 4 degraus de escada, 2 notas de dúvida com a classe correta. **Zero erro de console** — inclusive nenhum aviso de comprimento de alternativa: 29/33/25/31 e 30/28/31/28 caracteres, dentro do limiar do `quiz.js`.

### Conferência numérica independente

| Grandeza | Lição | Conferido |
|---|---|---|
| X final | 8,75 g/L | ✔ = X₀ + Yx/s·S₀ = 2,0 + 0,045×150 |
| Esgotamento do ART | ≈ 4,4–4,5 h | ✔ ln(8,75/2)/0,35 = 4,2 h, mais o freio de Monod |
| P final | 67,5 g/L | ✔ = Yp/x·ΔX = 10 × 6,75 |
| Yp/s implícito | 0,45 gP/gART | ✔ = 88% do teto de Gay-Lussac (0,511) |

O relato da sessão registra que o modelo conferiu os números com `solve_ivp` e `rtol=1e-10` antes de escrevê-los, em vez de estimá-los.

## 6. Avaliação

`[x]` = verificado no disco por quem avalia · `[r]` = só relatado pelo modelo, sem verificação independente · `[ ]` = em aberto

**Comportamento**

- [r] Não entrevistou: o relato não mostra pergunta nenhuma no turno 1, e a lição existir já no primeiro retorno é consistente com isso
- [x] Avisou onde escreveu, em uma linha, depois de escrever — confirmado por quem rodou o teste (não constava no relato do modelo)
- [x] `MISSION.md` por inferência, marcado como inferência, com data e procedência (duas marcas distintas, uma por bloco inferido)
- [x] Produziu lição em vez de solução pronta: nenhum código Python, itens (b) e (c) não entregues resolvidos
- [x] Declarou a aposta diagnóstica dentro da lição, com saída explícita se a aposta errasse
- [~] Um alvo só — o índice registra "degrau 3 (tocando o 4)"; ver achado 3
- [r] Falou pouco no chat no turno 1 (o relato não descreve a resposta; nos turnos 2 e 3 a resposta longa é a regra, não a exceção)
- [ ] Abriu o arquivo via CLI **na entrega inicial** — segue em aberto: o relato só menciona as reaberturas dos turnos 2 e 3, e ninguém anotou na hora. Não muda o veredito; conferir no Teste 2
- [x] Registro de aprendizado só por evidência: os dois registros nascem das suas perguntas, nenhum de cobertura
- [x] Leu `system_prompt.md` e `rules.md` — o relato lista os dois, confirmando que o ajuste do commit `f385df4` funcionou
- [x] Usou o banco de casos (`caso_producao_etanol.md`) como matéria-prima, sem copiá-lo para a lição

**Dúvida pós-entrega (turnos 2 e 3)**

- [x] Respondeu no chat **e** editou o HTML: duas `.nota-duvida` no arquivo
- [x] A explicação entrou no ponto exato — a primeira logo após o parágrafo do "divide e não multiplica", a segunda sob a tabela de parâmetros
- [x] Classe `.nota-duvida` sem variante inventada, texto original preservado
- [r] Reabriu o arquivo e avisou
- [x] Cada dúvida gerou registro, com o que ela **não** estabelece anotado junto

**Artefatos**

- [x] Abre e renderiza: estilo, quiz e simulador funcionando
- [x] Funciona com o chat fechado
- [x] Escada de dicas com 4 degraus, resposta fechada só no último
- [x] Nome pelo conteúdo, sem `000N`
- [x] `lessons/INDEX.md` com data, degrau e alvo — e ainda uma seção "próximo passo previsto"
- [x] Parâmetros com unidade; `Yp/x` marcado como suposição, com o teto estequiométrico como justificativa de ordem de grandeza
- [x] Nenhum código exibido (não havia código a rodar nesta lição)

**Correção técnica específica deste exercício**

- [x] X final ≈ 8,75 g/L
- [x] Sinal de `dS/dt` negativo e `Yx/s` dividindo
- [x] O item (d) puxa inibição por etanol — inclusive como distrator correto do terceiro quiz
- [~] Nenhum valor como dado de literatura sem procedência — **violado na primeira versão**, corrigido só depois da pergunta do turno 3; ver achado 2

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | A seção "O modelo à vista" exibiu o sistema completo de EDOs — que é exatamente o item (a) do enunciado — **antes** da prática. A prática então pede para "fechar a página e reescrever as três equações": é recuperação com a resposta fresca, não produção. O último degrau da escada ("quero ver o sistema fechado") fica sem função, porque o sistema já está no corpo. Não é desvio do modelo: o `LESSON-FORMAT.md` manda pôr o modelo à vista sem ressalva, e o padrão certo (deixar lacunas para o aluno preencher) só existe dentro do `exemplo_2` | atrapalha | `LESSON-FORMAT.md`, anatomia, item 5 |
| 2 | A faixa "85–92% do rendimento teórico" entrou na lição sem procedência, contra a regra do workspace. Só foi marcada como estimativa depois que o "aluno" perguntou — um aluno que não desconfiasse teria ficado com o número. O próprio modelo registra a violação em `learning-records/0002` | atrapalha | `rules.md` / `LESSON-FORMAT.md`: falta uma checagem final antes de escrever o arquivo |
| 3 | O índice registra o degrau como "3 (tocando o 4)", e o alvo declarado cobre `dS/dt` **e** `dP/dt`. Defensável — é um conceito só (acoplamento por fator de rendimento) aplicado duas vezes, e o enunciado exigia o etanol — mas é a fronteira da regra "um alvo por lição", e o próprio modelo sinalizou a tensão | observar | nada a mudar ainda; verificar no Teste 2 |
| 4 | `learning-records/0002` linka `../../../../../.claude/skills/simulacao-fermentacao/cases/caso_producao_etanol.md`: vaza o caminho de instalação e quebra a portabilidade do workspace, que deveria ser autossuficiente | cosmético | `LEARNING-RECORD-FORMAT.md` / `rules.md`: citar o caso pelo nome, nunca linkar para fora do workspace |

## 8. Veredito

**Aprovado, com dois achados a corrigir.** O critério principal passou: diante de um enunciado com quatro itens e um pedido implícito de resposta, o modelo produziu uma lição, não uma solução — sem entrevistar, com aposta declarada, com o parâmetro ausente virando o núcleo pedagógico em vez de um detalhe preenchido em silêncio. Os achados 1 e 2 são de **desenho da skill**, não de execução: os dois vêm de regras que faltam nos formatos, e o modelo seguiu fielmente o que estava escrito.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `10919df` | **Achado 1** — regra da lacuna em `LESSON-FORMAT.md`: quando o enunciado manda o aluno produzir o modelo, a seção "modelo à vista" vem incompleta e o sistema fechado fica só no último degrau da escada. Refletida no passo 5 de `rules.md` e nas restrições |
| `10919df` | **Achado 2** — varredura de procedência em `LESSON-FORMAT.md`: passo separado, com o arquivo pronto, em que todo número cai em dado do enunciado, fonte citada ou suposição marcada. Faixas e percentuais contam explicitamente |
| `10919df` | **Achado 4** — regra de links em `LEARNING-RECORD-FORMAT.md` e nas restrições de `rules.md`: nada dentro do workspace aponta para fora dele |
| — | **Achado 3** (um alvo por lição, na fronteira) segue em observação; nada mudou |
