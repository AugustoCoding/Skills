# Formato do `RESOURCES.md`

`RESOURCES.md` é o conjunto curado de fontes confiáveis deste workspace. O conhecimento das lições é extraído daqui, não de suposições paramétricas. A sabedoria vem das comunidades listadas.

## Estrutura

```md
# Recursos — Simulação de Fermentação

## Conhecimento

### Livros-texto de engenharia bioquímica
- **{Autor. _Título_, edição, editora, ano.}**
  {Uma linha: o que cobre.} **Use para:** {quando recorrer a esta fonte.}

### Artigos originais de cinética
- **{Citação completa}**
  {O que estabelece.} **Use para:** {qual degrau do mapa de progressão sustenta.}

### Computação científica em Python
- **{Documentação ou referência}** — {link}
  **Use para:** {qual dúvida técnica resolve.}

## Sabedoria (comunidades)
- **{Comunidade}**
  {Por que tem sinal.} **Use para:** {que tipo de pergunta levar até lá.}

## Lacunas
- {O que a missão exige e ainda não está coberto}
```

## Regras

- **Só alta confiança.** Prefira fontes primárias, autores reconhecidos, trabalho revisado por pares e comunidades bem moderadas. Neste domínio, a armadilha específica são materiais de curso e blogs que repetem a equação de Monod sem contexto e propagam valores de parâmetro sem procedência. Se é marketing ou material didático de terceira mão vestido de educação, fora.

- **Anote toda entrada.** Um link nu é inútil em três meses. Uma linha do que cobre e, principalmente, **quando recorrer a ela**. Amarrar a anotação a um degrau do mapa de progressão de [SKILL.md](./SKILL.md) é o que torna a lista operacional.

- **Agrupe em Conhecimento / Sabedoria.** Espelha a filosofia. Uma fonte pode aparecer em um grupo só.

- **Separe livro-texto, artigo original e documentação.** Servem a coisas diferentes: livro-texto para construir entendimento, artigo original para mostrar que o modelo é escolha humana e não lei natural, documentação para o código funcionar.

- **Marque o que não foi verificado.** Use `[a verificar]` em entradas registradas de memória. Uma citação de aparência precisa e procedência inventada é pior que nenhuma citação: ela ensina errado com cara de rigor. Só remova a marca depois de confirmar edição, DOI ou link.

- **Parâmetro exige procedência.** Se uma fonte é a origem de um valor numérico usado em lição (μmax, Ks, Yx/s, constante de inibição), registre também **o organismo e a condição** a que o valor se refere. Valor sem condição não é dado, é chute com decimais.

- **Exponha as lacunas.** Se a missão precisa de algo que nenhuma fonte cobre, escreva na seção `## Lacunas`. É isso que dirige a próxima busca — e o que impede você de preencher o buraco com invenção.

- **Pode ser em português.** A nomenclatura brasileira do domínio tem convenções próprias, e o aluno vai ser avaliado nelas. Uma boa fonte em português vale mais que uma equivalente em inglês quando a missão é acadêmica no Brasil.

- **Pode em outras línguas.** Se um artigo original é a melhor fonte, ele entra mesmo assim — e você faz a ponte na lição.

- **Pode ser podado sem dó.** Uma fonte que se mostrou errada, rasa ou fora da missão deve ser removida, não enterrada.

- **Registre a preferência sobre comunidades.** Se o aluno optou por não participar de nenhuma, anote aqui para que sessões futuras parem de propor.
