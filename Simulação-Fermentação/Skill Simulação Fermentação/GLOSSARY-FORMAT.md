# Formato do `GLOSSARY.md`

`GLOSSARY.md` é a linguagem canônica deste workspace. Todas as lições, exercícios, documentos de referência e registros de aprendizado obedecem à sua terminologia. Construí-lo é, em si, parte do aprendizado: comprimir um conceito em uma definição apertada é evidência de que o aluno o entendeu.

Isto importa mais neste domínio do que na média. Fermentação carrega símbolos parecidos com significados diferentes (Yx/s e Yp/x), palavras usadas de forma ambígua na literatura ("rendimento", "taxa", "produtividade") e traduções que não coincidem entre o português e o inglês. Um glossário firme evita que o aluno acerte a conta e erre a interpretação.

## Estrutura

```md
# Glossário — Simulação de Fermentação

{Uma ou duas frases descrevendo o recorte do domínio.}

## Termos ativos

**Taxa específica de crescimento (μ)**:
Velocidade de crescimento por unidade de biomassa presente, em 1/h. É o que multiplica X
para dar a taxa volumétrica de crescimento.
_Evite_: taxa de crescimento, velocidade de crescimento

**Washout**:
Condição de operação contínua em que a diluição remove células mais rápido do que elas
crescem, levando X ao zero em estado estacionário.
_Evite_: lavagem, arraste celular

## Convenções de símbolos
{Tabela símbolo / grandeza / unidade, fixada desde o início.}

## Termos candidatos
{Vocabulário que aparece nas lições mas ainda não tem evidência de uso correto.}
```

## Regras

- **Só promova o termo quando o aluno o entender.** Este é o ponto central. Se o aluno acabou de ser apresentado ao conceito, ele fica em "Termos candidatos". Ele sobe quando usa o termo corretamente e sem apoio — de preferência, escrevendo ele mesmo a definição. Neste domínio, o teste prático é: **o aluno consegue dizer a unidade e uma consequência?** Quem sabe que Ks está em g/L e que Ks alto significa baixa afinidade entendeu Ks; quem só sabe onde ele aparece na fórmula, não.

- **Seja opinativo.** Quando existem várias palavras para a mesma coisa, escolha a melhor e liste as demais como sinônimos a evitar. É assim que a linguagem comprime. Prefira o termo com que o aluno será avaliado na régua da missão dele.

- **Definições apertadas.** Uma ou duas frases. Defina o que o termo **é**, não o que ele faz nem como se calcula. "Ks é a constante de saturação" não define nada; "Ks é a concentração de substrato em que μ vale metade de μmax" define.

- **Toda definição carrega a unidade.** Sem exceção. Termo do domínio sem unidade é definição pela metade.

- **Use os próprios termos do glossário dentro das definições.** Uma vez que um termo está ativo, prefira-o em todo lugar, inclusive dentro de outras definições. É o que torna os termos complexos mais fáceis depois.

- **Agrupe em subtítulos** quando surgirem grupos naturais (`## Cinética`, `## Regimes de operação`, `## Numérico`). Lista plana serve enquanto os termos coerem entre si.

- **Sinalize ambiguidades explicitamente.** Se um termo é usado de forma frouxa na literatura, resolva por escrito: "neste workspace, 'produtividade' é sempre volumétrica em produto, g·L⁻¹·h⁻¹; concentração final é outra coisa." Essas resoluções são o que impede o aluno de importar confusão de fora.

- **Revise conforme o entendimento amadurece.** A definição que o aluno escreveu na semana um pode estar errada na semana seis — tipicamente porque ele descobriu uma exceção (rendimento que deixa de ser constante quando a manutenção entra). Atualize no lugar; não deixe entrada obsoleta.

- **Não duplique registro de aprendizado.** Se o conceito cabe numa definição, ele mora aqui. O registro de aprendizado existe para o insight que não cabe numa definição.
