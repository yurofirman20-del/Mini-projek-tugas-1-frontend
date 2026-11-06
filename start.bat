@echo off
title Pesona Wisata Server
echo ===================================================
echo   Memulai Server Destinasi Wisata...
echo ===================================================
echo.
cd /d "%~dp0"
start "" "http://localhost:3000"
node "..\backend\server.js"
pause

