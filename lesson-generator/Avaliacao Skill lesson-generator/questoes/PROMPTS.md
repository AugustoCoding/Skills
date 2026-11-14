# Prompts da avaliação

Gerado por `scripts/preparar.py` a partir de `questoes.json`: não edite à mão. Cole o bloco inteiro como primeira mensagem de uma sessão nova, numa pasta vazia.

## Q01 · bloco A · Balanços de massa

```text
/lesson-generator Um ácido misto residual de nitração contém, em massa, 22% de HNO3, 56% de H2SO4 e 22% de água. Deseja-se obter 1500 kg de um ácido misto com 28% de HNO3, 60% de H2SO4 e 12% de água, misturando o ácido residual com ácido nítrico concentrado (90% de HNO3 e 10% de água) e ácido sulfúrico concentrado (96% de H2SO4 e 4% de água). Calcule a massa, em kg, de cada uma das três correntes: ácido residual, ácido nítrico concentrado e ácido sulfúrico concentrado.
```

## Q02 · bloco A · Termodinâmica

```text
/lesson-generator Carbon dioxide is stored at 320 K and 80 bar. Using the Peng–Robinson equation of state (Tc = 304.13 K, Pc = 73.77 bar, acentric factor ω = 0.224, molar mass 44.01 g/mol, R = 8.314 J/(mol·K)), calculate the compressibility factor, the molar volume in cm³/mol and the density in kg/m³. What molar volume, in cm³/mol, would the ideal gas law give at the same conditions?
```

## Q03 · bloco A · Termodinâmica (equilíbrio químico)

```text
/lesson-generator Na reforma a vapor do metano ocorrem duas reações em fase gasosa: CH4 + H2O ⇌ CO + 3 H2, com K1 = 26,0, e CO + H2O ⇌ CO2 + H2, com K2 = 1,40. As constantes de equilíbrio valem a 1000 K, para pressões parciais em bar (gás ideal, estado padrão de 1 bar). O reator é alimentado com 1 mol de CH4 e 3 mol de H2O e opera a 1000 K e 5 bar. Calcule, no equilíbrio, o grau de avanço de cada reação (em mol), a conversão do metano (em %) e a fração molar de H2 na mistura.
```

## Q04 · bloco A · Mecânica dos fluidos

```text
/lesson-generator Um tanque cilíndrico vertical de 1,2 m de diâmetro recebe 1,5 L/s de água e descarrega por um orifício de 2,5 cm de diâmetro no fundo, com coeficiente de descarga 0,62 (g = 9,81 m/s²). No instante inicial, o nível é de 0,50 m. Calcule o nível de estado estacionário (m), o nível após 10 min (m) e o tempo, em minutos, para o nível chegar a 1,00 m.
```

## Q05 · bloco A · Transferência de calor

```text
/lesson-generator Uma placa de aço inoxidável de 4,0 cm de espessura (k = 15 W/(m·K), ρ = 7900 kg/m³, cp = 500 J/(kg·K)), inicialmente a 500 °C em toda a espessura, é mergulhada num banho de óleo a 60 °C, com coeficiente de convecção de 400 W/(m²·K) nas duas faces. Considere condução unidimensional na espessura. Calcule a temperatura no centro e na superfície da placa após 120 s (°C) e o tempo, em segundos, para o centro chegar a 150 °C.
```

## Q06 · bloco A · Transferência de calor (projeto econômico)

```text
/lesson-generator Um tubo de vapor de 100 m de comprimento e 10 cm de diâmetro externo tem a superfície a 180 °C e atravessa um ambiente a 25 °C, com coeficiente de convecção externo de 10 W/(m²·K), suposto o mesmo com ou sem isolamento. O tubo será coberto com um isolante de condutividade térmica 0,05 W/(m·K). O calor perdido custa R$ 0,15 por kWh, e o tubo opera 8000 h por ano. O isolante instalado custa R$ 1800 por m³, e 20% desse investimento é contado como custo anual. Despreze a radiação e a resistência da parede do tubo. Calcule a espessura de isolante (cm) que minimiza o custo anual total, a perda de calor com essa espessura (kW), o custo anual total mínimo (R$/ano) e o custo anual da perda de calor do tubo sem isolamento (R$/ano).
```

## Q07 · bloco A · Transferência de massa (absorção)

