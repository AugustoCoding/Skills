# Teste 6 — sem teto de palavras: mais completa e mais rápida?

Repetição controlada do [Teste 5](../Teste%205/SESSAO.md), com o mesmo enunciado. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 6 |
| Data | {AAAA-MM-DD} |
| Quem rodou | Augusto |
| Foco | Tirar o teto de palavras devolveu tempo? E a lição ficou **mais completa** — abertura, definição por extenso, frase de fecho com cena montada — em vez de mais curta? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `12da50f` — Mover a forma para os arquivos que se copiam, e tirar o teto esquecido |
| HEAD do dia | `{preencher}` — se houver commit depois de `12da50f`, diga se ele tocou a skill |
| Branch | `main` |
| Alterações locais não commitadas | {não / sim — quais} |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |
| Nome da pasta instalada | `lesson-generator` |

O que mudou desde o Teste 5 (`bfff006`), em dois commits, **nada disso exercitado ainda**.

### `0af04c2` — as regras

- **O teto de 1.000 palavras saiu.** No lugar, a régua de cortar o que não ensina e nunca abreviar o que ensina. Sobrou só um sinal frouxo em ~1.800 palavras de prosa.
- **Parágrafo de abertura** obrigatório: três a cinco frases situando o processo, antes da primeira divisão.
- **Definição é frase completa**, não etiqueta. E a frase de fecho monta a cena antes de concluir — duas a quatro frases por bloco.
- **Convenções de componente escritas**: DPR, cores vindas do CSS, os três eventos de redesenho, as classes de controle. Existem para poupar a leitura do `simulador.js`, que foi o maior custo de tempo do Teste 5.
- **Segundo gráfico permitido** quando o enunciado pede duas grandezas em unidades diferentes — canvas separados, nunca dois painéis num só, no máximo dois.
- **Terceira caixa de procedência** (número derivado do enunciado) e **faixa de slider declarada como configuração**, não afirmação.
- Três modos de falha novos: a definição-etiqueta, a explicação com pressa, a lição que começa na equação.
- **Design**: texto de 17 para 19 px, coluna de 46 para 54 rem, cantos de 3 para 10 px, símbolo definido em cor e negrito, e a classe `.termo`.

### `12da50f` — a forma saiu da prosa e foi para os arquivos que se copiam

O pente passado antes deste teste. A hipótese: instrução que **descreve** forma custa raciocínio; forma que **já está escrita** se copia. O próprio Teste 5 demonstrou isso sem que ninguém notasse — o `codigo.js`, único componente com contrato escrito, foi o único que ele não abriu.

- **O teto de palavras tinha ficado em dois lugares.** `0af04c2` tirou do `LESSON-FORMAT.md` e esqueceu no `templates/licao.html` e no `README.md`. O template é lido inteiro em toda sessão: **o Teste 6 rodado antes deste commit teria medido uma remoção pela metade.**
- **`templates/componente.js`**, novo: esqueleto de gráfico que já roda, no lugar dos cinco tópicos de convenções em prosa.
- **Os cinco blocos de HTML saíram do `LESSON-FORMAT.md`** — quatro repetiam marcação que já estava no template. Ficam as regras; a forma mora só no template. O arquivo caiu de 17.020 para 15.542 B.
- **O template mostra `data-controles` com faixa e passo**, e manda conferir que a faixa alcança o valor citado na observação — é o mecanismo do achado 7.
- **`tema.js` dispara `tema-mudou`**, para componente novo repintar sem que o `tema.js` conheça o nome dele.
- **`examples/exemplo_1.md` apagado**: nada apontava para ele e o modelo nunca o abriu em cinco testes.

**Os achados 7 e 8 do Teste 5 não foram corrigidos de propósito.** As duas regras já existiam e estavam claras; mexer nelas agora misturaria duas variáveis no mesmo teste. O Teste 6 responde se foi acaso ou se a regra não pega.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | {Claude Code — desktop / CLI / web, e versão se souber} |
| Modelo | {id exato, ex: `claude-opus-5`} |
| Modo | {padrão / fast; e se "auto mode" está ativo} |
| Acesso à web | {sim / não} |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Opus 5, esforço médio**, como nos cinco anteriores. Trocar o modelo aqui destruiria a comparação, que é o motivo de este teste existir.

## 4. Entrada

### Cronômetro

**No Teste 5 a cronometragem falhou**, e ela é a métrica principal desta série: sobrou "mais de 10 minutos, medido no olho". Não repita. Marque a hora ao apertar enter e a hora em que a última linha aparecer — e anote as duas **antes** de começar a avaliar a lição.

| | Horário |
|---|---|
| Prompt enviado | |
| Lição aberta | |
| **Duração** | |

Referências: 15+ min no Teste 2, 8 no Teste 3, **6 no Teste 4**, > 10 no Teste 5.

O alvo continua sendo **menos de 5 minutos**. Mas o resultado que interessa aqui é o **sinal**: se cair abaixo dos 6 min do Teste 4 com uma lição *maior*, `0af04c2` acertou. Se ficar acima de 10 de novo, o teto de palavras não era a causa e o diagnóstico do Teste 5 estava errado.

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

Onde o modelo escreveu: `Teste 6/com-skill/`

```text
{cole a árvore}
```

