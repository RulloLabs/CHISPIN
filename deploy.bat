@echo off
echo 🔥 Chispin Deploy Script
echo ========================

REM Asegurate de estar en D:\RULLOSOFT\CHISPIN antes de correr esto

git add .
git commit -m "deploy: Chispin claw machine"
git remote add origin https://github.com/Yepale/APPS-chispin.git 2>nul
git remote set-url origin https://github.com/Yepale/APPS-chispin.git
git push -u origin main

echo.
echo Desplegando en Vercel...
npx vercel --prod --yes

echo.
echo Listo!
pause
