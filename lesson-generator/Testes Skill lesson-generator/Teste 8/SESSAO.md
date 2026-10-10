# Teste 8 — a skill reescrita, num exercício de separação

Primeiro teste da skill reescrita na branch `skill-geral`. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 8 |
| Data | 2026-10-10 |
| Quem rodou | Augusto, por uma sessão separada iniciada pela sessão de desenvolvimento |
| Foco | A skill reescrita (só copiar e preencher, peças prontas, conferir.py, entrega em arquivo único) produz uma lição certa e rápida num exercício que não é de reator nem de EDO? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `4f11200` — Corrigir incoerencias da skill antes do Teste 8 |
| Branch | `skill-geral` |
| Alterações locais não commitadas | não (HEAD `de2dfb7`, só a montagem deste teste) |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` (refeita em 2026-10-10: a antiga apontava para o caminho de antes da mudança do repositório) |
| Nome da pasta instalada | `lesson-generator` |

### O que mudou desde o Teste 7

Praticamente tudo; a skill foi reescrita. O que este teste exercita pela primeira vez:

- **Fluxo por scripts:** `nova_licao.py` monta o rascunho, `conferir.py` confere, `empacotar.py` entrega um HTML único sem comentários e apaga o rascunho.
- **Só copiar e preencher:** template com `{…}` e catálogo `templates/pecas.html` (balanços com chaves e seis figuras).
- **Estrutura nova da lição:** abertura, O modelo (dedução etiquetada, tabela, quadro da técnica), O código (passos em três tempos e o programa completo), O resultado (resposta primeiro, figura, observações).
- **Editor de Python no navegador** (Pyodide) e a lição abrindo toda recolhida.
- **Invocação só manual** (`disable-model-invocation`).

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop (sessão iniciada por `start_session`, contexto novo) |
| Modelo | `claude-opus-5-5` |
| Esforço | médio |
| Modo de permissões | auto |
| Acesso à web | não usado |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Sessão nova**, sem o histórico da conversa em que a skill foi desenvolvida.

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator Grave a lição na pasta "lesson-generator/Testes Skill lesson-generator/Teste 8/com-skill".

Uma corrente de 100 kmol/h com 30% de propano, 45% de n-butano e 25% de n-pentano (frações molares) é alimentada a um tambor de flash que opera a 10 bar e 67 °C. Nessa pressão, as constantes de equilíbrio líquido-vapor seguem ln Ki = Ai − Bi/T, com T em kelvin: propano A = 6,75 e B = 2000 K; n-butano A = 6,98 e B = 2400 K; n-pentano A = 7,28 e B = 2800 K. Calcule as vazões de vapor e de líquido que saem do tambor e as composições das duas fases. Entre que temperaturas, a 10 bar, essa mistura fica parcialmente vaporizada?
```

### Prompt do relatório (turno 2, só depois da entrega)

```text
Escreva um relatório desta execução em "lesson-generator/Testes Skill lesson-generator/Teste 8/RELATORIO-MODELO.md": cada arquivo da skill que você leu e por quê, cada script que rodou e o que ele respondeu (erros e avisos do conferir.py inclusive), o que você copiou do template e do pecas.html e o que escreveu do zero, e onde a skill deixou dúvida. Onde não tiver medição (tempo, tokens), escreva "não sei" em vez de estimar.
```

### Cronômetro

Marque a hora ao apertar enter e quando a última linha do turno 1 aparecer, **antes** de avaliar.

| | Horário |
|---|---|
| Prompt enviado | 12:10:01 UTC (criação da sessão) |
| Última linha | 12:20:38 UTC (última atividade do turno 1) |
| **Duração** | **10 min 37 s**, pelos registros da sessão |

A sessão recebeu, além do prompt, uma linha de abertura: atender como um usuário comum e não abrir nada em `Testes Skill lesson-generator/` além da pasta de gravação (o gabarito está lá).

## 5. Saída

Onde a lição foi gravada: `com-skill/` — começou vazia.

```text
com-skill/
  flash-de-tres-componentes.html   106 KB, arquivo único, sem comentários
```

Resultado do `conferir.py` rodado por você na lição entregue não é possível (o rascunho é apagado); confira pelo relatório do modelo se ele rodou e zerou os erros.

## 6. Avaliação

**Fluxo**

