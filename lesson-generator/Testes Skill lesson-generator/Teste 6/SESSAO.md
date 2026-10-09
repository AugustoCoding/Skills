# Teste 6 — sem teto de palavras: mais completa e mais rápida?

Repetição controlada do [Teste 5](../Teste%205/SESSAO.md), com o mesmo enunciado. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 6 |
| Data | 2026-09-01 |
| Quem rodou | Augusto |
| Foco | Tirar o teto de palavras devolveu tempo? E a lição ficou **mais completa** — abertura, definição por extenso, frase de fecho com cena montada — em vez de mais curta? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `fbe8760` — Mover a forma para os arquivos que se copiam, e tirar o teto esquecido |
| HEAD do dia | `9125343` — só repontou o registro do Teste 6; não tocou a skill |
| Branch | `main` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |
| Nome da pasta instalada | `lesson-generator` |

O que mudou desde o Teste 5 (`89677bf`), em dois commits, **nada disso exercitado ainda**.

### `a84f18d` — as regras

- **O teto de 1.000 palavras saiu.** No lugar, a régua de cortar o que não ensina e nunca abreviar o que ensina. Sobrou só um sinal frouxo em ~1.800 palavras de prosa.
- **Parágrafo de abertura** obrigatório: três a cinco frases situando o processo, antes da primeira divisão.
- **Definição é frase completa**, não etiqueta. E a frase de fecho monta a cena antes de concluir — duas a quatro frases por bloco.
- **Convenções de componente escritas**: DPR, cores vindas do CSS, os três eventos de redesenho, as classes de controle. Existem para poupar a leitura do `simulador.js`, que foi o maior custo de tempo do Teste 5.
- **Segundo gráfico permitido** quando o enunciado pede duas grandezas em unidades diferentes — canvas separados, nunca dois painéis num só, no máximo dois.
- **Terceira caixa de procedência** (número derivado do enunciado) e **faixa de slider declarada como configuração**, não afirmação.
- Três modos de falha novos: a definição-etiqueta, a explicação com pressa, a lição que começa na equação.
- **Design**: texto de 17 para 19 px, coluna de 46 para 54 rem, cantos de 3 para 10 px, símbolo definido em cor e negrito, e a classe `.termo`.

### `fbe8760` — a forma saiu da prosa e foi para os arquivos que se copiam

O pente passado antes deste teste. A hipótese: instrução que **descreve** forma custa raciocínio; forma que **já está escrita** se copia. O próprio Teste 5 demonstrou isso sem que ninguém notasse — o `codigo.js`, único componente com contrato escrito, foi o único que ele não abriu.

- **O teto de palavras tinha ficado em dois lugares.** `a84f18d` tirou do `LESSON-FORMAT.md` e esqueceu no `templates/licao.html` e no `README.md`. O template é lido inteiro em toda sessão: **o Teste 6 rodado antes deste commit teria medido uma remoção pela metade.**
- **`templates/componente.js`**, novo: esqueleto de gráfico que já roda, no lugar dos cinco tópicos de convenções em prosa.
- **Os cinco blocos de HTML saíram do `LESSON-FORMAT.md`** — quatro repetiam marcação que já estava no template. Ficam as regras; a forma mora só no template. O arquivo caiu de 17.020 para 15.542 B.
- **O template mostra `data-controles` com faixa e passo**, e manda conferir que a faixa alcança o valor citado na observação — é o mecanismo do achado 7.
- **`tema.js` dispara `tema-mudou`**, para componente novo repintar sem que o `tema.js` conheça o nome dele.
- **`examples/exemplo_1.md` apagado**: nada apontava para ele e o modelo nunca o abriu em cinco testes.

**Os achados 7 e 8 do Teste 5 não foram corrigidos de propósito.** As duas regras já existiam e estavam claras; mexer nelas agora misturaria duas variáveis no mesmo teste. O Teste 6 responde se foi acaso ou se a regra não pega.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code (versão não registrada) |
| Modelo | Opus 5 — `claude-opus-5` (confirmado pelo próprio modelo) |
| Modo | Esforço médio; "auto mode" ativo (trabalho pelo Bash sempre que possível) |
| Acesso à web | Não usado: nenhuma busca aparece no relatório |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Opus 5, esforço médio**, como nos cinco anteriores. Trocar o modelo aqui destruiria a comparação, que é o motivo de este teste existir.

## 4. Entrada

### Cronômetro

