# Skill: Simulação de Fermentação em Python

Esta skill orienta LLMs de alta capacidade a resolver e explicar, de forma didática, problemas de **simulação de processos de fermentação em Python**.

## Objetivo educacional
Permitir que estudantes forneçam um enunciado e recebam:
1. modelagem do problema,
2. código Python executável,
3. explicação técnica acessível,
4. interpretação dos resultados.

## Estrutura
- `system_prompt.md`: papel, tom e regras de comportamento da LLM.
- `rules.md`: fluxo operacional, restrições e critérios de qualidade.
- `templates/`: template de resposta e esqueleto de código Python.
- `examples/`: pares entrada/saída esperada para cenários comuns.
- `resources/`: equações e glossário técnico.
- `cases/`: casos guiados completos para estudo.

## Como usar com uma LLM
1. Carregue o conteúdo de `system_prompt.md` como instrução de sistema.
2. Inclua `rules.md` e recursos relevantes no contexto.
3. Passe ao modelo um enunciado do aluno.
4. Solicite que a resposta siga `templates/resposta.md`.
5. Adapte/expanda os casos em `cases/` para exercícios progressivos.

## Exemplos de aplicação
- Introdução a EDOs em bioprocessos.
- Comparação entre batelada e contínuo.
- Simulação básica de produção de etanol.
