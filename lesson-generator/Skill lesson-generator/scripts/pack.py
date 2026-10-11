"""Joins the lesson and the components into a single HTML file, and delivers it.

    python pack.py <draft.html> [--output <file.html>]

Replaces each local <link rel="stylesheet" href="…"> and <script src="…"> with
the file's content, inlined, and removes the comments. The result opens with a
double click, anywhere, without an assets/ folder next to it. Only the editor
uses the internet, to download Python the first time.

Without --output, it writes where new_lesson.py noted (delivery.txt, next to
the draft) and, once the lesson is delivered, deletes the draft: the lesson is
not edited afterwards.
"""

import argparse
import os
import re
import shutil
import stat
import sys
from pathlib import Path
from urllib.parse import unquote


def remove(folder):
    """Deletes a folder even with read-only items (common on OneDrive)."""
    def unlock(func, path, _):
        os.chmod(path, stat.S_IWRITE)
        func(path)
    shutil.rmtree(folder, onerror=unlock)


# Comments are for whoever writes, not for the student: the delivery leaves
# without them. In JS, only whole-line ones (/* … */ and //), which are never
# inside a string; a comment at the end of a code line stays. The Python of
# the <pre> blocks is not touched: its comments teach.
JS_BLOCK = re.compile(r"^[ \t]*/\*(?:(?!\*/).)*\*/[ \t]*\n", re.M | re.S)
JS_LINE = re.compile(r"^[ \t]*//[^\n]*\n", re.M)


def strip_js(js):
    return JS_LINE.sub("", JS_BLOCK.sub("", js))


def strip_css(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def strip_comments(page):
    page = re.sub(r"<!--.*?-->", "", page, flags=re.S)
    page = re.sub(r"(<script\b[^>]*>)(.*?)(</script>)",
                  lambda m: m.group(1) + strip_js(m.group(2)) + m.group(3), page, flags=re.S)
    page = re.sub(r"(<style\b[^>]*>)(.*?)(</style>)",
                  lambda m: m.group(1) + strip_css(m.group(2)) + m.group(3), page, flags=re.S)
    return re.sub(r"\n[ \t]*\n(?:[ \t]*\n)+", "\n\n", page)


def local(url):
    return url and not re.match(r"[a-z]+:|//", url, re.I)


def main():
    # On Windows, redirected output is cp1252 and breaks accented characters.
    sys.stdout.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description="Packs the lesson into a single file.")
    ap.add_argument("draft", help="the written lesson, with the components in ./assets/")
    ap.add_argument("--output", help="where to write (default: what new_lesson.py noted)")
    a = ap.parse_args()

    source = Path(a.draft).resolve()
    base = source.parent
    page = source.read_text(encoding="utf-8")

    overwrite = False
    if a.output:
        output = Path(a.output).resolve()
    else:
        noted = base / "delivery.txt"
        if not noted.exists():
            sys.exit("ERROR: no --output and no delivery.txt next to the draft: say where to write.")
        lines = noted.read_text(encoding="utf-8").splitlines()
        output, overwrite = Path(lines[0]), "--overwrite" in lines[1:]
    if output.exists() and not overwrite and not a.output:
        sys.exit(f"ERROR: {output} already exists.")

    missing = []

    def read(url):
        f = base / unquote(url)
        if not f.exists():
            missing.append(url)
            return None
        return f.read_text(encoding="utf-8")

    def css(m):
        url = re.search(r'href="([^"]+)"', m.group(0)).group(1)
        if not local(url):
            return m.group(0)
        content = read(url)
        return m.group(0) if content is None else f"<style>\n{content}\n</style>"

    def js(m):
        url = m.group(1)
        if not local(url):
            return m.group(0)
        content = read(url)
        if content is None:
            return m.group(0)
        # An inline script cannot contain the closing of its own tag.
        return "<script>\n" + content.replace("</script", "<\\/script") + "\n</script>"

    page = re.sub(r'<link\b[^>]*rel="stylesheet"[^>]*>', css, page)
    page = re.sub(r'<script\b[^>]*\bsrc="([^"]+)"[^>]*>\s*</script>', js, page)

    if missing:
        sys.exit("ERROR: components that do not exist next to the draft: " + ", ".join(missing))
    leftovers = [u for u in re.findall(r'(?:src|href)="([^"#]+)"', page) if local(u)]
    if leftovers:
        sys.exit("ERROR: there are still references to local files: " + ", ".join(leftovers))

    page = strip_comments(page)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(page, encoding="utf-8", newline="\n")
    print(f"Lesson delivered: {output} ({output.stat().st_size // 1024} KB, single file)")
    if not a.output and base.name.startswith(".draft-"):
        # A process inside the folder locks it on Windows: this one leaves it,
        # and if another (the terminal that ran the script) is there, the error
        # says what to do.
        os.chdir(base.parent)
        try:
            remove(base)
            print("Draft deleted.")
        except PermissionError:
            sys.exit(f"WARNING: the lesson was delivered, but the folder {base} could not be deleted: "
                     "some terminal is inside it. Leave it and delete it.")


if __name__ == "__main__":
    main()
