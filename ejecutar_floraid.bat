@echo off
echo ========================================
echo   FloraID - Iniciando aplicacion
echo ========================================
echo.

cd /d "%~dp0"

echo.
echo Iniciando servidor...
echo.
npm run dev 2>&1

echo.
echo El servidor se detuvo. Presiona una tecla para salir...
pause