**No Teste 5 a cronometragem falhou**, e ela é a métrica principal desta série: sobrou "mais de 10 minutos, medido no olho". Não repita. Marque a hora ao apertar enter e a hora em que a última linha aparecer — e anote as duas **antes** de começar a avaliar a lição.

| | Horário |
|---|---|
| Prompt enviado | ~18:41 |
| Lição aberta | ~18:50 |
| **Duração** | **6 a 8 min**, cronometrado no olho pelo usuário |

Os mtimes delimitam a janela de escrita: 18:42 (primeiro script de conferência) a
18:50:08 (gravação final do HTML). Não cobrem a leitura da skill antes nem a
conferência depois — por isso a medida do usuário é a que vale.

Referências: 15+ min no Teste 2, 8 no Teste 3, **6 no Teste 4**, > 10 no Teste 5.

O alvo continua sendo **menos de 5 minutos**. Mas o resultado que interessa aqui é o **sinal**: se cair abaixo dos 6 min do Teste 4 com uma lição *maior*, `a84f18d` acertou. Se ficar acima de 10 de novo, o teto de palavras não era a causa e o diagnóstico do Teste 5 estava errado.

### O estado inicial do workspace

`Teste 6/com-skill/` começa **vazio**, como manda o protocolo.

### Prompt exato (turno 1)

**Abra uma sessão nova.** Workspace vazio, contexto limpo, um turno só.

```text
/lesson-generator

O workspace desta sessão é "lesson-generator/Testes Skill lesson-generator/Teste 6/com-skill/". Escreva ali tudo o que você gerar.

Tenho um exercício:

Uma dorna de 50 m³ fermenta mosto de altíssima gravidade, com 260 g/L de ART. O inóculo entra a 1,0 g/L de levedura, e a fermentação é anaeróbia, com temperatura controlada.

A levedura segue Monod com inibição linear pelo etanol: o crescimento cai proporcionalmente conforme o etanol sobe, e cessa quando ele chega a 90 g/L. Os parâmetros são μmax = 0,35 h⁻¹, Ks = 1,5 g/L, Yx/s = 0,045 gX/gART e Yp/x = 9,0 gP/gX.

Quero simular 72 h dessa batelada em Python, saber quanto etanol sai no final e quanto açúcar sobra — e entender como a taxa específica de crescimento se comporta ao longo do processo.
```

Idêntico ao do Teste 5, trocado só o número da pasta. O gabarito está em [EXERCICIO.md](./EXERCICIO.md). **Não mande esse arquivo para o modelo.**

**Um turno só.**

### Relatório de execução

Quando ele terminar:

```text
A sessão acabou. Preciso de um relatório de execução para documentar este teste.

Escreva em "lesson-generator/Testes Skill lesson-generator/Teste 6/RELATORIO-MODELO.md" — fora da pasta com-skill/, que não deve ser tocada.

REGRA ACIMA DE TUDO: não estime, não arredonde, não deduza. Onde você não souber o número, escreva "não sei". Um "não sei" é útil; um número inventado contamina o registro.

1. IDENTIFICAÇÃO — seu identificador de modelo exato; modo/esforço se souber.

2. TEMPO — mtime dos arquivos que você escreveu, e o tempo real de cada execução de código que você mediu. Se não tiver medição de duração total nem de tokens, escreva "não sei".

3. O QUE VOCÊ LEU — arquivos da skill abertos, na ordem, e quantas vezes. Diga em especial: você abriu assets/simulador.js? Quantas vezes, quantas linhas, e para quê. A seção de convenções de componente do LESSON-FORMAT.md foi suficiente, ou você precisou do código mesmo assim? Algum arquivo lido e não usado?

4. O QUE VOCÊ ESCREVEU — árvore com tamanhos. Escreveu fora de com-skill/? Dentro da pasta da skill?

5. FERRAMENTAS — quantas chamadas, por tipo. Quantas vezes rodou código, e para quê.

6. OS NÚMEROS — como obteve cada número da lição: analítico, integração, ou aritmética sua. Separe-os pelas três caixas de procedência do LESSON-FORMAT.md: dado do enunciado, derivado do enunciado, escolha sua. Para cada derivado, diga onde a conta aparece na lição. Para cada número que só existe por integração, diga se a lição avisa que ele é numérico. Conte quantas palavras de prosa a lição tem, diga como contou, e diga se o MathML entrou na conta.

7. DECISÕES — quantos passos na seção de código e por quê; quantos canvas, e por quê; para cada controle, a faixa e o passo que você escolheu, e se algum valor citado nas observações cai fora da faixa ou entre dois passos.

8. TAMANHO E TEMPO — o LESSON-FORMAT.md não tem mais teto de palavras. Isso mudou como você trabalhou? Você chegou a cortar prosa para caber em algum número? Quanto tempo você diria que gastou escrevendo contra revisando? E a exigência de definição por frase completa: custou escrita, ou saiu de graça?

9. ATRITO — onde gastou mais esforço; o que na skill ficou ambíguo ou contraditório; alguma regra que não conseguiu cumprir; e o que você cortaria da skill para ela ficar mais rápida sem perder o que importa.

Não altere nada em com-skill/ ao escrever este relatório.
```

