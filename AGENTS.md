# Instructions for agents working in this repository

## This repository is public

Everything committed here, in any branch or tag, can be read by anyone and stays in the history. Removing something afterwards means rewriting the history and recreating the repository on GitHub, which has already been done once. Treat every commit as permanent.

Never commit:

- **Credentials:** API keys, tokens, passwords, cookies, `.env` files, or the contents of any credentials store.
- **Local paths that contain a user name:** `C:\Users\<name>\...`, `/home/<name>/...`, `/Users/<name>/...`. Write `~\...` or `~/...` or a path relative to the repository. This applies to records of test runs, logs, tracebacks and command output pasted into Markdown.
- **Personal data:** e-mail addresses, phone numbers, account or organization IDs, and names of people other than the author.
- **Raw session records:** Claude Code or Codex transcripts (`*.jsonl`), session IDs and anything copied from `~/.claude/` or `~/.codex/`. The evaluation scripts extract only time, model, effort and token counts; keep it that way.
- **Backups of the old history:** any `*.bundle` file or copy of `.git/filter-repo/`.

Commit messages and author fields are public too. Commits use the author's GitHub `noreply` address.

Before every commit, read the staged diff (`git diff --cached`) looking for the items above, and search it:

```bash
git diff --cached | grep -n -i -E "Users[\\/]|/home/|@gmail|@hotmail|@outlook|sk-ant-|ghp_|github_pat_|api[_-]?key|password|senha|BEGIN .*PRIVATE KEY"
```

If something sensitive was already committed, stop and tell the user before pushing. If it was already pushed, tell the user at once: deleting the file in a new commit does not remove it from the history.

## What is here

Each skill has a folder at the root, with the same layout: `skill/` and `model/` on one side, `development/` on the other. A new skill follows it, and gets a row in the table of the root `README.md`.

- `lesson-generator/skill/` is the skill itself, and only what the model needs in context goes there. It is frozen at the version that was evaluated: change it only when the user asks.
- `lesson-generator/model/` is the reference lesson. `lesson-generator/development/tests/` and `development/evaluation/` are the test records and the evaluation. They are a research record, and the older ones cite the folder names of their time: do not rewrite past results.
- `lesson-generator/development/build_zip.py` builds the single `.zip` attached to the GitHub release, with `development/INSTALL.md` inside it: the instructions for the agent that installs the skill. `dist/` is not versioned.

## What is published, and how

- **The download is a GitHub release.** The README links to `releases/latest/download/lesson-generator.zip`, so the link always serves the newest release. The first one is `v1.0.0`, the version of the skill that was evaluated.
- **A new version of a skill is a new release**, never a replaced file in an old one. Build the zip with `python lesson-generator/development/build_zip.py`, then create the release with the next version number (`gh release create v1.1.0 lesson-generator/dist/lesson-generator.zip ...`). Do this only when the user asks: a release is public the moment it is created.
- **Every release carries the zip of every skill.** `releases/latest` points to one release only, so a release that leaves a skill's zip out breaks that skill's download link.
- **There is one zip per skill, for every environment.** The user hands it to their agent, and `development/INSTALL.md`, inside the zip, tells the agent how to install. Do not create per-environment zips.
- **GitHub Pages serves the `main` branch as it is** at `https://augustocoding.github.io/Skills/`, and the READMEs link to the reference lesson there. Every push to `main` republishes the site within a couple of minutes; the empty `.nojekyll` at the root must stay.
- **The repository's name and the path of the reference lesson must not change.** Printed material carries a QR code to `https://github.com/AugustoCoding/Skills`, and the READMEs link to `lesson-generator/model/model-lesson.html`.

A change to the structure of the lesson updates `scripts/check.py` in the same commit, and the reference lesson must pass it:

```bash
python lesson-generator/skill/scripts/check.py lesson-generator/model/model-lesson.html
```
