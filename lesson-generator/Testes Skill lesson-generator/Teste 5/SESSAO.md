# Teste 5 — teoria por equação, e a disciplina do gráfico

Primeiro teste da skill já com o nome `lesson-generator`. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 5 |
| Data | {AAAA-MM-DD} |
| Quem rodou | Augusto |
| Foco | A teoria virou um bloco por equação? O gráfico ficou num painel só, com as curvas batizadas pelo exercício? E as observações têm cada uma o seu insight? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit | `{preencher com o HEAD do dia}` |
| Branch | `main` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |
| Nome da pasta instalada | `lesson-generator` |

O que mudou desde o Teste 4 (`94f0648`):

- **Teoria por bloco**: uma equação, os símbolos dela, e uma frase do que ela significa. Antes as equações vinham empilhadas e as definições depois.
- **Um gráfico, um painel**, de 320 a 420 px. No Teste 4 o componente empilhou dois painéis de 150 px e o resultado ficou apertado.
- **Curvas batizáveis** por `data-rotulos`, e a regra de que o texto usa os mesmos nomes da legenda.
- **Um insight distinto por observação.**
- Mais as seis correções de `a4ea8ea`, que nunca foram exercitadas: régua do teto de palavras, tabela de componentes, copiar só o que a lição carrega, cada controle com sua observação, a dúzia de pontos valendo para integrações, e a procedência conferida por `grep` de dígitos.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | {Claude Code CLI / desktop / web — e versão} |
| Modelo | {id exato} |
| Modo | {padrão / fast / esforço} |
| Acesso à web | {sim / não} |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Opus 5, esforço médio**, como nos quatro anteriores.

## 4. Entrada

### Cronômetro

| | Horário |
|---|---|
| Prompt enviado | |
| Lição aberta | |
| **Duração** | |

Referências: 15+ min no Teste 2, 8 no Teste 3, 6 no Teste 4.

### O estado inicial do workspace

`Teste 5/com-skill/` começa **vazio**, como manda o protocolo.

### Prompt exato (turno 1)

A skill agora se chama `lesson-generator`. **Abra uma sessão nova** — a lista de skills é lida na abertura.

```text
/lesson-generator

O workspace desta sessão é "lesson-generator/Testes Skill lesson-generator/Teste 5/com-skill/". Escreva ali tudo o que você gerar.

Tenho um exercício:

Uma dorna de 50 m³ fermenta mosto de altíssima gravidade, com 260 g/L de ART. O inóculo entra a 1,0 g/L de levedura, e a fermentação é anaeróbia, com temperatura controlada.

A levedura segue Monod com inibição linear pelo etanol: o crescimento cai proporcionalmente conforme o etanol sobe, e cessa quando ele chega a 90 g/L. Os parâmetros são μmax = 0,35 h⁻¹, Ks = 1,5 g/L, Yx/s = 0,045 gX/gART e Yp/x = 9,0 gP/gX.

Quero simular 72 h dessa batelada em Python, saber quanto etanol sai no final e quanto açúcar sobra — e entender como a taxa específica de crescimento se comporta ao longo do processo.
```

O gabarito está em [EXERCICIO.md](./EXERCICIO.md). **Não mande esse arquivo para o modelo.**

**Um turno só.**

### Relatório de execução

Quando ele terminar:

```text
A sessão acabou. Preciso de um relatório de execução para documentar este teste.

Escreva em "lesson-generator/Testes Skill lesson-generator/Teste 5/RELATORIO-MODELO.md" — fora da pasta com-skill/, que não deve ser tocada.

REGRA ACIMA DE TUDO: não estime, não arredonde, não deduza. Onde você não souber o número, escreva "não sei". Um "não sei" é útil; um número inventado contamina o registro.

1. IDENTIFICAÇÃO — seu identificador de modelo exato; modo/esforço se souber.

2. TEMPO — mtime dos arquivos que você escreveu, e o tempo real de cada execução de código que você mediu. Se não tiver medição de duração total nem de tokens, escreva "não sei".

3. O QUE VOCÊ LEU — arquivos da skill abertos, na ordem, e quantas vezes. Algum lido e não usado?

4. O QUE VOCÊ ESCREVEU — árvore com tamanhos. Escreveu fora de com-skill/? Dentro da pasta da skill?

5. FERRAMENTAS — quantas chamadas, por tipo. Quantas vezes rodou código, e para quê.

6. OS NÚMEROS — como obteve cada número da lição: analítico, integração, ou aritmética sua. Quais escolhas suas entraram, e se estão declaradas. Conte quantas palavras de prosa a lição tem, e diga como contou.

7. DECISÕES — quantos passos na seção de código e por quê; quais controles no gráfico e por quê; como resolveu ter μ em 1/h e as concentrações em g/L no mesmo pedido.

8. ATRITO — onde gastou mais esforço; o que na skill ficou ambíguo ou contraditório; alguma regra que não conseguiu cumprir; e o que você cortaria da skill para ela ficar mais rápida sem perder o que importa.

Não altere nada em com-skill/ ao escrever este relatório.
```

## 5. Saída

Onde o modelo escreveu: `Teste 5/com-skill/`

```text
{cole a árvore}
```

| Medida | Teste 4 | **Teste 5** | Alvo |
|---|---|---|---|
| Duração | ~6 min | | < 5 min |
| Palavras de prosa | 1.036 | | ~1.000 |
| Teoria · Código · Crítica | 288 · 1.141 · 226 | | teoria menor |
| Blocos de equação | — | | 4 |
| Painéis no gráfico | 2 (apertados) | | **1** |
| Passos de código | 5 | | ≤ 6 |
| Controles | 2 | | ≤ 4, cada um com observação |

## 6. Avaliação

**As perguntas deste teste**

- [ ] **Um bloco por equação**: equação · "onde" · símbolos daquela equação com unidade · frase do que ela significa
- [ ] Símbolo repetido definido só na primeira aparição
- [ ] A frase de fecho fala do **processo**, não da matemática
- [ ] **Um gráfico, um painel**, entre 320 e 420 px — nada de painéis empilhados
- [ ] μ resolvido sem segundo painel: ou é a curva escolhida, ou vira número no texto
- [ ] **`data-rotulos`** batizando as curvas com etanol, levedura e ART
- [ ] O texto usa os mesmos nomes da legenda, sem "produto" nem "P"
- [ ] Cada observação com insight próprio; nenhuma repetindo outra
- [ ] Cada controle com a sua observação

**Comportamento**

- [ ] Não entrevistou
- [ ] Escreveu na pasta indicada, sem aninhar
- [ ] Copiou só os componentes que a lição carrega
- [ ] Não escreveu componente novo (o `inibicao_produto` já existe)
- [ ] Contou as palavras de prosa antes de salvar
- [ ] Avisou onde escreveu e abriu o arquivo via CLI

**Correção técnica**

- [ ] **ART sobrando ≈ 37,8 g/L** — a fermentação para por inibição, não por falta de açúcar
- [ ] Etanol final 90,0 g/L, o próprio Pmax
- [ ] Levedura final ≈ 11,0 g/L
- [ ] Mencionou que o teto de 105,3 g/L não é alcançado
- [ ] Chegou ao número por **álgebra**, com a integração confirmando
- [ ] Nenhum número sem procedência — inclusive os embutidos em prosa
- [ ] Inibição **linear**, coerente com o componente

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