## 5. Saída

Onde o modelo escreveu: `Teste 6/com-skill/` — **na pasta indicada**, sem aninhar. A pasta da skill não foi tocada.

```text
com-skill/
  batelada-vhg-inibicao-etanol.html   19 445 B
  assets/
    mu-tempo.js     11 909 B   ← escrito, a partir de templates/componente.js
    simulador.js    16 854 B   cópia
    lesson.css      15 650 B   cópia
    codigo.js        4 276 B   cópia
    tema.js          3 085 B   cópia
```

Contagem pela convenção da série: MathML **conta** como prosa; `<pre>`, `<script>` e `<style>` ficam fora.

| Medida | Teste 4 | Teste 5 | **Teste 6** | O que se esperava |
|---|---|---|---|---|
| Duração | ~6 min | > 10 min | **6 a 8 min** | < 6 min |
| Palavras de prosa | 1.036 | 1.061 | **1.991** | maior, sem ficar lenta |
| Abertura | 39 | 44 | **177** | parágrafo de 3 a 5 frases |
| Teoria | 288 | 334 | **794** | maior, e por extenso |
| Código (com código) | 1.141 | 865 | **1.265** | a maior |
| Análise crítica | 226 | 334 | **346** | |
| Blocos de equação | — | 4 | **4** | 4 |
| Canvas · painéis por canvas | 1 · 2 | 2 · 1 | **2 · 1** (320 e 340 px) | 1 painel por canvas, ≤ 2 canvas |
| Passos de código | 5 | 5 | **6** | ≤ 6 |
| Controles | 2 | 4 | **2** | ≤ 4, cada um com observação |
| Chamadas de ferramenta | — | 37 | **23** | menos |
| Execuções de código | 11 | 10 | **9** (7 Python, 2 Node) | — |
| Leituras do `simulador.js` | — | **3 inteiras** (~1.410 linhas) | **1 `grep`** (~140 linhas) | 0 |
| Componente novo | `varredura.js` | `perfil-mu.js` | **`mu-tempo.js`** | partindo do esqueleto |
| Leu `templates/componente.js`? | — | não existia | **sim, integral, e usou** | sim |

**O reaproveitamento do esqueleto, medido linha a linha:** o `mu-tempo.js` tem 321 linhas, das quais **259 são idênticas** ao `templates/componente.js` — **81%**. Ele descreve o trabalho como "três substituições, e funcionou de primeira".

**A leitura que sobrou do `simulador.js` não foi de estilo.** Foi um `grep -n "registrar\|inibicao_produto" -A 22` para descobrir as chaves de parâmetro do modelo registrado e as faixas padrão dos sliders — que a tabela de componentes não lista. Ver achado 2.

**Integrações:** 21 distintas, contra as 13 do Teste 5. Acima da "dúzia" que o formato pede, mas todas baratas: 17 delas são a varredura de `Pmax`/`S0`/`X0` que sustenta as observações dos sliders. O peso migrou de ler componente para ancorar frase, que é a troca certa.

O [relatório do modelo](./RELATORIO-MODELO.md) é o mais útil da série. A seção 6 traz a procedência número a número, e a seção 9 traz um diagnóstico de causa que ele mesmo levantou — ver achado 1.

## 6. Avaliação

**As perguntas deste teste**

