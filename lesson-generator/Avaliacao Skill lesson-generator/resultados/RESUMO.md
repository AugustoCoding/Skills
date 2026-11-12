# Resultado da avaliação por modelo

33 execuções, 11 questões. Entre parênteses, o intervalo de 95% da média, por reamostragem das questões. A definição de cada medida está no [README](../README.md).

> **Parcial.** 30 execução(ões) ainda sem o juiz (Q02 haiku, Q02 opus, Q02 sonnet, Q03 haiku, Q03 opus, Q03 sonnet, Q04 haiku, Q04 opus…): nelas a conta usa só os itens decididos por regra.

## Por modelo

| Modelo | Execuções | Entregues | Tempo mediano (mín. a máx.) | Completude | Erro | Respostas certas | Qualidade | Índice |
|---|---|---|---|---|---|---|---|---|
| claude-haiku-5-5 | 11 | 11 | 5 min 15 s (2 min 59 s a 8 min 02 s) | 98,4% (95,7% a 100,0%) | 0,0% (0,0% a 0,0%) | 100,0% (100,0% a 100,0%) | 98,4% (95,7% a 100,0%) | 86,0% (76,0% a 94,8%) |
| claude-sonnet-5-5 | 11 | 11 | 3 min 42 s (2 min 57 s a 5 min 19 s) | 99,3% (98,6% a 100,0%) | 0,1% (0,0% a 0,3%) | 100,0% (100,0% a 100,0%) | 99,3% (98,5% a 100,0%) | 98,6% (97,4% a 99,7%) |
| claude-opus-5-5 | 11 | 11 | 4 min 04 s (2 min 33 s a 5 min 34 s) | 99,4% (98,7% a 100,0%) | 0,0% (0,0% a 0,0%) | 100,0% (100,0% a 100,0%) | 99,4% (98,7% a 100,0%) | 98,6% (97,0% a 99,7%) |

## Completude por seção

Itens explicados sobre itens devidos, somados nas questões de cada modelo.

| Modelo | Modelo | Código | Resultado |
|---|---|---|---|
| claude-haiku-5-5 | 249 de 254 (98,0%) | 240 de 249 (96,4%) | 67 de 68 (98,5%) |
| claude-sonnet-5-5 | 267 de 269 (99,3%) | 256 de 262 (97,7%) | 74 de 74 (100,0%) |
| claude-opus-5-5 | 264 de 265 (99,6%) | 267 de 273 (97,8%) | 71 de 71 (100,0%) |

## Comparações pareadas

Só as questões que os dois modelos fizeram. A diferença é a do índice (primeiro menos segundo); o placar conta em quantas questões cada um teve o índice maior.

| Par | Questões | Diferença média do índice | Placar (vitórias–empates–derrotas) | p (teste dos sinais) |
|---|---|---|---|---|
| haiku × sonnet | 11 | -12,6 pontos (-22,9 a -3,6) | 2–2–7 | 0,180 |
| haiku × opus | 11 | -12,6 pontos (-22,9 a -3,6) | 2–2–7 | 0,180 |
| sonnet × opus | 11 | -0,0 pontos (-1,6 a +2,0) | 2–5–4 | 0,688 |

## Comparação direta

O juiz lê as duas lições da mesma questão, sem saber os modelos, e diz qual ensinaria melhor um iniciante ([COMPARACAO.md](../juiz/COMPARACAO.md)). É um juízo de conjunto, sem lista de itens, e fica fora do índice: se concordar com as comparações pareadas acima, uma confirma a outra.

| Par | Questões julgadas | Placar (vitórias–empates–derrotas) | p (teste dos sinais) |
|---|---|---|---|
| haiku × sonnet | 1 | 0–0–1 | 1,000 |
| haiku × opus | 1 | 0–0–1 | 1,000 |
| sonnet × opus | 1 | 0–0–1 | 1,000 |

Viés de posição: a lição mostrada em primeiro venceu 1 de 3 comparações com vencedor (p = 1,000; perto de metade é o esperado).

> 30 comparação(ões) ainda sem resposta do juiz.

<details><summary>Por que o juiz decidiu cada par</summary>

