# Exercício do Teste 7

**Origem:** o mesmo enunciado dos Testes [5](../Teste%205/EXERCICIO.md) e [6](../Teste%206/EXERCICIO.md), palavra por palavra. Não é questão de prova real de nenhuma instituição.

**Por que repetir pela terceira vez:** `ca361b9` mexeu em oito arquivos de uma vez, e a métrica-chefe continua sendo o **tempo**. Tempo só se compara com a mesma entrada. Além disso, os dois achados abertos e o bug do gráfico estão colados nesta lição, então dá para ver se sumiram no mesmo artefato.

Compare lado a lado com [`Teste 6/com-skill/batelada-vhg-inibicao-etanol.html`](../Teste%206/com-skill/batelada-vhg-inibicao-etanol.html), que é a linha de base.

## Enunciado (é este o texto colado no chat)

Uma dorna de 50 m³ fermenta mosto de altíssima gravidade, com 260 g/L de ART. O inóculo entra a 1,0 g/L de levedura, e a fermentação é anaeróbia, com temperatura controlada.

A levedura segue Monod com inibição linear pelo etanol: o crescimento cai proporcionalmente conforme o etanol sobe, e cessa quando ele chega a 90 g/L. Os parâmetros são μmax = 0,35 h⁻¹, Ks = 1,5 g/L, Yx/s = 0,045 gX/gART e Yp/x = 9,0 gP/gX.

Quero simular 72 h dessa batelada em Python, saber quanto etanol sai no final e quanto açúcar sobra — e entender como a taxa específica de crescimento se comporta ao longo do processo.

---

## O que este teste responde

### A aposta principal: a skill entrega forma, o modelo entrega teoria

`ca361b9` apagou todo conhecimento de fermentação da skill. **É a mudança de maior risco da série** — a lista de erros do domínio era a única rede contra simulação fisicamente errada, e ela não existe mais.

| Pergunta | Como saber | Linha de base |
|---|---|---|
| **A simulação continua fisicamente certa sem a rede?** Vigie como **correção técnica**, não como item de forma | `dS/dt` negativo · `Yx/s` **dividindo**, não multiplicando · μ (1/h) distinto de dX/dt (g·L⁻¹·h⁻¹) · concentração negativa tratada como artefato | Seis testes, nenhum número errado — mas a lista estava lá |
| **Ele escreveu o `Simulador.registrar` com as equações do exercício?** Não há mais modelo empacotado | O `<script>` inline na lição, e se o `deriv` dele bate com o `derivadas` do Python da mesma lição | Apontava para `data-modelo="inibicao_produto"`, escrito por outra pessoa |
| **A curva e o código concordam?** É o motivo de ter tirado os modelos | Compare a equação do `deriv` em JS com a do programa em Python, linha a linha | Não dava para saber: eram sistemas diferentes |
| **Quanto custou escrever o `registrar`?** É a aposta: ~15 linhas traduzidas do que ele já tem, contra ler catálogo | Seção 8 do relatório | — |
| **Precisou abrir o `simulador.js`?** Sem modelos, sumiu o motivo que restava | Seção 3 do relatório. **Zero é o alvo** | 3 leituras inteiras (T5) → 1 `grep` de ~140 linhas (T6) |

### O bug do gráfico

A causa era o `lesson.css` prender a regra de largura ao `.simulador`; canvas sem largura em CSS cai nos 300 px intrínsecos, e o `|| 600` nunca disparava porque 300 é truthy.

| Pergunta | Como saber | Linha de base |
|---|---|---|
| **Os gráficos preenchem a coluna?** | Meça `canvas.getBoundingClientRect().width` no navegador | T4: 300 px · T5: 600 (o modelo consertou sozinho) · T6: 600 e **300** |
| **Os dois gráficos têm a mesma largura?** Moldura desigual lê como gráfico torto | As larguras têm de ser **idênticas**; o esqueleto veste `.sim-moldura` sozinho | T6: 600 e 300, molduras diferentes |
| **A coluna voltou a 46 rem?** | `getComputedStyle(document.body).maxWidth` = 874 px, com fonte de 19 px | T6: 54 rem, 1.026 px |

### Os dois achados que `ca361b9` fechou

