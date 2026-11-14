# Avaliação da skill lesson-generator por modelo

> **Resultado:** use o Claude Opus 5.5; o Sonnet 5.5 é a alternativa quando o limite ou o custo pesar. A análise e os limites estão em [resultados/CONCLUSAO.md](./resultados/CONCLUSAO.md).

A última fase do trabalho: medir a qualidade da lição que cada modelo entrega com a skill, no mesmo conjunto de exercícios. Os [testes](../Testes%20Skill%20lesson-generator/) anteriores serviram para corrigir a skill; aqui a skill fica **congelada** e o que varia é o modelo.

```
Avaliacao Skill lesson-generator/
  questoes/     o banco: questoes.json, o gabarito (gabarito.py → gabarito.json) e PROMPTS.md
  scripts/      rodar.py, registrar.py, nota.py, preparar.py (e inventario.py, comum.py)
  execucoes/    Qnn/modelo/: a lição entregue, o tempo, o inventário
  juiz/         JUIZ.md, os pacotes a julgar (pendentes/) e as respostas (respostas/)
  resultados/   execucoes.csv e RESUMO.md
```

## 1. Modelos

Haiku 5.5, Sonnet 5.5 e Opus 5.5, todos em esforço médio, no Claude Code. Fable 5.2 entra por último, só no bloco A, se sobrar cota. (Não sobrou: o Fable 5.2 não foi avaliado.)

## 2. A métrica

Cada execução (uma questão, um modelo, uma sessão isolada) gera três medidas, e um índice que as junta.

### 2.1 Tempo

Do envio do prompt à última linha da resposta, no primeiro turno. Não é cronometrado à mão: o `registrar.py` lê os horários no registro da sessão do Claude Code (`~/.claude/projects/…/*.jsonl`), junto com o modelo, o esforço e os tokens. No ensaio com a sessão do Teste 16, o registro deu 7 min 38 s para os "cerca de 7 min 44 s" anotados à mão.

### 2.2 Completude: tantos de tantos, por seção

A lição é desmontada num **inventário** de itens, cada um uma coisa que ela devia explicar. A lista sai da **solução que o próprio modelo produziu**: os balanços que ele montou, os símbolos das equações dele, as funções e os argumentos do programa dele, os controles da figura dele. Uma solução com mais peças deve mais explicações. Só as perguntas do enunciado e seus valores vêm do banco.

| Seção | De onde saem os itens |
|---|---|
| **Modelo** | Cada balanço: princípio, tradução, equação final e a leitura dela. Cada hipótese: o que aconteceria sem ela. Cada equação complementar: nome e origem. Cada símbolo das equações: definido com unidade. Cada linha da tabela de parâmetros: valor, unidade e procedência. Cada constante numérica do programa: está na tabela. O quadro da técnica: tipo de problema, nome, por quê, função de Python. Cada termo de método numérico: explicado |
| **Código** | Cada passo: propósito, como, até aqui. Cada função de biblioteca ou nativa chamada: o que faz. Cada argumento dela, posicional ou por nome: o que é e por que tem aquele valor. Cada função do aluno entregue a uma função de biblioteca: o mecanismo. Cada construção que um iniciante não reconhece (`def`, índice, tupla, f-string…). Cada formato de impressão. A verificação (existe, é independente), o critério de precisão, a figura, e o programa rodar |
| **Resultado** | Cada pergunta do enunciado: respondida com o número certo. A figura. Cada controle: a sua observação, com a mudança no código. Cada observação de leitura: ancorada num valor deste exercício |

Cada item termina num de quatro estados: **ok** (explicado e certo), **errado** (explicado, mas errado), **faltou**, ou **na** (não se aplica; sai da conta). Cerca de 40% dos itens são decididos por regra, no script; o resto depende de leitura e vai para o juiz (seção 5).

> **Completude da seção** = (ok + errado) / (ok + errado + faltou)

É o "tantos de tantos": quantas das coisas devidas a lição de fato explicou, certa ou errada.

### 2.3 Erro

> **Erro** = errado / (ok + errado), em toda a lição

De tudo o que a lição afirmou e foi conferido, a fração que está errada. Entram como "errado": uma resposta numérica fora da tolerância do gabarito, um programa que não roda, uma explicação que o juiz apontou como falsa, e os erros factuais soltos que o juiz achou fora dos itens. As **respostas certas** (perguntas do enunciado com o número do gabarito) também são relatadas à parte, porque é o erro que mais pesa para o aluno.

