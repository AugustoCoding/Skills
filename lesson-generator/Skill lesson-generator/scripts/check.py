"""Checks a finished lesson and says what to fix.

    python check.py <lesson.html>

ERROR    breaks the lesson or its promise: fix it before delivering.
WARNING  probably wrong: check it.
At the end, the list of the numbers that appear in the text, with their
context, for the source review (given in the problem, derived, or your choice).

Exits with code 1 if there is an ERROR. Standard library only.

The structure it expects is that of templates/lesson.html. When the structure
of the lesson changes, this file changes with it, and the repository's model
lesson must pass it without errors.

The lesson may be in any language: section titles and texts are not checked
by their words. The decimal separator follows <html lang>: a comma for the
languages that use one (pt, es, fr, de…), a point otherwise.
"""

import html
import os
import re
import subprocess
import sys
import tempfile
from html.parser import HTMLParser
from pathlib import Path

PYODIDE = {"numpy", "scipy", "matplotlib", "pandas", "sympy", "math", "cmath", "statistics",
           "random", "itertools", "functools", "collections", "dataclasses", "fractions",
           "decimal", "time", "datetime", "json", "re", "io", "sys", "os", "typing"}
VOID = {"meta", "link", "br", "img", "input", "hr", "source", "col", "wbr", "area", "base", "embed"}
# Languages whose texts use a decimal comma.
COMMA_LANGS = {"pt", "es", "fr", "de", "it", "nl", "ru", "pl", "tr", "sv", "da", "no", "nb", "fi",
               "cs", "ro", "hu", "id", "uk", "el", "ca", "gl", "eu"}


# ---------- a minimal HTML tree ----------

class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []

    @property
    def classes(self):
        return (self.attrs.get("class") or "").split()

    def has(self, cls):
        return cls in self.classes

    def text(self):
        return "".join(c if isinstance(c, str) else c.text() for c in self.children)

    def all(self):
        for c in self.children:
            if isinstance(c, Node):
                yield c
                yield from c.all()

    def find(self, tag=None, cls=None):
        return [n for n in self.all() if (tag is None or n.tag == tag) and (cls is None or n.has(cls))]

    def kids(self, tag=None, cls=None):
        return [c for c in self.children if isinstance(c, Node) and (tag is None or c.tag == tag) and (cls is None or c.has(cls))]


class Reader(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("#doc", [], None)
        self.current = self.root

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs, self.current)
        self.current.children.append(n)
        if tag not in VOID:
            self.current = n

    def handle_startendtag(self, tag, attrs):
        self.current.children.append(Node(tag, attrs, self.current))

    def handle_endtag(self, tag):
        n = self.current
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.current = n.parent

    def handle_data(self, data):
        self.current.children.append(data)


# ---------- checks ----------

errors, warnings = [], []
COMMA = True          # decimal comma in the lesson text; set from <html lang> in main()


def error(msg): errors.append(msg)
def warning(msg): warnings.append(msg)


def code_of(node):
    # The code block of the step: the <pre>, not a <code> in the middle of the text.
    pres = node.find("pre")
    return pres[0].text() if pres else ""


def code_lines(text):
    return [l.rstrip() for l in text.splitlines() if l.strip() and not l.strip().startswith("#")]


def keyword_arguments(code):
    """The names passed as name=value INSIDE a call (rtol=, label=…)."""
    names, depth = [], 0
    no_text = re.sub(r"#[^\n]*|\"[^\"\n]*\"|'[^'\n]*'", "", code)
    for m in re.finditer(r"[()\[\]]|([A-Za-z_]\w*)\s*=(?!=)", no_text):
        t = m.group(0)
        if t in "([":
            depth += 1
        elif t in ")]":
            depth -= 1
        elif depth > 0 and m.group(1) not in names:
            names.append(m.group(1))
    return names