```text
/lesson-generator Uma coluna de recheio absorve um soluto de uma corrente gasosa com um solvente puro, em contracorrente. Em razões molares (mol de soluto por mol de inerte), o gás entra com Y = 0,080 e deve sair com Y = 0,008. A razão entre as vazões molares de solvente e de gás inerte é L/G = 2,2, e o equilíbrio é Y* = 1,5 X + 12 X². A altura de uma unidade de transferência global do gás é H_OG = 0,60 m. Calcule a razão molar do soluto no líquido de saída, a razão L/G mínima, o número de unidades de transferência N_OG = ∫ dY/(Y − Y*) e a altura de recheio (m).
```

## Q08 · bloco A · Operações unitárias (destilação)

```text
/lesson-generator Uma mistura equimolar de benzeno e tolueno, alimentada como líquido saturado, é destilada numa coluna com condensador total para dar um destilado com 95% molar de benzeno e um produto de fundo com 5% molar de benzeno. A volatilidade relativa é constante e igual a 2,5, e a razão de refluxo é 1,5 vez a mínima. Pelo método de McCabe–Thiele, calcule a razão de refluxo mínima, a razão de refluxo de operação, o número de estágios teóricos e o estágio de alimentação. Trace os degraus a partir do topo (x = x_D), passando para a linha de esgotamento a partir do primeiro degrau cujo líquido tenha x ≤ z_F (esse é o estágio de alimentação), e conte os degraus inteiros até o primeiro com x ≤ x_B (o refervedor está incluído na contagem).
```

## Q09 · bloco A · Reatores (batelada não isotérmica)

```text
/lesson-generator An exothermic liquid-phase reaction A → B, first order in A, is carried out in a jacketed batch reactor. The rate constant is k = 6.0×10⁶ exp(−E/(RT)) s⁻¹, with E = 60 kJ/mol and R = 8.314 J/(mol·K). The initial concentration of A is 2000 mol/m³, the heat of reaction is −80 kJ/mol, and the volumetric heat capacity of the mixture is ρ·cp = 4.0×10⁶ J/(m³·K). The jacket stays at 300 K and removes heat with UA/V = 2000 W/(m³·K). The reactor starts at 320 K. Calculate the maximum temperature (K) and the time at which it occurs (min), the conversion after 30 min (%) and the time to reach 95% conversion (min).
```

## Q10 · bloco A · Cinética química

```text
/lesson-generator A constante de velocidade de uma reação de primeira ordem foi medida em cinco temperaturas: 30 °C, 0,0082 min⁻¹; 40 °C, 0,0205 min⁻¹; 50 °C, 0,0512 min⁻¹; 60 °C, 0,1130 min⁻¹; 70 °C, 0,2510 min⁻¹. Ajuste a equação de Arrhenius por regressão linear de ln k contra 1/T (T em kelvin, R = 8,314 J/(mol·K)). Calcule a energia de ativação (kJ/mol), ln A (com A em min⁻¹), o coeficiente de determinação R² do ajuste e a constante de velocidade prevista a 85 °C (min⁻¹).
```

## Q11 · bloco A · Controle de processos

```text
/lesson-generator Um tanque aquecido se comporta como um processo de primeira ordem: τ dT/dt = −(T − T0) + Kp·u, com τ = 10 min, Kp = 0,8 °C/% e T0 = 50 °C, em que u é a variação da saída do controlador, em %. Um controlador PI, u = Kc [e + (1/τI) ∫e dt], com e = Tsp − T, Kc = 5 %/°C e τI = 2 min, mantém o tanque a 50 °C. No instante zero, o setpoint Tsp passa de 50 °C para 60 °C. Calcule a temperatura máxima atingida (°C), o instante em que ela ocorre (min), o sobressinal (em % do degrau) e a temperatura 3 min após o degrau (°C).
```

## Q12 · bloco A · Operações unitárias (secagem)

```text
/lesson-generator Num ensaio de secagem de um sólido em bandeja, a taxa de secagem R, em kg de água/(m²·h), foi medida em função da umidade X, em kg de água por kg de sólido seco. Para X = 0,40; 0,35; 0,30; 0,25; 0,20; 0,15; 0,10 e 0,05, as taxas foram R = 1,50; 1,50; 1,50; 1,50; 1,20; 0,90; 0,55 e 0,25. A carga é de 20 kg de sólido seco por m² de superfície de secagem, e o tempo de secagem é t = (m_s/A) ∫ dX/R. Usando a regra dos trapézios sobre os pontos da tabela, calcule o tempo no período de taxa constante (de X = 0,40 a 0,25), o tempo no período de taxa decrescente (de X = 0,25 a 0,05) e o tempo total, em horas.
```

## Q13 · bloco B · Termodinâmica (equilíbrio líquido-vapor)

