@echo off
echo ================================
echo Starting DeliDash Application
echo ================================
echo.

REM Start backend in a new window
echo Starting Backend Server...
start "DeliDash Backend" cmd /k "cd backend && npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend in a new window
echo Starting Frontend...
start "DeliDash Frontend" cmd /k "npm run dev"

echo.
echo ================================
echo Both servers are starting!
echo ================================
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo ================================
echo.
echo Press any key to close this window...
pause > nul
