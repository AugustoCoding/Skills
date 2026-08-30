# Recursos — Simulação de Fermentação

Fontes confiáveis deste workspace. O conhecimento das lições sai daqui, não de memória paramétrica. A sabedoria sai das comunidades listadas no fim.

> **Estado: sementes não verificadas.**
>
> As entradas abaixo são referências consagradas da área, registradas para dar ponto de partida à busca. **Nenhuma foi verificada nesta sessão**: edição, capítulo, DOI e link precisam ser conferidos antes de aparecerem citados em uma lição. Ao confirmar uma entrada, acrescente o link e remova a marca `[a verificar]`. Ao descobrir que uma é ruim ou está fora da missão, apague — cinco fontes afiadas valem mais que trinta medianas.

## Conhecimento

### Livros-texto de engenharia bioquímica

- **Doran, P. M. _Bioprocess Engineering Principles_, 2ª ed., Academic Press, 2013.** `[a verificar]`
  O mais acessível para quem está começando: balanços de massa, cinética e transferência com a matemática desenvolvida passo a passo. **Use para:** primeiros balanços, relações de rendimento, ordem de grandeza de parâmetros.

- **Schmidell, W.; Lima, U. A.; Aquarone, E.; Borzani, W. (org.). _Biotecnologia Industrial — Vol. 2: Engenharia Bioquímica_, Blucher.** `[a verificar]`
  Referência brasileira padrão, em português, com nomenclatura alinhada à usada nos cursos nacionais. **Use para:** vocabulário canônico em português, casos de fermentação alcoólica, convenções que o aluno vai reencontrar em prova.

- **Shuler, M. L.; Kargı, F.; DeLisa, M. _Bioprocess Engineering: Basic Concepts_, 3ª ed., Pearson, 2017.** `[a verificar]`
  Cobertura ampla de graduação, com bons capítulos sobre modelos não estruturados e operação de reatores. **Use para:** comparação entre regimes, batelada alimentada, exercícios de nível intermediário.

- **Villadsen, J.; Nielsen, J.; Lidén, G. _Bioreaction Engineering Principles_, 3ª ed., Springer, 2011.** `[a verificar]`
  Mais rigoroso e quantitativo, forte em estequiometria e modelagem cinética. **Use para:** quando o aluno passar do modelo não estruturado, ou precisar defender escolhas de modelagem.

- **Bailey, J. E.; Ollis, D. F. _Biochemical Engineering Fundamentals_, 2ª ed., McGraw-Hill, 1986.** `[a verificar]`
  Clássico. Antigo, mas o tratamento de cinética microbiana continua sendo referência. **Use para:** fundamentação histórica e derivações completas.

### Artigos originais de cinética

Vale levar o aluno à fonte primária: ver o formato original da equação que ele está usando muda a relação dele com o modelo.

- **Monod, J. (1949). "The Growth of Bacterial Cultures". _Annual Review of Microbiology_, 3, 371–394.** `[a verificar]`
  A origem de μ = μmax·S/(Ks+S). **Use para:** ensinar que Monod é ajuste empírico, não lei — ponto que corrige várias concepções errôneas de uma vez.

- **Herbert, D.; Elsworth, R.; Telling, R. C. (1956). "The continuous culture of bacteria: a theoretical and experimental study". _Journal of General Microbiology_, 14(3), 601–622.** `[a verificar]`
  Teoria do quimiostato, incluindo estado estacionário e washout. **Use para:** o degrau 6, especialmente para sustentar que μ = D.

- **Luedeking, R.; Piret, E. L. (1959). "A kinetic study of the lactic acid fermentation: batch process at controlled pH". _Journal of Biochemical and Microbiological Technology and Engineering_, 1(4), 393–412.** `[a verificar]`
  O modelo α/β de formação de produto. **Use para:** o degrau 4, distinguir produto associado e não associado ao crescimento.

