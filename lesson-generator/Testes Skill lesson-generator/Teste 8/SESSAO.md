# Teste 8 — a skill reescrita, num exercício de separação

Primeiro teste da skill reescrita na branch `skill-geral`. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 8 |
| Data | {AAAA-MM-DD} |
| Quem rodou | Augusto |
| Foco | A skill reescrita (só copiar e preencher, peças prontas, conferir.py, entrega em arquivo único) produz uma lição certa e rápida num exercício que não é de reator nem de EDO? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `4f11200` — Corrigir incoerencias da skill antes do Teste 8 |
| Branch | `skill-geral` |
| Alterações locais não commitadas | {conferir com `git status` antes de rodar: deve ser "não"} |
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
| Cliente | Claude Code {desktop / CLI, versão} |
| Modelo | {id exato} |
| Esforço | {baixo / médio / alto} |
| Modo de permissões | {ex: auto} |
| Acesso à web | {sim / não} |
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
| Prompt enviado | |
| Última linha | |
| **Duração** | |

## 5. Saída

Onde a lição foi gravada: `com-skill/` — começou vazia.

```text
{árvore dos arquivos gerados: deve ser UM .html, sem pasta assets e sem .rascunho-*}
```

Resultado do `conferir.py` rodado por você na lição entregue não é possível (o rascunho é apagado); confira pelo relatório do modelo se ele rodou e zerou os erros.

## 6. Avaliação

**Fluxo**

- [ ] Não entrevistou; um turno só
- [ ] Usou os três scripts, na ordem: `nova_licao.py`, `conferir.py`, `empacotar.py`
- [ ] Copiou e preencheu: não escreveu CSS nem JS além do `calcular` da figura, não leu os `assets/`
- [ ] Usou peças do `pecas.html` (separador, varredura com raiz)
- [ ] Entrega: um só `.html` em `com-skill/`, sem rascunho sobrando, nenhum arquivo novo dentro da pasta da skill
- [ ] Falou pouco no chat

**A lição** (abra a entrega com dois cliques)

- [ ] Abre toda recolhida; o próximo item pulsa; o fio termina num pé
- [ ] Nenhum `{…}` sobrando, nenhum número de exemplo do template
- [ ] Balanços deduzidos, com etiquetas de tipo e chaves
- [ ] Tabela com procedência; os K e os A e B como "enunciado", a conversão para kelvin como "derivado"
- [ ] Quadro da técnica: busca de raiz (não integração), com o nome destacado e a função (`brentq` ou equivalente), em palavras do básico
- [ ] Passos em três tempos (para quê, como, até aqui), e todos os argumentos de cada função explicados
- [ ] Verificação: soma das frações e balanço por componente
- [ ] Resposta primeiro em "O resultado", com os números que o programa imprime
- [ ] Figura de varredura entre bolha e orvalho, com até quatro controles, cada um com a sua observação e o "no seu código"
- [ ] O editor roda o programa colado passo a passo

**Correção técnica** (contra o [gabarito](./EXERCICIO.md))

- [ ] T convertida para kelvin
- [ ] V/F = 0,476; V = 47,6 kmol/h; L = 52,4 kmol/h
- [ ] Composições conferem; Σ x = Σ y = 1
- [ ] Bolha 56,4 °C e orvalho 77,7 °C
- [ ] Armadilhas 2 e 3: Rachford-Rice com intervalo justificado

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | | | |

## 8. Veredito

{aprovado / reprovado} — {uma frase}

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| | |
