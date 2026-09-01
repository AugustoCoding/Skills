# Teste 3 — a skill enxuta, cronometrada

Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 3 |
| Data | 2026-08-30 |
| Quem rodou | Augusto |
| Foco | **Sai em menos de cinco minutos?** E a lição tem as três divisões, com o código revelado passo a passo e uma análise crítica que fala deste caso e não do genérico? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit | `f756788` — "Enxugar a skill: sem estado, tres divisoes, codigo revelado passo a passo" |
| Branch | `main` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/simulacao-fermentacao` → `Simulação-Fermentação/Skill Simulação Fermentação/` |
| Nome da pasta instalada | `simulacao-fermentacao` |

O que mudou desde o Teste 2 (`644d79b`): a skill perdeu o estado inteiro — missão, registros, glossário, notas, índice — e caiu de 30 arquivos para 9, de 9.088 para 2.146 palavras de leitura obrigatória. A lição passou a ter três divisões, com o código revelado passo a passo; morreram quiz, previsões e o explorador de variantes.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code (versão não registrada) |
| Modelo | Opus 5 — `claude-opus-5` (confirmado pelo próprio modelo) |
| Modo | Esforço médio |
| Acesso à web | Não registrado; nenhuma busca aparece no relatório |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Rode com o mesmo modelo e modo dos testes anteriores** (Opus 5, esforço médio). O teste é sobre o tempo: trocar o modelo junto com a skill deixa a diferença sem dono.

## 4. Entrada

### Cronômetro

**Marque a hora ao enviar o prompt e ao aparecer a última linha da resposta.** É o dado principal deste teste.

| | Horário |
|---|---|
| Prompt enviado | |
| Lição aberta | |
| **Duração** | |

### O estado inicial do workspace

`Teste 3/com-skill/` começa **vazio**, como manda o protocolo: todo teste parte do zero.

### Prompt exato (turno 1)

```text
/simulacao-fermentacao

O workspace desta sessão é "Simulação-Fermentação/Testes Skill Simulação Fermentação/Teste 3/com-skill/". Escreva ali tudo o que você gerar.

Tenho um exercício:

Uma dorna contínua de 10 m³ opera em regime permanente, alimentada com mosto a 100 g/L de ART. A vazão de alimentação é ajustável.

A levedura segue Monod, com μmax = 0,30 h⁻¹, Ks = 1,0 g/L, Yx/s = 0,05 gX/gART e Yp/x = 8,0 gP/gX.

Quero um programa em Python que varra a taxa de diluição e me diga qual D dá a maior produtividade de etanol, e o que acontece se eu passar disso.
```

O gabarito das armadilhas está em [EXERCICIO.md](./EXERCICIO.md). **Não mande esse arquivo para o modelo.**

### Turnos seguintes

**Não executados, e retirados do protocolo.** Os testes passam a avaliar só o turno 1 — a produção da lição. A consequência a registrar: o ciclo da nota de dúvida e a saída de escopo deixam de ser exercitados nos testes, e passam a valer pelo que está escrito na skill.

## 5. Saída

Onde o modelo escreveu: `Teste 3/com-skill/aula-fermentacao/` — **uma pasta a mais do que o indicado** (ver achado 2).

```text
com-skill/aula-fermentacao/
  assets/  codigo.js · lesson.css · simulador.js · tema.js   [cópias]
  quimiostato-produtividade-etanol.html          12 272 bytes
