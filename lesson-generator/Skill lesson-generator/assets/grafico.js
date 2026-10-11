/* grafico.js — a figura da lição: linhas e pontos em eixos cartesianos, com
 * controles deslizantes que recalculam na hora.
 *
 * Não sabe nada do exercício nem de engenharia química. A lição registra O QUE
 * calcular — as mesmas contas do programa Python, traduzidas para JS — e este
 * arquivo cuida do resto: eixos, escala, legenda, controles, tema, leitura sob o
 * cursor. Curso temporal, varredura de parâmetro, perfil ao longo de um reator,
 * curva de equilíbrio, dados contra modelo: tudo é x contra y.
 *
 * Uso na lição:
 *
 *   <div class="grafico" data-grafico="perfil" data-controles="k, T0:300:400:5"></div>
 *
 *   Grafico.registrar("perfil", {
 *     eixoX:  "Tempo (h)",                 rótulo com unidade, sempre
 *     eixoY:  "Concentração (mol/L)",
 *     eixoY2: "Temperatura (K)",           opcional: só se alguma série usar o eixo 2
 *     series: [                            os nomes da legenda são os nomes do texto
 *       "Reagente A",
 *       { nome: "Temperatura", eixo: 2 },
 *       { nome: "Medidas", tipo: "pontos" }
 *     ],
 *     padroes:  { k: 0.3, T0: 350 },       todo parâmetro que calcular() lê
 *     faixas:   { k: [0.05, 1, 0.01] },    [min, max, passo] de quem pode virar controle
 *     unidades: { k: "1/h", T0: "K" },
 *     nomes:    { T0: "T de entrada" },  opcional: como o controle aparece (padrão: a chave)
 *     limites:  { y: [0, 2] },             opcional: fixa x, y ou y2 em vez da escala automática
 *     calcular: function (p) { ... },      devolve as séries — formatos abaixo
 *     ler:      function (s, p) { ... }    opcional: a linha de números embaixo do gráfico
 *   });
 *
 * calcular(p) devolve, na ordem de `series`, um de dois formatos:
 *   { x: [...], y: [[...], [...]] }          todas as séries no mesmo x
 *   [ { x: [...], y: [...] }, ... ]          cada série com o seu próprio x
 * ler(s, p) recebe sempre o segundo formato.
 *
 * CONTROLES. data-controles lista nomes de parâmetros, no máximo quatro. A faixa
 * vem de "nome:min:max:passo" na tag; sem isso, de faixas[nome]; sem nenhuma das
 * duas, o controle não é criado e o console diz por quê. O valor inicial é
 * padroes[nome], ou o de data-params="nome=valor, ..." se a tag trouxer.
 *
 * NADA É CORTADO. Concentração negativa, fração acima de 1: se a física não deixa,
 * quem impede é a sua conta, como no Python. Este arquivo desenha o que receber.
 *
 * Ferramentas numéricas, para calcular() não reinventar:
 *   Grafico.integrar(deriv, y0, t0, tf, p, n)  RK4 de passo fixo, n passos (padrão 2000)
 *                                              → { t: [...], y: [[...], ...] }, uma lista por estado
 *   Grafico.linspace(a, b, n)
 *   Grafico.raiz(f, a, b)                      bisseção; NaN se f não troca de sinal em [a, b]
 *   Grafico.fmt(v, casas)                      número com o separador decimal do idioma
 *
 * AVISOS NO CONSOLE — o autor da lição não enxerga a figura, então ela avisa:
 *   série achatada (varia menos de 8% da altura do eixo que divide com outras)
 *   valor não finito; controle sem faixa; faixa que não contém o valor inicial
 *
 * Componente novo só para o que não é x contra y (um diagrama, um mapa de cores).
 * Se escrever um, siga as convenções daqui: cores do CSS, canvas com DPR, e
 * redesenhar em "resize" e em "tema-mudou".
 */

