# Teste 9 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

> Uma reação A → B, irreversível, de primeira ordem e exotérmica, é conduzida em fase líquida num reator tubular adiabático. A alimentação entra a 47 °C, com 2,0 mol/L de A e vazão de 10 L/min. A constante de velocidade vale 0,020 min⁻¹ a 47 °C, e a energia de ativação é 80 kJ/mol. O calor de reação é −50 kJ/mol de A, e o produto da densidade pelo calor específico da mistura é 4,0 kJ/(L·K), constante. Que volume de reator é necessário para converter 90% de A, e com que temperatura a corrente sai? Compare com o volume necessário se o reator fosse mantido a 47 °C.

## Por que este exercício

- **Balanço de energia**, que nenhum teste exercitou: testa as peças de energia do `pecas.html` e a figura de dois eixos.
- **EDOs acopladas ao longo do volume** (conversão e temperatura), não no tempo: testa a figura de perfil.
- **Uma comparação com solução analítica** (o caso isotérmico), que serve de verificação natural.

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | Temperatura em °C, Arrhenius em K | Conversão para kelvin, dita no código | k absurdo, conversão que não anda ou dispara |
| 2 | E em kJ/mol, R em J/(mol·K) | Unidades consistentes, explicadas | Fator 1000 no expoente |
| 3 | k dado numa temperatura de referência, sem k₀ | Arrhenius na forma com temperatura de referência | Inventar um k₀ "de literatura" |
| 4 | Reator adiabático | Balanço de energia deduzido, com a hipótese adiabática e o que mudaria com troca térmica | Temperatura tratada como constante |
| 5 | Relação linear T = T₀ + ΔT_ad·X | Usada como verificação independente da integração (ou como redução do sistema, explicada) | Nenhuma conferência |
| 6 | Pergunta "que volume" | Evento que para a integração em X = 0,9, ou raiz na solução densa | Volume lido no gráfico |
| 7 | Comparação isotérmica | Fórmula fechada V = (v₀/k)·ln 10, usada para mostrar o ganho do aquecimento | Integrar de novo sem perceber que há fórmula |

## Gabarito

Guardado fora do repositório até a sessão de teste terminar, para que ela não o encontre; acrescentado aqui depois.
