# Teste 12 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

> A reação reversível e exotérmica A ⇌ B, de primeira ordem nos dois sentidos, é conduzida em fase líquida num CSTR com tempo de residência de 10 min, alimentado só com A. A 350 K, a constante de velocidade direta vale 0,050 min⁻¹ e a constante de equilíbrio vale 20. A energia de ativação da reação direta é 60 kJ/mol, e o calor de reação é −80 kJ/mol, ambos constantes. Em que temperatura o reator deve operar para a conversão de A ser máxima, e qual é essa conversão? Como muda a temperatura ótima se o tempo de residência dobrar?

## Por que este exercício

- **Otimização**, um tipo de problema que nenhum teste usou: achar o máximo de uma função de uma variável (`minimize_scalar`, ou a raiz da derivada).
- **Duas leis com temperatura de referência** (Arrhenius e van 't Hoff), que exercitam as equações complementares do `pecas.html`.
- **O enunciado na abertura**, a regra nova: os dados e o que se pede em lista.
- **Sem caixas de erro**: o modelo não tem mais "o erro que parece certo"; o teste mostra se ele ainda força texto sobre erros.

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | O equilíbrio desloca com a temperatura | K por van 't Hoff, com K diminuindo ao esquentar (exotérmica) | K constante, ou crescendo com T |
| 2 | Velocidade inversa | k₋₁ = k₁/K, deduzido do equilíbrio | Reação tratada como irreversível |
| 3 | Unidades | E e ΔH em J/mol com R = 8,314 J/(mol·K) | Fator mil no expoente |
| 4 | Maximizar, não zerar | Busca do máximo com intervalo justificado (por exemplo, `minimize_scalar` no negativo de X), ou raiz da derivada | Ler o máximo no gráfico |
| 5 | A conversão nunca passa a de equilíbrio | Conferir X(T) < X_eq(T), ou o ótimo por uma varredura independente | Nenhuma conferência |
| 6 | Tempo de residência dobrado | O ótimo cai para uma temperatura menor e a conversão máxima sobe | Resposta qualitativa sem número |
| 7 | O enunciado na abertura | O quadro "O exercício" com os dados e a lista do que se pede | Parágrafo corrido |

## Gabarito

Calculado com `minimize_scalar` (intervalo 300 a 500 K, xatol 10⁻⁶) e guardado fora do repositório até a sessão terminar. X(T) = τ·k₁/[1 + τ·k₁·(1 + 1/K)], com k₁ e K a partir de 350 K.

| τ | Temperatura ótima | Conversão máxima |
|---|---|---|
| 5 min | 382,6 K | 0,452 |
| 10 min | 376,6 K (103,5 °C) | 0,551 |
| 20 min | 370,9 K (97,7 °C) | 0,646 |

Conferências: X(350 K) = 0,328; X(400 K) = 0,370 < X_eq(400 K) = 0,392.
