/* mu.js — a taxa específica de crescimento μ contra o tempo.
 *
 * O simulador.js desenha as variáveis de estado (X, S, P) contra t, todas em
 * g/L. μ está em 1/h e não cabe naquele eixo, então esta figura é um segundo
 * canvas, do tamanho cheio. Escrito a partir de templates/componente.js.
 */

(function () {
  "use strict";

  /* 1. IDENTIDADE ---------------------------------------------------------- */

  var NOME = "GraficoMu";
  var SELETOR = ".grafico-mu";

  var EIXO_X = "tempo (h)";
  var EIXO_Y = "μ (1/h)";

  /* 2. O CÁLCULO -----------------------------------------------------------
     Uma única integração RK4 do mesmo sistema da lição, de 0 até o horizonte,
     guardando μ(t) e a fração de Monod em cada passo. Passo fixo de 0,01 h:
     o sistema é suave e essa integração inteira custa menos que um redesenho,
     então dá para arrastar o slider e ver a curva responder na hora. */

  function calcular(p, varre) {
    var dt = 0.01;
    var X = p.X0, S = p.S0, P = 0;
    var x = [], mus = [], monod = [];
    var n = Math.round((varre.max - varre.min) / dt);

    function taxa(S, P) {
      var Sp = Math.max(S, 0);
      return p.mu_max * (Sp / (p.Ks + Sp)) * Math.max(1 - P / p.Pmax, 0);
    }
    function deriv(y) {
      var mu = taxa(y[1], y[2]);
      var dX = mu * y[0];
      return [dX, -dX / p.Yxs, p.Ypx * dX];
    }

    for (var i = 0; i <= n; i++) {
      var t = varre.min + i * dt;
      x.push(t);
      mus.push(taxa(S, P));
      monod.push(p.mu_max * Math.max(S, 0) / (p.Ks + Math.max(S, 0)));

      var y = [X, S, P], k1 = deriv(y);
      var y2 = [y[0] + dt / 2 * k1[0], y[1] + dt / 2 * k1[1], y[2] + dt / 2 * k1[2]];
      var k2 = deriv(y2);
      var y3 = [y[0] + dt / 2 * k2[0], y[1] + dt / 2 * k2[1], y[2] + dt / 2 * k2[2]];
      var k3 = deriv(y3);
      var y4 = [y[0] + dt * k3[0], y[1] + dt * k3[1], y[2] + dt * k3[2]];
      var k4 = deriv(y4);
      X += dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
      S += dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      P += dt / 6 * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);
    }
    return { x: x, series: [mus, monod] };
  }

  /* 3. A LEITURA -----------------------------------------------------------
     μ inicial, e o instante em que ela cai a 1% do valor inicial — que é o
     ponto a partir do qual a dorna já não faz mais nada de útil. */

  function ler(dados) {
    var mu0 = dados.series[0][0], alvo = mu0 * 0.01, quando = null;
    for (var i = 0; i < dados.series[0].length; i++) {
      if (dados.series[0][i] <= alvo) { quando = dados.x[i]; break; }
    }
    return "μ inicial " + mu0.toFixed(3) + " 1/h · cai a 1% disso " +
      (quando === null ? "depois do fim da simulação" : "em " + quando.toFixed(1) + " h");
  }

  /* ======================================================================
     Daqui para baixo são as convenções da skill. Só mexa se precisar.
     ====================================================================== */

  /* Cores SEMPRE do CSS, nunca fixas no JS: é o que faz o gráfico acompanhar o
     tema. Disponíveis: --cor-x, --cor-s, --cor-p, --fg, --muted, --rule, --accent. */
  function cor(nome) {
    return getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || "#888";
  }

  var TRACOS = [[], [6, 4], [2, 3]];   // 1ª sólida, 2ª tracejada, 3ª pontilhada

  function pares(txt) {
    var p = {};
    if (!txt) return p;
    txt.split(",").forEach(function (par) {
      var kv = par.split("=");
      if (kv.length === 2) p[kv[0].trim()] = parseFloat(kv[1].trim().replace(",", "."));
    });
    return p;
  }

  /* "D:0:0.5:0.002" → { chave, min, max, passo }.
     A faixa é configuração, não afirmação — mas TEM de conter o valor que a sua
     observação manda o aluno procurar, e o passo tem de cair exatamente nele.
     Slider de 150 a 320 com passo 5 não alcança 222: para em 220 e em 225. */
  function faixa(spec, padrao) {
    var q = spec.split(":");
    return {
      chave: q[0].trim(),
      min: q.length > 1 ? parseFloat(q[1]) : padrao[0],
      max: q.length > 2 ? parseFloat(q[2]) : padrao[1],
      passo: q.length > 3 ? parseFloat(q[3]) : padrao[2]
    };
  }

  function desenhar(canvas, dados) {
    /* Canvas com DPR, sempre — sem isto a curva sai borrada em tela de alta
       densidade. Altura entre 320 e 420 px, e UM painel por canvas: dois
       painéis empilhados num canvas só dão dois gráficos ruins. */
    /* clientWidth de um canvas sem CSS devolve 300, a largura intrínseca — truthy,
       e por isso um "|| 600" nunca dispara. Quem sabe a largura é o container. */
    var pai = canvas.parentElement;
    var w = canvas.clientWidth || (pai && pai.clientWidth) || 600;
    var h = 340;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = h + "px";

    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var m = { esq: 56, dir: 12, topo: 12, base: 44 };
    var lw = w - m.esq - m.dir;
    var lh = h - m.topo - m.base;

    var xMin = dados.x[0], xMax = dados.x[dados.x.length - 1];
    var yMax = 0;
    dados.series.forEach(function (s) {
      s.forEach(function (v) { if (isFinite(v) && v > yMax) yMax = v; });
    });
    yMax = yMax > 0 ? yMax * 1.08 : 1;

    var px = function (v) { return m.esq + ((v - xMin) / (xMax - xMin)) * lw; };
    var py = function (v) { return m.topo + lh - (v / yMax) * lh; };

    ctx.strokeStyle = cor("--rule");
    ctx.lineWidth = 1;
    ctx.fillStyle = cor("--muted");
    ctx.font = "11px ui-monospace, monospace";

    ctx.beginPath();
    ctx.moveTo(m.esq, m.topo);
    ctx.lineTo(m.esq, m.topo + lh);
    ctx.lineTo(m.esq + lw, m.topo + lh);
    ctx.stroke();

    var i;
    for (i = 0; i <= 5; i++) {
      var vy = (yMax / 5) * i, yp = py(vy);
      ctx.beginPath();
      ctx.moveTo(m.esq - 4, yp);
      ctx.lineTo(m.esq + lw, yp);
      ctx.globalAlpha = i === 0 ? 1 : 0.35;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(vy.toFixed(yMax < 5 ? 2 : 0), m.esq - 7, yp);
    }
    for (i = 0; i <= 6; i++) {
      var vx = xMin + ((xMax - xMin) / 6) * i, xp = px(vx);
      ctx.beginPath();
      ctx.moveTo(xp, m.topo + lh);
      ctx.lineTo(xp, m.topo + lh + 4);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(vx.toFixed(xMax < 10 ? 1 : 0), xp, m.topo + lh + 7);
    }

    ctx.fillStyle = cor("--fg");
    ctx.font = "12px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText(EIXO_X, m.esq + lw / 2, h - 16);
    ctx.save();
    ctx.translate(15, m.topo + lh / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(EIXO_Y, 0, 0);
    ctx.restore();

    var cores = [cor("--cor-x"), cor("--cor-s"), cor("--cor-p")];
    dados.series.forEach(function (serie, s) {
      ctx.beginPath();
      ctx.strokeStyle = cores[s] || cor("--fg");
      ctx.lineWidth = 2;
      ctx.setLineDash(TRACOS[s] || []);
      var comecou = false;
      serie.forEach(function (v, k) {
        if (!isFinite(v)) return;
        var A = px(dados.x[k]), B = py(v);
        if (!comecou) { ctx.moveTo(A, B); comecou = true; } else { ctx.lineTo(A, B); }
      });
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  var REDESENHOS = [];
  function redesenharTodos() { REDESENHOS.forEach(function (f) { f(); }); }

  function montar(el) {
    el.classList.add("sim-moldura");   // mesma moldura do .simulador: larguras iguais
    var p = pares(el.dataset.params);
    var varre = faixa(el.dataset.varre || "x:0:1:0.01", [0, 1, 0.01]);

    var canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", EIXO_Y + " contra " + EIXO_X);
    el.appendChild(canvas);

    /* Legenda com os nomes do EXERCÍCIO, não genéricos. Se a legenda diz
       "etanol", a prosa diz "etanol" — cada troca de nome faz o aluno montar
       a ponte de cabeça, e ele lê mais devagar por causa disso. */
    var legenda = document.createElement("div");
    legenda.className = "sim-legenda";
    var CLASSES = ["l-x", "l-s", "l-p"];
    legenda.innerHTML = (el.dataset.rotulos || "Série 1, Série 2").split(",")
      .map(function (r, i) {
        return '<span class="' + CLASSES[i] + '">' + r.trim() + "</span>";
      }).join("");
    el.appendChild(legenda);

    var leitura = document.createElement("p");
    leitura.className = "sim-leitura";
    el.appendChild(leitura);

    var controles = document.createElement("div");
    controles.className = "sim-controles";
    el.appendChild(controles);

    function redesenhar() {
      var dados = calcular(p, varre);
      desenhar(canvas, dados);
      leitura.textContent = ler(dados);
    }

    /* No máximo quatro controles, e cada um precisa de uma observação no texto
       mandando mexer nele. Controle que nenhuma frase convoca é ruído. */
    (el.dataset.controles || "").split(",")
      .map(function (s) { return s.trim(); })
      .filter(Boolean)
      .forEach(function (spec) {
        var f = faixa(spec, [0, 1, 0.01]);
        var bloco = document.createElement("div");
        bloco.className = "sim-controle";

        var label = document.createElement("label");
        var nome = document.createElement("span");
        nome.textContent = f.chave;
        var valor = document.createElement("span");
        valor.className = "valor";
        function mostrar() { valor.textContent = String(p[f.chave]); }
        mostrar();
        label.appendChild(nome);
        label.appendChild(valor);

        var range = document.createElement("input");
        range.type = "range";
        range.min = f.min; range.max = f.max; range.step = f.passo;
        range.value = p[f.chave];
        range.setAttribute("aria-label", f.chave);
        range.addEventListener("input", function () {
          p[f.chave] = parseFloat(range.value);
          mostrar();
          redesenhar();
        });

        bloco.appendChild(label);
        bloco.appendChild(range);
        controles.appendChild(bloco);
      });

    redesenhar();
    REDESENHOS.push(redesenhar);
  }

  function iniciar() {
    document.querySelectorAll(SELETOR).forEach(montar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  /* OS TRÊS EVENTOS DE REDESENHO. As cores são lidas do CSS na hora de
     desenhar, então trocar de tema sem redesenhar deixa a curva com a paleta
     anterior. E o gráfico acompanha a largura da coluna. */
  window.addEventListener("resize", redesenharTodos);
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) mq.addEventListener("change", redesenharTodos);
  }
  document.addEventListener("tema-mudou", redesenharTodos);

  window[NOME] = { iniciar: iniciar, redesenharTodos: redesenharTodos };
})();
