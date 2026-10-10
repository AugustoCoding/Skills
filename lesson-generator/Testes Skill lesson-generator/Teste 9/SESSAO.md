# Teste 9 — prompt de aluno, pasta de aluno, e a skill reescrita em registro técnico

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 9 |
| Data | 2026-10-10 |
| Quem rodou | a sessão de desenvolvimento, por uma sessão separada (`start_session`) |
| Foco | Sem nenhuma instrução de ambiente, numa pasta vazia como a de um aluno, a skill reescrita (glossário, verbos de obrigação, correções do Teste 8) produz uma lição certa, mais rápido e com menos dúvidas? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `fec2854` — Reescrever SKILL.md e README em registro tecnico |
| Branch | `skill-geral` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 8

- Correções do Teste 8 (`eb1befa`): rascunho apagado mesmo com terminal dentro, resposta aceita números da tabela, `nomes` nos controles, UTF-8 nos scripts, sessão termina na entrega, ordem dos balanços.
- `SKILL.md` reescrito (`fec2854`): glossário, deve/não deve/pode/recomenda-se, seções numeradas, aforismos trocados por critérios. Nenhuma regra mudou.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, sessão iniciada por `start_session` |
| Modelo | `claude-opus-5-5` |
| Esforço | médio |
| Diretório de trabalho | `~\aula-teste-9`, pasta vazia **fora do repositório** |

**Diferenças de protocolo em relação ao Teste 8:**

- **O prompt é só o que um aluno mandaria**: `/lesson-generator` e o enunciado. Sem pasta de gravação (testa o destino padrão, `./licoes`) e sem instrução sobre o que não abrir.
- **A pasta de trabalho é vazia e fora do repositório**: a sessão não tem acesso fácil ao gabarito, à lição de referência nem às lições de testes anteriores, como um aluno.
- **O gabarito ficou fora do repositório** até o fim da sessão.
- O `start_session` exige um texto de contexto; usei um neutro, equivalente ao que um aluno diria: "Sou estudante de engenharia química e quero aprender a programar a solução de um exercício; atenda o pedido normalmente."
- A lição é copiada da pasta do aluno para `com-skill/` depois da sessão.

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator Uma reação A → B, irreversível, de primeira ordem e exotérmica, é conduzida em fase líquida num reator tubular adiabático. A alimentação entra a 47 °C, com 2,0 mol/L de A e vazão de 10 L/min. A constante de velocidade vale 0,020 min⁻¹ a 47 °C, e a energia de ativação é 80 kJ/mol. O calor de reação é −50 kJ/mol de A, e o produto da densidade pelo calor específico da mistura é 4,0 kJ/(L·K), constante. Que volume de reator é necessário para converter 90% de A, e com que temperatura a corrente sai? Compare com o volume necessário se o reator fosse mantido a 47 °C.
```

### Primeira tentativa: inválida (2026-10-10, 12:59–13:01 UTC)

A sessão iniciada por `start_session` **não recebeu a skill**. O `start_session` entrega o prompt embrulhado ("Background: … Task: /lesson-generator …"), e o `/lesson-generator` deixa de ser o início da mensagem: não é tratado como comando. A sessão respondeu "Não existe uma skill `/lesson-generator` nesta sessão" e fez uma aula em Markdown, um script e um PNG em 1,5 min. Os arquivos estão em [execucao-invalida/](./execucao-invalida/), só como registro.

**Consequência para o Teste 8:** lá a skill também não foi invocada pelo comando. A sessão rodava na raiz do repositório, achou o `SKILL.md` por conta própria e o seguiu. A lição do Teste 8 continua válida como teste do conteúdo da skill, mas não da invocação.

**Consequência para o protocolo:** um teste com prompt de aluno precisa ser iniciado à mão, numa sessão nova aberta na pasta do aluno, com o prompt colado como primeira mensagem.

### Segunda tentativa: válida

Iniciada à mão pelo Augusto, numa sessão nova do Claude Code aberta em `~\aula-teste-9` (Opus 5.5, esforço médio), com o prompt acima colado como primeira mensagem. O histórico confirma o `/lesson-generator` tratado como comando e o `SKILL.md` reescrito carregado. Sessão: "Reator tubular adiabático com reação exotérmica".

### Prompt do relatório (turno 2, depois da entrega)

```text
Escreva um relatório desta execução em RELATORIO-MODELO.md, na pasta de trabalho. Não liste os arquivos lidos nem os comandos rodados: isso eu tiro do histórico da sessão. Responda só o que o histórico não mostra:

1. Dúvidas: cada ponto em que você hesitou, com a frase exata do SKILL.md, do template ou do pecas.html que causou a dúvida, como você a interpretou e a alternativa que considerou.
2. Conflitos: onde duas regras puxaram para lados opostos, e qual você seguiu.
3. Retrabalho: tudo o que fez duas vezes ou desfez, com a causa (erro do conferir.py, comando que falhou, texto reescrito).
4. Decisões que a skill não ditou: escolhas de engenharia e de forma que foram suas (técnica, figura, controles, intervalos, tolerâncias) e o que descartou.
5. O que montou do zero, e por que nenhuma peça do pecas.html servia.
6. Os números de que tem menos certeza, e como os conferiu.
7. Uma regra que tiraria da skill e uma que acrescentaria, se pudesse.

Separe o que aconteceu do que você acha, e não defenda a lição. Escreva "não sei" onde não souber. Não faça commit.
```

### Cronômetro

Pelos registros da sessão (criação e última atividade do turno 1).

| | Horário |
|---|---|
| Início | 13:08:07 UTC |
| Fim do turno 1 | 13:13:09 UTC |
| **Duração** | **5 min 02 s** (Teste 8: 10 min 37 s) |

**O relatório não saiu.** O pedido foi barrado duas vezes por um filtro de segurança do modelo (`reasoning_extraction`): a primeira com o texto acima, a segunda reformulado como revisão da documentação. A avaliação abaixo vem do histórico da sessão, da lição e das conferências feitas por fora.

## 5. Saída

```text
~\aula-teste-9\
  licoes\
    reator-tubular-adiabatico.html   114 KB, arquivo único, sem comentários
```

Copiada para [com-skill/](./com-skill/). Destino padrão (`./licoes`) escolhido sozinho; rascunho apagado; nada além disso na pasta.

## 6. Avaliação

**Fluxo**

- [x] Skill invocada pelo comando, de verdade (pela primeira vez nos testes)
- [x] Não entrevistou; usou `nova_licao.py`, `conferir.py`, navegador e `empacotar.py`, nessa ordem
- [x] Destino padrão `./licoes`; rascunho apagado pelo script; nenhum arquivo sobrando; sem commit
- [x] Copiou e preencheu; usou `nomes` nos controles ("T₀ da alimentação", "−ΔHr")
- [x] Resposta ao aluno em duas linhas

**A lição**

- [x] Dois balanços deduzidos (massa em 7 etapas, energia em 6), com etiquetas, chaves e hipóteses que dizem o que mudaria
- [x] Arrhenius em `eq-bloco`, na forma com temperatura de referência (armadilha 3)
- [x] Quadro da técnica: "integração de EDO com parada num evento", com `solve_ivp`, sem jargão
- [x] Passos em três partes; todos os argumentos de `solve_ivp` e de `quad` explicados; "integrador" e "passo de integração" explicados na primeira vez
- [x] "O erro que parece certo" sobre R em J com Eₐ em kJ, com o sintoma exato (armadilha 2)
- [x] Verificação por dois caminhos independentes: fórmula fechada no isotérmico e `quad` no adiabático (armadilhas 5 e 7)
- [x] Figura de perfil com dois eixos (conversão e temperatura), dois controles, console limpo
- [x] **Editor testado**: os cinco passos enviados ao editor rodaram no Pyodide em 2,1 s e imprimiram os mesmos números
- [ ] A resposta usa ponto decimal ("350.4 L", "69.5 °C"), copiada da saída do programa, enquanto o resto da lição usa vírgula (achado 1)
- [ ] Uma observação cita "72 °C" (47 + 25), que o programa não imprime (achado 2)
- [ ] R marcado como "escolha" na procedência: é uma constante física, e a skill não tem essa categoria (achado 3)

**Correção técnica** (contra o [gabarito](./EXERCICIO.md), e rodando o programa da lição com T₀ = 57 °C)

- [x] 350,4 L; 69,5 °C; 1151,3 L; razão 3,29
- [x] Observação de controle: 149,7 L com T₀ = 57 °C, e saída a 79,5 °C
- [x] Conversão em kelvin, Eₐ e R na mesma unidade, evento em X = 0,90 (armadilhas 1, 2 e 6)
- [ ] "Com ρcp constante, ΔHr também não muda com a temperatura" é apresentado como consequência; é uma hipótese a mais (achado 4)

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | A resposta copia a saída do programa com ponto decimal, destoando da vírgula do resto da lição: "como o programa os imprime" foi lido ao pé da letra | atrapalha | `SKILL.md` 4.4 |
| 2 | Número citado numa observação (72 °C) não é impresso pelo programa; o `conferir.py` só confere a resposta | cosmético | `conferir.py`: aviso para números das observações |
| 3 | Constante física (R) classificada como "escolha": falta essa categoria na lista de procedências | cosmético | `SKILL.md` 5, template e CSS |
| 4 | Uma hipótese (ΔHr independente de T) aparece como consequência de outra | cosmético | conteúdo da lição, não da skill |
| 5 | O pedido de relatório foi barrado duas vezes pelo filtro de segurança (`reasoning_extraction`) | protocolo | `Testes/README.md`: o relatório do modelo deixa de ser parte fixa |
| 6 | Sessões iniciadas por `start_session` não executam o `/lesson-generator` | protocolo | `Testes/README.md`: testes de invocação são iniciados à mão |

## 8. Veredito

**Aprovado.** Primeira execução com a skill invocada de verdade, num ambiente de aluno: 5 min 02 s (metade do Teste 8), números todos certos, editor funcionando, nenhuma das falhas de script do Teste 8. As ressalvas são de formatação (ponto decimal na resposta) e de procedência.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
