# Skills

Coleção de skills para uso com LLMs. Cada skill reúne as instruções, exemplos e recursos necessários para orientar um modelo a resolver um tipo específico de problema, junto com uma área separada para testar essa skill.

## Estrutura

Cada skill vive em sua própria pasta na raiz do repositório, com duas subpastas:

```text
<Nome da Skill>/
  Skill <Nome da Skill>/     # definição da skill (o que é carregado no contexto do modelo)
  Testes Skill <Nome da Skill>/   # validação da skill: comparação de saídas com e sem a skill
```

A separação entre a pasta da skill e a pasta de testes é proposital: a pasta `Skill .../` é o que se carrega no contexto do modelo, então ela não deve conter nada além do que a skill precisa para funcionar. Os testes ficam fora, para não contaminar esse contexto.

## Skills disponíveis

### lesson-generator

Transforma um exercício de fermentação numa lição HTML que ensina o aluno a programar aquela simulação em Python: teoria breve, o código explicado passo a passo, e um gráfico interativo para ler o resultado.

- [`lesson-generator/Skill lesson-generator/`](lesson-generator/Skill%20lesson-generator/) — definição da skill (system prompt, regras, exemplos, casos guiados, templates e recursos).
- [`lesson-generator/Testes Skill lesson-generator/`](lesson-generator/Testes%20Skill%20lesson-generator/) — testes da skill: uma pasta por execução, com o registro de reprodutibilidade e a saída do modelo.

Em desenvolvimento, com quatro execuções de teste documentadas.
