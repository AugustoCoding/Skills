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
| Commit da skill | `e40221d` — Explicar o mecanismo das funcoes entregues a bibliotecas e exigir figura no programa |
| Branch | `skill-geral` |
| Alterações locais não commitadas | não |
| Como a skill foi carregada | *junction* `~/.claude/skills/lesson-generator` → `lesson-generator/Skill lesson-generator/` |

### O que mudou desde o Teste 9

- `19022c7`: vírgula decimal no texto; `conferir.py` avisa ponto decimal e número de observação não impresso; "constante física" como procedência.
- `e40221d`: explicar quem chama uma função entregue a uma biblioteca, com que valores, e construções de iniciante (`y[0]`, `args=(…,)`, tupla); o programa termina com uma figura do matplotlib, e o `conferir.py` exige `plt.show()`.

## 3. Ambiente

| Campo | Valor |
|---|---|
| Cliente | Claude Code desktop, sessão nova iniciada à mão |
| Modelo | `claude-opus-5-5` |
| Esforço | médio |
| Diretório de trabalho | `~\testes-lesson-generator\teste-10`, pasta vazia fora do repositório |

Protocolo do [README dos testes](../README.md): sessão à mão, prompt como primeira mensagem, avaliação pelo histórico, pela lição e por conferência externa, sem pedir relatório ao modelo.

## 4. Entrada

### Prompt exato (turno 1)

```text
/lesson-generator Num reator batelada a volume constante, a decomposição de um reagente A foi acompanhada medindo a concentração dele ao longo do tempo: t (min) = 0, 5, 10, 20, 30, 45, 60, 90; CA (mol/L) = 2,00; 1,35; 0,98; 0,68; 0,49; 0,37; 0,28; 0,205. Determine a ordem da reação em relação a A e a constante de velocidade. Quanto tempo leva para a concentração de A cair a 0,25 mol/L?
```

### Cronômetro

| | Horário |
|---|---|
| Início | 17:28:27 UTC |
| Fim do turno 1 | 17:33:36 UTC |
| **Duração** | **5 min 09 s** (Teste 9: 5 min 02 s) |

Sessão: "Ordem de reação e constante de velocidade", iniciada à mão; o histórico confirma o `/lesson-generator` como comando.

## 5. Saída

```text
~\testes-lesson-generator\teste-10\
  licoes\
    ordem-de-reacao-a-partir-de-dados-de-batelada.html   106 KB, arquivo único
```

Copiada para [com-skill/](./com-skill/).

## 6. Avaliação

**Fluxo**

- [x] Skill invocada pelo comando; não entrevistou; destino padrão `./licoes`; rascunho apagado; sem commit
- [x] Resposta ao aluno em duas linhas, com os números certos e vírgula decimal

**As duas mudanças de `e40221d`**

- [x] **Mecanismo explicado**: o passo do ajuste diz que o `curve_fit` chama `CA_modelo(t_med, n, k)` a cada tentativa, com o vetor inteiro de tempos no primeiro argumento e o par em teste nos outros, por que `t` vem primeiro, o que ele faz com o que a função devolve (diferenças, quadrados, soma) e quando para. Também explica a função passada sem parênteses, `p0` na ordem dos parâmetros, `(k,)` e a vírgula, `CA_med[0]` e o índice que começa em zero, `**`, e por que `CA_n_fixo` existe.
- [x] **Figura no programa**: o último passo desenha medidas e modelo com `plt.show()`. No editor, os seis passos rodaram no Pyodide em 6,9 s e a figura apareceu na saída.

**A lição**

- [x] Balanço de massa deduzido em 7 etapas, com duas hipóteses que dizem o que mudaria (volume e temperatura constantes)
- [x] Quadro da técnica: "ajuste não linear por mínimos quadrados", com `curve_fit`
- [x] Ordem ajustada livre (1,996 ± 0,037), depois fixada em 2 com justificativa, e o tempo pedido pela equação integrada (armadilhas 1 e 4)
- [x] Unidade de k correta para n = 2 (armadilha 3)
- [x] Duas caixas "o erro que parece certo", ambas verdadeiras: chute n = 1 prende o ajuste em n = 1,000 (confirmado rodando), e `n_fixo = 1` divide por zero
- [x] Verificação independente pela reta de 1/C<sub>A</sub> contra t, com a diferença explicada (o peso dos pontos baixos na linearização)
- [x] Figura com controle de n (1 a 3) que reajusta k e mostra a soma dos quadrados; console limpo
- [x] Observações ancoradas nos dados; a de controle diz a mudança no código, e as afirmações conferem (n = 1,5 dá soma 38 vezes maior; n = 2,5, 26 vezes)

**Correção técnica** (contra o [gabarito](./EXERCICIO.md))

- [x] n = 2,00 (1,996 ± 0,037); k = 0,0499 L/(mol·min) com n = 2; 70,1 min até 0,25 mol/L

## 7. Achados

| # | Achado | Gravidade | Onde |
|---|---|---|---|
| 1 | O `conferir.py` deu aviso falso para números das observações que são medidas do enunciado (estão no programa, não na tabela) e para contas feitas à vista ("2,00 − 1,35 = 0,65") | atrapalha | `conferir.py`: aceitar os dados do programa e contas à vista com números conhecidos, refazendo a conta; `SKILL.md` 5 deixa a conta à vista explícita |

Nenhum achado na lição.

## 8. Veredito

**Aprovado, sem ressalvas na lição.** 5 min 09 s, números certos, as duas mudanças pedidas aplicadas com folga (a explicação do mecanismo do `curve_fit` é o melhor trecho de código de todos os testes), editor com figura. O único achado foi no verificador.

## 9. O que mudou depois deste teste

| Commit | O que corrigiu |
|---|---|
| `f20c2e4` | Achado 1: o `conferir.py` aceita os dados do programa e contas à vista (refazendo a conta); `SKILL.md` 5 explicita a regra |
