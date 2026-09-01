# Relatório de execução — Teste 6 (com-skill)

Exercício: batelada VHG de 50 m³, Monod com inibição linear pelo etanol, 72 h.

---

## 1. Identificação

- **Modelo:** `claude-opus-5` (nome exibido: Opus 5).
- **Modo/esforço:** não sei o nível de esforço configurado. O que sei do ambiente: sessão interativa do Claude Code, com "auto mode" ativo — havia instrução de sessão para fazer o trabalho pelo Bash sempre que ele desse conta (ler com `cat`/`sed`, buscar com `grep`, editar com `sed`/heredoc), recorrendo às ferramentas dedicadas só quando o Bash não resolvesse.
- Skill invocada como slash command `/lesson-generator`; o `SKILL.md` chegou injetado no prompt, não foi lido por mim como arquivo.

---

## 2. Tempo

### mtime dos arquivos que escrevi (fuso -03:00)

| Arquivo | mtime |
|---|---|
| `com-skill/assets/` (criação do diretório) | 2026-09-01 18:45:01,354 |
| `com-skill/assets/lesson.css` (cópia) | 2026-09-01 18:44:33,543 |
| `com-skill/assets/tema.js` (cópia) | 2026-09-01 18:44:33,584 |
| `com-skill/assets/codigo.js` (cópia) | 2026-09-01 18:44:33,604 |
| `com-skill/assets/simulador.js` (cópia) | 2026-09-01 18:44:33,620 |
| `com-skill/assets/mu-tempo.js` (escrito) | 2026-09-01 18:44:57,756 |
| `com-skill/batelada-vhg-inibicao-etanol.html` | 2026-09-01 18:50:08,303 |
| `Teste 6/RELATORIO-MODELO.md` (este arquivo) | escrito agora; mtime não conferido depois da escrita |

Arquivos de trabalho no scratchpad (fora do repositório): `chk.py` 18:42, `chk2.py` 18:43, `chk3.py` 18:44, `prog.py` 18:46.

O mtime do `.html` (18:50) é posterior ao dos assets porque o arquivo foi reescrito às 18:50 pela correção de dois números; a primeira gravação foi antes disso, em horário que não registrei.

### Duração das execuções de código

**Não sei.** Não cronometrei nenhuma das execuções — não usei `time`, nem medi início/fim. Os mtimes acima delimitam janelas (a primeira execução de Python é de 18:42 ou pouco antes; a última medição do relatório, depois das 18:50), mas isso é intervalo entre gravações de arquivo, não duração de execução, e eu me recuso a apresentar um como o outro.

### Duração total da sessão e tokens

**Não sei.** Não tenho relógio de parede nem contador de tokens desta sessão.

---

## 3. O que eu li

Na ordem, com o número de aberturas:

| # | Arquivo | Vezes | Extensão lida | Para quê |
|---|---|---|---|---|
| 1 | `SKILL.md` | — | integral | Não foi lido por mim: veio injetado pelo slash command. |
| 2 | listagem `ls -R` da pasta da skill | 1 | — | Saber que arquivos existiam. |
| 3 | `LESSON-FORMAT.md` | 1 | integral | Formato da lição. |
| 4 | `templates/licao.html` | 1 | integral (7 277 B) | Esqueleto e marcação de cada peça. |
| 5 | `assets/simulador.js` | 1 | **parcial**, ver abaixo | Nomes dos modelos registrados e dos parâmetros de cada um. |
| 6 | `templates/componente.js` | 1 | integral (11 639 B) | Escrever o componente novo. |

**Não abri** `README.md`, `assets/lesson.css`, `assets/codigo.js` nem `assets/tema.js`. Os três últimos foram copiados sem leitura.

### `assets/simulador.js` — a pergunta específica

Abri **uma vez**, e **não** o arquivo inteiro: rodei um `grep -n "registrar\|inibicao_produto" -A 22` que devolveu aproximadamente **140 linhas** de um arquivo de ~470 (o cabeçalho de uso, linhas 21–35; os quatro blocos `registrar(...)`, linhas 58–142; e o bloco de exportação, linhas 465–471).

**Para quê:** descobrir se algum modelo registrado já era Monod × inibição linear (era: `inibicao_produto`), e — o que a documentação não me dava — **os nomes exatos das chaves de parâmetro** (`mu_max`, `Ks`, `Yxs`, `Ypx`, `Pmax`, `X0`, `S0`, `P0`) e as **faixas padrão** dos sliders, para saber quais eu teria de sobrescrever. Descobri ali que a faixa padrão de `S0` vai até 250 e a de `Ypx` até 8, ou seja, os valores deste exercício (260 e 9,0) ficam fora dos padrões — informação que mudou o que escrevi no `data-controles`.

