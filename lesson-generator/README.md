# lesson-generator

A skill for AI assistants (Claude Code, claude.ai, ChatGPT/Codex) that turns a chemical engineering exercise into an **interactive HTML lesson**, which teaches the student to program the solution in Python.

The lesson does not just hand over the answer, nor is it a theory class: it derives the model, builds the program step by step, checks the result and lets the student explore it in an interactive figure and in a built-in Python editor.

The lesson is written in the language of the problem statement. The skill's instructions are in English; the fixed interface texts of the lesson exist in English and Portuguese.

## Design principles

1. **The technical knowledge belongs to the language model; the form belongs to the skill.** The language model already masters chemical engineering and can choose the right numerical technique (integrating, finding a root, fitting, optimizing). So the skill holds no theory and no catalog of methods, which would limit the solutions to whatever was listed. It only defines the pedagogical form: the structure of the lesson, the criteria of each section and the handling of numbers. In Test 7, removing all the domain content the skill carried did not reduce the correctness of the simulations.
2. **Copy and fill in, instead of generating.** Page, style and behavior are ready in templates and components. The language model fills in a skeleton and copies pieces from a catalog, which cuts the time and cost of generation and makes the lessons uniform.
3. **Verifiable rules live in scripts.** Whatever a script, a component or the template can guarantee does not stay as a text instruction. Every change to the structure of the lesson updates the checker (`check.py`) in the same commit, and the reference lesson must pass it without errors.
4. **Every number is traceable.** Each value quoted in the lesson is printed by the delivered program and has a declared source: given in the statement, derived, or a justified choice.

## Structure of the lesson

The lesson has four sections, always in this order:

1. **Opening**: the problem statement rewritten clearly, with the data and the list of what is asked, and two or three sentences about the process.
2. **The model**: each balance derived from the conservation principle to the final equation, in labeled steps (principle, translation, kinetics, assumption, algebra, definition); the parameter table with sources; and the technique box, which names the solution method and justifies the choice.
3. **The code**: up to six steps, each in three parts (intention, syntax, what the program now does), an independent check and the complete program.
4. **The result**: the numerical answer, the figure with up to four controls and observations anchored on the values of this exercise.

Beside the lesson there is a **Python editor** that runs in the browser itself: the student builds the program by bringing in the steps of the lesson, runs it and sees the output and the plots.

## Repository layout

```
lesson-generator/
  README.md          this document
  skill/             the skill: only what the language model uses
  model/             the reference lesson, where the structure is revised
  development/       research and development
    tests/             the test runs, with the record of each one (in Portuguese)
    evaluation/        the evaluation of the frozen skill across models (in Portuguese)
    build_zip.py       builds the .zip of the release
    INSTALL.md         the installation instructions that go inside the .zip
```

The skill folder holds only what enters the language model's context. This README, the reference lesson, the tests and the evaluation stay outside it because they serve development, not generation.

### The skill (`skill/`)

| File | Role |
|---|---|
| `SKILL.md` | The instructions the language model follows: goal, glossary, workflow, structure of the lesson, handling of numbers and technical constraints. |
| `agents/openai.yaml` | Configuration for Codex/ChatGPT: the skill only runs when the user calls it. |
| `templates/lesson.html` | The lesson skeleton: each element once, as a pattern to repeat, with `{…}` placeholders to fill. No content of a specific exercise. |
| `templates/pieces.html` | The catalog of ready content, with an index: a complete example derivation, mass and energy balances (tank, tube, separator), complementary equations (power law, Arrhenius) and one figure per kind of problem (ODEs in time, profile, two axes, sweep, crossing curves, data against model). It opens in the browser with every piece working. |
| `scripts/new_lesson.py` | Creates the lesson's draft (the template and a copy of the components) and records the delivery destination. |
| `scripts/check.py` | Checks the draft: runs the code steps in order, compares the answer with what the program prints, checks the structure of each section, flags unfilled placeholders and lists the numbers of the text for the source review. |
| `scripts/pack.py` | Runs `check.py` and refuses to pack a draft with errors; then builds the lesson as a single HTML file, without comments, writes it to the destination and deletes the draft. |

