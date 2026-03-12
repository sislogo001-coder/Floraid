@echo off
cd /d "%~dp0"
title FloraID Servidor
echo Iniciando FloraID...
echo.
node_modules\.bin\next dev -p 3000
