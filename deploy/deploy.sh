#!/usr/bin/env bash
# Build locally and publish to the Hostinger VPS.
#
#   ./deploy/deploy.sh            # uses the defaults below
#   VPS_HOST=root@82.25.112.1 ./deploy/deploy.sh
#
set -euo pipefail

VPS_HOST="${VPS_HOST:-root@82.25.112.1}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/anuvadsoftware}"

cd "$(dirname "$0")/.."

echo "==> Building"
npm ci
npm run build

echo "==> Publishing to ${VPS_HOST}:${REMOTE_DIR}"
ssh "$VPS_HOST" "mkdir -p '$REMOTE_DIR'"
rsync -avz --delete dist/ "$VPS_HOST:$REMOTE_DIR/"

echo "==> Reloading nginx"
ssh "$VPS_HOST" "nginx -t && systemctl reload nginx"

echo "==> Done. https://www.anuvadsoftware.com"
