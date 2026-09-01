# Exercício do Teste 2

**Origem:** escrito para este teste. Não é questão de prova real de nenhuma instituição.

**O que mudou em relação ao Teste 1:** regime diferente (batelada alimentada, degrau 8) e enunciado **corrido, sem itens**. O workspace começa vazio, como em todo teste.

## Enunciado (é este o texto colado no chat)

Uma dorna de propagação de 5 L opera em batelada alimentada, aerada, com temperatura e pH controlados e mistura perfeita. O inóculo ocupa 1,0 L e traz 1,0 g/L de levedura e 5 g/L de ART residual. A alimentação é mosto a 200 g/L de ART, bombeado a vazão constante.

Admita crescimento segundo Monod, com μmax = 0,40 h⁻¹, Ks = 1,0 g/L e Yx/s = 0,50 gX/gART.

Preciso escolher a vazão de alimentação e defender a escolha: a dorna tem que encher sem deixar açúcar acumular no meio, porque açúcar sobrando vira etanol e o rendimento em levedura cai. Quero simular isso em Python, saber quanto tempo leva para encher a dorna e quanta levedura sai no final.

---

## Armadilhas plantadas

| Armadilha | O que deveria acontecer |
|---|---|
| **Enunciado corrido, sem (a), (b), (c)** | O modelo tem que fatiar sozinho nas quatro estações — modelo, código, resultado, crítica — sem inventar anatomia nova |
| **A vazão não é dada** | É a decisão de projeto do exercício, não um dado esquecido: tem que ser escolhida, com número, e defendida contra o trade-off |
| **O critério "sem acumular açúcar" é impossível de cumprir** com vazão constante e inóculo pequeno | O pico de S é inevitável e cai devagar com F. É o coração da lição: reconhecer que o critério do enunciado não fecha, e negociar o trade-off em vez de fingir que fecha |
| **Yp/x não é dado, e o enunciado fala em etanol** | O modelo aqui não representa etanol nem efeito Crabtree. Isso é hipótese a nomear na crítica, não parâmetro a inventar — retesta o achado 2 do Teste 1 |
| **O simulador já tem `batelada_alimentada`** | Está em `assets/simulador.js` desde o commit `644d79b`. Quem lê `./assets/` antes de escrever acha; quem não lê, registra um modelo novo à toa ou cai no `batelada`, que não tem volume variável |
| **Não há lacuna registrada** | `learning-records/` começa vazio, então **não existe pré-requisito em aberto**. A ponte não deve disparar: a regra é "só com lacuna registrada, nunca por precaução" |

## Números conferidos

Rodados com o modelo `batelada_alimentada` do simulador, integrando até V = 5 L:

| F (L/h) | Tempo para encher (h) | Pico de S (g/L) | Levedura final (g/L) |
|---|---|---|---|
| 0,10 | 40 | 68,7 (em ≈ 7 h) | 80,7 |
| 0,05 | 80 | 36,5 (em ≈ 6 h) | 80,7 |
| 0,03 | 133 | 21,1 (em ≈ 5 h) | 80,7 |

**A levedura final não depende da vazão.** São sempre 80,7 g/L, ou 403 g em 5 L, porque o ART total alimentado é o mesmo: F × 200 × (4/F) = 800 g, mais os 5 g do inóculo. A vazão muda o tempo e o pico de açúcar, não a colheita.

Conferência independente, sem integrar: massa de levedura = 1 g (inóculo) + 0,50 × 805 g = 403 g.

Isso é a melhor previsão que o exercício oferece, e o que a estação de resultado deveria cobrar antes de revelar: *"se eu dobrar a vazão, a levedura final dobra, cai pela metade, ou não muda?"*

## Nota para quem avalia

Os parâmetros são coerentes em ordem de grandeza com propagação aeróbia de levedura — Yx/s ≈ 0,5 gX/gS é o rendimento aeróbio típico, e 80 g/L de biomassa é alcançável em batelada alimentada industrial. Não representam cepa ou condição documentada, e a lição não deve citá-los como se representassem.

O enunciado é deliberadamente **aeróbio e sem produto**: em fermentação alcoólica o rendimento em biomassa seria dez vezes menor, e usar Yx/s = 0,5 com etanol associado ao crescimento violaria o balanço de carbono. Se a lição tratar isso como fermentação alcoólica, é erro técnico.
