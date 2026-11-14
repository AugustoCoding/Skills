# Skills

Skills for LLMs, each with its tests and evaluation. There is one so far: **lesson-generator**.

## lesson-generator

A skill for AI assistants (claude.ai, Claude Code, Codex/ChatGPT) that turns a chemical engineering exercise into an **interactive HTML lesson**, which teaches the student to program the solution in Python: the model and the technique that solves it, the code explained step by step with a check, and an interactive figure to read the result.

### Download

| Where you use it | File |
|---|---|
| **claude.ai** | [**lesson-generator.zip**](https://github.com/AugustoCoding/Skills/releases/latest/download/lesson-generator.zip) |
| **Claude Code** or **Codex** | [**lesson-generator-claude-code.zip**](https://github.com/AugustoCoding/Skills/releases/latest/download/lesson-generator-claude-code.zip) |

Both are on the [latest release](https://github.com/AugustoCoding/Skills/releases/latest).

### Install

**claude.ai.** Open Settings › Capabilities › Skills and upload `lesson-generator.zip` as it is, without unzipping. Code execution must be turned on.

**Claude Code.** Unzip `lesson-generator-claude-code.zip` into `~/.claude/skills/`, so that `~/.claude/skills/lesson-generator/SKILL.md` exists, and open a new session.

**Codex.** Unzip the same file into `~/.codex/skills/`.

### Use

Call the skill by name and paste the exercise:

```text
/lesson-generator <the problem statement>
```

On claude.ai, write "use lesson-generator on this exercise" followed by the statement. The skill only runs when asked for by name. The lesson comes out as a single HTML file, in the language of the statement, and opens with a double click.

### Learn more

- [`lesson-generator/README.md`](lesson-generator/README.md): the idea, the structure of the lesson and the role of each file.
- [`lesson-generator/Skill lesson-generator/`](lesson-generator/Skill%20lesson-generator/): the skill's source, which is what the downloads contain.
- [`lesson-generator/Modelo Skill lesson-generator/`](lesson-generator/Modelo%20Skill%20lesson-generator/): a complete example lesson.

## Research record

The skill was developed and evaluated as a research project, and the repository keeps the record of it (in Portuguese).

- [`lesson-generator/Testes Skill lesson-generator/`](lesson-generator/Testes%20Skill%20lesson-generator/): the tests that shaped the skill, one folder per run, with the reproducibility record and the model's output.
- [`lesson-generator/Avaliacao Skill lesson-generator/`](lesson-generator/Avaliacao%20Skill%20lesson-generator/): the final evaluation, with the frozen skill run on 24 new exercises by three Claude models (72 runs): the metric, the scripts, every delivered lesson and the [conclusion](lesson-generator/Avaliacao%20Skill%20lesson-generator/resultados/CONCLUSAO.md).

The research is finished and the skill is frozen at the version that was evaluated. The Portuguese version of the skill, from before the translation to English, is at the tag [`versao-pt`](https://github.com/AugustoCoding/Skills/tree/versao-pt).

## Repository layout

Each skill lives in its own folder at the root of the repository:

```text
<skill name>/
  Skill <skill name>/            # the skill: what is loaded into the model's context
  Modelo Skill <skill name>/     # a reference output
  Testes Skill <skill name>/     # one recorded run per test
  Avaliacao Skill <skill name>/  # evaluation of the finished skill across models
```

The `Skill .../` folder holds nothing beyond what the skill needs to work. The tests and the evaluation stay outside it, so they do not contaminate the model's context.

## License

[MIT](LICENSE). It covers the skill, the scripts and the test and evaluation records in this repository.
