"""Sets up the draft of a new lesson and notes where it goes when ready.

    python new_lesson.py <exercise name> [folder]

The draft lives in <folder>/.draft-<name>/: the template as <name>.html and a
copy of the components in assets/. That is where the lesson is written and
checked (inside the working folder, so it can be edited without asking for
permission). Then pack.py joins everything into a single file, writes
<folder>/<name>.html and deletes the draft: the student receives one file.

<folder> is the one the student named; without it, ./lessons. The delivery
goes DIRECTLY into that folder, never into a subfolder of it. The name becomes
kebab-case ("Start-up of a CSTR" -> start-up-of-a-cstr.html). It does not
overwrite an existing lesson: for that, --overwrite.
"""

import argparse
import os
import re
import shutil
import stat
import sys
import unicodedata
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent


def remove(folder):
    """Deletes a folder even with read-only items (common on OneDrive)."""
    def unlock(func, path, _):
        os.chmod(path, stat.S_IWRITE)
        func(path)
    shutil.rmtree(folder, onerror=unlock)


def kebab(text):
    ascii_text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", ascii_text.lower()).strip("-")


def main():
    # On Windows, redirected output is cp1252 and breaks accented characters.
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description="Sets up the draft of a new lesson.")
    ap.add_argument("name", help="name of the exercise; becomes the file name, in kebab-case")
    ap.add_argument("folder", nargs="?", default="lessons", help="the folder the student named (default: ./lessons)")
    ap.add_argument("--overwrite", action="store_true", help="replace a lesson that already exists")
    a = ap.parse_args()

    folder = Path(a.folder).resolve()
    if SKILL in folder.parents or folder == SKILL:
        sys.exit("ERROR: the lesson cannot be delivered inside the skill's folder.")
    name = kebab(a.name)
    if not name:
        sys.exit("ERROR: the exercise name became empty after turning into kebab-case.")
    delivery = folder / (name + ".html")
    if delivery.exists() and not a.overwrite:
        sys.exit(f"ERROR: {delivery} already exists. To replace it, use --overwrite.")

    draft = folder / f".draft-{name}"
    if draft.exists():
        remove(draft)                    # left over from a previous attempt
    draft.mkdir(parents=True)
    # Only the content, without the attributes: the skill's folder may be read-only.
    (draft / "assets").mkdir()
    for f in (SKILL / "assets").iterdir():
        shutil.copyfile(f, draft / "assets" / f.name)
    lesson = draft / (name + ".html")
    shutil.copyfile(SKILL / "templates" / "lesson.html", lesson)
    # Where pack.py writes the finished lesson.
    (draft / "delivery.txt").write_text(str(delivery) + ("\n--overwrite" if a.overwrite else ""), encoding="utf-8")

    print(f"Draft:    {lesson}")
    print(f"Delivery: {delivery}  (written by pack.py)")
    print("Fill in the draft, check it with check.py and deliver it with pack.py.")


if __name__ == "__main__":
    main()
