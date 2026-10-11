# Teste 14 — o exercício

**Não vai para o modelo.** Para o modelo vai só o prompt do [SESSAO.md](./SESSAO.md).

## Enunciado

O mesmo exercício nos dois idiomas.

> **en.** Water at 20 °C (density 998 kg/m³, viscosity 1.002 mPa·s) flows at 5 L/s through 100 m of commercial steel pipe with an internal diameter of 50 mm and an absolute roughness of 0.045 mm. Calculate the Darcy friction factor and the pressure drop along the pipe. What flow rate would give a pressure drop of 50 kPa?

> **pt.** Água a 20 °C (densidade 998 kg/m³, viscosidade 1,002 mPa·s) escoa a 5 L/s por 100 m de tubo de aço comercial com diâmetro interno de 50 mm e rugosidade absoluta de 0,045 mm. Calcule o fator de atrito de Darcy e a perda de pressão ao longo do tubo. Que vazão daria uma perda de pressão de 50 kPa?

## Por que este exercício

- **A skill em inglês, pela primeira vez** (`6997737`): o modelo lê instruções em inglês e escreve a lição no idioma do enunciado. Os dois enunciados mostram se a lição em português sai inteira em português (texto, `lang`, vírgula decimal, rótulos) e se a em inglês sai inteira em inglês.
- **Mecânica dos fluidos**, uma área que nenhum teste usou, e sem balanço de massa com reação: testa se a dedução se adapta a um balanço de energia mecânica.
- **Raiz dentro de raiz**: Colebrook é implícita em f, e a vazão para 50 kPa é outra raiz. Não há fórmula fechada exata, mas há a aproximação explícita de Swamee-Jain, boa como conferência. Testa a regra nova de que, havendo fórmula fechada, ela é a técnica: aqui ela não é exata, então a técnica é a busca de raiz.

## Armadilhas plantadas

| # | Armadilha | O que deve provocar | O erro que denuncia |
|---|---|---|---|
| 1 | Regime de escoamento | Calcular Re e constatar que é turbulento | Usar f = 64/Re |
| 2 | Colebrook é implícita | Busca de raiz em f (ou iteração de ponto fixo explicada) | Tentativa e erro manual, ou só Swamee-Jain |
| 3 | Unidades | mm → m, L/s → m³/s, mPa·s → Pa·s | Fator mil |
| 4 | Darcy, não Fanning | f de Darcy na equação de Darcy-Weisbach | Fator 4 |
| 5 | Vazão para 50 kPa | Uma segunda raiz, com f recalculado a cada vazão | Usar o f da vazão original |
| 6 | Verificação | Swamee-Jain, ou a perda de pressão recalculada com a vazão achada | Nenhuma conferência |
| 7 | Idioma | Lição inteira no idioma do enunciado, `lang` coerente, separador decimal do idioma | Mistura de idiomas, `lang` errado, ponto decimal no texto em português |

## Gabarito

Guardado fora do repositório até as sessões terminarem; acrescentado aqui depois.
