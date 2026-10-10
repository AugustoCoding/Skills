# Teste 11 — template só com padrões, num problema de valor de contorno

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 11 |
| Data | 2026-10-10 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | Com o template só com padrões e o conteúdo no `pecas.html`, o modelo monta uma lição certa e rápida num problema que não tem peça pronta (difusão com reação)? As regras novas (símbolos marcados, `data-titulo`, linhas curtas) pegaram? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `6503118` — Equacoes: medir o proprio math, que e quem rola, para encolher a fonte |
| Branch | `skill-geral` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 10

- **Para o modelo:** template só com padrões (cada elemento uma vez, sem conteúdo de exercício); `pecas.html` com índice, dedução completa de exemplo e equações complementares; marcadores dentro de atributos; todo símbolo do texto marcado; `data-titulo` nas equações complementares; linhas de código de até 70 caracteres; vírgula decimal e conta à vista nas observações.
- **No `conferir.py`:** marcador esquecido em atributo, classe de tipo, procedência ou balanço inexistente, `data-titulo` faltando, números de observação conferidos contra os dados do programa e contas à vista refeitas.
- **Na página (não afeta o modelo):** folha na altura da tela, sumário lateral, modelo numa linha só, editor como folha lado a lado, fontes e cores revistas, equações e código encolhendo para caber.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, sessão nova iniciada à mão |
| Modelo | `claude-opus-5-5` |
| Esforço | médio |
| Diretório de trabalho | `~\testes-lesson-generator\teste-11`, pasta vazia fora do repositório |

Protocolo do [README dos testes](../README.md): sessão à mão, prompt como primeira mensagem, avaliação pelo histórico, pela lição e por conferência externa.

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator Uma pastilha de catalisador em forma de placa, com 4 mm de espessura, está exposta dos dois lados a um gás em que a concentração do reagente A na superfície da pastilha é 10 mol/m³. Dentro da pastilha, A se difunde com difusividade efetiva de 2,0·10⁻⁹ m²/s e é consumido por uma reação de primeira ordem com k = 2,0·10⁻³ s⁻¹ (por volume de pastilha). Calcule o perfil de concentração de A dentro da pastilha, a concentração no centro e o fator de efetividade. O que acontece com o fator de efetividade se a pastilha tiver o dobro da espessura?
```

### Cronômetro

| | Horário |
|---|---|
| Início | 19:22:55 UTC |
| Fim do turno 1 | 19:27:03 UTC |
| **Duração** | **4 min 09 s** (Teste 10: 5 min 09 s) |

Sessão: "Perfil de concentração em pastilha catalítica", iniciada à mão.

## 5. Saída

```text
~\testes-lesson-generator\teste-11\
  licoes\
    difusao-e-reacao-numa-pastilha-de-catalisador.html   129 KB, arquivo único
```

Copiada para [com-skill/](./com-skill/). `conferir.py` na entrega: nenhum erro; um aviso (técnica com 124 palavras).

## 6. Avaliação

**Fluxo**

- [x] Skill invocada pelo comando; não entrevistou; destino padrão; rascunho apagado; sem commit; resposta em duas linhas
- [x] Verificou no navegador (ferramenta de pré-visualização). Uma tentativa paralela de `python -m http.server` falhou (código 127) sem consequência

**O que mudou desde o Teste 10**

- [x] Template só com padrões: a lição tem um balanço com 8 etapas (três hipóteses), três equações complementares e seis passos, sem traço da estrutura antiga
- [x] Peça montada do zero no padrão do catálogo (não há balanço de difusão no `pecas.html`), com chaves nos termos
- [x] `data-titulo` nas três equações complementares ("Condições de contorno", "Fator de efetividade", "Solução analítica, para conferência")
- [x] Linhas de código com no máximo 64 caracteres
- [x] Resposta com vírgula decimal; programa termina em `plt.show()`

**A lição**

- [x] Simetria usada e explicada (meia espessura, derivada nula no centro), com "o erro que parece certo" de usar a espessura inteira, com o sintoma exato (armadilhas 1 e 2)
- [x] Quadro da técnica: "problema de valor de contorno, resolvido por colocação", com `solve_bvp`
- [x] EDO de segunda ordem reescrita como duas de primeira, e por quê (armadilha 4)
- [x] Mecanismo explicado: quem chama `edo` e `contorno`, com que formato (z como a malha inteira, y como tabela de duas linhas, `ya` e `yb` como as duas pontas), o que é resíduo, a malha inicial, o chute, a tolerância e o refinamento
- [x] Fator de efetividade definido e calculado; conferência contra a solução analítica (armadilhas 5 e 6)
- [x] Figura com dois controles (espessura e k), observações ancoradas, incluindo a de que quadruplicar k equivale a dobrar a espessura
- [x] Editor: os seis passos rodaram no Pyodide, com a figura na saída
- [ ] O quadro da técnica passou do tamanho (124 palavras; o aviso pede até umas 100)
- [ ] O passo 4 tem um "como" muito longo (todos os argumentos de `solve_bvp`, o chute e o objeto `sol` num parágrafo só)

**Correção técnica** (contra o [gabarito](./EXERCICIO.md))

- [x] φ = 2,00; centro 2,658 mol/m³; η = 0,4820
- [x] Espessura dobrada: centro 0,366 mol/m³; η = 0,2498; razão 0,518
- [x] Afirmação da observação de controle (k quadruplicado) confere: φ = 4

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | Quadro da técnica com 124 palavras: o nome da técnica longo e a explicação da colocação incharam o quadro | cosmético | nenhum; o aviso do `conferir.py` funcionou |
| 2 | Um "como" muito longo no passo que chama a função de biblioteca: com todos os argumentos explicados, o parágrafo fica pesado | observar | talvez permitir dividir o "como" em itens, ou o passo em dois |

## 8. Veredito

**Aprovado.** O menor tempo dos testes (4 min 09 s), números idênticos ao gabarito, a peça que faltava no catálogo montada no padrão, e todas as regras novas cumpridas. Os dois achados são de forma, não de conteúdo.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `547a34d` | Achado 1: nome da técnica com até quatro palavras (SKILL.md, template, aviso no conferir.py). Achado 2: o "como" pode ser uma lista, um item por argumento (ul.como), e um passo pesado pode virar dois; a lição modelo mostra a lista no passo da integração |
