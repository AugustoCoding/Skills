# Teste 4 — a repetição controlada

Mesmo enunciado do Teste 3, skill corrigida. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 4 |
| Data | 2026-08-31 |
| Quem rodou | Augusto |
| Foco | As correções do Teste 3 pegaram? Especificamente: o tempo cai abaixo de 5 minutos, a figura da varredura entra na lição, e a lição fica perto de 1.000 palavras? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit | `bd01aac` — "Corrigir os cinco achados do Teste 3 e destravar o modelo" |
| Branch | `main` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/simulacao-fermentacao` → `Simulação-Fermentação/Skill Simulação Fermentação/` |
| Nome da pasta instalada | `simulacao-fermentacao` |

**A comparação é com o Teste 3** (`58f0ea0`), que rodou este mesmo enunciado. O que mudou entre as duas versões:

- conferência **analítica primeiro**, integração confirmando, com teto de esforço explícito;
- permissão — e ordem — de **escrever componente novo** quando o exercício pede figura que as peças não fazem;
- "**conte as palavras** antes de salvar";
- fim da contradição sobre citar fonte, e procedência explicitando faixas, ordens de grandeza e condições iniciais;
- deduplicação entre `SKILL.md` e `LESSON-FORMAT.md`.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code (versão não registrada) |
| Modelo | Opus 5 — `claude-opus-5` (confirmado pelo próprio modelo) |
| Modo | Esforço médio; "auto mode" ativo (trabalho pelo Bash sempre que possível) |
| Acesso à web | Não usado: nenhuma busca aparece no relatório |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Opus 5, esforço médio** — o mesmo dos três anteriores. Trocar o modelo aqui destruiria a comparação, que é o motivo de este teste existir.

## 4. Entrada

### Cronômetro

| | Horário |
|---|---|
| Prompt enviado | |
| Lição aberta | |
| **Duração** | |

Referência: **8 minutos** no Teste 3, com o mesmo enunciado.

### O estado inicial do workspace

`Teste 4/com-skill/` começa **vazio**, como manda o protocolo.

### Prompt exato (turno 1)

```text
/simulacao-fermentacao

O workspace desta sessão é "Simulação-Fermentação/Testes Skill Simulação Fermentação/Teste 4/com-skill/". Escreva ali tudo o que você gerar.

Tenho um exercício:

Uma dorna contínua de 10 m³ opera em regime permanente, alimentada com mosto a 100 g/L de ART. A vazão de alimentação é ajustável.

A levedura segue Monod, com μmax = 0,30 h⁻¹, Ks = 1,0 g/L, Yx/s = 0,05 gX/gART e Yp/x = 8,0 gP/gX.

Quero um programa em Python que varra a taxa de diluição e me diga qual D dá a maior produtividade de etanol, e o que acontece se eu passar disso.
```

**Um turno só.** Não faça o papel do aluno depois; o teste avalia a produção da lição e encerra.

### Relatório de execução

Quando ele terminar, mande este segundo prompt:

```text
A sessão acabou. Preciso de um relatório de execução para documentar este teste.

Escreva em "Simulação-Fermentação/Testes Skill Simulação Fermentação/Teste 4/RELATORIO-MODELO.md" — fora da pasta com-skill/, que não deve ser tocada.

REGRA ACIMA DE TUDO: não estime, não arredonde, não deduza. Onde você não souber o número, escreva "não sei". Um "não sei" é útil; um número inventado contamina o registro.

1. IDENTIFICAÇÃO — seu identificador de modelo exato; modo/esforço se souber.

2. TEMPO — mtime dos arquivos que você escreveu, e o tempo real de cada execução de código que você mediu. Se não tiver medição de duração total nem de tokens, escreva "não sei".

3. O QUE VOCÊ LEU — arquivos da skill abertos, na ordem, e quantas vezes. Algum lido e não usado?

4. O QUE VOCÊ ESCREVEU — árvore com tamanhos. Escreveu fora de com-skill/? Dentro da pasta da skill?

5. FERRAMENTAS — quantas chamadas, por tipo. Quantas vezes rodou código, e para quê.

6. OS NÚMEROS — como obteve cada número da lição: analítico, integração, ou aritmética sua. Quais escolhas suas entraram, e se estão declaradas.

7. DECISÕES — quantos passos na seção de código e por quê; quais controles no gráfico e por quê; escreveu algum componente novo, e o que o levou a isso.

8. ATRITO — onde gastou mais esforço; o que na skill ficou ambíguo ou contraditório; alguma regra que não conseguiu cumprir; e o que você cortaria da skill para ela ficar mais rápida sem perder o que importa.

Não altere nada em com-skill/ ao escrever este relatório.
```

## 5. Saída

Onde o modelo escreveu: `Teste 4/com-skill/` — **na pasta indicada**, sem aninhar.

```text
com-skill/
  quimiostato-produtividade-maxima.html   13 849 B
  assets/
    varredura.js    10 987 B   ← escrito por ele
    simulador.js    15 830 B   ← cópia, nunca carregada pela lição
    lesson.css · codigo.js · tema.js      cópias
