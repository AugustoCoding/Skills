/* modelo-propagacao.js — modelo da dorna de propagação de levedura.
 *
 * Batelada alimentada aerada, volume variável, alimentação a vazão CONSTANTE
 * que para quando a dorna enche (V = Vmax). Sem produto: numa propagação bem
 * conduzida o açúcar vai para levedura, não para etanol — e é justamente por
 * isso que o modelo não sabe punir o açúcar acumulado. Isso é conteúdo de
 * crítica na lição, não defeito de implementação.
 *
 * Estados integrados: X, S, V. Só X e S vão ao gráfico (V está em litros e
 * esmagaria a escala de g/L).
 *
 * Carregue este arquivo DEPOIS de simulador.js, com defer, para que
 * Simulador.registrar já exista quando ele rodar.
 */
(function () {
  "use strict";
  if (!window.Simulador) {
    console.error("[modelo-propagacao] simulador.js precisa vir antes.");
    return;
  }

  window.Simulador.registrar("propagacao_dorna", {
    rotulo: "Propagação em batelada alimentada, vazão constante",
    vars: ["X", "S"],
    padroes: {
      mu_max: 0.40, Ks: 1.0, Yxs: 0.50,
      F: 0.05, Sin: 200, X0: 1.0, S0: 5.0, V0: 1.0, Vmax: 5.0
    },
    faixas: {
      F: [0.005, 0.30, 0.005], mu_max: [0.05, 0.8, 0.01], Ks: [0.05, 10, 0.05],
      Yxs: [0.1, 0.9, 0.01], Sin: [50, 400, 10], X0: [0.1, 5, 0.1],
      S0: [0, 30, 1], V0: [0.5, 4, 0.1], Vmax: [2, 10, 0.5]
    },
    unidades: {
      mu_max: "1/h", Ks: "g/L", Yxs: "gX/gART", F: "L/h", Sin: "g/L",
      X0: "g/L", S0: "g/L", V0: "L", Vmax: "L"
    },
    inicial: function (p) { return [p.X0, p.S0, p.V0]; },
    deriv: function (t, y, p) {
      var X = y[0], S = Math.max(y[1], 0), V = y[2];
      var F = V < p.Vmax ? p.F : 0;          // a bomba desliga com a dorna cheia
      var mu = (p.mu_max * S) / (p.Ks + S);
      var D = F / V;                          // diluição instantânea, 1/h
      return [(mu - D) * X, D * (p.Sin - S) - (mu * X) / p.Yxs, F];
    },
    ler: function (dados, p) {
      var X = dados.y[0], S = dados.y[1], V = dados.y[2];
      var n = X.length - 1;
      var partes = [];
      for (var i = 0; i <= n; i++) {
        if (V[i] >= p.Vmax - 1e-6) {
          partes.push("dorna cheia em " + dados.t[i].toFixed(1) + " h");
          break;
        }
      }
      if (!partes.length) partes.push("ainda enchendo: V = " + V[n].toFixed(2) + " L");
      partes.push("X " + X[n].toFixed(1) + " g/L");
      partes.push("levedura " + (X[n] * V[n]).toFixed(0) + " g");
      partes.push("ART residual " + S[n].toFixed(2) + " g/L");
      var pico = 0, tpico = 0;
      for (var k = 0; k <= n; k++) if (S[k] > pico) { pico = S[k]; tpico = dados.t[k]; }
      partes.push("pico de ART " + pico.toFixed(1) + " g/L em " + tpico.toFixed(1) + " h");
      return partes.join(" · ");
    }
  });
})();
