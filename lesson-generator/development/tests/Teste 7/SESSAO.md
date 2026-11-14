# Teste 7 — a skill sem domínio: forma da skill, teoria do modelo

Repetição controlada dos Testes [5](../Teste%205/SESSAO.md) e [6](../Teste%206/SESSAO.md), com o mesmo enunciado. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 7 |
| Data | 2026-09-04 |
| Quem rodou | Augusto |
| Foco | A skill entrega só **forma** e o modelo entrega a **teoria**: a simulação continua fisicamente certa sem a rede de erros do domínio? E escrever o próprio `registrar` custa menos que ler o catálogo? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `11ac5de` — Tirar o dominio da skill e consertar o grafico de 300px |
| HEAD do dia | `088b110` — só montou este teste; não tocou a skill |
| Branch | `main` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |
| Nome da pasta instalada | `lesson-generator` |

O que mudou desde o Teste 6 (`fbe8760`), tudo em `11ac5de` e **nada exercitado ainda**.

### A regra nova

**A skill entrega forma — trechos de CSS, JS e HTML para copiar e editar. Teoria de fermentação é com o modelo.** Decidida numa sessão de grilling, e é o que orienta todos os cortes abaixo.

### O que saiu

- **A seção "Erros do domínio que corrompem a simulação"**, os dez itens. É a **única rede** que a skill tinha contra simulação fisicamente errada, e ela não existe mais.
- **Os quatro modelos empacotados do `simulador.js`** — `batelada`, `quimiostato`, `batelada_alimentada`, `inibicao_produto`; 86 das 471 linhas. Fica o motor e o `registrar`. Cada lição registra o sistema do exercício dela.
- **O `ler()` do simulador**, que detectava quimiostato por `padroes.D` e imprimia "washout: D acima do crítico". Agora mostra o valor final de cada variável, com os nomes da legenda.
- **Os regimes nomeados** de "Como achar os números" e do exemplo de observação. A regra do analítico-primeiro ficou: é epistemologia de número, não teoria de fermentação.

### O que entrou

- **O bug de 300 px, corrigido.** O `lesson.css` prendia a regra de largura ao `.simulador`; canvas sem largura em CSS cai na largura intrínseca de 300 px, e o `|| 600` nunca disparava porque 300 é truthy. Era a causa dos gráficos estreitos dos Testes 4 e 6.
- **`.sim-moldura`**, que o esqueleto se põe sozinho, para dois gráficos da mesma lição terem a **mesma** largura.
- **`registrar()` re-varre**, e `iniciar()` ficou idempotente. Sem isso nada funcionaria: script com `defer` roda com `readyState` já em `"interactive"`, então `iniciar()` já passou quando o `registrar` da lição chega.
- **Duas formas de figura prontas no template** — curso temporal com o `registrar` inline, e varredura apontando para o esqueleto. Duas, não quatro.
- **Achado 1 do Teste 6:** todo número que a lição cita tem de ser calculado pelo programa que ela entrega.
- **Achado 3 do Teste 6:** duas a quatro observações de leitura da curva, **mais** uma por controle.
- **Achado 5 do Teste 6:** o comando do servidor estático no `SKILL.md`, porque `file://` não executa JS.
- **Coluna de volta a 46 rem.** Os 19 px, os cantos de 10 px e o símbolo em cor ficam.
- `tema.js` não conhece mais componente pelo nome: dispara `tema-mudou` e pronto.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code (versão não registrada) |
| Modelo | Opus 5 — `claude-opus-5` (confirmado pelo próprio modelo) |
| Modo | Esforço médio; "auto mode" ativo (trabalho pelo Bash sempre que possível) |
| Acesso à web | Não usado |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Opus 5, esforço médio**, como nos seis anteriores.

## 4. Entrada

### Cronômetro

Marque a hora ao apertar enter e a hora em que a última linha aparecer, e anote as duas **antes** de começar a avaliar.

| | Horário |
|---|---|
| Prompt enviado | não anotado |
| Lição aberta | não anotado |
| **Duração** | **não medida** |

**A cronometragem falhou pela segunda vez em três testes** — ver achado 4. A única
evidência é a janela de mtime, 19:01:56 a 19:11:46 (9m50s), e ela **não é comparável**
às dos testes anteriores: começa na cópia dos assets em vez do primeiro script de
rascunho, cujos mtimes o relatório não trouxe, e inclui a verificação no navegador,
que é trabalho que `11ac5de` passou a exigir e que o Teste 6 não fez.

