#!/bin/bash
set -e

CONVEX_URL="${CONVEX_URL:-http://localhost:3212}"

echo "=== Test 1: getCurrentUser (authComponent.getAuthUser) ==="
curl -s "${CONVEX_URL}/api/query" \
  -H "Content-Type: application/json" \
  -d '{"path":"auth:getCurrentUser","args":{}}' | head -c 200
echo ""

echo ""
echo "=== Test 2: listProjects (requireUserId → same authComponent) ==="
curl -s "${CONVEX_URL}/api/query" \
  -H "Content-Type: application/json" \
  -d '{"path":"projects:listProjects","args":{}}' | head -c 200
echo ""

echo ""
echo "If Test 1 returns user data but Test 2 says Unauthenticated,"
echo "Convex dev needs restart: lsof -ti:3212 | xargs kill -9 && pnpm exec convex dev"
