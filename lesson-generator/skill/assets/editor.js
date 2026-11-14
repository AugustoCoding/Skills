/* editor.js — a Python editor beside the lesson, which runs the code right there.
 *
 * It injects by itself a small "‹" dot on the right edge, which turns into the
 * "Code editor ›" button on hover and opens the panel. Open, the panel takes
 * the right of the page and the lesson slides to the left. On top, the editor;
 * below, the output: what print writes, the errors and the matplotlib figures.
 *
 * The editor starts EMPTY. Each code block of the code section gets, next to
 * "copy", a "→ editor" button that appends that piece to the end of the
 * program: the student builds the program, step by step.
 *
 * Python is Pyodide (CPython compiled to WebAssembly), downloaded from the CDN
 * only on the first "Run": the lesson still opens without internet, and only
 * the editor needs it, once. After that the browser caches everything.
 *
 * The lesson needs no markup: just load this file after lesson.js, whose
 * syntax highlighting it uses.
 *
 * Shortcuts: Ctrl+Enter runs · Tab indents · Enter keeps the indentation.
 * What the student built is kept in the browser, per lesson; "Empty" clears it.
 */

(function () {
  "use strict";

  var PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/";
  var KEY = "lesson-editor:" + location.pathname;
  var INDENT = "    ";
  // The texts the student sees, in the lesson's language (<html lang>):
  // Portuguese when lang starts with "pt"; English otherwise.
  var PT = /^pt/i.test(document.documentElement.lang);
  var TXT = PT ? {
    empty: "O editor começa vazio.\n\n" +
      "Em cada bloco de código da lição, o botão  → editor  traz aquele trecho " +
      "para cá, no fim do programa. Monte o programa passo a passo e aperte " +
      "Rodar (ou Ctrl+Enter).",
    open: "Abrir o editor de código",
    editor: "Editor de código",
    panel: "Editor de Python",
    run: "Rodar (Ctrl+Enter)",
    clear: "Esvaziar o editor",
    close: "Fechar o editor",
    code: "Código Python",
    firstTime: "Na primeira vez que você rodar, o Python é baixado (precisa de internet).",
    clearOutput: "Apagar a saída, sem mexer no código",
    output: "Saída",
    dividerLabel: "Arraste para dividir o espaço entre o código e a saída",
    dividerHint: "Arraste para dividir o espaço · duplo clique volta ao meio",
    sideLabel: "Arraste para dividir a largura entre a lição e o editor",
    sideHint: "Arraste para os lados · duplo clique volta ao padrão",
    send: "Levar este trecho ao fim do programa no editor",
    figure: "Figura gerada pelo programa",
    downloading: "Baixando o Python… (só na primeira vez)",
    noConnection: "sem conexão",
    editorEmpty: "O editor está vazio: traga os trechos da lição com  → editor.",
    libraries: "Carregando as bibliotecas que o programa importa…",
    running: "Rodando…",
    done: function (s) { return "Pronto em " + s.toFixed(1).replace(".", ",") + " s"; },
    nothingPrinted: "(o programa não imprimiu nada)",
    noPython: "Não consegui baixar o Python. O editor precisa de internet na primeira vez.",
    error: "O programa parou com um erro"
  } : {
    empty: "The editor starts empty.\n\n" +
      "In each code block of the lesson, the  → editor  button brings that piece " +
      "here, to the end of the program. Build the program step by step and press " +
      "Run (or Ctrl+Enter).",
    open: "Open the code editor",
    editor: "Code editor",
    panel: "Python editor",
    run: "Run (Ctrl+Enter)",
    clear: "Empty the editor",
    close: "Close the editor",
    code: "Python code",
    firstTime: "The first time you run, Python is downloaded (needs internet).",
    clearOutput: "Clear the output, keeping the code",
    output: "Output",
    dividerLabel: "Drag to split the space between the code and the output",
    dividerHint: "Drag to split the space · double-click to reset",
    sideLabel: "Drag to split the width between the lesson and the editor",
    sideHint: "Drag sideways · double-click to reset",
    send: "Bring this piece to the end of the program in the editor",
    figure: "Figure made by the program",
    downloading: "Downloading Python… (first time only)",
    noConnection: "no connection",
    editorEmpty: "The editor is empty: bring the pieces of the lesson with  → editor.",
    libraries: "Loading the libraries the program imports…",
    running: "Running…",
    done: function (s) { return "Done in " + s.toFixed(1) + " s"; },
    nothingPrinted: "(the program printed nothing)",
    noPython: "Could not download Python. The editor needs internet the first time.",
    error: "The program stopped with an error"
  };

  var py = null;          // the Pyodide instance, once loaded
  var loading = null;     // the loading promise, so it never loads twice

  function save(txt) { try { localStorage.setItem(KEY, txt); } catch (e) { /* no storage */ } }
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function forget() { try { localStorage.removeItem(KEY); } catch (e) { /* idem */ } }

  function highlight(txt) {
    return window.Lesson && window.Lesson.highlightText
      ? window.Lesson.highlightText(txt)
      : txt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  // A drawn icon (lesson.css, "drawn icons"): never a character like ▶ or ✕,
  // which each font places at a different height, crooked beside the text.
  function icon(name) { return el("span", "ic ic-" + name); }

  // The content of a button: text and icons, in the given order.
  function label(b, parts) {
    b.textContent = "";
    parts.forEach(function (p) { b.append(typeof p === "string" ? document.createTextNode(p) : p); });
  }

  function button(cls, parts, title) {
    var b = el("button", cls);
    b.type = "button";
    if (parts) label(b, [].concat(parts));
    if (title) b.title = title;
    return b;
  }

  // Icon-only button: the name goes in the tooltip (title) and the screen reader.
  function iconButton(cls, name, title) {
    var b = button(cls + " editor-icon", [icon(name)], title);
    b.setAttribute("aria-label", title);
    return b;
  }

  function build() {
    var open = button("editor-open", null, TXT.open);
    open.setAttribute("aria-label", TXT.open);
    open.append(el("span", "editor-open-text", TXT.editor), el("span", "editor-open-arrow"));

    var panel = el("aside", "editor-panel");
    panel.setAttribute("aria-label", TXT.panel);

    var top = el("div", "editor-top");
    var run = iconButton("editor-run", "play", TXT.run);
    var clear = iconButton("editor-button editor-clear", "trash", TXT.clear);
    var close = iconButton("editor-button editor-close", "x", TXT.close);
    top.append(el("span", "editor-title", TXT.editor), run, clear, close);

    var code = el("div", "editor-code");
    var lines = el("div", "editor-lines");
    lines.setAttribute("aria-hidden", "true");
    var field = el("div", "editor-field");
    var shade = el("pre", "editor-highlight");
    shade.setAttribute("aria-hidden", "true");
    var shadeCode = el("code", "no-highlight");
    shade.appendChild(shadeCode);
    var text = el("textarea", "editor-text");
    text.spellcheck = false;
    text.placeholder = TXT.empty;
    text.setAttribute("autocapitalize", "off");
    text.setAttribute("autocomplete", "off");
    text.setAttribute("aria-label", TXT.code);
    field.append(shade, text);
    code.append(lines, field);

    var output = el("div", "editor-output");
    var outputTop = el("div", "editor-output-top");
    var status = el("span", "editor-status", TXT.firstTime);
    var clearOutput = iconButton("editor-clear-output", "trash", TXT.clearOutput);
    outputTop.append(el("span", "", TXT.output), status, clearOutput);
    var result = el("div", "editor-result");
    output.append(outputTop, result);

    // The divider between the code and the output: drag it to see the whole output.
    var divider = el("div", "editor-divider");
    divider.setAttribute("role", "separator");
    divider.setAttribute("aria-orientation", "horizontal");
    divider.setAttribute("aria-label", TXT.dividerLabel);
    divider.title = TXT.dividerHint;
    divider.tabIndex = 0;

    // The divider between the lesson and the editor: drag it sideways.
    var side = el("div", "editor-divider-v");
    side.setAttribute("role", "separator");
    side.setAttribute("aria-orientation", "vertical");
    side.setAttribute("aria-label", TXT.sideLabel);
    side.title = TXT.sideHint;
    side.tabIndex = 0;

    panel.append(side, top, code, divider, output);
    document.body.append(open, panel);

    /* ---------- the split between the lesson and the editor ---------- */

    var root = document.documentElement;
    var MIN_EDITOR = 360;   // px: the editor still shows a whole line of code
    var MIN_LESSON = 420;   // px: the lesson is still a readable column

    function redrawLesson() { window.dispatchEvent(new Event("resize")); }

    function editorWidth(w) {
      w = Math.max(MIN_EDITOR, Math.min(window.innerWidth - MIN_LESSON, w));
      root.style.setProperty("--editor-w", w + "px");
      return w;
    }

    function defaultWidth() {
      root.style.removeProperty("--editor-w");
      try { localStorage.removeItem("lesson-editor-width"); } catch (e) { /* no storage */ }
      redrawLesson();
    }

    function saveWidth(w) {
      try { localStorage.setItem("lesson-editor-width", String(Math.round(w))); } catch (e) { /* idem */ }
    }

    side.addEventListener("pointerdown", function (ev) {
      ev.preventDefault();
      side.setPointerCapture(ev.pointerId);
      side.classList.add("dragging");
      // No transitions while dragging: the lesson follows the pointer, without lag.
      document.body.classList.add("resizing");
      var last = panel.offsetWidth, frame = 0;
      function move(e) {
        // The editor sits one gap from the right edge, and the handle in the
        // middle of the gap between the sheets: the width discounts a gap and
        // a half, so the handle follows the pointer.
        var gap = parseFloat(getComputedStyle(panel).right) || 0;
        last = editorWidth(window.innerWidth - gap - e.clientX - gap / 2);
        if (!frame) frame = requestAnimationFrame(function () { frame = 0; redrawLesson(); });
      }
      function release() {
        side.classList.remove("dragging");
        document.body.classList.remove("resizing");
        side.removeEventListener("pointermove", move);
        side.removeEventListener("pointerup", release);
        side.removeEventListener("pointercancel", release);
        saveWidth(last);
        redrawLesson();
      }
      side.addEventListener("pointermove", move);
      side.addEventListener("pointerup", release);
      side.addEventListener("pointercancel", release);
    });
    side.addEventListener("dblclick", defaultWidth);
    side.addEventListener("keydown", function (ev) {
      var step = ev.shiftKey ? 120 : 40;
      if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
        ev.preventDefault();
        saveWidth(editorWidth(panel.offsetWidth + (ev.key === "ArrowLeft" ? step : -step)));
        redrawLesson();
      }
    });

    try {
      var width = parseFloat(localStorage.getItem("lesson-editor-width"));
      if (width) editorWidth(width);
    } catch (e) { /* no storage: the default width stays */ }

    /* ---------- the split between code and output ---------- */

    var MINIMUM = 90;   // px: neither of the two disappears completely
    // The split is kept as the code's FRACTION of the free height, not in px:
    // the same choice then fits a smaller window, a phone, another lesson. (In
    // px, a split saved on a tall screen once left the output with no height.)
    var ratio = null;

    function free() {
      // The height left for code + output, minus the top bar and the divider.
      return panel.clientHeight - top.offsetHeight - divider.offsetHeight;
    }

    function split(height) {
      height = Math.max(MINIMUM, Math.min(free() - MINIMUM, height));
      // flex-shrink 1: whatever happens, the code yields before the output
      // goes below its min-height (lesson.css).
      code.style.flex = "0 1 " + height + "px";
      output.style.flex = "1 1 0";
      return height;
    }

    // The default: the divider at half the height of the screen. The panel is
    // centered vertically, so its middle is the screen's; the code block
    // starts below the top bar.
    function middle() {
      split(panel.clientHeight / 2 - top.offsetHeight - divider.offsetHeight / 2);
    }

    function defaultSplit() {
      ratio = null;
      middle();
      try { localStorage.removeItem("lesson-editor-split"); } catch (e) { /* no storage */ }
    }

    function saveSplit(height) {
      ratio = height / free();
      try { localStorage.setItem("lesson-editor-split", ratio.toFixed(4)); } catch (e) { /* idem */ }
    }

    // On every window resize, the saved fraction (or the middle) is applied
    // to the new height.
    window.addEventListener("resize", function () { if (ratio) split(ratio * free()); else middle(); });

    divider.addEventListener("pointerdown", function (ev) {
      ev.preventDefault();
      divider.setPointerCapture(ev.pointerId);
      divider.classList.add("dragging");
      var y0 = ev.clientY, h0 = code.offsetHeight, last = h0;
      function move(e) { last = split(h0 + e.clientY - y0); }
      function release() {
        divider.classList.remove("dragging");
        divider.removeEventListener("pointermove", move);
        divider.removeEventListener("pointerup", release);
        divider.removeEventListener("pointercancel", release);
        saveSplit(last);
      }
      divider.addEventListener("pointermove", move);
      divider.addEventListener("pointerup", release);
      divider.addEventListener("pointercancel", release);
    });
    divider.addEventListener("dblclick", defaultSplit);
    divider.addEventListener("keydown", function (ev) {
      var step = ev.shiftKey ? 80 : 24;
      if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        ev.preventDefault();
        saveSplit(split(code.offsetHeight + (ev.key === "ArrowDown" ? step : -step)));
      }
    });

    try {
      // Only a fraction counts; a value outside (0, 1) is an old split in px.
      var savedSplit = parseFloat(localStorage.getItem("lesson-editor-split"));
      if (savedSplit > 0 && savedSplit < 1) ratio = savedSplit;
      else if (savedSplit) localStorage.removeItem("lesson-editor-split");
    } catch (e) { /* no storage: the default split stays */ }
    if (ratio) split(ratio * free()); else middle();

    /* ---------- the editor ---------- */

    function sync() {
      shade.scrollTop = text.scrollTop;
      shade.scrollLeft = text.scrollLeft;
      lines.scrollTop = text.scrollTop;
    }

    function paint() {
      // The blank line at the end keeps the highlight as tall as the textarea.
      shadeCode.innerHTML = highlight(text.value) + "\n";
      var n = text.value ? text.value.split("\n").length : 1;
      var nums = "";
      for (var i = 1; i <= n; i++) nums += i + "\n";
      lines.textContent = nums;
      sync();
    }

    function onEdit() { paint(); save(text.value); }

    function insert(txt) {
      // execCommand keeps the browser's undo (Ctrl+Z); the fallback does not.
      if (!document.execCommand || !document.execCommand("insertText", false, txt)) {
        var a = text.selectionStart, b = text.selectionEnd;
        text.value = text.value.slice(0, a) + txt + text.value.slice(b);
        text.selectionStart = text.selectionEnd = a + txt.length;
      }
      onEdit();
    }

    text.addEventListener("input", onEdit);
    text.addEventListener("scroll", sync);
    text.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault();
        execute();
      } else if (ev.key === "Tab" && !ev.shiftKey) {
        ev.preventDefault();
        insert(INDENT);
      } else if (ev.key === "Enter") {
        // Keeps the indentation of the current line, and adds a level after ":".
        var before = text.value.slice(0, text.selectionStart);
        var line = before.slice(before.lastIndexOf("\n") + 1);
        var indent = line.match(/^[ \t]*/)[0];
        if (/:[ \t]*(#.*)?$/.test(line)) indent += INDENT;
        ev.preventDefault();
        insert("\n" + indent);
      }
    });

    text.value = saved() || "";
    paint();

    /* ---------- open and close ---------- */

    function toggle(isOpen) {
      document.body.classList.toggle("with-editor", isOpen);
      // The column changes width: the figures redraw at the new size.
      setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 320);
    }
    open.addEventListener("click", function () {
      toggle(true);
      setTimeout(function () { text.focus(); }, 320);
    });
    close.addEventListener("click", function () { toggle(false); });
    clear.addEventListener("click", function () {
      text.value = "";
      forget();
      paint();
      result.textContent = "";
      text.focus();
    });
    run.addEventListener("click", execute);
    clearOutput.addEventListener("click", function () {
      result.textContent = "";
      status.textContent = "";
    });

    /* ---------- "→ editor" on each code block ---------- */

    // Appends a piece to the end of the program, separated by a blank line.
    function append(piece) {
      piece = piece.replace(/\s+$/, "") + "\n";
      var current = text.value.replace(/\s+$/, "");
      text.value = current ? current + "\n\n" + piece : piece;
      onEdit();
      text.scrollTop = text.scrollHeight;
      sync();
      code.classList.remove("received");
      void code.offsetWidth;          // restarts the flash
      code.classList.add("received");
    }

    document.querySelectorAll("section.code pre").forEach(function (pre) {
      var c = pre.querySelector("code");
      if (!c) return;
      var b = iconButton("to-editor", "send", TXT.send);
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();           // the click neither opens nor closes the step around it
        if (!document.body.classList.contains("with-editor")) toggle(true);
        append(c.textContent);
        label(b, [icon("check")]);
        b.classList.add("sent");
        setTimeout(function () { label(b, [icon("send")]); b.classList.remove("sent"); }, 1600);
      });
      pre.classList.add("has-copy");
      pre.appendChild(b);
    });

    /* ---------- run ---------- */

    function write(txt, cls) {
      var last = result.lastElementChild;
      if (last && last.tagName === "PRE" && last.className === cls) {
        last.textContent += txt + "\n";
      } else {
        result.appendChild(el("pre", cls, txt + "\n"));
      }
    }

    function figure(b64) {
      var img = el("img", "out-figure");
      img.alt = TXT.figure;
      img.src = "data:image/png;base64," + b64;
      result.appendChild(img);
    }

    function load() {
      if (loading) return loading;
      loading = new Promise(function (ok, fail) {
        status.textContent = TXT.downloading;
        var s = document.createElement("script");
        s.src = PYODIDE + "pyodide.js";
        s.onload = function () {
          window.loadPyodide({ indexURL: PYODIDE }).then(function (p) {
            py = p;
            py.setStdout({ batched: function (t) { write(t, "out-text"); } });
            py.setStderr({ batched: function (t) {
              // A matplotlib backstage notice on first use: not the student's error.
              if (/building the font cache/i.test(t)) return;
              write(t, "out-error");
            } });
            py.globals.set("_lesson_figure", figure);
            ok(py);
          }, fail);
        };
        s.onerror = function () { fail(new Error(TXT.noConnection)); };
        document.head.appendChild(s);
      });
      loading.catch(function () { loading = null; });
      return loading;
    }

    // matplotlib draws in memory, and plt.show() becomes an image in the output.
    var MPL_SETUP = [
      "import io, base64",
      "import matplotlib",
      "matplotlib.use('Agg')",
      "import matplotlib.pyplot as plt",
      "def _lesson_show(*a, **k):",
      "    for n in plt.get_fignums():",
      "        b = io.BytesIO()",
      "        plt.figure(n).savefig(b, format='png', dpi=110, bbox_inches='tight')",
      "        _lesson_figure(base64.b64encode(b.getvalue()).decode())",
      "    plt.close('all')",
      "plt.show = _lesson_show"
    ].join("\n");

    var busy = false;

    function execute() {
      if (busy) return;
      var source = text.value;
      if (!source.trim()) {
        status.textContent = TXT.editorEmpty;
        return;
      }
      busy = true;
      run.disabled = true;
      result.textContent = "";
      var t0;

      load().then(function () {
        status.textContent = TXT.libraries;
        return py.loadPackagesFromImports(source);
      }).then(function () {
        if (py.loadedPackages.matplotlib) py.runPython(MPL_SETUP);
        status.textContent = TXT.running;
        t0 = performance.now();
        // Each run starts in a clean namespace, like running the file again
        // in the terminal.
        var ns = py.globals.get("dict")();
        return py.runPythonAsync(source, { globals: ns }).finally(function () { ns.destroy(); });
      }).then(function () {
        if (py.loadedPackages.matplotlib) py.runPython("_lesson_show()");
        var s = (performance.now() - t0) / 1000;
        status.textContent = TXT.done(s);
        if (!result.childElementCount) write(TXT.nothingPrinted, "out-empty");
      }).catch(function (err) {
        if (!py) {
          status.textContent = TXT.noPython;
          return;
        }
        // Of the traceback, only what belongs to the student's program: the
        // internal Pyodide lines help no one.
        var msg = String((err && err.message) || err);
        var cut = msg.indexOf('File "<exec>"');
        write(cut >= 0 ? "Traceback (most recent call last):\n  " + msg.slice(cut) : msg, "out-error");
        status.textContent = TXT.error;
      }).finally(function () {
        busy = false;
        run.disabled = false;
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
