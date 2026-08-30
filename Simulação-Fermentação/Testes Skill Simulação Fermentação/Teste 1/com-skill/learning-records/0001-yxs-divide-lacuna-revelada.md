# Lacuna revelada: o sentido do fator de rendimento em dS/dt

O aluno perguntou, sem rodeios, por que `Yx/s` aparece dividindo e não multiplicando
em `dS/dt`. Isso confirma a aposta diagnóstica da primeira lição e estabelece que o
acoplamento por rendimento (degrau 3) **ainda não está vencido** — ele reconhece a
fórmula, mas não a reconstrói a partir da definição da razão.

**Degrau:** 3 (acoplamento de substrato) — em aberto.

**Evidência:** a pergunta em si, feita depois de a lição já trazer a explicação por
unidades ("os gX se cancelam"). O argumento dimensional não foi suficiente, o que
sugere que ele o lê como verificação e não como derivação. A explicação que foi para
a nota de dúvida trocou de registro: isolar ΔS algebricamente a partir de
`Yx/s = ΔX/ΔS`, mais a analogia de km/L, mais a checagem de magnitude (~22×).

**Implicações para as próximas lições:**

- Não promover `Yx/s` ao `GLOSSARY.md` ainda — falta evidência de uso correto e sem
  apoio.
- A lição de `solve_ivp` (degrau 5, já prometida) deve cobrar o `dS/dt` de memória
  antes de mostrar o código, como recuperação — é o espaçamento natural deste ponto.
- Vale plantar, em algum momento, o defeito "`* Yxs` no lugar de `/ Yxs`" no padrão
  "conserte o código quebrado": é o mesmo erro visto do lado do diagnóstico, e a
  magnitude ~22× dá ao aluno uma régua para achá-lo sozinho.
- Previsão: quem confunde o sentido de um fator de conversão tende a repetir a
  confusão em `Yp/x` contra `Yp/s`. Cobrar a distinção explicitamente quando o
  etanol voltar.
