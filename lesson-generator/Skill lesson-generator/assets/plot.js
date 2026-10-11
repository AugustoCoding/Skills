/* plot.js — the lesson's figure: lines and points on Cartesian axes, with
 * sliders that recompute on the spot.
 *
 * It knows nothing about the exercise or about chemical engineering. The
 * lesson registers WHAT to compute — the same calculations as the Python
 * program, translated to JS — and this file does the rest: axes, scale,
 * legend, controls, theme, readout under the cursor. Time course, parameter
 * sweep, profile along a reactor, equilibrium curve, data against model:
 * everything is x versus y.
 *
 * Usage in the lesson:
 *
 *   <div class="plot" data-plot="profile" data-controls="k, T0:300:400:5"></div>
 *
 *   Plot.register("profile", {
 *     xLabel:  "Time (h)",                 label with unit, always
 *     yLabel:  "Concentration (mol/L)",
 *     y2Label: "Temperature (K)",          optional: only if some series uses axis 2
 *     series: [                            the legend names are the names in the text
 *       "Reactant A",
 *       { name: "Temperature", axis: 2 },
 *       { name: "Measurements", type: "points" }
 *     ],
 *     defaults: { k: 0.3, T0: 350 },       every parameter that compute() reads
 *     ranges:   { k: [0.05, 1, 0.01] },    [min, max, step] of what may become a control
 *     units:    { k: "1/h", T0: "K" },
 *     labels:   { T0: "Inlet T" },         optional: how the control is shown (default: the key)
 *     limits:   { y: [0, 2] },             optional: fixes x, y or y2 instead of the automatic scale
 *     compute:  function (p) { ... },      returns the series — formats below
 *     readout:  function (s, p) { ... }    optional: the line of numbers under the plot
 *   });
 *
 * compute(p) returns, in the order of `series`, one of two formats:
 *   { x: [...], y: [[...], [...]] }          all series on the same x
 *   [ { x: [...], y: [...] }, ... ]          each series with its own x
 * readout(s, p) always receives the second format.
 *
 * CONTROLS. data-controls lists parameter names, at most four. The range comes
 * from "name:min:max:step" in the tag; otherwise, from ranges[name]; without
 * either, the control is not created and the console says why. The initial
 * value is defaults[name], or the one in data-params="name=value, ..." if the
 * tag has it.
 *
 * NOTHING IS CLIPPED. Negative concentration, fraction above 1: if physics
 * forbids it, your calculation prevents it, as in Python. This file draws
 * whatever it receives.
 *
 * Numerical tools, so compute() does not reinvent them:
 *   Plot.integrate(deriv, y0, t0, tf, p, n)    fixed-step RK4, n steps (default 2000)
 *                                              → { t: [...], y: [[...], ...] }, one list per state
 *   Plot.linspace(a, b, n)
 *   Plot.root(f, a, b)                         bisection; NaN if f does not change sign in [a, b]
 *   Plot.fmt(v, decimals)                      number with the language's decimal separator
 *
 * CONSOLE WARNINGS — the lesson's author cannot see the figure, so it warns:
 *   flattened series (varies less than 8% of the height of an axis it shares)
 *   non-finite value; control without range; range that excludes the initial value
 *
 * A new component only for what is not x versus y (a diagram, a color map).
 * If you write one, follow the conventions here: CSS colors, canvas with DPR,
 * and redraw on "resize" and on "theme-changed".
 */