Consequência: **a pergunta central de `11ac5de` fica sem resposta.** Escrever o
`registrar` custa menos que ler o catálogo? Todas as outras evidências dizem que sim
— 21 chamadas contra 23, zero leituras do `simulador.js` contra uma —, mas o
cronômetro é quem decide, e ele não rodou.

Referências: 15+ min no Teste 2, 8 no Teste 3, **6 no Teste 4**, > 10 no Teste 5, **6 a 8 no Teste 6**.

Duas forças opostas nesta versão, e o cronômetro é quem decide qual venceu: escrever o `registrar` é trabalho novo (~15 linhas), mas some a leitura do catálogo e a decisão de qual modelo usar. **Abaixo de 6 min, a aposta pagou.**

### O estado inicial do workspace

`Teste 7/com-skill/` começa **vazio**, como manda o protocolo.

### Prompt exato (turno 1)

**Abra uma sessão nova.** Workspace vazio, contexto limpo, um turno só.

```text
/lesson-generator

O workspace desta sessão é "lesson-generator/Testes Skill lesson-generator/Teste 7/com-skill/". Escreva ali tudo o que você gerar.

Tenho um exercício:

Uma dorna de 50 m³ fermenta mosto de altíssima gravidade, com 260 g/L de ART. O inóculo entra a 1,0 g/L de levedura, e a fermentação é anaeróbia, com temperatura controlada.

A levedura segue Monod com inibição linear pelo etanol: o crescimento cai proporcionalmente conforme o etanol sobe, e cessa quando ele chega a 90 g/L. Os parâmetros são μmax = 0,35 h⁻¹, Ks = 1,5 g/L, Yx/s = 0,045 gX/gART e Yp/x = 9,0 gP/gX.

Quero simular 72 h dessa batelada em Python, saber quanto etanol sai no final e quanto açúcar sobra — e entender como a taxa específica de crescimento se comporta ao longo do processo.
```

Idêntico ao dos Testes 5 e 6, trocado só o número da pasta. O gabarito está em [EXERCICIO.md](./EXERCICIO.md). **Não mande esse arquivo para o modelo.**

**Um turno só.**

### Relatório de execução

Quando ele terminar:

```text
A sessão acabou. Preciso de um relatório de execução para documentar este teste.

Escreva em "lesson-generator/Testes Skill lesson-generator/Teste 7/RELATORIO-MODELO.md" — fora da pasta com-skill/, que não deve ser tocada.

REGRA ACIMA DE TUDO: não estime, não arredonde, não deduza. Onde você não souber o número, escreva "não sei". Um "não sei" é útil; um número inventado contamina o registro.

1. IDENTIFICAÇÃO — seu identificador de modelo exato; modo/esforço se souber.

2. TEMPO — mtime dos arquivos que você escreveu, e o tempo real de cada execução de código que você mediu. Se não tiver medição de duração total nem de tokens, escreva "não sei".

3. O QUE VOCÊ LEU — arquivos da skill abertos, na ordem, e quantas vezes. Diga em especial: você abriu assets/simulador.js? Se sim, quantas linhas e para quê exatamente. Algum arquivo lido e não usado?

4. O QUE VOCÊ ESCREVEU — árvore com tamanhos. Escreveu fora de com-skill/? Dentro da pasta da skill?

5. FERRAMENTAS — quantas chamadas, por tipo. Quantas vezes rodou código, e para quê.

6. OS NÚMEROS — como obteve cada número da lição: analítico, integração, ou aritmética sua. Separe-os pelas três caixas de procedência do LESSON-FORMAT.md. Para cada número que só existe por integração, responda duas coisas: a lição avisa que ele é numérico, e o programa que a lição publica calcula esse número? Conte as palavras de prosa e diga como contou.

7. O REGISTRAR — a skill não traz mais nenhum modelo pronto: você teve de escrever o Simulador.registrar com as equações deste exercício. Quantas linhas? Quanto do template você copiou sem mudar? O deriv em JavaScript é a mesma equação do seu código Python — conferiu isso, e como? Ter escrito o sistema você mesmo mudou alguma coisa na lição?

8. TEORIA — a skill não contém nenhum conhecimento de fermentação: nada sobre Monod, rendimentos, sinais de derivada ou o que significa cada símbolo. Que fatos do domínio você teve de trazer de si mesmo para resolver isto? Em algum momento sentiu falta de uma informação que a skill deveria ter dado?

9. A LIÇÃO RENDERIZADA — você viu os gráficos desenhando? Como? Se serviu por HTTP, diga o comando. Se não conseguiu ver, diga isso com todas as letras e diga o que fez no lugar.

10. ATRITO — onde gastou mais esforço; o que na skill ficou ambíguo ou contraditório; alguma regra que não conseguiu cumprir; e o que você cortaria da skill para ela ficar mais rápida sem perder o que importa.

Não altere nada em com-skill/ ao escrever este relatório.
```

