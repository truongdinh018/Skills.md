#!/usr/bin/env bash
# Publish the static site to the GitHub Pages deploy branch WITHOUT GitHub
# Actions ("Deploy from a branch" style, giống các repo awesome).
#
# Cách dùng:
#   bash scripts/deploy-gh-pages.sh
#
# Sau đó (một lần): repo → Settings → Pages → Source: "Deploy from a branch"
#   → chọn nhánh: cursor/gh-pages-65cf, thư mục: / (root).
#
# Trang sẽ ở: https://<username>.github.io/<repo>/  (ví dụ /Skills.md/)
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

DEPLOY_BRANCH="${DEPLOY_BRANCH:-cursor/gh-pages-65cf}"
# Project pages phục vụ tại /<repo>, nên cần basePath.
export PAGES_BASE_PATH="${PAGES_BASE_PATH:-/Skills.md}"
export BUILD_STATIC_EXPORT=true

echo "==> Building static export (basePath=$PAGES_BASE_PATH)"
npm run build

if [ ! -f out/.nojekyll ]; then touch out/.nojekyll; fi

ORIGIN_URL="$(git remote get-url origin)"
GIT_NAME="$(git config user.name || echo deploy)"
GIT_EMAIL="$(git config user.email || echo deploy@local)"

TMP="$(mktemp -d)"
cp -r out/. "$TMP"/
cd "$TMP"
git init -q
git checkout -q -b "$DEPLOY_BRANCH"
git add -A
git -c user.name="$GIT_NAME" -c user.email="$GIT_EMAIL" \
  commit -q -m "deploy: static site $(date -u +%FT%TZ)"

echo "==> Pushing to $DEPLOY_BRANCH"
git push -f "$ORIGIN_URL" "$DEPLOY_BRANCH"

echo "==> Done. Pages source phải đặt: Deploy from a branch -> $DEPLOY_BRANCH / (root)"