- [~] **Mais rápido que os > 10 min do Teste 5**: sim, 6 a 8 min — mas não bateu os 6 min do Teste 4, e o alvo de 5 continua longe
- [x] **A lição ficou maior**: 1.991 contra 1.061 palavras, +88%. E ele **não cortou uma palavra por tamanho** — os dois cortes que fez foram de honestidade (tirou um número implícito sem procedência e trocou "nona casa decimal" por o desvio que tinha medido)
- [x] **Parágrafo de abertura** de 177 palavras entre o cabeçalho e o primeiro `<h2>`, dizendo que processo é, o que o enunciado pede e o que sai no fim
- [x] **Definição é frase completa.** "μ — taxa específica de crescimento da levedura: gramas de célula nova formados por hora, por grama de célula já presente na dorna, em 1/h". O `Ks` corrige o erro clássico dentro da própria definição: "mede a afinidade da levedura pelo açúcar, e não o ponto em que ela para de crescer"
- [x] **A frase de fecho monta a cena antes de concluir**, nos quatro blocos, com duas a quatro frases
- [x] **Não leu o `simulador.js` para aprender estilo** — uma leitura dirigida de ~140 linhas, por outro motivo
- [~] **Caixa do número derivado**: a conta aparece para 22,2 g/g, 0,405 g/g, 222 g/L e o trio final. **Não aparece** para 85,5 % de conversão nem para os fatores de Monod 0,994 e 0,962. Ver achado 1
- [x] **Um painel por canvas**, 320 e 340 px, dois canvas — conferido no navegador
- [x] **Design novo copiado**: 19 px, coluna de 54 rem, cantos de 10 px, símbolo em cor
- [x] `<span class="termo">` não usado — zero é aceitável, e melhor que usar por usar

**Os dois achados em aberto do Teste 5**

- [x] **Achado 7 fechado.** `S0:180:300:2`, e ele escreve o porquê: *"com passo 5 o slider pararia em 220 e 225 e nunca em 222, que é justamente o ponto de empate entre os dois freios"*. Conferi ao vivo: arrastando para 222, o ART toca zero no mesmo instante em que o etanol chega a 90. Os quatro valores citados nas observações caem na grade
- [ ] **Achado 8 repetido.** Seis números saem só de integração e nenhum vem declarado como numérico. Ver achado 1

**Comportamento**

- [x] Não entrevistou
- [x] Escreveu na pasta indicada, sem aninhar
- [x] Copiou só os componentes que a lição carrega — cinco em `assets/`, os cinco chamados pelo HTML
- [x] Não escreveu contabilidade
- [x] Não tocou na pasta da skill — conferido por mtime e por `git status`
- [x] Avisou onde escreveu e abriu o arquivo via CLI
- [ ] **Não verificou a lição renderizada** — e avisou. O painel do navegador abre arquivo de fora do projeto como snapshot estático. Ver achado 5

**Estrutura**

- [x] Três divisões, com o código pesando mais (1.265 contra 794 de teoria; código + crítica = 1.611)
- [x] Um bloco por equação, com os símbolos daquela equação; símbolo repetido definido só na primeira
- [x] Quatro equações em MathML
- [x] Tabela de parâmetros com unidade e procedência, inclusive `V` marcado como "não entra na integração"
- [x] Seis passos, o teto, cada um com o porquê. O quinto existe por causa da regra do número derivado, e ele diz isso
- [x] Programa completo colapsado — **extraí e rodei: executa e imprime os números da resposta**
- [x] Resposta atrás de um botão
- [x] `data-rotulos="Levedura X, ART S, Etanol P"`, e o texto usa os mesmos nomes
- [x] Quatro observações, quatro fenômenos distintos. Ele descartou um slider de `Pmax` porque a observação repetiria a de `S0`
- [x] Cada um dos dois controles com a sua observação; o segundo canvas não tem controle, e por isso não devia ter mesmo
- [x] Botão de tema, nenhum link, nenhuma promessa de continuação

**Renderização — conferida por mim, servida por HTTP, já que ele não conseguiu**

- [x] Os dois canvas desenham; 320 e 340 px; zero erro de console
- [x] **A troca de tema repinta os dois**, inclusive o `mu-tempo.js`, que o `tema.js` não conhece pelo nome — o contrato `tema-mudou` de `fbe8760` funciona ponta a ponta
- [x] Seis passos, só o primeiro visível; cinco cliques revelam tudo e liberam os dois `details`
- [x] Sete botões de copiar, sliders respeitando `min:max:passo`, linhas de leitura conferindo com o Python

**Correção técnica — treze números recalculados por fora**

- [x] ART 37,8 · etanol 90,0 · levedura 11,0, por álgebra e integração
- [x] μ inicial 0,3480 · μ(6 h) 0,1915 · X(6 h) 5,476
- [x] **dX/dt máxima 1,0489 em t = 6,004 h com μ = 0,1914** — a lição diz "1,05 às 6,0 h, μ 0,19"
- [x] 99 % do etanol em 18,507 h; com `X0` = 4,0, em 12,189 h
- [x] `S0` = 222 dá o empate; `S0` = 200 dá 81,0 g/L; Monod 0,9943 e 0,9618
- [x] Analítico primeiro, integração confirmando — o programa imprime os dois e o desvio, 5,6×10⁻⁹ g/L
- [x] Inibição linear, coerente com o componente

