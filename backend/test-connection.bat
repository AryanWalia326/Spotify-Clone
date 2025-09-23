@echo off
echo 🧪 Testing MongoDB Connection...
echo.
node test-connection.js
echo.
echo 💡 If you see an authentication error:
echo    1. Update your .env file with real MongoDB credentials
echo    2. Check .env.example for the correct format
echo    3. Run this test again
echo.
pause