/* variantes.js — o explorador da estação de código.
 *
 * Troca uma linha do programa à vista e redesenha o gráfico ao lado, para o
 * aluno ver o que muda quando ele decide diferente. As opções são **escolhas
 * corretas entre si** — método do integrador, evento, densidade de t_eval —,
 * nunca erros plantados: o objetivo é mostrar decisões de quem programa, não
 * catalogar defeitos.
 *
 * Reusa o integrador e o traçado de simulador.js. Nada de segundo motor.
 *
 * Uso na lição:
 *
 *   <div class="variantes"
 *        data-modelo="batelada"
 *        data-tempo="30"
 *        data-params="mu_max=0.35, Ks=1.5, Yxs=0.045, Ypx=10, X0=2, S0=150">
 *     <script type="application/json">
 *     {
 *       "codigo": [
 *         "sol = solve_ivp(",
 *         "    derivadas, (0, 30), y0, args=(p,),",
 *         "    §metodo§,",
 *         "    t_eval=§teval§,",
 *         ")"
 *       ],
 *       "escolhas": [
 *         {
 *           "chave": "teval",
 *           "rotulo": "t_eval",
 *           "opcoes": [
 *             { "nome": "300 pontos", "codigo": "np.linspace(0, 30, 300)",
 *               "amostras": 300,
 *               "nota": "Saída densa: a queda do substrato aparece com a forma que ela tem." },
 *             { "nome": "12 pontos", "codigo": "np.linspace(0, 30, 12)",
 *               "amostras": 12,
 *               "nota": "Mesma integração, saída esparsa: a transição some entre dois pontos." }
 *           ]
 *         }
 *       ]
 *     }
 *     </script>
 *   </div>
 *
 * Cada opção pode sobrescrever "amostras", "tempo" e "params" — é o que
 * torna o efeito visível no gráfico. Quando a escolha não muda a curva
 * (método numérico num problema não rígido, por exemplo), diga isso na
 * "nota": "não muda a curva aqui, muda o custo e a robustez" também ensina.
 */

(function () {
  "use strict";

  var REDESENHOS = [];

  function pares(txt) {
    var p = {};
    (txt || "").split(",").forEach(function (par) {
      var kv = par.split("=");
      if (kv.length === 2) p[kv[0].trim()] = parseFloat(kv[1].trim().replace(",", "."));
    });
    return p;
  }

  function escapar(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function montar(el) {
    var fonte = el.querySelector('script[type="application/json"]');
    if (!fonte) {
      console.error("[variantes] bloco sem JSON de configuração", el);
      return;
    }

    var cfg;
    try {
      cfg = JSON.parse(fonte.textContent);
    } catch (e) {
      console.error("[variantes] JSON inválido:", e.message);
      return;
    }

    if (!window.Simulador) {
      console.error("[variantes] simulador.js precisa ser carregado antes.");
      return;
    }

    var modelo = window.Simulador.modelos[el.dataset.modelo || "batelada"];
    if (!modelo) {
      console.error("[variantes] modelo desconhecido:", el.dataset.modelo);
      return;
    }

    var Tbase = parseFloat(el.dataset.tempo || "24");
    var paramsBase = Object.assign({}, modelo.padroes, pares(el.dataset.params));
    var linhas = cfg.codigo || [];
    var escolhas = cfg.escolhas || [];
    var atual = escolhas.map(function () { return 0; });

    var caixaOpcoes = document.createElement("div");
    caixaOpcoes.className = "variantes-opcoes";

    var caixaCodigo = document.createElement("pre");
    caixaCodigo.className = "variantes-codigo";

    var canvas = document.createElement("canvas");

    var legenda = document.createElement("div");
    legenda.className = "sim-legenda";
    (modelo.vars || []).forEach(function (v, i) {
      var span = document.createElement("span");
      span.className = "l-" + v.toLowerCase();
      span.textContent = ["Biomassa X", "Substrato S", "Produto P"][i] || v;
      legenda.appendChild(span);
    });

    var nota = document.createElement("p");
    nota.className = "variantes-nota";

    function selecionada(i) {
      return escolhas[i].opcoes[atual[i]];
    }

    function pintarCodigo() {
      // Sentinelas de controle marcam o trecho trocado ANTES de escapar o HTML:
      // assim o destaque não depende de casar tags dentro de texto já escapado.
      var ABRE = "\u0001";
      var FECHA = "\u0002";

      var txt = linhas.join("\n");
      escolhas.forEach(function (esc, i) {
        var op = selecionada(i);
        var marca = new RegExp("§" + esc.chave + "§", "g");
        txt = txt.replace(marca, ABRE + op.codigo + FECHA);
      });

      caixaCodigo.innerHTML = escapar(txt)
        .split(ABRE).join('<span class="linha-troca">')
        .split(FECHA).join("</span>");
    }

    function desenhar() {
      var params = Object.assign({}, paramsBase);
      var T = Tbase;
      var amostras = 400;

      escolhas.forEach(function (esc, i) {
        var op = selecionada(i);
        if (op.params) Object.assign(params, op.params);
        if (op.tempo) T = op.tempo;
        if (op.amostras) amostras = op.amostras;
      });

      var dados = window.Simulador.simular(modelo, params, T, amostras);
      window.Simulador.desenhar(canvas, dados, { vars: modelo.vars });

      nota.textContent = escolhas
        .map(function (esc, i) { return selecionada(i).nota; })
        .filter(Boolean)
        .join(" ");
    }

    function atualizar() {
      pintarCodigo();
      desenhar();
    }

    escolhas.forEach(function (esc, i) {
      var grupo = document.createElement("div");
      grupo.className = "variantes-grupo";

      var rot = document.createElement("span");
      rot.className = "variantes-rotulo";
      rot.textContent = esc.rotulo ? esc.rotulo + ":" : "";
      grupo.appendChild(rot);

      esc.opcoes.forEach(function (op, j) {
        var btn = document.createElement("button");
        btn.className = "variantes-opcao";
        btn.type = "button";
        btn.textContent = op.nome;
        btn.setAttribute("aria-pressed", j === 0 ? "true" : "false");
        btn.addEventListener("click", function () {
          atual[i] = j;
          Array.prototype.forEach.call(grupo.querySelectorAll(".variantes-opcao"), function (b, k) {
            b.setAttribute("aria-pressed", k === j ? "true" : "false");
          });
          atualizar();
        });
        grupo.appendChild(btn);
      });

      caixaOpcoes.appendChild(grupo);
    });

    el.appendChild(caixaOpcoes);
    el.appendChild(caixaCodigo);
    el.appendChild(canvas);
    el.appendChild(legenda);
    el.appendChild(nota);

    atualizar();

    REDESENHOS.push(desenhar);
    window.addEventListener("resize", desenhar);
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", desenhar);
    }
  }

  function iniciar() {
    document.querySelectorAll(".variantes").forEach(montar);
  }

  function redesenharTodos() {
    REDESENHOS.forEach(function (f) { f(); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  window.Variantes = { iniciar: iniciar, redesenharTodos: redesenharTodos };
})();