Os ERROs e avisos do `check.py` da skill ficam registrados em cada execução, mas fora da conta: a maioria é de forma, e o que neles é de conteúdo já está nos itens.

### 2.4 O índice

> **Qualidade** = média, nas três seções, de ok / (ok + errado + faltou)
>
> **Índice** = Qualidade × fator de tempo

A qualidade é a fração do que era devido que foi explicado **e** está certo: completude e erro numa conta só. As três seções pesam igual, embora o Resultado tenha menos itens, de modo que errar uma resposta custa mais do que esquecer um argumento.

O fator de tempo vale 1 até 5 minutos e cai em linha reta até zero em 12 minutos: cada minuto além do alvo custa cerca de 14% do índice. Os 5 minutos são o alvo dos testes da skill; os 12 são uma escolha desta avaliação, mais dura que a "meia hora" que a skill dá como falha. Estão no topo do `nota.py` (`T_ALVO`, `T_ZERO`), para quem quiser outra régua.

Uma sessão que não entrega lição entra com qualidade zero.

O resumo sempre traz as três medidas separadas ao lado do índice: o índice ordena, as medidas explicam.

## 3. O banco de questões

24 questões inéditas, em dois blocos de 12. Nenhuma repete um exercício usado para desenvolver a skill (fermentação, flash, reator tubular adiabático, ajuste de ordem, pastilha de catalisador, CSTR reversível, ε-NTU, Colebrook, Rayleigh), para que a nota não meça o quanto a skill foi ajustada àqueles casos.

O banco cruza dois eixos: a **disciplina** e o **tipo de problema matemático**, que é o que decide a técnica e a função de Python ensinada.

| | Bloco | Disciplina | Tipo de problema | Idioma |
|---|---|---|---|---|
| Q01 | A | Balanços de massa | sistema linear | pt |
| Q02 | A | Termodinâmica (equação de estado) | raiz de uma cúbica | en |
| Q03 | A | Termodinâmica (equilíbrio químico) | sistema não linear | pt |
| Q04 | A | Mecânica dos fluidos | uma EDO, com evento | pt |
| Q05 | A | Transferência de calor | EDP parabólica | pt |
| Q06 | A | Transferência de calor (projeto econômico) | otimização de uma variável | pt |
| Q07 | A | Transferência de massa (absorção) | integral de uma função | pt |
| Q08 | A | Destilação (McCabe–Thiele) | cálculo estágio a estágio | pt |
| Q09 | A | Reatores (batelada não isotérmica) | sistema de EDOs, com evento | en |
| Q10 | A | Cinética (Arrhenius) | regressão linear | pt |
| Q11 | A | Controle de processos (PI) | sistema de EDOs em malha fechada | pt |
| Q12 | A | Secagem | integração de dados tabelados | pt |
| Q13 | B | Termodinâmica (bolha e orvalho) | raiz de uma equação | pt |
| Q14 | B | Sistemas particulados | raiz com correlação | pt |
| Q15 | B | Psicrometria | cálculo direto | pt |
| Q16 | B | Transferência de calor (aleta) | valor de contorno não linear | pt |
| Q17 | B | Absorção em estágios (Kremser) | cálculo direto | pt |
| Q18 | B | Evaporação (duplo efeito) | sistema não linear | pt |
| Q19 | B | Reatores (CSTR, múltiplos estados) | raízes múltiplas | pt |
| Q20 | B | Reatores (leito fixo, perda de carga) | sistema de EDOs, com evento | pt |
| Q21 | B | Cinética enzimática | regressão não linear | en |
| Q22 | B | Dinâmica de processos (dois tanques) | sistema de EDOs não lineares | pt |
| Q23 | B | Biorreatores (quimiostato) | forma fechada com otimização | pt |
| Q24 | B | Balanços de energia (combustão) | raiz de um balanço de entalpia | en |

O **bloco A sozinho** já cobre todas as grandes disciplinas e doze tipos de problema diferentes. O bloco B repete as disciplinas com outros tipos e acrescenta psicrometria, particulados, evaporação e bioquímica. Quatro questões estão em inglês (duas por bloco), porque a lição deve sair no idioma do enunciado.