def numbers(text, prose=False):
    """The numbers of a text, as floats: '0.667' and '0,667', '1.7·10⁻⁹' and '1.7e-09', '93%'.

    In program output, the point is the decimal separator. In the prose of a
    point-decimal lesson, a comma between digit groups ("1,250") separates
    thousands; in a comma-decimal lesson, the comma is the decimal separator.
    """
    sup = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹⁻", "0123456789-")
    out = []
    if prose and not COMMA:
        pattern = r"(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)\s*(?:[·×]\s*10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)|[eE]([-+]?\d+))?"
    else:
        pattern = r"(\d+(?:[.,]\d+)?)\s*(?:[·×]\s*10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)|[eE]([-+]?\d+))?"
    for m in re.finditer(pattern, text):
        raw = m.group(1)
        base = raw.replace(",", "") if (prose and not COMMA) else raw.replace(",", ".")
        exp = m.group(2).translate(sup) if m.group(2) else (m.group(3) or None)
        decimals = len(base.split(".")[1]) if "." in base else 0
        out.append((float(base) * (10 ** int(exp) if exp else 1), decimals, bool(exp), m.group(0)))
    return out


def check_structure(doc):
    body = doc.find("body")[0] if doc.find("body") else doc
    kids = body.kids()
    h2s = [i for i, n in enumerate(kids) if n.tag == "h2"]
    if len(h2s) != 3:
        error(f"The lesson must have exactly three sections (h2): the model, the code, the result; it has {len(h2s)}.")

    first_h2 = h2s[0] if h2s else None
    if first_h2 is None or not any(n.tag == "div" and n.has("problem") for n in kids[:first_h2]):
        error("The problem statement (div.problem) is missing before the model: the data and what is asked.")
    if first_h2 is None or not any(n.tag == "p" for n in kids[:first_h2]):
        error("The opening is missing: a paragraph before the model, framing the problem.")

    for ol in doc.find("ol", "derivation"):
        items = ol.kids("li")
        for i, li in enumerate(items, 1):
            if not any(p.find("span", "kind") for p in li.find("p", "why")):
                error(f"Derivation: step {i} has no kind label (principle, translation, …).")
        if items and not items[-1].has("final"):
            error("Derivation: the last step must be the model equation, with class=\"final\".")

    if not doc.find("table"):
        warning("There is no parameter table.")

    for block in doc.find("div", "eq-block"):
        if not (block.attrs.get("data-title") or "").strip():
            warning("A complementary equation (div.eq-block) has no data-title: it is the item's title on the model line.")

    # The technique closes the model: it is the last block before the code section.
    technique = doc.find("div", "technique")
    if not technique:
        error("The technique (div.technique) is missing at the end of the model: the name of the tool and why it fits.")
    else:
        words = len(technique[0].text().split())
        if words > 110:
            warning(f"The technique has {words} words: the norm is four or five sentences, up to about 100.")
        tech_text = [p for p in technique[0].kids("p") if not p.has("technique-name")]
        if not any(p.find(cls="term") for p in tech_text):
            error("The technique does not highlight its name in the text (span.term).")
        if not any(p.find("code") for p in tech_text):
            warning("The technique does not name in <code> the Python feature that performs it.")
        names = technique[0].find("p", "technique-name")
        if not names:
            error("The technique has no name (p.technique-name).")
        elif len(names[0].text().split()) > 4:
            warning(f"The technique's name has {len(names[0].text().split())} words: use up to four, and the details in the text.")
        if len(h2s) >= 2 and technique[0] is not kids[h2s[1] - 1]:
            error("The technique must be the last block of the model, right before the code section.")


