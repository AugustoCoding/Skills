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
