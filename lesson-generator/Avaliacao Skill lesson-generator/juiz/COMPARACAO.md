# Instruções da comparação

Você vai comparar duas lições geradas pela skill `lesson-generator` para o mesmo exercício. Cada lição ensina um aluno de engenharia química, que **não sabe programar**, a resolver o exercício em Python. Você não sabe que modelo escreveu cada lição, e isso não importa.

Esta comparação é independente da lista de itens do `JUIZ.md`: aqui não há lista. O que se pede é o seu juízo de conjunto, que capta o que uma lista não enxerga.

## O que fazer

1. Leia o pacote indicado em `juiz/pares/pendentes/<código>.md`: o enunciado e as duas lições em texto, marcadas `LIÇÃO 1` e `LIÇÃO 2`.
2. Leia as duas inteiras antes de decidir.
3. Não abra nenhum outro arquivo além deste e do pacote. Fora da pasta `juiz/` está escrito que modelo gerou cada lição.

No texto, `⟦…⟧` é uma equação escrita em linha, `{…}` dentro dela é o rótulo de um termo, e `[purpose]`, `[how]`, `[so-far]`, `[answer]` etc. marcam as partes da lição.

## A pergunta

**Com qual das duas um aluno que nunca programou aprenderia melhor a resolver este exercício, a ponto de entender cada passo e conseguir refazê-lo sozinho?**

Pese, nesta ordem:

1. **Correção.** Uma afirmação falsa (de engenharia, de Python, um número que contradiz o programa, uma resposta errada) ensina errado e pesa mais do que qualquer omissão.
2. **O raciocínio do modelo.** O aluno entende de onde sai cada equação, por que as hipóteses valem e por que a técnica numérica serve para este caso?
3. **O código.** O aluno entende o que cada passo faz e por quê, inclusive as funções de biblioteca e os argumentos, sem precisar saber programar antes?
4. **O resultado.** As respostas estão claras, e a leitura dos números e da figura é deste exercício, e não frases que serviriam a qualquer um?

## Cuidados

- **Tamanho não é qualidade.** A lição mais longa só ganha se o que ela tem a mais ensina algo. Repetição, rodeio e explicação do óbvio contam contra, porque gastam a atenção do aluno.
- **A posição não diz nada.** A ordem 1 e 2 foi sorteada.
- **Não julgue o visual**: você só tem o texto. Também não julgue a escolha da técnica, se as duas resolvem o exercício corretamente.
- **Empate** só quando, depois de reler, você honestamente não sabe dizer qual ensinaria melhor. Uma diferença pequena, mas clara, é uma vitória.

## Formato da resposta

Grave `juiz/pares/respostas/<código>.json`:

```json
{
 "melhor": "2",
 "por_que": "A lição 2 explica de onde sai cada balanço e o que faz cada argumento de solve; a lição 1 afirma que a matriz é simétrica, o que é falso, e não interpreta a figura."
}
```

`melhor` é `"1"`, `"2"` ou `"empate"`. Em `por_que`, de duas a quatro frases com as diferenças concretas que decidiram, citando o que cada lição faz. Nada além do JSON no arquivo.
