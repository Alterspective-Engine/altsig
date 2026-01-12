@echo off
REM ================================================================
REM AltSig - Alterspective Email Signature Generator
REM ================================================================
REM Local Development Server
REM
REM Production URL: https://brave-stone-0b7eb4800.3.azurestaticapps.net
REM Local Dev URL:  http://localhost:3000
REM
REM This serves the static files from /public directory
REM ================================================================

echo.
echo ============================================================
echo   AltSig - Email Signature Generator
echo ============================================================
echo   Starting local development server...
echo   URL: http://localhost:3000
echo.
echo   Production: Azure Static Web Apps
echo   Repo: https://github.com/Alterspective-Engine/altsig
echo ============================================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start the serve server
npm run serve
