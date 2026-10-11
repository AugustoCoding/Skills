# Skills

A collection of skills for LLMs. Each skill gathers the instructions, examples and resources needed to guide a model in solving a specific kind of problem, together with a separate area for testing that skill.

## Layout

Each skill lives in its own folder at the root of the repository, with its subfolders:

```text
<Skill name>/
  Skill <Skill name>/          # the skill's definition (what is loaded into the model's context)
  Testes Skill <Skill name>/   # validation of the skill: one recorded run per test
```

The separation between the skill folder and the test folder is deliberate: the `Skill .../` folder is what gets loaded into the model's context, so it must hold nothing beyond what the skill needs to work. The tests stay outside, so they do not contaminate that context.

## Available skills

### lesson-generator

Turns a chemical engineering exercise into an HTML lesson that teaches the student to program the solution in Python: the model and the technique that solves it, the code explained step by step with a check, and an interactive figure to read the result.

- [`lesson-generator/README.md`](lesson-generator/README.md) — the project's presentation: the idea, the structure of the lesson, how to install it.
- [`lesson-generator/Skill lesson-generator/`](lesson-generator/Skill%20lesson-generator/) — the skill: `SKILL.md`, the templates and the components.
- [`lesson-generator/Modelo Skill lesson-generator/`](lesson-generator/Modelo%20Skill%20lesson-generator/) — a complete example lesson, where the structure is revised live before it goes to the skill.
- [`lesson-generator/Testes Skill lesson-generator/`](lesson-generator/Testes%20Skill%20lesson-generator/) — the skill's tests: one folder per run, with its reproducibility record and the model's output (in Portuguese).
