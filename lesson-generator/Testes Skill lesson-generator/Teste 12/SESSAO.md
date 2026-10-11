# Teste 12 — otimização, com o enunciado na abertura e sem caixas de erro

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Teste | 12 |
| Data | 2026-10-11 |
| Quem rodou | Augusto, à mão; avaliação pela sessão de desenvolvimento |
| Foco | Num problema de otimização, a skill produz a lição certa e rápida? O quadro do enunciado, o nome curto da técnica, o "como" em lista e a ausência das caixas de erro funcionam como previsto? |

## 2. Versão da skill

| Campo | Valor |
|---|---|
| Commit da skill | `440c1f7` — Enunciado no comeco da licao, editor em dois blocos e sem caixas opcionais |
| Branch | `skill-geral` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 11

- `547a34d`: nome da técnica com até quatro palavras (aviso no `conferir.py`); o "como" pode ser uma lista (`ul.como`), e um passo pesado pode virar dois.
- `440c1f7`: a abertura começa pelo enunciado (`div.enunciado`, exigido pelo `conferir.py`); saem as caixas "o erro que parece certo" e "como saber que está certo" (recusadas pelo `conferir.py`); o editor em dois blocos.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, sessão nova iniciada à mão |
| Modelo | `claude-opus-5-5` |
| Esforço | médio |
| Diretório de trabalho | `~\testes-lesson-generator\teste-12`, pasta vazia fora do repositório |

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator A reação reversível e exotérmica A ⇌ B, de primeira ordem nos dois sentidos, é conduzida em fase líquida num CSTR com tempo de residência de 10 min, alimentado só com A. A 350 K, a constante de velocidade direta vale 0,050 min⁻¹ e a constante de equilíbrio vale 20. A energia de ativação da reação direta é 60 kJ/mol, e o calor de reação é −80 kJ/mol, ambos constantes. Em que temperatura o reator deve operar para a conversão de A ser máxima, e qual é essa conversão? Como muda a temperatura ótima se o tempo de residência dobrar?
```

### Cronômetro

| | Horário |
|---|---|
| Início | 00:56:24 UTC |
| Fim do turno 1 | 01:00:35 UTC |
| **Duração** | **4 min 11 s** (Teste 11: 4 min 09 s) |

Sessão: "Temperatura ótima reator CSTR", iniciada à mão.

## 5. Saída

```text
~\testes-lesson-generator\teste-12\
  licoes\
    temperatura-otima-de-um-cstr-com-reacao-reversivel.html   131 KB, arquivo único
```

Copiada para [com-skill/](./com-skill/). `conferir.py` na entrega: nenhum erro nem aviso de conteúdo (só os esperados de arquivo empacotado, com os componentes embutidos).

## 6. Avaliação

**Fluxo**

- [x] Skill invocada pelo comando; não entrevistou; destino padrão; rascunho apagado; sem commit; resposta em duas linhas

**O que mudou desde o Teste 11**

- [x] Quadro "O exercício" na abertura, com os dados e os símbolos marcados, e a lista com as duas perguntas (armadilha 7)
- [x] Nome curto da técnica: "Otimização em uma variável"; quadro sem aviso de tamanho
- [x] O "como" em lista no passo que chama o `minimize_scalar`
- [x] Nenhuma caixa de erro: o texto não força alerta onde não precisa
- [x] Quatro equações complementares com título (Arrhenius, van 't Hoff, constante inversa, conversão de equilíbrio)
- [x] Linhas de código com no máximo 68 caracteres; programa termina em `plt.show()`

**A lição**

- [x] Balanço com o consumo líquido (direta menos inversa), k₋₁ = k₁/K deduzido do equilíbrio, e a observação de que a inversa é mais sensível à temperatura (E₂ = 140 kJ/mol) (armadilhas 1 e 2)
- [x] Arrhenius e van 't Hoff na forma com temperatura de referência, em J/mol (armadilha 3)
- [x] Máximo por `minimize_scalar` no negativo da conversão, com intervalo (armadilha 4)
- [x] Verificação independente: a temperatura ótima por uma fórmula fechada (derivada nula), que dá os mesmos 376,6 K e 370,9 K; e a conversão sempre abaixo da de equilíbrio (armadilha 5)
- [x] Figura com a conversão e a conversão de equilíbrio contra a temperatura, controle de τ, observações ancoradas
- [x] Editor: os seis passos rodaram no Pyodide, com a figura; console limpo

**Correção técnica** (contra o [gabarito](./EXERCICIO.md), rodando o programa da lição)

- [x] τ = 10 min: 376,6 K, X = 0,551; X(350 K) = 0,328; X_eq no ótimo = 0,741
- [x] τ = 20 min: 370,9 K, X = 0,646; X_eq no ótimo = 0,810 (armadilha 6)

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|

Nenhum achado.

## 8. Veredito

**Aprovado, sem ressalvas.** 4 min 11 s, números exatos, uma verificação independente melhor que a pedida (a fórmula fechada do ótimo), e todas as mudanças desde o Teste 11 funcionando como previsto: enunciado em quadro, nome curto da técnica, "como" em lista e nenhuma caixa de erro.

## 10. Execução paralela: Sonnet 5.5

A mesma skill (`440c1f7`), o mesmo prompt e o mesmo protocolo, com um modelo menos capaz, para ver o quanto a skill serve a ele.

| Campo | Valor |
|---|---|
| Modelo | `claude-sonnet-5-5` |
| Esforço | médio, o padrão do Sonnet 5.5 no Claude Code, segundo a [documentação de configuração de modelo](https://code.claude.com/docs/en/model-config): "Opus 5.5, Sonnet 5.5, and Haiku 5.5 default to `medium`" |
| Diretório de trabalho | `~\testes-lesson-generator\teste-12-sonnet`, pasta vazia fora do repositório |
| Saída | `com-skill-sonnet/` |

### Cronômetro

| | Horário |
|---|---|
| Início | |
| Fim do turno 1 | |
| **Duração** | |

### Avaliação

### Comparação com o Opus 5.5

| | Opus 5.5 | Sonnet 5.5 |
|---|---|---|
| Duração | 4 min 11 s | |
| Números | todos certos | |
| Erros e avisos do `conferir.py` | nenhum | |
| Rodadas do `conferir.py` até zerar | | |
| Regras novas cumpridas | todas | |
| Achados | nenhum | |

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
