# Modelo da lição

Uma lição de exemplo completa, com números reais, onde a estrutura da lição é desenhada e revisada **antes** de ir para a skill e para os testes.

O fluxo:

1. Altera-se a estrutura aqui, em `licao-modelo.html`, olhando a página ao vivo.
2. O que se firmar como preferência é registrado na skill: a regra no `SKILL.md`, a marcação em `templates/licao.html` e o estilo ou o comportamento em `assets/`.
3. Só então a mudança vai a um teste.

**A lição aponta para os `assets/` da própria skill** (`../Skill lesson-generator/assets/`), e não para uma cópia. Uma mudança de CSS ou de JS aparece aqui na hora, e o modelo nunca fica com componente desatualizado.

Esta pasta fica fora de `Skill lesson-generator/` de propósito: ela não vai para o contexto do modelo, assim como os testes. A skill leva as regras e o template, não este exemplo, para que o próximo exercício não tente imitá-lo.

## Ver ao vivo

Por `file://` o navegador não carrega os `assets/`, então é preciso um servidor na raiz do repositório:

```
python -m http.server 8731 --bind 127.0.0.1
```

e abrir `http://localhost:8731/lesson-generator/Modelo%20Skill%20lesson-generator/licao-modelo.html`. No Claude Code, a configuração `modelo-licao` em `.claude/launch.json` faz isso.

## O exercício do modelo

A partida de um CSTR isotérmico com reação A → B de primeira ordem, saindo de um tanque cheio de solvente puro. Ele foi escolhido porque é curto e passa por todos os momentos da lição:

- um balanço de três termos, para as chaves;
- uma solução exata, para a conferência;
- um evento, para o instante de 95%;
- dois controles com efeitos opostos;

Os números da lição saem do programa publicado nela, conferidos rodando.
