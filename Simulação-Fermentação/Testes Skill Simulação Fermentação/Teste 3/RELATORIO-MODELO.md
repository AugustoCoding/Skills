# Relatório de execução — Teste 3, `com-skill`

Skill: `simulacao-fermentacao`. Exercício: quimiostato de 10 m³, varredura de D para máxima produtividade de etanol.

---

## 1. Identificação

- **Modelo:** `claude-opus-5` (nome exibido: Opus 5).
- **Modo/esforço:** não sei. Não tenho como inspecionar se "fast mode" estava ligado nem qual nível de esforço de raciocínio foi aplicado.

---

## 2. Tempo e tokens

Não executei nenhum comando dedicado a registrar horário (`date`, etc.). Mas os arquivos que escrevi têm mtime, e esses são horários brutos reais:

| Horário (mtime) | Evento |
|---|---|
| 2026-08-30 22:37 | `quimiostato.py` gravado no scratchpad (chamada nº 4) |
| 2026-08-30 22:38 | `q2.py`, `q3.py`, `varredura.png` |
| 2026-08-30 22:39 | `q4.py`, `sweep.npy` |
| 2026-08-30 22:40:05.8 | pasta `aula-fermentacao/` criada; `assets/` copiado |
| 2026-08-30 22:40 | `final.py` gravado |
| 2026-08-30 22:42 | `q5.py` |
| 2026-08-30 22:43:54.97 | `quimiostato-produtividade-etanol.html` gravado |

Isso dá **6 min 55 s medidos** entre a primeira gravação de código (22:37) e a gravação da lição (22:43:55). As três primeiras chamadas (leitura da skill, checagem do ambiente) são anteriores a 22:37 e **não têm marca de tempo — a duração total da sessão eu não sei**.

Durações de comando medidas com `time` (reais, do próprio shell):

- `quimiostato.py` 1ª versão: **abortado no timeout de 120 s**, sem saída.
- `quimiostato.py` após ajuste: `real 0m40.221s`
- `q2.py`: `real 0m2.442s`
- `q3.py` (varredura completa, 316 pontos): `real 0m44.023s`

**Tokens:** não sei. Não tenho medição.

---

## 3. O que eu li

Arquivos da skill abertos, em ordem:

| # | Arquivo | Vezes | Como |
|---|---|---|---|
| 1 | `SKILL.md` | 1 | veio injetado pelo comando `/simulacao-fermentacao`, não por leitura minha |
| 2 | `LESSON-FORMAT.md` | 1 | `cat`, integral |
| 3 | `templates/licao.html` | 1 | `cat`, integral |
| 4 | `assets/simulador.js` | 2 | `head -80` e depois `sed -n '80,200p'` — duas leituras parciais, ~200 das 15 684 bytes iniciais do arquivo |

Também rodei `ls -R` na pasta da skill, o que me mostrou que existem `README.md` e `examples/exemplo_1.md`. **Não abri nenhum dos dois.**

Ressalva de ordem: tenho certeza do conjunto de chamadas e da sequência geral, mas a posição relativa exata entre a segunda leitura de `simulador.js` e a criação da pasta `aula-fermentacao/` (chamadas adjacentes) eu não garanto.

**Li algo e não usei?** Parcialmente. A segunda leitura de `simulador.js` (linhas 80–200) trouxe os modelos `batelada_alimentada` e `inibicao_produto`, que **não usei para nada**. O que dessa leitura foi útil foi o integrador: descobri que o simulador do navegador é RK4 de passo fixo com 5 passos por amostra e 400 amostras, o que me deu segurança para pôr `data-tempo="300"` (dt = 0,15 h) sem instabilidade. O `head -80` foi usado para copiar os nomes exatos de parâmetro do modelo `quimiostato`.

---

## 4. O que eu escrevi

```
Teste 3/
└── com-skill/
    └── aula-fermentacao/                                  [criada]
        ├── assets/                                        [criada]
        │   ├── codigo.js                     4 156 bytes  [cópia da skill]
        │   ├── lesson.css                   13 850 bytes  [cópia da skill]
        │   ├── simulador.js                 15 684 bytes  [cópia da skill]
        │   └── tema.js                       2 764 bytes  [cópia da skill]
        └── quimiostato-produtividade-etanol.html
                                              12 272 bytes  [escrito por mim]
```

Nada mais em `com-skill/` foi tocado (`.gitkeep` intacto, mtime 22:30, anterior à sessão).

