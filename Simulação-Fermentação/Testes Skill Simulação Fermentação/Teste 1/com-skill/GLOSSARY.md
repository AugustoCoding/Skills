# Glossário — Simulação de Fermentação

A linguagem canônica deste workspace: modelagem e simulação de processos fermentativos em Python, com modelos não estruturados e não segregados.

**Um termo só entra em "Termos ativos" quando o aluno demonstra usá-lo corretamente e sem apoio.** O glossário registra conhecimento comprimido; não é um dicionário que o aluno lê para aprender. Ter sido apresentado a um conceito não basta — é preciso evidência de uso. Regras completas em [GLOSSARY-FORMAT.md](./GLOSSARY-FORMAT.md).

## Termos ativos

<!--
Vazio de propósito. Cada termo promovido entra aqui no formato:

**Termo**:
Definição em uma ou duas frases, dizendo o que o termo É.
_Evite_: sinônimos e apelidos que devem ser abandonados

Uma vez promovido, o termo é usado em toda lição, exercício e registro daqui em diante.
-->

## Convenções de símbolos

Fixadas desde o início, para que lições e código não se contradigam. Isto não é promoção de termo: é o padrão notacional que **você** obedece ao escrever.

| Símbolo | Grandeza | Unidade padrão |
|---------|----------|----------------|
| `X` | concentração de biomassa | g/L |
| `S` | concentração de substrato limitante | g/L |
| `P` | concentração de produto | g/L |
| `V` | volume de meio no reator | L |
| `t` | tempo | h |
| `μ` | taxa específica de crescimento | 1/h |
| `μmax` | taxa específica máxima de crescimento | 1/h |
| `Ks` | constante de saturação de Monod | g/L |
| `Yx/s` | rendimento de biomassa em substrato | gX/gS |
| `Yp/s` | rendimento de produto em substrato | gP/gS |
| `Yp/x` | rendimento de produto em biomassa | gP/gX |
| `D` | taxa de diluição (F/V) | 1/h |
| `F` | vazão volumétrica de alimentação | L/h |
| `Sin` | concentração de substrato na alimentação | g/L |
| `ms` | coeficiente de manutenção | gS·gX⁻¹·h⁻¹ |
| `α`, `β` | coeficientes de Luedeking–Piret | gP/gX e gP·gX⁻¹·h⁻¹ |

Ambiguidades resolvidas neste workspace:

- **"rendimento" sozinho não existe.** Sempre com os dois índices: Yx/s, Yp/s, Yp/x. É o par de índices que diz o que se converteu em quê.
- **"taxa" sem qualificação não existe.** Ou é *específica* (por unidade de biomassa, 1/h) ou é *volumétrica* (por unidade de volume, g·L⁻¹·h⁻¹). A confusão entre as duas é a concepção errônea mais comum do domínio.
- **"produtividade"** significa sempre produtividade volumétrica em produto: `D·P` no contínuo, `P(tf)/tf` na batelada, em g·L⁻¹·h⁻¹. Nunca concentração final.
- **"contínuo"** neste workspace significa quimiostato de volume constante, sem reciclo, salvo quando dito o contrário.

## Termos candidatos

Vocabulário do domínio que aparece nas lições mas **ainda não foi promovido**. Serve para você escolher o que ensinar e o que cobrar; não é lido pelo aluno como lista. Mova para "Termos ativos" — com definição escrita, de preferência pelo próprio aluno — quando houver evidência de uso correto.

- Batelada
- Batelada alimentada
- Contínuo / quimiostato
- Biomassa (X)
- Substrato limitante (S)
- Produto (P)
- Taxa específica de crescimento (μ)
- μmax
- Ks
- Yx/s
- Yp/x
- Taxa de diluição (D)
- Estado estacionário
- Washout
- Fase lag
- Fase exponencial
- Fase estacionária
- Inibição por substrato
- Inibição por produto
- Manutenção celular
- Produto associado ao crescimento
- Produto não associado ao crescimento
- Modelo não estruturado
- Sistema rígido (numérico)
- Passo adaptativo
- Produtividade volumétrica
