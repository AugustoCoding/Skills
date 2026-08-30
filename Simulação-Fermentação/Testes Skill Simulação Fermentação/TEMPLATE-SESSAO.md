# Teste N — {título curto do que se testou}

Copie este arquivo para `Teste N/SESSAO.md` e preencha. O que estiver `{entre chaves}` é para substituir; o que estiver em branco é para preencher depois de rodar.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | N |
| Data | {AAAA-MM-DD} |
| Quem rodou | {nome} |
| Foco | {a pergunta que este teste responde, em uma frase} |

## 2. Versão da skill

Sem isto o teste não é rastreável: a mesma entrada em duas versões da skill dá saídas diferentes, e o que interessa é justamente a diferença.

| Campo | Valor |
|---|---|
| Commit | `{hash curto}` — `{assunto do commit}` |
| Branch | {branch} |
| Alterações locais não commitadas | {não / sim — quais} |
| Como a skill foi carregada | {ex: copiada para `~/.claude/skills/simulacao-fermentacao/`} |
| Nome da pasta instalada | {ex: `simulacao-fermentacao`} |

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | {Claude Code CLI / desktop / web / extensão — e versão} |
| Modelo | {id exato, ex: claude-opus-5} |
| Modo | {padrão / fast / plano} |
| Acesso à web | {sim / não} |
| Permissões | {ex: aceitar edições sem prompt} |
| Sistema | {SO e versão} |
| Diretório de trabalho | {cwd da sessão de teste} |

O acesso à web importa mais do que parece: `RESOURCES.md` vem todo marcado `[a verificar]`, e a skill proíbe citar fonte não conferida. Sem web, espere lições com fontes marcadas como não verificadas — isso é a skill funcionando.

## 4. Entrada

### Prompt exato (turno 1)

```text
{cole aqui, literalmente, o que foi enviado — inclusive quebras de linha}
```

### Turnos seguintes, na ordem

| # | O que o "aluno" disse | Por que |
|---|---|---|
| 2 | {fala} | {o que essa fala testa} |
| 3 | {fala} | {…} |

## 5. Saída

Onde o modelo escreveu: `{caminho}`

```text
{árvore dos arquivos gerados}
```

## 6. Avaliação

Checklist condensado. O completo está no [README](../README.md) — este aqui é a versão que fica **congelada com o teste**, registrando o que era exigido na época.

**Comportamento**

- [ ] Não entrevistou: nenhuma pergunta sobre missão, nível, travamento ou pasta
- [ ] Escolheu/usou o workspace certo e avisou onde escreveu, em uma linha, **depois** de escrever
- [ ] `MISSION.md` preenchido por inferência, marcado como inferência, com data e procedência
- [ ] Produziu lição em vez de solução pronta
- [ ] Declarou a aposta diagnóstica dentro da lição
- [ ] Um alvo só, com pré-requisito checado contra `learning-records/`
- [ ] Falou pouco no chat, sem repetir a lição ali
- [ ] Abriu o arquivo via CLI
- [ ] Registro de aprendizado só por evidência (na 1ª sessão, o normal é nenhum)

**Dúvida pós-entrega**

- [ ] Respondeu no chat **e** editou o HTML
- [ ] A explicação entrou no ponto exato, não no rodapé
- [ ] Usou `.nota-duvida`, sem variante inventada, sem apagar o original
- [ ] Reabriu o arquivo e avisou

**Artefatos**

- [ ] A lição abre e renderiza: estilo, quiz e simulador funcionando
- [ ] Funciona com o chat fechado
- [ ] Escada de dicas, com a resposta só no último degrau
- [ ] Nome pelo conteúdo, sem `000N`
- [ ] `lessons/INDEX.md` com a linha da lição
- [ ] Parâmetros com unidade; sem fonte, marcados como ilustrativos ou suposição
- [ ] Código exibido roda

## 7. Achados

Um por linha, do mais grave para o menos. Achado é o que muda a skill; impressão solta não é achado.

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | {o que aconteceu de errado ou surpreendente} | {bloqueia / atrapalha / cosmético} | {arquivo da skill que precisa mudar} |

## 8. Veredito

{aprovado / reprovado} — {uma frase}

Lembrete da régua: uma lição bonita e tecnicamente correta em que o modelo entregou a resposta pronta, ou entrevistou antes de ensinar, é teste **reprovado**.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `{hash}` | {mudança} |
