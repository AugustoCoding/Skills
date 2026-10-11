"""Builds the skill's .zip to upload to claude.ai (Settings > Capabilities > Skills).

    python publish_claude_ai.py

claude.ai only accepts six fields at the top of SKILL.md (name, description,
license, compatibility, metadata, allowed-tools) and rejects the upload if
there is another. The Claude Code fields (disable-model-invocation,
argument-hint) are left out of the zip; in the repository, nothing changes.

There is no "only when the user calls it" lock there: what holds the skill
back is the description, which says to use it only when asked for by name.

Writes dist/lesson-generator.zip, next to this file (outside git).
"""

import re
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
SKILL = HERE / "Skill lesson-generator"
OUTPUT = HERE / "dist" / "lesson-generator.zip"
ACCEPTED = {"name", "description", "license", "compatibility", "metadata", "allowed-tools"}


def clean_frontmatter(text):
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    if not m:
        sys.exit("ERROR: SKILL.md does not start with the --- ... --- block.")
    lines, removed, skipping = [], [], False
    for line in m.group(1).splitlines():
        key = re.match(r"([A-Za-z_-]+):", line)
        if key:
            skipping = key.group(1) not in ACCEPTED
            if skipping:
                removed.append(key.group(1))
        if not skipping:
            lines.append(line)
    fields = dict(re.match(r"([A-Za-z_-]+):\s*(.*)", l).groups() for l in lines if re.match(r"[A-Za-z_-]+:", l))
    name, desc = fields.get("name", ""), fields.get("description", "")
    if not re.fullmatch(r"[a-z0-9-]{1,64}", name):
        sys.exit(f"ERROR: name \"{name}\" must have up to 64 characters, only lowercase letters, digits and hyphens.")
    if not desc or len(desc) > 1024 or re.search(r"<[^>]+>", desc):
        sys.exit("ERROR: the description must exist, have up to 1024 characters and no tags.")
    return "---\n" + "\n".join(lines) + "\n---\n" + text[m.end():], removed


def main():
    text, removed = clean_frontmatter((SKILL / "SKILL.md").read_text(encoding="utf-8"))
    OUTPUT.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(OUTPUT, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("lesson-generator/SKILL.md", text)
        for f in sorted(SKILL.rglob("*")):
            rel = f.relative_to(SKILL)
            if f.is_dir() or rel.as_posix() == "SKILL.md" or "__pycache__" in rel.parts:
                continue
            z.write(f, "lesson-generator/" + rel.as_posix())
    print(f"Zip: {OUTPUT}")
    print("Fields removed from the top of SKILL.md: " + (", ".join(removed) or "none"))
    print("Upload it in claude.ai > Settings > Capabilities > Skills (code execution must be on).")


if __name__ == "__main__":
    main()
