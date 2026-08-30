/* simulador.js — integrador de EDOs e plotagem, rodando no navegador.
 *
 * Existe para um propósito: o padrão "preveja e depois rode". O aluno
 * escreve a curva que espera, mexe em μmax, e vê na hora. É o loop de
 * feedback mais apertado que este domínio permite.
 *
 * Uso na lição:
 *
 *   <div class="simulador"
 *        data-modelo="batelada"
 *        data-tempo="24"
 *        data-params="mu_max=0.4, Ks=1.0, Yxs=0.5, Ypx=0.2, X0=0.1, S0=20"
 *        data-controles="mu_max, Ks"
 *        data-prever="1"></div>
 *
 *   data-modelo     nome do modelo registrado (batelada | quimiostato | inibicao_produto)
 *   data-tempo      horizonte de simulação, em h
 *   data-params     sobrescreve os padrões do modelo
 *   data-controles  quais parâmetros ganham controle deslizante.
 *                   Faixa opcional: "mu_max:0.05:1.2:0.01"
 *   data-prever     se presente, as curvas ficam ocultas até o aluno clicar
 *                   em "Revelar" — force a previsão antes do resultado
 *
 * Lições futuras registram modelos novos sem editar este arquivo:
 *
 *   Simulador.registrar("meu_modelo", { vars, padroes, faixas, unidades, deriv });
 */

