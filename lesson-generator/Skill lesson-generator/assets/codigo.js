/* codigo.js — as linhas do tempo da lição (código, dedução, observações) e o
 * resto da seção de código: libera o programa e a resposta no fim, injeta o
 * botão de copiar e realça o Python. Não formata nem valida código.
 *
 * Faz cinco coisas, e a lição não precisa de marcação nenhuma além da estrutura:
 *
 *   1. monta como linha do tempo os passos do código (.passo), os da dedução de
 *      cada balanço (ol.deducao) e as observações (ol.observacoes): o próximo
 *      item aparece fechado e abre com um clique nele. Os demais ficam
 *      escondidos: o aluno não vê quantos faltam, e é isso que o mantém lendo
 *      em vez de rolar até o fim;
 *   2. num passo que tem <p class="pense">, mostra primeiro o título e a pergunta,
 *      e o código só depois que o aluno clica — é a previsão antes da revelação;
 *   3. só libera o programa completo e a resposta depois do último passo;
 *   4. injeta um botão de copiar em cada bloco de código;
 *   5. pinta o Python de todo <pre><code> da lição com cores de IDE. Um bloco que
 *      não seja Python leva class="sem-realce".
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

  /* Realce de sintaxe do Python, como numa IDE: cada cor é uma categoria que
     o aluno aprende a reconhecer. Escrito aqui, e não com biblioteca, porque a
     lição abre sem internet. Só pinta: o texto do bloco não muda, e o botão
     de copiar continua copiando o código puro. */

  var PALAVRAS = /^(if|elif|else|for|while|return|import|from|as|in|not|and|or|is|with|try|except|finally|raise|break|continue|pass|lambda|yield|global|nonlocal|del|assert|async|await)$/;
  var DEFINE = /^(def|class|None|True|False)$/;
  var EMBUTIDAS = /^(print|range|len|abs|min|max|sum|float|int|str|bool|list|dict|tuple|set|zip|enumerate|round|sorted|reversed|map|filter|open|isinstance|type|any|all)$/;
  var TOKEN = /(#[^\n]*)|((?:[rRbBfFuU]{1,2})?(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\.|[^"\\n])*"|'(?:\.|[^'\\n])*'))|(\b\d+\.?\d*(?:[eE][+-]?\d+)?\b|\.\d+(?:[eE][+-]?\d+)?\b)|([A-Za-z_\u00C0-\u024F]\w*)|(\*\*=?|\/\/=?|[-+*\/%=<>!@&|^~]=?)/g;

  function esc(t) {
    return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function realcar(code) {
    if (code.dataset.realcado || code.classList.contains("sem-realce")) return;
    code.dataset.realcado = "1";
    var txt = code.textContent, out = "", fim = 0, anterior = "", m;
    TOKEN.lastIndex = 0;
    while ((m = TOKEN.exec(txt))) {
      out += esc(txt.slice(fim, m.index));
      fim = TOKEN.lastIndex;
      var t = m[0], cls = "";
      if (m[1]) cls = "hl-com";
      else if (m[2]) cls = "hl-str";
      else if (m[3]) cls = "hl-num";
      else if (m[4]) {
        if (anterior === "def" || anterior === "class") cls = "hl-fn";
        else if (DEFINE.test(t)) cls = "hl-def";
        else if (PALAVRAS.test(t)) cls = "hl-kw";
        else if (/^\s*\(/.test(txt.slice(fim))) cls = EMBUTIDAS.test(t) ? "hl-bi" : "hl-fn";
        anterior = t;
      } else if (m[5]) cls = "hl-op";
      out += cls ? '<span class="' + cls + '">' + esc(t) + "</span>" : esc(t);
    }
    code.innerHTML = out + esc(txt.slice(fim));
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

  /* A LINHA DO TEMPO — o mesmo mecanismo para os passos do código, os passos
     da dedução de um balanço e as observações do resultado. O primeiro item
     abre; o seguinte aparece FECHADO (a bolinha e o que diz o que vem) e abre
     com um clique nele, ou com Enter; os demais ficam escondidos, e o aluno não
     sabe quantos faltam. Um "pense" pendente segura o próximo. aoFim roda
     quando o último abre. */
  function sequencia(itens, aoFim) {
    if (!itens.length) { if (aoFim) aoFim(); return; }
    var abertos = 1;

    function atualizar() {
      var atual = itens[abertos - 1];
      var pendente = atual && atual.dataset.pendente;
      var proximo = itens[abertos];
      if (proximo && !pendente && proximo.classList.contains("oculto")) {
        proximo.classList.remove("oculto");
        proximo.classList.add("fechado", "revelado");
        proximo.setAttribute("tabindex", "0");
        proximo.setAttribute("role", "button");
        var titulo = proximo.querySelector("h3");
        proximo.setAttribute("aria-label", "Abrir o próximo item" + (titulo ? ": " + titulo.textContent : ""));
      }
      if (!proximo && !pendente && aoFim) { aoFim(); aoFim = null; }
      // O fio desce de cada passo do código até o seguinte, se ele estiver à
      // vista. (Na dedução e nas observações, o fio é da lista inteira.)
      itens.forEach(function (p, i) {
        var seguinte = itens[i + 1];
        p.classList.toggle("sem-fio", !seguinte || seguinte.classList.contains("oculto") || p.classList.contains("fechado"));
      });
    }

    function abrir(p) {
      if (!p.classList.contains("fechado")) return;
      p.classList.remove("fechado", "revelado");
      void p.offsetWidth;                      // reinicia a animação de entrada
      p.classList.add("revelado");
      p.removeAttribute("tabindex");
      p.removeAttribute("role");
      p.removeAttribute("aria-label");
      abertos++;
      atualizar();
      p.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    itens.forEach(function (p, i) {
      if (i > 0) p.classList.add("oculto");
      prepararPense(p, atualizar);
      p.addEventListener("click", function () { abrir(p); });
      p.addEventListener("keydown", function (ev) {
        if ((ev.key === "Enter" || ev.key === " ") && p.classList.contains("fechado")) {
          ev.preventDefault();
          abrir(p);
        }
      });
    });
    atualizar();
  }

  function montar(sec) {
    Array.prototype.forEach.call(sec.querySelectorAll("pre"), function (pre) {
      pre.classList.add("com-copia");
      botaoCopiar(pre);
    });

    var passos = Array.prototype.slice.call(sec.querySelectorAll(".passo"));
    var finais = Array.prototype.slice.call(sec.querySelectorAll("details.programa, details.resposta"));
    finais.forEach(function (d) { d.classList.add("oculto"); });

    sequencia(passos, function () {
      finais.forEach(function (d) {
        if (!d.classList.contains("oculto")) return;
        d.classList.remove("oculto");
        d.classList.add("revelado");
      });
    });
  }

  function iniciar() {
    // Todo bloco de código da lição é Python: realça antes de montar a seção,
    // para o botão de copiar entrar depois do texto já pintado.
    document.querySelectorAll("pre > code").forEach(realcar);
    document.querySelectorAll("section.codigo").forEach(montar);
    document.querySelectorAll("ol.deducao, ol.observacoes").forEach(function (ol) {
      sequencia(Array.prototype.slice.call(ol.children));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  window.Codigo = { iniciar: iniciar };
})();
