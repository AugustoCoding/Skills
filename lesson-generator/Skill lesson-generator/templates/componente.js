/* ESQUELETO DE COMPONENTE — copie para ../assets/{nome}.js no workspace do aluno.
 *
 * Use quando o exercício pedir uma figura que o `simulador.js` não faz: qualquer
 * gráfico que não seja contra o tempo — varredura de um parâmetro, uma grandeza
 * em outra unidade, dados contra modelo. A tabela de componentes do
 * LESSON-FORMAT.md diz o que cada peça já faz; se nenhuma serve, é aqui.
 *
 * Este arquivo roda como está: copie, abra a lição, e você vê uma curva. Troque
 * as três partes marcadas com {} e ela vira a figura do seu exercício. É mais
 * rápido e mais fiel do que deduzir o estilo lendo o `simulador.js` — não gaste
 * leitura naquele arquivo só para descobrir as convenções, elas estão todas aqui.
 *
 * O QUE TROCAR, nesta ordem:
 *   1. NOME e SELETOR, logo abaixo
 *   2. calcular()  — o que vai no eixo x e as séries do eixo y
 *   3. ler()       — a linha de números embaixo do gráfico
 *
 * E ELE FICA NO WORKSPACE. Componente escrito para um caso não vira peça da
 * skill: tipo empacotado vira o formato que o próximo exercício imita, mesmo
 * quando a pergunta pedia outra figura.
 *
 * Uso na lição:
 *
 *   <div class="varredura"
 *        data-params="mu_max=0.4, Ks=1.0, Yxs=0.5, Sin=20"
 *        data-varre="D:0:0.5:0.002"
 *        data-controles="Sin:5:100:1, Ks:0.05:10:0.05"
 *        data-rotulos="Produtividade, Biomassa X"></div>
 *
 * Precisa de um modelo NOVO de curso temporal, e não de outra figura? Então não
 * é este arquivo: registre o modelo no simulador sem editá-lo, com
 *
 *   Simulador.registrar("meu_modelo", { rotulo, vars, padroes, faixas, unidades, inicial, deriv });
 */

(function () {
  "use strict";

  /* 1. IDENTIDADE ----------------------------------------------------------
     NOME vira window.{NOME} e é como o botão de tema encontra o componente.
     SELETOR é a classe que a lição usa na div. Troque os dois. */

  var NOME = "Varredura";
  var SELETOR = ".varredura";

  /* Rótulos dos eixos. Sempre com unidade: gráfico é explicação, não enfeite. */
  var EIXO_X = "Diluição D (1/h)";
  var EIXO_Y = "Produtividade (g·L⁻¹·h⁻¹)";

  /* 2. O CÁLCULO -----------------------------------------------------------
     Devolve { x: [...], series: [[...], [...]] } — um x, quantas séries quiser
     (no máximo três, que é o que a paleta tem). Avaliação de fórmula fechada é
     grátis: pode varrer mil pontos. Se o seu cálculo precisar integrar, veja o
     rk4passo do simulador.js e mantenha a varredura numa dúzia de pontos.

     O corpo abaixo é ILUSTRATIVO, só para o esqueleto desenhar algo. Troque. */

  function calcular(p, varre) {
    var x = [], s1 = [], s2 = [];
    var n = 240;
    for (var i = 0; i <= n; i++) {
      var D = varre.min + ((varre.max - varre.min) * i) / n;
      // {A conta do seu exercício. Aqui: quimiostato no estacionário.}
      var S = (p.Ks * D) / (p.mu_max - D);
      var X = S > 0 && S < p.Sin ? p.Yxs * (p.Sin - S) : 0;
      x.push(D);
      s1.push(D * X);
      s2.push(X);
    }
    return { x: x, series: [s1, s2] };
  }

  /* 3. A LEITURA -----------------------------------------------------------
     A linha de números embaixo do gráfico. Ela existe para o aluno conferir a
     previsão dele contra o resultado — não repita o que a curva já mostra. */

  function ler(dados) {
    var melhor = 0, onde = 0;
    dados.series[0].forEach(function (v, i) {
      if (v > melhor) { melhor = v; onde = dados.x[i]; }
    });
    return "máximo " + melhor.toFixed(3) + " em " + onde.toFixed(3);
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
      ctx.fillText(vx.toFixed(xMax < 10 ? 2 : 0), xp, m.topo + lh + 7);
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
