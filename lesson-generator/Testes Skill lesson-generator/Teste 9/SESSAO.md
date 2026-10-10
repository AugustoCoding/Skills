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
| Início | |
| Fim do turno 1 | |
| **Duração** | |

## 5. Saída

## 6. Avaliação

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|

## 8. Veredito

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
