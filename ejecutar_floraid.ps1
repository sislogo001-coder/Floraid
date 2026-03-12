# FloraID - Ejecutar aplicacion
cd "$PSScriptRoot"
Write-Host "Iniciando FloraID..." -ForegroundColor Green
Write-Host "La app estara disponible en: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow
Write-Host ""
npm run dev