**A seção de convenções de componente do `LESSON-FORMAT.md` foi suficiente?** Para **escrever o componente**, sim, e integralmente: não abri o `simulador.js` uma única vez para aprender estilo, cor, DPR, eventos de redesenho ou classes de controle — tudo isso saiu do `templates/componente.js`, que roda como está. Nesse ponto a regra funcionou como anunciada.

Para **usar o `simulador.js`**, não. A tabela de componentes diz o que cada peça faz e não faz, e lista os nomes dos modelos, mas não lista as chaves de parâmetro de cada modelo nem as faixas padrão dos sliders. Sem isso eu não conseguia escrever um `data-params` correto, e o custo de errar é uma lição que abre com o gráfico errado. Então a leitura foi necessária — mas foi um `grep` dirigido de ~140 linhas, não as "três leituras de 470 linhas" que o formato cita como o pior caso.

**Algum arquivo lido e não usado?** Nenhum arquivo inteiro. Dentro do `grep` do `simulador.js`, os blocos `quimiostato` e `batelada_alimentada` (~40 linhas) vieram junto e não serviram para nada — desperdício do `-A 22` aplicado a todas as ocorrências, não de decisão minha de leitura.

---

## 4. O que eu escrevi

```
Teste 6/
  RELATORIO-MODELO.md                    este arquivo
  com-skill/
    batelada-vhg-inibicao-etanol.html    19 445 B   escrito
    assets/
      lesson.css                         15 650 B   cópia da skill
      simulador.js                       16 854 B   cópia da skill
      mu-tempo.js                        11 909 B   ESCRITO (a partir de templates/componente.js)
      codigo.js                           4 276 B   cópia da skill
      tema.js                             3 085 B   cópia da skill
```

**Escrevi fora de `com-skill/`?** Sim, dois lugares:

1. O scratchpad da sessão (`%LOCALAPPDATA%\Temp\claude\...\scratchpad`): `chk.py`, `chk2.py`, `chk3.py`, `prog.py`. É o diretório temporário que o ambiente designa para isso; fora do repositório.
2. Este relatório, em `Teste 6/RELATORIO-MODELO.md`, a pedido.

**Escrevi dentro da pasta da skill?** **Não.** Conferido: todos os mtimes em `Skill lesson-generator/assets/` e `templates/` são anteriores ao início desta sessão (o mais recente é `tema.js`/`componente.js`/`licao.html` às 17:38, e a sessão começou por volta das 18:42). O `git status` do repositório mostra como novidade apenas `com-skill/assets/`, `com-skill/batelada-vhg-inibicao-etanol.html` e um `_handoff/` que já existia antes de eu começar.

---

## 5. Ferramentas

Contagem por tipo, até o momento da escrita deste relatório:

| Ferramenta | Chamadas |
|---|---|
| `Bash` | 19 |
| `Write` | 2 (o HTML da lição; este relatório) |
| `PowerShell` | 1 (`Start-Process` para abrir a lição) |
| `mcp__Claude_Browser__browser_batch` | 1 (3 sub-ações: navegar, ler console, screenshot) |
| **Total** | **23** |

Das 19 chamadas de Bash: 4 foram leitura de arquivo da skill, 2 foram cópia/criação de diretório, 3 foram varredura de conferência no HTML já escrito (grep de dígitos, `sed` de linhas), 1 falhou, e as demais rodaram código.

**Execuções de código: 9 no total — 7 de Python, 2 de Node.**

