@echo off
echo ==========================================
echo     Spotify Clone MongoDB Backend
echo ==========================================
echo.

echo Step 1: Update your MongoDB credentials
echo ----------------------------------------
echo Please update the .env file with your MongoDB credentials:
echo 1. Replace <db_username> with your MongoDB username
echo 2. Replace <db_password> with your MongoDB password
echo.

echo Step 2: Start the backend server
echo ---------------------------------
echo Choose an option:
echo [1] Test MongoDB connection
echo [2] Start development server
echo [3] Start production server
echo [4] Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Testing MongoDB connection...
    node test-connection.js
    pause
    goto :start
)

if "%choice%"=="2" (
    echo.
    echo Starting development server...
    npm run dev
)

if "%choice%"=="3" (
    echo.
    echo Starting production server...
    npm start
)

if "%choice%"=="4" (
    echo Goodbye!
    exit
)

echo Invalid choice. Please try again.
pause
goto :start

:start