def check_code(doc, folder):
    sections = doc.find("section", "code")
    if not sections:
        error("The code section (section.code) is missing.")
        return None
    steps = sections[0].kids("div", "step")
    if not steps:
        error("The code section has no steps.")
        return None
    for i, s in enumerate(steps, 1):
        if not s.kids("h3"):
            error(f"Code step {i} has no title (h3).")
    for i, s in enumerate(steps[:-1], 1):
        title = s.kids("h3")[0].text().strip() if s.kids("h3") else str(i)
        parts = [c.tag if c.tag == "pre" else (c.classes[0] if c.classes else c.tag) for c in s.kids()]
        if "purpose" not in parts or "pre" not in parts or parts.index("purpose") > parts.index("pre"):
            error(f"Step \"{title}\": p.purpose (the intention) is missing before the code.")
        if "how" not in parts or ("pre" in parts and parts.index("how") < parts.index("pre")):
            error(f"Step \"{title}\": p.how (the syntax) is missing after the code.")
        if not parts or parts[-1] != "so-far":
            error(f"Step \"{title}\": the step must end with p.so-far (what the program now does).")
        # Every argument passed by name (rtol=, events=…) is explained in the step.
        prose = " ".join(c.text() for c in s.kids() if c.tag != "pre")
        for name in keyword_arguments(code_of(s)):
            if not re.search(r"\b" + re.escape(name) + r"\b", prose):
                error(f"Step \"{title}\": the argument {name}= is not explained in the text of the step.")

    if len(steps) - 1 > 6:
        warning(f"The code has {len(steps) - 1} steps before the complete program; the limit is six.")

    # The last step is the complete program.
    program = code_of(steps[-1])
    if not re.search(r"\bplt\.show\s*\(", program):
        error("The program draws no figure: it must end with a matplotlib figure and plt.show(), "
              "so the student sees the result when running it in the editor.")
    pasted = "\n".join(code_of(s) for s in steps[:-1])
    a, b = code_lines(pasted), code_lines(program)
    if a != b:
        extra = [l for l in a if l not in b][:3]
        missing = [l for l in b if l not in a][:3]
        msg = "The steps pasted in order are not the complete program (the last step)."
        if missing:
            msg += " In the program and in no step: " + " | ".join(l.strip() for l in missing) + "."
        if extra:
            msg += " In the steps and not in the program: " + " | ".join(l.strip() for l in extra) + "."
        error(msg)

    for m in re.finditer(r"^\s*(?:from\s+(\w+)|import\s+(\w+))", program, re.M):
        lib = m.group(1) or m.group(2)
        if lib not in PYODIDE:
            warning(f"The program imports \"{lib}\", which the editor (Pyodide) may not have: say in the step that imports it that this piece only runs on a computer.")

    # Runs the pasted steps, which is what the student will run in the editor.
    with tempfile.TemporaryDirectory() as tmp:
        f = Path(tmp) / "lesson.py"
        f.write_text(pasted, encoding="utf-8")
        env = dict(os.environ, MPLBACKEND="Agg", PYTHONIOENCODING="utf-8")
        try:
            r = subprocess.run([sys.executable, str(f)], capture_output=True, text=True,
                               encoding="utf-8", env=env, timeout=90, cwd=tmp)
        except subprocess.TimeoutExpired:
            error("The pasted steps took more than 90 s to run: the script is too heavy.")
            return None
    if r.returncode != 0:
        last = (r.stderr.strip().splitlines() or ["(no message)"])[-1]
        error(f"The steps pasted in order do not run: {last}")
        return None
    return r.stdout


# A reply that sends the reader elsewhere, in the languages of the lessons so far.
ELSEWHERE = r"\bsee\b|\bbelow\b|\bobservation|\bveja\b|observaç|mais abaixo|adiante"


def check_result(doc, output):
    answer = doc.find("div", "answer")
    if answer and re.search(ELSEWHERE, answer[0].text(), re.I):
        warning("The answer refers to another part of the lesson: it must answer every question right there, with the numbers the program prints.")
    plots = doc.find(cls="plot")
    if not answer:
        error("The answer (div.answer) is missing at the start of the result section.")
    elif plots:
        order = list(doc.all())
        if order.index(answer[0]) > order.index(plots[0]):
            error("The answer must come before the figure, at the start of the result section.")

    if answer and output is not None:
        # What counts is what the program prints and what the parameter table
        # gives (the data of the problem, such as the operating pressure, may
        # come back in the answer).
        printed = numbers(output) + [n for t in doc.find("table") for n in numbers(t.text(), prose=True)]
        for value, decimals, scientific, raw in numbers(answer[0].text(), prose=True):
            tol = abs(value) * 0.006 if scientific else 0.5 * 10 ** -decimals + 1e-12
            if not any(abs(value - v) <= tol for v, *_ in printed):
                error(f"The answer quotes \"{raw.strip()}\", and neither does the program print it nor does the parameter table have it: the answer is what the program prints.")

    controls = sum(len([c for c in (g.attrs.get("data-controls") or "").split(",") if c.strip()]) for g in plots)
    if controls > 4:
        error(f"The figure has {controls} controls; the limit is four.")
    obs = [li for ol in doc.find("ol", "observations") for li in ol.kids("li")]
    for i, li in enumerate(obs, 1):
        if not li.kids("h3"):
            error(f"Observation {i} has no title (h3): a question, or the action in the control ones.")
    in_code = sum(1 for li in obs if li.find(cls="in-your-code"))
    if controls and in_code < controls:
        error(f"The figure has {controls} controls and only {in_code} observation(s) with \"in your code\": each control needs its own.")
    reading = len(obs) - in_code
    if obs and not 2 <= reading <= 4:
        warning(f"There are {reading} curve-reading observation(s); the norm is two to four, plus one per control.")


