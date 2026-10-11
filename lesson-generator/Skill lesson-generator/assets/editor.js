/* editor.js — um editor de Python ao lado da lição, que roda o código ali mesmo.
 *
 * Injeta sozinho uma bolinha "‹" na borda direita, que vira o botão "Editor de
 * código ›" com o mouse em cima e abre o painel. Aberto, o painel ocupa a
 * direita da página e a lição desliza para a esquerda. Em cima, o editor;
 * embaixo, a saída: o que o print escreve, os erros e as figuras do matplotlib.
 *
 * O editor começa VAZIO. Cada bloco de código da seção de código ganha, ao lado
 * do "copiar", um botão "→ editor" que acrescenta aquele trecho ao fim do
 * programa: o aluno monta o programa ele mesmo, passo a passo.
 *
 * O Python é o Pyodide (CPython compilado para WebAssembly), baixado do CDN
 * só no primeiro "Rodar": a lição continua abrindo sem internet, e só o editor
 * precisa dela, uma vez. Depois o navegador guarda tudo.
 *
 * A lição não precisa de marcação nenhuma: basta carregar este arquivo depois
 * do codigo.js, de quem ele usa o realce de sintaxe.
 *
 * Atalhos: Ctrl+Enter roda · Tab indenta · Enter mantém a indentação.
 * O que o aluno montou fica guardado no navegador, por lição; "Limpar" esvazia.
 */

