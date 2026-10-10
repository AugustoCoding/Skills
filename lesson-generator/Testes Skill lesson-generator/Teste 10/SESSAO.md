# Teste 10 — ajuste de cinética a dados medidos

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 10 |
| Data | 2026-10-10 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | Num problema de regressão, a skill explica o mecanismo da função entregue à biblioteca (`curve_fit`) e termina o programa com uma figura? E as correções do Teste 9 (vírgula decimal, números das observações) pegaram? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `b266a1e` — Explicar o mecanismo das funcoes entregues a bibliotecas e exigir figura no programa |
| Branch | `skill-geral` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 9

- `574dec5`: vírgula decimal no texto; `conferir.py` avisa ponto decimal e número de observação não impresso; "constante física" como procedência.
- `b266a1e`: explicar quem chama uma função entregue a uma biblioteca, com que valores, e construções de iniciante (`y[0]`, `args=(…,)`, tupla); o programa termina com uma figura do matplotlib, e o `conferir.py` exige `plt.show()`.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, sessão nova iniciada à mão |
| Modelo | `claude-opus-5-5` |
| Esforço | médio |
| Diretório de trabalho | `~\aula-teste-10`, pasta vazia fora do repositório |

Protocolo do [README dos testes](../README.md): sessão à mão, prompt como primeira mensagem, avaliação pelo histórico, pela lição e por conferência externa, sem pedir relatório ao modelo.

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator Num reator batelada a volume constante, a decomposição de um reagente A foi acompanhada medindo a concentração dele ao longo do tempo: t (min) = 0, 5, 10, 20, 30, 45, 60, 90; CA (mol/L) = 2,00; 1,35; 0,98; 0,68; 0,49; 0,37; 0,28; 0,205. Determine a ordem da reação em relação a A e a constante de velocidade. Quanto tempo leva para a concentração de A cair a 0,25 mol/L?
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
