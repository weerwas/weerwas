#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Error: python3 is required but was not found."
  exit 1
fi

echo "Starting Team Review & Daily Report Web App..."
echo "URL: http://localhost:${PORT}"
echo "Press Ctrl+C to stop"
python3 -m http.server "${PORT}"
