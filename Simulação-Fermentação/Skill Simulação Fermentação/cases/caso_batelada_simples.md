# Caso — Fermentação em Batelada Simples

## Problema

Simular por 24 h um processo em batelada com variáveis X, S e P e cinética de Monod.

## Degrau

Cobre os degraus **1 a 3** (balanço, Monod, acoplamento de substrato) e o **5** (integração numérica). É o caso de entrada natural para quem ainda não montou um balanço.

Não use os cinco degraus de uma vez. A divisão que funciona:

- **Lição A** — degraus 1 e 2: por que μ depende de S, o que Ks significa. Sem código.
- **Lição B** — degrau 3: acoplar `dS/dt` a `dX/dt`. O sinal e o rendimento.
- **Lição C** — degrau 5: o mesmo modelo, agora em `solve_ivp`.

## Modelo esperado

```
μ  = μmax·S/(Ks + S)
dX/dt = μ·X
dS/dt = −(1/Yx/s)·dX/dt
dP/dt = Yp/x·dX/dt
```

Hipóteses embutidas, que valem ser nomeadas com o aluno: rendimentos constantes, um único substrato limitante, volume constante, sem fase lag, sem morte celular, sem inibição.

## Loop de feedback

**Padrão principal: preveja e depois rode.** É o melhor caso do banco para isso, porque a curva tem três comportamentos previsíveis e o aluno erra pelo menos um.

Montagem com `assets/simulador.js`:

```html
<div class="simulador" data-modelo="batelada" data-tempo="24"
     data-params="mu_max=0.4, Ks=1.0, Yxs=0.5, Ypx=0.2, X0=0.1, S0=20"
     data-controles="mu_max, Ks, S0" data-prever="1"></div>
```

Perguntas de previsão que discriminam bem:

- Em que instante S chega perto de zero?
- X continua crescendo depois disso? Por quê?
- Se μmax dobrar, o X **final** muda?
- Se Ks dobrar, o que acontece com a forma da curva?

A pergunta do μmax é a melhor do caso, porque a resposta é **"depende, e a condição é interessante"**. Se o substrato se esgota dentro da janela, X final é fixado pelo balanço de massa — `X_final ≈ X₀ + Yx/s·S₀` — e μmax só muda a velocidade com que se chega lá. Se a janela acaba antes, μmax muda tudo. Com os parâmetros acima e 24 h de simulação (valores ilustrativos):

| μmax <span class="un">1/h</span> | X final <span class="un">g/L</span> | S final <span class="un">g/L</span> |
|---|---|---|
| 0,05 | 0,31 | 19,6 |
| 0,10 | 0,98 | 18,2 |
| 0,20 | 8,80 | 2,6 |
| 0,40 | 10,10 | ~0 |
| 0,80 | 10,10 | ~0 |

Deixe o aluno descobrir o platô mexendo no controle deslizante. A pergunta que fecha a lição: *por que a tabela satura, e o que exatamente fixa o valor 10,1?*

**Padrão alternativo: conserte o código quebrado.** Use `templates/codigo.py` com um defeito plantado. Para este caso, o mais produtivo é inverter o sinal de `dSdt` — o gráfico denuncia sozinho e o aluno aprende a ler a figura como verificação.

## Erros comuns

| Erro | O que revela |
|---|---|
| S cresce ao longo do tempo | Sinal de `dS/dt` invertido. Degrau 3 não vencido. |
| S cai rápido demais ou de menos | Multiplicou por Yx/s em vez de dividir. Confusão sobre o que gX/gS significa. |
| Curva reta e plana | `X0 = 0`. Não reconhece ponto fixo — costuma ser lido como bug do integrador. |
| Acha que X para de crescer junto com S | Não separou taxa específica de taxa volumétrica: com S baixo, μ cai, mas X ainda cresce até S acabar. |
| Espera que μmax mude o X final (com S esgotado) | Confunde velocidade com capacidade. Esgotado o substrato, o X final vem do balanço de massa, não da cinética. |
| Generaliza que μmax nunca afeta o X final | Esqueceu a condição: se a janela de tempo acaba antes de S se esgotar, μmax determina tudo. |
| Curva "não sai do lugar" | `t_span` em minutos com parâmetros em horas. |

## Evidência de entendimento

Merece registro em `./learning-records/` se o aluno:

- escrever `dS/dt` com sinal e rendimento corretos sem consultar;
- explicar por que X continua crescendo depois de μ começar a cair;
- prever que μmax não altera o X final **e enunciar a condição** (só vale se S se esgotar dentro da janela), justificando pelo balanço de massa;
- conferir o resultado fechando o balanço de carbono, sem que você peça.

## Extensões

- Trocar o produto simplificado por Luedeking–Piret (leva ao degrau 4 e ao caso do etanol).
- Acrescentar fase lag e discutir o que Monod puro não captura.
- Comparar tolerâncias apertada e frouxa no `solve_ivp` — se as curvas diferem, o resultado é do integrador.
- **Para intercalar:** apresentar este caso e o do quimiostato lado a lado, sem rótulo, e pedir que o aluno identifique o regime a partir das equações.
