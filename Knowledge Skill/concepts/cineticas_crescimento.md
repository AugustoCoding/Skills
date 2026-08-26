# Cinéticas de Crescimento Microbiano

## Modelo de Monod

\[\mu = \mu_{max}\frac{S}{K_S+S}\]

- \(\mu\): taxa específica de crescimento
- \(\mu_{max}\): taxa máxima específica de crescimento
- \(S\): concentração do substrato limitante
- \(K_S\): constante de saturação

O modelo de Monod é um ponto de partida para representar crescimento limitado por substrato em cultivos de batelada e contínuos.

## Inibição por substrato

Uma forma usual do modelo de Haldane é:

\[\mu = \mu_{max}\frac{S}{K_S+S+S^2/K_I}\]

Use-o quando concentrações elevadas de substrato reduzirem o crescimento.

## Formação de produto

O modelo de Luedeking-Piret separa contribuições associadas e não associadas ao crescimento:

\[\frac{dP}{dt}=\alpha\frac{dX}{dt}+\beta X\]

- \(\alpha\): contribuição associada ao crescimento
- \(\beta\): contribuição não associada ao crescimento

## Boas práticas

- Ajuste parâmetros a dados experimentais e reporte unidades.
- Verifique identificabilidade dos parâmetros antes de interpretar o ajuste.
- Considere limitações por oxigênio, pH, temperatura e produto quando o Monod simples não representar os dados.