**Escrevi fora de `com-skill/`?** Sim, em dois lugares:

1. **Scratchpad de sessão** (`.../Temp/claude/.../scratchpad/`) — 6 scripts Python de trabalho e 2 saídas, todos descartáveis:
   `quimiostato.py` (2 209 B), `q2.py` (854 B), `q3.py` (1 216 B), `q4.py` (792 B), `final.py` (2 087 B), `q5.py` (944 B), `sweep.npy` (10 240 B), `varredura.png` (42 426 B).
2. **Este relatório**, em `Teste 3/RELATORIO-MODELO.md`, a seu pedido.

**Escrevi dentro da pasta da skill?** **Não.** Verificado: os 9 arquivos de `~/.claude/skills/simulacao-fermentacao/` têm mtime entre 2026-08-30 17:23 e 22:22 — todos anteriores à primeira gravação da sessão (22:37). Nenhum arquivo novo apareceu lá.

---

## 5. Ferramentas

**15 chamadas no total:** 14 `Bash` + 1 `Write`.

| Tipo | Nº | Quais |
|---|---|---|
| Leitura (arquivos da skill) | 3 | `ls -R` + `cat LESSON-FORMAT.md`; `cat licao.html` + `head simulador.js`; `sed -n '80,200p' simulador.js` |
| Execução de código Python | 8 | checagem de versão numpy/scipy; `quimiostato.py` (timeout); `quimiostato.py` reajustado; `q2.py`; `q3.py`; `q4.py`; `final.py`; `q5.py` |
| Escrita / sistema de arquivos | 3 | `mkdir` + `cp` dos assets; tentativa de gravar o HTML por heredoc (**falhou**); `Write` do HTML |
| Outras | 1 | `start` para abrir a lição no navegador |

Nota: as 8 chamadas de "execução" também gravaram os `.py` no scratchpad via heredoc na mesma chamada — contei pela finalidade, que era rodar.

**Quantas vezes rodei código de verdade:** 8 invocações de `python`, das quais **7 produziram saída** (a primeira versão de `quimiostato.py` foi morta no timeout de 120 s antes de terminar). Para quê:

1. Confirmar que numpy 2.4.2 / scipy 1.17.1 existem no ambiente.
2. Primeira varredura (640 pontos, Radau, T = 400 h, `dense_output`) — **timeout**.
3. Mesma varredura com 320 pontos, `t_eval` no lugar de `dense_output`, rtol 1e-9 — deu o ótimo e o washout.
4. `q2.py`: testar o evento de derivada-quase-nula como critério de permanente, e medir quando ele dispara.
5. `q3.py`: varredura definitiva de 316 pontos com o evento, mais comparação contra a solução analítica.
6. `q4.py`: obter o ponto D = 0,296 1/h convergido (20 000 h) e o transiente de washout em D = 0,31 1/h.
7. `final.py`: rodar o programa exatamente como ele aparece na lição, para garantir que o texto copiado é executável.
8. `q5.py`: conferir o que o simulador do navegador vai mostrar em t = 300 h e validar a afirmação sobre Ks = 5,0 g/L.

---

## 6. Os números da lição

### Procedência de cada número

