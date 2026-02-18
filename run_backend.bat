@echo off
echo Starting StyleSense AI Backend...
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
pause
