# Teste 1 — primeira execução do fluxo sem entrevista

Preencha os campos vazios **durante e depois** da sessão de teste. Os campos já preenchidos descrevem o que foi preparado antes.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 1 |
| Data | {AAAA-MM-DD — dia da execução} |
| Quem rodou | Augusto |
| Foco | O modelo com a skill produz uma lição sem entrevistar, apostando sozinho no travamento, e trata o parâmetro que falta como suposição declarada? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit | `a2285bd` — "Mandar SKILL.md abrir rules.md e system_prompt.md" |
| Branch | `main` |
| Alterações locais não commitadas | não (na pasta da skill) |
| Como a skill foi carregada | {ex: copiada para `~/.claude/skills/simulacao-fermentacao/`} |
| Nome da pasta instalada | {a pasta precisa ser kebab-case e bater com o `name:` do frontmatter — `simulacao-fermentacao`} |

Esta é a **primeira** execução depois da reescrita que tirou a entrevista da entrada (commit `ee19e71`). Nenhum teste anterior existe para comparar.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | {Claude Code CLI / desktop / web — e versão} |
| Modelo | {id exato, ex: claude-opus-5} |
| Modo | {padrão / fast} |
| Acesso à web | {sim / não} |
| Permissões | {ex: edições aceitas sem prompt} |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

Se a sessão não começar na raiz do repositório, ajuste o caminho do workspace no prompt abaixo.

## 4. Entrada

### Prompt exato (turno 1)

Copie deste bloco, sem editar:

```text
Use a skill simulacao-fermentacao.

O workspace desta sessão é "Simulação-Fermentação/Testes Skill Simulação Fermentação/Teste 1/com-skill/". Escreva ali tudo o que você gerar.

Preciso resolver este exercício:

Fermentação alcoólica em batelada

Um fermentador de bancada opera em batelada, com volume útil constante de 1,5 L, temperatura e pH controlados e agitação suficiente para admitir mistura perfeita. O mosto inicial contém 150 g/L de açúcares redutores totais (ART) e o inóculo fornece 2,0 g/L de biomassa seca.

Admita crescimento segundo a cinética de Monod, com μmax = 0,35 h⁻¹, Ks = 1,5 g/L e Yx/s = 0,045 gX/gART. A formação de etanol é associada ao crescimento.

Pede-se:
(a) Escreva o sistema de equações diferenciais que descreve a evolução de biomassa, substrato e etanol ao longo do tempo, definindo cada termo e sua unidade.
(b) Implemente o modelo em Python e simule 30 h de processo, apresentando os perfis de X, S e P.
(c) Determine o instante em que o ART se esgota e o teor final de etanol.
(d) Discuta duas hipóteses assumidas pelo modelo e o efeito esperado de cada uma sobre o resultado.
```

O enunciado e o raciocínio por trás de cada armadilha estão em [EXERCICIO.md](./EXERCICIO.md). **Não mande o EXERCICIO.md para o modelo** — ele contém o gabarito das armadilhas.

### Turnos seguintes, na ordem

Só mande o próximo depois de o modelo terminar o anterior. Não ofereça informação que ele não pediu — o teste é justamente se ele se vira sem perguntar.

| # | O que o "aluno" diz | O que essa fala testa |
|---|---|---|
| 2 | `Não entendi por que o Yx/s aparece dividindo em dS/dt, e não multiplicando.` | O ciclo da dúvida: resposta no chat **e** `.nota-duvida` enxertada no ponto exato do HTML, com reabertura do arquivo |
| 3 | `De onde saiu esse rendimento de etanol? Não estava no enunciado.` | Se a suposição foi declarada como suposição, com ordem de grandeza justificada — e não apresentada como dado de literatura |

### O que este teste **não** cobre

- **Escolha automática de pasta.** Aqui o workspace é indicado no prompt, porque a saída precisa cair dentro de `Teste 1/`. A regra "usa `./aula-fermentacao/` e avisa depois" fica para o Teste 2.
- **Sessão de retorno sem exercício** (o fallback para `cases/`). Também Teste 2 em diante.

## 5. Saída

Onde o modelo escreveu: `Teste 1/com-skill/`

```text
{cole aqui a árvore do que foi gerado}
```

Depois de gerar: abra a lição no navegador e confira que o quiz responde e o simulador desenha. Se abrir por `file://` e o estilo não carregar, o problema é do visualizador, não da lição.

## 6. Avaliação

**Comportamento**

- [ ] Não entrevistou: nenhuma pergunta sobre missão, nível, travamento ou pasta
- [ ] Avisou onde escreveu, em uma linha, depois de escrever
- [ ] `MISSION.md` por inferência, marcado como inferência, com data e procedência
- [ ] Produziu lição em vez de solução pronta — os itens (a) a (d) **não** vêm resolvidos
- [ ] Declarou a aposta diagnóstica dentro da lição
- [ ] Um alvo só: não empilhou acoplamento de substrato (degrau 3) com formação de produto (degrau 4)
- [ ] Falou pouco no chat, sem repetir a lição ali
- [ ] Abriu o arquivo via CLI
- [ ] Nenhum registro de aprendizado antes de haver evidência

**Dúvida pós-entrega (turnos 2 e 3)**

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
- [ ] Todo parâmetro com unidade; o rendimento de etanol marcado como **suposição**, com ordem de grandeza justificada
- [ ] Código exibido roda

**Correção técnica específica deste exercício**

- [ ] X final ≈ 8,75 g/L (= 2,0 + 0,045 × 150), se a lição chegar a calcular
- [ ] Sinal de `dS/dt` negativo e `Yx/s` dividindo
- [ ] O item (d) menciona inibição por etanol como hipótese que Monod puro ignora
- [ ] Nenhum valor apresentado como dado de literatura sem organismo e condição

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| | | | |

## 8. Veredito

{aprovado / reprovado} — {uma frase}

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| | |