Cada pergunta tem unidade declarada no enunciado e um valor de gabarito com tolerância (1% na maioria; exata nas contagens de estágios). O gabarito é calculado por `questoes/gabarito.py`, um solucionador de referência por questão, com forma fechada conferindo o numérico onde há uma.

### Quantas rodar

| Etapa | Execuções | O que dá |
|---|---|---|
| 1. Piloto: Q01 nos três modelos | 3 | Calibra a cota: veja quanto do limite cada modelo consumiu |
| 2. Bloco A nos três modelos | 36 | O mínimo publicável: 12 pares por comparação |
| 3. Bloco B nos três modelos | 72 no total | 24 pares: intervalos cerca de 30% mais estreitos |
| 4. Bloco A no Fable 5.2 | +12 | Se der tempo |

Cada etapa é um resultado completo: parar depois de qualquer uma não desperdiça o que foi rodado. Para referência, nos testes 12, 13 e 16 uma lição custou de 26 a 59 mil tokens de saída e de 1,0 a 2,4 milhões de leitura em cache, em 3 a 8 minutos.

A comparação é **pareada**: os modelos fazem as mesmas questões, e o que se compara é a diferença questão a questão. Com 12 pares, só uma diferença grande fica clara (no teste dos sinais, 10 vitórias a 2); com 24, uma diferença moderada já aparece. Uma execução por par: a variação entre questões é maior que a de repetir a mesma, e a cota rende mais em questões novas do que em repetições.

## 4. Protocolo de uma execução

As sessões rodam sozinhas, pelo `scripts/rodar.py`; a ordem e as datas estão no [CRONOGRAMA.md](./CRONOGRAMA.md).

```bash
python scripts/rodar.py --teste
```

```bash
python scripts/rodar.py
```

Cada execução é uma sessão nova do Claude Code sem interface (`claude -p`), numa pasta vazia fora do repositório (`~/avaliacao-lesson-generator/Q07-sonnet`), com o enunciado como único pedido, em esforço médio. A sessão só tem as ferramentas de arquivo e de terminal, sem conectores nem navegador, e nenhuma aprovação a esperar. Ao fim, o script chama o `registrar.py`, que copia a lição, tira o tempo do registro da sessão, monta o inventário, confere as respostas com o gabarito e escreve o pacote do juiz.

- **Uma por vez**, com os modelos se revezando na ordem a cada questão.
- **Rodadas.** Cada chamada do script é uma rodada, iniciada à mão: segue a fila de onde parou, julga os pacotes de cada etapa que termina e para sozinha quando a fila acaba, quando o limite do plano acaba ou às 22h (`--ate`).
- **Limite do plano.** Se o limite acaba no meio, a execução interrompida vai para `descartadas/` e é refeita na rodada seguinte; o script não fica esperando.
- **Meia hora.** Uma sessão que passa de 30 minutos é encerrada e conta como lição não entregue.
- **Erro externo** (rede, falha do serviço): uma segunda tentativa; se repetir, a execução fica na fila para a próxima chamada.

Para registrar à mão uma sessão feita no aplicativo, o `registrar.py` continua valendo: `python scripts/registrar.py Q07 sonnet --pasta ~/avaliacao-lesson-generator/Q07-sonnet` (`--sem-licao` se o modelo não entregou; `--tempo 4:35` se não houver registro da sessão). Não misture os dois modos na mesma avaliação: o aplicativo dá à sessão ferramentas que o modo sem interface não dá.

Regras que protegem a comparação:

- **A skill não muda** enquanto a avaliação estiver aberta. O commit dela fica gravado em cada execução, e o `rodar.py` recusa rodar com a pasta da skill alterada ou com execuções de outra versão.
- **Mesma condição para os três modelos.** Mesmas ferramentas, mesmo esforço, mesma máquina, uma sessão por vez.
- **Sem escolher.** Uma execução ruim fica. Só se refaz a que caiu por motivo externo.

## 5. O juiz

O que depende de leitura (uma explicação existe? está certa?) é decidido por um juiz, que é um modelo só para todas as lições, seguindo [`juiz/JUIZ.md`](./juiz/JUIZ.md).

