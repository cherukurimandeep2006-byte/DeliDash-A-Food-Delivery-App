#!/bin/bash

echo "================================"
echo "Starting DeliDash Application"
echo "================================"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup INT TERM

# Start backend
echo "Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to initialize
sleep 3

# Start frontend
echo "Starting Frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "================================"
echo "Both servers are running!"
echo "================================"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"
echo "================================"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