| Número na lição | Como saiu |
|---|---|
| μmax 0,30 · Ks 1,0 · Yx/s 0,05 · Yp/x 8,0 · Sin 100 · V 10 000 L | enunciado, transcritos |
| **D ótimo = 0,2700 1/h** | `argmax` da varredura rodada (`q3.py`, `final.py`). A solução analítica dá 0,27015 1/h; a malha de 316 pontos caiu em 0,2700 — os dois batem |
| **F = 2,700 m³/h** | `D · V / 1000`, impresso pelo programa |
| X = 4,55 · S = 9,00 · P = 36,40 g/L | saída da integração; conferidos contra o analítico (S = Ks·D/(μmax−D) = 9,000; X = 4,5475; P = 36,380) |
| 91,0 % de conversão | impresso pelo programa |
| **9,83 g L⁻¹ h⁻¹ e 98,3 kg/h** | impressos pelo programa (9,828) |
| **D washout = 0,2970 1/h; F = 2,97 m³/h** | fórmula analítica μmax·Sin/(Ks+Sin), calculada dentro do programa |
| D = 0,290 → 8,24 g L⁻¹ h⁻¹, S = 29 g/L, P = 28,4 g/L | rodado (`q3.py`) e conferido no analítico |
| D = 0,296 → 3,08 g L⁻¹ h⁻¹, S = 74 g/L | rodado com T = 20 000 h (`q4.py`), porque em 5 000 h ainda não tinha convergido |
| D = 0,10 → S = 0,5 g/L, P = 39,8 g/L, 3,98 g L⁻¹ h⁻¹ | rodado (`q3.py`) |
| Washout em D = 0,31: meia-vida ~36 h, 1,9 g/L em t = 200 h | integração do transiente + `brentq` sobre a solução densa (36,07 h; 1,9331 g/L) |
| Ks = 5,0 → S = 45 g/L, P = 22,0 g/L | rodado (`q5.py`: 45,014 e 21,994) e conferido no analítico (45,000 e 22,000) |
| "só 10 % acima do ótimo" | **aritmética minha** sobre dois números verificados: 0,29703/0,2700 = 1,100. Não foi impresso pelo programa |
| "40 % do ótimo" (D = 0,10) | **aritmética minha, arredondada**: 3,980/9,828 = 40,5 % |
| "~130 h" para o evento disparar no ótimo | **arredondamento** do valor medido, que foi 126 h |
| "S resvala em −10⁻¹²" | **este número eu não medi.** É uma ordem de grandeza ilustrativa que escrevi para justificar o `max(S, 0.0)`. Não observei o valor real da excursão negativa. É o único número da lição sem lastro |

### Suposições que entraram na lição

Você está certo: o enunciado dava todos os parâmetros **do modelo**. O que ele não dava, e um problema de valor inicial exige, foram quatro coisas — todas declaradas como suposição na tabela de parâmetros da lição:

1. **X0 = 1,0 g/L** — precisa de um inóculo para integrar. Qualquer X0 > 0 leva ao mesmo permanente (o regime estacionário não depende dele), e X0 = 0 é ponto fixo trivial. Declarado com essa justificativa.
2. **S0 = 100 g/L** — dorna partindo cheia de mosto.
3. **P0 = 0 g/L** — sem etanol no arranque.
4. **T_MAX = 5 000 h** — teto do transiente. Não é físico, é numérico.

Não declaradas na tabela, mas também escolhas minhas, visíveis só no código: `rtol = 1e-9`, `atol = 1e-11`, limiar do evento `1e-7 g L⁻¹ h⁻¹`, malha de 316 pontos entre D = 0,005 e 0,32 1/h. Escolhas de método, não de modelagem — mas são números meus e ficam aqui registrados.

---

## 7. Decisões

**Cinco passos na seção de código.** O teto da skill é seis. Cortei em cinco porque o programa tem exatamente cinco blocos com decisão própria a explicar: (1) parâmetros e estado inicial, (2) a função de derivadas, (3) o evento que define "chegou ao permanente", (4) a varredura e o `argmax`, (5) o washout analítico como conferência. O gráfico seria um sexto passo, mas não há decisão a defender nele — só `ax.plot` — e o formato manda explicar o porquê, não o quê. Ele ficou no programa completo.

**Três controles no simulador:** `D`, `Ks`, `Sin` (o máximo permitido é quatro).

- `D` é a variável do exercício — obrigatório.
- `Ks` porque a quarta observação manda mexer nele e mostrar que, nessa faixa de D, é a afinidade pelo açúcar que decide o resultado, não μmax.
- `Sin` é o mais fraco dos três. Ele aparece no texto (na comparação Ks = 1 g/L contra Sin = 100 g/L), mas **nenhuma observação manda o aluno mexer nele**. Pela regra da skill — "parâmetro que não aparece no texto não vira slider" — ele passa; pelo espírito da regra, é decorativo. Foi um deslize meu.

**Modelo do simulador:** usei o `quimiostato` que já existe em `assets/simulador.js`, **sem escrever nenhum modelo novo** e sem tocar no arquivo. As equações registradas lá são as mesmas do exercício. Só sobrescrevi os valores por `data-params` e **declarei faixas explícitas nos três controles**, porque as faixas padrão do arquivo não serviam: `Sin` vai só até 100 g/L (o valor do exercício está exatamente no teto, sem espaço para subir) e `D` até 1,0 1/h (grosso demais perto de um washout em 0,297). O `Ypx = 8,0 gP/gX` do exercício também está fora da faixa padrão do arquivo (0–2), mas como não virou controle, não houve conflito.

---

## 8. Atrito

### Onde gastei mais esforço