(function () {
  "use strict";

  // The texts the student sees, in the lesson's language (<html lang>):
  // Portuguese when lang starts with "pt"; English otherwise.
  var PT = /^pt/i.test(document.documentElement.lang);
  var TXT = PT
    ? { versus: " contra ", right: "(eixo à direita)", in: " em " }
    : { versus: " versus ", right: "(right axis)", in: " in " };

  var DEFS = {};
  var REDRAWS = [];

  function register(name, def) {
    DEFS[name] = def;
    // A deferred script runs with readyState already "interactive": init() may
    // have run before the lesson registered. Scanning again fixes the order.
    if (document.body) init();
  }

  /* ---------- numerical tools ---------- */

  function linspace(a, b, n) {
    var v = [];
    for (var i = 0; i < n; i++) v.push(n === 1 ? a : a + ((b - a) * i) / (n - 1));
    return v;
  }

  function rk4(f, t, y, h, p) {
    var k1 = f(t, y, p);
    var k2 = f(t + h / 2, y.map(function (v, i) { return v + (h / 2) * k1[i]; }), p);
    var k3 = f(t + h / 2, y.map(function (v, i) { return v + (h / 2) * k2[i]; }), p);
    var k4 = f(t + h, y.map(function (v, i) { return v + h * k3[i]; }), p);
    return y.map(function (v, i) { return v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]); });
  }

  function integrate(deriv, y0, t0, tf, p, n) {
    n = n || 2000;
    var h = (tf - t0) / n;
    var y = y0.slice();
    var out = { t: [t0], y: y.map(function (v) { return [v]; }) };
    for (var k = 1; k <= n; k++) {
      y = rk4(deriv, t0 + (k - 1) * h, y, h, p);
      out.t.push(t0 + k * h);
      y.forEach(function (v, i) { out.y[i].push(v); });
    }
    return out;
  }

  function root(f, a, b) {
    var fa = f(a), fb = f(b);
    if (!(isFinite(fa) && isFinite(fb)) || fa * fb > 0) return NaN;
    for (var i = 0; i < 200; i++) {
      var m = (a + b) / 2, fm = f(m);
      if (fm === 0 || (b - a) / 2 < 1e-12 * Math.max(1, Math.abs(m))) return m;
      if (fa * fm < 0) { b = m; } else { a = m; fa = fm; }
    }
    return (a + b) / 2;
  }

  function fmt(v, decimals) {
    if (!isFinite(v)) return "—";
    var s = v.toFixed(decimals == null ? 2 : decimals);
    return PT ? s.replace(".", ",") : s;
  }

  /* ---------- scale ---------- */

  function niceStep(span) {
    var raw = span / 5;
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var r = raw / mag;
    return (r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10) * mag;
  }

  function decimalsOf(step) {
    return Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
  }

  // y axis: rounds outward, and touches zero when the data are positive and
  // close to it — a concentration that starts at 0.4 reads better on an axis
  // that starts at 0.
  function scaleY(min, max, fixed) {
    if (fixed) return { min: fixed[0], max: fixed[1], step: niceStep(fixed[1] - fixed[0]) };
    if (!(isFinite(min) && isFinite(max))) { min = 0; max = 1; }
    if (min >= 0 && min < 0.3 * max) min = 0;
    if (max === min) max = min + (Math.abs(min) || 1);
    var step = niceStep(max - min);
    return { min: Math.floor(min / step + 1e-9) * step, max: Math.ceil(max / step - 1e-9) * step, step: step };
  }

  // x axis: exactly the range of the data — 72 h does not become 80 h of empty axis.
  function scaleX(min, max, fixed) {
    if (fixed) { min = fixed[0]; max = fixed[1]; }
    if (!(isFinite(min) && isFinite(max))) { min = 0; max = 1; }
    if (max === min) max = min + 1;
    return { min: min, max: max, step: niceStep(max - min) };
  }

  /* ---------- data ---------- */

  function normalize(raw, n) {
    if (Array.isArray(raw)) return raw;
    return (raw.y || []).slice(0, n).map(function (y) { return { x: raw.x, y: y }; });
  }

  function seriesSpec(s) {
    return typeof s === "string" ? { name: s, axis: 1, type: "line" }
      : { name: s.name, axis: s.axis || 1, type: s.type || "line" };
  }

  /* ---------- drawing ---------- */

  function color(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#888";
  }

  var DASHES = [[], [7, 4], [2, 3], [9, 3, 2, 3]];

  function draw(state) {
    var canvas = state.canvas, def = state.def, series = state.series, specs = state.specs;
    var parent = canvas.parentElement;
    // A canvas without a CSS width measures 300 px, which is truthy: the container knows the width.
    var w = canvas.clientWidth || (parent && parent.clientWidth) || 600;
    var h = state.height;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = h + "px";

    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var hasY2 = specs.some(function (s) { return s.axis === 2; });
    var m = { left: 60, right: hasY2 ? 60 : 14, top: 12, bottom: 46 };
    var lw = w - m.left - m.right, lh = h - m.top - m.bottom;

    var xs = { min: Infinity, max: -Infinity };
    var ys = [null, { min: Infinity, max: -Infinity }, { min: Infinity, max: -Infinity }];
    series.forEach(function (s, i) {
      var e = ys[specs[i].axis];
      s.x.forEach(function (x, k) {
        var y = s.y[k];
        if (!isFinite(x) || !isFinite(y)) return;
        if (x < xs.min) xs.min = x; if (x > xs.max) xs.max = x;
        if (y < e.min) e.min = y; if (y > e.max) e.max = y;
      });
    });

    var lim = def.limits || {};
    var ex = scaleX(xs.min, xs.max, lim.x);
    var ey = [null, scaleY(ys[1].min, ys[1].max, lim.y), hasY2 ? scaleY(ys[2].min, ys[2].max, lim.y2) : null];
    state.scales = { x: ex, y: ey, m: m, lw: lw, lh: lh };

    function px(x) { return m.left + ((x - ex.min) / (ex.max - ex.min)) * lw; }
    function py(y, e) { var s = ey[e]; return m.top + lh - ((y - s.min) / (s.max - s.min)) * lh; }
    state.px = px; state.py = py;

    var colRule = color("--rule"), colMuted = color("--muted"), colFg = color("--fg");
    ctx.lineWidth = 1;
    ctx.font = "13px " + color("--serif");

    // Grid and ticks of the main y axis
    var cy = decimalsOf(ey[1].step), v;
    for (v = ey[1].min; v <= ey[1].max + ey[1].step / 2; v += ey[1].step) {
      var yp = py(v, 1);
      ctx.strokeStyle = colRule;
      ctx.globalAlpha = Math.abs(v - ey[1].min) < 1e-12 ? 1 : 0.35;
      ctx.beginPath(); ctx.moveTo(m.left - 4, yp); ctx.lineTo(m.left + lw, yp); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = colMuted; ctx.textAlign = "right"; ctx.textBaseline = "middle";
      ctx.fillText(fmt(v, cy), m.left - 7, yp);
    }
    // Ticks of the secondary y axis, without a grid of their own
    if (hasY2) {
      var c2 = decimalsOf(ey[2].step);
      for (v = ey[2].min; v <= ey[2].max + ey[2].step / 2; v += ey[2].step) {
        var y2p = py(v, 2);
        ctx.strokeStyle = colRule;
        ctx.beginPath(); ctx.moveTo(m.left + lw, y2p); ctx.lineTo(m.left + lw + 4, y2p); ctx.stroke();
        ctx.fillStyle = colMuted; ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText(fmt(v, c2), m.left + lw + 7, y2p);
      }
    }
    // Ticks of the x axis, at the multiples of the step that fall inside the range
    var cx = decimalsOf(ex.step);
    for (v = Math.ceil(ex.min / ex.step - 1e-9) * ex.step; v <= ex.max + 1e-9 * Math.abs(ex.max || 1); v += ex.step) {
      var xp = px(v);
      ctx.strokeStyle = colRule;
      ctx.beginPath(); ctx.moveTo(xp, m.top + lh); ctx.lineTo(xp, m.top + lh + 4); ctx.stroke();
      ctx.fillStyle = colMuted; ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(fmt(v, cx), xp, m.top + lh + 7);
    }

    // Axis lines
    ctx.strokeStyle = colRule;
    ctx.beginPath();
    ctx.moveTo(m.left, m.top); ctx.lineTo(m.left, m.top + lh); ctx.lineTo(m.left + lw, m.top + lh);
    if (hasY2) ctx.lineTo(m.left + lw, m.top);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = colFg;
    ctx.font = "14px " + color("--serif");
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    ctx.fillText(def.xLabel || "x", m.left + lw / 2, h - 10);
    ctx.save(); ctx.translate(14, m.top + lh / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText(def.yLabel || "y", 0, 0); ctx.restore();
    if (hasY2) {
      ctx.save(); ctx.translate(w - 8, m.top + lh / 2); ctx.rotate(Math.PI / 2);
      ctx.fillText(def.y2Label || "y₂", 0, 0); ctx.restore();
    }

    // Series, clipped to the plot area (fixed limits may cut the curve), with
    // some slack so a point on the edge is not cut in half.
    ctx.save();
    ctx.beginPath(); ctx.rect(m.left - 5, m.top - 5, lw + 10, lh + 10); ctx.clip();
    series.forEach(function (s, i) {
      var sp = specs[i], c = color("--series-" + (i + 1)) || colFg;
      ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 2;
      if (sp.type === "points") {
        s.x.forEach(function (x, k) {
          if (!isFinite(x) || !isFinite(s.y[k])) return;
          ctx.beginPath(); ctx.arc(px(x), py(s.y[k], sp.axis), 3.5, 0, 2 * Math.PI); ctx.fill();
        });
        return;
      }
      ctx.setLineDash(DASHES[i] || []);
      ctx.beginPath();
      var open = false;
      s.x.forEach(function (x, k) {
        var y = s.y[k];
        if (!isFinite(x) || !isFinite(y)) { open = false; return; }
        if (!open) { ctx.moveTo(px(x), py(y, sp.axis)); open = true; }
        else ctx.lineTo(px(x), py(y, sp.axis));
      });
      ctx.stroke(); ctx.setLineDash([]);
    });
    ctx.restore();

    if (state.cursor != null) drawCursor(ctx, state);
  }

  // The readout under the cursor: the value of each series at the pointed x.
  // Reading the number off the curve is what the student does with the plot;
  // without this, they estimate it by eye.
  function drawCursor(ctx, state) {
    var e = state.scales, m = e.m;
    var x = e.x.min + ((state.cursor - m.left) / e.lw) * (e.x.max - e.x.min);
    if (x < e.x.min || x > e.x.max) return;
    var lines = [state.def.xLabel.replace(/\s*\(.*\)$/, "") + " = " + fmt(x, decimalsOf(e.x.step) + 1)];
    state.series.forEach(function (s, i) {
      var sp = state.specs[i];
      if (sp.type === "points") return;
      var y = interpolate(s, x);
      if (!isFinite(y)) return;
      lines.push(sp.name + ": " + fmt(y, decimalsOf(e.y[sp.axis].step) + 1));
      ctx.fillStyle = color("--series-" + (i + 1));
      ctx.beginPath(); ctx.arc(state.px(x), state.py(y, sp.axis), 4, 0, 2 * Math.PI); ctx.fill();
    });

    var xp = state.px(x);
    ctx.strokeStyle = color("--muted"); ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(xp, m.top); ctx.lineTo(xp, m.top + e.lh); ctx.stroke(); ctx.setLineDash([]);

    ctx.font = "13px " + color("--serif");
    var width = Math.max.apply(null, lines.map(function (l) { return ctx.measureText(l).width; })) + 16;
    var height = lines.length * 15 + 10;
    var bx = xp + 10 + width > m.left + e.lw ? xp - 10 - width : xp + 10;
    ctx.fillStyle = color("--bg"); ctx.strokeStyle = color("--rule");
    ctx.fillRect(bx, m.top + 6, width, height); ctx.strokeRect(bx, m.top + 6, width, height);
    ctx.fillStyle = color("--fg"); ctx.textAlign = "left"; ctx.textBaseline = "top";
    lines.forEach(function (l, k) { ctx.fillText(l, bx + 8, m.top + 11 + k * 15); });
  }

  function interpolate(s, x) {
    for (var k = 1; k < s.x.length; k++) {
      var a = s.x[k - 1], b = s.x[k];
      if ((a <= x && x <= b) || (b <= x && x <= a)) {
        if (a === b) return s.y[k];
        return s.y[k - 1] + ((x - a) / (b - a)) * (s.y[k] - s.y[k - 1]);
      }
    }
    return NaN;
  }

  /* ---------- warnings ---------- */

  function check(state) {
    var name = state.name, warned = state.warned;
    var byAxis = {};
    state.series.forEach(function (s, i) {
      var sp = state.specs[i];
      (byAxis[sp.axis] = byAxis[sp.axis] || []).push(i);
      var bad = s.y.filter(function (v) { return !isFinite(v); }).length;
      if (bad && !warned["nan" + i]) {
        warned["nan" + i] = 1;
        console.warn("[plot] " + name + ': series "' + sp.name + '" has ' + bad + " non-finite values — the curve will have gaps.");
      }
    });
    Object.keys(byAxis).forEach(function (e) {
      if (byAxis[e].length < 2) return;
      var sc = state.scales.y[e], span = sc.max - sc.min;
      byAxis[e].forEach(function (i) {
        var ys = state.series[i].y.filter(isFinite);
        if (!ys.length || state.specs[i].type === "points") return;
        var amp = Math.max.apply(null, ys) - Math.min.apply(null, ys);
        if (amp > 0 && amp < 0.08 * span && !warned["flat" + i]) {
          warned["flat" + i] = 1;
          console.warn("[plot] " + name + ': series "' + state.specs[i].name + '" varies only ' +
            Math.round((100 * amp) / span) + "% of the height of axis " + e + " — on the plot it is a flat line. " +
            "Put it on axis 2 ({ name, axis: 2 }) or in a figure of its own.");
        }
      });
    });
  }

  /* ---------- assembly ---------- */

  function pairs(txt) {
    var p = {};
    (txt || "").split(",").forEach(function (pair) {
      var kv = pair.split("=");
      if (kv.length === 2) p[kv[0].trim()] = parseFloat(kv[1].trim());
    });
    return p;
  }

  function mount(el, name) {
    var def = DEFS[name];
    el.classList.add("frame");
    var params = Object.assign({}, def.defaults || {}, pairs(el.dataset.params));
    var specs = (def.series || []).map(seriesSpec);
    var height = Math.min(420, Math.max(320, parseFloat(el.dataset.height) || 340));

    var canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", (def.yLabel || "y") + TXT.versus + (def.xLabel || "x"));
    el.appendChild(canvas);

    var legend = document.createElement("div");
    legend.className = "legend";
    legend.innerHTML = specs.map(function (s, i) {
      return '<span class="l-' + (i + 1) + (s.type === "points" ? " l-points" : "") + '">' +
        s.name + (s.axis === 2 ? " <small>" + TXT.right + "</small>" : "") + "</span>";
    }).join("");
    el.appendChild(legend);

    var readout = document.createElement("p");
    readout.className = "readout";
    el.appendChild(readout);

    var controls = document.createElement("div");
    controls.className = "controls";
    el.appendChild(controls);

    var state = { name: name, def: def, canvas: canvas, specs: specs, height: height, cursor: null, warned: {} };

    function recompute() {
      state.series = normalize(def.compute(params), specs.length);
      if (state.series.length !== specs.length) {
        console.error("[plot] " + name + ": compute() returned " + state.series.length +
          " series, and `series` declares " + specs.length + ".");
      }
      state.series = state.series.slice(0, specs.length);
      draw(state);
      check(state);
      readout.textContent = typeof def.readout === "function" ? def.readout(state.series, params) : "";
    }
    function redraw() { if (state.series) draw(state); }

    var requested = (el.dataset.controls || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    if (requested.length > 4) console.warn("[plot] " + name + ": " + requested.length + " controls — the limit is four.");
    requested.forEach(function (spec) {
      var q = spec.split(":"), key = q[0].trim();
      var f = q.length === 4 ? q.slice(1).map(parseFloat) : (def.ranges || {})[key];
      if (!f) {
        console.error("[plot] " + name + ': control "' + key + '" has no range — declare it in ranges or as "' + key + ':min:max:step".');
        return;
      }
      if (!(key in params)) {
        console.error("[plot] " + name + ': control "' + key + '" is not in defaults, and compute() never reads it.');
        return;
      }
      if (params[key] < f[0] || params[key] > f[1]) {
        console.warn("[plot] " + name + ": " + key + " = " + params[key] + " is outside the range [" + f[0] + ", " + f[1] + "].");
      }
      var unit = (def.units || {})[key] || "";
      var decimals = decimalsOf(f[2]);

      var block = document.createElement("div");
      block.className = "control";
      var labelEl = document.createElement("label");
      var nameSpan = document.createElement("span");
      var text = (def.labels || {})[key] || key;
      nameSpan.textContent = text;
      var value = document.createElement("span");
      value.className = "value";
      function show() { value.textContent = fmt(params[key], decimals) + (unit ? " " + unit : ""); }
      show();
      labelEl.appendChild(nameSpan); labelEl.appendChild(value);

      var range = document.createElement("input");
      range.type = "range";
      range.min = f[0]; range.max = f[1]; range.step = f[2];
      range.value = params[key];
      range.setAttribute("aria-label", text + (unit ? TXT.in + unit : ""));
      range.addEventListener("input", function () {
        params[key] = parseFloat(range.value);
        show();
        recompute();
      });
      block.appendChild(labelEl); block.appendChild(range);
      controls.appendChild(block);
    });

    canvas.addEventListener("pointermove", function (ev) {
      state.cursor = ev.clientX - canvas.getBoundingClientRect().left;
      redraw();
    });
    canvas.addEventListener("pointerleave", function () { state.cursor = null; redraw(); });

    recompute();
    REDRAWS.push(redraw);
  }

  function init() {
    document.querySelectorAll(".plot[data-plot]").forEach(function (el) {
      var name = el.dataset.plot;
      if (el.dataset.mounted || !DEFS[name]) return;   // idempotent; waits for register
      el.dataset.mounted = "1";
      mount(el, name);
    });
  }

  function redrawAll() { REDRAWS.forEach(function (f) { f(); }); }

  // Colors come from the CSS at drawing time: switching themes without
  // redrawing leaves the curve with the previous palette.
  window.addEventListener("resize", redrawAll);
  document.addEventListener("theme-changed", redrawAll);
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) mq.addEventListener("change", redrawAll);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  // Warns about a tag that was never registered.
  window.addEventListener("load", function () {
    document.querySelectorAll(".plot[data-plot]").forEach(function (el) {
      if (!el.dataset.mounted) console.error('[plot] no Plot.register("' + el.dataset.plot + '") — the figure is empty.');
    });
  });

  window.Plot = {
    register: register,
    init: init,
    integrate: integrate,
    linspace: linspace,
    root: root,
    fmt: fmt
  };
})();