(function () {
  "use strict";

  // Os textos que o aluno vê, no idioma da lição (<html lang>): português
  // quando lang começa com "pt"; inglês em qualquer outro caso.
  var PT = /^pt/i.test(document.documentElement.lang);
  var TXT = PT
    ? { contra: " contra ", direita: "(eixo à direita)", em: " em " }
    : { contra: " versus ", direita: "(right axis)", em: " in " };

  var DEFS = {};
  var REDESENHOS = [];

  function registrar(nome, def) {
    DEFS[nome] = def;
    // Script com defer roda com readyState já "interactive": iniciar() pode ter
    // passado antes de a lição registrar. Re-varrer resolve a ordem das tags.
    if (document.body) iniciar();
  }

  /* ---------- ferramentas numéricas ---------- */

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

  function integrar(deriv, y0, t0, tf, p, n) {
    n = n || 2000;
    var h = (tf - t0) / n;
    var y = y0.slice();
    var saida = { t: [t0], y: y.map(function (v) { return [v]; }) };
    for (var k = 1; k <= n; k++) {
      y = rk4(deriv, t0 + (k - 1) * h, y, h, p);
      saida.t.push(t0 + k * h);
      y.forEach(function (v, i) { saida.y[i].push(v); });
    }
    return saida;
  }

  function raiz(f, a, b) {
    var fa = f(a), fb = f(b);
    if (!(isFinite(fa) && isFinite(fb)) || fa * fb > 0) return NaN;
    for (var i = 0; i < 200; i++) {
      var m = (a + b) / 2, fm = f(m);
      if (fm === 0 || (b - a) / 2 < 1e-12 * Math.max(1, Math.abs(m))) return m;
      if (fa * fm < 0) { b = m; } else { a = m; fa = fm; }
    }
    return (a + b) / 2;
  }

  function fmt(v, casas) {
    if (!isFinite(v)) return "—";
    var s = v.toFixed(casas == null ? 2 : casas);
    return PT ? s.replace(".", ",") : s;
  }

  /* ---------- escala ---------- */

  function passoBonito(amplitude) {
    var bruto = amplitude / 5;
    var mag = Math.pow(10, Math.floor(Math.log10(bruto)));
    var r = bruto / mag;
    return (r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10) * mag;
  }

  function casasDe(passo) {
    return Math.max(0, -Math.floor(Math.log10(passo) + 1e-9));
  }

  // Eixo y: arredonda para fora, e encosta no zero quando os dados são
  // positivos e perto dele — uma concentração que começa em 0,4 lê melhor
  // num eixo que começa em 0.
  function escalaY(min, max, fixo) {
    if (fixo) return { min: fixo[0], max: fixo[1], passo: passoBonito(fixo[1] - fixo[0]) };
    if (!(isFinite(min) && isFinite(max))) { min = 0; max = 1; }
    if (min >= 0 && min < 0.3 * max) min = 0;
    if (max === min) max = min + (Math.abs(min) || 1);
    var passo = passoBonito(max - min);
    return { min: Math.floor(min / passo + 1e-9) * passo, max: Math.ceil(max / passo - 1e-9) * passo, passo: passo };
  }

  // Eixo x: exatamente a faixa dos dados — 72 h não vira 80 h de eixo vazio.
  function escalaX(min, max, fixo) {
    if (fixo) { min = fixo[0]; max = fixo[1]; }
    if (!(isFinite(min) && isFinite(max))) { min = 0; max = 1; }
    if (max === min) max = min + 1;
    return { min: min, max: max, passo: passoBonito(max - min) };
  }

  /* ---------- dados ---------- */

  function normalizar(bruto, n) {
    if (Array.isArray(bruto)) return bruto;
    return (bruto.y || []).slice(0, n).map(function (y) { return { x: bruto.x, y: y }; });
  }

  function specSerie(s) {
    return typeof s === "string" ? { nome: s, eixo: 1, tipo: "linha" }
      : { nome: s.nome, eixo: s.eixo || 1, tipo: s.tipo || "linha" };
  }

  /* ---------- desenho ---------- */

  function cor(nome) {
    return getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || "#888";
  }

  var TRACOS = [[], [7, 4], [2, 3], [9, 3, 2, 3]];

  function desenhar(estado) {
    var canvas = estado.canvas, def = estado.def, series = estado.series, specs = estado.specs;
    var pai = canvas.parentElement;
    // Canvas sem largura em CSS mede 300 px, que é truthy: quem sabe a largura é o container.
    var w = canvas.clientWidth || (pai && pai.clientWidth) || 600;
    var h = estado.altura;
    var dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = h + "px";

    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var temY2 = specs.some(function (s) { return s.eixo === 2; });
    var m = { esq: 60, dir: temY2 ? 60 : 14, topo: 12, base: 46 };
    var lw = w - m.esq - m.dir, lh = h - m.topo - m.base;

    var xs = { min: Infinity, max: -Infinity };
    var ys = [null, { min: Infinity, max: -Infinity }, { min: Infinity, max: -Infinity }];
    series.forEach(function (s, i) {
      var e = ys[specs[i].eixo];
      s.x.forEach(function (x, k) {
        var y = s.y[k];
        if (!isFinite(x) || !isFinite(y)) return;
        if (x < xs.min) xs.min = x; if (x > xs.max) xs.max = x;
        if (y < e.min) e.min = y; if (y > e.max) e.max = y;
      });
    });

    var lim = def.limites || {};
    var ex = escalaX(xs.min, xs.max, lim.x);
    var ey = [null, escalaY(ys[1].min, ys[1].max, lim.y), temY2 ? escalaY(ys[2].min, ys[2].max, lim.y2) : null];
    estado.escalas = { x: ex, y: ey, m: m, lw: lw, lh: lh };

    function px(x) { return m.esq + ((x - ex.min) / (ex.max - ex.min)) * lw; }
    function py(y, e) { var s = ey[e]; return m.topo + lh - ((y - s.min) / (s.max - s.min)) * lh; }
    estado.px = px; estado.py = py;

    var corRule = cor("--rule"), corMuted = cor("--muted"), corFg = cor("--fg");
    ctx.lineWidth = 1;
    ctx.font = "13px " + cor("--serif");

    // Grade e marcas do eixo y principal
    var cy = casasDe(ey[1].passo), v;
    for (v = ey[1].min; v <= ey[1].max + ey[1].passo / 2; v += ey[1].passo) {
      var yp = py(v, 1);
      ctx.strokeStyle = corRule;
      ctx.globalAlpha = Math.abs(v - ey[1].min) < 1e-12 ? 1 : 0.35;
      ctx.beginPath(); ctx.moveTo(m.esq - 4, yp); ctx.lineTo(m.esq + lw, yp); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = corMuted; ctx.textAlign = "right"; ctx.textBaseline = "middle";
      ctx.fillText(fmt(v, cy), m.esq - 7, yp);
    }
    // Marcas do eixo y secundário, sem grade própria
    if (temY2) {
      var c2 = casasDe(ey[2].passo);
      for (v = ey[2].min; v <= ey[2].max + ey[2].passo / 2; v += ey[2].passo) {
        var y2p = py(v, 2);
        ctx.strokeStyle = corRule;
        ctx.beginPath(); ctx.moveTo(m.esq + lw, y2p); ctx.lineTo(m.esq + lw + 4, y2p); ctx.stroke();
        ctx.fillStyle = corMuted; ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText(fmt(v, c2), m.esq + lw + 7, y2p);
      }
    }
    // Marcas do eixo x, nos múltiplos do passo que caem dentro da faixa
    var cx = casasDe(ex.passo);
    for (v = Math.ceil(ex.min / ex.passo - 1e-9) * ex.passo; v <= ex.max + 1e-9 * Math.abs(ex.max || 1); v += ex.passo) {
      var xp = px(v);
      ctx.strokeStyle = corRule;
      ctx.beginPath(); ctx.moveTo(xp, m.topo + lh); ctx.lineTo(xp, m.topo + lh + 4); ctx.stroke();
      ctx.fillStyle = corMuted; ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText(fmt(v, cx), xp, m.topo + lh + 7);
    }

    // Linhas dos eixos
    ctx.strokeStyle = corRule;
    ctx.beginPath();
    ctx.moveTo(m.esq, m.topo); ctx.lineTo(m.esq, m.topo + lh); ctx.lineTo(m.esq + lw, m.topo + lh);
    if (temY2) ctx.lineTo(m.esq + lw, m.topo);
    ctx.stroke();

    // Rótulos dos eixos
    ctx.fillStyle = corFg;
    ctx.font = "14px " + cor("--serif");
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
    ctx.fillText(def.eixoX || "x", m.esq + lw / 2, h - 10);
    ctx.save(); ctx.translate(14, m.topo + lh / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText(def.eixoY || "y", 0, 0); ctx.restore();
    if (temY2) {
      ctx.save(); ctx.translate(w - 8, m.topo + lh / 2); ctx.rotate(Math.PI / 2);
      ctx.fillText(def.eixoY2 || "y₂", 0, 0); ctx.restore();
    }

    // Séries, recortadas na área do gráfico (limites fixos podem cortar a curva),
    // com folga para o ponto na borda não sair cortado ao meio.
    ctx.save();
    ctx.beginPath(); ctx.rect(m.esq - 5, m.topo - 5, lw + 10, lh + 10); ctx.clip();
    series.forEach(function (s, i) {
      var sp = specs[i], c = cor("--serie-" + (i + 1)) || corFg;
      ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 2;
      if (sp.tipo === "pontos") {
        s.x.forEach(function (x, k) {
          if (!isFinite(x) || !isFinite(s.y[k])) return;
          ctx.beginPath(); ctx.arc(px(x), py(s.y[k], sp.eixo), 3.5, 0, 2 * Math.PI); ctx.fill();
        });
        return;
      }
      ctx.setLineDash(TRACOS[i] || []);
      ctx.beginPath();
      var aberto = false;
      s.x.forEach(function (x, k) {
        var y = s.y[k];
        if (!isFinite(x) || !isFinite(y)) { aberto = false; return; }
        if (!aberto) { ctx.moveTo(px(x), py(y, sp.eixo)); aberto = true; }
        else ctx.lineTo(px(x), py(y, sp.eixo));
      });
      ctx.stroke(); ctx.setLineDash([]);
    });
    ctx.restore();

    if (estado.cursor != null) desenharCursor(ctx, estado);
  }

  // A leitura sob o cursor: o valor de cada série no x apontado. Ler o número
  // na curva é o que o aluno faz com o gráfico; sem isto, ele estima de olho.
  function desenharCursor(ctx, estado) {
    var e = estado.escalas, m = e.m;
    var x = e.x.min + ((estado.cursor - m.esq) / e.lw) * (e.x.max - e.x.min);
    if (x < e.x.min || x > e.x.max) return;
    var linhas = [estado.def.eixoX.replace(/\s*\(.*\)$/, "") + " = " + fmt(x, casasDe(e.x.passo) + 1)];
    estado.series.forEach(function (s, i) {
      var sp = estado.specs[i];
      if (sp.tipo === "pontos") return;
      var y = interpolar(s, x);
      if (!isFinite(y)) return;
      linhas.push(sp.nome + ": " + fmt(y, casasDe(e.y[sp.eixo].passo) + 1));
      ctx.fillStyle = cor("--serie-" + (i + 1));
      ctx.beginPath(); ctx.arc(estado.px(x), estado.py(y, sp.eixo), 4, 0, 2 * Math.PI); ctx.fill();
    });

    var xp = estado.px(x);
    ctx.strokeStyle = cor("--muted"); ctx.setLineDash([3, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(xp, m.topo); ctx.lineTo(xp, m.topo + e.lh); ctx.stroke(); ctx.setLineDash([]);

    ctx.font = "13px " + cor("--serif");
    var largura = Math.max.apply(null, linhas.map(function (l) { return ctx.measureText(l).width; })) + 16;
    var altura = linhas.length * 15 + 10;
    var bx = xp + 10 + largura > m.esq + e.lw ? xp - 10 - largura : xp + 10;
    ctx.fillStyle = cor("--bg"); ctx.strokeStyle = cor("--rule");
    ctx.fillRect(bx, m.topo + 6, largura, altura); ctx.strokeRect(bx, m.topo + 6, largura, altura);
    ctx.fillStyle = cor("--fg"); ctx.textAlign = "left"; ctx.textBaseline = "top";
    linhas.forEach(function (l, k) { ctx.fillText(l, bx + 8, m.topo + 11 + k * 15); });
  }

  function interpolar(s, x) {
    for (var k = 1; k < s.x.length; k++) {
      var a = s.x[k - 1], b = s.x[k];
      if ((a <= x && x <= b) || (b <= x && x <= a)) {
        if (a === b) return s.y[k];
        return s.y[k - 1] + ((x - a) / (b - a)) * (s.y[k] - s.y[k - 1]);
      }
    }
    return NaN;
  }

  /* ---------- avisos ---------- */

  function conferir(estado) {
    var nome = estado.nome, avisados = estado.avisados;
    var porEixo = {};
    estado.series.forEach(function (s, i) {
      var sp = estado.specs[i];
      (porEixo[sp.eixo] = porEixo[sp.eixo] || []).push(i);
      var ruins = s.y.filter(function (v) { return !isFinite(v); }).length;
      if (ruins && !avisados["nan" + i]) {
        avisados["nan" + i] = 1;
        console.warn("[grafico] " + nome + ': a série "' + sp.nome + '" tem ' + ruins + " valores não finitos — a curva sai com buracos.");
      }
    });
    Object.keys(porEixo).forEach(function (e) {
      if (porEixo[e].length < 2) return;
      var esc = estado.escalas.y[e], alt = esc.max - esc.min;
      porEixo[e].forEach(function (i) {
        var ys = estado.series[i].y.filter(isFinite);
        if (!ys.length || estado.specs[i].tipo === "pontos") return;
        var amp = Math.max.apply(null, ys) - Math.min.apply(null, ys);
        if (amp > 0 && amp < 0.08 * alt && !avisados["chata" + i]) {
          avisados["chata" + i] = 1;
          console.warn("[grafico] " + nome + ': a série "' + estado.specs[i].nome + '" varia só ' +
            Math.round((100 * amp) / alt) + "% da altura do eixo " + e + " — no gráfico ela é uma reta rente. " +
            "Ponha-a no eixo 2 ({ nome, eixo: 2 }) ou numa figura própria.");
        }
      });
    });
  }

  /* ---------- montagem ---------- */

  function pares(txt) {
    var p = {};
    (txt || "").split(",").forEach(function (par) {
      var kv = par.split("=");
      if (kv.length === 2) p[kv[0].trim()] = parseFloat(kv[1].trim());
    });
    return p;
  }

  function montar(el, nome) {
    var def = DEFS[nome];
    el.classList.add("moldura");
    var params = Object.assign({}, def.padroes || {}, pares(el.dataset.params));
    var specs = (def.series || []).map(specSerie);
    var altura = Math.min(420, Math.max(320, parseFloat(el.dataset.altura) || 340));

    var canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", (def.eixoY || "y") + TXT.contra + (def.eixoX || "x"));
    el.appendChild(canvas);

    var legenda = document.createElement("div");
    legenda.className = "legenda";
    legenda.innerHTML = specs.map(function (s, i) {
      return '<span class="l-' + (i + 1) + (s.tipo === "pontos" ? " l-pontos" : "") + '">' +
        s.nome + (s.eixo === 2 ? " <small>" + TXT.direita + "</small>" : "") + "</span>";
    }).join("");
    el.appendChild(legenda);

    var leitura = document.createElement("p");
    leitura.className = "leitura";
    el.appendChild(leitura);

    var controles = document.createElement("div");
    controles.className = "controles";
    el.appendChild(controles);

    var estado = { nome: nome, def: def, canvas: canvas, specs: specs, altura: altura, cursor: null, avisados: {} };

    function recalcular() {
      estado.series = normalizar(def.calcular(params), specs.length);
      if (estado.series.length !== specs.length) {
        console.error("[grafico] " + nome + ": calcular() devolveu " + estado.series.length +
          " séries, e `series` declara " + specs.length + ".");
      }
      estado.series = estado.series.slice(0, specs.length);
      desenhar(estado);
      conferir(estado);
      leitura.textContent = typeof def.ler === "function" ? def.ler(estado.series, params) : "";
    }
    function redesenhar() { if (estado.series) desenhar(estado); }

    var pedidos = (el.dataset.controles || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    if (pedidos.length > 4) console.warn("[grafico] " + nome + ": " + pedidos.length + " controles — o limite é quatro.");
    pedidos.forEach(function (spec) {
      var q = spec.split(":"), chave = q[0].trim();
      var f = q.length === 4 ? q.slice(1).map(parseFloat) : (def.faixas || {})[chave];
      if (!f) {
        console.error("[grafico] " + nome + ': o controle "' + chave + '" não tem faixa — declare em faixas ou como "' + chave + ':min:max:passo".');
        return;
      }
      if (!(chave in params)) {
        console.error("[grafico] " + nome + ': o controle "' + chave + '" não está em padroes, e calcular() nunca o lê.');
        return;
      }
      if (params[chave] < f[0] || params[chave] > f[1]) {
        console.warn("[grafico] " + nome + ": " + chave + " = " + params[chave] + " fica fora da faixa [" + f[0] + ", " + f[1] + "].");
      }
      var un = (def.unidades || {})[chave] || "";
      var casas = casasDe(f[2]);

      var bloco = document.createElement("div");
      bloco.className = "controle";
      var label = document.createElement("label");
      var nomeSpan = document.createElement("span");
      var rotulo = (def.nomes || {})[chave] || chave;
      nomeSpan.textContent = rotulo;
      var valor = document.createElement("span");
      valor.className = "valor";
      function mostrar() { valor.textContent = fmt(params[chave], casas) + (un ? " " + un : ""); }
      mostrar();
      label.appendChild(nomeSpan); label.appendChild(valor);

      var range = document.createElement("input");
      range.type = "range";
      range.min = f[0]; range.max = f[1]; range.step = f[2];
      range.value = params[chave];
      range.setAttribute("aria-label", rotulo + (un ? TXT.em + un : ""));
      range.addEventListener("input", function () {
        params[chave] = parseFloat(range.value);
        mostrar();
        recalcular();
      });
      bloco.appendChild(label); bloco.appendChild(range);
      controles.appendChild(bloco);
    });

    canvas.addEventListener("pointermove", function (ev) {
      estado.cursor = ev.clientX - canvas.getBoundingClientRect().left;
      redesenhar();
    });
    canvas.addEventListener("pointerleave", function () { estado.cursor = null; redesenhar(); });

    recalcular();
    REDESENHOS.push(redesenhar);
  }

  function iniciar() {
    document.querySelectorAll(".grafico[data-grafico]").forEach(function (el) {
      var nome = el.dataset.grafico;
      if (el.dataset.montado || !DEFS[nome]) return;   // idempotente; espera o registrar
      el.dataset.montado = "1";
      montar(el, nome);
    });
  }

  function redesenharTodos() { REDESENHOS.forEach(function (f) { f(); }); }

  // As cores vêm do CSS na hora de desenhar: trocar de tema sem redesenhar
  // deixa a curva com a paleta anterior.
  window.addEventListener("resize", redesenharTodos);
  document.addEventListener("tema-mudou", redesenharTodos);
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.addEventListener) mq.addEventListener("change", redesenharTodos);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();

  // Avisa o gráfico registrado que nenhuma tag usa, e a tag que nunca foi registrada.
  window.addEventListener("load", function () {
    document.querySelectorAll(".grafico[data-grafico]").forEach(function (el) {
      if (!el.dataset.montado) console.error('[grafico] nenhum Grafico.registrar("' + el.dataset.grafico + '") — a figura ficou vazia.');
    });
  });

  window.Grafico = {
    registrar: registrar,
    iniciar: iniciar,
    integrar: integrar,
    linspace: linspace,
    raiz: raiz,
    fmt: fmt
  };
})();