- **Q01 haiku × sonnet**: sonnet (lição 1 = sonnet, lição 2 = haiku). As duas chegam às mesmas massas corretas (556,5, 330,6 e 612,9 kg) e conferem com o balanço da água, mas a lição 1 explica melhor o modelo: escreve as frações como símbolos, mostra os termos nulos (0·mS, 0·mN) e diz por que o balanço da água é redundante antes de usá-lo como conferência. No código, a lição 1 explica def, a desempacotagem, os formatos e o recorte massas[:, 0]; a lição 2 deixa os números fixos na matriz e explica menos. No resultado, a lição 1 varia o teor de HNO3, acha e deduz o limite de 33,75 % em que o residual zera e dá números verificáveis para 62 % de H2SO4 e 3000 kg; a figura da lição 2 (massas contra P) só mostra retas proporcionais, e a explicação de por que o sulfúrico é a maior corrente é fraca.
- **Q01 haiku × opus**: opus (lição 1 = haiku, lição 2 = opus). As duas chegam às massas corretas (556,45; 330,65; 612,90 kg) e explicam bem a matriz e o solve, mas a lição 2 mostra por que só três dos quatro balanços são independentes (água = global − HNO3 − H2SO4) e discute a hipótese de evaporação pelo calor de diluição. A figura da lição 1 só mostra que as massas são proporcionais a P, o que é óbvio, e a explicação de por que o sulfúrico é a maior corrente é fraca; além disso, a lição diz que a conferência da água 'não podia falhar' e, logo depois, que ela pega erros de digitação. A varredura da lição 2 é deste exercício: o limite de 31,1% em que N se anula (R = 1350 kg, que conferi), o aviso de que massa negativa é inviável e o caso de 30% com números corretos ensinam a ler e questionar o resultado.
- **Q01 sonnet × opus**: opus (lição 1 = sonnet, lição 2 = opus). As duas estão corretas em todos os números (556,45/330,65/612,90 kg, limites de 33,75% e 31,1%, casos alterados). A lição 2 explica melhor o modelo: substitui os dados em cada balanço (420 e 900 kg), mostra por que o balanço de água é global − HNO₃ − H₂SO₄ em vez de só afirmar que é combinação, e justifica a hipótese de mistura sem evaporação pelo calor de diluição. No código, a lição 2 explica o que cada argumento de np.linalg.solve representa, a leitura linha × vetor de A·x = b e a exigência de matriz quadrada e equações independentes, enquanto a lição 1 só diz que a função devolve o resultado de solve. A lição 1 tem a seu favor a função reutilizável e uma leitura do resultado mais rica (tabela de três casos e dois experimentos), mas isso não compensa a explicação mais rasa do modelo e da resolução.

</details>

## Por questão

Índice de cada execução (qualidade × fator de tempo) e, entre parênteses, o tempo.

| Questão | Disciplina | Tipo de problema | haiku | sonnet | opus |
|---|---|---|---|---|---|
| Q01 | Balanços de massa | sistema de equações lineares | 85,2% (2 min 59 s) | 96,5% (2 min 57 s) | 96,8% (3 min 20 s) |
| Q02 | Termodinâmica | raiz de uma equação não linear (cúbica) | 100,0% (4 min 34 s) | 100,0% (3 min 21 s) | 100,0% (3 min 18 s) |
| Q03 | Termodinâmica (equilíbrio químico) | sistema de equações não lineares | 56,6% (8 min 02 s) | 100,0% (4 min 07 s) | 98,5% (4 min 45 s) |
| Q04 | Mecânica dos fluidos | uma EDO de valor inicial, com evento | 81,5% (6 min 17 s) | 100,0% (4 min 23 s) | 100,0% (3 min 51 s) |
| Q05 | Transferência de calor | EDP parabólica (condução transiente) | 75,5% (6 min 42 s) | 95,5% (5 min 19 s) | 100,0% (4 min 04 s) |
| Q06 | Transferência de calor (projeto econômico) | otimização de uma variável | 95,5% (5 min 19 s) | 100,0% (3 min 07 s) | 100,0% (3 min 37 s) |
| Q07 | Transferência de massa (absorção) | integral definida de uma função | 96,4% (5 min 15 s) | 100,0% (4 min 38 s) | 91,7% (5 min 34 s) |
| Q08 | Operações unitárias (destilação) | cálculo estágio a estágio (laço) | 98,9% (4 min 42 s) | 95,5% (5 min 11 s) | 98,4% (5 min 00 s) |
| Q09 | Reatores (batelada não isotérmica) | sistema de EDOs de valor inicial, com evento | 58,0% (7 min 56 s) | 100,0% (3 min 42 s) | 100,0% (4 min 36 s) |
| Q10 | Cinética química | regressão linear | 100,0% (3 min 27 s) | 100,0% (3 min 05 s) | 100,0% (2 min 33 s) |
| Q11 | Controle de processos | sistema de EDOs de valor inicial (malha fechada) | 98,5% (4 min 48 s) | 97,2% (3 min 42 s) | 99,4% (5 min 02 s) |
