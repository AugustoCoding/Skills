# Formato do Registro de Aprendizado

Registros de aprendizado vivem em `./learning-records/`, numerados sequencialmente: `0001-slug.md`, `0002-slug.md`, e assim por diante.

São o equivalente pedagógico de um ADR: capturam lições não óbvias, insights-chave e conhecimento prévio declarado que vão dirigir sessões futuras. São a base do cálculo da zona de desenvolvimento proximal — sem eles, toda sessão recomeça do zero e você acaba reensinando Monod pela terceira vez.

## Template

```md
# {Título curto do que foi aprendido ou estabelecido}

{1 a 3 frases: o que foi aprendido (ou qual conhecimento prévio foi estabelecido)
e por que isso muda o que ensinar em seguida.}
```

É o formato inteiro. Um registro pode ser um parágrafo. O valor está em registrar *que* isto agora é sabido e *por que* isso altera o próximo passo — não em preencher seções.

## Seções opcionais

Só inclua quando acrescentam valor real. A maioria dos registros não precisa.

- **Status** no frontmatter (`ativo | substituído por LR-NNNN`): útil quando um entendimento anterior se revela errado e é trocado.
- **Evidência**: como o aluno demonstrou o entendimento — a pergunta que respondeu, o exercício que completou, o erro que diagnosticou sozinho. Vale quando a afirmação pode ser revisitada.
- **Implicações**: o que isso libera ou descarta para as próximas sessões. Vale registrar quando não é óbvio.
- **Degrau**: qual degrau do mapa de progressão de [SKILL.md](./SKILL.md) isto vence. Útil porque o mapa é o que você consulta ao escolher o alvo da próxima lição.

## Numeração

Varra `./learning-records/`, pegue o maior número e some um.

## Quando escrever um registro

Escreva quando qualquer uma destas for verdade:

1. **O aluno demonstrou entendimento genuíno de algo não trivial.** Não exposição — evidência de que consegue usar o conceito corretamente. Isso estabelece um novo piso para o que ensinar em seguida.

2. **O aluno revelou conhecimento prévio.** "Eu já uso `solve_ivp` no laboratório." Registre para que sessões futuras não reensinem, e registre também a **profundidade** alegada, que costuma ser menor que a declarada.

3. **Uma concepção errônea foi corrigida.** O aluno acreditava em algo errado e agora vê por quê. São os registros de maior valor: predizem onde ele vai tropeçar em tópicos vizinhos. Neste domínio, quem confundia taxa específica com taxa volumétrica vai tropeçar de novo em produtividade e em manutenção celular — vale saber disso de antemão.

4. **A missão mudou em resposta ao aprendizado.** O aluno descobriu que se importava com outra coisa. Cruze com `MISSION.md` e atualize o arquivo.

### Gatilhos específicos deste domínio

Momentos concretos que costumam merecer registro:

- O aluno acertou o **sinal e o fator de rendimento** de `dS/dt` sem consultar.
- O aluno **previu a curva antes de rodar** e a previsão bateu — inclusive sabendo onde ela ia inflectir e por quê.
- O aluno **diagnosticou um gráfico errado** identificando o termo responsável, não por tentativa e erro.
- O aluno percebeu, sozinho, que **em quimiostato μ é imposto por D**, e não o contrário.
- O aluno **desconfiou do resultado numérico** — passo, tolerância, rigidez, concentração negativa — em vez de aceitar a curva.
- O aluno **rastreou um erro até uma unidade** (h contra min, g/L contra mol/L).
- O aluno reconheceu uma **limitação do modelo** sem que você apontasse.

### O que não qualifica

- Material que foi apenas coberto. Cobertura não é aprendizado — espere a evidência.
- Qualquer coisa que já esteja capturada de forma sucinta em [GLOSSARY.md](./GLOSSARY.md) como definição de termo. Não duplique: se cabe numa definição, é glossário; se é um insight que não cabe, é registro.
- Diário de atividade sessão a sessão. Registros não são log: são insights com valor de decisão.
- "O aluno rodou o código e funcionou." Rodar não é entender. O que interessa é se ele saberia refazer, ou se saberia dizer por que o resultado é plausível.

## Substituição

Quando um registro posterior contradiz um anterior (o entendimento do aluno aprofundou ou se corrigiu), marque o antigo como `Status: substituído por LR-NNNN` em vez de apagar. A história de como o entendimento evoluiu é sinal útil por si só — e neste domínio ela é comum: quase todo aluno passa por "rendimento é constante" antes de chegar em "rendimento observado varia porque existe manutenção".
