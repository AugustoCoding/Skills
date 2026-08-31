# Teste 3 — a skill enxuta, cronometrada

Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 3 |
| Data | {AAAA-MM-DD} |
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
| Cliente | {Claude Code CLI / desktop / web — e versão} |
| Modelo | {id exato} |
| Modo | {padrão / fast / esforço} |
| Acesso à web | {sim / não} |
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

| # | O que o "aluno" diz | O que essa fala testa |
|---|---|---|
| 2 | `Por que você integrou até o estacionário em vez de resolver a equação direto?` | A nota de dúvida: resposta no chat **e** enxerto no ponto exato do HTML, com reabertura do arquivo — a única memória que a skill tem agora |
| 3 | `Agora me ensina batelada alimentada.` | A saída de escopo: sem exercício, o modelo deve dizer em uma linha que a skill precisa de um enunciado e responder normalmente, **sem produzir lição nem pasta** |

## 5. Saída

Onde o modelo escreveu: `Teste 3/com-skill/`

```text
{cole a árvore — deve ter só o HTML e a cópia de assets/}
```

| Medida | Valor | Alvo |
|---|---|---|
| Palavras visíveis na lição | | ~1.000 |
| Palavras da divisão de teoria | | a menor das três |
| Palavras do código + análise crítica | | a maior parte |
| Passos de código | | no máximo 6 |
| Controles no simulador | | no máximo 4 |

## 6. Avaliação

**Tempo e tamanho**

- [ ] Menos de 5 minutos do prompt à lição aberta
- [ ] Lição perto de 1.000 palavras visíveis
- [ ] Código + análise crítica pesam mais que a teoria

**Comportamento**

- [ ] Não entrevistou
- [ ] Escreveu **só** o HTML e a cópia de `assets/` — nenhum arquivo de estado, nenhum índice, nenhum registro
- [ ] Rodou o código antes de publicar os números
- [ ] Avisou onde escreveu, em uma linha, e abriu o arquivo via CLI
- [ ] Falou pouco no chat
- [ ] **Turno 3**: recusou a lição em uma linha e respondeu normalmente, sem criar arquivo

**Divisão 1 — teoria**

- [ ] Equações em MathML, não em texto cru
- [ ] Tabela de parâmetros com símbolo, valor, unidade e procedência
- [ ] Breve, sem derivação nem história

**Divisão 2 — código**

- [ ] Passos revelados um a um, no máximo seis
- [ ] Cada passo com título, trecho e o **porquê** da decisão
- [ ] Programa completo colapsado no fim, com botão de copiar funcionando
- [ ] Resposta numérica atrás de um botão
- [ ] Usou o `quimiostato` que já existe, sem escrever modelo novo

**Divisão 3 — análise crítica**

- [ ] Simulador com no máximo quatro controles, curva respondendo na hora ao slider
- [ ] Duas a quatro observações ancoradas nas curvas **deste** caso
- [ ] Pelo menos uma manda mexer num controle e diz o que procurar
- [ ] **Nenhuma frase genérica** — nada de "o modelo ignora inibição", nada de lista de hipóteses
- [ ] Pegou que **o ótimo fica a 9% do washout** (0,270 contra 0,297)? É a observação mais forte disponível

**Correção técnica**

- [ ] D ótimo ≈ 0,270 1/h, com produtividade ≈ 9,8 g·L⁻¹·h⁻¹
- [ ] D crítico ≈ 0,297 1/h
- [ ] Distinguiu **concentração** de **produtividade** — o etanol é mais concentrado justamente onde a produtividade é pior
- [ ] **Nenhuma suposição na lição**: o enunciado dá tudo, então nenhum número novo deveria aparecer
- [ ] O volume de 10 m³ não entrou no código como se importasse
- [ ] Nenhuma citação de literatura

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
