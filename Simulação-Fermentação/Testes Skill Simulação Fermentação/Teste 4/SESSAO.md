# Teste 4 — a repetição controlada

Mesmo enunciado do Teste 3, skill corrigida. Preencha os campos vazios durante e depois da sessão.

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 4 |
| Data | {AAAA-MM-DD} |
| Quem rodou | Augusto |
| Foco | As correções do Teste 3 pegaram? Especificamente: o tempo cai abaixo de 5 minutos, a figura da varredura entra na lição, e a lição fica perto de 1.000 palavras? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit | `94f0648` — "Corrigir os cinco achados do Teste 3 e destravar o modelo" |
| Branch | `main` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/simulacao-fermentacao` → `Simulação-Fermentação/Skill Simulação Fermentação/` |
| Nome da pasta instalada | `simulacao-fermentacao` |

**A comparação é com o Teste 3** (`f756788`), que rodou este mesmo enunciado. O que mudou entre as duas versões:

- conferência **analítica primeiro**, integração confirmando, com teto de esforço explícito;
- permissão — e ordem — de **escrever componente novo** quando o exercício pede figura que as peças não fazem;
- "**conte as palavras** antes de salvar";
- fim da contradição sobre citar fonte, e procedência explicitando faixas, ordens de grandeza e condições iniciais;
- deduplicação entre `SKILL.md` e `LESSON-FORMAT.md`.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | {Claude Code CLI / desktop / web — e versão} |
| Modelo | {id exato} |
| Modo | {padrão / fast / esforço} |
| Acesso à web | {sim / não} |
| Sistema | Windows 11 |
| Diretório de trabalho | raiz do repositório |

**Opus 5, esforço médio** — o mesmo dos três anteriores. Trocar o modelo aqui destruiria a comparação, que é o motivo de este teste existir.

## 4. Entrada

### Cronômetro

| | Horário |
|---|---|
| Prompt enviado | |
| Lição aberta | |
| **Duração** | |

Referência: **8 minutos** no Teste 3, com o mesmo enunciado.

### O estado inicial do workspace

`Teste 4/com-skill/` começa **vazio**, como manda o protocolo.

### Prompt exato (turno 1)

```text
/simulacao-fermentacao

O workspace desta sessão é "Simulação-Fermentação/Testes Skill Simulação Fermentação/Teste 4/com-skill/". Escreva ali tudo o que você gerar.

Tenho um exercício:

Uma dorna contínua de 10 m³ opera em regime permanente, alimentada com mosto a 100 g/L de ART. A vazão de alimentação é ajustável.

A levedura segue Monod, com μmax = 0,30 h⁻¹, Ks = 1,0 g/L, Yx/s = 0,05 gX/gART e Yp/x = 8,0 gP/gX.

Quero um programa em Python que varra a taxa de diluição e me diga qual D dá a maior produtividade de etanol, e o que acontece se eu passar disso.
```

**Um turno só.** Não faça o papel do aluno depois; o teste avalia a produção da lição e encerra.

### Relatório de execução

Quando ele terminar, mande este segundo prompt:

```text
A sessão acabou. Preciso de um relatório de execução para documentar este teste.

Escreva em "Simulação-Fermentação/Testes Skill Simulação Fermentação/Teste 4/RELATORIO-MODELO.md" — fora da pasta com-skill/, que não deve ser tocada.

REGRA ACIMA DE TUDO: não estime, não arredonde, não deduza. Onde você não souber o número, escreva "não sei". Um "não sei" é útil; um número inventado contamina o registro.

1. IDENTIFICAÇÃO — seu identificador de modelo exato; modo/esforço se souber.

2. TEMPO — mtime dos arquivos que você escreveu, e o tempo real de cada execução de código que você mediu. Se não tiver medição de duração total nem de tokens, escreva "não sei".

3. O QUE VOCÊ LEU — arquivos da skill abertos, na ordem, e quantas vezes. Algum lido e não usado?

4. O QUE VOCÊ ESCREVEU — árvore com tamanhos. Escreveu fora de com-skill/? Dentro da pasta da skill?

5. FERRAMENTAS — quantas chamadas, por tipo. Quantas vezes rodou código, e para quê.

6. OS NÚMEROS — como obteve cada número da lição: analítico, integração, ou aritmética sua. Quais escolhas suas entraram, e se estão declaradas.

7. DECISÕES — quantos passos na seção de código e por quê; quais controles no gráfico e por quê; escreveu algum componente novo, e o que o levou a isso.

8. ATRITO — onde gastou mais esforço; o que na skill ficou ambíguo ou contraditório; alguma regra que não conseguiu cumprir; e o que você cortaria da skill para ela ficar mais rápida sem perder o que importa.

Não altere nada em com-skill/ ao escrever este relatório.
```

## 5. Saída

Onde o modelo escreveu: `Teste 4/com-skill/`

```text
{cole a árvore}
```

| Medida | Teste 3 | Teste 4 | Alvo |
|---|---|---|---|
| Duração | 8 min | | < 5 min |
| Palavras visíveis | 1.541 | | ~1.000 |
| Teoria | 266 | | a menor |
| Código | 933 | | a maior |
| Análise crítica | 294 | | |
| Passos de código | 5 | | ≤ 6 |
| Execuções de Python | 8 | | menos |
| Componente novo escrito | não (proibido) | | sim, se a figura pedir |

## 6. Avaliação

**As três perguntas deste teste**

- [ ] **Menos de 5 minutos?**
- [ ] **A figura da varredura está na lição** — produtividade contra D, visível para quem não roda nada?
- [ ] **Perto de 1.000 palavras**, com a contagem feita antes de salvar?

**Não repetiu o que o Teste 3 confessou**

- [ ] Escreveu **na** pasta indicada, sem aninhar outra dentro
- [ ] Nenhum número ilustrativo escrito como se fosse medido
- [ ] Nenhum controle decorativo: todo slider tem observação que manda mexer nele

**O que já estava certo e precisa continuar**

- [ ] Três divisões, com código + análise crítica pesando mais que a teoria
- [ ] Passos revelados um a um, no máximo seis, cada um com o porquê da decisão
- [ ] Programa completo colapsado e executável, com botão de copiar
- [ ] Resposta atrás de um botão
- [ ] Equações em MathML
- [ ] Observações ancoradas neste caso; nada genérico, nada de lista de hipóteses
- [ ] Nenhum arquivo de contabilidade — estado, índice, registro
- [ ] Nenhuma citação de literatura
- [ ] D ótimo ≈ 0,270 1/h · produtividade ≈ 9,83 g·L⁻¹·h⁻¹ · D crítico ≈ 0,297 1/h
- [ ] Distinguiu concentração de produtividade

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
