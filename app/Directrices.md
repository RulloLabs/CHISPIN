# Directrices del Proyecto CHISPÍN

Este documento establece las normas estrictas para asegurar que el proyecto se mantenga unificado y no se pierda código al modificar la web o el minijuego 3D.

## 1. Arquitectura de Carpetas
- **Única Carpeta Real:** `d:\RULLOSOFT\CHISPIN\app`
- **Código Frontend (React/Vite):** Todo el desarrollo web ocurre en `app/src`.
- **Código del Minijuego (HTML/3D):** El ejecutable compilado del minijuego reside exclusivamente en `app/public/juego`. 

## 2. Actualización del Minijuego
Si se hacen cambios en Unity/PlayCanvas/ThreeJS y se exporta una nueva versión del juego, **NUNCA** sobrescribas la raíz del proyecto.
**Pasos para actualizar:**
1. Ve a la carpeta `app/public/juego`.
2. Borra los archivos antiguos (`index.html`, `models/`, `assets/`, etc.).
3. Pega los nuevos archivos exportados exactamente en `app/public/juego`.
4. El iframe de la web (`<iframe src="/juego/index.html">`) lo detectará automáticamente.

## 3. Despliegue (Git y Vercel)
- No uses carpetas paralelas (ej. `chispin-landing` o `chispin-deploy`). Todo se sincroniza desde `app`.
- Los comandos para sincronizar siempre deben ejecutarse dentro de la ruta `app`:
  ```bash
  cd d:\RULLOSOFT\CHISPIN\app
  git add .
  git commit -m "Descripción del cambio"
  git push origin main
  ```
- Vercel detectará el push y publicará la web y el juego simultáneamente.
