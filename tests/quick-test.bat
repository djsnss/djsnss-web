@echo off
echo.
echo 🧪 NSS Backend Quick Health Check
echo ================================
echo.

REM Check if server is running
echo 📡 Checking server health...
curl -s http://localhost:8000/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Server is not responding!
    echo    Make sure your server is running: npm start
    echo.
    pause
    exit /b 1
)

echo ✅ Server is healthy!
echo.

REM Test basic endpoints
echo 📋 Testing basic endpoints...
echo.

echo Testing upcoming events...
curl -s -w "Response time: %%{time_total}s\n" http://localhost:8000/admin/getUpcomingEvents -o nul
echo.

echo Testing past events...
curl -s -w "Response time: %%{time_total}s\n" http://localhost:8000/admin/getPastEvents -o nul
echo.

echo Testing all events...
curl -s -w "Response time: %%{time_total}s\n" http://localhost:8000/admin/getAllEvents -o nul
echo.

REM Simulate concurrent users
echo 🚀 Simulating 10 concurrent users browsing events...
echo.

for /L %%i in (1,1,10) do (
    start /B curl -s http://localhost:8000/admin/getUpcomingEvents -o nul
)

timeout /t 3 /nobreak >nul
echo ✅ Concurrent test completed!
echo.

REM Test edge cases
echo 🔍 Testing edge cases...
echo.

echo Testing invalid event ID...
curl -s -w "Status: %%{http_code}\n" http://localhost:8000/admin/getEvent/invalid-id -o nul
echo.

echo Testing health endpoint...
curl -s http://localhost:8000/health
echo.

echo.
echo 🎉 All tests completed!
echo.
pause
