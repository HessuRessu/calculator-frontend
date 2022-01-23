@ECHO OFF

SET APP_NAME=calculator-frontend

if "%~1" == "start" goto start
if "%~1" == "stop" goto stop
if "%~1" == "build" goto build
if "%~1" == "logs" goto logs
goto end

:start
docker run -d --name %APP_NAME% -p 8080:8080 %APP_NAME%
goto end

:stop
docker stop %APP_NAME%
docker rm %APP_NAME%
goto end

:build
docker build -t %APP_NAME% -f Dockerfile .
goto end

:logs
docker logs -f %APP_NAME%
goto end

:end