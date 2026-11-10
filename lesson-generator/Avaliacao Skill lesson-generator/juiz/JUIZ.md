# Instruções do juiz

Você vai julgar lições geradas pela skill `lesson-generator`. Cada lição ensina um aluno de engenharia química, que **não sabe programar**, a resolver um exercício em Python. Você não sabe que modelo escreveu cada lição, e isso não importa para o julgamento.

## O que fazer

1. Liste `juiz/pendentes/`. Cada arquivo `<código>.md` é um pacote: o enunciado, a lista de itens a julgar e a lição em texto.
2. Julgue só os pacotes que ainda não têm `juiz/respostas/<código>.json`.
3. Julgue **um pacote por vez**, sem comparar lições entre si, e grave a resposta antes de abrir o próximo.
4. Leia apenas a pasta `juiz/`. Não abra `execucoes/`, `questoes/` nem `resultados/`: lá está escrito que modelo gerou cada lição.

No texto do pacote, `⟦…⟧` é uma equação escrita em linha, `{…}` dentro dela é o rótulo de um termo, e `[purpose]`, `[how]`, `[so-far]`, `[answer]` etc. marcam as partes da lição.

## Os estados

Para cada item da lista, um destes:

| Estado | Quando |
|---|---|
| `ok` | A lição explica o que o item pede, e a explicação está certa |
| `errado` | A lição explica, mas a explicação afirma algo falso: unidade errada, descrição errada do que um argumento faz, número que contradiz o programa, conceito de engenharia ou de Python errado |
| `faltou` | A lição não explica, ou só menciona sem explicar |
| `na` | O item não se aplica: o "símbolo" é um operador ou um índice, a construção não existe de fato no programa |

## A régua

- **O leitor é iniciante.** "Explicado" quer dizer que alguém que nunca programou entenderia o que é e para que serve ali. Citar o nome não é explicar. `rtol=1e-8` com "a tolerância" não basta; com "o erro relativo que o integrador aceita em cada passo, aqui uma parte em cem milhões" basta.
- **Explicado em qualquer lugar razoável.** Um símbolo pode ser definido na lista sob a equação, no enunciado ou na tabela de parâmetros, desde que antes ou junto do primeiro uso. Um argumento pode ser explicado no texto do passo ou num comentário do código.
- **Símbolo**: precisa do que é (em frase, não só o nome da grandeza), de onde (no reator, na alimentação…) quando isso distingue, e da unidade. Grandeza adimensional não precisa de unidade.
- **Argumento de função**: precisa do que é e de por que tem aquele valor neste programa.
- **Mecanismo**: quando uma função do aluno é entregue a uma função de biblioteca, a lição precisa dizer quem a chama, que é chamada muitas vezes, com que valores em cada argumento e o que é feito com o que ela devolve. Faltando metade disso, `faltou`.
- **Verificação independente**: recolocar o resultado na mesma equação de onde ele saiu não é independente. Outro método, um caso limite com solução conhecida ou um balanço que fecha são.
- **Observação ancorada**: cita um valor, um instante ou um trecho da curva deste exercício. Uma frase que serviria a qualquer exercício do mesmo tipo é `faltou`.
- **Resposta** (itens `R.resposta.*`): o pacote traz o valor esperado e a tolerância. `ok` se a resposta da lição traz o valor certo, mesmo em outra unidade ou com outro arredondamento compatível; `errado` se traz outro valor; `faltou` se não responde àquela pergunta no quadro da resposta.
- **Na dúvida entre `ok` e `faltou`**, releia o trecho; se continuar em dúvida, `faltou`. Na dúvida entre `ok` e `errado`, `ok`: `errado` exige que você saiba dizer o que está falso.
- Não julgue estilo, tamanho nem escolha de técnica: só o que cada item pergunta.

## Outros erros

Depois dos itens, registre em `outros_erros` todo erro **factual** que você achou na lição e que nenhum item cobre: uma afirmação de engenharia falsa, uma conta errada, uma descrição errada do que o código faz, um número no texto que contradiz outro. Um por entrada, com a seção (`M` modelo, `C` código, `R` resultado), o trecho (até quinze palavras, copiadas) e o que está errado. Se não achou nenhum, lista vazia. Não invente para preencher.

## Formato da resposta

Grave `juiz/respostas/<código>.json`, com **todos** os itens do pacote:

```json
{
 "itens": {
  "M.simbolo.C_A": "ok",
  "C.arg.solve_ivp.rtol": "faltou",
  "C.funcao.np.exp": "errado"
 },
 "notas": {
  "C.funcao.np.exp": "diz que np.exp calcula a potência de base 10"
 },
 "outros_erros": [
  {"secao": "R", "trecho": "a temperatura sobe 40 K até a saída", "erro": "o programa imprime 32,5 K"}
 ]
}
```

Em `notas`, uma linha para cada item `errado` (obrigatória) e para cada `na` (opcional). Nada além do JSON no arquivo.
