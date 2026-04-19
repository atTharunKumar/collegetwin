# Quick Start Guide

Get College Twin running locally in 5 minutes!

## Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB ([Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas))
- Git

## One-Time Setup

### 1. Clone/Setup MongoDB

**Option A: MongoDB Atlas (Cloud - Easiest)**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Create database user
4. Copy connection string
5. Keep this string for later

**Option B: Local MongoDB**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community

# Linux
sudo apt-get install mongodb
sudo systemctl start mongod
```

### 2. Clone Repository
```bash
git clone <your-repo-url>
cd collegetwin
```

### 3. Backend Setup

```bash
cd backend

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collegetwin
```

### 4. Frontend Setup

```bash
cd ../frontend

# Create .env.local file
cp .env.example .env.local

# Leave default settings (NEXT_PUBLIC_API_URL=http://localhost:5000)
```

## Running Locally

### Easy Way (Using Scripts)

**On macOS/Linux:**
```bash
# Terminal 1
./start-dev.sh backend

# Terminal 2 (new window)
./start-dev.sh frontend
```

**On Windows:**
```bash
# Command Prompt 1
start-dev.bat backend

# Command Prompt 2 (new window)
start-dev.bat frontend
```

### Manual Way

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:3000`

## Access the App

Open your browser and go to:
```
http://localhost:3000
```

You should see the College Twin dashboard!

## Troubleshooting

### Backend not starting?
```bash
# Check if port 5000 is in use
# macOS/Linux: lsof -i :5000
# Windows: netstat -ano | findstr :5000

# Try a different port
# Edit backend/.env and change PORT=5001
```

### MongoDB connection error?
```bash
# Test connection with MongoDB CLI
mongosh "mongodb+srv://username:password@cluster.mongodb.net/collegetwin"

# Make sure connection string is correct in .env
# Make sure MongoDB IP is whitelisted (for Atlas)
```

### Frontend can't reach backend?
```bash
# Check NEXT_PUBLIC_API_URL in frontend/.env.local
# Should be: http://localhost:5000

# Check browser console for CORS errors
# Backend should show CORS allowed for http://localhost:3000
```

### Port already in use?
```bash
# Backend (default 5000)
# Edit backend/.env: PORT=5001

# Frontend (default 3000)
# Run: npm run dev -- -p 3001
```

## Next Steps

1. **Explore the code:**
   - Frontend: `frontend/components/` and `frontend/app/`
   - Backend: `backend/src/routes/` and `backend/src/models/`

2. **Make changes:**
   - Both servers support hot reload (auto-refresh on file change)

3. **Deploy:**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment guide

## File Structure

```
collegetwin/
├── frontend/          # Next.js frontend (port 3000)
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── package.json
├── backend/           # Express backend (port 5000)
│   ├── src/
│   ├── .env.example
│   └── package.json
├── README.md          # Full documentation
├── DEPLOYMENT.md      # Deployment guide
└── QUICKSTART.md      # This file
```

## Common Commands

### Backend
```bash
cd backend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check code quality
```

### Frontend
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Check code quality
```

## Environment Variables Quick Reference

### Backend (`backend/.env`)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Need Help?

1. Check the full [README.md](./README.md)
2. Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
3. Check backend logs: Terminal running backend
4. Check frontend logs: Browser console (F12)
5. Check MongoDB logs: `mongosh` connection test

Happy coding! 🚀
