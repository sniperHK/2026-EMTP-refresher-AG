#!/usr/bin/env bash
set -euo pipefail

# Quick structure audit for this teaching-material repo.
# Focus: context sync, folder hygiene, and TODO/roadmap drift.

pass_count=0
warn_count=0

pass() {
  printf '[PASS] %s\n' "$1"
  pass_count=$((pass_count + 1))
}

warn() {
  printf '[WARN] %s\n' "$1"
  warn_count=$((warn_count + 1))
}

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$repo_root"

if [[ -f ".shared-ai-context.md" ]]; then
  pass "Found .shared-ai-context.md"
else
  warn "Missing .shared-ai-context.md"
fi

if [[ -f ".shared-ai-context.md" ]]; then
  head_hash="$(git rev-parse --short HEAD 2>/dev/null || true)"
  if [[ -n "$head_hash" ]] && rg -q "$head_hash" ".shared-ai-context.md"; then
    pass ".shared-ai-context.md Git history includes HEAD ($head_hash)"
  else
    warn ".shared-ai-context.md Git history does not include current HEAD"
  fi
fi

for f in "inputs/README.md" "exports/README.md" "references/raw/README.md"; do
  if [[ -f "$f" ]]; then
    pass "Found structure README: $f"
  else
    warn "Missing structure README: $f"
  fi
done

root_artifacts=()
while IFS= read -r artifact; do
  root_artifacts+=("$artifact")
done < <(
  find . -maxdepth 1 -type f \
    \( -iname '*.pdf' -o -iname '*.pptx' -o -iname '*.ppt' -o -iname '*.docx' -o -iname '*.doc' \
       -o -iname '*.xlsx' -o -iname '*.xls' -o -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \
       -o -iname '*.tif' -o -iname '*.tiff' \) \
    | sort
)

if [[ "${#root_artifacts[@]}" -eq 0 ]]; then
  pass "No raw binary artifacts found at repo root"
else
  warn "Repo root contains raw artifacts (move to inputs/ or references/raw/):"
  printf '  %s\n' "${root_artifacts[@]}"
fi

if [[ -f "TODO.md" && -f "docs/roadmap.md" ]]; then
  if rg -q '^\- \[ \] 準備 PowerPoint 簡報素材' "TODO.md" && rg -q '^\- \[x\] PowerPoint 簡報' "docs/roadmap.md"; then
    warn "TODO.md and docs/roadmap.md appear inconsistent for PowerPoint progress"
  else
    pass "No obvious TODO/roadmap drift detected for PowerPoint progress"
  fi
else
  warn "TODO.md or docs/roadmap.md missing; cannot check drift"
fi

printf '\nSummary: %d pass, %d warning\n' "$pass_count" "$warn_count"
if [[ "$warn_count" -gt 0 ]]; then
  exit 1
fi
