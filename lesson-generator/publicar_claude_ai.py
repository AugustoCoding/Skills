"""Gera o .zip da skill para enviar ao claude.ai (Configurações > Recursos > Skills).

    python publicar_claude_ai.py

O claude.ai só aceita seis campos no topo do SKILL.md (name, description,
license, compatibility, metadata, allowed-tools) e recusa o envio se houver
outro. Os campos do Claude Code (disable-model-invocation, argument-hint) ficam
de fora do zip; no repositório, nada muda.

Lá não existe trava de "só quando o usuário chama": quem segura a skill é a
description, que diz para usá-la só quando pedida pelo nome.

Grava dist/lesson-generator.zip, ao lado deste arquivo (fora do git).
"""

import re
import sys
import zipfile
from pathlib import Path

AQUI = Path(__file__).resolve().parent
SKILL = AQUI / "Skill lesson-generator"
SAIDA = AQUI / "dist" / "lesson-generator.zip"
ACEITOS = {"name", "description", "license", "compatibility", "metadata", "allowed-tools"}


def frontmatter_limpo(texto):
    m = re.match(r"---\n(.*?)\n---\n", texto, re.S)
    if not m:
        sys.exit("ERRO: o SKILL.md não começa com o bloco --- ... ---.")
    linhas, removidos, pulando = [], [], False
    for linha in m.group(1).splitlines():
        chave = re.match(r"([A-Za-z_-]+):", linha)
        if chave:
            pulando = chave.group(1) not in ACEITOS
            if pulando:
                removidos.append(chave.group(1))
        if not pulando:
            linhas.append(linha)
    campos = dict(re.match(r"([A-Za-z_-]+):\s*(.*)", l).groups() for l in linhas if re.match(r"[A-Za-z_-]+:", l))
    nome, desc = campos.get("name", ""), campos.get("description", "")
    if not re.fullmatch(r"[a-z0-9-]{1,64}", nome):
        sys.exit(f"ERRO: name \"{nome}\" precisa ter até 64 caracteres, só minúsculas, números e hífens.")
    if not desc or len(desc) > 1024 or re.search(r"<[^>]+>", desc):
        sys.exit("ERRO: a description precisa existir, ter até 1024 caracteres e nenhuma tag.")
    return "---\n" + "\n".join(linhas) + "\n---\n" + texto[m.end():], removidos


def main():
    texto, removidos = frontmatter_limpo((SKILL / "SKILL.md").read_text(encoding="utf-8"))
    SAIDA.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(SAIDA, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("lesson-generator/SKILL.md", texto)
        for arq in sorted(SKILL.rglob("*")):
            rel = arq.relative_to(SKILL)
            if arq.is_dir() or rel.as_posix() == "SKILL.md" or "__pycache__" in rel.parts:
                continue
            z.write(arq, "lesson-generator/" + rel.as_posix())
    print(f"Zip: {SAIDA}")
    print("Campos tirados do topo do SKILL.md: " + (", ".join(removidos) or "nenhum"))
    print("Envie em claude.ai > Configurações > Recursos > Skills (precisa da execução de código ligada).")


if __name__ == "__main__":
    main()