```

Nenhum arquivo de estado, índice ou registro. A pasta da skill ficou intacta — verificado por mtime pelo próprio modelo e pelo `git status` do repositório, que o junction tornaria visível.

| Medida | Valor | Alvo |
|---|---|---|
| **Duração** | **~8 minutos** (cronometrada por quem rodou) | < 5 min |
| Duração medida por mtime, do 1º script à lição | 6 min 55 s | — |
| Palavras visíveis na lição | **1.541** | ~1.000 |
| Divisão 1 — teoria | 266 | a menor |
| Divisão 2 — código | **933** | a maior |
| Divisão 3 — análise crítica | 294 | |
| Passos de código | 5 | ≤ 6 |
| Controles no simulador | 3 | ≤ 4 |
| Chamadas de ferramenta | 15 (3 de leitura, 8 de execução de Python, 1 de escrita) | — |

O [relatório do próprio modelo](./RELATORIO-MODELO.md) traz a procedência de cada número da lição e a medição dos tempos de execução.

## 6. Avaliação

**Tempo e tamanho**

- [ ] Menos de 5 minutos — **não**: ~8 min, contra 15+ do Teste 2
- [~] Lição perto de 1.000 palavras — **1.024 de prosa**, dentro do teto; as 1.541 que registrei incluíam os blocos de código, com uma régua que a skill nunca definiu. Corrigido em 94f0648+
- [x] Código + análise crítica pesam mais que a teoria — 1.227 contra 266

**Comportamento**

- [x] Não entrevistou
- [x] Não escreveu contabilidade: nenhum arquivo de estado, índice ou registro
- [x] Rodou o código antes de publicar os números — 8 execuções
- [x] Abriu o arquivo via CLI
- [ ] Escreveu **na** pasta indicada — aninhou `aula-fermentacao/` dentro dela
- [ ] Turno 3 (saída de escopo) — não executado

**Divisão 1 — teoria**

- [x] Quatro equações em MathML
- [x] Tabela de parâmetros com unidade e procedência, inclusive as quatro escolhas dele
- [x] Breve: 266 palavras

**Divisão 2 — código**

- [x] Cinco passos, dentro do teto de seis, cada um com o porquê da decisão
- [x] Programa completo colapsado, executável — ele rodou o texto exato antes de publicar
- [x] Resposta atrás de um botão
- [x] Usou o `quimiostato` que já existia, sem reescrevê-lo

**Divisão 3 — análise crítica**

- [x] Três controles, com faixa e passo declarados porque os padrões não serviam
- [x] Observações ancoradas neste caso; pegou o ótimo a 10% do washout
- [x] Nenhuma frase genérica, nenhuma lista de hipóteses
- [ ] Um controle decorativo: `Sin` aparece no texto mas nenhuma observação manda mexer nele
- [ ] **A figura que responde o exercício ficou de fora** — a curva de produtividade contra D só existe dentro do script

**Correção técnica**

- [x] D ótimo 0,2700 1/h e produtividade 9,83 g·L⁻¹·h⁻¹
- [x] D crítico 0,2970 1/h
- [x] Distinguiu concentração de produtividade
- [x] Nenhuma citação de literatura
- [x] Nenhum parâmetro cinético inventado; as quatro escolhas de PVI declaradas
- [ ] Um número ilustrativo escrito como se fosse medido: o "−10⁻¹²"
- [x] O volume de 10 m³ **foi** usado, e bem: converteu D em vazão de 2,70 m³/h. A armadilha que eu plantei estava errada

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | **A skill proibia o modelo de criar o componente que o exercício exigia.** "Nada mais é escrito" mais "carrega quatro arquivos" fechavam a porta; o exercício pedia curva de produtividade contra D e o `simulador.js` só desenha contra o tempo. A figura central da questão ficou fora da lição, e a análise crítica falou de transiente | bloqueia | `SKILL.md`, `LESSON-FORMAT.md` |
| 2 | **"Números conferidos rodando o modelo" apontava para o lado errado.** Perto do washout a integração devolve valor plausível e falso — deu X cinco vezes maior que o real. Quem salvou o número foi a solução analítica, que a skill não mandava usar | bloqueia | `SKILL.md` |
| 3 | **Mais da metade do tempo foi Python rodando**: timeout de 120 s, depois 40 s e 44 s, mais quatro execuções. Leitura da skill foram 3 chamadas; escrita, 1. Cortar prosa não encurta mais nada | atrapalha | regra de conferência |
| 4 | **Contradição entre dois arquivos da skill**: o cabeçalho do `simulador.js` mandava citar a fonte, o `SKILL.md` proíbe citar literatura | atrapalha | `assets/simulador.js` |
| 5 | **O teto de palavras não foi medido** — ele mirou e não contou. 1.541 contra 1.000 | atrapalha | `LESSON-FORMAT.md` |
| 6 | Um número ilustrativo escrito como observado ("−10⁻¹²"), um slider decorativo (`Sin`), e a pasta indicada aninhada | cosmético | `SKILL.md`, `LESSON-FORMAT.md` |
| 7 | **Erro meu no gabarito**: eu afirmei que nenhuma suposição deveria aparecer. Um problema de valor inicial exige X0, S0, P0 e horizonte, que o enunciado não dá — declará-los foi o certo | — | `Teste 3/EXERCICIO.md` |

## 8. Veredito

**Aprovado com ressalvas.** O formato novo funcionou: três divisões, código como maior parte, cinco passos revelados, MathML, nenhum arquivo de contabilidade, análise crítica específica do caso. O tempo caiu pela metade, de 15+ para 8 minutos, mas ficou acima dos cinco.

O achado que mais importa não é sobre o modelo: a skill o proibia de fazer o que o exercício exigia. A lição saiu boa apesar disso, com a figura mais importante do exercício de fora.

O relatório de execução foi mais útil que o artefato — vale repetir a prática nos próximos testes.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `94f0648` | **Achado 1** — a proibição de escrever componente novo saiu; agora está escrito o contrário, com o caso da varredura de parâmetro nomeado |
| `94f0648` | **Achados 2 e 3** — analítico primeiro, integração confirmando, com teto de esforço explícito |
| `94f0648` | **Achado 4** — cabeçalho do `simulador.js` corrigido |
| `94f0648` | **Achado 5** — "conte antes de salvar" |
| `94f0648` | **Achado 6** — procedência explicitando faixas, ordens de grandeza ilustrativas e condições iniciais; e a regra de escrever **na** pasta indicada |
| `94f0648` | **Achado 7** — gabarito do exercício corrigido |