```text
/lesson-generator Uma mistura líquida com 40% molar de n-hexano e 60% de n-heptano está a 760 mmHg. Considere a lei de Raoult e a equação de Antoine, log10 Psat = A − B/(T + C), com Psat em mmHg e T em °C: para o n-hexano, A = 6,87776, B = 1171,530 e C = 224,366; para o n-heptano, A = 6,90240, B = 1268,115 e C = 216,900. Calcule a temperatura de bolha (°C) e a fração molar de n-hexano no primeiro vapor formado. Para um vapor com a mesma composição global (40% de n-hexano), calcule a temperatura de orvalho (°C) e a fração molar de n-hexano na primeira gota de líquido.
```

## Q14 · bloco B · Mecânica dos fluidos (sistemas particulados)

```text
/lesson-generator Esferas de vidro de 0,50 mm de diâmetro (ρ = 2500 kg/m³) sedimentam em água (ρ = 998 kg/m³, μ = 1,0·10⁻³ Pa·s; g = 9,81 m/s²). O coeficiente de arrasto segue a correlação de Schiller–Naumann, C_D = (24/Re)(1 + 0,15 Re^0,687). Calcule a velocidade terminal (cm/s), o número de Reynolds da partícula nessa velocidade e a velocidade que a lei de Stokes daria (cm/s). Que diâmetro de esfera (mm) tem velocidade terminal de 2,0 cm/s?
```

## Q15 · bloco B · Termodinâmica (psicrometria)

```text
/lesson-generator Ar úmido está a 32 °C, com umidade relativa de 55% e pressão total de 101,325 kPa. A pressão de vapor da água é dada por log10 Psat = 8,07131 − 1730,63/(233,426 + T), com Psat em mmHg e T em °C (760 mmHg = 101,325 kPa). Calcule a umidade absoluta (kg de água por kg de ar seco), a temperatura de orvalho (°C) e a entalpia do ar, h = 1,006 T + W (2501 + 1,86 T), em kJ por kg de ar seco. Se esse ar for resfriado até 15 °C e sair saturado, quanta água condensa, em gramas por kg de ar seco?
```

## Q16 · bloco B · Transferência de calor (superfícies estendidas)

```text
/lesson-generator Uma aleta em forma de pino, de alumínio (k = 200 W/(m·K)), com 8 mm de diâmetro e 10 cm de comprimento, tem a base a 600 K e troca calor com o ar e com a vizinhança, ambos a 300 K, por convecção (h = 15 W/(m²·K)) e por radiação (emissividade 0,8; σ = 5,67·10⁻⁸ W/(m²·K⁴)). A ponta é adiabática e a condução é unidimensional. Calcule a temperatura da ponta (K) e a taxa de calor dissipada pela aleta (W). Sem a radiação, quais seriam a taxa de calor (W) e a temperatura da ponta (K)?
```

## Q17 · bloco B · Transferência de massa (absorção em estágios)

```text
/lesson-generator Uma coluna de pratos absorve um soluto diluído de um gás com um solvente puro, em contracorrente. O equilíbrio é y = 1,2 x e a razão molar entre líquido e gás é L/G = 1,8, ambos constantes. Deseja-se recuperar 95% do soluto. Pela equação de Kremser, calcule o fator de absorção, o número de estágios teóricos (com decimais), o número inteiro de estágios a instalar e a recuperação obtida com esse número inteiro (%). Qual é a razão L/G mínima para essa recuperação?
```

## Q18 · bloco B · Operações unitárias (evaporação)

```text
/lesson-generator Um evaporador de duplo efeito com alimentação direta concentra 10 000 kg/h de uma solução de 10% para 40% em massa de sólidos. A alimentação entra a 60 °C no primeiro efeito, que é aquecido com vapor saturado a 120 °C; o segundo efeito opera a 50 °C. Os coeficientes globais de troca são 2,5 kW/(m²·K) no primeiro efeito e 1,5 kW/(m²·K) no segundo, e os dois efeitos têm a mesma área. Despreze a elevação do ponto de ebulição. Adote calor específico de 4,0 kJ/(kg·K) para todas as correntes líquidas e calor latente de vaporização λ = 2501 − 2,4 T kJ/kg (T em °C), que vale também para o vapor de aquecimento; os condensados saem saturados. Calcule a temperatura do primeiro efeito (°C), a área de cada efeito (m²), o consumo de vapor de aquecimento (kg/h), a água evaporada no primeiro efeito (kg/h) e a economia (kg de água evaporada por kg de vapor de aquecimento).
```

## Q19 · bloco B · Reatores (CSTR não isotérmico)

