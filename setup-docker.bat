@echo off
echo Setting up RabbitMQ Sender/Listener Demo for Docker...
echo.

echo 1. Installing dependencies...
call npm install

echo.
echo 2. Starting all services in Docker...
call npm run setup:docker

echo.
echo 3. Testing connection...
call npm run test:docker

echo.
echo Setup complete! You can now:
echo   View logs: docker-compose -f docker-compose.app.yml logs -f
echo   Stop services: npm run docker:stop
echo   Scale listeners: docker-compose -f docker-compose.app.yml up --scale listener=3
echo.
pause 