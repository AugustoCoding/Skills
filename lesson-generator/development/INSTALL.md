# Installing lesson-generator

These instructions are for the AI agent that received this zip from the user, with a request to install the skill. Read them to the end before copying anything.

## What is in the zip

One folder, `lesson-generator/`, which is a complete skill: `SKILL.md` (the instructions), `templates/`, `assets/`, `scripts/` and `agents/`. Install the folder whole, with this structure, and do not edit its files beyond what is described below. The scripts need Python 3 and use only the standard library.

## Where to install

Find out which agent you are and install accordingly. If the user asked for a specific place (a project instead of the personal folder, for example), do what they asked.

**Claude Code.** Copy the folder to `~/.claude/skills/lesson-generator/`. Then add these two lines to the block at the top of the installed `SKILL.md`, after `description`:

```yaml
disable-model-invocation: true
argument-hint: "Paste the exercise you want to learn to solve by programming"
```

They make the skill run only when the user calls it. Tell the user to open a new session and call `/lesson-generator` followed by the exercise.

**Codex.** Copy the folder to `~/.codex/skills/lesson-generator/`. Change nothing: `agents/openai.yaml` already makes the skill run only when called by name.

**claude.ai and the Claude apps (chat).** You cannot add a skill to the user's account from inside a conversation. Tell the user to upload this same zip, without unzipping, in Settings › Capabilities › Skills, with code execution turned on. The `SKILL.md` in the zip is already in the format that page accepts. If the user wants a lesson right now, you can unzip the folder in your sandbox and follow its `SKILL.md` in this conversation.

**Another agent.** Put the folder where your environment loads skills from, adapting only what that environment requires. If it has no skills mechanism, keep the folder somewhere stable and follow `SKILL.md` as your instructions whenever the user asks for lesson-generator.

## After copying

1. Delete this `INSTALL.md` from the installed folder: it is not part of the skill.
2. Check the installation by running, inside the installed folder:

   ```bash
   python scripts/new_lesson.py --help
   ```

   It must print the usage text. If Python 3 is missing, tell the user: the skill needs it to check and pack the lesson.
3. Tell the user where the skill was installed, what you changed, if anything, and how to call it: by name, with the exercise, for example "use lesson-generator on this exercise".

The skill must never run on your own initiative: only when the user asks for it by name.
