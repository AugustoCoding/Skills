# Teste 5 — teoria por equação, e a disciplina do gráfico

Primeiro teste da skill já com o nome `lesson-generator`. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 5 |
| Data | 2026-09-01 |
| Quem rodou | Augusto |
| Foco | A teoria virou um bloco por equação? O gráfico ficou num painel só, com as curvas batizadas pelo exercício? E as observações têm cada uma o seu insight? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit | `bfff006` — Batizar as curvas do gráfico e montar o ambiente do Teste 5 |
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
| Cliente | Claude Code (versão não registrada) |
| Modelo | Opus 5 — `claude-opus-5` (confirmado pelo próprio modelo) |
| Modo | Esforço médio; "auto mode" ativo (trabalho pelo Bash sempre que possível) |
| Acesso à web | Não usado: nenhuma busca aparece no relatório |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Opus 5, esforço médio**, como nos quatro anteriores.

## 4. Entrada

### Cronômetro

| | Horário |
|---|---|
| Prompt enviado | não anotado |
| Lição aberta | não anotado |
| **Duração** | **> 10 min**, medido no olho e sem cronômetro |

Referências: 15+ min no Teste 2, 8 no Teste 3, 6 no Teste 4.

A única evidência dura é o mtime dos arquivos que ele escreveu, de 10:50:01 a 10:58:46
— 8 min 45 s de janela de escrita, que não cobre a leitura da skill antes nem a
conferência no navegador depois. **A cronometragem falhou neste teste**, e ela é a
métrica principal da série: o Teste 6 precisa marcar a hora nas duas pontas.

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

Onde o modelo escreveu: `Teste 5/com-skill/` — **na pasta indicada**, sem aninhar.

```text
com-skill/
  batelada-vhg-inibida-por-etanol.html   14 139 B
  assets/
    perfil-mu.js    9 482 B   ← escrito por ele
    simulador.js   16 854 B   cópia
    lesson.css     14 797 B   cópia
    codigo.js       4 276 B   cópia
    tema.js         2 782 B   cópia
```

Os cinco arquivos de `assets/` são carregados pela lição — nenhuma cópia sobrando, ao contrário do Teste 4, que copiou um `simulador.js` que a lição nunca chamou.

| Medida | Teste 4 | **Teste 5** | Alvo |
|---|---|---|---|
| Duração | ~6 min | **> 10 min** (não cronometrado) | < 5 min |
| Palavras de prosa | 1.036 | **1.061** | ~1.000 |
| Palavras na tela (com código) | 1.700 | 1.577 | — |
| Abertura | 39 | 44 | |
| Teoria | 288 | **334** | a menor |
| Código | 1.141 | **865** | a maior |
| Análise crítica | 226 | **334** | |
| Blocos de equação | — | **4** | 4 |
| Canvas · painéis por canvas | 1 · **2** (apertados) | **2 · 1** (320 e 340 px) | 1 painel por canvas |
| Passos de código | 5 | 5 | ≤ 6 |
| Controles | 2 | **4** (2 + 2), cada um com observação | ≤ 4 |
| Execuções de código | 11 | 13 integrações + 7 scripts auxiliares | menos peso, não menos número |
| Componente novo | `varredura.js` | **`perfil-mu.js`** | — |

**A teoria passou o código.** É a primeira vez: 334 contra 865 ainda respeita "código é a maior", mas a teoria saltou de 288 para 334 enquanto o código encolheu de 1.141 para 865. O bloco por equação custa palavra — quatro blocos, cada um com equação, símbolos e frase de fecho.

**Sobre a contagem.** Os números acima seguem a convenção dos Testes 3 e 4: contam-se títulos, parágrafos, listas, células de tabela e o texto dentro dos `<details>`, **mais o conteúdo do MathML**; ficam fora `<pre>`, `<script>` e `<style>`. O modelo contou 1.012 porque excluiu o MathML — a skill mandava contar palavras e nunca disse o que conta. A divergência deixou de importar quando `0af04c2` tirou o teto, mas a medida do registro continua sendo esta, para comparar com os testes anteriores.

O [relatório do próprio modelo](./RELATORIO-MODELO.md) traz a procedência de cada número, o inventário de leituras e chamadas, e a seção 8 de atrito, que é de onde saiu quase toda a correção deste teste.

## 6. Avaliação

**As perguntas deste teste**

