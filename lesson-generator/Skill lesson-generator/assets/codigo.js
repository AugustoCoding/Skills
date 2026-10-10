/* codigo.js — as linhas do tempo da lição (código, dedução, observações), as
 * seções recolhíveis, o botão de copiar e o realce do Python. Não formata nem
 * valida código.
 *
 * Faz quatro coisas, e a lição não precisa de marcação nenhuma além da estrutura:
 *
 *   1. monta como linha do tempo os passos do código (.passo), os da dedução de
 *      cada balanço (ol.deducao) e as observações (ol.observacoes). A lição abre
 *      com as seções e os itens todos recolhidos: o aluno vê de saída quantos
 *      passos tem cada parte. O próximo a ler chama (a bolinha pulsa);
 *   2. se a seção ainda tiver o programa e a resposta em <details> (formato
 *      antigo), só os libera depois do último passo;
 *   3. injeta um botão de copiar em cada bloco de código;
 *   4. pinta o Python de todo <pre><code> da lição com cores de IDE. Um bloco que
 *      não seja Python leva class="sem-realce".
 *
 * Estrutura esperada na lição:
 *
 *   <section class="codigo">
 *     <div class="passo"><h3>…</h3><pre><code>…</code></pre><p>…</p></div>
 *     <div class="passo"><h3>O programa completo</h3><pre><code>…</code></pre><p>…</p></div>
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

  // O texto Python vira HTML com as classes de realce. Usado aqui e no editor.
  function realcarTexto(txt) {
    var out = "", fim = 0, anterior = "", m;
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
    return out + esc(txt.slice(fim));
  }

  function realcar(code) {
    if (code.dataset.realcado || code.classList.contains("sem-realce")) return;
    code.dataset.realcado = "1";
    code.innerHTML = realcarTexto(code.textContent);
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

  /* O CORPO RECOLHÍVEL — o que um item (ou uma seção) esconde quando recolhe vai
     para dentro de dois invólucros: .x-corpo, uma grade de uma linha que vai de
     0fr a 1fr, e .x-dentro, que corta o que passa. É o que deixa a altura
     deslizar, em vez de o conteúdo sumir e aparecer de uma vez. */
  function corpoRecolhivel(pai, nos, prefixo) {
    var corpo = document.createElement("div");
    corpo.className = prefixo + "-corpo";
    var dentro = document.createElement("div");
    dentro.className = prefixo + "-dentro";
    nos.forEach(function (n) { dentro.appendChild(n); });
    corpo.appendChild(dentro);
    return corpo;
  }

  // A cabeça de um item é o que fica à vista com ele recolhido: o título, nos
  // passos do código e nas observações; as etiquetas de tipo, na dedução.
  function montarItem(item) {
    var cabeca = item.querySelector(":scope > h3");
    if (!cabeca) {
      var tipos = item.querySelectorAll(".porque .tipo");
      if (tipos.length) {
        cabeca = document.createElement("div");
        cabeca.className = "item-cabeca";
        tipos.forEach(function (t) { cabeca.appendChild(t.cloneNode(true)); });
      }
    }
    var resto = Array.prototype.filter.call(item.childNodes, function (n) { return n !== cabeca; });
    var corpo = corpoRecolhivel(item, resto, "item");
    item.textContent = "";
    if (cabeca) item.appendChild(cabeca);
    item.appendChild(corpo);
  }

  /* A LINHA DO TEMPO — o mesmo mecanismo para os passos do código, os passos
     da dedução de um balanço e as observações do resultado. Todos começam
     RECOLHIDOS (a bolinha e a cabeça) e abrem com um clique, ou com Enter; um
     clique na bolinha ou no título de um item aberto o recolhe de novo. O
     primeiro ainda não lido CHAMA, com a bolinha pulsando. aoFim roda quando
     todos já foram abertos uma vez. */
  function sequencia(itens, aoFim) {
    if (!itens.length) { if (aoFim) aoFim(); return; }

    function atualizar() {
      var proximo = null;
      itens.forEach(function (p) {
        if (!proximo && !p.dataset.lido) proximo = p;
        p.classList.remove("chamando");
      });
      if (proximo) proximo.classList.add("chamando");
      else if (aoFim) { aoFim(); aoFim = null; }
      // O fio desce de cada passo do código até o seguinte. (Na dedução e nas
      // observações, o fio é da lista inteira.)
      itens.forEach(function (p, i) { p.classList.toggle("sem-fio", !itens[i + 1]); });
    }

    function alternar(p) {
      var recolher = !p.classList.contains("recolhido");
      p.classList.toggle("recolhido", recolher);
      if (recolher) {
        p.setAttribute("tabindex", "0");
        p.setAttribute("role", "button");
        p.setAttribute("aria-expanded", "false");
        return;
      }
      p.removeAttribute("tabindex");
      p.removeAttribute("role");
      p.removeAttribute("aria-expanded");
      if (!p.dataset.lido) {
        p.dataset.lido = "1";
        atualizar();
      }
      // Depois que a altura terminou de deslizar, o item aberto entra na vista.
      setTimeout(function () { p.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 380);
    }

    // Só a bolinha (a calha à esquerda) e a cabeça recolhem: clicar no texto, no
    // código ou num botão de dentro não mexe.
    function naAlca(p, ev) {
      var r = p.getBoundingClientRect();
      var calha = parseFloat(getComputedStyle(p).paddingLeft) || 0;
      if (ev.clientX - r.left < calha) return true;
      var cabeca = ev.target.closest && ev.target.closest("h3, .item-cabeca");
      return !!cabeca && cabeca.parentElement === p;
    }

    itens.forEach(function (p) {
      montarItem(p);
      p.classList.add("recolhido");
      p.setAttribute("tabindex", "0");
      p.setAttribute("role", "button");
      p.setAttribute("aria-expanded", "false");
      p.addEventListener("click", function (ev) {
        if (p.classList.contains("recolhido") || naAlca(p, ev)) alternar(p);
      });
      p.addEventListener("keydown", function (ev) {
        if ((ev.key === "Enter" || ev.key === " ") && p.classList.contains("recolhido")) {
          ev.preventDefault();
          alternar(p);
        }
      });
    });
    atualizar();
  }

  /* AS SEÇÕES — cada h2 do corpo da lição (o modelo, o código, o resultado)
     recolhe a seção inteira: tudo o que vem depois dele até o próximo h2, ou
     até o convite a perguntar. Começam recolhidas; a primeira ainda não aberta
     chama, com a setinha pulsando. */
  function montarSecoes() {
    var titulos = Array.prototype.slice.call(document.querySelectorAll("body > h2"));

    function chamar() {
      var proximo = null;
      titulos.forEach(function (h2) {
        if (!proximo && !h2.dataset.lido) proximo = h2;
        h2.classList.remove("chamando");
      });
      if (proximo) proximo.classList.add("chamando");
    }

    titulos.forEach(function (h2) {
      if (h2.dataset.secao) return;
      h2.dataset.secao = "1";
      var nos = [], n = h2.nextSibling;
      while (n && !(n.nodeType === 1 && (n.tagName === "H2" || n.classList.contains("pergunte") ||
               (n.tagName === "SCRIPT" && n.src)))) {
        nos.push(n);
        n = n.nextSibling;
      }
      var corpo = corpoRecolhivel(h2.parentNode, nos, "secao");
      h2.parentNode.insertBefore(corpo, n);
      h2.classList.add("secao-titulo");
      h2.setAttribute("tabindex", "0");
      h2.setAttribute("role", "button");
      function recolher(sim) {
        h2.classList.toggle("secao-recolhida", sim);
        corpo.classList.toggle("secao-recolhida", sim);
        h2.setAttribute("aria-expanded", String(!sim));
        if (!sim && !h2.dataset.lido) { h2.dataset.lido = "1"; chamar(); }
      }
      recolher(true);
      function alternar() { recolher(!h2.classList.contains("secao-recolhida")); }
      h2.addEventListener("click", alternar);
      h2.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); alternar(); }
      });
    });
    chamar();
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
    montarSecoes();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }

  window.Codigo = { iniciar: iniciar, realcarTexto: realcarTexto };
})();