def check_assets(doc, folder):
    srcs = [n.attrs.get("src") for n in doc.find("script") if n.attrs.get("src")]
    for name in ["theme.js", "lesson.js", "editor.js"] + (["plot.js"] if doc.find(cls="plot") else []):
        if not any(s and s.endswith(name) for s in srcs):
            error(f"The lesson does not load {name}.")
    for s in srcs:
        if not re.match(r"https?:", s) and not (folder / html.unescape(s).replace("%20", " ")).exists():
            error(f"The component {s} does not exist next to the lesson: copy the skill's assets.")


def check_placeholders(doc):
    # Text outside code: whatever is left between braces is a template placeholder.
    outside = {"script", "style", "pre", "code", "head"}
    parts = []

    def visit(n):
        if n.tag in outside:
            return
        for c in n.children:
            if isinstance(c, Node):
                visit(c)
            else:
                parts.append(c)

    visit(doc)
    text = " ".join(" ".join(parts).split())
    for m in list(re.finditer(r"\{[^{}]{1,300}\}", text))[:5]:
        piece = m.group(0) if len(m.group(0)) <= 70 else m.group(0)[:67] + "…}"
        error(f"A template placeholder was left: {piece}")

    # Placeholders in attributes (class="kind-{…}") and classes that do not exist.
    valid = {
        "kind": {"principle", "translation", "kinetics", "assumption", "algebra", "definition"},
        "source": {"given", "derived", "constant", "choice"},
        "balance": {"mass", "energy", "momentum"},
    }
    for n in doc.all():
        for name, value in n.attrs.items():
            if value and "{" in value and n.tag not in ("script", "style"):
                error(f"A template placeholder was left in the attribute {name}=\"{value}\".")
        for base, ok in valid.items():
            if n.has(base):
                suffixes = [c[len(base) + 1:] for c in n.classes if c.startswith(base + "-")]
                if base != "balance" and not suffixes:
                    error(f"A .{base} lacks its type class ({base}-…): \"{n.text().strip()[:40]}\".")
                for s in suffixes:
                    if s not in ok:
                        error(f"Class {base}-{s} does not exist; use one of: " + ", ".join(sorted(ok)) + ".")


def text_outside_code(node):
    """The text of a node without script, style, pre, code, math, sub and sup."""
    outside = {"script", "style", "pre", "code", "math", "sub", "sup"}
    parts = []

    def visit(n):
        if n.tag in outside:
            return
        for c in n.children:
            if isinstance(c, Node):
                visit(c)
            else:
                parts.append(c)

    visit(node)
    return " ".join(" ".join(parts).split())


# A number in the text: neither the 1 of a unit ("1/min") nor the 10 of "·10⁻⁹".
TEXT_NUMBER = r"(?<![·×\d])\d+(?:[.,]\d+)?(?!\s*/\s*[^\W\d])"


def check_format(doc):
    if not COMMA:
        return
    body = doc.find("body")[0] if doc.find("body") else doc
    points = sorted(set(re.findall(r"(?<![\d.])\d+\.\d+(?![\d.])", text_outside_code(body))))
    if points:
        warning("Numbers with a decimal point in the text (" + ", ".join(points[:5]) +
                "): this lesson's language uses a decimal comma; the point stays only in the code.")