- [x] **Um bloco por equação**: quatro blocos, na ordem exata — equação · "onde" · símbolos daquela equação com unidade · frase do que ela significa
- [x] Símbolo repetido definido só na primeira aparição — a primeira equação define seis; as outras três definem um cada (`X`, `Yx/s`, `Yp/x`)
- [ ] **A frase de fecho fala do processo, não da matemática** — metade falhou. "Dois freios multiplicando: falta de açúcar e excesso de etanol" conclui sem montar a cena, e a de `dX/dt` fala do erro de unidade em vez do processo. As de `dS/dt` e `dP/dt` passam. Ver achado 2
- [x] **Um painel por canvas**, entre 320 e 420 px — medido no navegador: 320 px e 340 px, um painel em cada
- [ ] **μ resolvido sem segundo painel** — não: virou um segundo canvas, com componente próprio. A regra da época dizia "não vira segundo painel", e ele leu "painel" como painel dentro do canvas. Ver achado 4: a leitura dele foi ratificada por `0af04c2`
- [x] **`data-rotulos`** batizando as curvas — `"Levedura X, ART S, Etanol P"`, e a legenda renderizada confere
- [x] O texto usa os mesmos nomes da legenda — "etanol", "ART" e "levedura" na lição inteira; nenhum "produto", nenhuma "biomassa"
- [x] Cada observação com insight próprio — seis observações, seis fenômenos distintos. Ele conta no relatório que descartou um slider de `μmax` porque a observação repetiria a de `X0`
- [x] Cada controle com a sua observação — quatro controles, quatro observações que mandam mexer e dizem o que procurar

**Comportamento**

- [x] Não entrevistou
- [x] Escreveu na pasta indicada, sem aninhar
- [x] Copiou só os componentes que a lição carrega — cinco em `assets/`, os cinco chamados pelo HTML
- [ ] Não escreveu componente novo — escreveu `perfil-mu.js`, 9.482 B. Decorre do item de μ, acima
- [x] Contou as palavras de prosa antes de salvar — 1.126, quinze substituições, 1.012. Trabalho jogado fora: ver achado 1
- [x] Avisou onde escreveu e abriu o arquivo via CLI
- [x] Não tocou na pasta da skill — conferido por mtime no relatório dele e por `git status` aqui

**Correção técnica** — recalculado por fora, por álgebra e por uma integração `Radau` independente

- [x] **ART sobrando 37,8 g/L** — S∞ = 260 − 10,0/0,045 = 37,7778. A lição diz, com todas as letras, que quem trava a dorna é o etanol
- [x] Etanol final 90,0 g/L, o próprio Pmax
- [x] Levedura final 11,0 g/L
- [~] **O teto de 105,3 g/L** não é citado. O fenômeno está lá por outro caminho — "açúcar acima de 222 g/L é ART comprado que não vira etanol" —, e o número que ele publicou é o que ele mediu. Item cumprido no espírito, não na letra
- [x] Chegou ao número por **álgebra**, com a integração confirmando — o programa imprime os dois lado a lado, e batem em dez dígitos
- [ ] **Nenhum número sem procedência** — as doze fronteiras e passos dos quatro sliders são escolhas dele e não aparecem em lugar nenhum. Ele mesmo confessa no relatório. Ver achados 5 e 8
- [x] Inibição **linear**, `μ·(1 − P/Pmax)`, a mesma forma do modelo `inibicao_produto`

**Renderização** — servida por HTTP e conferida aqui, não só no relatório do modelo

- [x] Cinco passos, só o primeiro visível; quatro cliques revelam todos e liberam os dois `<details>`
- [x] Botão de copiar em cada um dos seis blocos de código
- [x] Botão de tema presente; a troca repinta os dois canvas, inclusive o componente novo
- [x] Quatro equações em MathML, os dois canvas desenhando, zero erros de console, nenhum link externo

**Números conferidos por fora, um a um**

| Afirmação da lição | Conferido |
|---|---|
| ART residual 37,8 g/L · etanol 90,0 · levedura 11,0 | álgebra e integração batem em 10 dígitos |
| 85,5 % de conversão | 85,47 % |
| 4.500 kg de etanol na dorna | 90 g/L × 50.000 L |
| 22 g de ART por grama de levedura | 1/0,045 = 22,22 |
| μ inicial 0,348 1/h | 0,34799 |
| μ cai à metade em 6,5 h | 6,48 h |
| 99 % do teto em 18,5 h | 18,51 h |
| μ < 10⁻³ 1/h a partir de 24 h | μ(24 h) = 4,43×10⁻⁴ |
| Com `X0` = 5,0, metade em 2,6 h e etanol ainda 90 | 2,65 h; P(72) = 90,000 |
| Fronteira em `S0` = 222 g/L; com 200 o etanol cai a 81 | 222,22; P = 81,000 e ART zerado |
| Com `Yxs` = 0,060, consome 167 e sobram 93 | 166,7 e 93,33 |
| Fração de Monod de 0,994 a 0,963 com `Ks` de 1,5 a 10 | 0,9943 e 0,9630 |