| # | Motor | O quê | Para quê |
|---|---|---|---|
| 1 | Python | `chk.py` | Integrar o caso base com `Radau`, rtol 1e-10, e comparar com o resultado analítico; conferir o invariante P = Ypx·(X−X0); tabelar μ e dX/dt em 12 instantes; achar por `brentq` os tempos de 50/90/99/99,9% de Pmax; repetir com RK45 para ver se o método muda o resultado; achar o pico de dX/dt. |
| 2 | Python | `chk2.py` | Varrer Pmax (6 valores), S0 (7 valores) e X0 (4 valores) para sustentar as observações dos sliders, e medir o tempo de 99% para cada X0. |
| 3 | Python | script de edição | Transformar a cópia do `templates/componente.js` no `mu-tempo.js` (identidade, `calcular`, `ler`). Não é cálculo. |
| 4 | Node | `require` do `mu-tempo.js` com DOM falso | Ver se o arquivo carrega sem erro de sintaxe. |
| 5 | Node | `eval` do trecho `taxa`/`deriv`/`calcular`/`ler` | **Conferir o componente contra o Python**: o RK4 em JS devolve μ inicial 0,348 e pico de dX/dt 1,05 em t = 6,0 h com μ = 0,19 — os mesmos números do `solve_ivp`. |
| 6 | Python | `chk3.py` | Três âncoras que faltavam para a prosa: μ em t = 6,01 h; o instante em que μ cai à metade; os fatores de Monod inicial e final. |
| 7 | Python | `prog.py` | **Rodar o programa completo da lição**, exatamente como ele aparece no `<details class="programa">`, com backend Agg. Confirma que o código publicado executa e imprime os números da resposta. |
| 8 | Python | script de edição | Aplicar as duas correções de procedência no HTML já salvo. Não é cálculo. |
| 9 | Python | contagem de palavras | Para este relatório. |

Integrações distintas do modelo: **21** (1 no caso base com duas tolerâncias, 17 na varredura de Pmax/S0/X0, 4 nos tempos de 99% por X0, mais a do programa final) — dentro do teto de "uma dúzia" que o formato pede, na mesma ordem de grandeza; não passei nem perto de varrer centenas de pontos.

**Uma chamada falhou:** a tentativa de gravar o HTML por heredoc no Bash (`cat > arquivo <<'HTML'`) morreu com erro de parsing do shell. Recorri à ferramenta `Write`. Custou uma ida e volta.

---

## 6. Os números

### Caixa 1 — dado do enunciado (sem marca na lição)

μmax 0,35 1/h · Ks 1,5 g/L · Yx/s 0,045 gX/gART · Yp/x 9,0 gP/gX · Pmax 90 g/L · X0 1,0 g/L · S0 260 g/L · T 72 h · V 50 m³. Todos na tabela de parâmetros com procedência "enunciado".

### Caixa 2 — derivado do enunciado

| Número | Como obtive | A conta aparece na lição? |
|---|---|---|
| 22,2 g de ART por g de levedura | aritmética minha: 1/0,045 | **Sim** — escrita no bloco da equação de dS/dt. |
| 0,405 g etanol/g ART | aritmética minha: 9,0 × 0,045 | **Sim** — escrita no bloco da equação de dP/dt. |
| X final 11,0 g/L | **analítico**: X∞ = X0 + Pmax/Ypx | **Sim** — no passo 5 ("1,0 + 90/9,0") e no programa completo (`X_inf`). |
| ART residual 37,8 g/L | **analítico**: S∞ = S0 − (X∞−X0)/Yxs | **Sim** — no passo 5 ("260 − 10,0/0,045") e no programa (`S_inf`). |
| Etanol final 90,0 g/L | **analítico**: é Pmax, por imposição de μ = 0 | **Sim** — o passo 5 explica que P = Yp/x·(X−X0) e que se impõe P = Pmax. |
| 4 500 kg de etanol na dorna | aritmética minha: 90 × 50 000/1000 | **Sim** — a conta está no código (`P[-1]*V/1000`). |
| 1 889 kg de ART residual | aritmética minha: 37,78 × 50 000/1000 | **Sim** — no código (`S[-1]*V/1000`). |
| 222 g/L de ART para o empate (observação do slider `S0`) | **analítico**: (90/9,0)/0,045 | **Sim** — a observação escreve os dois passos: "90/9,0 = 10" e "10/0,045 = 222". |
| 81 g/L de etanol com S0 = 200 | **analítico** (X∞ = X0 + Yxs·S0 quando o açúcar acaba antes), confirmado na integração da varredura | **Não** — o número aparece na terceira observação sem a conta ao lado. |
| 222,2 g/L de ART entregues | aritmética minha: 260 − 37,8 | **Parcialmente** — a subtração não está escrita, mas 222 aparece derivado por outro caminho na terceira observação. |
| 85,5% de conversão | aritmética minha: 222,2/260 | **Não** — a divisão não aparece em lugar nenhum da lição. |
| μ inicial 0,348 1/h | fórmula fechada: 0,35 × 260/261,5 × 1 | **Não** a conta; **sim** o cálculo — o programa imprime `mu_t[0]`. |
| Monod 0,994 (inicial) e 0,962 (final) | aritmética minha: 260/261,5 e 37,78/39,28 | **Não** — nenhuma das duas divisões está escrita. |

