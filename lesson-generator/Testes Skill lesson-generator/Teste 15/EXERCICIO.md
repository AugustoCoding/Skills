# Teste 15 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

> Uma mistura de 100 mol de benzeno e tolueno, com fração molar de benzeno de 0,50, é destilada em batelada num refervedor simples (um único estágio de equilíbrio), com volatilidade relativa constante de 2,5. A destilação é interrompida quando a fração de benzeno no refervedor cai para 0,20. Quantos mols restam no refervedor e qual é a fração média de benzeno no destilado coletado? Em que fração de benzeno no refervedor seria preciso parar para que o destilado médio tivesse 0,70 de benzeno?

## Por que este exercício

- **Confirmar as correções do Teste 14** (`fac11f6`, `6d2b2a0`, `bb4c717`, `09381cf`): curva chamada pelo nome da legenda, nunca pela cor; a saída do editor; a fonte menor.
- **Em português**, o idioma em que apareceu o erro das cores.
- **Fórmula fechada**: com volatilidade relativa constante, a equação de Rayleigh tem integral analítica. Testa a regra nova: a fórmula é a técnica, e a integração numérica é a conferência. A segunda pergunta não se isola: a fórmula entra numa busca de raiz.
- **Separação**, com balanço de massa sem reação e em batelada: a dedução de Rayleigh parte de um balanço diferencial.

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | Balanço diferencial | Global e de benzeno no refervedor, com o vapor saindo na composição de equilíbrio, até a equação de Rayleigh | Balanço de estado estacionário |
| 2 | Equilíbrio | y = αx/[1 + (α − 1)x] | Raoult com pressões de vapor inventadas |
| 3 | Fórmula fechada | A integral analítica como técnica; a numérica (`quad`) como conferência | Só integração numérica, sem dizer que existe a fórmula |
| 4 | Destilado médio | Balanço global: x̄D = (F·xF − W·xW)/(F − W) | Confundir com o y instantâneo |
| 5 | Segunda pergunta | Busca de raiz em xW, com a fórmula dentro | Tentativa e erro manual |
| 6 | Curvas | Chamadas pelo nome da legenda | "a curva azul" |
| 7 | Idioma | Lição inteira em português, `pt-BR`, vírgula decimal | Mistura de idiomas |

## Gabarito

Calculado pela fórmula fechada de Rayleigh e conferido com `quad`; guardado fora do repositório até a sessão terminar.

| Pergunta | Resultado |
|---|---|
| Parada em xW = 0,20 | W = **24,803 mol** no refervedor; D = 75,197 mol; destilado médio x̄D = **0,5990** |
| Destilado médio de 0,70 | parar em xW = **0,4646**; W = 84,956 mol; D = 15,044 mol |
