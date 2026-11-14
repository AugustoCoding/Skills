/* perfil-mu.js — a taxa específica μ contra o TEMPO, em 1/h.
 *
 * Escrito para esta lição porque o simulador.js desenha concentrações em g/L,
 * e μ está em 1/h: no mesmo eixo que vai a 260 g/L, a curva de μ seria uma
 * linha colada no zero. Um painel próprio, com o seu eixo.
 *
 * Duas curvas, ambas em 1/h, e a distância entre elas é a resposta:
 *
 *   μ             = μmax · S/(Ks+S) · (1 − P/Pmax)   o que a levedura faz
 *   teto de Monod = μmax · S/(Ks+S)                  o que ela faria sem etanol
 *
 * Uso:
 *   <div class="grafico-mu"
 *        data-tempo="24"
 *        data-params="mu_max=0.35, Ks=1.5, Yxs=0.045, Ypx=9, Pmax=90, X0=1, S0=260"
 *        data-controles="X0:0.5:8:0.5, mu_max:0.10:0.70:0.01"></div>
 */

(function () {
  "use strict";

  var PADROES = { mu_max: 0.35, Ks: 1.5, Yxs: 0.045, Ypx: 9.0, Pmax: 90, X0: 1, S0: 260, P0: 0 };
  var FAIXAS = {
    mu_max: [0.05, 0.7, 0.01], Ks: [0.1, 10, 0.1], Yxs: [0.02, 0.09, 0.001],
    Ypx: [4, 12, 0.1], Pmax: [40, 130, 1], X0: [0.5, 8, 0.5], S0: [100, 320, 5]
  };
  var UNIDADES = {
    mu_max: "1/h", Ks: "g/L", Yxs: "gX/gART", Ypx: "gP/gX",
    Pmax: "g/L", X0: "g/L", S0: "g/L", P0: "g/L"
  };

  function monod(p, S) { return (p.mu_max * Math.max(S, 0)) / (p.Ks + Math.max(S, 0)); }
  function muReal(p, S, P) { return monod(p, S) * Math.max(0, 1 - P / p.Pmax); }

  function deriv(t, y, p) {
    var r = muReal(p, y[1], y[2]) * y[0];
    return [r, -r / p.Yxs, p.Ypx * r];
  }

  function rk4(f, t, y, dt, p) {
    var k1 = f(t, y, p);
    var y2 = y.map(function (v, i) { return v + (dt / 2) * k1[i]; });
    var k2 = f(t + dt / 2, y2, p);
    var y3 = y.map(function (v, i) { return v + (dt / 2) * k2[i]; });
    var k3 = f(t + dt / 2, y3, p);
    var y4 = y.map(function (v, i) { return v + dt * k3[i]; });
    var k4 = f(t + dt, y4, p);
    return y.map(function (v, i) {
      return v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
    });
  }

  /* Integra o estado e devolve as DUAS taxas em cada amostra. */
  function simular(p, T, amostras) {
    amostras = amostras || 400;
    var sub = 5, dt = T / (amostras * sub);
    var y = [p.X0, p.S0, p.P0], t = 0;
    var d = { t: [0], mu: [muReal(p, y[1], y[2])], teto: [monod(p, y[1])], estado: [y.slice()] };

    for (var a = 0; a < amostras; a++) {
      for (var k = 0; k < sub; k++) { y = rk4(deriv, t, y, dt, p); t += dt; }
      y = y.map(function (v) { return v < 0 ? 0 : v; });   // negativo é artefato numérico
      d.t.push(t); d.mu.push(muReal(p, y[1], y[2])); d.teto.push(monod(p, y[1]));
      d.estado.push(y.slice());
    }
    return d;
  }

  function cor(nome) {
    return getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || "#888";
  }

  function desenhar(canvas, d) {
    var w = canvas.clientWidth || 600, h = 340;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.height = h + "px";
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var m = { esq: 58, dir: 12, topo: 12, base: 44 };
    var lw = w - m.esq - m.dir, lh = h - m.topo - m.base;
    var tMax = d.t[d.t.length - 1];
    var yMax = 0;
    d.teto.concat(d.mu).forEach(function (v) { if (v > yMax) yMax = v; });
    yMax = yMax > 0 ? yMax * 1.1 : 1;

    var px = function (t) { return m.esq + (t / tMax) * lw; };
    var py = function (v) { return m.topo + lh - (v / yMax) * lh; };

    ctx.strokeStyle = cor("--rule"); ctx.lineWidth = 1;
    ctx.fillStyle = cor("--muted"); ctx.font = "11px ui-monospace, monospace";
    ctx.beginPath();
    ctx.moveTo(m.esq, m.topo); ctx.lineTo(m.esq, m.topo + lh); ctx.lineTo(m.esq + lw, m.topo + lh);
    ctx.stroke();

    var i;
    for (i = 0; i <= 5; i++) {
      var vy = (yMax / 5) * i, yp = py(vy);
      ctx.beginPath(); ctx.moveTo(m.esq - 4, yp); ctx.lineTo(m.esq + lw, yp);
      ctx.globalAlpha = i === 0 ? 1 : 0.35; ctx.stroke(); ctx.globalAlpha = 1;
      ctx.textAlign = "right"; ctx.textBaseline = "middle";
      ctx.fillText(vy.toFixed(2), m.esq - 7, yp);
    }
    for (i = 0; i <= 6; i++) {
      var vt = (tMax / 6) * i, xp = px(vt);
      ctx.beginPath(); ctx.moveTo(xp, m.topo + lh); ctx.lineTo(xp, m.topo + lh + 4); ctx.stroke();
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(vt.toFixed(tMax < 10 ? 1 : 0), xp, m.topo + lh + 7);
    }

    ctx.fillStyle = cor("--fg"); ctx.font = "12px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("Tempo (h)", m.esq + lw / 2, h - 16);
    ctx.save(); ctx.translate(14, m.topo + lh / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText("Taxa específica (1/h)", 0, 0); ctx.restore();

    [[d.teto, cor("--cor-s"), [6, 4]], [d.mu, cor("--cor-x"), []]].forEach(function (c) {
      ctx.beginPath(); ctx.strokeStyle = c[1]; ctx.lineWidth = 2; ctx.setLineDash(c[2]);
      c[0].forEach(function (v, k) {
        var X = px(d.t[k]), Y = py(v);
        if (k === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      });
      ctx.stroke(); ctx.setLineDash([]);
    });
  }

  /* Leitura: o que o aluno confere contra a previsão dele. */
  function ler(d, p) {
    var n = d.t.length - 1, meia = null;
    for (var i = 0; i <= n; i++) { if (d.mu[i] < d.mu[0] / 2) { meia = d.t[i]; break; } }
    var f = d.estado[n];
    return "μ inicial " + d.mu[0].toFixed(3) + " 1/h · cai à metade em " +
      (meia === null ? "—" : meia.toFixed(1) + " h") +
      " · μ final " + d.mu[n].toFixed(4) + " 1/h · fator de inibição final " +
      Math.max(0, 1 - f[2] / p.Pmax).toFixed(3);
  }

  function pares(txt) {
    var p = {};
    (txt || "").split(",").forEach(function (par) {
      var kv = par.split("=");
      if (kv.length === 2) p[kv[0].trim()] = parseFloat(kv[1].trim().replace(",", "."));
    });
    return p;
  }

  var REDESENHOS = [];

  function estilo() {
    if (document.getElementById("css-perfil-mu")) return;
    var s = document.createElement("style");
    s.id = "css-perfil-mu";
    s.textContent =
      ".grafico-mu{border:1px solid var(--rule);border-radius:3px;padding:1.2rem;margin:2rem 0}" +
      ".grafico-mu canvas{width:100%;height:auto;display:block}";
    document.head.appendChild(s);
  }

  function montar(el) {
    estilo();
    var T = parseFloat(el.dataset.tempo || "24");
    var p = Object.assign({}, PADROES, pares(el.dataset.params));

    var canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label",
      "Taxa especifica de crescimento e teto de Monod ao longo do tempo");
    el.appendChild(canvas);

    var legenda = document.createElement("div");
    legenda.className = "sim-legenda";
    legenda.innerHTML =
      '<span class="l-x">&#956; da levedura</span><span class="l-s">teto de Monod</span>';
    el.appendChild(legenda);

    var leitura = document.createElement("p");
    leitura.className = "sim-leitura";
    el.appendChild(leitura);

    var controles = document.createElement("div");
    controles.className = "sim-controles";
    el.appendChild(controles);

    function redesenhar() {
      var d = simular(p, T);
      desenhar(canvas, d);
      leitura.textContent = ler(d, p);
    }

    (el.dataset.controles || "").split(",").map(function (s) { return s.trim(); })
      .filter(Boolean).forEach(function (spec) {
        var q = spec.split(":"), chave = q[0], fx = FAIXAS[chave] || [0, 1, 0.01];
        var bloco = document.createElement("div");
        bloco.className = "sim-controle";
        var label = document.createElement("label");
        var nome = document.createElement("span"); nome.textContent = chave;
        var valor = document.createElement("span"); valor.className = "valor";
        var un = UNIDADES[chave] || "";
        function mostrar() { valor.textContent = p[chave] + " " + un; }
        mostrar();
        label.appendChild(nome); label.appendChild(valor);

        var r = document.createElement("input");
        r.type = "range";
        r.min = q.length > 1 ? q[1] : fx[0];
        r.max = q.length > 2 ? q[2] : fx[1];
        r.step = q.length > 3 ? q[3] : fx[2];
        r.value = p[chave];
        r.setAttribute("aria-label", chave + " em " + un);
        r.addEventListener("input", function () {
          p[chave] = parseFloat(r.value); mostrar(); redesenhar();
        });
        bloco.appendChild(label); bloco.appendChild(r);
        controles.appendChild(bloco);
      });

    redesenhar();
    REDESENHOS.push(redesenhar);
    window.addEventListener("resize", redesenhar);
  }

  function redesenharTodos() { REDESENHOS.forEach(function (f) { f(); }); }

  function iniciar() {
    document.querySelectorAll(".grafico-mu").forEach(montar);
    // O tema.js não conhece este componente: as cores saem do CSS na hora de
    // desenhar, então basta observar a troca de tema e repintar.
    new MutationObserver(redesenharTodos)
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", redesenharTodos);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else { iniciar(); }

  window.PerfilMu = { iniciar: iniciar, simular: simular, redesenharTodos: redesenharTodos };
})();