## 5. Saída

Onde o modelo escreveu: `Teste 7/com-skill/`**`aula-fermentacao/`** — **aninhou**, ver achado 1. A pasta da skill não foi tocada.

```text
com-skill/
  aula-fermentacao/                              ← pasta criada por ele, indevidamente
    batelada-altissima-gravidade.html   20 793 B
    assets/
      mu.js                            11 452 B   ← escrito, a partir de templates/componente.js
      lesson.css                       16 144 B   cópia
      simulador.js                     14 176 B   cópia — nunca aberto
      codigo.js                         4 276 B   cópia
      tema.js                           2 882 B   cópia
```

Contagem pela convenção da série: MathML **conta** como prosa; `<pre>`, `<script>` e `<style>` ficam fora.

| Medida | Teste 5 | Teste 6 | **Teste 7** | O que se esperava |
|---|---|---|---|---|
| Duração | > 10 min | 6 a 8 min | **não medida** | < 6 min |
| Janela de escrita (mtime) | 8m26s | ~8 min | **9m50s** | — |
| Palavras de prosa | 1.061 | 1.991 | **2.071** | ~2.000 |
| Abertura | 44 | 177 | **175** | 3 a 5 frases |
| Teoria | 334 | 794 | **708** | |
| Código (com código) | 865 | 1.265 | **1.305** | a maior |
| Análise crítica | 334 | 346 | **538** | |
| Chamadas de ferramenta | 37 | 23 | **21** | ≤ 23 |
| Execuções de código | 10 | 9 | **7** | |
| **Leituras do `simulador.js`** | 3 inteiras | 1 `grep`, ~140 linhas | **0 — nem uma linha** | **0** |
| Reaproveitamento do esqueleto | — | 81% | **82%** (249 de 304 linhas) | |
| Linhas do `registrar` | — | não existia | **17** | ~15 |
| **Largura dos canvas (px)** | 600 · 600 | 600 · **300** | **826 · 826** | iguais |
| Passos de código | 5 | 6 | **5** | ≤ 6 |
| Controles | 4 | 2 | **4** | ≤ 4 |
| Observações | 6 | 4 | **7** (3 de leitura + 4 de controle) | pela regra nova |

**A janela de escrita não é comparável às anteriores.** Em `T5` e `T6` ela partia do primeiro script de rascunho; aqui o relatório não deu os mtimes do scratchpad, e o primeiro arquivo registrado já é a cópia dos assets. Além disso, os 9m50s **incluem a verificação no navegador**, que é trabalho novo que `11ac5de` passou a exigir e que o Teste 6 não fez.

O [relatório do modelo](./RELATORIO-MODELO.md) é o mais direto da série sobre os próprios limites — a seção 9 diz com todas as letras o que ele não conseguiu ver, e é de lá que sai o achado 3.

## 6. Avaliação

**A aposta principal — forma na skill, teoria no modelo**

- [x] **A simulação está fisicamente certa** sem a rede: `dS/dt` negativo, `Yx/s` dividindo, μ distinto de dX/dt (a definição de μ diz "por grama de célula já presente"), e os dois clamps contra valor negativo presentes em JS **e** em Python
- [x] **Escreveu o `Simulador.registrar`** — 17 linhas, com `Pmax` acrescentado ao que o template trazia
- [x] **O `deriv` em JS é a mesma equação do Python**, clamps incluídos. Conferido linha a linha por mim, e por número por ele: três implementações independentes (Python, `simulador.js`, `mu.js`) devolvem 11,00 / 37,78 / 90,00
- [x] **Não abriu o `simulador.js`** — nem uma linha, citando a tabela de componentes como motivo
- [x] Nenhuma teoria faltou. A seção 8 do relatório lista oito fatos que ele trouxe de si, inclusive o que "ART" e "altíssima gravidade" significam, e ele diz que a skill está **certa** em não carregá-los

