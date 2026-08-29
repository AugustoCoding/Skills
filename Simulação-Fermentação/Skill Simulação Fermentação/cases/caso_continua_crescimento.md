# Caso — Fermentação Contínua (Quimiostato)

## Problema

Modelar um quimiostato com entrada de substrato e saída de caldo, avaliando a dinâmica e o estado estacionário em função da taxa de diluição D.

## Degrau

Degrau **6** do mapa de progressão. Pressupõe os degraus 1 a 3 vencidos: quem ainda erra o sinal de `dS/dt` em batelada vai se afogar aqui.

É o caso de maior densidade conceitual do banco. Contém pelo menos três lições distintas:

- **Lição A** — o balanço com o termo de diluição. Só a montagem, sem estado estacionário.
- **Lição B** — μ = D em estado estacionário. A inversão de causalidade. É a lição mais importante do caso.
- **Lição C** — washout e o D que maximiza produtividade. Decisão de processo.

## Modelo esperado

```
μ  = μmax·S/(Ks + S)
dX/dt = (μ − D)·X
dS/dt = D·(Sin − S) − (1/Yx/s)·μ·X
dP/dt = −D·P + Yp/x·μ·X
```

Estado estacionário, com `dX/dt = 0` e `X ≠ 0`:

```
μ = D
S* = Ks·D/(μmax − D)
X* = Yx/s·(Sin − S*)
D_crítico = μmax·Sin/(Ks + Sin)
D_ótimo   = μmax·(1 − √(Ks/(Ks + Sin)))     maximiza D·X*
```

## Loop de feedback

**Padrão principal: preveja e depois rode**, com D como único controle deslizante. O aluno varre D e monta a tabela de estado estacionário.

```html
<div class="simulador" data-modelo="quimiostato" data-tempo="120"
     data-params="mu_max=0.4, Ks=1.0, Yxs=0.5, Ypx=0.2, D=0.2, Sin=20, X0=0.5"
     data-controles="D, Sin" data-prever="1"></div>
```

Com esses parâmetros ilustrativos, `D_crítico = 0,381 1/h` e `D_ótimo = 0,313 1/h`. Os valores de estado estacionário — conferidos contra as fórmulas analíticas:

| D <span class="un">1/h</span> | S* <span class="un">g/L</span> | X* <span class="un">g/L</span> | D·X* <span class="un">g·L⁻¹·h⁻¹</span> |
|---|---|---|---|
| 0,10 | 0,33 | 9,83 | 0,98 |
| 0,20 | 1,00 | 9,50 | 1,90 |
| 0,313 | 3,58 | 8,21 | **2,57** |
| 0,35 | 7,00 | 6,50 | 2,28 |
| 0,38 | 19,00 | 0,50 | 0,19 |
| 0,40 | 20,00 | 0 | 0 |

A tabela contém a lição inteira: X* cai monotonicamente com D, mas a produtividade **passa por um máximo**. Deixe o aluno construí-la mexendo no controle antes de mostrá-la.

**Exercício de recuperação, sem simulador:** dê D e peça μ. A resposta é "μ = D", e a maioria vai calcular Monod primeiro. O momento em que ele percebe que não precisa da equação de Monod é o momento em que entendeu o quimiostato.

## Erros comuns

| Erro | O que revela |
|---|---|
| Acha que μ = μmax em estado estacionário | A concepção central do caso. Não percebeu que D impõe μ. |
| Calcula Monod para achar μ dado D | Meio-caminho: sabe a relação mas não confia nela. |
| Espera que D alto sempre dê mais produto | Não conhece washout. |
| Escolhe D pela concentração máxima de P | Confunde concentração com produtividade. Decisão de processo errada. |
| Esquece o termo de diluição em uma só das equações | O erro mais sutil do caso — tipicamente em `dP/dt`. A curva fica plausível e errada. |
| Aplica S* = Ks·D/(μmax − D) com D > μmax | Não checou o domínio de validade: acima do crítico não há estado estacionário com células. |
| Acha que washout é falha do modelo | Não é: é o modelo descrevendo corretamente um reator lavado. |

## Evidência de entendimento

Merece registro em `./learning-records/` se o aluno:

- responder "μ = D" imediatamente, e souber **por que** (é o que resta de `dX/dt = 0` com X ≠ 0);
- prever o washout antes de rodar, e estimar a ordem de grandeza do D crítico;
- distinguir, sem ajuda, o D que maximiza X* do D que maximiza D·X*;
- notar que `S*` não depende de `Sin` — resultado contraintuitivo e forte sinal de que entendeu a estrutura.

## Extensões

- Comparar produtividade de batelada e de contínuo para o mesmo processo. Decisão real de engenharia.
- Reciclo celular: o que muda no balanço de biomassa e por que o D crítico sobe.
- Inibição por substrato em quimiostato: aparecem **dois** estados estacionários, e a estabilidade passa a importar.
- **Para intercalar:** misturar parâmetros deste caso com os da batelada, sem rótulo, e pedir que o aluno identifique o regime.