```

| Medida | Teste 3 | **Teste 4** | Alvo |
|---|---|---|---|
| Duração | 8 min | **~6 min** (estimada) | < 5 min |
| Palavras de prosa | 1.024 | **1.036** | ~1.000 |
| Palavras na tela (com código) | 1.541 | 1.700 | — |
| Teoria | 266 | 288 | a menor |
| Código | 933 | 1.141 | a maior |
| Análise crítica | 294 | 226 | |
| Passos de código | 5 | 5 | ≤ 6 |
| Controles no gráfico | 3 | 2 | ≤ 4 |
| Execuções de código | 8 | 11 | menos peso, não menos número |
| Componente novo | não (proibido) | **`varredura.js`** | sim, se a figura pedir |

As 11 execuções contra 8 não são piora: no Teste 3 havia um timeout de 120 s e duas de ~40 s; aqui todas são baratas, porque os números saem de fórmula fechada. O peso migrou para escrever o componente — que ele chama de metade da sessão.

O [relatório do próprio modelo](./RELATORIO-MODELO.md) traz a procedência de cada número e o inventário de leituras e chamadas.

## 6. Avaliação

**As três perguntas deste teste**

- [~] **Menos de 5 minutos?** Não: ~6, contra 8 no Teste 3 e 15+ no Teste 2
- [x] **A figura da varredura está na lição** — ele escreveu o componente citando a regra nova como motivo
- [x] **Perto de 1.000 palavras** — 1.036 de prosa, e desta vez ele contou: 1.047, cortou, recontou 1.030

**Não repetiu o que o Teste 3 confessou**

- [x] Escreveu na pasta indicada, sem aninhar
- [ ] Nenhum número ilustrativo sem lastro — **repetiu**, em outro formato (ver achado 1)
- [ ] Todo slider com observação própria — `Sin` de novo sem frase que o convoque

**O que já estava certo e continuou**

- [x] Três divisões, código como maior parte
- [x] Cinco passos, cada um com o porquê da decisão
- [x] Programa completo executável, colapsado, com botão de copiar
- [x] Quatro equações em MathML
- [x] Observações ancoradas neste caso, nenhuma genérica
- [x] Nenhum arquivo de contabilidade, nenhuma citação de literatura
- [x] D ótimo 0,2701 · Pr 9,828 · D crítico 0,2970, conferidos em Python **e** de novo em JavaScript dentro do componente

**Correção técnica**

- [x] Analítico primeiro, integração confirmando — e a divergência em D = 0,2970 (0,70 integrado contra 0,12 analítico) virou o passo 4 da lição
- [x] Escolhas de PVI, método e tolerância declaradas na tabela
- [ ] Faixa dos controles não declarada como escolha dele

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | **A varredura de procedência falhou pelo mesmo buraco do Teste 3**: número dentro de frase de prosa. Ele escreveu que a malha grosseira faria a produtividade cair "de 9,8 para 8,2" — a diferença real é de 10⁻⁴. E chamou de "10⁻⁴ do crítico" uma distância que é 3×10⁻⁵. Tabela e `data-params` impecáveis; a prosa, não | atrapalha | `LESSON-FORMAT.md` |
| 2 | **"Palavra visível" não tinha régua** — ele contou 1.030 (prosa), eu contei 1.700 (com código). A mesma lição, dois vereditos | atrapalha | `LESSON-FORMAT.md` |
| 3 | **Leu as ~450 linhas do `simulador.js` para descobrir que não servia** — o maior gasto de esforço da sessão, por informação que cabia em uma linha | atrapalha | `assets/simulador.js` |
| 4 | **Cópia cega de assets**: copiou o `simulador.js`, que nenhuma lição carrega | cosmético | `SKILL.md` |
| 5 | **"Pelo menos uma observação manda mexer" era ambíguo** — por controle ou no conjunto? Ele embarcou `Sin` sabendo que a observação era fraca | cosmético | `LESSON-FORMAT.md` |
| 6 | **"Uma dúzia de pontos" colidia com a varredura de 3.000** — ele deduziu certo que a dúzia fala de integrações, mas era dedução | cosmético | `SKILL.md` |
| 7 | **O gráfico ficou pior que o do Teste 3**: dois painéis empilhados de 150 px dentro de um canvas de 420, contra o painel único de 320 px do `simulador.js`. Apertado e mal formatado | atrapalha | `LESSON-FORMAT.md` |

## 8. Veredito

**Aprovado.** As três correções do Teste 3 pegaram: o componente foi escrito, a figura entrou na lição, a pasta indicada foi respeitada, e a conferência analítica rendeu duas vezes — barateou os números e transformou a divergência perto do washout em conteúdo.

O tempo ficou em ~6 minutos contra a meta de 5, mas a natureza do custo mudou: não é mais espera de integrador, é escrita de componente novo. Isso é trabalho, não desperdício.

O que sobra são acabamentos: um gráfico apertado, um número em prosa sem conferência, um slider sem observação.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `4c54a23` | **Achado 2** — o teto ganhou régua: 1.000 palavras de prosa, sem `<pre>`, `<script>` nem `<math>`; código sem teto |
| `4c54a23` | **Achado 3** — tabela de componentes com coluna "não faz", e cabeçalho novo no `simulador.js` |
| `4c54a23` | **Achado 4** — copiar só os componentes que a lição carrega |
| `4c54a23` | **Achado 5** — cada controle precisa da própria observação |
| `4c54a23` | **Achado 6** — a dúzia de pontos fala de integrações |
| `4c54a23` | **Achado 1** — varredura de procedência mecânica: procurar dígitos com `grep`, não ler |
| (este commit) | **Achado 7** — um gráfico, um painel, 320 a 420 px de altura; grandezas de unidades diferentes não viram segundo painel |
