/* codigo.js — a seção de código da lição: revela os passos, libera o programa
 * e a resposta no fim, injeta o botão de copiar. Não formata nem valida código.
 *
 * Faz quatro coisas, e a lição não precisa de marcação nenhuma além da estrutura:
 *
 *   1. esconde os passos seguintes e revela um por clique, com uma animação
 *      curta. O aluno não vê quantos faltam: o próximo passo é surpresa, e é
 *      isso que o mantém lendo em vez de rolar até o fim;
 *   2. num passo que tem <p class="pense">, mostra primeiro o título e a pergunta,
 *      e o código só depois que o aluno clica — é a previsão antes da revelação;
 *   3. só libera o programa completo e a resposta depois do último passo;
 *   4. injeta um botão de copiar em cada bloco de código.
 *
 * Estrutura esperada na lição:
 *
 *   <section class="codigo">
 *     <div class="passo"><h3>…</h3><pre><code>…</code></pre><p>…</p></div>
 *     <div class="passo"><h3>…</h3><p class="pense">…</p><pre><code>…</code></pre><p>…</p></div>
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

  // Passo com .pense abre em dois tempos: título e pergunta primeiro, o resto
  // só depois que o aluno pensou. Devolve true enquanto a pergunta está pendente.
  function prepararPense(passo, aoResolver) {
    var pense = passo.querySelector(":scope > .pense");
    if (!pense) return;
    var resto = [], el = pense.nextElementSibling;
    while (el) { resto.push(el); el = el.nextElementSibling; }
    if (!resto.length) return;
    resto.forEach(function (r) { r.classList.add("oculto"); });
    passo.dataset.pendente = "1";

    var b = document.createElement("button");
    b.type = "button";
    b.className = "ver-passo";
    b.textContent = "Pensei — mostrar o código";
    b.addEventListener("click", function () {
      resto.forEach(function (r) { r.classList.remove("oculto"); r.classList.add("revelado"); });
      b.remove();
      delete passo.dataset.pendente;
      aoResolver();
    });
    pense.insertAdjacentElement("afterend", b);
  }

  function montar(sec) {
    Array.prototype.forEach.call(sec.querySelectorAll("pre"), function (pre) {
      pre.classList.add("com-copia");
      botaoCopiar(pre);
    });

    var passos = Array.prototype.slice.call(sec.querySelectorAll(".passo"));
    var finais = Array.prototype.slice.call(sec.querySelectorAll("details.programa, details.resposta"));
    var visiveis = Math.min(1, passos.length);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "revelar-passo";
    btn.textContent = "Revelar o próximo passo";

    function atualizar() {
      var atual = passos[visiveis - 1];
      var pendente = atual && atual.dataset.pendente;
      var acabou = visiveis >= passos.length;
      btn.style.display = pendente || acabou ? "none" : "";
      if (acabou && !pendente) {
        finais.forEach(function (d) {
          if (!d.classList.contains("oculto")) return;
          d.classList.remove("oculto");
          d.classList.add("revelado");
        });
      }
    }

    passos.forEach(function (p, i) {
      if (i > 0) p.classList.add("oculto");
      prepararPense(p, atualizar);
    });
    finais.forEach(function (d) { d.classList.add("oculto"); });

    btn.addEventListener("click", function () {
      var p = passos[visiveis];
      p.classList.remove("oculto");
      p.classList.add("revelado");
      visiveis++;
      atualizar();
      // Leva o passo novo para a vista sem pular por cima do anterior.
      p.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    sec.insertBefore(btn, finais[0] || null);
    atualizar();
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