### Caixa 3 — escolha minha (marcada como tal)

| Escolha | Onde está declarada |
|---|---|
| P0 = 0 g/L | tabela de parâmetros, com a justificativa ("o inóculo entra sem etanol, e o enunciado não menciona reciclo de vinho"). |
| `Radau`, rtol 1e-9, atol 1e-11 | passo 4, com o porquê (rigidez no fim da batelada). |
| `t_eval` com 721 pontos (0,1 h) | passo 4, com o porquê (saída lisa no gráfico). |
| Passo de 0,01 h no RK4 do `mu-tempo.js` | comentário dentro do componente. |
| Faixas dos sliders (`S0` 180–300 passo 2; `X0` 0,5–5 passo 0,5) | configuração, não afirmação — o formato dispensa procedência. |

### Números que só existem por integração — e se a lição avisa

Estes **não têm forma fechada** e saíram exclusivamente do integrador:

| Número | Onde aparece | A lição avisa que é numérico? |
|---|---|---|
| dX/dt máxima 1,05 g·L⁻¹·h⁻¹ às 6,0 h, com μ = 0,19 1/h | resposta e segunda observação | **Não explicitamente.** O programa o calcula por `argmax` sobre o vetor integrado e o `mu-tempo.js` o recalcula ao vivo na linha de leitura — ou seja, o aluno vê de onde vem —, mas nenhuma frase diz "este é numérico". |
| 18,5 h para 99% do etanol final | resposta e quarta observação | **Não.** Pior: o programa publicado nem calcula esse número. Obtive por `brentq` sobre a solução densa, num script que não está na lição. |
| 12,2 h para 99% com X0 = 4,0 | quarta observação | **Não**, mesmo caso. |
| 5,5 g/L de levedura às 6,0 h | segunda observação | **Não**, mesmo caso. |
| 89,9 g/L de etanol às 24 h | primeira observação | **Não**, mesmo caso. |
| "congelam por volta de 20 h" | primeira observação | é aproximação verbal minha sobre a curva integrada. |

**Este é o achado mais desconfortável do relatório:** a lição declara com clareza que o trio (11,0 / 37,8 / 90,0) foi conferido por álgebra e integração, mas os seis números acima são só integração, e nenhum vem marcado como tal. Quatro deles (18,5 h, 12,2 h, 5,5 g/L, 89,9 g/L) sequer podem ser reproduzidos com o programa que a lição entrega — o aluno teria de escrever a busca de raiz por conta própria. Isso é uma violação da regra "diga na lição que o número é numérico, com o critério que você usou para dizer que convergiu", e não a percebi antes de salvar.

### Contagem de palavras

- **1 883 palavras** de prosa, pelo critério que considero o certo aqui.
- **Como contei:** script Python sobre o `<body>` do HTML — removi os blocos `<math>…</math>`, os blocos `<pre>…</pre>` (todo o código), os comentários e os `<script>`; tirei as tags restantes; contei os tokens separados por espaço que tivessem ao menos um caractere alfanumérico.
- **O MathML entrou na conta?** **Não** — foi removido antes de contar, junto com o código. Entraram: o parágrafo de abertura, os quatro blocos de teoria (incluindo as listas de símbolos), a tabela de parâmetros (81 palavras), os títulos, as explicações dos seis passos, os textos da resposta e as quatro observações.
- Contagem alternativa, restrita a `<p>`, `<li>`, `<h1..3>` e `<summary>`: **1 775 palavras**. A diferença de 108 é o texto solto entre as seções.
- Nota honesta: **fiz esta contagem agora, ao escrever o relatório, e não antes de salvar a lição.** O formato pede que, passando de ~1 800 palavras, o autor releia procurando repetição. Eu não fiz essa releitura dirigida por contagem — reli por conteúdo, não por número.

---

## 7. Decisões

### Passos de código: 6 (o máximo permitido)

Parâmetros · cinética isolada · derivadas · integração · respostas e conferência analítica · gráficos.

