/* quiz.js — widget de quiz com feedback imediato.
 *
 * O loop de feedback da lição. Duas formas: escolha múltipla e resposta
 * numérica. Prefira a numérica quando puder: ela cobra recuperação, a
 * escolha múltipla cobra reconhecimento.
 *
 * Uso na lição:
 *
 *   <div class="quiz">
 *     <script type="application/json">
 *     [
 *       {
 *         "pergunta": "Qual a unidade de Ks?",
 *         "tipo": "escolha",
 *         "opcoes": ["g por litro", "um por hora", "grama por grama", "litro por hora"],
 *         "correta": 0,
 *         "feedbacks": [
 *           "Ks e S são a mesma grandeza: por isso S/(Ks+S) é adimensional.",
 *           "1/h é a unidade de μ, não de Ks. Ks está na mesma escala de S."
 *         ]
 *       },
 *       {
 *         "pergunta": "Quimiostato em estado estacionário, D = 0,2 1/h. Quanto vale μ?",
 *         "tipo": "numerica",
 *         "resposta": 0.2,
 *         "tolerancia": 0.01,
 *         "unidade": "1/h",
 *         "feedback": "μ = D: é a diluição que impõe a taxa de crescimento."
 *       }
 *     ]
 *     </script>
 *   </div>
 *
 * Regra das alternativas: mesmo número de palavras e, se possível, de
 * caracteres. Nenhuma pista de formatação. O componente avisa no console
 * quando os comprimentos destoam.
 */

(function () {
  "use strict";

  function criarEscolha(item, raiz) {
    var opcoes = document.createElement("div");
    opcoes.className = "quiz-opcoes";

    var feedback = document.createElement("p");
    feedback.className = "quiz-feedback";
    feedback.setAttribute("role", "status");

    var respondida = false;

    item.opcoes.forEach(function (texto, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-opcao";
      btn.textContent = texto;

      btn.addEventListener("click", function () {
        if (respondida) return;
        respondida = true;

        var certa = i === item.correta;
        btn.classList.add(certa ? "certa" : "errada");

        // Revela a correta mesmo quando o aluno erra: o objetivo é aprender,
        // não pontuar.
        if (!certa) {
          opcoes.children[item.correta].classList.add("certa");
        }

        Array.prototype.forEach.call(opcoes.children, function (b) {
          b.disabled = true;
        });

        var msg = "";
        if (item.feedbacks && item.feedbacks[i]) {
          msg = item.feedbacks[i];
        } else if (item.feedback) {
          msg = item.feedback;
        }
        feedback.className = "quiz-feedback " + (certa ? "ok" : "nao");
        feedback.textContent = (certa ? "Isso. " : "Ainda não. ") + msg;
      });

      opcoes.appendChild(btn);
    });

    raiz.appendChild(opcoes);
    raiz.appendChild(feedback);

    avisarComprimentos(item.opcoes);
  }

  function criarNumerica(item, raiz) {
    var linha = document.createElement("div");
    linha.className = "quiz-numerica";

    var input = document.createElement("input");
    input.type = "text";
    input.inputMode = "decimal";
    input.setAttribute("aria-label", item.pergunta);
    input.placeholder = "valor";

    var unidade = document.createElement("span");
    unidade.className = "un";
    unidade.textContent = item.unidade || "";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Conferir";

    var feedback = document.createElement("p");
    feedback.className = "quiz-feedback";
    feedback.setAttribute("role", "status");

    function conferir() {
      // Aceita vírgula decimal: o aluno escreve em português.
      var bruto = input.value.trim().replace(",", ".");
      var valor = parseFloat(bruto);

      if (isNaN(valor)) {
        feedback.className = "quiz-feedback nao";
        feedback.textContent = "Escreva um número.";
        return;
      }

      var tol = item.tolerancia != null ? item.tolerancia : Math.abs(item.resposta) * 0.02;
      var certa = Math.abs(valor - item.resposta) <= tol;

      feedback.className = "quiz-feedback " + (certa ? "ok" : "nao");
      feedback.textContent =
        (certa ? "Isso. " : "Ainda não — é " + item.resposta + " " + (item.unidade || "") + ". ") +
        (item.feedback || "");
    }

    btn.addEventListener("click", conferir);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        conferir();
      }
    });

    linha.appendChild(input);
    if (item.unidade) linha.appendChild(unidade);
    linha.appendChild(btn);
    raiz.appendChild(linha);
    raiz.appendChild(feedback);
  }

  /* A alternativa correta não pode ser a mais longa. Se os comprimentos
     destoam, o quiz mede leitura atenta em vez de conhecimento. */
  function avisarComprimentos(opcoes) {
    var comps = opcoes.map(function (o) { return o.length; });
    var min = Math.min.apply(null, comps);
    var max = Math.max.apply(null, comps);
    if (max - min > Math.max(6, min * 0.35)) {
      console.warn(
        "[quiz] Alternativas com comprimentos muito diferentes (" +
          comps.join(", ") +
          "). Iguale o número de palavras e caracteres: comprimento é pista.",
        opcoes
      );
    }
  }

  function montar(container) {
    var dados = container.querySelector('script[type="application/json"]');
    if (!dados) return;

    var itens;
    try {
      itens = JSON.parse(dados.textContent);
    } catch (e) {
      console.error("[quiz] JSON inválido:", e);
      return;
    }
    if (!Array.isArray(itens)) itens = [itens];

    itens.forEach(function (item) {
      var bloco = document.createElement("div");
      bloco.className = "quiz-item";

      var pergunta = document.createElement("p");
      pergunta.className = "quiz-pergunta";
      pergunta.textContent = item.pergunta;
      bloco.appendChild(pergunta);

      if (item.tipo === "numerica") {
        criarNumerica(item, bloco);
      } else {
        criarEscolha(item, bloco);
      }

      container.appendChild(bloco);
    });
  }

  function iniciar() {
    document.querySelectorAll(".quiz").forEach(montar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  window.Quiz = { iniciar: iniciar };
})();