**O bug do gráfico**

- [x] **Os canvas preenchem a coluna** — 826 px cada, medido no navegador
- [x] **Os dois têm a mesma largura**; o container saiu `grafico-mu sim-moldura`, o esqueleto se vestiu sozinho
- [x] Alturas de 320 e 340 px, um painel por canvas, dois canvas
- [x] **Coluna de 46 rem** — `maxWidth` de 874 px com fonte de 19 px

**Os três achados de `11ac5de`**

- [~] **Todo número citado é calculado pelo programa publicado** — extraí e rodei: o programa tem `events` e imprime `99% do etanol em t = 18.51 h`, que era exatamente o número irreproduzível do Teste 6. **Falta um**: o cruzamento de 10,5 h. Violação consciente, e ele explica o porquê — ver achado 5
- [ ] Os números só numéricos **não** vêm declarados como tais. Ele diz que não achou onde encaixar sem virar a ressalva que outra regra proíbe — ver achado 6
- [x] **Duas a quatro observações de leitura, mais uma por controle** — três de leitura e quatro de controle, à risca
- [~] **Viu a lição rodando**: serviu por HTTP com o comando da skill, contou pixels, conferiu console, alturas, passos, tema e linhas de leitura. Mas **não viu as curvas** — ver achado 3

**O que não regrediu**

- [x] Parágrafo de abertura, cinco frases, explicando inclusive o que "altíssima gravidade" quer dizer
- [x] Definição como frase completa em todos os dez símbolos
- [x] Um bloco por equação; símbolo definido só na primeira aparição; quatro MathML
- [x] Tabela de parâmetros com unidade e procedência; cinco passos com o porquê
- [x] Programa completo colapsado e **executável** — rodei; resposta atrás de botão
- [x] `data-rotulos` e o texto usando os mesmos nomes ("levedura", "ART", "etanol")
- [x] **Achado 7 do Teste 5 segue fechado**: os quatro valores citados nas observações — `S0` 222, `Pmax` 105, `Ks` 40, `mu_max` 0,10 — caem todos na grade dos sliders
- [x] Tema repintando os dois gráficos; nenhum link; nenhuma promessa de continuação

**Comportamento**

- [x] Não entrevistou · não escreveu contabilidade · não tocou na pasta da skill
- [ ] **Aninhou a pasta** — ver achado 1
- [x] Copiou só os componentes que a lição carrega · avisou onde escreveu e abriu via CLI

**Correção técnica — treze números recalculados por fora, nenhum errado**