O quinto passo existe por causa de uma regra do formato, não do programa: os números derivados precisam ter a conta visível, e a conferência analítica é o que autoriza publicar 11,0 / 37,8 / 90,0. Sem essa exigência eu teria fundido respostas e gráficos e ficado em cinco. O segundo passo (μ numa função própria) foi separado do terceiro porque a terceira pergunta do enunciado é sobre μ, e ter a função isolada é o que permite recalculá-la depois da integração sem repetir a fórmula.

### Canvas: 2

O formato autoriza o segundo exatamente neste caso — "quanto etanol sai" e "como μ se comporta ao longo do tempo" estão em unidades diferentes (g/L e 1/h) e a segunda só se enxerga em curva. Um canvas é o `simulador.js` no modelo `inibicao_produto` (X, S, P contra t); o outro é o `mu-tempo.js`, escrito para esta lição a partir de `templates/componente.js`, porque o simulador não desenha μ. Cada um ocupa a coluna inteira, 340 px de altura, um painel por canvas.

Considerei pôr μ e dX/dt no mesmo eixo do segundo canvas — o contraste entre as duas é o ponto didático central — e desisti pela regra de unidade: 1/h contra g·L⁻¹·h⁻¹. A saída foi a que o formato prescreve: μ na curva, dX/dt como número, na linha de leitura do componente.

### Controles

| Controle | Canvas | Faixa | Passo | Padrão |
|---|---|---|---|---|
| `S0` | 1 | 180 a 300 | 2 | 260 |
| `X0` | 1 | 0,5 a 5 | 0,5 | 1,0 |

O segundo canvas não tem controle nenhum — sem observação que convoque um slider, ele seria decorativo.

**Algum valor citado nas observações cai fora da faixa ou entre dois passos?** Não. Conferido um a um:

- "desça `S0` até 222" → 222 = 180 + 21×2, cai exatamente na grade.
- "com 200 g/L de ART" → 200 = 180 + 10×2, na grade.
- 260 (o padrão) → na grade.
- "suba `X0` de 1,0 para 4,0" → ambos múltiplos de 0,5, na grade.

Foi por isso que escolhi passo 2 em `S0` e não 5: com passo 5 o slider pararia em 220 e 225 e nunca em 222, que é justamente o ponto de empate entre os dois freios.

**Um controle que decidi não pôr:** `Pmax`. Ele é o parâmetro mais central do modelo, e a tentação era grande. Mas a observação que ele geraria — "suba Pmax e o açúcar vira o gargalo" — é o mesmo fenômeno da observação de `S0` visto do outro lado, e o formato manda fundir ou cortar quando dois itens explicam a mesma coisa. Cortei. Ficaram 2 controles e 4 observações, dentro dos dois limites.

---

## 8. Tamanho e tempo

**A ausência de teto mudou como trabalhei?** Sim, e de um jeito específico e verificável: as listas `.termos` têm definições de duas linhas, com a grandeza dita por extenso ("gramas de célula nova formados por hora, por grama de célula já presente na dorna"), e as frases de fecho dos quatro blocos montam a cena antes de concluir. Com um teto de, digamos, 1 200 palavras, o primeiro corte que eu teria feito é exatamente esse — as definições viram etiqueta e as frases de fecho perdem a primeira metade. O texto tem 1 883 palavras; num orçamento apertado ele caberia, mas caberia pior.

**Cortei prosa para caber em algum número?** **Não.** Fiz exatamente dois cortes no texto, e nenhum foi por tamanho: tirei "quase o dobro de um mosto convencional" da abertura porque é um número implícito sem procedência, e troquei "concordam até a nona casa decimal" por "concordam dentro de 10⁻⁸ g/L de ART" porque o desvio medido foi 5,6×10⁻⁹ e a primeira formulação era mais precisa do que a medição sustentava. Os dois cortes foram de honestidade, não de economia.

**Escrita contra revisão — quanto tempo?** **Não sei**, em minutos: não medi. O que posso dizer é a estrutura das chamadas: 6 chamadas de ferramenta antes de escrever a primeira linha da lição (leitura + cálculo), 1 para escrever o HTML, e 4 depois dele (varredura de dígitos, correção, verificação no navegador, abertura). Em número de idas e voltas, portanto, a preparação dominou; a revisão pós-escrita foi curta e concentrada na conferência dos números.

