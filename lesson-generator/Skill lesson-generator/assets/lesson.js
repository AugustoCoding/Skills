/* lesson.js — the lesson's timelines (code, derivation, observations), the
 * collapsible sections, the table of contents, the copy button and Python
 * syntax highlighting. It neither formats nor validates code.
 *
 * It does five things, and the lesson needs no markup beyond its structure:
 *
 *   1. turns the lesson's parts (the problem, the model, the code, the
 *      result) into tabs, one part on screen at a time, with each part's
 *      progress and a "Continue" button at the end of each;
 *      and turns the code steps (.step), the derivation steps
 *      (ol.derivation) and the observations (ol.observations) into
 *      timelines. Every item starts collapsed, so the student sees at once
 *      how many steps each part has; the next one to read is marked;
 *   2. adds a copy button to every code block;
 *   3. highlights the Python of every <pre><code> with IDE colors. A block that
 *      is not Python takes class="no-highlight";
 *   4. builds the table of contents to the left of the sheet, with the progress
 *      of each part;
 *   5. shrinks the font of equations and code blocks that do not fit the width.
 *
 * Expected structure:
 *
 *   <section class="code">
 *     <div class="step"><h3>…</h3><p class="purpose">…</p><pre><code>…</code></pre>…</div>
 *     <div class="step"><h3>The complete program</h3><pre><code>…</code></pre><p>…</p></div>
 *   </section>
 */

