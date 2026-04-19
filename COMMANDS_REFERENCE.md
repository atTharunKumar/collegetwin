# College Twin - Commands Reference

Quick reference for all common commands used during development and deployment.

## Local Development Commands

### Backend Commands

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check code style
npm run lint

# View .env.example template
cat .env.example
```

### Frontend Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check code style
npm run lint

# View .env.example template
cat .env.example
```

## Using Startup Scripts

### macOS/Linux

```bash
# Start backend in terminal 1
./start-dev.sh backend

# Start frontend in terminal 2
./start-dev.sh frontend

# View usage
./start-dev.sh

# Make script executable if needed
chmod +x start-dev.sh
```

### Windows

```bash
# Start backend in Command Prompt 1
start-dev.bat backend

# Start frontend in Command Prompt 2
start-dev.bat frontend

# View usage
start-dev.bat
```

## Testing Commands

### Test Backend API (Using curl)

```bash
# Health check
curl http://localhost:5000/health

# Get all courses
curl http://localhost:5000/api/courses

# Get specific course
curl http://localhost:5000/api/courses/COURSE_ID

# Create course
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Course Name","faculty":"Faculty","slot":"A1","room":"101","students":30,"clashRisk":0}'

# Update course
curl -X PUT http://localhost:5000/api/courses/COURSE_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

# Delete course
curl -X DELETE http://localhost:5000/api/courses/COURSE_ID
```

### Test with httpie (easier alternative to curl)

```bash
# Install httpie: npm install -g httpie

# Health check
http GET localhost:5000/health

# Get courses
http GET localhost:5000/api/courses

# Create course
http POST localhost:5000/api/courses \
  name="Course Name" \
  faculty="Faculty" \
  slot="A1" \
  room="101" \
  students:=30 \
  clashRisk:=0
```

## Port Management Commands

### Check if ports are in use

**macOS/Linux:**
```bash
# Check port 3000 (frontend)
lsof -i :3000

# Check port 5000 (backend)
lsof -i :5000

# Kill process on port (example: port 5000)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Windows:**
```bash
# Check port 5000
netstat -ano | findstr :5000

# Kill process on port (replace PID with actual number)
taskkill /PID <PID> /F
```

## Git Commands

### Initial Setup

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Separate frontend and backend"

# Add GitHub remote
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git push -u origin main
```

### Regular Workflow

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Descriptive message"

# Push to GitHub
git push

# View recent commits
git log --oneline -10

# Create new branch
git checkout -b feature/feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name
```

## Environment Setup Commands

### Create .env files

```bash
# Backend .env
cd backend
cp .env.example .env
# Then edit .env with your MongoDB URI

# Frontend .env.local
cd ../frontend
cp .env.example .env.local
# .env.local is already configured
```

### View environment variables

```bash
# Backend
cd backend
cat .env

# Frontend
cd frontend
cat .env.local

# View without editing
grep "=" .env
```

## Docker Commands (Optional)

If you want to run services in Docker:

```bash
# Build backend image
docker build -t collegetwin-backend ./backend

# Run backend container
docker run -p 5000:5000 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e CORS_ORIGIN="http://localhost:3000" \
  collegetwin-backend

# Build frontend image
docker build -t collegetwin-frontend ./frontend

# Run frontend container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL="http://localhost:5000" \
  collegetwin-frontend
```

## Deployment Commands

### Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy frontend
cd frontend
vercel

# Deploy backend
cd backend
vercel

# View deployment logs
vercel logs

# Configure environment
vercel env add NEXT_PUBLIC_API_URL
```

### Heroku CLI

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create collegetwin-backend

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set CORS_ORIGIN="your_frontend_url"

# View logs
heroku logs --tail

# Deploy
git push heroku main
```

### Railway CLI

```bash
# Install Railway CLI
curl -fsSL cli.new.railway.app | sh

# Login
railway login

# Deploy
railway up

# View logs
railway logs
```

## Database Commands

### MongoDB Shell (mongosh)

```bash
# Connect to MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/collegetwin"

# List databases
show dbs

# Use collegetwin database
use collegetwin

# List collections
show collections

# View all courses
db.courses.find()

# View specific course
db.courses.findOne({ id: "123" })

# Count courses
db.courses.countDocuments()

# Delete all courses
db.courses.deleteMany({})

# Exit
exit
```

## Node Process Management

### Using npm

```bash
# Run in background (basic)
npm run dev &

# Run with nohup (survives terminal close)
nohup npm run dev &

# View running processes
ps aux | grep node
```

### Using pm2 (recommended for production)

```bash
# Install pm2
npm install -g pm2

# Start backend
pm2 start npm --name "backend" -- run dev

# Start frontend
pm2 start npm --name "frontend" -- run dev

# View running processes
pm2 list

# View logs
pm2 logs backend

# Stop process
pm2 stop backend

# Restart process
pm2 restart backend

# Delete process
pm2 delete backend
```

## Useful Utility Commands

### Check Node/npm versions

```bash
node --version
npm --version
```

### Clean install (if dependencies are broken)

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### View package dependencies

```bash
# Backend
cd backend
npm list

# Frontend (excluding nested deps)
cd ../frontend
npm list --depth=0
```

### Find large files

```bash
# Find files larger than 1MB
find . -size +1M -type f

# In specific directory
find ./node_modules -size +1M -type f 2>/dev/null | head -10
```

## Debugging Commands

### Check API connectivity

```bash
# Test backend health
curl -v http://localhost:5000/health

# Test from frontend
curl -v http://localhost:5000/api/courses

# Test CORS headers
curl -i -X OPTIONS http://localhost:5000/api/courses \
  -H "Origin: http://localhost:3000"
```

### View logs

```bash
# Backend logs (from backend terminal)
# Logs appear directly in terminal

# Frontend logs
# Check browser console: F12 or Cmd+Option+J

# Check if MongoDB is running
# macOS: ps aux | grep mongod
# Linux: systemctl status mongod
# Windows: tasklist | findstr mongod
```

## Common Issues & Fixes

### Port already in use

```bash
# Find what's using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in .env
PORT=5001
```

### Module not found errors

```bash
# Reinstall dependencies
npm install

# Clear npm cache
npm cache clean --force

# Try with --legacy-peer-deps
npm install --legacy-peer-deps
```

### MongoDB connection issues

```bash
# Test MongoDB connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/collegetwin"

# Verify connection string is correct in .env
# Check MongoDB Atlas IP whitelist
```

## Quick Reference Checklist

- [ ] Install Node.js 18+
- [ ] Clone repository from GitHub
- [ ] Create MongoDB Atlas account and cluster
- [ ] Create `backend/.env` with MongoDB URI
- [ ] Create `frontend/.env.local` (use template)
- [ ] Run `npm install` in both directories
- [ ] Start backend: `npm run dev` in backend/
- [ ] Start frontend: `npm run dev` in frontend/
- [ ] Visit http://localhost:3000
- [ ] Commit and push to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway/Render
- [ ] Update `NEXT_PUBLIC_API_URL` in production
- [ ] Test production deployment
- [ ] Monitor logs for errors

---

**Bookmark this page for quick command reference during development!**
