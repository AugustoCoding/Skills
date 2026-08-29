# Caso — Produção de Etanol

## Problema

Simular a produção de etanol por levedura a partir de glicose, em batelada, com explicação acessível a iniciantes.

## Degrau

Cobre os degraus **4** (formação de produto) e **7** (inibição por produto). O degrau 4 pode ser ensinado sobre a batelada simples; o 7 é o que torna este caso específico, porque **etanol inibe o próprio produtor**.

É o caso a preferir quando a missão do aluno envolve sucroenergético, cachaça, cerveja ou etanol 2G — contexto brasileiro em que ele provavelmente já tem intuição de processo, mesmo sem a matemática.

## Modelo esperado

Versão do degrau 4 — produto associado ao crescimento, sem inibição:

```
μ  = μmax·S/(Ks + S)
dX/dt = μ·X
dS/dt = −(1/Yx/s)·dX/dt
dP/dt = Yp/x·dX/dt
```

Versão do degrau 7 — com inibição por produto, forma linear:

```
μ  = μmax·S/(Ks + S)·(1 − P/Pmax)
```

Alternativa exponencial (Aiba): `μ = μmax·S/(Ks+S)·exp(−Kp·P)`. A linear zera μ exatamente em Pmax; a exponencial só decai. Escolher entre as duas é decisão de modelagem, e é bom conteúdo de lição.

## Ancoragem estequiométrica

Este caso tem um trunfo que os outros não têm: **existe um limite teórico verificável**. Pela estequiometria de Gay-Lussac, 1 mol de glicose (180 g/mol) dá 2 mol de etanol (46 g/mol):

```
Yp/s teórico = 2 × 46 / 180 = 0,511 gP/gS
```

Todo rendimento simulado deve ser comparado a esse teto. Um modelo que produz Yp/s = 0,7 está errado, e o aluno pode descobrir isso sozinho — é o melhor exercício de verificação do banco, porque a régua não depende de você.

Com os parâmetros ilustrativos do simulador (`Yx/s = 0,1 gX/gS`, `Yp/x = 4,0 gP/gX`), o rendimento efetivo é `Yp/s = 0,1 × 4,0 = 0,40 gP/gS` — cerca de 78% do teórico, faixa plausível para um processo real.

Resultado da simulação com `S0 = 150 g/L`, `X0 = 0,5 g/L`, `Pmax = 90 g/L`, em 48 h: `X = 15,5`, `S ≈ 0`, `P = 60,0 g/L`. Todos ilustrativos.

## Loop de feedback

**Padrão principal: das unidades ao modelo.** Dê a tabela de parâmetros com unidades e o teto estequiométrico, e peça o sistema. Depois, o confronto: o Yp/s do modelo dele respeita os 0,511?

```html
<div class="simulador" data-modelo="inibicao_produto" data-tempo="48"
     data-params="mu_max=0.4, Ks=1.0, Yxs=0.1, Ypx=4.0, Pmax=90, X0=0.5, S0=150"
     data-controles="Pmax, S0, Ypx" data-prever="1"></div>
```

Perguntas de previsão:

- Se S0 dobrar, P final dobra? (Não, quando a inibição morde: existe um teto imposto por Pmax, e o substrato sobra. É a descoberta central do caso.)
- O que acontece quando `Pmax` cai para 40 g/L?
- Aumentar `Yp/x` sem mexer em `Yx/s` pode violar a estequiometria? A partir de qual valor?

**Padrão alternativo: diagnostique o gráfico.** Mostre uma curva em que S sobra no fim, sem o código. Por que a fermentação parou com substrato disponível? A resposta — inibição por produto — é a intuição que todo operador de destilaria tem e que o modelo precisa reproduzir.

## Erros comuns

| Erro | O que revela |
|---|---|
| Espera que todo S vire P | Ignora que parte do carbono vira biomassa, CO₂ e manutenção. |
| Yp/s acima de 0,511 e não estranha | Não usa a estequiometria como verificação. Lacuna importante. |
| Acha que a fermentação sempre vai até S = 0 | Não considera inibição por produto. |
| Trata `Yp/x` e `Yp/s` como a mesma coisa | Confusão de índices — o par de índices é que diz o que virou o quê. |
| Modela inibição mas deixa μ negativo | `1 − P/Pmax` sem proteção quando P passa de Pmax. Crescimento negativo não é morte celular. |
| Espera que P dobre com S0 dobrado, sob inibição | Não percebeu que Pmax impõe um teto independente do substrato. |
| Usa μmax de bactéria em modelo de levedura | Parâmetro sem procedência. Sempre exigir organismo e condição. |

## Evidência de entendimento

Merece registro em `./learning-records/` se o aluno:

- checar o rendimento contra o teto estequiométrico **sem que você peça**;
- explicar por que sobra substrato no fim quando há inibição;
- distinguir Yp/s de Yp/x corretamente em um problema novo;
- justificar a escolha entre inibição linear e exponencial olhando dados, não estética;
- perceber que `μ` precisa ser protegido contra valores negativos, e dizer por quê.

## Extensões

- Luedeking–Piret completo: separar α e β e discutir se etanol é associado ao crescimento (é, majoritariamente).
- Inibição por substrato **e** por produto ao mesmo tempo — relevante em mosto concentrado.
- Batelada alimentada para contornar a inibição por substrato mantendo S baixo (degrau 8).
- Ajuste de `Pmax` e `μmax` a dados reais de uma dorna (degrau 9).
- **Para intercalar:** comparar este caso com o do quimiostato e perguntar por que fermentação alcoólica industrial raramente é contínua sem retenção celular.
