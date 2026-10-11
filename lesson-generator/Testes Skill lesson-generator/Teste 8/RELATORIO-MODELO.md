# Relatório da execução: Teste 8, com a skill

Exercício: flash de propano, n-butano e n-pentano a 10 bar e 67 °C, com Rachford-Rice e a faixa entre os pontos de bolha e de orvalho.
Lição entregue: `com-skill/flash-de-tres-componentes.html` (106 KB, arquivo único).

## Tempo e tokens

- Tempo total: não sei.
- Tokens: não sei.

## Arquivos da skill que li, e por quê

| Arquivo | Por quê |
|---|---|
| `SKILL.md` (carregado pelo `/lesson-generator`) | São as instruções da skill. |
| `templates/licao.html`, pela cópia no rascunho (li com `cat`) | Para saber o que preencher. Não li o original em `templates/`, só a cópia que o `nova_licao.py` pôs no rascunho. |
| `templates/pecas.html` (inteiro) | O SKILL.md manda copiar dele os balanços e a figura. Eu queria a peça "separador em estado estacionário" e uma figura que servisse para a varredura em T com raiz. |
| `entrega.txt` do rascunho e a lista de `assets/` | Só para ver o que o script tinha criado. O conteúdo de `assets/` não li, como o SKILL.md manda. |

Não li `grafico.js`. A API (`Grafico.registrar`, `raiz`, `linspace`, `fmt`, `ler(s, p)`) eu tirei dos exemplos do `pecas.html`. Também não abri nada em `Testes Skill lesson-generator/` além da pasta de gravação, como o pedido mandava.

## Scripts que rodei, e o que responderam

1. **Contas rápidas** (um Python avulso no scratchpad, antes de tudo). Deram K a 67 °C = (2,387; 0,927; 0,386), β = 0,4756, bolha = 56,43 °C e orvalho = 77,71 °C. Depois varri z do propano entre 0,05 e 0,70 para escolher a faixa do controle e o valor da observação (0,50 dá bolha 45,4 °C, orvalho 72,5 °C e β = 0,8134).
2. **`nova_licao.py "Flash de três componentes" "<pasta>"`**: criou `.rascunho-flash-de-tres-componentes/` com o HTML, `assets/` e `entrega.txt`, e disse onde a lição seria entregue. No terminal do Windows, "lição" saiu com o acento quebrado (só na exibição).
3. **O programa da lição, avulso** (`flash.py` no scratchpad), para testar antes de colar:
   - A primeira versão quebrou com `UnicodeEncodeError` no `print`, por causa do caractere "−" (U+2212) no console cp1252. Troquei a linha.
   - A conferência original tinha "Rachford-Rice na bolha com β = 0", que é a mesma equação do ponto de bolha e por isso não confere nada de forma independente. Troquei por: somas de x e de y, maior erro do balanço por componente e `T_bolha < T < T_orvalho`.
   - Rodei com `PYTHONIOENCODING=utf-8`, e a saída bateu com as contas rápidas.
4. **Primeira tentativa de gravar o HTML por heredoc no bash**: falhou com `unexpected EOF while looking for matching '`. Não investiguei a causa; gravei com a ferramenta Write.
5. **`conferir.py`, primeira rodada**:
   - `ERRO A resposta cita "10", e o programa não imprime esse número` (duas vezes). Era o "10 bar" dentro da caixa da resposta.
   - `AVISO A técnica tem 138 palavras: o normal é três ou quatro frases, até umas 80.`
   - Ele também listou os números para a revisão de procedência. Na revisão, cortei "mais de 20 °C" de uma observação, porque era uma diferença que o programa não imprime e o script não acusou.
6. **`conferir.py`, segunda rodada**: nenhum erro. Ficou só `AVISO A técnica tem 93 palavras`, que deixei assim.
7. **`python -m http.server 8730`** e o navegador embutido: o console não mostrou nenhuma mensagem. A figura desenhou as duas curvas com as quinas na bolha e no orvalho, e a linha de leitura disse "Bolha: 56,4 °C · orvalho: 77,7 °C · vapor a 67 °C: 47,56 kmol/h". Não mexi no slider nem abri os passos do código no navegador.
8. **`empacotar.py`**: gravou a lição (106 KB), mas falhou ao apagar o rascunho com `PermissionError [WinError 32]`. A causa foi que o diretório de trabalho desta sessão tinha mudado para a pasta do rascunho, que ficou travada. Saí da pasta, e a pasta, já vazia, foi apagada com `Remove-Item`.

