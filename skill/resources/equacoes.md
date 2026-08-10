# Equações e Modelos Típicos de Fermentação

## 1) Crescimento celular (Monod)
\[
\mu(S) = \mu_{max}\frac{S}{K_s + S}
\]

## 2) Balanços em batelada
\[
\frac{dX}{dt} = \mu X
\]
\[
\frac{dS}{dt} = -\frac{1}{Y_{X/S}}\frac{dX}{dt}
\]
\[
\frac{dP}{dt} = Y_{P/X}\frac{dX}{dt}
\]

## 3) Balanços em contínuo (quimiostato)
\[
\frac{dX}{dt} = (\mu - D)X
\]
\[
\frac{dS}{dt} = D(S_{in} - S) - \frac{1}{Y_{X/S}}\mu X
\]
\[
\frac{dP}{dt} = -DP + Y_{P/X}\mu X
\]

## 4) Observações
- Ajuste de modelo depende do microrganismo e do objetivo do estudo.
- Em nível introdutório, relações de rendimento constantes são comuns.
