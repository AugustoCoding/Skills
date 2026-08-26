# Balanços de Massa em Biorreatores

## Forma geral

\[\frac{d(VC)}{dt}=F_{in}C_{in}-F_{out}C_{out}+rV\]

## Batelada

Para volume constante e sem correntes de entrada ou saída:

\[\frac{dX}{dt}=\mu X\]
\[\frac{dS}{dt}=-\frac{1}{Y_{X/S}}\mu X-m_SX\]
\[\frac{dP}{dt}=\alpha\mu X+\beta X\]

## Batelada alimentada

Com alimentação sem retirada:

\[\frac{dV}{dt}=F\]
\[\frac{dX}{dt}=\mu X-\frac{F}{V}X\]
\[\frac{dS}{dt}=\frac{F}{V}(S_{in}-S)-\frac{1}{Y_{X/S}}\mu X-m_SX\]

## Contínuo

Definindo a taxa de diluição como \(D=F/V\):

\[\frac{dX}{dt}=(\mu-D)X\]
\[\frac{dS}{dt}=D(S_{in}-S)-\frac{1}{Y_{X/S}}\mu X-m_SX\]

No estado estacionário com biomassa positiva, \(\mu=D\). O washout ocorre quando a diluição excede a capacidade de crescimento nas condições do processo.