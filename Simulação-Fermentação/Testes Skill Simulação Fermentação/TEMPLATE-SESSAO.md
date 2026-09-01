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
| Como a skill foi carregada | {ex: copiada para `~/.claude/skills/lesson-generator/`} |
| Nome da pasta instalada | {ex: `lesson-generator`} |

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

### Cronômetro

| | Horário |
|---|---|
| Prompt enviado | |
| Lição aberta | |
| **Duração** | |

**Um turno só.** O teste avalia a produção da lição e encerra.

## 5. Saída

Onde o modelo escreveu: `{caminho}` — a pasta começou vazia, como manda o protocolo.

```text
{árvore dos arquivos gerados}
```

Meça as palavras por estação — é o número que diz se a estação de código ficou maior que a teoria:

| Estação | Palavras |
|---|---|
| Modelo (teoria de fermentação) | {≤ 400} |
| Código | {deve ser a maior} |
| Resultado | |
| Crítica | |

## 6. Avaliação

Checklist condensado. O completo está no [README](../README.md) — este aqui é a versão que fica **congelada com o teste**, registrando o que era exigido na época.

**Tempo e tamanho**

- [ ] Sessão inteira em menos de 5 minutos
- [ ] Lição perto de 1.000 palavras visíveis
- [ ] Código + análise crítica pesam mais que a teoria

**Comportamento**

- [ ] Não entrevistou
- [ ] Não escreveu contabilidade: nenhum arquivo de estado, índice ou registro
- [ ] Escreveu componente novo se o exercício precisava de figura que os existentes não fazem
- [ ] Rodou o código antes de publicar os números
- [ ] Avisou onde escreveu e abriu o arquivo via CLI
- [ ] Falou pouco no chat

**Estrutura da lição**

- [ ] Três divisões: teoria · código · análise crítica
- [ ] Equações em MathML
- [ ] Tabela de parâmetros com unidade e procedência
- [ ] Passos de código revelados um a um, no máximo seis, cada um com o porquê
- [ ] Programa completo colapsado, com botão de copiar funcionando
- [ ] Resposta numérica atrás de um botão
- [ ] Simulador com no máximo quatro controles, curva respondendo na hora
- [ ] Duas a quatro observações ancoradas nas curvas **deste** exercício
- [ ] Nenhuma frase genérica, nenhuma lista de hipóteses
- [ ] Botão de claro/escuro funcionando
- [ ] Nenhum link interno, nenhuma promessa de continuação

**Correção técnica**

- [ ] Números conferidos — recalcule pelo menos um por fora
- [ ] Analítico primeiro, integração confirmando
- [ ] Todo número é dado do enunciado ou suposição declarada; nenhuma citação de literatura
- [ ] Sinais, rendimentos e unidades corretos

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
