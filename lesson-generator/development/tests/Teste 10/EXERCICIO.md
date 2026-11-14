# Teste 10 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

> Num reator batelada a volume constante, a decomposição de um reagente A foi acompanhada medindo a concentração dele ao longo do tempo:
>
> | t (min) | 0 | 5 | 10 | 20 | 30 | 45 | 60 | 90 |
> |---|---|---|---|---|---|---|---|---|
> | C<sub>A</sub> (mol/L) | 2,00 | 1,35 | 0,98 | 0,68 | 0,49 | 0,37 | 0,28 | 0,205 |
>
> Determine a ordem da reação em relação a A e a constante de velocidade. Quanto tempo leva para a concentração de A cair a 0,25 mol/L?

Os dados foram gerados de uma reação de segunda ordem com ruído de cerca de 2%; o enunciado os dá, então a procedência é "enunciado".

## Por que este exercício

- **Outro tipo de problema**: ajuste de modelo a dados (regressão), não integração nem raiz.
- **Exercita a peça "dados contra modelo"** e uma figura de pontos medidos, que nenhum teste usou.
- **Exercita as duas mudanças de `e40221d`**: explicar o mecanismo de uma função entregue a uma biblioteca (o modelo entregue ao `curve_fit`) e terminar o programa com uma figura.

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | A ordem não é dada | Determinar n: ajuste com n livre, ou comparar ordens candidatas pelos resíduos | Supor primeira ordem sem testar |
| 2 | Linearizar ou ajustar direto | Escolha explicada: o ajuste não linear trabalha no erro de C<sub>A</sub>; a linearização distorce os erros | Usar uma das duas sem dizer por quê |
| 3 | A unidade de k depende de n | k em L/(mol·min) para n = 2 | k "em 1/min" com n = 2 |
| 4 | Dados com ruído | Incerteza dos parâmetros (da covariância) e precisão compatível com ela | Citar n = 1,99575 como se fosse exato |
| 5 | Função de modelo entregue ao `curve_fit` | O mecanismo explicado: o `curve_fit` chama a função com todos os tempos e com parâmetros tentativos, até a soma dos quadrados ser mínima; o que é `p0` e por que ele importa | Argumentos listados sem explicar como a função é usada |
| 6 | Verificação | Resíduos pequenos e sem tendência, ou comparação com a primeira ordem, ou a reta de 1/C<sub>A</sub> contra t | Nenhuma conferência |
| 7 | Figura no programa | `plt.show()` com os pontos medidos e a curva ajustada | Programa que só imprime números |

## Gabarito

Calculado com `curve_fit` antes da sessão, com C<sub>A0</sub> fixo em 2,0 mol/L, e guardado fora do repositório até ela terminar.

| Grandeza | Valor |
|---|---|
| Ajuste livre | n = 2,00 (± 0,04); k = 0,0500 (± 0,0007) L/(mol·min); soma dos quadrados 1,05·10⁻³ (mol/L)² |
| Primeira ordem | k = 0,0532 1/min; soma dos quadrados 0,188 (180 vezes pior) |
| Segunda ordem | k = 0,0499 L/(mol·min); soma dos quadrados 1,05·10⁻³ |
| Tempo até 0,25 mol/L | cerca de 70 min (69,8 com n livre; 70,1 com n = 2) |
