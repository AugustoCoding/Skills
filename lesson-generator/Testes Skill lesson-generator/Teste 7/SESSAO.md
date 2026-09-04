# Teste 7 — a skill sem domínio: forma da skill, teoria do modelo

Repetição controlada dos Testes [5](../Teste%205/SESSAO.md) e [6](../Teste%206/SESSAO.md), com o mesmo enunciado. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 7 |
| Data | {AAAA-MM-DD} |
| Quem rodou | Augusto |
| Foco | A skill entrega só **forma** e o modelo entrega a **teoria**: a simulação continua fisicamente certa sem a rede de erros do domínio? E escrever o próprio `registrar` custa menos que ler o catálogo? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `ca361b9` — Tirar o dominio da skill e consertar o grafico de 300px |
| HEAD do dia | `{preencher}` — se houver commit depois de `ca361b9`, diga se ele tocou a skill |
| Branch | `main` |
| Alterações locais não commitadas | {não / sim — quais} |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |
| Nome da pasta instalada | `lesson-generator` |

O que mudou desde o Teste 6 (`12da50f`), tudo em `ca361b9` e **nada exercitado ainda**.

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
| Cliente | {Claude Code — desktop / CLI / web, e versão se souber} |
| Modelo | {id exato, ex: `claude-opus-5`} |
| Modo | {padrão / fast; e se "auto mode" está ativo} |
| Acesso à web | {sim / não} |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Opus 5, esforço médio**, como nos seis anteriores.

## 4. Entrada

### Cronômetro

Marque a hora ao apertar enter e a hora em que a última linha aparecer, e anote as duas **antes** de começar a avaliar.

| | Horário |
|---|---|
| Prompt enviado | |
| Lição aberta | |
| **Duração** | |

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

Onde o modelo escreveu: `Teste 7/com-skill/`

```text
{cole a árvore}
```

Contagem pela convenção da série: MathML **conta** como prosa; `<pre>`, `<script>` e `<style>` ficam fora.

| Medida | Teste 5 | Teste 6 | **Teste 7** | O que se espera |
|---|---|---|---|---|
| Duração | > 10 min | 6 a 8 min | | **< 6 min** |
| Palavras de prosa | 1.061 | 1.991 | | ~2.000, sem encolher |
| Abertura | 44 | 177 | | 3 a 5 frases |
| Teoria | 334 | 794 | | |
| Código (com código) | 865 | 1.265 | | a maior |
| Análise crítica | 334 | 346 | | |
| Chamadas de ferramenta | 37 | 23 | | ≤ 23 |
| Execuções de código | 10 | 9 | | |
| Leituras do `simulador.js` | 3 inteiras | 1 `grep`, ~140 linhas | | **0** |
| Linhas do `registrar` | — | não existia | | ~15 |
| Largura dos canvas (px) | 600 · 600 | 600 · **300** | | **iguais, preenchendo a coluna** |
| Passos de código | 5 | 6 | | ≤ 6 |
| Controles | 4 | 2 | | ≤ 4 |

## 6. Avaliação

**A aposta principal — forma na skill, teoria no modelo**

- [ ] **A simulação está fisicamente certa** sem a rede: `dS/dt` negativo, `Yx/s` dividindo, μ distinto de dX/dt, concentração negativa tratada como artefato
- [ ] **Escreveu o `Simulador.registrar`** com as equações do exercício
- [ ] **O `deriv` em JS é a mesma equação do Python** — compare linha a linha; era impossível conferir isso antes
- [ ] **Não abriu o `simulador.js`** — sem modelos empacotados, sumiu o motivo que restava
- [ ] Nenhuma teoria de fermentação faltou a ponto de ele pedir, errar ou inventar

**O bug do gráfico**

- [ ] **Os canvas preenchem a coluna** — meça no navegador
- [ ] **Os dois têm a mesma largura**; o esqueleto vestiu `.sim-moldura` sozinho
- [ ] Altura entre 320 e 420 px, um painel por canvas, no máximo dois canvas
- [ ] **Coluna de 46 rem** — `maxWidth` de 874 px com fonte de 19 px

**Os três achados fechados por `ca361b9`**

- [ ] **Todo número citado é calculado pelo programa publicado** — extraia e rode
- [ ] Os números que só existem por integração vêm **declarados como numéricos**
- [ ] **Duas a quatro observações de leitura, mais uma por controle** — as duas contagens separadas
- [ ] **Ele viu a lição rodando**, servida por `http://`, e diz isso no relatório

**O que não pode ter regredido**

- [ ] Parágrafo de abertura de 3 a 5 frases, antes do primeiro `<h2>`
- [ ] Definição como frase completa, nunca etiqueta
- [ ] Frase de fecho montando a cena antes de concluir, 2 a 4 frases
- [ ] Um bloco por equação; símbolo definido só na primeira aparição
- [ ] Equações em MathML; tabela de parâmetros com unidade e procedência
- [ ] ≤ 6 passos, cada um com o porquê; programa completo colapsado e executável
- [ ] Resposta atrás de um botão; botão de copiar em cada bloco
- [ ] `data-rotulos` e o texto usando os mesmos nomes da legenda
- [ ] **O slider alcança o valor que a observação cita** (achado 7)
- [ ] Botão de tema repintando **os dois** gráficos; nenhum link; nenhuma promessa de continuação

**Comportamento**

- [ ] Não entrevistou · escreveu na pasta indicada, sem aninhar
- [ ] Copiou só os componentes que a lição carrega
- [ ] Não escreveu contabilidade · não tocou na pasta da skill
- [ ] Avisou onde escreveu e abriu o arquivo via CLI · falou pouco no chat

**Correção técnica** — números em [EXERCICIO.md](./EXERCICIO.md), conferidos três vezes

- [ ] ART 37,8 · etanol 90,0 · levedura 11,0 g/L
- [ ] Chegou por **álgebra**, com a integração confirmando
- [ ] Inibição **linear**, e igual nos dois lugares — JS e Python
- [ ] Nenhum número sem procedência, inclusive os embutidos em prosa

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
