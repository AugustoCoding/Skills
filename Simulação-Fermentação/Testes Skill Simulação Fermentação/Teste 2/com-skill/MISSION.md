# Missão: Simulação de Fermentação

> Inferida dos exercícios trazidos pelo aluno. Não foi confirmada com ele — o que
> estiver errado aqui se corrige sozinho conforme chegam exercícios novos.

## Por que
Dimensionar e defender decisões de operação de propagação de levedura em linguagem
de usina sucroalcooleira — vazão de alimentação, tempo de enchimento, massa de
fermento produzida —, usando simulação em Python como ferramenta de argumento.
O aluno não pede "a resposta": pede o número **e** a defesa dele.
*(inferido em 30/08, do exercício da dorna de propagação de 5 L: vocabulário
industrial — dorna, mosto, ART, levedura, rendimento em levedura — combinado com
parâmetros de livro-texto redondos e Monod dado de graça. Confiança média: pode ser
disciplina de Engenharia Bioquímica com recheio industrial, ou estágio em usina.)*

## Sucesso é
- Escrever do zero, em Python, o sistema de EDOs de uma batelada alimentada com
  volume variável, incluindo o termo de diluição que quase todo mundo esquece.
- Justificar uma vazão de alimentação com número, não com adjetivo: dizer o que
  acontece com o açúcar residual se ela dobrar.
- Usar evento em `solve_ivp` para capturar o instante exato em que a dorna enche,
  em vez de ler no gráfico.
- Perceber quando o modelo não é capaz de punir a decisão ruim — aqui, um modelo
  sem etanol e sem oxigênio não cobra o preço do açúcar acumulado.

## Restrições
- Régua: defesa de escolha de processo + código rodando + gráfico legível.
  ("Preciso escolher a vazão e defender a escolha", "quero simular isso em Python".)
- Ambiente Python não declarado. A lição assume apenas `numpy`, `scipy` e
  `matplotlib`, sem nada exótico.
- Nível de matemática: aceita EDO acoplada; o enunciado já vem com Monod montado,
  então o gargalo provável é o balanço com volume variável, não a cinética.

## Fora de escopo
- Transferência de oxigênio e kLa (aparece só como crítica ao modelo).
- Modelo estruturado, efeito Crabtree quantitativo, scale-up.
- Ajuste de parâmetros a dados experimentais — nenhum exercício trouxe dados ainda.