| Lição | Conferido |
|---|---|
| ART 37,8 · etanol 90,0 · levedura 11,0 | idem, por álgebra e integração |
| Cruzamento "perto das 10,5 h, ~75 g/L" | 10,549 h a 74,95 g/L |
| 99 % do etanol em 18,51 h | 18,507 h |
| ART cai "cerca de 2,5×" mais rápido que o etanol sobe | 2,47× |
| `mu_max` = 0,10 → 89,6 g/L | 89,579 |
| μ(0) = 0,3480 · Monod 0,994 | idem |
| `S0` = 222 → ART encosta no zero | 0,0155 g/L |
| `Pmax` = 105 → ART encosta no zero | 0,74 g/L, e o teto de 105,3 aparece |

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | **Aninhou a pasta.** O workspace indicado era `Teste 7/com-skill/`, e ele criou `aula-fermentacao/` dentro e escreveu ali. O `SKILL.md` diz literalmente *"Se ele indicar uma pasta, escreva **nela** — não crie outra dentro."* É **regressão**: os Testes 5 e 6 acertaram, e o Teste 3 tinha exatamente este defeito. A regra existe e está clara, então ou ela precisa estar mais perto do ponto onde ele decide, ou o padrão `./aula-fermentacao/` está forte demais e vence a instrução do aluno | atrapalha | `SKILL.md` |
| 2 | **A curva de levedura é ilegível.** X vai de 1 a 11 g/L num eixo escalado até 281 pelo `S0` de 260 — no gráfico é uma reta rente ao fundo. Mas três observações e a resposta discutem a levedura chegando a 11,0 g/L. A figura não mostra o que o texto diz. Não é violação de nenhuma regra atual: as três curvas são g/L e cabem no mesmo eixo por unidade, mas não por **escala** | atrapalha | `LESSON-FORMAT.md` |
| 3 | **Ele não consegue ver a própria lição, e o achado 2 é a prova de que isso custa.** Fez tudo o que `11ac5de` mandou — serviu por HTTP, contou pixels, conferiu console e linhas de leitura — e mesmo assim escreve: *"não vi as curvas com os meus olhos; verifiquei-as por medição. Se elas estiverem desenhadas com alguma feiura que só a vista pega, eu não teria detectado."* Bati no mesmo artefato: captura depois de rolar volta preta. Achado 5 do Teste 6 fica **meio fechado** | atrapalha | ambiente + `SKILL.md` |
| 4 | **A cronometragem falhou de novo.** É a segunda vez em três testes que a métrica-chefe da série não é medida, e sem ela a pergunta central de `11ac5de` — escrever o `registrar` custa menos que ler o catálogo? — fica **sem resposta**. A janela de mtime também deixou de ser comparável, porque o relatório não trouxe os mtimes do scratchpad que o `T5` e o `T6` traziam | atrapalha | protocolo de teste |
| 5 | **Um número citado continua fora do programa publicado**: o cruzamento de 10,5 h. Violação consciente, e o raciocínio dele é bom — cumprir exigiria um sétimo bloco no programa, esbarrando no teto de seis passos e na regra de não explicar o que não ensina. As duas regras colidem quando a observação cita um instante que só a busca de raiz acha | cosmético | `LESSON-FORMAT.md` |
| 6 | **A regra do número numérico colide com a proibição de ressalva.** "Diga que o número é numérico, com o critério de convergência" contra "nada de ressalva que não muda o que o aluno faz". Ele não achou onde pôr `rtol=1e-9` sem virar exatamente a ressalva proibida, e não escreveu. É a terceira vez que esta regra não é cumprida — Testes 5, 6 e 7 | atrapalha | `LESSON-FORMAT.md` |
| 7 | **O contrato do `Simulador.registrar` não está escrito.** Nada diz o que acontece se um parâmetro de `padroes` não tiver entrada em `faixas`, nem se `data-controles` pode citar parâmetro ausente de `faixas`. Ele declarou `faixas` só para os dois que viram slider **e** sobrescreveu no `data-controles` — "cinto e suspensório porque eu não sabia qual dos dois valia" | cosmético | `templates/licao.html` |
| 8 | **Duplicação entre `SKILL.md` e `LESSON-FORMAT.md`** sobre onde escrever e o que copiar de `assets/`. Ele reclamou disso no Teste 6 e eu não corrigi | cosmético | `SKILL.md` |

## 8. Veredito

**Aprovado com ressalva** — tudo o que era mensurável passou, mas a pasta foi aninhada e o tempo não foi medido.

A aposta de `11ac5de` era dupla, e a metade verificável pagou inteira:

- **A skill sem domínio produz simulação certa.** Treze números recalculados por fora, nenhum errado, incluindo o cruzamento em 10,549 h e o pico que a lição arredonda. Os oito fatos de fermentação vieram do modelo, e ele diz que a skill está certa em não carregá-los. **A rede era peso morto.**
- **Tirar os modelos empacotados eliminou a última leitura de componente**: 3 passagens inteiras no `T5`, um `grep` de 140 linhas no `T6`, **zero** aqui. E comprou o que não existia antes — a garantia, agora conferível linha a linha, de que a curva na tela é a mesma equação que a lição ensina.
- **O bug de 300 px morreu**: 826 px nos dois canvas, com o esqueleto vestindo a moldura sozinho.

O que segura o veredito são duas coisas de natureza diferente. A primeira é uma regressão simples de comportamento — a pasta aninhada, com a regra escrita e clara. A segunda é mais incômoda: **a lição está certa e mesmo assim tem uma figura que não comunica**, e ninguém dentro da sessão poderia ter percebido isso. O achado 2 só existe porque um humano olhou.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| | |
