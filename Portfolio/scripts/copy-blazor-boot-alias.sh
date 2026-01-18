#!/usr/bin/env bash
set -euo pipefail

# Creates non-hashed aliases for Blazor boot assets in a published wwwroot.
# This helps on static hosts like GitHub Pages where only the plain URL is referenced.

PUBLISH_WWWROOT=${1:-}
if [[ -z "${PUBLISH_WWWROOT}" ]]; then
  echo "Usage: $0 <path-to-publish-wwwroot>" >&2
  exit 2
fi

FW_DIR="$PUBLISH_WWWROOT/_framework"
if [[ ! -d "$FW_DIR" ]]; then
  echo "Missing _framework directory: $FW_DIR" >&2
  exit 3
fi

BOOT=$(ls -1 "$FW_DIR" | grep -E '^blazor\.webassembly\..*\.js$' | head -n 1 || true)
if [[ -z "$BOOT" ]]; then
  echo "Could not find hashed boot script in $FW_DIR (expected blazor.webassembly.*.js)" >&2
  exit 4
fi

cp -f "$FW_DIR/$BOOT" "$FW_DIR/blazor.webassembly.js"

if [[ -f "$FW_DIR/$BOOT.br" ]]; then
  cp -f "$FW_DIR/$BOOT.br" "$FW_DIR/blazor.webassembly.js.br"
fi

if [[ -f "$FW_DIR/$BOOT.gz" ]]; then
  cp -f "$FW_DIR/$BOOT.gz" "$FW_DIR/blazor.webassembly.js.gz"
fi

echo "Created aliases:" >&2
ls -1 "$FW_DIR" | grep -E '^blazor\.webassembly\.js(\.|$)' >&2