(function () {
  "use strict";

  /* ---------- modelos ----------
     Todos são modelos não estruturados e não segregados, com volume
     constante. Os valores padrão são ILUSTRATIVOS: servem para dar uma
     curva com forma reconhecível, não representam nenhum organismo real.
     Toda lição que exibir um valor precisa dizer isso ou citar a fonte. */

  var MODELOS = {};

  function registrar(nome, def) {
    MODELOS[nome] = def;
  }

  function monod(mu_max, S, Ks) {
    return (mu_max * Math.max(S, 0)) / (Ks + Math.max(S, 0));
  }

  registrar("batelada", {
    rotulo: "Batelada com cinética de Monod",
    vars: ["X", "S", "P"],
    padroes: { mu_max: 0.4, Ks: 1.0, Yxs: 0.5, Ypx: 0.2, X0: 0.1, S0: 20, P0: 0 },
    faixas: {
      mu_max: [0.05, 1.2, 0.01], Ks: [0.05, 10, 0.05], Yxs: [0.1, 0.9, 0.01],
      Ypx: [0, 2, 0.05], X0: [0.01, 2, 0.01], S0: [1, 100, 1]
    },
    unidades: { mu_max: "1/h", Ks: "g/L", Yxs: "gX/gS", Ypx: "gP/gX", X0: "g/L", S0: "g/L", P0: "g/L" },
    inicial: function (p) { return [p.X0, p.S0, p.P0]; },
    deriv: function (t, y, p) {
      var X = y[0], S = y[1];
      var mu = monod(p.mu_max, S, p.Ks);
      var dX = mu * X;
      return [dX, -dX / p.Yxs, p.Ypx * dX];
    }
  });

  registrar("quimiostato", {
    rotulo: "Contínuo (quimiostato), volume constante",
    vars: ["X", "S", "P"],
    padroes: { mu_max: 0.4, Ks: 1.0, Yxs: 0.5, Ypx: 0.2, D: 0.2, Sin: 20, X0: 0.5, S0: 20, P0: 0 },
    faixas: {
      mu_max: [0.05, 1.2, 0.01], Ks: [0.05, 10, 0.05], Yxs: [0.1, 0.9, 0.01],
      Ypx: [0, 2, 0.05], D: [0, 1.0, 0.01], Sin: [1, 100, 1], X0: [0.01, 5, 0.01]
    },
    unidades: { mu_max: "1/h", Ks: "g/L", Yxs: "gX/gS", Ypx: "gP/gX", D: "1/h", Sin: "g/L", X0: "g/L", S0: "g/L", P0: "g/L" },
    inicial: function (p) { return [p.X0, p.S0, p.P0]; },
    deriv: function (t, y, p) {
      var X = y[0], S = y[1], P = y[2];
      var mu = monod(p.mu_max, S, p.Ks);
      return [
        (mu - p.D) * X,
        p.D * (p.Sin - S) - (mu * X) / p.Yxs,
        -p.D * P + p.Ypx * mu * X
      ];
    }
  });

  registrar("batelada_alimentada", {
    rotulo: "Batelada alimentada, volume variável",
    vars: ["X", "S", "P"],   // V é integrado, mas não vai ao gráfico: está em litros
    padroes: { mu_max: 0.4, Ks: 1.0, Yxs: 0.5, Ypx: 0.2, F: 0.1, Sin: 200, X0: 1, S0: 5, P0: 0, V0: 1 },
    faixas: {
      mu_max: [0.05, 1.2, 0.01], Ks: [0.05, 10, 0.05], Yxs: [0.1, 0.9, 0.01],
      Ypx: [0, 2, 0.05], F: [0, 0.5, 0.005], Sin: [50, 400, 10],
      X0: [0.1, 5, 0.1], S0: [0, 50, 1], V0: [0.5, 5, 0.1]
    },
    unidades: {
      mu_max: "1/h", Ks: "g/L", Yxs: "gX/gS", Ypx: "gP/gX", F: "L/h",
      Sin: "g/L", X0: "g/L", S0: "g/L", P0: "g/L", V0: "L"
    },
    inicial: function (p) { return [p.X0, p.S0, p.P0, p.V0]; },
    deriv: function (t, y, p) {
      var X = y[0], S = y[1], P = y[2], V = y[3];
      var mu = monod(p.mu_max, S, p.Ks);
      var D = p.F / V;   // diluição instantânea: o volume cresce e dilui tudo
      return [
        (mu - D) * X,
        D * (p.Sin - S) - (mu * X) / p.Yxs,
        p.Ypx * mu * X - D * P,
        p.F
      ];
    }
  });

  registrar("inibicao_produto", {
    rotulo: "Batelada com inibição por produto (forma linear)",
    vars: ["X", "S", "P"],
    padroes: { mu_max: 0.4, Ks: 1.0, Yxs: 0.1, Ypx: 4.0, Pmax: 90, X0: 0.5, S0: 150, P0: 0 },
    faixas: {
      mu_max: [0.05, 1.2, 0.01], Ks: [0.05, 10, 0.05], Yxs: [0.02, 0.5, 0.01],
      Ypx: [0.5, 8, 0.1], Pmax: [10, 150, 1], X0: [0.05, 5, 0.05], S0: [10, 250, 5]
    },
    unidades: { mu_max: "1/h", Ks: "g/L", Yxs: "gX/gS", Ypx: "gP/gX", Pmax: "g/L", X0: "g/L", S0: "g/L", P0: "g/L" },
    inicial: function (p) { return [p.X0, p.S0, p.P0]; },
    deriv: function (t, y, p) {
      var X = y[0], S = y[1], P = y[2];
      // Fator de inibição linear: μ vai a zero quando P alcança Pmax.
      var inib = Math.max(0, 1 - P / p.Pmax);
      var mu = monod(p.mu_max, S, p.Ks) * inib;
      var dX = mu * X;
      return [dX, -dX / p.Yxs, p.Ypx * dX];
    }
  });

  /* ---------- integração ----------
     Runge-Kutta clássico de 4ª ordem, passo fixo. Suficiente para os
     modelos daqui e simples o bastante para o aluno inspecionar.
     Note que solve_ivp usa passo adaptativo — a diferença entre os dois
     é, em si, matéria de lição. */

  function rk4passo(f, t, y, dt, p) {
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

  function simular(modelo, params, T, amostras) {
    amostras = amostras || 400;
    var passosPorAmostra = 5;
    var dt = T / (amostras * passosPorAmostra);

    var y = modelo.inicial(params);
    var t = 0;
    var saida = { t: [0], y: y.map(function (v) { return [v]; }) };

    for (var a = 0; a < amostras; a++) {
      for (var k = 0; k < passosPorAmostra; k++) {
        y = rk4passo(modelo.deriv, t, y, dt, params);
        t += dt;
      }
      // Concentração negativa é artefato numérico, não biologia.
      y = y.map(function (v) { return v < 0 ? 0 : v; });
      saida.t.push(t);
      y.forEach(function (v, i) { saida.y[i].push(v); });
    }
    return saida;
  }

  /* ---------- desenho ---------- */

  function cor(nome) {
    return getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || "#888";
  }

  var TRACOS = [[], [6, 4], [2, 3]]; // X sólido, S tracejado, P pontilhado

  function desenhar(canvas, dados, opts) {
    var css = { w: canvas.clientWidth || 600, h: 320 };
    var dpr = window.devicePixelRatio || 1;
    canvas.width = css.w * dpr;
    canvas.height = css.h * dpr;
    canvas.style.height = css.h + "px";

    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, css.w, css.h);

    var m = { esq: 52, dir: 12, topo: 12, base: 44 };
    var lw = css.w - m.esq - m.dir;
    var lh = css.h - m.topo - m.base;

    var tMax = dados.t[dados.t.length - 1];
    var yMax = 0;
    dados.y.forEach(function (serie) {
      serie.forEach(function (v) { if (v > yMax) yMax = v; });
    });
    yMax = yMax > 0 ? yMax * 1.08 : 1;

    var px = function (t) { return m.esq + (t / tMax) * lw; };
    var py = function (v) { return m.topo + lh - (v / yMax) * lh; };

    var corFg = cor("--fg");
    var corMuted = cor("--muted");
    var corRule = cor("--rule");

    // Eixos e marcas
    ctx.strokeStyle = corRule;
    ctx.lineWidth = 1;
    ctx.fillStyle = corMuted;
    ctx.font = "11px ui-monospace, monospace";

    ctx.beginPath();
    ctx.moveTo(m.esq, m.topo);
    ctx.lineTo(m.esq, m.topo + lh);
    ctx.lineTo(m.esq + lw, m.topo + lh);
    ctx.stroke();

    var i;
    for (i = 0; i <= 5; i++) {
      var vy = (yMax / 5) * i;
      var ypos = py(vy);
      ctx.beginPath();
      ctx.moveTo(m.esq - 4, ypos);
      ctx.lineTo(m.esq + lw, ypos);
      ctx.globalAlpha = i === 0 ? 1 : 0.35;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(vy.toFixed(yMax < 5 ? 1 : 0), m.esq - 7, ypos);
    }

    for (i = 0; i <= 6; i++) {
      var vt = (tMax / 6) * i;
      var xpos = px(vt);
      ctx.beginPath();
      ctx.moveTo(xpos, m.topo + lh);
      ctx.lineTo(xpos, m.topo + lh + 4);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(vt.toFixed(tMax < 10 ? 1 : 0), xpos, m.topo + lh + 7);
    }

    // Rótulos de eixo, com unidade. Gráfico é explicação, não decoração.
    ctx.fillStyle = corFg;
    ctx.font = "12px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("Tempo (h)", m.esq + lw / 2, css.h - 16);
    ctx.save();
    ctx.translate(13, m.topo + lh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Concentração (g/L)", 0, 0);
    ctx.restore();

    if (opts && opts.oculto) return;

    // Curvas
    var cores = [cor("--cor-x"), cor("--cor-s"), cor("--cor-p")];
    // Um modelo pode integrar estados que não vão ao gráfico — o volume da
    // batelada alimentada, por exemplo, que está em litros e esmagaria a
    // escala de g/L. opts.series diz quantas séries desenhar.
    var quantas = (opts && opts.series) || dados.y.length;
    dados.y.slice(0, quantas).forEach(function (serie, s) {
      ctx.beginPath();
      ctx.strokeStyle = cores[s] || corFg;
      ctx.lineWidth = 2;
      ctx.setLineDash(TRACOS[s] || []);
      serie.forEach(function (v, k) {
        var X = px(dados.t[k]), Y = py(v);
        if (k === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  /* ---------- leitura do resultado ----------
     Números que o aluno deve conferir contra a previsão dele. */

  function ler(modelo, dados, params, T) {
    // Um modelo pode ter sua propria leitura: X/S/P nem sempre e o que ele integra.
    if (modelo.ler) return modelo.ler(dados, params, T);
    var X = dados.y[0], S = dados.y[1], P = dados.y[2];
    var n = X.length - 1;
    var partes = [];

    partes.push("X final " + X[n].toFixed(2) + " g/L");
    partes.push("S final " + S[n].toFixed(2) + " g/L");
    partes.push("P final " + P[n].toFixed(2) + " g/L");

    if (modelo.padroes.D !== undefined) {
      if (X[n] < 1e-2) {
        partes.push("washout: D acima do crítico");
      } else {
        partes.push("produtividade " + (params.D * P[n]).toFixed(2) + " g·L⁻¹·h⁻¹");
      }
    } else {
      // Momento em que o substrato praticamente acaba.
      for (var i = 0; i <= n; i++) {
        if (S[i] < 0.01 * (params.S0 || 1)) {
          partes.push("S esgota em ~" + dados.t[i].toFixed(1) + " h");
          break;
        }
      }
      partes.push("produtividade " + (P[n] / T).toFixed(3) + " g·L⁻¹·h⁻¹");
    }
    return partes.join(" · ");
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

  function redesenharTodos() {
    REDESENHOS.forEach(function (f) { f(); });
  }

  function montar(el) {
    var nome = el.dataset.modelo || "batelada";
    var modelo = MODELOS[nome];
    if (!modelo) {
      console.error("[simulador] modelo desconhecido:", nome);
      return;
    }

    var T = parseFloat(el.dataset.tempo || "24");
    var params = Object.assign({}, modelo.padroes, parsePares(el.dataset.params));
    var oculto = el.hasAttribute("data-prever");

    var canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute(
      "aria-label",
      "Perfis de biomassa, substrato e produto ao longo do tempo — " + modelo.rotulo
    );
    el.appendChild(canvas);

    var legenda = document.createElement("div");
    legenda.className = "sim-legenda";
    // A legenda vem dos vars do modelo: fixá-la em X/S/P mentiria em qualquer
    // modelo que plote outra coisa.
    var NOMES = { X: "Biomassa X", S: "Substrato S", P: "Produto P", V: "Volume V" };
    legenda.innerHTML = (modelo.vars || ["X", "S", "P"])
      .map(function (v) {
        return '<span class="l-' + v.toLowerCase() + '">' + (NOMES[v] || v) + '</span>';
      })
      .join("");
    el.appendChild(legenda);

    var leitura = document.createElement("p");
    leitura.className = "sim-leitura";
    el.appendChild(leitura);

    var controles = document.createElement("div");
    controles.className = "sim-controles";
    el.appendChild(controles);

    function redesenhar() {
      var dados = simular(modelo, params, T);
      desenhar(canvas, dados, { oculto: oculto, series: (modelo.vars || []).length });
      leitura.textContent = oculto ? "Escreva sua previsão antes de revelar." : ler(modelo, dados, params, T);
      leitura.classList.toggle("sim-oculto", false);
    }

    // Controles deslizantes
    var pedidos = (el.dataset.controles || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    pedidos.forEach(function (spec) {
      var partes = spec.split(":");
      var chave = partes[0];
      var faixa = modelo.faixas[chave] || [0, 1, 0.01];
      var min = partes.length > 1 ? parseFloat(partes[1]) : faixa[0];
      var max = partes.length > 2 ? parseFloat(partes[2]) : faixa[1];
      var passo = partes.length > 3 ? parseFloat(partes[3]) : faixa[2];

      var bloco = document.createElement("div");
      bloco.className = "sim-controle";

      var label = document.createElement("label");
      var nomeSpan = document.createElement("span");
      nomeSpan.textContent = chave;
      var valorSpan = document.createElement("span");
      valorSpan.className = "valor";
      var un = modelo.unidades[chave] || "";
      function mostrar() { valorSpan.textContent = params[chave] + " " + un; }
      mostrar();
      label.appendChild(nomeSpan);
      label.appendChild(valorSpan);

      var range = document.createElement("input");
      range.type = "range";
      range.min = min; range.max = max; range.step = passo;
      range.value = params[chave];
      range.setAttribute("aria-label", chave + " em " + un);
      range.addEventListener("input", function () {
        params[chave] = parseFloat(range.value);
        mostrar();
        redesenhar();
      });

      bloco.appendChild(label);
      bloco.appendChild(range);
      controles.appendChild(bloco);
    });

    // Ação de revelar, no modo "preveja e depois rode"
    if (oculto) {
      var acoes = document.createElement("div");
      acoes.className = "sim-acoes";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Revelar as curvas";
      btn.addEventListener("click", function () {
        oculto = false;
        btn.remove();
        redesenhar();
      });
      acoes.appendChild(btn);
      el.appendChild(acoes);
    }

    redesenhar();

    // Guardado para o botão de tema poder repintar sem remontar o widget:
    // remontar recriaria os controles e perderia o estado da previsão.
    REDESENHOS.push(redesenhar);

    // O gráfico acompanha a largura da coluna e o tema do sistema.
    window.addEventListener("resize", redesenhar);
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", redesenhar);
    }
  }

  function iniciar() {
    document.querySelectorAll(".simulador").forEach(montar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  window.Simulador = {
    iniciar: iniciar,
    registrar: registrar,
    simular: simular,
    desenhar: desenhar,          // exposto para o explorador de variantes reusar o traçado
    redesenharTodos: redesenharTodos,   // usado pelo botão de tema
    modelos: MODELOS
  };
})();
