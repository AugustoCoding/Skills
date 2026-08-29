# Formato do `MISSION.md`

`MISSION.md` fica na raiz do workspace. Captura a *razão* pela qual o aluno está aprendendo a simular fermentação. Toda decisão de ensino — o que ensinar em seguida, qual fonte trazer, qual exercício desenhar — deve poder ser rastreada até este documento.

## Template

```md
# Missão: Simulação de Fermentação

## Por que
{1 a 3 frases. O objetivo concreto e real. O que muda no trabalho, no curso ou na
pesquisa do aluno quando ele tiver essa habilidade. Fuja de formulações abstratas
como "entender bioprocessos"; empurre até o resultado subjacente.}

## Sucesso é
- {Uma coisa específica e observável que o aluno vai conseguir fazer}
- {Outra}
- {…}

## Restrições
- {Prazo, tempo semanal, ambiente Python, base matemática, disciplinas cursadas,
  ferramentas permitidas — o que limita a abordagem}

## Fora de escopo
- {Tópicos adjacentes que o aluno decidiu não perseguir agora, protegendo a zona
  de desenvolvimento proximal}
```

## Perguntas de entrevista

Se o aluno não consegue articular a missão, entreviste antes de escrever qualquer coisa. Estas perguntas costumam destravar a missão neste domínio — vá do concreto para o abstrato, nunca o contrário:

**O gatilho**
- O que aconteceu que fez você precisar disso agora? Uma disciplina, um estágio, uma iniciação científica, um TCC, uma vaga?
- Se estiver tudo resolvido daqui a três meses, o que você vai estar entregando para alguém?

**O objeto**
- Existe um processo específico? Qual microrganismo, qual substrato, qual produto?
- É um sistema real (bancada, planta, dados de artigo) ou o exercício de uma disciplina?
- Você tem dados experimentais em mãos, ou vai simular sem dados?

**O regime**
- Batelada, batelada alimentada, contínuo — ou você ainda não sabe qual é o seu caso? (Não saber é resposta legítima e informa o degrau de entrada.)

**A régua**
- Quem vai avaliar o resultado: um professor, um orientador, um supervisor de estágio, você mesmo?
- Que forma esse resultado tem: prova com papel e caneta, código rodando, gráfico em relatório, capítulo de dissertação?

**A base**
- O que você já consegue fazer hoje? Já escreveu algum código em Python? Já resolveu EDO numericamente? Já viu Monod?
- Qual foi a última vez que travou nesse assunto, e onde exatamente travou?

**O limite**
- Quanto tempo por semana? Até quando?
- Onde você roda código: Colab, Anaconda, VS Code, nada instalado ainda?

A resposta a "o que você já consegue fazer hoje" e a "onde exatamente travou" muitas vezes já vale um registro de aprendizado inicial de conhecimento prévio. Escreva-o.

## Regras

- **Uma missão por workspace.** Se o aluno quer aprender simulação de fermentação e, digamos, análise estatística de dados ômicos, são dois workspaces.
- **Concreto vence abstrato.** "Simular a dorna de etanol da usina onde estagio e apresentar o resultado ao supervisor em novembro" vence "aprender bioprocessos". "Passar em Engenharia Bioquímica II" é concreto e perfeitamente válido — a prova é uma régua real.
- **Empurre contra a vagueza.** Se o aluno não consegue dizer por quê, entreviste. Não escreva uma missão de fachada só para desbloquear a sessão.
- **A missão define o rigor.** Um aluno que precisa passar numa prova escrita precisa reconstruir balanços à mão; um que precisa entregar um gráfico para o supervisor precisa de código robusto e de leitura crítica de resultado. São cursos diferentes a partir do mesmo conteúdo.
- **Revise quando a realidade mudar.** Missões mudam — é comum o aluno descobrir, no degrau 5, que o problema dele era outro. Atualize o arquivo e escreva o registro de aprendizado; não deixe missão velha dirigindo sessões futuras.
- **Mantenha curto.** Se `MISSION.md` passa de uma tela, deixou de ser bússola e virou plano de curso.
