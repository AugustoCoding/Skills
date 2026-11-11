# Resultado da avaliação por modelo

3 execuções, 1 questões. Entre parênteses, o intervalo de 95% da média, por reamostragem das questões. A definição de cada medida está no [README](../README.md).

## Por modelo

| Modelo | Execuções | Entregues | Tempo mediano (mín. a máx.) | Completude | Erro | Respostas certas | Qualidade | Índice |
|---|---|---|---|---|---|---|---|---|
| claude-haiku-5-5 | 1 | 1 | 2 min 59 s (2 min 59 s a 2 min 59 s) | 85,2% | 0,0% | 100,0% | 85,2% | 85,2% |
| claude-sonnet-5-5 | 1 | 1 | 2 min 57 s (2 min 57 s a 2 min 57 s) | 97,1% | 1,0% | 100,0% | 96,5% | 96,5% |
| claude-opus-5-5 | 1 | 1 | 3 min 20 s (3 min 20 s a 3 min 20 s) | 96,8% | 0,0% | 100,0% | 96,8% | 96,8% |

## Completude por seção

Itens explicados sobre itens devidos, somados nas questões de cada modelo.

| Modelo | Modelo | Código | Resultado |
|---|---|---|---|
| claude-haiku-5-5 | 28 de 31 (90,3%) | 35 de 44 (79,5%) | 6 de 7 (85,7%) |
| claude-sonnet-5-5 | 39 de 39 (100,0%) | 52 de 57 (91,2%) | 11 de 11 (100,0%) |
| claude-opus-5-5 | 39 de 40 (97,5%) | 53 de 57 (93,0%) | 8 de 8 (100,0%) |

## Comparações pareadas

Só as questões que os dois modelos fizeram. A diferença é a do índice (primeiro menos segundo); o placar conta em quantas questões cada um teve o índice maior.

| Par | Questões | Diferença média do índice | Placar (vitórias–empates–derrotas) | p (teste dos sinais) |
|---|---|---|---|---|
| haiku × sonnet | 1 | -11,3 pontos | 0–0–1 | 1,000 |
| haiku × opus | 1 | -11,6 pontos | 0–0–1 | 1,000 |
| sonnet × opus | 1 | -0,3 pontos | 0–0–1 | 1,000 |

## Comparação direta

O juiz lê as duas lições da mesma questão, sem saber os modelos, e diz qual ensinaria melhor um iniciante ([COMPARACAO.md](../juiz/COMPARACAO.md)). É um juízo de conjunto, sem lista de itens, e fica fora do índice: se concordar com as comparações pareadas acima, uma confirma a outra.

| Par | Questões julgadas | Placar (vitórias–empates–derrotas) | p (teste dos sinais) |
|---|---|---|---|
| haiku × sonnet | 1 | 0–0–1 | 1,000 |
| haiku × opus | 1 | 0–0–1 | 1,000 |
| sonnet × opus | 1 | 0–0–1 | 1,000 |

Viés de posição: a lição mostrada em primeiro venceu 1 de 3 comparações com vencedor (p = 1,000; perto de metade é o esperado).

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
