# Exercício do Teste 6

**Origem:** o mesmo enunciado do [Teste 5](../Teste%205/EXERCICIO.md), palavra por palavra. Não é questão de prova real de nenhuma instituição.

**Por que repetir:** o Teste 6 mede o efeito de `a84f18d`, e a métrica central é o **tempo**. Tempo só se compara com a mesma entrada. O Teste 4 usou esse desenho contra o Teste 3 e foi o teste mais informativo da série.

A comparação é direta contra a lição que já está no repositório, em [`Teste 5/com-skill/batelada-vhg-inibida-por-etanol.html`](../Teste%205/com-skill/batelada-vhg-inibida-por-etanol.html). Ao avaliar, abra as duas lado a lado.

## Enunciado (é este o texto colado no chat)

Uma dorna de 50 m³ fermenta mosto de altíssima gravidade, com 260 g/L de ART. O inóculo entra a 1,0 g/L de levedura, e a fermentação é anaeróbia, com temperatura controlada.

A levedura segue Monod com inibição linear pelo etanol: o crescimento cai proporcionalmente conforme o etanol sobe, e cessa quando ele chega a 90 g/L. Os parâmetros são μmax = 0,35 h⁻¹, Ks = 1,5 g/L, Yx/s = 0,045 gX/gART e Yp/x = 9,0 gP/gX.

Quero simular 72 h dessa batelada em Python, saber quanto etanol sai no final e quanto açúcar sobra — e entender como a taxa específica de crescimento se comporta ao longo do processo.

---

## O que este teste responde

Todas as regras abaixo entraram em `a84f18d` e **nunca foram exercitadas**. O Teste 5 rodou contra a versão anterior delas.

| Pergunta | Como saber | O que o Teste 5 fez |
|---|---|---|
| **Sair o teto de palavras deixou a sessão mais rápida?** É a pergunta principal. Ele não gasta mais uma rodada de edição para caber num número | Cronômetro, e a seção de tempo do relatório dele | > 10 min, dos quais uma rodada inteira só para cortar de 1.126 para 1.012 |
| **...e a lição ficou mais completa, não mais curta?** O teto saiu para as definições poderem crescer. Se a lição encolher, a mudança fracassou | Contagem de palavras por divisão. Espere a lição **maior** que 1.061 | 1.061 palavras, com definições telegráficas |
| **A definição virou frase completa?** | Leia os `<li>` da lista de termos. "μ — taxa específica de crescimento, 1/h" é reprovação; a definição tem de dizer taxa de quê, de quem, por quê | "P — etanol, g/L", "X — levedura, g/L", "μ — taxa específica de crescimento, 1/h" |
| **Tem parágrafo de abertura?** Três a cinco frases situando o processo, antes da primeira divisão | Olhe entre o `<header>` e o primeiro `<h2>`. O `gancho` do cabeçalho **não conta**: ele diz o que o aluno terá no fim, não que processo é este | Não tinha — o template da época não previa |
| **A frase de fecho monta a cena antes de concluir?** Duas a quatro frases por bloco | Compare com a do Teste 5: *"Dois freios multiplicando: falta de açúcar e excesso de etanol"* pressupõe a cena montada. A nova deve construí-la | Duas das quatro frases concluíam sem montar a cena |
| **O esqueleto de componente poupou a leitura do `simulador.js`?** As convenções em prosa (`a84f18d`) não bastaram; agora há um `templates/componente.js` que roda e se copia (`fbe8760`) | Seção 3 do relatório: quantas vezes abriu o `simulador.js`, e se partiu do esqueleto. Uma leitura já significa que o esqueleto não convenceu | Leu o arquivo inteiro **3 vezes**, ~470 linhas, só para aprender o estilo, e escreveu 240 do zero |
| **O teto de palavras sumiu de verdade?** Ele sobreviveu no `templates/licao.html` até `fbe8760`, e o template é lido inteiro em toda sessão | Nenhuma menção a contagem de palavras no relatório nem no chat, e nenhuma rodada de corte de prosa | Contou, cortou de 1.126 para 1.012, recontou — uma rodada inteira de edição |
| **Usou a caixa do número derivado?** | 22 g de ART por grama de levedura, 85,5 % de conversão, 4.500 kg: a conta tem de estar visível na lição ou no código | Publicou os três sem mostrar a conta de todos |
| **O design novo aparece?** 19 px, coluna de 54 rem, cantos de 10 px, símbolo definido em cor e negrito | Abra no navegador. O CSS é copiado da skill, então isto testa a cópia, não a escrita — mas confirma que ele copiou a versão nova | CSS antigo: 17 px, 46 rem, cantos de 3 px |
| **Usou `<span class="termo">`?** Classe nova, com parcimônia — um ou dois por divisão | `grep 'class="termo"'`. Zero é aceitável; muitos é ruído | Não existia |

### Os dois achados em aberto do Teste 5

