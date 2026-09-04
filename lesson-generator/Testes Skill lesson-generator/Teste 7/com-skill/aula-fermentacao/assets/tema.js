/* tema.js — botão de claro/escuro, injetado sozinho em toda lição.
 *
 * Dois estados, só. "Seguir o sistema" seria um terceiro e complicaria a
 * explicação sem mudar nada para o aluno: enquanto ele não clicar, a página
 * já segue o sistema por conta do @media do lesson.css.
 *
 * O botão se injeta sozinho: a lição não precisa de marcação nenhuma, basta
 * carregar este arquivo. Um componente que exige markup vira componente
 * esquecido.
 *
 * A escolha é lembrada entre lições quando o navegador deixa. Abrindo por
 * file:// alguns navegadores bloqueiam o armazenamento — por isso todo acesso
 * está em try/catch, e sem ele o botão continua funcionando na página aberta.
 */

(function () {
  "use strict";

  var CHAVE = "licao-tema";
  var raiz = document.documentElement;

  function lido() {
    try {
      var v = localStorage.getItem(CHAVE);
      return v === "claro" || v === "escuro" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function guardar(v) {
    try {
      localStorage.setItem(CHAVE, v);
    } catch (e) {
      /* Sem armazenamento: a escolha vale para esta página e acabou. */
    }
  }

  function doSistema() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "escuro"
      : "claro";
  }

  function atual() {
    return raiz.getAttribute("data-tema") || doSistema();
  }

  function aplicar(tema) {
    raiz.setAttribute("data-tema", tema);
  }

  function montar() {
    var btn = document.createElement("button");
    btn.className = "tema";
    btn.type = "button";

    function rotular() {
      var alvo = atual() === "escuro" ? "claro" : "escuro";
      // O rótulo diz para onde o clique leva, não onde se está: é o que
      // um botão de duas posições precisa responder.
      btn.textContent = alvo === "escuro" ? "◐ escuro" : "◑ claro";
      btn.setAttribute("aria-label", "Mudar para o tema " + alvo);
    }

    btn.addEventListener("click", function () {
      var alvo = atual() === "escuro" ? "claro" : "escuro";
      aplicar(alvo);
      guardar(alvo);
      rotular();
      // O gráfico lê as cores do CSS na hora de desenhar: sem redesenhar,
      // as curvas ficam com a paleta do tema anterior.
      //
      // O evento serve a QUALQUER componente, inclusive o que você escrever para
      // o workspace: ele só precisa ouvir "tema-mudou". É o único contrato — este
      // arquivo não conhece nenhum componente pelo nome.
      document.dispatchEvent(new CustomEvent("tema-mudou"));
    });

    rotular();
    document.body.appendChild(btn);
  }

  var guardado = lido();
  if (guardado) aplicar(guardado);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montar);
  } else {
    montar();
  }

  window.Tema = { atual: atual, aplicar: aplicar };
})();
