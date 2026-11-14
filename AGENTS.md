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

- `lesson-generator/Skill lesson-generator/` is the skill itself, and only what the model needs in context goes there. It is frozen at the version that was evaluated: change it only when the user asks.
- `lesson-generator/Modelo Skill lesson-generator/`, `Testes Skill lesson-generator/` and `Avaliacao Skill lesson-generator/` are the reference lesson, the test records and the evaluation. They are a research record: do not rewrite past results.
- `lesson-generator/publish_claude_ai.py` builds the two `.zip` files attached to the GitHub release; `dist/` is not versioned.

A change to the structure of the lesson updates `scripts/check.py` in the same commit, and the reference lesson must pass it:

```bash
python "lesson-generator/Skill lesson-generator/scripts/check.py" "lesson-generator/Modelo Skill lesson-generator/model-lesson.html"
```
