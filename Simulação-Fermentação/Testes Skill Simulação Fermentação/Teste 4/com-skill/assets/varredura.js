/* varredura.js — a figura que o simulador.js não desenha.
 *
 * O simulador.js plota concentração contra tempo. Um exercício de contínuo
 * pergunta outra coisa: qual taxa de diluição rende mais. A resposta é uma
 * curva com D no eixo horizontal e o estado ESTACIONÁRIO no vertical — não
 * há tempo nenhum nela.
 *
 * O estado estacionário do quimiostato tem solução fechada, então aqui não
 * se integra nada: cada ponto sai de duas linhas de álgebra. É mais rápido e
 * mais confiável que integrar, e perto do washout a integração sequer
 * converge no horizonte que se costuma dar a ela.
 *
 *   <div class="varredura"
 *        data-params="mu_max=0.30, Ks=1.0, Yxs=0.05, Ypx=8.0, Sin=100"
 *        data-controles="Sin:20:200:5, Ks:0.1:10:0.1"></div>
 *
 * Dois painéis empilhados, mesmo eixo D: em cima a produtividade
 * (g·L⁻¹·h⁻¹), embaixo X, S e P (todos g/L). Painéis separados porque
 * misturar unidades num eixo só seria mentira de rótulo.
 */

(function () {
  "use strict";

  var UNIDADES = { mu_max: "1/h", Ks: "g/L", Yxs: "gX/gS", Ypx: "gP/gX", Sin: "g/L" };
  var PADROES = { mu_max: 0.30, Ks: 1.0, Yxs: 0.05, Ypx: 8.0, Sin: 100 };

  /* ---------- o estado estacionário, analítico ----------
     μ = D no estacionário. Invertendo Monod: S = Ks·D/(μmax − D).
     Acima do D crítico não há solução com célula: é washout. */

  function estacionario(p, D) {
    var Dc = (p.mu_max * p.Sin) / (p.Ks + p.Sin);
    if (D <= 0 || D >= Dc) return { X: 0, S: p.Sin, P: 0, Pr: 0, lavado: true };
    var S = (p.Ks * D) / (p.mu_max - D);
    var X = p.Yxs * (p.Sin - S);
    var P = p.Ypx * X;
    return { X: X, S: S, P: P, Pr: D * P, lavado: false };
  }

  function dCritico(p) { return (p.mu_max * p.Sin) / (p.Ks + p.Sin); }

  // Ótimo com solução fechada: dPr/dD = 0 dá esta raiz.
  function dOtimo(p) {
    return p.mu_max * (1 - Math.sqrt(p.Ks / (p.Ks + p.Sin)));
  }

  function varrer(p, Dmax, n) {
    var pontos = [];
    for (var i = 0; i <= n; i++) {
      var D = (Dmax * i) / n;
      var e = estacionario(p, D);
      e.D = D;
      pontos.push(e);
    }
    return pontos;
  }

  /* ---------- desenho ---------- */

  function cor(nome) {
    return getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || "#888";
  }

  function painel(ctx, m, series, opts) {
    var corMuted = cor("--muted"), corRule = cor("--rule"), corFg = cor("--fg");
    var xMax = opts.xMax;
    var yMax = 0;
    series.forEach(function (s) {
      s.v.forEach(function (v) { if (v > yMax) yMax = v; });
    });
    yMax = yMax > 0 ? yMax * 1.10 : 1;

    var px = function (d) { return m.x + (d / xMax) * m.w; };
    var py = function (v) { return m.y + m.h - (v / yMax) * m.h; };

    ctx.strokeStyle = corRule;
    ctx.lineWidth = 1;
    ctx.fillStyle = corMuted;
    ctx.font = "11px ui-monospace, monospace";

    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x, m.y + m.h);
    ctx.lineTo(m.x + m.w, m.y + m.h);
    ctx.stroke();

    var i, casas = yMax < 5 ? 1 : 0;
    for (i = 0; i <= 4; i++) {
      var vy = (yMax / 4) * i, yp = py(vy);
      ctx.beginPath();
      ctx.moveTo(m.x - 4, yp);
      ctx.lineTo(m.x + m.w, yp);
      ctx.globalAlpha = i === 0 ? 1 : 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(vy.toFixed(casas), m.x - 7, yp);
    }

    for (i = 0; i <= 6; i++) {
      var vx = (xMax / 6) * i, xp = px(vx);
      ctx.beginPath();
      ctx.moveTo(xp, m.y + m.h);
      ctx.lineTo(xp, m.y + m.h + 4);
      ctx.stroke();
      if (opts.eixoX) {
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(vx.toFixed(2), xp, m.y + m.h + 7);
      }
    }

    // Marcas verticais: o D crítico (washout, tracejado) e o D ótimo (cheio).
    if (opts.Dcrit && opts.Dcrit <= xMax) {
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = corMuted;
      ctx.beginPath();
      ctx.moveTo(px(opts.Dcrit), m.y);
      ctx.lineTo(px(opts.Dcrit), m.y + m.h);
      ctx.stroke();
      ctx.restore();
    }
    if (opts.Dopt && opts.Dopt <= xMax) {
      ctx.save();
      ctx.strokeStyle = corFg;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(px(opts.Dopt), m.y);
      ctx.lineTo(px(opts.Dopt), m.y + m.h);
      ctx.stroke();
      ctx.restore();
    }

    series.forEach(function (s) {
      ctx.beginPath();
      ctx.strokeStyle = s.cor;
      ctx.lineWidth = 2;
      ctx.setLineDash(s.traco || []);
      s.v.forEach(function (v, k) {
        var X = px(opts.x[k]), Y = py(v);
        if (k === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    });

    ctx.fillStyle = corFg;
    ctx.font = "12px ui-monospace, monospace";
    ctx.save();
    ctx.translate(14, m.y + m.h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(opts.rotuloY, 0, 0);
    ctx.restore();
  }

  function desenhar(canvas, p, Dmax) {
    var css = { w: canvas.clientWidth || 600, h: 420 };
    var dpr = window.devicePixelRatio || 1;
    canvas.width = css.w * dpr;
    canvas.height = css.h * dpr;
    canvas.style.height = css.h + "px";

    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, css.w, css.h);

    var pts = varrer(p, Dmax, 400);
    var x = pts.map(function (e) { return e.D; });
    var esq = 58, dir = 12, lw = css.w - esq - dir;
    var opts = { x: x, xMax: Dmax, Dcrit: dCritico(p), Dopt: dOtimo(p) };

    painel(ctx, { x: esq, y: 14, w: lw, h: 150 },
      [{ v: pts.map(function (e) { return e.Pr; }), cor: cor("--cor-p"), traco: [] }],
      Object.assign({}, opts, { rotuloY: "Produtividade (g/L/h)", eixoX: false }));

    painel(ctx, { x: esq, y: 212, w: lw, h: 150 },
      [
        { v: pts.map(function (e) { return e.X; }), cor: cor("--cor-x"), traco: [] },
        { v: pts.map(function (e) { return e.S; }), cor: cor("--cor-s"), traco: [6, 4] },
        { v: pts.map(function (e) { return e.P; }), cor: cor("--cor-p"), traco: [2, 3] }
      ],
      Object.assign({}, opts, { rotuloY: "Concentração (g/L)", eixoX: true }));

    ctx.fillStyle = cor("--fg");
    ctx.font = "12px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("Taxa de diluição D (1/h)", esq + lw / 2, css.h - 10);
  }

  /* ---------- montagem ---------- */

  function parsePares(txt) {
    var p = {};
    if (!txt) return p;
    txt.split(",").forEach(function (par) {
      var kv = par.split("=");
      if (kv.length === 2) p[kv[0].trim()] = parseFloat(kv[1].trim().replace(",", "."));
    });
    return p;
  }

  var REDESENHOS = [];
  function redesenharTodos() { REDESENHOS.forEach(function (f) { f(); }); }

  function montar(el) {
    var p = Object.assign({}, PADROES, parsePares(el.dataset.params));

    var canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label",
      "Produtividade de etanol e concentrações no estado estacionário, em função da taxa de diluição");
    el.appendChild(canvas);

    var legenda = document.createElement("div");
    legenda.className = "sim-legenda";
    legenda.innerHTML =
      '<span class="l-x">Biomassa X</span><span class="l-s">Substrato S</span>' +
      '<span class="l-p">Produto P e produtividade</span>';
    el.appendChild(legenda);

    // As duas verticais precisam de rótulo: sem ele o aluno vê dois riscos
    // e não sabe qual é o ótimo e qual é o precipício.
    var marcas = document.createElement("p");
    marcas.className = "sim-leitura";
    marcas.textContent = "Vertical cheia: D ótimo. Vertical pontilhada: D crítico (washout).";
    el.appendChild(marcas);

    var leitura = document.createElement("p");
    leitura.className = "sim-leitura";
    el.appendChild(leitura);

    var controles = document.createElement("div");
    controles.className = "sim-controles";
    el.appendChild(controles);

    function redesenhar() {
      // A janela acompanha o washout: fixar Dmax esconderia a queda quando o
      // aluno mexe em Sin ou Ks e o D crítico anda.
      var Dmax = Math.min(p.mu_max * 1.12, dCritico(p) * 1.08);
      desenhar(canvas, p, Dmax);
      var Do = dOtimo(p), e = estacionario(p, Do), Dc = dCritico(p);
      leitura.textContent =
        "D ótimo " + Do.toFixed(4) + " 1/h · produtividade " + e.Pr.toFixed(2) +
        " g/L/h · S residual " + e.S.toFixed(2) + " g/L · D crítico " +
        Dc.toFixed(4) + " 1/h (o ótimo está a " + (100 * Do / Dc).toFixed(1) + "% dele)";
    }

    (el.dataset.controles || "").split(",").map(function (s) { return s.trim(); })
      .filter(Boolean).forEach(function (spec) {
        var partes = spec.split(":");
        var chave = partes[0];
        var min = parseFloat(partes[1]), max = parseFloat(partes[2]), passo = parseFloat(partes[3]);

        var bloco = document.createElement("div");
        bloco.className = "sim-controle";
        var label = document.createElement("label");
        var nome = document.createElement("span");
        nome.textContent = chave;
        var valor = document.createElement("span");
        valor.className = "valor";
        var un = UNIDADES[chave] || "";
        function mostrar() { valor.textContent = p[chave] + " " + un; }
        mostrar();
        label.appendChild(nome);
        label.appendChild(valor);

        var range = document.createElement("input");
        range.type = "range";
        range.min = min; range.max = max; range.step = passo;
        range.value = p[chave];
        range.setAttribute("aria-label", chave + " em " + un);
        range.addEventListener("input", function () {
          p[chave] = parseFloat(range.value);
          mostrar();
          redesenhar();
        });

        bloco.appendChild(label);
        bloco.appendChild(range);
        controles.appendChild(bloco);
      });

    redesenhar();
    REDESENHOS.push(redesenhar);
    window.addEventListener("resize", redesenhar);
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", redesenhar);
    }
  }

  function iniciar() { document.querySelectorAll(".varredura").forEach(montar); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  // O botão de tema troca as variáveis de cor no <html>; o canvas só as lê na
  // hora de desenhar, então sem redesenhar a curva fica na paleta anterior.
  new MutationObserver(redesenharTodos)
    .observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema", "class"] });

  window.Varredura = { iniciar: iniciar, estacionario: estacionario, redesenharTodos: redesenharTodos };
})();
