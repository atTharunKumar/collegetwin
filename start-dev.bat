@echo off
REM College Twin - Local Development Startup Script for Windows

echo ========================================
echo College Twin - Starting Development
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo Error: Node.js is not installed. Please install Node.js 18+.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node version: %NODE_VERSION%
echo.

setlocal enabledelayedexpansion

if "%1"=="backend" (
    echo Starting Backend Server...
    cd backend
    
    if not exist "node_modules" (
        echo Installing backend dependencies...
        call npm install
    )
    
    call npm run dev
) else if "%1"=="frontend" (
    echo Starting Frontend Server...
    cd frontend
    
    if not exist "node_modules" (
        echo Installing frontend dependencies...
        call npm install
    )
    
    call npm run dev
) else (
    echo Usage: start-dev.bat [backend^|frontend]
    echo.
    echo Examples:
    echo   start-dev.bat backend   - Start only the backend server
    echo   start-dev.bat frontend  - Start only the frontend server
    echo.
    echo For development, open two command prompts and run:
    echo   Prompt 1: start-dev.bat backend
    echo   Prompt 2: start-dev.bat frontend
    echo.
    echo Then visit: http://localhost:3000
    exit /b 0
)
