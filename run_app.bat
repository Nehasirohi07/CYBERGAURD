@echo off
title CyberGuard Toolkit
color 0A
echo.
echo  ============================================
echo   CyberGuard Security Toolkit - Startup
echo  ============================================
echo.

IF NOT EXIST .venv (
    echo [*] Creating virtual environment...
    python -m venv .venv
)

echo [*] Activating virtual environment...
call .venv\Scripts\activate.bat

echo [*] Installing / updating dependencies...
pip install -q -r requirements.txt

echo.
echo  ============================================
echo   Server starting at: http://127.0.0.1:5000
echo   Open your browser to the URL above!
echo  ============================================
echo.
python main.py
pause