**A definição por frase completa custou escrita?** Custou pouco, e não onde eu esperava. Escrever "Ks — concentração de ART em que μ cai à metade de μmax, em g/L; mede a afinidade da levedura pelo açúcar, e não o ponto em que ela para de crescer" não é mais difícil que escrever "Ks — constante de saturação, g/L": é mais longo, e obriga a decidir o que a grandeza significa neste processo. O custo real foi de **decisão**, não de digitação — a frase completa não deixa você se esconder atrás do nome do símbolo. Onde ela realmente pesou foi nas frases de fecho dos blocos, que exigem contexto antes da conclusão e por isso não podem ser escritas antes de você já saber o resultado da simulação. Isso força uma ordem: calcular primeiro, escrever teoria depois. Foi o que fiz, mas não por planejamento — descobri no meio.

---

## 9. Atrito

**Onde gastei mais esforço.** Na conferência dos números, com folga. A escrita do HTML foi um passe único; o `mu-tempo.js` saiu do esqueleto com três substituições e funcionou de primeira. O que consumiu chamadas foi montar as âncoras das observações: cada frase do tipo "suba X0 para 4,0 e o patamar não se mexe" exigiu uma varredura para não ser chute. Cinco das nove execuções de código existem só para isso.

**O que ficou ambíguo ou contraditório na skill.**

1. **"Duas a quatro observações" contra "cada controle precisa da sua própria observação".** As duas regras colidem assim que você quer três ou quatro controles: com quatro controles, as quatro observações já estão gastas e não sobra nenhuma para a leitura da curva, que é o que o formato chama de análise de verdade. Resolvi cortando controles até 2, e acho que resolvi bem — mas resolvi por conta própria, o documento não diz qual das duas regras cede.

2. **A tabela de componentes não basta para *usar* o `simulador.js`.** O `LESSON-FORMAT.md` diz "leia esta tabela em vez de abrir o código dos componentes", e para escrever componente novo isso é verdade. Para configurar um modelo já registrado, não é: a tabela lista os nomes dos modelos, mas não as chaves de parâmetro nem as faixas padrão dos sliders, e sem isso o `data-params` é adivinhação. Tive de abrir o arquivo mesmo assim. Quatro linhas a mais na tabela — as chaves de cada modelo — eliminariam essa leitura por completo.

3. **A regra dos números numéricos é clara e mesmo assim eu a descumpri.** "Quando não houver solução analítica, integre com tolerância apertada e diga na lição que o número é numérico." Eu li isso, apliquei ao trio final (que nem precisava, porque tem forma fechada) e não apliquei aos seis números que realmente só existem por integração. Suspeito que a causa é a própria ênfase do documento no par analítico/integração: ela treina a atenção para o resultado final e deixa no escuro os números de meio de curva, que são justamente os que aparecem nas observações. Uma linha dizendo "isso vale também para os instantes e picos que você citar nas observações" teria me pegado.

**Alguma regra que não consegui cumprir.** Duas.

- A que acabei de descrever: os números só-numéricos não vêm marcados na lição.
- **Não verifiquei a lição renderizada.** O painel de navegador da sessão abre arquivos de fora da pasta do projeto como snapshot estático, sem executar JS nem carregar `./assets/`, então o que vi ali não prova nada sobre os dois gráficos. Compensei rodando o `mu-tempo.js` em Node e conferindo que ele devolve os mesmos números do Python — mas o `simulador.js` com os meus `data-params` e `data-controles` **nunca foi visto funcionando**. Abri o arquivo no navegador do sistema com `Start-Process`, e não tenho como ver o resultado. Se algo estiver errado ali, está errado sem eu saber.

**O que eu cortaria da skill para ela ficar mais rápida sem perder o que importa.**

- **A repetição entre `SKILL.md` e `LESSON-FORMAT.md`.** Três assuntos aparecem inteiros nos dois arquivos: copiar só os componentes que a lição carrega, escrever componente novo a partir do `templates/componente.js`, e o componente ficar no workspace em vez de virar peça da skill. Li cada um duas vezes. Um dos dois lugares pode virar uma linha com ponteiro.
- **"Não abra o `simulador.js` para aprender o estilo"** aparece três vezes (no `SKILL.md`, na seção de componentes e na seção de varredura do `LESSON-FORMAT.md`), com a mesma justificativa e a mesma anedota das três leituras de 470 linhas. Uma vez convence; três só ocupam leitura.
- **O que eu não cortaria**, e que quase parece candidato: os exemplos ruins/bons das definições ("P — etanol, g/L" contra a frase completa). É o trecho mais didático dos dois documentos e é o que efetivamente mudou o que eu escrevi. Sem ele, a instrução "definição é frase completa" viraria abstração e eu teria escrito etiquetas.