Contagem pela convenção da série: MathML **conta** como prosa; `<pre>`, `<script>` e `<style>` ficam fora.

| Medida | Teste 4 | Teste 5 | **Teste 6** | O que se espera |
|---|---|---|---|---|
| Duração | ~6 min | > 10 min | | < 6 min |
| Palavras de prosa | 1.036 | 1.061 | | **maior**, sem ficar lenta |
| Abertura | 39 | 44 | | parágrafo de 3 a 5 frases |
| Teoria | 288 | 334 | | maior, e por extenso |
| Código | 1.141 | 865 | | a maior |
| Análise crítica | 226 | 334 | | |
| Blocos de equação | — | 4 | | 4 |
| Canvas · painéis por canvas | 1 · 2 | 2 · 1 | | 1 painel por canvas, ≤ 2 canvas |
| Passos de código | 5 | 5 | | ≤ 6 |
| Controles | 2 | 4 | | ≤ 4, cada um com observação |
| Leituras do `simulador.js` | — | **3** | | **0** |
| Componente novo | `varredura.js` | `perfil-mu.js` | | partindo do esqueleto |
| Leu `templates/componente.js`? | — | não existia | | sim, se escrever componente |

## 6. Avaliação

**As perguntas deste teste** — todas sobre o que `0af04c2` mudou

- [ ] **Mais rápido que os > 10 min do Teste 5**, com o mesmo enunciado
- [ ] **A lição ficou maior**, não menor: tirar o teto tinha de engordar a explicação
- [ ] **Parágrafo de abertura** de três a cinco frases, entre o cabeçalho e o primeiro `<h2>` — o `gancho` não conta
- [ ] **Definição é frase completa**: diz taxa de quê, de quem, concentração de quê e onde. Nenhuma etiqueta do tipo "P — etanol, g/L"
- [ ] **A frase de fecho monta a cena antes de concluir**, duas a quatro frases por bloco
- [ ] **Não precisou ler o `simulador.js` inteiro** — as convenções escritas bastaram
- [ ] **Caixa do número derivado usada**: a conta de 22 g/g, de 85,5 % e de 4.500 kg está visível na lição ou no código
- [ ] **Um painel por canvas**, 320 a 420 px, no máximo dois canvas
- [ ] **Design novo copiado**: 19 px, coluna de 54 rem, cantos de 10 px, símbolo em cor e negrito
- [ ] `<span class="termo">` usado com parcimônia, ou não usado — mas nunca em profusão

**O pente de `12da50f`** — a forma mudou de lugar, o tempo tem de responder

- [ ] **Não abriu o `simulador.js`** — e, se escreveu componente, **partiu de `templates/componente.js`**. Confira na seção 3 do relatório dele
- [ ] O componente novo, se houver, escuta `tema-mudou` — nada de `MutationObserver` reinventado
- [ ] **Nenhuma menção a teto de palavras** em nada que ele escreveu ou disse: o teto não existe mais em lugar nenhum da skill
- [ ] A marcação saiu igual à do template, sem invencão — agora que a forma mora num só lugar

**Os dois achados em aberto do Teste 5**

- [ ] **Achado 7** — todo valor citado numa observação é alcançável pelo slider: dentro da faixa **e** múltiplo do passo
- [ ] **Achado 8** — os números que só existem por integração estão declarados como numéricos

**Comportamento**

- [ ] Não entrevistou
- [ ] Escreveu na pasta indicada, sem aninhar
- [ ] Copiou só os componentes que a lição carrega
- [ ] Não escreveu contabilidade: nenhum arquivo de estado, índice ou registro
- [ ] Não tocou na pasta da skill
- [ ] Avisou onde escreveu e abriu o arquivo via CLI
- [ ] Falou pouco no chat

**Estrutura, que já estava certa no Teste 5 e não pode regredir**

- [ ] Três divisões: teoria · código · análise crítica, com o código pesando mais
- [ ] Um bloco por equação, com os símbolos daquela equação e nada mais
- [ ] Símbolo repetido definido só na primeira aparição
- [ ] Equações em MathML
- [ ] Tabela de parâmetros com unidade e procedência
- [ ] Passos revelados um a um, no máximo seis, cada um com o porquê
- [ ] Programa completo colapsado e executável, com botão de copiar
- [ ] Resposta numérica atrás de um botão
- [ ] `data-rotulos` batizando as curvas, e o texto usando os mesmos nomes
- [ ] Duas a quatro observações por gráfico, cada uma com insight próprio
- [ ] Cada controle com a sua observação
- [ ] Botão de claro/escuro funcionando, nenhum link, nenhuma promessa de continuação

**Correção técnica** — os números estão em [EXERCICIO.md](./EXERCICIO.md), conferidos duas vezes

- [ ] **ART sobrando ≈ 37,8 g/L** — a fermentação para por inibição, não por falta de açúcar
- [ ] Etanol final 90,0 g/L; levedura final 11,0 g/L
- [ ] Chegou ao número por **álgebra**, com a integração confirmando
- [ ] Inibição **linear**, coerente com o componente
- [ ] Nenhum número sem procedência — inclusive os embutidos em prosa

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| | | | |

## 8. Veredito

{aprovado / reprovado} — {uma frase}

Lembrete da régua: *"ganhei muito com isso, e foi rápido demais"*. As duas metades contam.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| | |