Nenhuma regra foi mexida por causa deles: as duas já existiam e não foram cumpridas. O Teste 6 responde se foi acaso ou se a regra não pega.

| Achado | Como saber |
|---|---|
| **7 — o slider não alcança o valor que a observação manda procurar.** No Teste 5: *"Desça `S0` até 222 g/L"*, com `S0:150:320:5`, que para em 220 e 225. A fronteira do fenômeno é 222,2 g/L | Para cada observação que cita um valor de controle, confira se a faixa **e o passo** chegam nele |
| **8 — número só numérico não declarado.** 18,5 h, 6,5 h e 2,6 h saem de integração e não têm forma fechada; o `SKILL.md` manda avisar quando o número é numérico | Procure na lição alguma marca de que esses instantes são integrados, não calculados |

### O segundo gráfico, agora permitido

A regra mudou **a favor** do que ele fez no Teste 5: dois canvas separados são permitidos quando o enunciado pede duas grandezas em unidades diferentes. Então não se avalia mais *se* ele fez dois — avalia-se **como**:

- um painel por canvas, cada um de 320 a 420 px, nunca dois painéis num só;
- no máximo dois canvas;
- e, se escrever componente de novo, ele fica em `assets/` do workspace, nunca na pasta da skill.

Se ele resolver com **um** canvas só, também está dentro das regras — e aí a pergunta passa a ser se μ ficou compreensível como número no texto.

## Armadilhas de conteúdo

São as mesmas do Teste 5, porque o enunciado é o mesmo:

- **O açúcar não acaba.** A fermentação para por inibição com **37,8 g/L de ART sobrando**. Quem escrever que o substrato se esgota errou o fenômeno central.
- **O teto de 105,3 g/L nunca é alcançado.** Se todo o ART virasse etanol, dariam 0,045 × 9,0 × 260 = 105,3 g/L. O etanol para em 90 porque a inibição chega antes.
- **O volume de 50 m³ não entra em nada** — as concentrações não dependem dele. Serve para converter em massa total.
- **O modelo `inibicao_produto` já existe** em `assets/simulador.js`. Componente novo aqui só se justifica para a figura de μ.

## Números conferidos

Conferidos duas vezes: no fechamento do Teste 5, por álgebra e por uma integração `Radau` (rtol 1e-10, atol 1e-12) independente. Bateram em dez dígitos.

**Pela álgebra, sem integrar** — é assim que a skill manda achar o número:

- ART consumido até o etanol travar: `Pmax / (Yx/s · Yp/x)` = 90 / 0,405 = **222,2 g/L**
- **ART que sobra** = 260 − 222,2 = **37,8 g/L**
- **Levedura final** = 1,0 + 0,045 × 222,2 = **11,0 g/L**
- **Etanol final** = **90,0 g/L**, o próprio Pmax
- Conversão = **85,5 %**; etanol na dorna = **4.500 kg**

**Trajetória, por integração** (não têm forma fechada):

| Grandeza | Valor |
|---|---|
| μ inicial | 0,34799 1/h |
| μ cai à metade em | 6,48 h |
| Etanol a 99 % do teto em | 18,51 h |
| μ(24 h) | 4,43×10⁻⁴ 1/h |
| μ(72 h) | 8,5×10⁻¹² 1/h |

| t (h) | Levedura X (g/L) | ART S (g/L) | Etanol P (g/L) | μ (1/h) |
|---|---|---|---|---|
| 6 | 5,49 | 160,2 | 40,4 | 0,191 |
| 12 | 9,97 | 60,7 | 80,7 | 0,035 |
| 18 | 10,88 | 40,4 | 88,9 | 0,0040 |
| 24 | 10,99 | 38,1 | 89,9 | 0,0004 |
| 36 a 72 | 11,00 | 37,8 | 90,0 | ~0 |

**Cenários das observações**, para conferir o que ele escrever:

| Cenário | Resultado |
|---|---|
| `S0` = 222,2 g/L | fronteira: abaixo disso o ART limita antes do etanol |
| `S0` = 200 g/L | ART esgota; etanol para em 81,0 g/L |
| `Yx/s` = 0,060 | consome 166,7 g/L de ART; sobram 93,3; etanol continua 90,0 |
| `X0` = 5,0 g/L | μ cai à metade em 2,65 h; etanol final continua 90,0 |
| `Ks` de 1,5 a 10 | fração de Monod cai só de 0,9943 para 0,9630 |

## Nota para quem avalia

Os parâmetros são coerentes com fermentação alcoólica de altíssima gravidade: Yx/s baixo porque o carbono vai para o etanol, Yp/s = 0,405 gP/gART (abaixo do teto de Gay-Lussac, 0,511), e inibição cessando perto de 90 g/L de etanol. Não representam cepa documentada, e a lição não deve citá-los como se representassem.

A inibição é **linear** — μ multiplicado por (1 − P/Pmax) —, que é a forma implementada no componente. Se a lição usar outra forma, o gráfico e o código vão discordar.
