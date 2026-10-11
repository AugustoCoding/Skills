/* theme.js — the light/dark button, injected by itself into every lesson.
 *
 * Two states, only. "Follow the system" would be a third one and would
 * complicate the explanation without changing anything for the student: until
 * they click, the page already follows the system through lesson.css's @media.
 *
 * The button injects itself: the lesson needs no markup, it only loads this
 * file. A component that requires markup becomes a forgotten component.
 *
 * The choice is remembered across lessons when the browser allows it. Opened
 * from file://, some browsers block storage — so every access is in a
 * try/catch, and without it the button still works on the open page.
 */

(function () {
  "use strict";

  // The texts the student sees, in the lesson's language (<html lang>):
  // Portuguese when lang starts with "pt"; English otherwise.
  var PT = /^pt/i.test(document.documentElement.lang);
  // The stored value is always "light" or "dark"; only the label changes language.
  var NAME = PT ? { light: "claro", dark: "escuro" } : { light: "light", dark: "dark" };
  var SWITCH = PT ? "Mudar para o tema " : "Switch to the theme: ";

  var KEY = "lesson-theme";
  var root = document.documentElement;

  function stored() {
    try {
      var v = localStorage.getItem(KEY);
      return v === "light" || v === "dark" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function store(v) {
    try {
      localStorage.setItem(KEY, v);
    } catch (e) {
      /* No storage: the choice holds for this page only. */
    }
  }

  function fromSystem() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function current() {
    return root.getAttribute("data-theme") || fromSystem();
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
  }

  function build() {
    var btn = document.createElement("button");
    btn.className = "theme";
    btn.type = "button";

    function label() {
      var target = current() === "dark" ? "light" : "dark";
      // The label says where the click leads, not where you are: that is what
      // a two-state button needs to answer.
      // A drawn icon (lesson.css), not ◐/◑: it aligns with the text in any font.
      btn.textContent = "";
      var ic = document.createElement("span");
      ic.className = "ic ic-theme";
      btn.append(ic, document.createTextNode(NAME[target]));
      btn.setAttribute("aria-label", SWITCH + NAME[target]);
    }

    btn.addEventListener("click", function () {
      var target = current() === "dark" ? "light" : "dark";
      apply(target);
      store(target);
      label();
      // The plot reads the CSS colors at drawing time: without a redraw, the
      // curves keep the previous theme's palette.
      //
      // The event serves ANY component, including one you write: it only has
      // to listen to "theme-changed". It is the only contract — this file
      // knows no component by name.
      document.dispatchEvent(new CustomEvent("theme-changed"));
    });

    label();
    document.body.appendChild(btn);
  }

  var saved = stored();
  if (saved) apply(saved);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }

  window.Theme = { current: current, apply: apply };
})();