### Components (`skill/assets/`)

| File | Role |
|---|---|
| `lesson.css` | The sheet over the page background, typography (a single size scale; monospace only in code), equations, teaching blocks, light and dark themes, printing, and the color system: one color per section, one per quantity of the figure, red reserved for errors. |
| `lesson.js` | Turns the lesson's parts (the problem, the model, the code, the result) into tabs, one part on screen at a time, with each part's progress, a bar for the whole lesson and a "Continue" button at the end of each part. Joins the model section into a single timeline, numbered in sequence (the title of each balance names its first step; the table and the technique are the last items). The timelines of the derivation, the code and the observations: everything starts collapsed, each collapsed item is an aligned band, the next one to read is signaled and each item collapses by its dot or its title. The table of contents on the left, built from the structure, with the progress of each part and the current section. Also the copy button and Python syntax highlighting. |
| `plot.js` | Figures of the x versus y kind: the lesson registers the calculation and the component draws it, with controls, a second axis, experimental points and a readout under the cursor. It includes an integrator (RK4), root finding and `linspace`, and warns in the console about problems the author cannot see, such as a flattened curve. |
| `editor.js` | The Python editor (Pyodide, downloaded on first use). It starts empty; each code block of the lesson has a button that appends it to the editor. The output shows text, errors and figures. |
| `theme.js` | The light or dark theme button. |

The fixed texts the student sees (buttons, table of contents, the labels of the boxes) live in a small Portuguese/English dictionary at the top of each script and at the end of the labels in `lesson.css`, chosen by `<html lang>`: Portuguese when it starts with `pt`, English otherwise.

## Delivery

The student receives **a single HTML file**, with all components inlined: it opens with a double click, with no auxiliary folders. The delivery is the same in every environment. Only the editor needs internet, to download Python on first run.

The lesson is not edited after delivery and the skill keeps no state between sessions. Questions are answered in the chat; an expanded lesson, if asked for, is a new lesson.

## Usage

Download [lesson-generator.zip](https://github.com/AugustoCoding/Skills/releases/latest/download/lesson-generator.zip), attach it to a message to your AI agent and ask it to install the skill. The zip carries the instructions the agent needs for each environment (`development/INSTALL.md`), so there is a single file for all of them. Then call the skill by name, with the exercise.

What follows is how each environment is handled, and how to install from the repository itself.

**Claude Code.** Install the folder `skill/` as a personal skill in `~/.claude/skills/lesson-generator/` (a junction or symbolic link keeps the installation in sync with the repository), open a new session and call `/lesson-generator` followed by the exercise. The skill has `disable-model-invocation: true` and is never triggered on the model's own initiative.

**claude.ai.** Upload the release's zip, without unzipping, in Settings › Capabilities › Skills, with code execution turned on. To build it from the repository, run `python development/build_zip.py`, which writes `dist/lesson-generator.zip` with the frontmatter claude.ai accepts. There is no lock against automatic triggering there; the skill's description restricts its use to explicit requests.

**Codex/ChatGPT.** The file `agents/openai.yaml` disables implicit invocation; the skill is called by name.

## Development and validation

Changes to the structure of the lesson are made on the reference lesson (`model/`), whose README describes the workflow. Each relevant version of the skill is validated by a recorded run in `development/tests/`, with the exercise, the planned traps, the answer key, the evaluation and the resulting fixes.

The Portuguese version of the skill, as it was before the translation, is kept in the tag [`versao-pt`](https://github.com/AugustoCoding/Skills/tree/versao-pt), with the folder names of that time.

## Evaluation across models

With the skill frozen, it was run on 24 new exercises by Claude Opus 5.5, Sonnet 5.5 and Haiku 5.5 (72 runs), each lesson scored item by item and compared in pairs. All 72 lessons got every answer of the key right; the models differ in how much the lesson explains and how long it takes. Opus 5.5 delivers the best lesson, Sonnet 5.5 is the best value, and Haiku 5.5 is not recommended. The method, the data and the limits are in [`development/evaluation/`](development/evaluation/), with the result in [`resultados/CONCLUSAO.md`](development/evaluation/resultados/CONCLUSAO.md).