- [x] Não entrevistou; um turno só
- [x] Usou os três scripts, na ordem: `nova_licao.py`, `conferir.py` (duas rodadas), `empacotar.py`
- [x] Copiou e preencheu: não escreveu CSS nem JS além do `calcular` da figura, não leu os `assets/`
- [x] Usou peças do `pecas.html`: o separador (dividido em dois balanços) e o padrão da varredura com raiz
- [ ] Entrega: um só `.html`, nenhum arquivo na pasta da skill, **mas** o rascunho não foi apagado pelo script (achado 1)
- [x] Falou pouco no chat
- [ ] Ficou só na tarefa: **fez um commit sem ninguém pedir** (achado 5)

**A lição**

- [x] Abre toda recolhida; console limpo
- [x] Nenhum `{…}` sobrando, nenhum número de exemplo do template, nenhum comentário
- [x] Balanços deduzidos, com etiquetas de tipo e chaves; a hipótese diz o que aconteceria se não valesse
- [x] Tabela com procedência; T = 340,15 K como "derivado", tolerâncias e intervalos como "escolha"
- [x] Quadro da técnica: "busca de raiz num intervalo", com o nome destacado e o `brentq`, sem jargão
- [x] Passos em três tempos, e todos os argumentos de `brentq` explicados um a um (inclusive `args=(T,)` e a tupla)
- [x] Verificação: somas, balanço por componente e bolha < tambor < orvalho, com a honestidade de dizer que a soma não é independente
- [x] Resposta primeiro em "O resultado", com os números que o programa imprime
- [x] Figura de varredura entre bolha e orvalho; um controle, com a sua observação e o "no seu código"
- [ ] O rótulo do controle é a chave interna, "zC3" (achado 3)
- [ ] O editor rodando o programa: não testado nesta avaliação

**Correção técnica** (recalculada por fora, nas duas composições citadas)

- [x] T convertida para kelvin, e a armadilha do °C virou a caixa "o erro que parece certo", com o sintoma exato (`ValueError` do `brentq`)
- [x] V/F = 0,4756; V = 47,56 kmol/h; L = 52,44 kmol/h
- [x] Composições conferem; Σ x = Σ y = 1
- [x] Bolha 56,4 °C e orvalho 77,7 °C; composições da primeira bolha e da última gota conferem
- [x] Observação do controle (propano a 0,50): bolha 45,4 °C, orvalho 72,5 °C, V = 81,34 kmol/h conferem
- [x] Rachford-Rice no intervalo (0, 1), justificado pelo significado de β

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | O `empacotar.py` falhou ao apagar o rascunho (`PermissionError`) porque o diretório de trabalho da sessão estava dentro dele; a sessão apagou à mão | atrapalha | `scripts/empacotar.py`: sair da pasta antes de apagar |
| 2 | O `conferir.py` barrou "10 bar" na resposta: um dado do enunciado não é impresso pelo programa, e o modelo teve de reescrever a resposta | atrapalha | `scripts/conferir.py`: aceitar os números da tabela de parâmetros |
| 3 | O controle aparece com a chave interna, "zC3": o `grafico.js` não tem como dar nome ao controle | atrapalha | `assets/grafico.js` e `pecas.html`: um nome por controle |
| 4 | O aviso do tamanho da técnica fala em "três ou quatro frases, até umas 80 palavras", e o `SKILL.md` pede quatro ou cinco frases com um roteiro que dá 90 a 100 | cosmético | `scripts/conferir.py` |
| 5 | A sessão fez commit da lição sem ninguém pedir | cosmético | `SKILL.md`: a sessão termina na entrega |
| 6 | Saída dos scripts com acento quebrado no console do Windows | cosmético | `nova_licao.py`, `empacotar.py`: UTF-8 na saída, como o `conferir.py` |
| 7 | "Um segundo balanço parecido mostra o princípio e a tradução" deixou dúvida sobre a ordem dos balanços | cosmético | `SKILL.md` |
| 8 | 10 min 37 s: mais lento que a meta, com um heredoc que falhou, o programa testado à parte antes de entrar na lição e a olhada no navegador | observar | sem correção direta; medir de novo no próximo teste |

## 8. Veredito

**Aprovado com ressalvas** — a lição é tecnicamente certa em todos os números, segue a estrutura inteira (técnica que não é integração, três tempos, argumentos explicados, armadilha do °C bem usada) e foi feita copiando e preenchendo; as ressalvas são de script (rascunho, resposta, rótulo do controle) e o tempo, de 10 min 37 s.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| | |
