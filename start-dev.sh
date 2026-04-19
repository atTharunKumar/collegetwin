#!/bin/bash

# College Twin - Local Development Startup Script

echo "========================================"
echo "College Twin - Starting Development"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 18+."
    exit 1
fi

echo "Node version: $(node --version)"
echo ""

# Function to start backend
start_backend() {
    echo "Starting Backend Server..."
    cd backend
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "Installing backend dependencies..."
        npm install
    fi
    
    npm run dev
}

# Function to start frontend
start_frontend() {
    echo "Starting Frontend Server..."
    cd frontend
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "Installing frontend dependencies..."
        npm install
    fi
    
    npm run dev
}

# Check arguments
if [ "$1" == "backend" ]; then
    start_backend
elif [ "$1" == "frontend" ]; then
    start_frontend
else
    echo "Usage: ./start-dev.sh [backend|frontend]"
    echo ""
    echo "Examples:"
    echo "  ./start-dev.sh backend   - Start only the backend server"
    echo "  ./start-dev.sh frontend  - Start only the frontend server"
    echo ""
    echo "For development, open two terminal windows and run:"
    echo "  Terminal 1: ./start-dev.sh backend"
    echo "  Terminal 2: ./start-dev.sh frontend"
    echo ""
    echo "Then visit: http://localhost:3000"
    exit 0
fi
