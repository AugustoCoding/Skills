# Relatório de execução — Teste 5 (com-skill)

Exercício: batelada VHG 50 m³, 260 g/L de ART, Monod com inibição linear por etanol,
72 h, em Python.

Regra deste relatório: onde não medi, escrevo **não sei**. Nenhum número abaixo é
estimativa.

---

## 1. Identificação

| Item | Valor |
|---|---|
| Modelo | `claude-opus-5` (nome: Opus 5) |
| Nível de esforço / modo de raciocínio | **não sei** — não tenho acesso a esse parâmetro |
| Modo do harness | "auto mode" ativo: instrução de sessão para fazer leitura/edição de arquivos via Bash em vez das ferramentas dedicadas |
| Skill | `lesson-generator`, invocada por `/lesson-generator` |
| Data da sessão | 2026-09-01 |

---

## 2. Tempo

### mtime dos arquivos que escrevi

| Arquivo | mtime |
|---|---|
| `com-skill/assets/lesson.css` | 2026-09-01 10:52:16 |
| `com-skill/assets/tema.js` | 2026-09-01 10:52:17 |
| `com-skill/assets/codigo.js` | 2026-09-01 10:52:17 |
| `com-skill/assets/simulador.js` | 2026-09-01 10:52:17 |
| `com-skill/assets/perfil-mu.js` | 2026-09-01 10:53:50 |
| `com-skill/batelada-vhg-inibida-por-etanol.html` | 2026-09-01 10:58:27 |

(Os quatro primeiros são cópias; o mtime é o do `cp`. O mtime do HTML é o da passagem
final de corte de prosa, não o da primeira escrita.)

Arquivos auxiliares no scratchpad (fora do workspace):

| Arquivo | mtime |
|---|---|
| `chk.py` | 10:50:01 |
| `chk2.py` | 10:50:38 |
| `chk3.py` | 10:51:46 |
| `programa.py` | 10:54:17 |
| `wc.py` | 10:56:29 |
| `trim.py` | 10:58:22 |
| `digitos.py` | 10:58:46 |

### Durações

- Tempo real de cada execução de código: **não sei.** Não instrumentei nenhuma
  execução; a ferramenta de shell não me devolve duração.
- Duração total da sessão: **não sei.** O intervalo entre o primeiro e o último mtime
  que registrei é de 10:50:01 a 10:58:46, mas isso é a janela dos arquivos, não o
  tempo de sessão — leituras e a verificação no navegador caem fora dela.
- Tokens consumidos: **não sei.**

---

## 3. O que li da skill

Na ordem, com contagem de aberturas:

| # | Arquivo | Vezes | Como |
|---|---|---|---|
| 1 | `SKILL.md` | 1 | injetado pelo harness junto com o comando, não aberto por mim |
| 2 | `LESSON-FORMAT.md` | 1 | `cat`, inteiro |
| 3 | `templates/licao.html` | 1 | `cat`, inteiro |
| 4 | `assets/simulador.js` | 3 | `sed` em três faixas: 1–200, 200–400, 400–470 (arquivo inteiro, em pedaços) |
| 5 | `assets/lesson.css` | 2 | `grep` de seletores + `sed -n 495,545p` |
| 6 | `assets/tema.js` | 2 | `head -60` + `sed -n 60,120p` (arquivo inteiro, em pedaços) |

Também rodei um `ls -R` da pasta da skill (1 vez), que listou `README.md` e
`examples/exemplo_1.md`.

**Lido e não usado:** nada. Tudo o que abri virou decisão.

**Usado sem ler:** `assets/codigo.js`. Copiei para o workspace confiando na tabela de
componentes do `LESSON-FORMAT.md`, sem abrir o arquivo. Funcionou — verifiquei depois
no navegador que ele escondeu os passos e injetou os botões de copiar.

**Não abertos:** `README.md`, `examples/exemplo_1.md`.

---

## 4. O que escrevi

```
Teste 5/
  RELATORIO-MODELO.md           (este arquivo)
  com-skill/
    batelada-vhg-inibida-por-etanol.html    14.139 B   ← escrito por mim
    assets/
      perfil-mu.js                           9.482 B   ← escrito por mim (componente novo)
      simulador.js                          16.854 B   ← cópia da skill
      lesson.css                            14.797 B   ← cópia da skill
      codigo.js                              4.276 B   ← cópia da skill
      tema.js                                2.782 B   ← cópia da skill
```

