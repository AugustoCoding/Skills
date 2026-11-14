"""Builds the skill's .zip, the one attached to the GitHub release.

    python build_zip.py

There is a single file for every environment: the user hands it to their
agent and asks it to install the skill. INSTALL.md, which goes inside the
zip, tells the agent what to do in each environment.

The SKILL.md in the zip is the most portable one, so that the same file can
also be uploaded to claude.ai by hand (Settings > Capabilities > Skills).

claude.ai only accepts six fields at the top of SKILL.md (name, description,
license, compatibility, metadata, allowed-tools) and rejects the upload if
there is another. The Claude Code fields (disable-model-invocation,
argument-hint) are left out of the zip, and INSTALL.md tells the agent to put
them back when it installs in Claude Code; in the repository, nothing changes.

There is no "only when the user calls it" lock there: what holds the skill
back is the description, which says to use it only when asked for by name.

Writes ../dist/lesson-generator.zip (outside git).
"""

import re
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
SKILL = HERE.parent / "skill"
INSTALL = HERE / "INSTALL.md"
OUTPUT = HERE.parent / "dist" / "lesson-generator.zip"
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


def write_zip(output, skill_md):
    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("lesson-generator/SKILL.md", skill_md)
        z.write(INSTALL, "lesson-generator/INSTALL.md")
        for f in sorted(SKILL.rglob("*")):
            rel = f.relative_to(SKILL)
            if f.is_dir() or rel.as_posix() == "SKILL.md" or "__pycache__" in rel.parts:
                continue
            z.write(f, "lesson-generator/" + rel.as_posix())


def main():
    text, removed = clean_frontmatter((SKILL / "SKILL.md").read_text(encoding="utf-8"))
    OUTPUT.parent.mkdir(exist_ok=True)
    write_zip(OUTPUT, text)
    print(f"Zip: {OUTPUT}")
    print("Fields removed from the top of SKILL.md: " + (", ".join(removed) or "none"))
    print("Attach it to the GitHub release: gh release upload <tag> <zip> --clobber")


if __name__ == "__main__":
    main()
