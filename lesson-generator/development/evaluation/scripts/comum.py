"""O que os scripts da avaliacao compartilham: caminhos, questoes e o check.py da skill."""

import importlib.util
import json
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[1]
SKILL = RAIZ.parents[1] / "skill"
QUESTOES = RAIZ / "questoes"
EXECUCOES = RAIZ / "execucoes"
JUIZ = RAIZ / "juiz"
RESULTADOS = RAIZ / "resultados"

# Rotulo usado nas pastas -> identificador do modelo no registro da sessao.
MODELOS = {
    "haiku": "claude-haiku-5-5",
    "sonnet": "claude-sonnet-5-5",
    "opus": "claude-opus-5-5",
    "fable": "claude-fable-5-2",
}

SECOES = {"M": "Modelo", "C": "Código", "R": "Resultado"}


def ler_json(caminho):
    return json.loads(Path(caminho).read_text(encoding="utf-8"))


def gravar_json(caminho, dados):
    Path(caminho).parent.mkdir(parents=True, exist_ok=True)
    Path(caminho).write_text(json.dumps(dados, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")


def questoes():
    """As questoes, por id, cada pergunta ja com o valor do gabarito."""
    gabarito = ler_json(QUESTOES / "gabarito.json")
    out = {}
    for q in ler_json(QUESTOES / "questoes.json"):
        for p in q["perguntas"]:
            p["valor"] = gabarito[q["id"]][p["chave"]]
        out[q["id"]] = q
    return out


def check():
    """O check.py da skill, como modulo: o leitor de HTML e a leitura de numeros sao os dele."""
    spec = importlib.util.spec_from_file_location("check", SKILL / "scripts" / "check.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod
