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

Transforma um exercício de engenharia química numa lição HTML que ensina o aluno a programar a solução em Python: o modelo e o tipo de problema, o código explicado passo a passo com uma verificação, e uma figura interativa para ler o resultado.

- [`lesson-generator/README.md`](lesson-generator/README.md) — a apresentação do projeto: a ideia, a estrutura da lição, como instalar.
- [`lesson-generator/Skill lesson-generator/`](lesson-generator/Skill%20lesson-generator/) — a skill: o `SKILL.md`, o template e os componentes.
- [`lesson-generator/Modelo Skill lesson-generator/`](lesson-generator/Modelo%20Skill%20lesson-generator/) — uma lição de exemplo completa, onde a estrutura é revisada ao vivo antes de ir para a skill.
- [`lesson-generator/Testes Skill lesson-generator/`](lesson-generator/Testes%20Skill%20lesson-generator/) — testes da skill: uma pasta por execução, com o registro de reprodutibilidade e a saída do modelo.

Em desenvolvimento, com sete execuções de teste documentadas, todas com exercícios de fermentação, a área de origem da skill.