- **Pirt, S. J. (1965). "The maintenance energy of bacteria in growing cultures". _Proceedings of the Royal Society B_, 163, 224–231.** `[a verificar]`
  Manutenção celular. **Use para:** explicar por que o rendimento observado não é constante — a resposta para "por que meu ajuste não fecha".

- **Aiba, S.; Shoda, M.; Nagatani, M. (1968). "Kinetics of product inhibition in alcohol fermentation". _Biotechnology and Bioengineering_, 10(6), 845–864.** `[a verificar]`
  Inibição por etanol. **Use para:** o degrau 7 e para qualquer missão que envolva fermentação alcoólica.

### Computação científica em Python

- **Documentação do `scipy.integrate.solve_ivp`** — https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html
  **Use para:** escolha de método, `t_eval`, `events`, `rtol`/`atol`, sistemas rígidos. É a fonte primária padrão para o degrau 5.

- **Guia de EDOs do SciPy** — https://docs.scipy.org/doc/scipy/tutorial/integrate.html
  **Use para:** a primeira integração numérica do aluno, antes de mergulhar na página de referência.

- **Virtanen, P. et al. (2020). "SciPy 1.0: fundamental algorithms for scientific computing in Python". _Nature Methods_, 17, 261–272.** `[a verificar]`
  **Use para:** citação formal do SciPy em relatório, TCC ou dissertação.

- **Documentação do Matplotlib** — https://matplotlib.org/stable/
  **Use para:** eixos, rótulos, eixo secundário quando S e X têm escalas muito diferentes.

- **Hairer, E.; Nørsett, S. P.; Wanner, G. _Solving Ordinary Differential Equations I / II_, Springer.** `[a verificar]`
  **Use para:** só quando o aluno perguntar por que o integrador falhou. Rigidez, controle de passo, métodos implícitos.

## Sabedoria (comunidades)

- **Grupo de pesquisa ou laboratório da própria instituição do aluno.**
  A comunidade de maior valor e a mais fácil de esquecer. **Use para:** validar se o modelo faz sentido para o processo real; conseguir dados experimentais de verdade.

- **SINAFERM — Simpósio Nacional de Bioprocessos** `[a verificar]`
  Encontro nacional da área de bioprocessos. **Use para:** ver o que se modela na prática no Brasil e com quem falar.

- **Computational Science Stack Exchange** — https://scicomp.stackexchange.com
  **Use para:** dúvidas de método numérico bem formuladas (rigidez, tolerância, integrador que não converge).

- **r/ChemicalEngineering e r/biotech (Reddit)** `[a verificar]`
  Sinal variável, mas úteis. **Use para:** sanity check de premissas de processo e perguntas de carreira.

## Lacunas

O que a missão pode exigir e ainda não está coberto. Isto dirige a próxima busca:

- **Rendimento prático de fermentação alcoólica**, com fonte citável — a faixa de
  "85–92% do máximo estequiométrico" foi usada em lição no dia 30/08 como estimativa
  de conhecimento geral, sem procedência, e já teve de ser marcada como tal por nota
  de dúvida. Procurar no capítulo de fermentação alcoólica do Schmidell (Vol. 2) e
  substituir. O teto de 0,511 gP/gART não precisa de fonte: decorre da estequiometria
  de Gay-Lussac.
- **Dados experimentais reais** para exercícios de ajuste de parâmetros (degrau 9) — idealmente um conjunto aberto de fermentação alcoólica ou lática, com X, S e P ao longo do tempo.
- **Valores de referência de μmax, Ks e rendimentos** com fonte citável, por microrganismo e condição. Enquanto não houver, todo parâmetro em lição deve ser marcado como ilustrativo.
- **Recurso em vídeo em português** sobre modelagem de biorreatores, para alunos que aprendem melhor assistindo.
- **Um artigo bem escolhido com figura reproduzível** — a lição mais forte possível para uma missão de pesquisa é reproduzir uma figura publicada.

## Preferências do aluno sobre comunidades

<!-- Se o aluno disser que não quer participar de comunidades, registre aqui e pare de propor. -->