(function () {
  "use strict";

  // The texts the student sees, in the lesson's language (<html lang>):
  // Portuguese when lang starts with "pt"; English otherwise.
  var PT = /^pt/i.test(document.documentElement.lang);
  var TXT = PT ? {
    copy: "Copiar o código",
    and: " e ",
    ofBalance: " do ",
    complementary: "Equação complementar",
    parameters: "Parâmetros",
    technique: "Técnica",
    toc: "Sumário da lição",
    steps: "Passos",
    answer: "Resposta",
    figure: "Figura",
    observations: "Observações",
    problem: "Exercício",
    parts: "As partes da lição",
    next: "Próximo"
  } : {
    copy: "Copy the code",
    and: " and ",
    ofBalance: " of the ",
    complementary: "Complementary equation",
    parameters: "Parameters",
    technique: "Technique",
    toc: "Lesson contents",
    steps: "Steps",
    answer: "Answer",
    figure: "Figure",
    observations: "Observations",
    problem: "Problem",
    parts: "The parts of the lesson",
    next: "Next"
  };

  // The short name of a balance, from its title, without what follows the
  // first comma (the unit, "per kilogram"…):
  // "Mass balance of component B, in mol/min" → "mass balance of B";
  // "Balanço de massa do componente B, em mol/min" → "balanço de massa de B".
  function balanceName(title) {
    var t = title.trim().replace(/,.*$/, "").replace(/\s*\([^)]*\)$/, "");
    return PT ? t.replace(/ do componente /, " de ")
              : t.replace(/ (of|for) component /, " of ");
  }

  // In the table of contents, without the word "balance": "Mass of B", "Massa de B".
  function tocName(title) {
    var t = balanceName(title);
    t = PT ? t.replace(/^Balanço (global )?de /i, "") : t.replace(/^(.+?) balance (of|for) /i, "$1 of ");
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function copy(text, button) {
    // Copied: the icon turns into a ✓ for a moment.
    function ok() {
      var ic = button.querySelector(".ic");
      if (ic) ic.className = "ic ic-check";
      button.classList.add("copied");
      setTimeout(function () {
        if (ic) ic.className = "ic ic-copy";
        button.classList.remove("copied");
      }, 1400);
    }

    // The modern API needs a secure context, and file:// does not always count
    // as one. execCommand is obsolete and works everywhere: here it is the
    // safety net, not the first choice.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { legacy(text, ok); });
    } else {
      legacy(text, ok);
    }
  }

  function legacy(text, ok) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      ok();
    } catch (e) {
      console.warn("[lesson] could not copy:", e);
    }
    ta.remove();
  }

  /* Python syntax highlighting, as in an IDE: each color is a category the
     student learns to recognize. Written here, and not with a library, because
     the lesson opens without internet. It only paints: the text of the block
     does not change, and the copy button still copies the plain code. */

  var KEYWORDS = /^(if|elif|else|for|while|return|import|from|as|in|not|and|or|is|with|try|except|finally|raise|break|continue|pass|lambda|yield|global|nonlocal|del|assert|async|await)$/;
  var DEFINE = /^(def|class|None|True|False)$/;
  var BUILTINS = /^(print|range|len|abs|min|max|sum|float|int|str|bool|list|dict|tuple|set|zip|enumerate|round|sorted|reversed|map|filter|open|isinstance|type|any|all)$/;
  var TOKEN = /(#[^\n]*)|((?:[rRbBfFuU]{1,2})?(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\.|[^"\\n])*"|'(?:\.|[^'\\n])*'))|(\b\d+\.?\d*(?:[eE][+-]?\d+)?\b|\.\d+(?:[eE][+-]?\d+)?\b)|([A-Za-z_\u00C0-\u024F]\w*)|(\*\*=?|\/\/=?|[-+*\/%=<>!@&|^~]=?)/g;

  function esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Python text becomes HTML with the highlight classes. Used here and in the editor.
  function highlightText(txt) {
    var out = "", end = 0, previous = "", m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(txt))) {
      out += esc(txt.slice(end, m.index));
      end = TOKEN.lastIndex;
      var t = m[0], cls = "";
      if (m[1]) cls = "hl-com";
      else if (m[2]) cls = "hl-str";
      else if (m[3]) cls = "hl-num";
      else if (m[4]) {
        if (previous === "def" || previous === "class") cls = "hl-fn";
        else if (DEFINE.test(t)) cls = "hl-def";
        else if (KEYWORDS.test(t)) cls = "hl-kw";
        else if (/^\s*\(/.test(txt.slice(end))) cls = BUILTINS.test(t) ? "hl-bi" : "hl-fn";
        previous = t;
      } else if (m[5]) cls = "hl-op";
      out += cls ? '<span class="' + cls + '">' + esc(t) + "</span>" : esc(t);
    }
    return out + esc(txt.slice(end));
  }

  function highlight(code) {
    if (code.dataset.highlighted || code.classList.contains("no-highlight")) return;
    code.dataset.highlighted = "1";
    code.innerHTML = highlightText(code.textContent);
  }

  function copyButton(pre) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy";
    btn.title = TXT.copy;
    btn.setAttribute("aria-label", TXT.copy);
    var ic = document.createElement("span");
    ic.className = "ic ic-copy";
    btn.appendChild(ic);
    btn.addEventListener("click", function () {
      copy(pre.querySelector("code") ? pre.querySelector("code").textContent : pre.textContent, btn);
    });
    pre.appendChild(btn);
  }

  /* THE COLLAPSIBLE BODY — what an item (or a section) hides when it collapses
     goes inside two wrappers: .x-body, a one-row grid that goes from 0fr to
     1fr, and .x-inner, which clips the overflow. This lets the height slide,
     instead of the content vanishing and appearing at once. */
  function collapsibleBody(nodes, prefix) {
    var body = document.createElement("div");
    body.className = prefix + "-body";
    var inner = document.createElement("div");
    inner.className = prefix + "-inner";
    nodes.forEach(function (n) { inner.appendChild(n); });
    body.appendChild(inner);
    return body;
  }

  // The head of an item is what stays visible when it is collapsed: the title,
  // in the code steps and the observations; the kind of the step, in the
  // derivation.
  function buildItem(item) {
    var head = item.querySelector(":scope > h3");
    if (!head) {
      // In the derivation, the title of a collapsed step is its kind, spelled
      // out: "Principle", "Kinetics, assumption and algebra".
      var kinds = Array.prototype.map.call(item.querySelectorAll(".why .kind"), function (t) {
        // Without trailing punctuation: a label written "Principle." still reads "Principle".
        return t.textContent.trim().replace(/[.:;,]+$/, "").toLowerCase();
      });
      if (kinds.length) {
        var name = kinds.length > 1 ? kinds.slice(0, -1).join(", ") + TXT.and + kinds[kinds.length - 1] : kinds[0];
        head = document.createElement("div");
        head.className = "item-head";
        if (item.dataset.balance) name += TXT.ofBalance + item.dataset.balance;
        head.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      }
    }
    var rest = Array.prototype.filter.call(item.childNodes, function (n) { return n !== head; });
    var body = collapsibleBody(rest, "item");
    item.textContent = "";
    if (head) item.appendChild(head);
    item.appendChild(body);
  }

  /* THE TIMELINE — the same mechanism for the code steps, the steps of a
     balance's derivation and the observations of the result. All start
     COLLAPSED (the dot and the head) and open with a click, or with Enter; a
     click on the dot or on the title of an open item collapses it again. The
     first one not yet read CALLS, with its dot pulsing. onEnd runs when all
     have been opened once. */
  function timeline(items, onEnd) {
    if (!items.length) { if (onEnd) onEnd(); return; }

    function update() {
      var next = null;
      items.forEach(function (p) {
        if (!next && !p.dataset.read) next = p;
        p.classList.remove("calling");
      });
      if (next) next.classList.add("calling");
      else if (onEnd) { onEnd(); onEnd = null; }
      // The thread runs from each code step down to the next one. (In the
      // derivation and the observations, the thread belongs to the whole list.)
      items.forEach(function (p, i) { p.classList.toggle("no-thread", !items[i + 1]); });
    }

    function toggle(p) {
      var collapse = !p.classList.contains("collapsed");
      p.classList.toggle("collapsed", collapse);
      if (collapse) {
        p.setAttribute("tabindex", "0");
        p.setAttribute("role", "button");
        p.setAttribute("aria-expanded", "false");
        return;
      }
      p.removeAttribute("tabindex");
      p.removeAttribute("role");
      p.removeAttribute("aria-expanded");
      if (!p.dataset.read) {
        p.dataset.read = "1";
        document.dispatchEvent(new CustomEvent("lesson-changed"));
        update();
      }
      // Once the height has finished sliding, the open item scrolls into view.
      setTimeout(function () { p.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 380);
    }

    // Only the dot (the gutter on the left) and the head collapse: clicking the
    // text, the code or a button inside does nothing.
    function onHandle(p, ev) {
      var r = p.getBoundingClientRect();
      var gutter = parseFloat(getComputedStyle(p).paddingLeft) || 0;
      if (ev.clientX - r.left < gutter) return true;
      var head = ev.target.closest && ev.target.closest("h3, .item-head");
      return !!head && head.parentElement === p;
    }

    items.forEach(function (p) {
      buildItem(p);
      p.classList.add("collapsed");
      p.setAttribute("tabindex", "0");
      p.setAttribute("role", "button");
      p.setAttribute("aria-expanded", "false");
      p.addEventListener("click", function (ev) {
        if (p.classList.contains("collapsed") || onHandle(p, ev)) toggle(p);
      });
      p.addEventListener("keydown", function (ev) {
        if ((ev.key === "Enter" || ev.key === " ") && p.classList.contains("collapsed")) {
          ev.preventDefault();
          toggle(p);
        }
      });
    });
    update();
  }

  /* THE TABS — the lesson's parts become the steps of a trail: the problem
     (the statement and the opening paragraph) and one step per h2 (the model,
     the code, the result), as numbered circles joined by a line. One part is
     on screen at a time. The open step has a solid circle; a finished one, a
     check; the line between two steps fills as the first is read. At the end
     of each part,
     a "Continue" button leads to the next. Every step can be clicked at any
     time: the order is a guide, not a lock. The lesson's markup does not
     change: the steps come from its h2s. */
  var SECTIONS = ["model", "code", "result"];

  // On the trail, a part's name goes without its article: "The model" →
  // "Model", "O código" → "Código". The numbered circle already says which.
  function stepName(title) {
    var t = title.trim().replace(/^(the|o|a|os|as)\s+/i, "");
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function buildTabs() {
    var titles = Array.prototype.slice.call(document.querySelectorAll("body > h2"));
    if (!titles.length || document.querySelector("nav.tabs")) return;

    function ends(n) {
      return n.nodeType === 1 && (n.tagName === "H2" || n.classList.contains("ask") ||
        (n.tagName === "SCRIPT" && n.src));
    }

    // The parts: the opening (everything between the header and the first
    // h2), then each h2 with what follows it.
    var header = document.querySelector("body > header");
    var first = header ? header.nextSibling : document.body.firstChild;
    var parts = [], nodes = [], n = first;
    while (n && n !== titles[0]) { nodes.push(n); n = n.nextSibling; }
    parts.push({ label: TXT.problem, sec: "problem", nodes: nodes, h2: null });
    var end = null;
    titles.forEach(function (h2, i) {
      var own = [], m = h2.nextSibling;
      while (m && !ends(m)) { own.push(m); m = m.nextSibling; }
      end = m;
      parts.push({ label: stepName(h2.textContent), sec: SECTIONS[i] || "result", nodes: own, h2: h2 });
    });

    var nav = document.createElement("nav");
    nav.className = "tabs";
    var list = document.createElement("div");
    list.className = "tabs-list";
    list.setAttribute("role", "tablist");
    list.setAttribute("aria-label", TXT.parts);
    nav.appendChild(list);
    document.body.insertBefore(nav, first);

    var tabs = [], panels = [], items = [], visited = [], current = 0;

    parts.forEach(function (part, i) {
      var panel = document.createElement("div");
      panel.className = "tab-panel";
      panel.id = "part-" + i;
      panel.dataset.sec = part.sec;
      panel.setAttribute("role", "tabpanel");
      panel._show = function () { show(i); };
      panel._label = part.label;
      if (part.h2) {
        part.h2.classList.add("part-title");
        // The heading without its article, as on the trail ("The model" → "Model").
        if (!part.h2.children.length) part.h2.textContent = part.label;
        var body = document.createElement("div");
        body.className = "part-body";
        part.nodes.forEach(function (x) { body.appendChild(x); });
        panel.append(part.h2, body);
        part.h2._open = function () { show(i); };
      } else {
        part.nodes.forEach(function (x) { panel.appendChild(x); });
      }
      if (i < parts.length - 1) {
        var next = document.createElement("button");
        next.type = "button";
        next.className = "continue";
        next.dataset.sec = parts[i + 1].sec;
        // A card for the next step: its numbered circle, as on the trail,
        // "Next" and its name, and an arrow.
        var circle = document.createElement("span");
        circle.className = "continue-dot";
        circle.textContent = String(i + 2);
        var words = document.createElement("span");
        words.className = "continue-text";
        var small = document.createElement("span");
        small.className = "continue-label";
        small.textContent = TXT.next;
        var big = document.createElement("span");
        big.className = "continue-name";
        big.textContent = parts[i + 1].label;
        words.append(small, big);
        var arrow = document.createElement("span");
        arrow.className = "ic ic-arrow";
        next.append(circle, words, arrow);
        next.addEventListener("click", function () { show(i + 1, true); });
        panel.appendChild(next);
      }
      document.body.insertBefore(panel, end);
      panels.push(panel);
      items.push(Array.prototype.slice.call(panel.querySelectorAll(
        ".step, ol.derivation > li:not(.group):not(.loose), ol.observations > li")));

      var tab = document.createElement("button");
      tab.type = "button";
      tab.className = "tab";
      tab.dataset.sec = part.sec;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panel.id);
      // The circle holds the step's number, or a check once it is finished.
      var dot = document.createElement("span");
      dot.className = "tab-dot";
      var number = document.createElement("span");
      number.className = "tab-number";
      number.textContent = String(i + 1);
      var check = document.createElement("span");
      check.className = "ic ic-check tab-check";
      dot.append(number, check);
      var name = document.createElement("span");
      name.className = "tab-name";
      name.textContent = part.label;
      tab.append(dot, name);
      tab.addEventListener("click", function () { show(i, true); });
      tab.addEventListener("keydown", function (ev) {
        var k = ev.key === "ArrowRight" ? 1 : ev.key === "ArrowLeft" ? -1 : 0;
        if (!k) return;
        ev.preventDefault();
        var j = (i + k + parts.length) % parts.length;
        show(j, true);
        tabs[j].focus();
      });
      list.appendChild(tab);
      tabs.push(tab);
    });

    function update() {
      items.forEach(function (its, j) {
        var read = its.filter(function (x) { return x.dataset.read; }).length;
        var complete = its.length ? read === its.length : !!visited[j];
        tabs[j].classList.toggle("complete", complete);
        // The line toward the next step fills with this step's progress; the
        // steps before the open one count as gone through, so the line runs
        // full up to where the student is (back on an earlier step, its real
        // progress shows again).
        var share = j < current ? 1 : its.length ? read / its.length : (visited[j] ? 1 : 0);
        if (tabs[j + 1]) {
          tabs[j + 1].style.setProperty("--reach", (100 * share).toFixed(0) + "%");
          // The line goes round the next circle once it has reached it.
          tabs[j + 1].classList.toggle("reached", share === 1);
        }
      });
      tabs[0].classList.add("reached");
    }

    function show(k, scroll) {
      current = k;
      visited[k] = true;
      panels.forEach(function (p, j) {
        p.hidden = j !== k;
        tabs[j].classList.toggle("active", j === k);
        tabs[j].setAttribute("aria-selected", String(j === k));
        tabs[j].tabIndex = j === k ? 0 : -1;
      });
      update();
      if (scroll) {
        // Only when the part's start is hidden behind the bar: then it goes up
        // to just under the bar. (The bar sticks, so its own offset is where
        // it is stuck; the distance is measured on screen.) The sheet scrolls
        // inside itself (lesson.css); on a phone, the window.
        var gap = panels[k].getBoundingClientRect().top - nav.getBoundingClientRect().bottom - 12;
        if (gap < 0) {
          var inside = document.body.scrollHeight > document.body.clientHeight;
          (inside ? document.body : window).scrollBy({ top: gap });
        }
      }
      // The new part becomes visible: figures and equations measure again.
      window.dispatchEvent(new Event("resize"));
      document.dispatchEvent(new CustomEvent("lesson-changed"));
    }

    document.addEventListener("lesson-changed", update);
    show(0);
  }

  /* THE MODEL AS ONE LINE — the lesson writes each balance as a title and its
     derivation, then the table and the technique. Here all of it becomes a
     single timeline, numbered in sequence like the code steps: the title of
     each balance names its first step, each step is an item, and the
     complementary equations, the parameter table and the technique become
     the last items, with their own titles. The lesson's markup does not change. */
  function unifyModel() {
    var h2 = document.querySelector("body > h2");
    if (!h2 || h2.dataset.unified) return null;
    var nodes = [], n = h2.nextElementSibling;
    while (n && n.tagName !== "H2" && !n.classList.contains("ask") && !(n.tagName === "SCRIPT" && n.src)) {
      nodes.push(n);
      n = n.nextElementSibling;
    }
    if (!nodes.some(function (e) { return e.matches("ol.derivation"); })) return null;
    h2.dataset.unified = "1";

    var line = document.createElement("ol"), balance = "";
    line.className = "derivation model-line";
    nodes[0].parentNode.insertBefore(line, nodes[0]);

    function extra(title, el) {
      var li = document.createElement("li");
      li.className = "extra";
      var h3 = document.createElement("h3");
      h3.textContent = title;
      li.appendChild(h3);
      li.appendChild(el);
      line.appendChild(li);
    }

    nodes.forEach(function (el) {
      if (el.matches("h3.balance")) {
        // The balance title is not shown as a divider: it names the first step
        // ("Principle of the mass balance of B") and stays, hidden, as a group
        // marker for the table of contents.
        var g = document.createElement("li");
        g.className = "group";
        g.appendChild(el);
        line.appendChild(g);
        balance = balanceName(el.textContent);
        balance = balance.charAt(0).toLowerCase() + balance.slice(1);
      } else if (el.matches("ol.derivation")) {
        Array.prototype.slice.call(el.children).forEach(function (li, i) {
          if (i === 0 && balance) li.dataset.balance = balance;
          line.appendChild(li);
        });
        balance = "";
        el.remove();
      } else if (el.matches(".eq-block")) {
        extra(el.dataset.title || TXT.complementary, el);
      } else if (el.matches("table")) {
        extra(TXT.parameters, el);
      } else if (el.matches(".technique")) {
        var name = el.querySelector(".technique-name");
        extra(TXT.technique + (name ? ": " + name.textContent.trim() : ""), el);
      } else {
        var li = document.createElement("li");
        li.className = "loose";
        li.appendChild(el);
        line.appendChild(li);
      }
    });
    return line;
  }

  /* THE TABLE OF CONTENTS — to the left of the sheet, when the screen has room
     (lesson.css). It mirrors the trail: the same four parts, with the same
     names, and the open part is always the one shown. Only the open part
     lists its items (the balances, the technique, the code steps, the answer,
     the figure, the observations), each with one dot per step or observation,
     filled once read; among them, scrolling marks where the student is. A
     click opens the part, if needed, and scrolls there. */
  function buildToc() {
    var panels = Array.prototype.slice.call(document.querySelectorAll(".tab-panel"));
    if (!panels.length || document.querySelector("nav.toc")) return;
    var nav = document.createElement("nav");
    nav.className = "toc";
    nav.setAttribute("aria-label", TXT.toc);
    var groups = [], items = [];

    function goTo(panel, target) {
      var opening = panel.hidden;
      if (opening) panel._show();
      setTimeout(function () {
        // Just under the trail, which sticks to the top. The sheet scrolls
        // inside itself (lesson.css); on a phone, the whole page.
        var trail = document.querySelector("nav.tabs");
        var below = (trail ? trail.offsetHeight : 0) + 12;
        var inside = document.body.scrollHeight > document.body.clientHeight;
        var scroller = inside ? document.body : document.scrollingElement;
        var y = target.getBoundingClientRect().top - (inside ? scroller.getBoundingClientRect().top : 0)
          + (inside ? scroller.scrollTop : window.scrollY) - below;
        scroller.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }, opening ? 120 : 0);
    }

    function dots(list) {
      var s = document.createElement("span");
      s.className = "toc-dots";
      list.forEach(function (it) {
        var i = document.createElement("i");
        s.appendChild(i);
        it._dot = i;
      });
      return s;
    }

    function entry(panel, text, target, list) {
      var a = document.createElement("div");
      a.className = "toc-item";
      var t = document.createElement("span");
      t.textContent = text;
      a.appendChild(t);
      if (list && list.length) a.appendChild(dots(list));
      a.addEventListener("click", function () { goTo(panel, target); });
      items.push({ el: target, link: a });
      return a;
    }

    panels.forEach(function (panel) {
      var group = document.createElement("div");
      group.className = "toc-group";
      group._panel = panel;
      groups.push(group);
      var sec = document.createElement("div");
      sec.className = "toc-section s-" + panel.dataset.sec;
      sec.textContent = panel._label;
      sec.addEventListener("click", function () { goTo(panel, panel); });
      group._link = sec;
      group.appendChild(sec);
      var list = document.createElement("div");
      list.className = "toc-group-items";
      if (panel.dataset.sec !== "problem") list.style.setProperty("--sec-color", "var(--sec-" + panel.dataset.sec + ")");

      panel.querySelectorAll("ol.model-line > li.group, ol.model-line > li.extra, section.code, div.answer, .plot, ol.observations").forEach(function (el) {
        if (el.matches("li.group")) {
          // The balance's steps: the items up to the next group or final item.
          var steps = [], s = el.nextElementSibling;
          while (s && !s.classList.contains("group") && !s.classList.contains("extra")) {
            if (!s.classList.contains("loose")) steps.push(s);
            s = s.nextElementSibling;
          }
          list.appendChild(entry(panel, tocName(el.textContent), el, steps));
        } else if (el.matches("li.extra")) {
          list.appendChild(entry(panel, el.querySelector("h3").textContent.replace(/: .*$/, ""), el));
        } else if (el.matches("section.code")) {
          list.appendChild(entry(panel, TXT.steps, el, Array.prototype.slice.call(el.querySelectorAll(".step"))));
        } else if (el.matches("div.answer")) {
          list.appendChild(entry(panel, TXT.answer, el));
        } else if (el.matches(".plot")) {
          list.appendChild(entry(panel, TXT.figure, el));
        } else {
          list.appendChild(entry(panel, TXT.observations, el, Array.prototype.slice.call(el.children)));
        }
      });
      if (list.children.length) group.appendChild(list);
      nav.appendChild(group);
    });

    function update() {
      // The open part, as on the trail.
      groups.forEach(function (g) {
        var open = !g._panel.hidden;
        g.classList.toggle("current", open);
        g._link.classList.toggle("active", open);
      });
      document.querySelectorAll("[data-read]").forEach(function (el) {
        if (el._dot) el._dot.classList.add("read");
      });
      // Among the open part's items: the last one whose top has passed a third
      // of the screen. Items of the closed parts are hidden, and do not count.
      var line = window.innerHeight / 3, active = null;
      items.forEach(function (a) {
        if (a.el.offsetParent && a.el.getBoundingClientRect().top < line) active = a;
      });
      items.forEach(function (a) { a.link.classList.toggle("active", a === active); });
    }

    document.body.appendChild(nav);
    document.body.classList.add("with-toc");
    var pending = false;
    function scrolled() {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; update(); });
    }
    // The sheet scrolls inside itself; on a phone, the window scrolls. Listen to both.
    document.body.addEventListener("scroll", scrolled, { passive: true });
    window.addEventListener("scroll", scrolled, { passive: true });
    document.addEventListener("lesson-changed", update);
    update();
  }

  /* FIT THE WIDTH — equations and code blocks are not clipped when the sheet
     narrows (small window, editor open): their font shrinks just enough to
     fit, and returns to normal when there is room. Below 50% of the normal
     size it stops shrinking and horizontal scrolling comes back, because
     smaller type is no longer readable. */
  var SMALLEST_SCALE = 0.5;

  function fit(box, target) {
    if (!box.clientWidth) return;               // hidden: redone when it appears
    target.style.fontSize = "";
    var excess = box.scrollWidth - box.clientWidth;
    if (excess <= 1) return;
    var base = parseFloat(getComputedStyle(target).fontSize);
    var scale = Math.max(SMALLEST_SCALE, (box.clientWidth - 2) / box.scrollWidth);
    target.style.fontSize = (base * scale).toFixed(2) + "px";
    // The measure is not linear (paddings and fixed gaps): refine until it fits.
    for (var i = 0; i < 6 && box.scrollWidth > box.clientWidth + 1 && scale > SMALLEST_SCALE; i++) {
      scale = Math.max(SMALLEST_SCALE, scale * (box.clientWidth - 2) / box.scrollWidth - 0.01);
      target.style.fontSize = (base * scale).toFixed(2) + "px";
    }
  }

  function fitWidth() {
    var pairs = [];
    // The equation scrolls inside its own <math> (lesson.css): that is what is measured.
    document.querySelectorAll(".equation math").forEach(function (m) { pairs.push([m, m]); });
    document.querySelectorAll("section.code pre").forEach(function (pre) { pairs.push([pre, pre]); });
    function redo() { pairs.forEach(function (p) { fit(p[0], p[1]); }); }
    redo();
    if (window.ResizeObserver) {
      var pending = false;
      var ro = new ResizeObserver(function () {
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () { pending = false; redo(); });
      });
      pairs.forEach(function (p) { ro.observe(p[0]); });
    } else {
      window.addEventListener("resize", redo);
    }
  }

  function buildCode(sec) {
    Array.prototype.forEach.call(sec.querySelectorAll("pre"), function (pre) {
      pre.classList.add("has-copy");
      copyButton(pre);
    });
    timeline(Array.prototype.slice.call(sec.querySelectorAll(".step")));
  }

  function init() {
    // Every code block of the lesson is Python: highlight before building the
    // section, so the copy button goes in after the text is painted.
    document.querySelectorAll("pre > code").forEach(highlight);
    document.querySelectorAll("section.code").forEach(buildCode);
    unifyModel();
    document.querySelectorAll("ol.derivation, ol.observations").forEach(function (ol) {
      timeline(Array.prototype.filter.call(ol.children, function (li) {
        return !li.classList.contains("group") && !li.classList.contains("loose");
      }));
    });
    buildTabs();
    buildToc();
    fitWidth();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.Lesson = { init: init, highlightText: highlightText };
})();