## O que copiei e o que escrevi do zero

**Copiado do template e preenchido**: o esqueleto inteiro (cabeçalho, abertura, `ol.deducao` com os tipos, `eq-bloco`, a tabela de procedência, a técnica, os passos com `para-que`/`como`/`agora`, `armadilha`, `confira`, o passo do programa completo, a resposta, `Grafico.registrar` com a `div.grafico`, as observações com `no-seu-codigo`, o "pergunte" e os scripts no fim). Apaguei os comentários e o que não usei.

**Copiado do pecas.html e adaptado**:
- As equações e as chaves da peça "Massa num separador em estado estacionário" (F = V + L, F·zᵢ = V·yᵢ + L·xᵢ, yᵢ = Kᵢ·xᵢ). Separei a peça em dois balanços deduzidos, o global e o do componente, em vez de usar a `mtable`.
- O padrão da figura "Varredura com raiz" (`linspace` mais `Grafico.raiz` ponto a ponto) e o `ler(s, p)` da figura "Cruzamento".

**Escrito do zero**:
- Os passos da dedução que vêm depois da hipótese: a definição de β, a álgebra de xᵢ e yᵢ e a equação final de Rachford-Rice, com as chaves "1 − 1" e "só depende de β".
- Os dois `eq-bloco`: a correlação de K e as condições de bolha e de orvalho.
- Todo o texto, o programa Python e a conta `calcular`, com as funções auxiliares `K`, `comp`, `soma`, `beta` e `pontos` no JS da figura (o flash cortado em 0 e 1 fora da faixa bifásica).
- O controle `zC3`, com o n-pentano fixo em 0,25 e o n-butano completando.
- Uma `pre.sem-realce` com a saída do programa abaixo da resposta: escrevi e depois tirei, porque o template não a prevê.

## Onde a skill deixou dúvida

1. **"A resposta é o que o programa imprime" contra os dados do enunciado.** O `conferir.py` barrou "10 bar" na resposta, mas a pressão é condição da pergunta, não um resultado. O "67 °C" passou só porque o programa imprime "K a 67 °C". Não ficou claro se a resposta pode repetir dados do enunciado.
2. **Tamanho da técnica.** O SKILL.md pede quatro ou cinco frases com um roteiro fixo (o tipo de problema, "vamos usar", por que serve, a função e a biblioteca, "confira a próxima seção"). O aviso do `conferir.py` fala em "três ou quatro frases, até umas 80" palavras. Seguindo o roteiro do SKILL.md, deu 93.
3. **Controle numa grandeza com três componentes.** Mudar uma fração molar obriga a mexer nas outras. A skill não diz como tratar isso, e a escolha (pentano fixo, butano completando) foi minha. Sem `unidades` adequadas, o rótulo do slider fica "zC3".
4. **A figura que a pergunta pede.** "Entre que temperaturas fica parcialmente vaporizada" pede vazão contra T, mas não há peça "varredura em T com patamar" (a curva fica em 0, depois sobe, depois fica em 100). Montei a partir da varredura sem saber se a quina fora da faixa bifásica é aceitável.
5. **Balanço global antes do do componente.** A regra diz que "um segundo balanço parecido mostra o princípio e a tradução e junta o resto numa linha". Aqui o balanço curto (o global) é necessário antes do longo, e pus o global primeiro, com dois passos. Ficou a dúvida de se o "segundo" da regra é sobre a ordem ou sobre a semelhança.
6. **Verificação independente quando o modelo é uma raiz.** As somas de x e de y valendo 1 são, por construção, a própria equação resolvida. A skill pede "uma conta independente", e não ficou óbvio o que é independente num flash. Usei o balanço por componente e a coerência entre bolha, tambor e orvalho.
7. **Ambiente.** O `empacotar.py` não trata o caso em que o diretório de trabalho do processo está dentro do rascunho (no Windows, isso trava o `rmtree`). Os scripts também não forçam UTF-8 na saída, e o acento sai quebrado no console cp1252.