def check_observations(doc, output):
    """Numbers in the reading observations: printed by the program or from the table."""
    if output is None:
        return
    # Known: what the program prints, the parameter table and the data written
    # in the program itself (the measurements of the problem, for instance).
    program = "\n".join(code_of(s) for s in doc.find("div", "step"))
    known = (numbers(output) + [n for t in doc.find("table") for n in numbers(t.text(), prose=True)]
             + numbers(re.sub(r"#[^\n]*", "", program)))

    def is_known(raw):
        return any(abs(v - w) <= 0.5 * 10 ** -c + 1e-12 for v, c, _, _ in numbers(raw, prose=True) for w, *_ in known)

    loose = []
    for ol in doc.find("ol", "observations"):
        for li in ol.kids("li"):
            if li.find(cls="in-your-code"):
                continue        # control observation: it talks about another scenario
            for p in li.kids("p"):
                text = text_outside_code(p)
                for m in re.finditer(TEXT_NUMBER, text):
                    # A calculation shown in the text with known numbers: "2.00 − 1.35 = 0.65".
                    calc = re.search(r"((?:\d+(?:[.,]\d+)?\s*[-+−×·*/]\s*)+\d+(?:[.,]\d+)?)\s*=\s*$", text[:m.start()])
                    if calc and all(is_known(x) for x in re.findall(r"\d+(?:[.,]\d+)?", calc.group(1))):
                        # The calculation must be right, up to the rounding of the result.
                        expr = calc.group(1)
                        expr = (expr.replace(",", ".") if COMMA else expr.replace(",", ""))
                        expr = expr.replace("−", "-").translate(str.maketrans("×·", "**"))
                        value, decimals, _, raw = numbers(m.group(0), prose=True)[0]
                        if abs(eval(expr, {"__builtins__": {}}) - value) > 0.5 * 10 ** -decimals + 1e-9:
                            warning(f"Wrong calculation in an observation: {calc.group(1).strip()} = {raw}.")
                        continue
                    for value, decimals, scientific, raw in numbers(m.group(0), prose=True):
                        tol = 0.5 * 10 ** -decimals + 1e-12
                        if not any(abs(value - v) <= tol for v, *_ in known) and raw not in loose:
                            loose.append(raw)
    if loose:
        warning("Numbers in the observations that the program does not print, that are not in the table or the program's data, "
                "and that do not come from a calculation shown in the text: " + ", ".join(loose[:6]) + ".")


def list_numbers(doc):
    # Left out: code, equations, subscripts (the 0 of C_A0) and the header.
    ignore = {"script", "style", "pre", "code", "math", "head", "title", "sub", "sup"}
    seen, lines = set(), []

    def visit(n):
        if n.tag in ignore:
            return
        for c in n.children:
            if isinstance(c, Node):
                visit(c)
            else:
                for m in re.finditer(TEXT_NUMBER, c):
                    piece = " ".join(c[max(0, m.start() - 35): m.end() + 25].split())
                    if piece not in seen:
                        seen.add(piece)
                        lines.append(f"  {m.group(0):>8}   …{piece}…")

    visit(doc)
    return lines


def main():
    global COMMA
    # On Windows, redirected output is cp1252, which has neither ⁻ nor ·.
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) != 2:
        sys.exit("usage: python check.py <lesson.html>")
    path = Path(sys.argv[1]).resolve()
    reader = Reader()
    reader.feed(path.read_text(encoding="utf-8"))
    doc = reader.root

    html_tag = doc.find("html")
    lang = (html_tag[0].attrs.get("lang") or "") if html_tag else ""
    if not lang:
        error("The <html> tag has no lang: set it to the language of the problem statement (en, pt-BR…).")
    COMMA = lang.split("-")[0].lower() in COMMA_LANGS

    check_structure(doc)
    output = check_code(doc, path.parent)
    check_result(doc, output)
    check_assets(doc, path.parent)
    check_placeholders(doc)
    check_format(doc)
    check_observations(doc, output)

    for e in errors:
        print("ERROR    " + e)
    for w in warnings:
        print("WARNING  " + w)
    if not errors and not warnings:
        print("No errors or warnings.")
    print("\nNumbers in the text, for the source review:")
    print("\n".join(list_numbers(doc)) or "  (none)")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
