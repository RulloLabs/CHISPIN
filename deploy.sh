#!/bin/bash
# ╔══════════════════════════════════════════╗
# ║  CHISPÍN — Deploy Script                ║
# ║  Corre este script en D:\RULLOSOFT\CHISPIN
# ╚══════════════════════════════════════════╝
set -e

echo "🔥 Chispín Deploy Script"
echo "========================"

# 1. Init git si no existe
if [ ! -d ".git" ]; then
  git init
  git branch -m main
fi

git config user.email "jordi@rullolabs.com"
git config user.name "Jordi RulloLabs"

# 2. Stage y commit
git add .
git commit -m "deploy: Chispín claw machine $(date +%Y-%m-%d)" || echo "Nothing to commit"

# 3. Push a GitHub
REPO="Yepale/APPS-chispin"
echo ""
echo "📦 Subiendo a GitHub: $REPO"
echo "   Si es la primera vez, crea el repo primero en:"
echo "   https://github.com/new → nombre: APPS-chispin → Private"
echo ""

git remote add origin "https://github.com/$REPO.git" 2>/dev/null || \
  git remote set-url origin "https://github.com/$REPO.git"

git push -u origin main

# 4. Deploy a Vercel
echo ""
echo "🚀 Desplegando en Vercel..."
npx vercel --prod --yes

echo ""
echo "✅ ¡Listo! Chispín está en producción."
