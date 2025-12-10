#!/bin/bash

# Start script for Prinstine Group Website
# This script starts both backend and frontend servers

echo "🚀 Starting Prinstine Group Website..."
echo ""

# Check if backend is already running
if lsof -ti:5000 > /dev/null 2>&1; then
    echo "⚠️  Backend server already running on port 5000"
else
    echo "📦 Starting backend server..."
    cd backend
    npm start > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo "✅ Backend server started (PID: $BACKEND_PID)"
    cd ..
    sleep 2
fi

# Check if frontend is already running
if lsof -ti:3007 > /dev/null 2>&1; then
    echo "⚠️  Frontend server already running on port 3007"
else
    echo "🎨 Starting frontend server..."
    cd prinstine-website
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo "✅ Frontend server started (PID: $FRONTEND_PID)"
    cd ..
    sleep 3
fi

echo ""
echo "✅ Servers are running!"
echo ""
echo "🌐 Frontend: http://localhost:3007"
echo "🔧 Backend:  http://localhost:5000"
echo "💚 Health:   http://localhost:5000/api/health"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 To stop servers:"
echo "   pkill -f 'node.*backend/index.js'"
echo "   pkill -f 'vite'"