```text
/lesson-generator Num CSTR com camisa ocorre a reação exotérmica de primeira ordem A → B, com k = 7,2·10¹⁰ exp(−8750/T) min⁻¹ (T em K). Dados: vazão de 100 L/min, volume de 100 L, concentração de A na alimentação de 1,0 mol/L, alimentação a 350 K, camisa a 300 K, calor de reação de −5,0·10⁴ J/mol, massa específica de 1000 g/L, calor específico de 0,239 J/(g·K) e UA = 5,0·10⁴ J/(min·K). O reator tem três estados estacionários. Calcule a temperatura de cada um (K) e a conversão de A nos estados de menor e de maior temperatura (%).
```

## Q20 · bloco B · Reatores (leito fixo com perda de carga)

```text
/lesson-generator A reação em fase gasosa A → 2 B, de primeira ordem (−r'A = k C_A, com k = 1,0·10⁻³ m³/(kg de catalisador·s)), ocorre num reator de leito fixo isotérmico a 500 K. A alimentação é A puro, a 10 bar, com 5,0 mol/s (gás ideal, R = 8,314 J/(mol·K)). A perda de carga segue dy/dW = −α (1 + εX)/(2y), com y = P/P0, ε a variação relativa do número de mols na conversão completa e α = 0,005 kg⁻¹. Calcule a massa de catalisador para 80% de conversão (kg), a pressão na saída do leito (bar) e a massa de catalisador que seria necessária sem perda de carga (kg).
```

## Q21 · bloco B · Engenharia bioquímica (cinética enzimática)

```text
/lesson-generator The initial rate of an enzymatic reaction was measured at seven substrate concentrations: S = 0.5, 1.0, 2.0, 4.0, 8.0, 16.0 and 32.0 mM gave v = 1.65, 3.10, 4.70, 7.05, 8.60, 10.20 and 10.85 µmol/min. Fit the Michaelis–Menten equation, v = Vmax·S/(Km + S), by nonlinear least squares on v, and calculate Vmax (µmol/min), Km (mM) and the rate predicted at S = 5.0 mM (µmol/min). For comparison, calculate Vmax and Km from the Lineweaver–Burk linearization (unweighted linear regression of 1/v against 1/S).
```

## Q22 · bloco B · Controle de processos (dinâmica de processos)

```text
/lesson-generator Dois tanques cilíndricos estão ligados em série por uma válvula: o tanque 1 (área de 2,0 m²) recebe a alimentação e escoa para o tanque 2 (área de 1,5 m²) com vazão q1 = 0,8 √(h1 − h2); o tanque 2 descarrega com vazão q2 = 0,6 √h2 (vazões em m³/min, níveis em m). O sistema está em estado estacionário com alimentação de 0,6 m³/min quando, no instante zero, a alimentação passa para 0,9 m³/min. Calcule os novos níveis de estado estacionário dos dois tanques (m), o nível do tanque 2 após 10 min (m) e o tempo para o nível do tanque 2 chegar a 2,0 m (min).
```

## Q23 · bloco B · Engenharia bioquímica (biorreatores)

```text
/lesson-generator Um quimiostato é alimentado com substrato a 20 g/L. O crescimento segue Monod, com μmax = 0,45 h⁻¹ e Ks = 0,8 g/L, e o rendimento de células em substrato é 0,5 g/g; a alimentação é estéril e não há morte celular. Para uma taxa de diluição de 0,30 h⁻¹, calcule as concentrações de substrato e de células no estado estacionário (g/L). Calcule também a taxa de diluição de lavagem (h⁻¹), a taxa de diluição que maximiza a produtividade de células D·X (h⁻¹) e essa produtividade máxima (g/(L·h)).
```

## Q24 · bloco B · Balanços de energia (combustão)

```text
/lesson-generator Methane is burned completely with 20% excess dry air (21% O2 and 79% N2, molar) in an adiabatic combustor; fuel and air enter at 298.15 K. The heat of combustion at 298.15 K, with water as vapor, is −802.6 kJ per mol of CH4. The ideal-gas heat capacities follow Cp/R = A + B·T + D/T² (T in K, R = 8.314 J/(mol·K)): for CO2, A = 5.457, B = 1.045×10⁻³ and D = −1.157×10⁵; for H2O, A = 3.470, B = 1.450×10⁻³ and D = 0.121×10⁵; for N2, A = 3.280, B = 0.593×10⁻³ and D = 0.040×10⁵; for O2, A = 3.639, B = 0.506×10⁻³ and D = −0.227×10⁵. Calculate the adiabatic flame temperature (K). What would it be with 100% excess air (K)? What percentage of excess air gives a flame temperature of 1500 K?
```
