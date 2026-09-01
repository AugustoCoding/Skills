/* codigo.js — a seção de código da lição.
 *
 * Faz três coisas, e a lição não precisa de marcação nenhuma além da estrutura:
 *
 *   1. esconde os passos seguintes e revela um por clique, com uma animação
 *      curta. O aluno não vê quantos faltam: o próximo passo é surpresa, e é
 *      isso que o mantém lendo em vez de rolar até o fim;
 *   2. só libera o programa completo e a resposta depois do último passo;
 *   3. injeta um botão de copiar em cada bloco de código.
 *
 * Estrutura esperada na lição:
 *
 *   <section class="codigo">
 *     <div class="passo"><h3>…</h3><pre><code>…</code></pre><p>…</p></div>
 *     <div class="passo">…</div>
 *     <details class="programa"><summary>Ver o programa completo</summary><pre><code>…</code></pre></details>
 *     <details class="resposta"><summary>Ver a resposta</summary><p>…</p></details>
 *   </section>
 */

(function () {
  "use strict";

  function copiar(texto, botao) {
    function ok() {
      var antes = botao.textContent;
      botao.textContent = "copiado";
      botao.classList.add("copiado");
      setTimeout(function () {
        botao.textContent = antes;
        botao.classList.remove("copiado");
      }, 1400);
    }

    // A API moderna exige contexto seguro, e abrir por file:// nem sempre
    // conta como tal. O execCommand é obsoleto e funciona em todo lugar:
    // aqui ele é a rede, não a primeira opção.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(ok, function () { legado(texto, ok); });
    } else {
      legado(texto, ok);
    }
  }

  function legado(texto, ok) {
    var ta = document.createElement("textarea");
    ta.value = texto;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      ok();
    } catch (e) {
      console.warn("[codigo] não consegui copiar:", e);
    }
    ta.remove();
  }

  function botaoCopiar(pre) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copiar";
    btn.textContent = "copiar";
    btn.addEventListener("click", function () {
      copiar(pre.querySelector("code") ? pre.querySelector("code").textContent : pre.textContent, btn);
    });
    pre.appendChild(btn);
  }

  function montar(sec) {
    Array.prototype.forEach.call(sec.querySelectorAll("pre"), function (pre) {
      pre.classList.add("com-copia");
      botaoCopiar(pre);
    });

    var passos = Array.prototype.slice.call(sec.querySelectorAll(".passo"));
    var finais = Array.prototype.slice.call(sec.querySelectorAll("details.programa, details.resposta"));

    // Sem passos não há o que revelar: a seção fica aberta como está.
    if (passos.length < 2) {
      finais.forEach(function (d) { d.classList.add("revelado"); });
      return;
    }

    var visiveis = 1;
    passos.forEach(function (p, i) { if (i > 0) p.classList.add("oculto"); });
    finais.forEach(function (d) { d.classList.add("oculto"); });

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "revelar-passo";
    btn.textContent = "Revelar o próximo passo";

    function avancar() {
      var p = passos[visiveis];
      p.classList.remove("oculto");
      p.classList.add("revelado");
      visiveis++;

      if (visiveis >= passos.length) {
        btn.remove();
        finais.forEach(function (d) {
          d.classList.remove("oculto");
          d.classList.add("revelado");
        });
      }
      // Leva o passo novo para a vista sem pular por cima do anterior.
      p.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    btn.addEventListener("click", avancar);
    sec.insertBefore(btn, finais[0] || null);
  }

  function iniciar() {
    document.querySelectorAll("section.codigo").forEach(montar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  window.Codigo = { iniciar: iniciar };
})();
