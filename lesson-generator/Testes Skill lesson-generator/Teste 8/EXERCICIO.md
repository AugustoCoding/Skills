# Teste 8 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

> Uma corrente de 100 kmol/h com 30% de propano, 45% de n-butano e 25% de n-pentano (frações molares) é alimentada a um tambor de flash que opera a 10 bar e 67 °C. Nessa pressão, as constantes de equilíbrio líquido-vapor seguem ln K<sub>i</sub> = A<sub>i</sub> − B<sub>i</sub>/T, com T em kelvin: propano A = 6,75 e B = 2000 K; n-butano A = 6,98 e B = 2400 K; n-pentano A = 7,28 e B = 2800 K. Calcule as vazões de vapor e de líquido que saem do tambor e as composições das duas fases. Entre que temperaturas, a 10 bar, essa mistura fica parcialmente vaporizada?

Os A e B foram escolhidos para dar K plausíveis a 10 bar; não são de literatura e o enunciado os dá, então a procedência é "enunciado".

## Por que este exercício

É de **outra área** (separação, não reatores nem fermentação) e de **outro tipo de problema** (equação algébrica, não EDO). Os sete testes anteriores foram todos de fermentação e de integração no tempo. Ele exercita o que a skill nova ainda não viu:

- o quadro da técnica quando a técnica **não** é integração numérica;
- a peça "separador em estado estacionário" e uma figura de varredura com raiz, do `pecas.html`;
- os passos do código em três tempos, com todos os argumentos explicados, num código sem `solve_ivp`.

## Gabarito

Calculado com `scipy.optimize.brentq` na equação de Rachford-Rice, T = 340,15 K.

| Grandeza | Propano | n-Butano | n-Pentano |
|---|---|---|---|
| K | 2,388 | 0,927 | 0,386 |
| x (líquido) | 0,181 | 0,466 | 0,353 |
| y (vapor) | 0,432 | 0,432 | 0,136 |

| Grandeza | Valor |
|---|---|
| Fração vaporizada V/F | 0,4756 |
| Vapor V | 47,56 kmol/h |
| Líquido L | 52,44 kmol/h |
| Ponto de bolha a 10 bar (Σ z·K = 1) | 56,43 °C |
| Ponto de orvalho a 10 bar (Σ z/K = 1) | 77,71 °C |

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | Temperatura dada em °C, correlação em K | Conversão explícita para 340,15 K, dita no código | Com 67 na fórmula, os K saem da ordem de 10⁻¹¹ e o flash não tem solução |
| 2 | Sistema não linear com várias incógnitas | Reduzir a uma equação em V/F (Rachford-Rice) e achar a raiz num intervalo onde ela existe | `fsolve` no sistema inteiro, chute arbitrário, solução sem sentido físico (V/F fora de 0 a 1) |
| 3 | A raiz só existe entre bolha e orvalho | A lição diz por que o intervalo (0, 1) funciona e quando não funciona | Método de raiz chamado sem intervalo justificado |
| 4 | Segunda pergunta pede duas temperaturas | Duas raízes em T: Σ z·K = 1 e Σ z/K = 1 | Achar por tentativa olhando o gráfico |
| 5 | Verificação | Σ x = Σ y = 1, e o balanço de cada componente fecha (F·z = V·y + L·x) | Nenhuma conferência independente |
| 6 | Técnica que não é integração | O quadro da técnica nomeia a busca de raiz (e a função, `brentq`), sem copiar o texto da integração da lição modelo | Quadro falando de "avançar no tempo" |
| 7 | Figura | Uma varredura: V/F (ou as composições) contra a temperatura, entre bolha e orvalho, com controle da temperatura ou da composição | Figura no tempo, ou nenhuma |