- **Cego.** O pacote traz um código no lugar do modelo, e o juiz só lê a pasta `juiz/`.
- **Item a item.** O juiz não dá nota: marca cada item do inventário como ok, errado, faltou ou na, e lista erros factuais fora dos itens. A nota é conta do `nota.py`.
- **Barato.** Um pacote tem perto de 15 mil tokens, contra mais de um milhão de uma geração.
- **Pode anular itens.** A lista é montada por um script que não entende a lição; o juiz marca `na`, com nota, o item que não cabe nela (no piloto, "chute inicial" virou item porque a lição dizia "sem chute inicial nem iterações").

### 5.1 A comparação direta

Uma segunda medida, independente da lista: para cada questão e cada par de modelos, o juiz lê as duas lições, sem saber quem escreveu cada uma, e diz qual ensinaria melhor um iniciante, em duas a quatro frases ([`juiz/COMPARACAO.md`](./juiz/COMPARACAO.md)). Ela capta o que uma lista não enxerga: se o raciocínio se encadeia, se a explicação ajuda ou só ocupa espaço.

- **Par, e não nota.** Escolher entre duas lições é bem mais estável para um modelo do que dar nota de 0 a 10, que tende a se amontoar no meio.
- **Contra os vieses conhecidos.** A ordem 1 e 2 é sorteada por par (fixa pelo código), e o resumo confere se a primeira posição vence mais do que a metade. As instruções dizem que tamanho não é qualidade, porque juízes de modelo tendem a premiar o texto mais longo.
- **Fora do índice.** O resumo traz o placar dela ao lado das comparações pareadas do índice: se as duas concordam, uma confirma a outra; se discordam, isso já é um resultado.
- Um modelo que não entregou lição perde o par sem pacote. São 3 pacotes por questão (6 com o Fable), cada um com as duas lições, perto de 25 a 30 mil tokens.

Os pacotes ficam em `juiz/pares/pendentes/` (montados por `scripts/pares.py`, a partir dos pacotes de itens); quem é 1 e quem é 2 fica em `execucoes/Qnn/pares.json`, fora do alcance do juiz.

Para julgar, `python scripts/rodar.py --juiz` abre uma sessão por pacote pendente, primeiro os de itens e depois os de pares (Opus 5.5 por padrão; `--modelo-juiz sonnet` troca), com acesso só a ler e gravar arquivos. À mão, abra uma sessão na pasta desta avaliação e peça: *"Julgue os pacotes pendentes conforme juiz/JUIZ.md."*

**Conferência do juiz.** Sorteie cinco pacotes, julgue você mesmo uns vinte itens de cada e compare. Concordância abaixo de 85% pede ajuste no `JUIZ.md` e novo julgamento de todos.

## 6. O resultado

```bash
python scripts/nota.py
```

Escreve `resultados/execucoes.csv` (uma linha por execução, com todas as medidas) e `resultados/RESUMO.md`: por modelo, o tempo mediano, a completude, o erro, as respostas certas, a qualidade e o índice, com intervalo de 95% por reamostragem das questões; a completude por seção, em "tantos de tantos"; as comparações pareadas, com o placar e o teste dos sinais; o placar da comparação direta, com a conferência do viés de posição e o porquê de cada decisão; e o índice de cada questão. Pode ser rodado a qualquer momento: sem o juiz, a conta usa só os itens decididos por regra e o resumo avisa que é parcial.

## 7. Limites conhecidos

- O inventário do código só enxerga chamadas feitas pelo nome de uma biblioteca importada (`np.linspace`, `solve_ivp`, `plt.plot`). Métodos de objetos (`ax.plot`, `sol.sol`) não viram itens de argumento; entram só como "atributo de objeto".
- Os símbolos saem do MathML das equações. Um operador que escape do filtro vira item, e cabe ao juiz marcá-lo como `na`.
- A conferência automática da resposta procura o valor do gabarito entre os números do quadro da resposta. Um número igual por coincidência passaria; os casos que não batem vão para o juiz, não são dados como errados por regra.
- O juiz é da mesma família dos modelos avaliados. O pacote cego e o julgamento por item reduzem o viés, e a conferência por amostragem mede o que sobra.
- O tempo inclui a espera por ferramentas e a carga do serviço na hora. Rodar os três modelos da mesma questão juntos espalha esse ruído por igual.
