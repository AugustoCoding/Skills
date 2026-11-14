# Skills

Skills for LLMs, each in its own folder with its development record. There is one so far: **lesson-generator**.

| Skill | What it does | Download |
|---|---|---|
| [lesson-generator](lesson-generator/) | Turns a chemical engineering exercise into an interactive HTML lesson that teaches the student to program the solution in Python | [lesson-generator.zip](https://github.com/AugustoCoding/Skills/releases/latest/download/lesson-generator.zip) |

## Installing a skill

1. Download the skill's `.zip` from the table above.
2. Attach the file to a message to your AI agent (Claude Code, Codex, claude.ai or another) and ask:

   ```text
   Install this skill for me.
   ```

The zip carries installation instructions written for the agent, which installs the skill in the right place and adapts it to your environment. There is one file for every environment.

On claude.ai the agent cannot change your account, so it will point you to the manual step: upload the same zip, without unzipping, in Settings › Capabilities › Skills.

## Repository layout

Each skill has a folder at the root, split in two sides: the skill and its reference output, and the record of how it was developed.

```text
<skill name>/
  README.md        the skill's presentation
  skill/           the skill itself: what the download contains and the model loads
  model/           a reference output of the skill
  development/     research and development
    tests/           one recorded run per test
    evaluation/      evaluation of the finished skill across models
    build_zip.py     builds the download
    INSTALL.md       the installation instructions that go inside the zip
```

`skill/` holds nothing beyond what the skill needs to work. Everything else stays outside it, so it does not enter the model's context.

## lesson-generator

The lesson derives the model, builds the program step by step with a check, and ends with an interactive figure and a Python editor that runs in the browser. It comes out as a single HTML file, in the language of the problem statement.

- [`lesson-generator/README.md`](lesson-generator/README.md): the idea, the structure of the lesson and the role of each file.
- [`lesson-generator/skill/`](lesson-generator/skill/): the skill's source.
- [`lesson-generator/model/`](lesson-generator/model/): a complete example lesson.
- [`lesson-generator/development/`](lesson-generator/development/): the tests that shaped the skill and the final evaluation, in which the frozen skill was run on 24 new exercises by three Claude models (72 runs). The records are in Portuguese; the result is in the [conclusion](lesson-generator/development/evaluation/resultados/CONCLUSAO.md).

The research is finished and the skill is frozen at the version that was evaluated. The Portuguese version of the skill, from before the translation to English, is at the tag [`versao-pt`](https://github.com/AugustoCoding/Skills/tree/versao-pt), with the folder names of that time.

## License

[MIT](LICENSE). It covers the skills, the scripts and the development records in this repository.
