# Exemplo — uma sessão inteira

Como uma sessão corre, do enunciado ao arquivo aberto. Um exemplo só, de propósito: o resto está no formato.

## O que o aluno manda

> "Um microrganismo cresce em batelada sobre glicose, com Monod. μmax = 0,4 h⁻¹, Ks = 1,0 g/L, Yx/s = 0,5 gX/gS, X0 = 0,1 g/L, S0 = 20 g/L. Escreva o sistema de EDOs, simule 24 h e diga quando o substrato acaba."

## O que acontece em silêncio

**Diagnóstico:** batelada, estados X e S, todos os parâmetros dados, nenhuma suposição necessária. O que ele quer de fato é o código rodando e o instante de esgotamento.

**Código escrito e rodado antes da lição**, com `solve_ivp`, evento em S = 0,01 g/L e `rtol=1e-8`. Sai: X final **10,10 g/L**, substrato esgotado em **≈ 7,9 h**. Confere fora do integrador: X₀ + Yx/s·S₀ = 0,1 + 0,5×20 = 10,1. Os dois batendo é o que autoriza publicar o número.

Nada é perguntado ao aluno, e nada é gravado além do arquivo.

## A lição

`aula-fermentacao/batelada-com-monod.html`, cerca de 900 palavras.

**Teoria** — as três equações em MathML, cada termo anotado, a tabela com os cinco parâmetros e suas unidades, e duas frases dizendo que μ depende de S e é isso que faz a exponencial virar platô. Nada mais: ele já viu Monod.

**Código** — quatro passos, revelados um a um:

1. *Parâmetros e estado inicial* — por que o estado vai numa lista só: `solve_ivp` integra vetor, não variáveis soltas.
2. *A função de derivadas* — por que `(t, y)` nessa ordem, e por que `Yx/s` divide em vez de multiplicar.
3. *O evento que marca o esgotamento* — por que capturar o instante por evento em vez de procurar no gráfico: o evento dá o número exato, o olho dá o pixel.
4. *A integração e o gráfico* — por que `t_eval` denso não muda a integração, só a saída, e por que os eixos levam unidade.

Depois do quarto passo aparecem o programa completo, colapsado e com botão de copiar, e a resposta atrás de um botão.

**Análise crítica** — o simulador com dois controles, `mu_max` e `S0`, e três observações:

- S despenca quase na vertical no fim, em vez de cair em rampa, porque enquanto S ≫ Ks o fator de Monod vale praticamente 1 e o consumo acelera junto com X;
- X para de crescer exatamente onde S chega a zero, e o platô em 10,1 g/L é balanço de massa, não cinética;
- *"dobre μmax e veja o esgotamento cair para perto de 4 h, com o mesmo platô de X — a velocidade muda, a colheita não."*

Nenhuma frase dessas serviria para outro exercício. É esse o teste.

## O que vai para o chat

> "Escrevi em `./aula-fermentacao/batelada-com-monod.html` e abri para você.
> Qualquer coisa que ficar obscura, pergunta aqui que eu enxerto a resposta no próprio arquivo."

Duas linhas. O resto está na lição.

## O que não aconteceu

- Nenhuma pergunta ao aluno, em nenhum momento.
- Nenhum arquivo além do HTML e da cópia de `assets/`.
- Nenhuma lista de hipóteses do modelo na análise crítica — ela fala das curvas deste caso, não do que o modelo ignora.
- Nenhuma promessa de próxima lição.