**Em achar o regime permanente perto do washout.** Isso consumiu quatro das oito execuções de Python e foi o único ponto onde quase publiquei número errado.

A primeira varredura (640 pontos, Radau, T = 400 h, tolerância 1e-10, `dense_output`) estourou o timeout de 120 s. Reduzi a malha e troquei `dense_output` por `t_eval` — rodou em 40 s. Mas a saída trazia, em D = 0,2970 1/h, o valor **X = 0,79 g/L**, quando o permanente verdadeiro ali é **X = 0,05 g/L**. Não era bug: perto da bifurcação a convergência é assintoticamente lenta e 400 h não chegam nem perto. Troquei o horizonte fixo por um evento sobre a norma das derivadas — o que melhorou muito e ainda deu X = 0,26 g/L em D = 0,2970 mesmo com T = 5 000 h, ou seja, **ainda errado por um fator 5**.

Eu já tinha um rascunho da resposta com esse número dentro. Só peguei porque comparei com a solução analítica. A correção foi trocar o ponto ilustrativo de D = 0,2970 para D = 0,296 1/h e rodá-lo com T = 20 000 h até convergir de fato.

### O que ficou ambíguo ou contraditório na skill

1. **"Números conferidos rodando o modelo, nunca estimados" é insuficiente aqui, e chega a apontar para o lado errado.** Neste exercício, perto do washout, o número que sai de rodar o modelo é o *menos* confiável, e o número certo vem da solução analítica do estacionário. A regra, lida ao pé da letra, teria me feito publicar 2,07 g/L de etanol onde o correto é 0,40. O que faltou é a regra que de fato me salvou: *cruzar* a integração com uma referência independente.

2. **`SKILL.md` proíbe citar literatura; `assets/simulador.js` exige o contrário.** O comentário de cabeçalho do arquivo diz que os valores padrão são ilustrativos e que "toda lição que exibir um valor precisa dizer isso **ou citar a fonte**". A skill diz que citação não existe. Contradição direta entre dois arquivos da mesma skill. Segui o `SKILL.md`.

3. **O componente disponível não tem a forma do exercício.** O que este exercício pede é uma varredura em D — curvas contra D, um eixo de parâmetro. O `.simulador` só desenha curso temporal contra t. Resultado: a análise crítica teve de falar de transientes enquanto a resposta do exercício é uma curva de permanente, e a figura da varredura — que é *a* figura da questão — só existe dentro do script Python, invisível para quem lê a lição sem rodar nada. A skill não oferece nada para o caso "varra um parâmetro", que é uma das formas mais comuns de exercício de contínuo.

4. **Duas leituras para uma regra só.** `SKILL.md` e `LESSON-FORMAT.md` se sobrepõem bastante (as três divisões, o teto de 1 000 palavras, a procedência dos números, a nota de dúvida aparecem nos dois). Li os dois por inteiro antes de escrever qualquer coisa.

### Regras que não consegui cumprir

- **Procedência total dos números:** falhei em um caso. O "−10⁻¹²" na explicação do `max(S, 0.0)` não veio do enunciado nem foi declarado como suposição — eu o escrevi como se fosse observado, e não observei. É exatamente o modo de falha que a skill descreve, em escala pequena.
- **Slider não decorativo:** o controle `Sin` passa na letra da regra e não no espírito, como registrei acima.
- **Teto de 1 000 palavras visíveis:** escrevi mirando nele, mas **não contei**. Não sei se a lição respeita o teto.
- Fora do domínio da skill: a gravação do HTML por heredoc no Bash falhou com erro de citação (arquivo grande, caminho com acentos). Caiu para a ferramenta `Write` e funcionou. Custou uma chamada.

### O que eu cortaria

**A duplicação entre `SKILL.md` e `LESSON-FORMAT.md`.** São ~14 KB para um conjunto de regras que cabe em um arquivo. `SKILL.md` deveria ficar com o comportamento da sessão (quando ativar, não entrevistar, onde escrever, como responder a dúvidas) e delegar *tudo* sobre a forma da lição ao `LESSON-FORMAT.md`, sem repetir as três divisões, o teto de palavras e a varredura de procedência nos dois.

E colocaria no lugar economizado uma linha que vale mais que qualquer uma das que cortei: **conferir todo resultado de integração contra uma referência independente — analítica quando existir.** Foi o que separou uma lição correta de uma lição que mandaria o aluno caçar defeito em código certo.