Nenhum número errado.

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | **Número só numérico não declarado — repetido do Teste 5, e agora com a causa mapeada.** Seis números da lição saem só de integração (18,5 h, 12,2 h, 5,5 g/L, 89,9 g/L, o pico de dX/dt, "por volta de 20 h") e nenhum vem marcado. Pior: **o programa publicado não tem evento nem busca de raiz**, então quatro deles o aluno não consegue reproduzir com o código que recebeu — confirmado extraindo e rodando o programa. O diagnóstico é dele: a ênfase do documento no par analítico/integração treina a atenção para o resultado **final** e deixa no escuro os números de meio de curva, que são justamente os que vão para as observações. Mesma família: 85,5 % e os fatores de Monod aparecem em prosa sem a conta ao lado | atrapalha | `LESSON-FORMAT.md` |
| 2 | **A tabela de componentes não basta para *usar* o `simulador.js`.** Lista os modelos registrados, mas não as chaves de parâmetro de cada um nem as faixas padrão dos sliders — e sem isso o `data-params` é adivinhação. Foi a única leitura de componente que sobrou. Quatro linhas na tabela a eliminam | atrapalha | `LESSON-FORMAT.md` |
| 3 | **"Duas a quatro observações" colide com "cada controle precisa da sua própria observação".** A partir de três controles as observações acabam e não sobra nenhuma para a leitura da curva, que é o que o formato chama de análise de verdade. Ele resolveu cortando para dois controles — e resolveu bem —, mas o documento não diz qual das duas regras cede | atrapalha | `LESSON-FORMAT.md` |
| 4 | **Redundância introduzida por `fbe8760`.** "Não abra o `simulador.js` para aprender o estilo" aparece três vezes, com a mesma anedota; e três assuntos estão inteiros no `SKILL.md` e no `LESSON-FORMAT.md` (copiar só o que a lição carrega, partir do esqueleto, o componente ficar no workspace). Ele leu cada um duas vezes. Foi o pente que criou isto: pus o ponteiro novo sem tirar a prosa antiga | cosmético | `SKILL.md` |
| 5 | **A skill não tem caminho de autoverificação de renderização.** O painel de navegador da sessão abre arquivo de fora do projeto como snapshot estático, sem executar JS nem carregar `./assets/`. Ele compensou rodando o componente em Node, mas o `simulador.js` com os `data-params` dele **nunca foi visto funcionando** por quem escreveu a lição. Estava certo desta vez — eu conferi —, mas foi sorte, não método | atrapalha | `SKILL.md` |
| 6 | **A teoria em prosa passou o código em prosa**: 794 contra 674. Com o código contado a regra passa folgada (1.265, e 1.611 somando a crítica), então não é falha — é sinal. Reli os quatro blocos procurando repetição, história ou ressalva inútil, como o formato manda acima de 1.800 palavras, e não achei: a lição é longa porque foi explicada por inteiro | cosmético | vigiar |

## 8. Veredito

**Aprovado com ressalva no tempo** — as duas mudanças pegaram e nenhum número está errado, mas 6 a 8 minutos ainda não é o alvo de 5.

O que este teste veio perguntar deu sim nas duas metades, o que não acontecia desde o Teste 4:

- **A lição ficou mais completa e mais rápida ao mesmo tempo.** De 1.061 para 1.991 palavras, e de mais de 10 minutos para 6 a 8. Ele não cortou nada por tamanho, e as definições que o teto tinha transformado em etiqueta voltaram a ser frases que definem.
- **O esqueleto de componente pagou.** 81 % das linhas vieram dele, a leitura do `simulador.js` caiu 90 %, e as chamadas de ferramenta caíram de 37 para 23. A hipótese do pente — instrução que **descreve** forma custa raciocínio, forma **já escrita** se copia — está medida.
- **O achado 7 fechou por mecanismo, não por sorte.** Ele cita a regra do passo e explica a escolha. O comentário no template fez o trabalho que a prosa não tinha feito.

O que segura o veredito é o achado 1, que é o mesmo do Teste 5 e agora tem uma agravante: quatro números da lição não podem ser reproduzidos com o programa que ela entrega. Uma lição que publica um instante e não dá ao aluno como chegar nele quebra a promessa central da skill, que é ensinar a programar a simulação — não entregar resultados.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| | |