(function () {
  "use strict";

  var PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/";
  var CHAVE = "licao-editor:" + location.pathname;
  var INDENT = "    ";
  var VAZIO = "O editor começa vazio.\n\n" +
    "Em cada bloco de código da lição, o botão  → editor  traz aquele trecho " +
    "para cá, no fim do programa. Monte o programa passo a passo e aperte " +
    "Rodar (ou Ctrl+Enter).";

  var py = null;          // a instância do Pyodide, quando carregada
  var carregando = null;  // a promessa do carregamento, para não carregar duas vezes

  function guardar(txt) { try { localStorage.setItem(CHAVE, txt); } catch (e) { /* sem armazenamento */ } }
  function lido() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function esquecer() { try { localStorage.removeItem(CHAVE); } catch (e) { /* idem */ } }

  function realcar(txt) {
    return window.Codigo && window.Codigo.realcarTexto
      ? window.Codigo.realcarTexto(txt)
      : txt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }

  // Um ícone desenhado (lesson.css, "ícones desenhados"): nunca um caractere
  // como ▶ ou ✕, que cada fonte põe numa altura e sai torto ao lado do texto.
  function icone(nome) { return el("span", "ic ic-" + nome); }

  // O conteúdo de um botão: texto e ícones, na ordem dada.
  function rotular(b, partes) {
    b.textContent = "";
    partes.forEach(function (p) { b.append(typeof p === "string" ? document.createTextNode(p) : p); });
  }

  function botao(cls, partes, titulo) {
    var b = el("button", cls);
    b.type = "button";
    if (partes) rotular(b, [].concat(partes));
    if (titulo) b.title = titulo;
    return b;
  }

  // Botão só de ícone: o nome fica na dica (title) e no leitor de tela.
  function botaoIcone(cls, nome, titulo) {
    var b = botao(cls + " editor-icone", [icone(nome)], titulo);
    b.setAttribute("aria-label", titulo);
    return b;
  }

  function montar() {
    var abrir = botao("editor-abrir", null, "Abrir o editor de código");
    abrir.setAttribute("aria-label", "Abrir o editor de código");
    abrir.append(el("span", "editor-abrir-texto", "Editor de código"), el("span", "editor-abrir-seta"));

    var painel = el("aside", "editor-painel");
    painel.setAttribute("aria-label", "Editor de Python");

    var topo = el("div", "editor-topo");
    var rodar = botaoIcone("editor-rodar", "play", "Rodar (Ctrl+Enter)");
    var limpar = botaoIcone("editor-botao editor-limpar", "lixo", "Esvaziar o editor");
    var fechar = botaoIcone("editor-botao editor-fechar", "x", "Fechar o editor");
    topo.append(el("span", "editor-titulo", "Editor de código"), rodar, limpar, fechar);

    var codigo = el("div", "editor-codigo");
    var linhas = el("div", "editor-linhas");
    linhas.setAttribute("aria-hidden", "true");
    var campo = el("div", "editor-campo");
    var realce = el("pre", "editor-realce");
    realce.setAttribute("aria-hidden", "true");
    var realceCode = el("code", "sem-realce");
    realce.appendChild(realceCode);
    var texto = el("textarea", "editor-texto");
    texto.spellcheck = false;
    texto.placeholder = VAZIO;
    texto.setAttribute("autocapitalize", "off");
    texto.setAttribute("autocomplete", "off");
    texto.setAttribute("aria-label", "Código Python");
    campo.append(realce, texto);
    codigo.append(linhas, campo);

    var saida = el("div", "editor-saida");
    var saidaTopo = el("div", "editor-saida-topo");
    var estado = el("span", "editor-estado", "Na primeira vez que você rodar, o Python é baixado (precisa de internet).");
    var limparSaida = botaoIcone("editor-limpar-saida", "lixo", "Apagar a saída, sem mexer no código");
    saidaTopo.append(el("span", "", "Saída"), estado, limparSaida);
    var resultado = el("div", "editor-resultado");
    saida.append(saidaTopo, resultado);

    // A divisão entre o código e a saída: arrasta-se para ver a saída inteira.
    var divisor = el("div", "editor-divisor");
    divisor.setAttribute("role", "separator");
    divisor.setAttribute("aria-orientation", "horizontal");
    divisor.setAttribute("aria-label", "Arraste para dividir o espaço entre o código e a saída");
    divisor.title = "Arraste para dividir o espaço · duplo clique volta ao meio";
    divisor.tabIndex = 0;

    // A divisão entre a lição e o editor: arrasta-se para os lados.
    var lateral = el("div", "editor-divisor-v");
    lateral.setAttribute("role", "separator");
    lateral.setAttribute("aria-orientation", "vertical");
    lateral.setAttribute("aria-label", "Arraste para dividir a largura entre a lição e o editor");
    lateral.title = "Arraste para os lados · duplo clique volta ao padrão";
    lateral.tabIndex = 0;

    painel.append(lateral, topo, codigo, divisor, saida);
    document.body.append(abrir, painel);

    /* ---------- a divisão entre a lição e o editor ---------- */

    var raiz = document.documentElement;
    var MIN_EDITOR = 360;   // px: o editor ainda mostra uma linha de código inteira
    var MIN_LICAO = 420;    // px: a lição ainda é uma coluna legível

    function redesenharLicao() { window.dispatchEvent(new Event("resize")); }

    function larguraEditor(w) {
      w = Math.max(MIN_EDITOR, Math.min(window.innerWidth - MIN_LICAO, w));
      raiz.style.setProperty("--editor-w", w + "px");
      return w;
    }

    function larguraPadrao() {
      raiz.style.removeProperty("--editor-w");
      try { localStorage.removeItem("licao-editor-largura"); } catch (e) { /* sem armazenamento */ }
      redesenharLicao();
    }

    function guardarLargura(w) {
      try { localStorage.setItem("licao-editor-largura", String(Math.round(w))); } catch (e) { /* idem */ }
    }

    lateral.addEventListener("pointerdown", function (ev) {
      ev.preventDefault();
      lateral.setPointerCapture(ev.pointerId);
      lateral.classList.add("arrastando");
      // Sem as transições enquanto arrasta: a lição acompanha o dedo, não atrasa.
      document.body.classList.add("redimensionando");
      var ultima = painel.offsetWidth, quadro = 0;
      function mover(e) {
        // O editor fica a um vão da borda direita, e a alça no meio do vão
        // entre as folhas: a largura desconta o vão e meio, para a alça seguir
        // o ponteiro.
        var vao = parseFloat(getComputedStyle(painel).right) || 0;
        ultima = larguraEditor(window.innerWidth - vao - e.clientX - vao / 2);
        if (!quadro) quadro = requestAnimationFrame(function () { quadro = 0; redesenharLicao(); });
      }
      function soltar() {
        lateral.classList.remove("arrastando");
        document.body.classList.remove("redimensionando");
        lateral.removeEventListener("pointermove", mover);
        lateral.removeEventListener("pointerup", soltar);
        lateral.removeEventListener("pointercancel", soltar);
        guardarLargura(ultima);
        redesenharLicao();
      }
      lateral.addEventListener("pointermove", mover);
      lateral.addEventListener("pointerup", soltar);
      lateral.addEventListener("pointercancel", soltar);
    });
    lateral.addEventListener("dblclick", larguraPadrao);
    lateral.addEventListener("keydown", function (ev) {
      var passo = ev.shiftKey ? 120 : 40;
      if (ev.key === "ArrowLeft" || ev.key === "ArrowRight") {
        ev.preventDefault();
        guardarLargura(larguraEditor(painel.offsetWidth + (ev.key === "ArrowLeft" ? passo : -passo)));
        redesenharLicao();
      }
    });

    try {
      var largura = parseFloat(localStorage.getItem("licao-editor-largura"));
      if (largura) larguraEditor(largura);
    } catch (e) { /* sem armazenamento: fica a largura padrão */ }

    /* ---------- a divisão entre código e saída ---------- */

    var MINIMO = 90;   // px: nenhuma das duas some de vez

    function dividir(altura) {
      // A altura que sobra para código + saída, descontados o topo e a barra.
      var livre = painel.clientHeight - topo.offsetHeight - divisor.offsetHeight;
      altura = Math.max(MINIMO, Math.min(livre - MINIMO, altura));
      codigo.style.flex = "0 0 " + altura + "px";
      saida.style.flex = "1 1 0";
      return altura;
    }

    function divisaoPadrao() {
      codigo.style.flex = "";
      saida.style.flex = "";
      try { localStorage.removeItem("licao-editor-divisao"); } catch (e) { /* sem armazenamento */ }
    }

    function guardarDivisao(altura) {
      try { localStorage.setItem("licao-editor-divisao", String(Math.round(altura))); } catch (e) { /* idem */ }
    }

    divisor.addEventListener("pointerdown", function (ev) {
      ev.preventDefault();
      divisor.setPointerCapture(ev.pointerId);
      divisor.classList.add("arrastando");
      var y0 = ev.clientY, h0 = codigo.offsetHeight, ultima = h0;
      function mover(e) { ultima = dividir(h0 + e.clientY - y0); }
      function soltar() {
        divisor.classList.remove("arrastando");
        divisor.removeEventListener("pointermove", mover);
        divisor.removeEventListener("pointerup", soltar);
        divisor.removeEventListener("pointercancel", soltar);
        guardarDivisao(ultima);
      }
      divisor.addEventListener("pointermove", mover);
      divisor.addEventListener("pointerup", soltar);
      divisor.addEventListener("pointercancel", soltar);
    });
    divisor.addEventListener("dblclick", divisaoPadrao);
    divisor.addEventListener("keydown", function (ev) {
      var passo = ev.shiftKey ? 80 : 24;
      if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
        ev.preventDefault();
        guardarDivisao(dividir(codigo.offsetHeight + (ev.key === "ArrowDown" ? passo : -passo)));
      }
    });

    try {
      var salva = parseFloat(localStorage.getItem("licao-editor-divisao"));
      if (salva) codigo.style.flex = "0 0 " + salva + "px";
    } catch (e) { /* sem armazenamento: fica a divisão padrão */ }

    /* ---------- o editor ---------- */

    function sincronizar() {
      realce.scrollTop = texto.scrollTop;
      realce.scrollLeft = texto.scrollLeft;
      linhas.scrollTop = texto.scrollTop;
    }

    function pintar() {
      // A linha em branco no fim mantém a altura do realce igual à do textarea.
      realceCode.innerHTML = realcar(texto.value) + "\n";
      var n = texto.value ? texto.value.split("\n").length : 1;
      var nums = "";
      for (var i = 1; i <= n; i++) nums += i + "\n";
      linhas.textContent = nums;
      sincronizar();
    }

    function aoEditar() { pintar(); guardar(texto.value); }

    function inserir(txt) {
      // execCommand mantém o desfazer (Ctrl+Z) do navegador; o fallback não.
      if (!document.execCommand || !document.execCommand("insertText", false, txt)) {
        var a = texto.selectionStart, b = texto.selectionEnd;
        texto.value = texto.value.slice(0, a) + txt + texto.value.slice(b);
        texto.selectionStart = texto.selectionEnd = a + txt.length;
      }
      aoEditar();
    }

    texto.addEventListener("input", aoEditar);
    texto.addEventListener("scroll", sincronizar);
    texto.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
        ev.preventDefault();
        executar();
      } else if (ev.key === "Tab" && !ev.shiftKey) {
        ev.preventDefault();
        inserir(INDENT);
      } else if (ev.key === "Enter") {
        // Mantém a indentação da linha atual, e acrescenta um nível depois de ":".
        var antes = texto.value.slice(0, texto.selectionStart);
        var linha = antes.slice(antes.lastIndexOf("\n") + 1);
        var recuo = linha.match(/^[ \t]*/)[0];
        if (/:[ \t]*(#.*)?$/.test(linha)) recuo += INDENT;
        ev.preventDefault();
        inserir("\n" + recuo);
      }
    });

    texto.value = lido() || "";
    pintar();

    /* ---------- abrir e fechar ---------- */

    function alternar(aberto) {
      document.body.classList.toggle("com-editor", aberto);
      // A coluna muda de largura: os gráficos se redesenham na nova medida.
      setTimeout(function () { window.dispatchEvent(new Event("resize")); }, 320);
    }
    abrir.addEventListener("click", function () {
      alternar(true);
      setTimeout(function () { texto.focus(); }, 320);
    });
    fechar.addEventListener("click", function () { alternar(false); });
    limpar.addEventListener("click", function () {
      texto.value = "";
      esquecer();
      pintar();
      resultado.textContent = "";
      texto.focus();
    });
    rodar.addEventListener("click", executar);
    limparSaida.addEventListener("click", function () {
      resultado.textContent = "";
      estado.textContent = "";
    });

    /* ---------- "→ editor" em cada bloco de código ---------- */

    // Acrescenta um trecho ao fim do programa, separado por uma linha em branco.
    function acrescentar(trecho) {
      trecho = trecho.replace(/\s+$/, "") + "\n";
      var atual = texto.value.replace(/\s+$/, "");
      texto.value = atual ? atual + "\n\n" + trecho : trecho;
      aoEditar();
      texto.scrollTop = texto.scrollHeight;
      sincronizar();
      codigo.classList.remove("recebeu");
      void codigo.offsetWidth;          // reinicia o lampejo
      codigo.classList.add("recebeu");
    }

    document.querySelectorAll("section.codigo pre").forEach(function (pre) {
      var c = pre.querySelector("code");
      if (!c) return;
      var b = botaoIcone("para-editor", "enviar", "Levar este trecho ao fim do programa no editor");
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();           // o clique não abre nem fecha o passo ao redor
        if (!document.body.classList.contains("com-editor")) alternar(true);
        acrescentar(c.textContent);
        rotular(b, [icone("check")]);
        b.classList.add("enviado");
        setTimeout(function () { rotular(b, [icone("enviar")]); b.classList.remove("enviado"); }, 1600);
      });
      pre.classList.add("com-copia");
      pre.appendChild(b);
    });

    /* ---------- rodar ---------- */

    function escrever(txt, cls) {
      var ultimo = resultado.lastElementChild;
      if (ultimo && ultimo.tagName === "PRE" && ultimo.className === cls) {
        ultimo.textContent += txt + "\n";
      } else {
        resultado.appendChild(el("pre", cls, txt + "\n"));
      }
    }

    function figura(b64) {
      var img = el("img", "saida-figura");
      img.alt = "Figura gerada pelo programa";
      img.src = "data:image/png;base64," + b64;
      resultado.appendChild(img);
    }

    function carregar() {
      if (carregando) return carregando;
      carregando = new Promise(function (ok, falha) {
        estado.textContent = "Baixando o Python… (só na primeira vez)";
        var s = document.createElement("script");
        s.src = PYODIDE + "pyodide.js";
        s.onload = function () {
          window.loadPyodide({ indexURL: PYODIDE }).then(function (p) {
            py = p;
            py.setStdout({ batched: function (t) { escrever(t, "saida-texto"); } });
            py.setStderr({ batched: function (t) {
              // Aviso de bastidor do matplotlib na primeira vez: não é erro do aluno.
              if (/building the font cache/i.test(t)) return;
              escrever(t, "saida-erro");
            } });
            py.globals.set("_licao_figura", figura);
            ok(py);
          }, falha);
        };
        s.onerror = function () { falha(new Error("sem conexão")); };
        document.head.appendChild(s);
      });
      carregando.catch(function () { carregando = null; });
      return carregando;
    }

    // O matplotlib desenha em memória, e o plt.show() vira imagem na saída.
    var PREPARO_MPL = [
      "import io, base64",
      "import matplotlib",
      "matplotlib.use('Agg')",
      "import matplotlib.pyplot as plt",
      "def _licao_show(*a, **k):",
      "    for n in plt.get_fignums():",
      "        b = io.BytesIO()",
      "        plt.figure(n).savefig(b, format='png', dpi=110, bbox_inches='tight')",
      "        _licao_figura(base64.b64encode(b.getvalue()).decode())",
      "    plt.close('all')",
      "plt.show = _licao_show"
    ].join("\n");

    var ocupado = false;

    function executar() {
      if (ocupado) return;
      var codigoPy = texto.value;
      if (!codigoPy.trim()) {
        estado.textContent = "O editor está vazio: traga os trechos da lição com  → editor.";
        return;
      }
      ocupado = true;
      rodar.disabled = true;
      resultado.textContent = "";
      var t0;

      carregar().then(function () {
        estado.textContent = "Carregando as bibliotecas que o programa importa…";
        return py.loadPackagesFromImports(codigoPy);
      }).then(function () {
        if (py.loadedPackages.matplotlib) py.runPython(PREPARO_MPL);
        estado.textContent = "Rodando…";
        t0 = performance.now();
        // Cada execução começa num espaço de nomes limpo, como rodar o arquivo
        // de novo no terminal.
        var ns = py.globals.get("dict")();
        return py.runPythonAsync(codigoPy, { globals: ns }).finally(function () { ns.destroy(); });
      }).then(function () {
        if (py.loadedPackages.matplotlib) py.runPython("_licao_show()");
        var s = (performance.now() - t0) / 1000;
        estado.textContent = "Pronto em " + s.toFixed(1).replace(".", ",") + " s";
        if (!resultado.childElementCount) escrever("(o programa não imprimiu nada)", "saida-vazia");
      }).catch(function (err) {
        if (!py) {
          estado.textContent = "Não consegui baixar o Python. O editor precisa de internet na primeira vez.";
          return;
        }
        // Do traceback, só o que é do programa do aluno: as linhas internas do
        // Pyodide não ajudam ninguém.
        var msg = String((err && err.message) || err);
        var corte = msg.indexOf('File "<exec>"');
        escrever(corte >= 0 ? "Traceback (most recent call last):\n  " + msg.slice(corte) : msg, "saida-erro");
        estado.textContent = "O programa parou com um erro";
      }).finally(function () {
        ocupado = false;
        rodar.disabled = false;
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montar);
  else montar();
})();
