# Cronograma das execuções

Montado em 10/11/2026 (terça), com o plano Pro neste estado:

| Limite | Usado | Volta em |
|---|---|---|
| Janela de 5 horas | 78% | terça, 18h20 |
| Semanal, todos os modelos | 43% | sexta 13/11, 15h00 |
| Semanal, Fable | 16% | sexta 13/11, 15h00 |

Em reserva: uma redefinição do Fable 5.2 (devolve o que ele gastou do semanal) e uma janela de 5 horas.

## Como funciona

- **Rodadas, não fila contínua.** Uma rodada é uma chamada de `python scripts/rodar.py`, iniciada à mão, só entre 8h e 22h. Ela segue a fila de onde parou e termina sozinha quando a fila acaba, quando o limite do plano acaba ou às 22h (nenhuma sessão começa depois das 21h45). Ela nunca espera o limite voltar.
- **Aviso.** Uma tarefa agendada do Claude ("Aviso de rodada da avaliação lesson-generator") avisa às 8h30, 13h30 e 18h30, de quarta a sábado, diz como a rodada anterior terminou e mostra o comando. Ela não inicia nada. Só roda com o aplicativo aberto; se ele estava fechado, avisa quando abrir.
- **Uma sessão por vez.** Rodar em paralelo não ganha nada, porque o que limita é a cota e não o relógio, e deixaria o tempo de um modelo depender do que a máquina faz pelo outro.
- **Os horários seguem a janela de 5 horas**, que começa no primeiro uso depois de voltar: 8h30 → 13h30 → 18h30.

## Uma sessão

| | |
|---|---|
| Prompt | `/lesson-generator <enunciado da questão>`, e mais nada. Os 24 estão em [questoes/PROMPTS.md](./questoes/PROMPTS.md) |
| Onde roda | Pasta nova e vazia, fora do repositório: `~/avaliacao-lesson-generator/Q07-sonnet` |
| Como | `claude -p`, sessão nova (identificador próprio), modelo da vez, esforço médio |
| Isolamento | Só as ferramentas de arquivo e de terminal; sem conectores, sem navegador, sem memória de outra sessão; nenhuma variável da sessão que chamou o script |
| Onde a lição nasce | `~/avaliacao-lesson-generator/Q07-sonnet/lessons/<nome>.html` |
| Onde fica o resultado | `execucoes/Q07/sonnet/`: `licao.html`, `execucao.json` (tempo, tokens, versão da skill), `inventario.json`, `saida-do-programa.txt` |
| Para o juiz | `juiz/pendentes/<código>.md`; a resposta vai para `juiz/respostas/<código>.json` |
| Histórico | `~/avaliacao-lesson-generator/rodar.log`; tentativas interrompidas vão para `descartadas/` |

O juiz também é uma sessão nova por pacote (Opus 5.5, só ler e gravar arquivos, na pasta desta avaliação). Ele roda dentro da rodada, sempre que uma etapa termina.

## A fila

A ordem é fixa. Os modelos se revezam a cada questão, para nenhum rodar sempre primeiro.

| # | Etapa | Questões | Ordem dos modelos |
|---|---|---|---|
| 1–3 | Piloto | Q01 | haiku, sonnet, opus |
| — | Juiz | os 3 pacotes do piloto | |
| 4–36 | Bloco A | Q02 a Q12 | Q02 sonnet, opus, haiku · Q03 opus, haiku, sonnet · Q04 haiku, sonnet, opus · e assim por diante |
| — | Juiz | os 33 pacotes do bloco A | |
| 37–72 | Bloco B | Q13 a Q24 | Q13 haiku, sonnet, opus · Q14 sonnet, opus, haiku · … |
| — | Juiz | os 36 pacotes do bloco B | |
| 73–84 | Fable 5.2 | Q01 a Q12 | fable (`--etapa fable`) |
| — | Juiz | os 12 pacotes do Fable | |

`python scripts/rodar.py --lista --etapa piloto A B fable` mostra as 84 linhas, com o que já foi feito.

## As rodadas

Quantas execuções cabem numa janela de 5 horas e no semanal ainda não foi medido; a rodada 1 mede. Por isso cada rodada é "continuar a fila", e não uma lista fechada.

| Rodada | Quando | Comando | O que se espera |
|---|---|---|---|
| 1 | terça 10/11, 18h21 às 22h | `python scripts/rodar.py --inicio 18:21` | Piloto, juiz do piloto e começo do bloco A, até a janela acabar |
| 2 | quarta 11/11, 8h30 | `python scripts/rodar.py` | Bloco A |
| 3 | quarta, 13h30 | idem | Bloco A |
| 4 | quarta, 18h30 às 22h | idem | Fim do bloco A e juiz: primeiro resultado completo (`python scripts/nota.py`) |
| 5 | quinta 12/11, 8h30 | idem | Bloco B |
| 6 | quinta, 13h30 | idem | Bloco B |
| 7 | quinta, 18h30 às 22h | idem | Bloco B, até onde o semanal deixar |
| 8 | sexta 13/11, 8h30 | idem | Bloco B, se o semanal ainda tiver saldo |
| 9 | sexta, 15h00 (semanal novo) | idem | Fim do bloco B e juiz |
| 10 | sexta, a partir das 20h | `python scripts/rodar.py --etapa fable` | Bloco A no Fable 5.2 |
| 11–13 | sábado 14/11, 8h30, 13h30 e 18h30 | o que faltar | Folga: resto do bloco B ou do Fable, e `nota.py` final |

Se o bloco A terminar antes da rodada 4, tudo se adianta: a fila simplesmente continua.

## Depois da rodada 1

Com o piloto feito, três números fixam o resto:

- `j` = quanto a janela de 5 horas gastou por trio (Q01 nos três modelos);
- `s` = quanto o semanal gastou por trio;
- trios que cabem até sexta às 15h = (57 − 5 de folga) ÷ `s`. O bloco A pede 12 trios; os dois blocos, 24.

Se não couberem os 24, o bloco B ganha um teto (`--max`) para não travar o semanal antes de sexta, e o resto roda nas rodadas 9 a 13. Se não couberem nem os 12, o bloco A termina na sexta depois das 15h e o bloco B fica para sábado, inteiro ou em parte.

## A redefinição do Fable

Ela só devolve o que o Fable gastou. Vale guardá-la para a hora em que o semanal travar a fila (as rodadas 7 e 8 são as candidatas): quanto mais o Fable tiver gasto até lá, mais ela devolve. As sessões de trabalho no Fable saem do mesmo semanal; enquanto a avaliação estiver aberta, convém abrir poucas.

## Durante uma rodada

- Computador na tomada e com internet. O script impede o Windows de dormir, mas não de desligar.
- Interromper com Ctrl+C é seguro: a execução em curso é descartada na rodada seguinte e as registradas não rodam de novo.
- Ao fim, o terminal e o `rodar.log` trazem a linha `FIM DA RODADA`, com o motivo.
