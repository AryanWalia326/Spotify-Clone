@echo off
echo 🎵 Spotify Clone - Full Stack Application
echo ==========================================
echo.

echo 📁 Project Structure:
echo   frontend/  - HTML, CSS, JS client
echo   backend/   - Node.js API server
echo.

echo 🚀 Quick Start Options:
echo [1] Start Backend Server (Required first)
echo [2] Start Frontend Application
echo [3] Start Both (Backend then Frontend)
echo [4] View Documentation
echo [5] Setup Help
echo [Q] Quit
echo.

:start
set /p choice="Enter your choice (1-5 or Q): "

if /i "%choice%"=="1" (
    echo.
    echo 🔄 Starting Backend Server...
    cd backend
    call start.bat
    cd ..
    goto end
)

if /i "%choice%"=="2" (
    echo.
    echo 🎨 Starting Frontend Application...
    cd frontend
    call start.bat
    cd ..
    goto end
)

if /i "%choice%"=="3" (
    echo.
    echo 🚀 Starting Full Stack Application...
    echo.
    echo 🔧 Step 1: Starting Backend Server...
    start cmd /k "cd backend && npm run dev"
    timeout /t 3 /nobreak >nul
    echo.
    echo 🎨 Step 2: Starting Frontend Application...
    cd frontend
    call start.bat
    cd ..
    goto end
)

if /i "%choice%"=="4" (
    echo.
    echo 📚 Documentation Files:
    echo   README.md              - Main project overview
    echo   frontend/README.md     - Frontend documentation
    echo   backend/README.md      - Backend API documentation
    echo   MONGODB_SETUP.md       - Database setup guide
    echo   AUTH_README.md         - Authentication guide
    echo   README_MONGODB.md      - MongoDB integration guide
    echo.
    echo Opening main README...
    start README.md
    echo.
    pause
    goto start
)

if /i "%choice%"=="5" (
    echo.
    echo 🆘 Setup Help:
    echo.
    echo ✅ Prerequisites:
    echo   - Node.js installed
    echo   - MongoDB Atlas account
    echo   - Modern web browser
    echo.
    echo 🔧 Setup Steps:
    echo   1. Configure backend/.env with MongoDB credentials
    echo   2. Run: cd backend && npm install
    echo   3. Test: cd backend && node test-connection.js
    echo   4. Start backend: cd backend && npm run dev
    echo   5. Start frontend: cd frontend && python -m http.server 3000
    echo.
    echo 🌐 Access Points:
    echo   Frontend: http://localhost:3000
    echo   Backend:  http://localhost:5000
    echo   API:      http://localhost:5000/api/health
    echo.
    echo 📖 For detailed setup, see MONGODB_SETUP.md
    echo.
    pause
    goto start
)

if /i "%choice%"=="Q" (
    echo.
    echo 👋 Thanks for using Spotify Clone!
    goto end
)

echo ❌ Invalid choice. Please try again.
echo.
goto start

:end
pause