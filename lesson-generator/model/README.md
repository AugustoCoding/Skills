# The model lesson

A complete example lesson, with real numbers, where the structure of the lesson is designed and revised **before** it goes to the skill and to the tests.

The workflow:

1. The structure is changed here, in `model-lesson.html`, looking at the live page.
2. Whatever settles as a preference is recorded in the skill: the rule in `SKILL.md`, the markup in `templates/lesson.html` and the style or behavior in `assets/`.
3. If the change is structural (classes, order of the sections, steps, answer, observations), the skill's `scripts/check.py` changes with it, and the model lesson must pass it without errors:

   ```
   python ../skill/scripts/check.py model-lesson.html
   ```

4. Only then does the change go to a test.

**The lesson points to the skill's own `assets/`** (`../skill/assets/`), not to a copy. A CSS or JS change shows up here at once, and the model never has an outdated component.

This folder stays outside `skill/` on purpose: it does not go into the model's context, just like the tests. The skill carries the rules and the template, not this example, so the next exercise does not try to imitate it.

## Screenshots

`screenshots/` holds the four images shown in the READMEs, one per part of the lesson. When the lesson's look changes, take them again.

## Seeing it live

The published version is at <https://augustocoding.github.io/Skills/lesson-generator/model/model-lesson.html>, served by GitHub Pages from the `main` branch (the empty `.nojekyll` at the root makes Pages serve the files as they are). To see local changes:

Over `file://` the browser does not load the `assets/`, so a server at the root of the repository is needed:

```
python -m http.server 8731 --bind 127.0.0.1
```

and open `http://localhost:8731/lesson-generator/model/model-lesson.html`. In Claude Code, the `model-lesson` configuration in `.claude/launch.json` does this.

## The model's exercise

The start-up of an isothermal CSTR with a first-order reaction A → B, starting from a tank full of pure solvent. It was chosen because it is short and goes through every part of the lesson:

- a three-term balance, for the braces;
- an exact solution, for the check;
- an event, for the 95% instant;
- two controls with opposite effects.

The numbers of the lesson come from the program published in it, checked by running it.