**Escrevi fora de `com-skill/`?** Sim, em dois lugares:

1. O scratchpad da sessão
   (`…\Temp\claude\…\ce55a811-…\scratchpad\`): 7 arquivos `.py`, listados na
   seção 2, somando 15.105 B. São scripts de verificação e de edição — nenhum é
   entregável e nenhum é referenciado pela lição.
2. Este relatório, em `Teste 5/RELATORIO-MODELO.md`, a pedido.

**Escrevi dentro da pasta da skill?** Não. Conferi por listagem: o mtime mais recente
lá é 2026-09-01 10:34:23 (`simulador.js`, `LESSON-FORMAT.md`, `templates/licao.html`),
anterior à minha primeira escrita (10:52). Nenhum arquivo novo, nenhum modificado.

**Toquei em `com-skill/` ao escrever este relatório?** Não. Só li mtimes e tamanhos.

---

## 5. Ferramentas

Contagem reconstruída do transcrito da sessão: **37 chamadas**, antes deste relatório.

| Ferramenta | Chamadas | Para quê |
|---|---|---|
| `Bash` | 22 | leitura da skill (10), execução de Python (7), cópia de assets (1), servidor de verificação (1), listagem (1), encerrar servidor (1), 2 falhas de heredoc |
| `Write` | 5 | `perfil-mu.js`, `programa.py`, o HTML da lição, `trim.py`, `digitos.py` |
| `mcp__Claude_Browser__browser_batch` | 6 | abrir a lição, ler console, inspecionar canvas, redimensionar, capturas |
| `mcp__Claude_Browser__javascript_tool` | 2 | inspeção de pixels do canvas e teste de troca de tema |
| `mcp__Claude_Browser__tabs_create` | 1 | aba nova (a primeira estava presa a um preview estático) |
| `PowerShell` | 1 | matar o servidor e abrir o HTML no navegador do usuário |

### Execuções de código

**Python — 10 invocações:**

| Script | Vezes | Para quê |
|---|---|---|
| `chk.py` | 1 | integrar 72 h com `Radau` (rtol 1e-10) e comparar com o limite analítico; tabela de 12 instantes |
| `chk2.py` | 1 | localizar instantes por `brentq`: P = 45 / 85 / 89,1 / 89,9 g/L, e onde μ cai à metade |
| `chk3.py` | 1 | varredura de 8 cenários (S0, Yxs, X0, μmax, Pmax) para sustentar as observações dos gráficos |
| `programa.py` | 1 | rodar o programa exato que a lição publica, para confirmar que ele executa e imprime |
| `wc.py` | 2 | contar as palavras de prosa, antes e depois do corte |
| `trim.py` | 1 | aplicar 15 substituições de texto no HTML |
| `digitos.py` | 2 | varredura de todo algarismo da prosa (1ª falhou por encoding do console) |
| `http.server` | 1 | servir o workspace em 127.0.0.1:8731 para verificar a lição com os scripts ativos |

Total de integrações numéricas: **13** (1 em `chk.py`, 1 + ~5 avaliações de `brentq` em
`chk2.py`, 8 em `chk3.py`, 1 em `programa.py`) — dentro do teto de "uma dúzia de pontos
integrados" da skill.

**JavaScript no navegador — 6 execuções:** inspeção de dimensões dos canvas, textos das
linhas de leitura, contagem de controles e de passos, contagem de pixels pintados e
cores distintas, e verificação de que a troca de tema repinta o painel de μ.

---

## 6. Os números

### Procedência de cada número da lição

**Resolvidos analiticamente** (invariantes da batelada: `dP/dX = Yp/x` e
`dS/dX = −1/Yx/s` são constantes, então o fim sai sem integrar):

| Número | Como |
|---|---|
| Etanol final 90,0 g/L | = `Pmax`; o crescimento cessa exatamente aí |
| Levedura final 11,0 g/L | `X∞ = X0 + Pmax/Ypx` = 1,0 + 90/9,0 |
| ART residual 37,8 g/L | `S∞ = S0 − (X∞−X0)/Yxs` = 260 − 10,0/0,045 = 37,7778 |
| Fronteira S0 = 222 g/L | 10,0/0,045 = 222,22 — abaixo disso o ART limita antes do etanol |
| Etanol 81 g/L com S0 = 200 | ART esgota: ΔX = 200×0,045 = 9,0 → P = 9,0×9,0 |
| 167 e 93 g/L com Yxs = 0,060 | 10,0/0,060 = 166,7 consumido; 260 − 166,7 = 93,3 |
| μ inicial 0,348 1/h | 0,35 × 260/(1,5+260) = 0,34799 |
| 0,994 e 0,963 (fração de Monod) | 260/261,5 e 260/270 |

**Aritmética minha, a partir de dados do enunciado:**

| Número | Como |
|---|---|
| 22 g de ART por g de levedura | 1/0,045 = 22,2 |
| 85,5 % de conversão | (260 − 37,78)/260 |
| 4.500 kg de etanol na dorna | 90,0 g/L × 50.000 L ÷ 1000 |

**Obtidos por integração** (não têm forma fechada; `Radau`, rtol 1e-10, atol 1e-12):

| Número | Como |
|---|---|
| 18,5 h para o etanol passar de 99 % do teto | evento do `solve_ivp`, interpolado |
| 6,5 h para μ cair à metade | `brentq` sobre a solução densa (6,48) |
| 2,6 h para μ cair à metade com X0 = 5,0 | mesmo método (2,65) |
| μ < 10⁻³ 1/h a partir de 24 h | μ(24 h) = 4,4×10⁻⁴ |
| μ final 8×10⁻¹² 1/h | saída do programa |
| "por volta da 20ª hora" | leitura da curva: P = 89,1 g/L em 18,5 h e 89,9 g/L em 24,5 h |
| Teto de Monod ~0,34 1/h o processo inteiro | varia de 0,3480 a 0,3366 entre t = 0 e t = 72 h |

**Concordância analítico × integração:** o programa imprime, lado a lado,
`X = 11,00 / S = 37,78 / P = 90,00` pela integração e os mesmos três valores pela
álgebra. Bateram em 10 dígitos (integração: 10,999999999748603 e 37,77777778336417).
O RK4 em JavaScript do `perfil-mu.js` e o do `simulador.js` devolveram os mesmos
11,00 / 37,78 / 90,00 na página.

### Escolhas minhas

| Escolha | Valor | Declarada na lição? |
|---|---|---|
| `P0` | 0 g/L | **Sim** — linha da tabela de parâmetros, com a justificativa ("mosto novo, inóculo sem etanol de arraste") |
| Janela do painel de μ | 24 h em vez de 72 h | **Sim** — na própria observação, com o motivo (μ abaixo de 10⁻³ 1/h dali em diante) |
| Método e tolerâncias (`Radau`, 1e-10 / 1e-12) | — | **Sim, mas só como código e explicação de passo**, não na tabela de parâmetros |
| `t_eval` com 721 pontos | — | Não declarada; aparece no código |
| Faixas dos sliders (S0 150–320, Yxs 0,02–0,09, X0 0,5–8, Ks 0,5–10) | — | **Não declaradas.** São escolhas minhas em `data-controles` e não aparecem na tabela de procedência. Ver seção 8 |
| Limiar do evento (99 % de `Pmax`) | — | Aparece como comentário no código, não na tabela |

Os 90 g/L de `Pmax` estão marcados como enunciado, e é o que são: o enunciado diz que o
crescimento cessa quando o etanol chega a 90 g/L. Nenhum número da lição veio de
literatura — não citei nenhuma.

### Contagem de palavras

**1.012 palavras de prosa visível.**

Como contei (script `wc.py`, rodado sobre o HTML final):

1. removi por regex os blocos `<pre>`, `<script>`, `<math>` e `<style>` inteiros;
2. removi os comentários HTML;
3. removi todas as tags restantes e as entidades `&…;`;
4. dividi o que sobrou por espaço em branco e contei os pedaços não vazios.

Isso deixa dentro da conta, como manda o formato: títulos, parágrafos, itens de lista,
células da tabela, rótulos e o conteúdo dos `<details>` (programa completo excluído por
estar em `<pre>`, mas o texto da resposta contado). Fica fora: código, MathML, scripts.

Antes do corte eram **1.126**. Apliquei 15 substituições e caí para 1.012 — ainda
**12 palavras acima do teto de 1.000**, que o formato chama de maleável. Não fiz uma
terceira passagem.

---

## 7. Decisões

### Seção de código: 5 passos

O teto é 6. Usei 5 porque o programa tem exatamente cinco blocos lógicos e nenhum deles
comporta ser cortado ao meio:

1. **Parâmetros e estado inicial** — o vetor de estado e a ordem que tudo depois respeita.
2. **A taxa específica, isolada numa função** — separada de propósito, porque ela é
   plotada depois e porque é onde moram os dois `max` que impedem μ negativo.
3. **A função de derivadas** — assinatura `(t, y)` e a taxa volumétrica calculada uma vez.
4. **Integrar, com evento** — escolha de `Radau`, papel do `t_eval`, e por que o evento
   é melhor que ler o instante no gráfico.
5. **Ler as respostas** — inclui a conferência contra a álgebra.

Não fiz passo de import nem de gráfico: o primeiro seria o "passo que explica o óbvio"
que a skill lista como modo de falha, e o traçado do matplotlib não carrega decisão
nenhuma que a lição precise defender.

### Controles dos gráficos: 2 + 2

Painel de concentrações (`simulador.js`, modelo `inibicao_produto`, 72 h):

- **`S0`** (150–320, passo 5) — porque é o slider que mostra a limitação trocando de
  lado em 222 g/L. Faixa alargada de propósito: o padrão do componente vai só até
  250 g/L e não alcançaria os 260 do enunciado.
- **`Yxs`** (0,02–0,09, passo 0,001) — porque separa "quanto etanol sai" (não muda) de
  "quanto açúcar é gasto para chegar lá" (muda muito). O passo do padrão, 0,01, é grosso
  demais numa faixa que vale 0,07 inteira.

Painel de μ (`perfil-mu.js`, 24 h):

- **`X0`** (0,5–8) — separa *quando* do *quanto*: μ desaba muito antes, o etanol final
  não se move.
- **`Ks`** (0,5–10) — porque `Ks` é o parâmetro mais mal lido do domínio, e aqui ele
  quase não faz nada: em mosto VHG a fração de Monod cai só de 0,994 para 0,963 quando
  `Ks` sobe quase sete vezes.

Cada um dos quatro tem uma observação que manda mexer nele, com o que procurar. Descartei
um slider de `μmax`: a observação que eu escreveria para ele ("muda quando, não quanto")
era a mesma de `X0`, e o formato manda fundir ou cortar insight repetido.

### μ em 1/h e concentrações em g/L

O exercício faz três perguntas: etanol final, ART residual, e como μ se comporta. As duas
primeiras são g/L; a terceira é 1/h. Num eixo que vai a 260 g/L, μ seria uma linha colada
no zero.

A regra do formato — "um gráfico, um painel", e "se duas grandezas não cabem no mesmo
eixo, escolha a que responde a pergunta" — eu li como proibição de **empilhar painéis
dentro do mesmo canvas**, não como proibição de um segundo widget. E o formato também diz,
com todas as letras, que a figura central do exercício não fica de fora porque a peça não
existia. Como μ é um terço do que foi perguntado, deixá-lo como número no texto seria a
"figura que ficou de fora".

Então escrevi `assets/perfil-mu.js` (9.482 B), no workspace, não na skill: um painel só,
340 px de altura, eixo em 1/h, com **duas curvas na mesma unidade** —

- μ da levedura (o que ela faz), e
- teto de Monod, `μmax·S/(Ks+S)` (o que ela faria sem etanol).

A distância entre as duas *é* a inibição, e é isso que responde a pergunta: o teto fica
preso em 0,34 1/h o processo inteiro enquanto μ desaba. Reaproveitei as classes CSS que
já existem (`.sim-legenda`, `.sim-controles`, `.sim-leitura`, `.l-x`, `.l-s`) e injetei
só duas regras novas para a moldura. Como o `tema.js` não conhece o componente, ele
observa `data-tema` no `<html>` por `MutationObserver` e se repinta — verificado: as
cores do canvas mudam na troca de tema.

No programa Python usei `plt.subplots(2, 1)` pelo mesmo motivo, com os dois eixos
compartilhando o tempo.

### Verificação da página

Como as capturas de tela voltaram todas pretas neste ambiente, verifiquei por inspeção
direta do DOM e do canvas, servindo o workspace por HTTP: zero erros de console, os dois
canvas com 740 px de largura e 320 / 340 px de altura, 19.779 e 17.905 pixels pintados,
4 sliders, 5 passos com só o primeiro visível, botão de tema presente, e as linhas de
leitura conferindo com o Python.

---

## 8. Atrito

### Onde gastei mais esforço

1. **Ler o `simulador.js` inteiro (3 leituras, ~470 linhas).** Foi o maior custo de
   contexto da sessão. Precisei dele não para *usar* o componente — a tabela de
   componentes bastaria — mas para **escrever um componente novo no mesmo estilo**:
   convenções de canvas, DPR, de onde saem as cores, como os sliders são montados, como
   o tema repinta. Nada disso está documentado fora do código.
2. **Cortar prosa.** O teto de 1.000 palavras custou uma rodada inteira de edição
   (contar → 1.126 → escrever 15 substituições → recontar → 1.012).
3. **Duas falhas de heredoc no Bash.** A instrução de "auto mode" empurra para fazer
   edição de arquivo por Bash; o heredoc quebrou duas vezes com conteúdo acentuado e
   caí de volta na ferramenta `Write`. Custou dois turnos.

### O que ficou ambíguo ou contraditório na skill

- **"Um gráfico, um painel" contra um exercício de três perguntas em duas unidades.**
  A regra fala de painéis empilhados num canvas, mas a frase seguinte — "escolha a que
  responde a pergunta do exercício, a outra vira número no texto" — sugere que só uma
  figura é permitida. Ao mesmo tempo, a seção "Quando o gráfico certo não é contra o
  tempo" manda escrever o componente que faltar em vez de deixar a figura de fora. As
  duas orientações apontam para lados opostos quando o exercício pergunta duas coisas em
  unidades diferentes. Resolvi por dois widgets; outro leitor da mesma skill poderia
  resolver por um só e ficar igualmente dentro das regras.
- **"Leia esta tabela em vez de abrir o código dos componentes" contra "escreva o
  componente com o mesmo cuidado dos que já estão lá".** Não dá para imitar o cuidado de
  arquivos que a skill pede para não abrir. Abri.
- **A caixa de procedência não cobre número derivado.** O formato oferece duas caixas —
  "dado do enunciado" e "escolha sua" — e diz que não há terceira. Mas 22 g de ART por
  grama de levedura, 85,5 % de conversão e 4.500 kg não são nenhuma das duas: são
  aritmética determinada pelo enunciado. Tratei-os como consequência do enunciado, sem
  marca, porque marcá-los como "escolha minha" seria falso.

### Regras que não consegui cumprir

- **Teto de prosa:** 1.012 palavras, 12 acima de 1.000. O formato chama o teto de
  maleável, mas o número está acima.
- **Varredura de procedência incompleta:** as **faixas dos sliders** (`S0:150:320:5`,
  `Yxs:0.02:0.09:0.001`, `X0:0.5:8:0.5`, `Ks:0.5:10:0.5`) são escolhas minhas e não
  estão declaradas em lugar nenhum da lição. A skill manda passar por *todo* número do
  arquivo, incluindo `data-params` — e eu passei, e conferi todos os valores; mas tratei
  as faixas como configuração de widget, não como número. São 12 números meus sem
  procedência declarada.
- **Números só numéricos não rotulados como tais:** 18,5 h, 6,5 h e 2,6 h saíram de
  integração e não têm forma fechada. A lição diz que a álgebra confere os valores finais,
  mas não avisa que *esses três* são numéricos.

### O que eu cortaria da skill

- **Um contrato mínimo de componente**, para não ter de ler o `simulador.js` inteiro.
  Meia página com o esqueleto de desenho (margens, DPR, de onde vêm `--cor-x` e
  `--rule`, como montar um slider, como repintar na troca de tema) devolveria as três
  leituras do componente. É o corte de maior efeito da lista.
- **`README.md` e `examples/exemplo_1.md`**: não abri nenhum dos dois e a lição saiu
  completa. Se existem para o modelo, não estão sendo alcançados; se existem para o
  humano, não custam nada — mas vale saber qual dos dois é.
- **A seção de procedência**, hoje com três parágrafos e duas tabelas, cabe em duas
  regras: (a) todo número ou é do enunciado ou é escolha declarada; (b) faça a varredura
  por algarismo, não por leitura. O resto é justificativa de por que a regra existe — que
  convence na primeira leitura e depois é peso morto em toda sessão seguinte.
- **A lista de "erros do domínio" no `SKILL.md`** é boa e barata, mas metade dela é sobre
  quimiostato e volume variável. Num exercício de batelada, dois terços dos itens não se
  aplicam. Separá-la por regime a deixaria mais rápida de usar.

O que eu **não** cortaria: a exigência de resolver analiticamente antes de integrar. Foi
ela que deu o resultado central desta lição — que o fim da batelada é
`X0 + Pmax/Ypx` e sai sem integrar nada — e é dela que veio a confiança para publicar
90,0 e 37,8 g/L como números cravados em vez de "aproximadamente".