| Pergunta | Como saber | Linha de base |
|---|---|---|
| **Todo número citado é calculado pelo programa publicado?** | Extraia o `<details class="programa">`, rode, e confira que cada instante e cada pico citados na lição saem de lá | T6: **quatro números** (18,5 h · 12,2 h · 5,5 g/L · 89,9 g/L) não saíam — o programa não tinha evento nem busca de raiz |
| **Ele viu a lição rodando?** O `SKILL.md` agora traz o comando do servidor | Seção do relatório sobre verificação; e se ele menciona ter servido por `http://` | T6: não viu. Escreveu sem nunca ter olhado os dois gráficos |
| **A contagem de observações parou de colidir?** Agora são duas a quatro de leitura **mais** uma por controle | Conte as duas categorias separadas | T6: cortou para 2 controles para resolver a colisão sozinho |

### O que não pode regredir

Tudo isto estava certo no Teste 6 e é o que a purga pode ter derrubado por acidente:

- parágrafo de abertura de três a cinco frases;
- definição como frase completa, nunca etiqueta;
- frase de fecho montando a cena antes de concluir;
- um bloco por equação, símbolo definido só na primeira aparição;
- MathML, tabela de parâmetros com procedência, ≤ 6 passos com o porquê;
- programa completo colapsado e executável, resposta atrás de botão;
- `data-rotulos` e o texto usando os mesmos nomes;
- **o slider alcança o valor que a observação cita** (achado 7, fechado no T6).

## Armadilhas de conteúdo

As mesmas dos Testes 5 e 6, porque o enunciado é o mesmo:

- **O açúcar não acaba.** A fermentação para por inibição com **37,8 g/L de ART sobrando**. Quem escrever que o substrato se esgota errou o fenômeno central.
- **O teto de 105,3 g/L nunca é alcançado.** Se todo o ART virasse etanol, dariam 0,045 × 9,0 × 260 = 105,3 g/L.
- **O volume de 50 m³ não entra em nada** — as concentrações não dependem dele.
- **Não existe mais modelo pronto.** Ele tem de registrar o sistema. Se apontar para um `data-modelo` que não registrou, o gráfico não desenha.

## Números conferidos

Conferidos três vezes — no fechamento do Teste 5, no do Teste 6, e por uma integração `Radau` (rtol 1e-11) independente. Bateram em dez dígitos.

**Pela álgebra, sem integrar:**

- ART consumido até o etanol travar: `Pmax / (Yx/s · Yp/x)` = 90 / 0,405 = **222,2 g/L**
- **ART que sobra** = 260 − 222,2 = **37,8 g/L**
- **Levedura final** = 1,0 + 0,045 × 222,2 = **11,0 g/L**
- **Etanol final** = **90,0 g/L**, o próprio Pmax
- Conversão = **85,5 %**; etanol na dorna = **4.500 kg**

**Trajetória, por integração** (não têm forma fechada — e a lição tem de dizer isso):

| Grandeza | Valor |
|---|---|
| μ inicial | 0,3480 1/h |
| μ(6 h) · X(6 h) | 0,1915 1/h · 5,476 g/L |
| dX/dt máxima | 1,0489 g·L⁻¹·h⁻¹ em t = 6,004 h |
| μ cai à metade em | 6,48 h |
| Etanol a 99 % do teto em | 18,51 h |
| P(24 h) | 89,88 g/L |
| μ(24 h) · μ(72 h) | 4,43×10⁻⁴ · 8,5×10⁻¹² 1/h |

**Cenários das observações:**

| Cenário | Resultado |
|---|---|
| `S0` = 222,2 g/L | fronteira: abaixo disso o ART limita antes do etanol |
| `S0` = 200 g/L | ART esgota; etanol para em 81,0 g/L |
| `X0` = 4,0 g/L | 99 % em 12,19 h; etanol final continua 90,0 |
| `Yx/s` = 0,060 | consome 166,7 g/L de ART; sobram 93,3; etanol continua 90,0 |
| `Ks` de 1,5 a 10 | fração de Monod cai só de 0,9943 para 0,9618 |

## Nota para quem avalia

Os parâmetros são coerentes com fermentação alcoólica de altíssima gravidade: Yx/s baixo porque o carbono vai para o etanol, Yp/s = 0,405 gP/gART (abaixo do teto de Gay-Lussac, 0,511), e inibição cessando perto de 90 g/L. Não representam cepa documentada, e a lição não deve citá-los como se representassem.

A inibição é **linear** — μ multiplicado por (1 − P/Pmax). Agora que não há modelo empacotado, essa forma tem de aparecer **duas vezes e iguais**: no `deriv` do `registrar` em JS e no `mu()` do programa em Python. Se discordarem, o gráfico está desenhando outro exercício.
