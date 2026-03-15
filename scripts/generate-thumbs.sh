#!/usr/bin/env bash
# Generate low-res thumbnails (96px max) for assets/assets-images/ into assets/assets-images/thumbs/
# Run from project root. Requires sips (macOS).

set -e
SRC="assets/assets-images"
DEST="assets/assets-images/thumbs"
SIZE=96

mkdir -p "$DEST"
for f in "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.png "$SRC"/*.webp 2>/dev/null; do
  [ -f "$f" ] || continue
  name=$(basename "$f")
  sips -Z $SIZE "$f" --out "$DEST/$name" 2>/dev/null || true
done
echo "Thumbnails written to $DEST/"
