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

### Simulação-Fermentação

Skill para simulação de processos de fermentação em Python, com foco didático: modelagem, código executável, explicação técnica e interpretação de resultados.

- [`Simulação-Fermentação/Skill Simulação Fermentação/`](Simulação-Fermentação/Skill%20Simulação%20Fermentação/) — definição da skill (system prompt, regras, exemplos, casos guiados, templates e recursos).
- [`Simulação-Fermentação/Testes Skill Simulação Fermentação/`](Simulação-Fermentação/Testes%20Skill%20Simulação%20Fermentação/) — testes da skill (ainda vazia).

Ainda em desenvolvimento.
