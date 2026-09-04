/* simulador.js — curso temporal: X, S, P (e V) contra o TEMPO.
 *
 * NÃO faz varredura de parâmetro. Se a pergunta do exercício for "qual D dá
 * a maior produtividade", a figura tem o parâmetro no eixo horizontal e este
 * componente não serve — escreva o componente de varredura. Não gaste leitura
 * descobrindo isso: a tabela de componentes está em LESSON-FORMAT.md.
 *
 *
 * Existe para um propósito: o padrão "preveja e depois rode". O aluno
 * escreve a curva que espera, mexe em μmax, e vê na hora. É o loop de
 * feedback mais apertado que este domínio permite.
 *
 * Uso na lição:
 *
 *   <div class="simulador"
 *        data-modelo="{o nome que voce deu no registrar}"
 *        data-tempo="24"
 *        data-params="mu_max=0.4, Ks=1.0, Yxs=0.5, Ypx=0.2, X0=0.1, S0=20"
 *        data-controles="mu_max, Ks"></div>
 *
 *   data-modelo     nome que você deu no Simulador.registrar() desta lição
 *   data-tempo      horizonte de simulação, em h
 *   data-params     sobrescreve os padrões do modelo
 *   data-controles  quais parâmetros ganham controle deslizante (no máximo
 *                   quatro, e só os que a análise crítica discute).
 *                   Faixa opcional: "mu_max:0.05:1.2:0.01"
 *   data-rotulos    nomes das curvas na legenda, na ordem dos vars do modelo:
 *                   "Levedura X, ART S, Etanol P". Use os mesmos nomes do
 *                   texto da lição — sem isso a legenda diz "Produto P" e a
 *                   prosa diz "etanol", e o aluno faz a ponte de cabeça
 *
 * NENHUM modelo vem pronto. Toda lição registra o sistema dela, sem editar este
 * arquivo, e a ordem das tags não importa — registrar() monta o que faltar:
 *
 *   Simulador.registrar("meu_modelo", {
 *     rotulo, vars, padroes, faixas, unidades, inicial, deriv
 *   });
 *
 * O esqueleto preenchido está em templates/licao.html. Copie de lá.
 */

(function () {
  "use strict";

  /* ---------- modelos ----------
     NENHUM modelo vem empacotado, de propósito. A lição registra o sistema DO
     EXERCÍCIO dela, copiando as mesmas equações que já escreveu em Python — assim
     a curva na tela é a mesma equação do código, e não um sistema parecido escrito
     por outra pessoa. O esqueleto do registrar está em templates/licao.html. */

  var MODELOS = {};

  function registrar(nome, def) {
    MODELOS[nome] = def;
    // Re-varre. Script com defer roda quando readyState ja e "interactive", entao
    // iniciar() ja passou quando o registrar da licao chega -- sem isto o grafico
    // morreria com "modelo desconhecido", e a ordem das tags viraria armadilha.
    if (document.body) iniciar();
  }

  function monod(mu_max, S, Ks) {
    return (mu_max * Math.max(S, 0)) / (Ks + Math.max(S, 0));
  }

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

  /* clientWidth de um canvas sem CSS devolve 300, a largura intrínseca — truthy,
     e por isso um "|| 600" nunca dispara. Quem sabe a largura é o container. */
  function largura(canvas) {
    var el = canvas.parentElement;
    return canvas.clientWidth || (el && el.clientWidth) || 600;
  }

  function cor(nome) {
    return getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || "#888";
  }

  var TRACOS = [[], [6, 4], [2, 3]]; // X sólido, S tracejado, P pontilhado

  function desenhar(canvas, dados, opts) {
    var css = { w: largura(canvas), h: 320 };
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
    ctx.fillText((opts && opts.eixoY) || "Concentração (g/L)", 0, 0);
    ctx.restore();

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
     O valor final de cada variável, para o aluno conferir contra a previsão dele.

     Deliberadamente burra: não sabe que regime é este nem o que seria interessante
     nele. Se a sua lição precisa de outro número — um instante, um ótimo, uma
     produtividade —, passe uma função `ler` no registrar e ela substitui esta. */

  function ler(modelo, dados, rotulos) {
    if (typeof modelo.ler === "function") return modelo.ler(dados);
    var n = dados.t.length - 1;
    return dados.y.slice(0, (modelo.vars || []).length).map(function (serie, i) {
      return (rotulos[i] || (modelo.vars || [])[i]) + " final " + serie[n].toFixed(2);
    }).join(" · ");
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

    var canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", (modelo.rotulo || "Simulação") + " ao longo do tempo");
    el.appendChild(canvas);

    var legenda = document.createElement("div");
    legenda.className = "sim-legenda";
    // A legenda vem dos vars do modelo. E o nome de cada curva pode vir do
    // exercício: numa lição de etanol, "Produto P" obriga o texto a dizer
    // "produto" — e trocar de nome entre a legenda e a prosa faz o aluno
    // montar a ponte de cabeça.
    //
    //   data-rotulos="Levedura X, ART S, Etanol P"
    //
    // Sem o atributo, valem os genéricos.
    var NOMES = { X: "Biomassa X", S: "Substrato S", P: "Produto P", V: "Volume V" };
    var rotulos = (el.dataset.rotulos || "").split(",")
      .map(function (r) { return r.trim(); })
      .filter(Boolean);

    var nomes = (modelo.vars || ["X", "S", "P"]).map(function (v, i) {
      return rotulos[i] || NOMES[v] || v;
    });
    legenda.innerHTML = (modelo.vars || ["X", "S", "P"])
      .map(function (v, i) {
        return '<span class="l-' + v.toLowerCase() + '">' + nomes[i] + '</span>';
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
      desenhar(canvas, dados, {
        series: (modelo.vars || []).length,
        eixoY: el.dataset.eixoY          // data-eixo-y="Taxa (1/h)", se não for g/L
      });
      leitura.textContent = ler(modelo, dados, nomes);
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

    redesenhar();

    // Guardado para o botão de tema poder repintar sem remontar o widget:
    // remontar recriaria os controles e perderia o estado da previsão.
    REDESENHOS.push(redesenhar);

    // O gráfico acompanha a largura da coluna e o tema do sistema.
    window.addEventListener("resize", redesenhar);
    document.addEventListener("tema-mudou", redesenhar);
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", redesenhar);
    }
  }

  function iniciar() {
    document.querySelectorAll(".simulador").forEach(function (el) {
      if (el.dataset.montado) return;          // idempotente: registrar() re-chama
      if (!MODELOS[el.dataset.modelo || "batelada"]) return;   // ainda nao registrado
      el.dataset.montado = "1";
      montar(el);
    });
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