Nenhum número errado. O único que não tem lastro é o "por volta da 20ª hora" da primeira observação: a leitura é defensável — 89,1 g/L em 18,5 h e 89,9 g/L em 24,5 h —, mas é leitura de curva escrita como se fosse medida.

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | **Mais de 10 minutos**, contra 6 no Teste 4. O relatório dá as duas causas medidas: três leituras do `simulador.js` inteiro (~470 linhas) — não para usar o componente, mas para aprender as convenções e escrever outro no mesmo estilo — e uma rodada inteira de edição só para caber no teto de palavras | bloqueia | `LESSON-FORMAT.md` |
| 2 | **Definição-etiqueta e frase de fecho apressada.** "P — etanol, g/L", "X — levedura, g/L", "μ — taxa específica de crescimento, 1/h" nomeiam o símbolo e não definem nada. Mesma causa do achado 1: para caber no teto, o que encolheu foi justamente o que ensina | atrapalha | `LESSON-FORMAT.md`, `templates/licao.html` |
| 3 | **A lição começa na equação.** Não há parágrafo de abertura: o `gancho` diz o que ele vai ter rodando no fim, não que processo é esse nem o que o enunciado pede. O template da época não previa o parágrafo, então isto é defeito da skill, não do modelo | atrapalha | `templates/licao.html`, `LESSON-FORMAT.md` |
| 4 | **"Um gráfico, um painel" contradizia a si mesma.** A regra dizia que a segunda grandeza "não vira segundo painel", e a seção seguinte mandava escrever o componente que faltasse em vez de deixar a figura de fora. Com μ em 1/h e as concentrações em g/L, as duas apontavam para lados opostos. Ele resolveu por dois canvas; outro leitor resolveria por um só e estaria igualmente dentro das regras | atrapalha | `LESSON-FORMAT.md` |
| 5 | **Número derivado não tinha caixa na procedência.** 22 g/g, 85,5 % e 4.500 kg não são dado do enunciado nem escolha dele: são aritmética determinada pelo enunciado, e a tabela só oferecia duas caixas | cosmético | `LESSON-FORMAT.md` |
| 6 | **Faixa de slider sem estatuto.** Doze números dele em `data-controles`, sem procedência declarada, num arquivo em que a skill manda passar por *todo* número | cosmético | `LESSON-FORMAT.md` |
| 7 | **O slider não alcança o valor que a observação manda procurar.** "Desça `S0` até 222 g/L" — mas `S0:150:320:5` para em 220 e 225, e a fronteira do fenômeno é 222,2. É exatamente o que a regra "perto de uma transição abrupta, passo grosso demais esconde justamente o que interessa" existia para evitar. A regra estava escrita e clara; ele não a aplicou | atrapalha | **em aberto** |
| 8 | **Três números só numéricos não rotulados como tais.** 18,5 h, 6,5 h e 2,6 h saem de integração e não têm forma fechada. A lição diz que a álgebra confere os valores finais, mas não avisa que estes três são numéricos — e o `SKILL.md` manda avisar | cosmético | **em aberto** |

Achados 7 e 8 não têm defeito de texto para corrigir: as duas regras já existiam e não foram cumpridas. Viram item de verificação do Teste 6.

## 8. Veredito

**Aprovado com ressalvas** — a estrutura nova pegou inteira e nenhum número está errado, mas o tempo regrediu de 6 para mais de 10 minutos e a lição saiu com definições que não definem.

O que este teste veio perguntar foi respondido, e com sim: a teoria virou quatro blocos por equação, os canvas ficaram com um painel cada, as curvas foram batizadas com os nomes do exercício, e as seis observações trazem seis fenômenos distintos. A correção técnica é a melhor da série — o resultado central saiu de uma linha de álgebra e a integração confirmou em dez dígitos.

O que reprovaria, pela régua, é a outra metade: mais de 10 minutos. E o valor deste teste está em que as duas falhas tinham a **mesma causa medida** — o teto de 1.000 palavras, que custou uma rodada de edição e, para ser cumprido, comeu as definições. Foi o relatório do modelo que entregou essa causa; sem a seção 8 dele, o diagnóstico teria sido "ficou lento" e a correção teria errado o alvo.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `0af04c2` | **Tirou o teto de palavras** (achados 1 e 2) e pôs no lugar a régua de cortar o que não ensina, nunca abreviar o que ensina. **Escreveu as convenções de componente** — DPR, cores vindas do CSS, os três eventos de redesenho, as classes de controle —, que é o que custou as três leituras do `simulador.js` (achado 1). Entrou o **parágrafo de abertura**, e a definição virou frase completa, com a frase de fecho montando a cena antes de concluir (achados 2 e 3). Resolveu as três ambiguidades que ele apontou: **segundo gráfico permitido** em canvas separado (4), **caixa do número derivado** (5) e **faixa de slider é configuração, não afirmação** (6). Mais o design: texto de 17 para 19 px, coluna de 46 para 54 rem, cantos de 10 px e o símbolo definido em cor |
| `f7d4d15` | Removeu a pasta `smoke/`, cópia temporária desta lição usada para conferir o CSS novo, que entrou no commit anterior por engano |

Achados **7 e 8 seguem em aberto** — não pedem mudança de texto, pedem verificação no próximo teste.
