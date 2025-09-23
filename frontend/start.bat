@echo off
echo 🎵 Starting Spotify Clone Frontend
echo ==================================
echo.

echo 📋 Frontend starting on http://localhost:3000
echo 🔗 Make sure backend is running on http://localhost:5000
echo 🌐 You can also access via file:// protocol (limited functionality)
echo.

echo 🚀 Choose your preferred method:
echo [1] Python HTTP Server (Recommended)
echo [2] Open with default browser (Limited CORS)
echo [3] Instructions for other servers
echo [Q] Quit
echo.

set /p choice="Enter your choice (1, 2, 3, or Q): "

if /i "%choice%"=="1" (
    echo.
    echo 🐍 Starting Python HTTP Server...
    echo 📍 Access at: http://localhost:3000
    echo 🛑 Press Ctrl+C to stop
    echo.
    python -m http.server 3000
    goto end
)

if /i "%choice%"=="2" (
    echo.
    echo 🌐 Opening with default browser...
    echo ⚠️  Note: Some features may not work due to CORS restrictions
    start index.html
    goto end
)

if /i "%choice%"=="3" (
    echo.
    echo 📚 Alternative server options:
    echo.
    echo Node.js HTTP Server:
    echo   npx http-server -p 3000
    echo.
    echo VS Code Live Server:
    echo   1. Install Live Server extension
    echo   2. Right-click index.html
    echo   3. Select "Open with Live Server"
    echo.
    echo PHP Built-in Server:
    echo   php -S localhost:3000
    echo.
    echo Static File Servers:
    echo   - serve ^(npm install -g serve^)
    echo   - http-server ^(npm install -g http-server^)
    echo.
    pause
    goto end
)

if /i "%choice%"=="Q" (
    echo Goodbye! 👋
    goto end
)

echo Invalid choice. Please try again.
pause
goto start

:end
echo.
echo 🎶 Thanks for using Spotify Clone!
pause