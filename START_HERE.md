# College Twin - START HERE

Welcome! Your project has been successfully separated into a modern frontend/backend architecture. This file will guide you through the next steps.

## What Happened

Your mixed frontend/backend project has been professionally separated into:

- **`/frontend`** - Next.js application (React, TailwindCSS, UI components)
- **`/backend`** - Express.js API server (Node.js, MongoDB, REST API)

This separation allows each service to be developed, deployed, and scaled independently—fixing your Vercel deployment issues.

## Your Next Steps (in order)

### Step 1: Understand the New Structure (5 min)

**Read these files in this order:**

1. `PROJECT_SUMMARY.txt` - Overview of what was done
2. `README.md` - Complete project documentation
3. `QUICKSTART.md` - 5-minute local setup guide

### Step 2: Set Up MongoDB (5 min)

Choose one option:

**Option A: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Create a database user
5. Copy the connection string

**Option B: Local MongoDB**
- Install from https://www.mongodb.com/try/download/community
- Run it locally (instructions on their site)

**You'll need the connection string for Step 3.**

### Step 3: Run Locally (10 min)

**Terminal Window 1 - Backend:**

```bash
cd backend
cp .env.example .env
# Now edit .env and paste your MongoDB connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collegetwin
npm install
npm run dev
```

Backend should show: "Backend server running on http://localhost:5000"

**Terminal Window 2 - Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Frontend should show: "ready started server on 0.0.0.0:3000"

**Open browser:** http://localhost:3000

✅ If you see the dashboard, it works!

### Step 4: Test API Connectivity (2 min)

Open a new terminal and run:

```bash
curl http://localhost:5000/health
# Should return: {"status":"Backend is running"}

curl http://localhost:5000/api/courses
# Should return: [] or existing courses
```

If these work, your frontend-backend connection is working correctly.

### Step 5: Make a Test Change (5 min)

**Verify hot reload works:**

1. **Backend:** Edit `backend/src/routes/courses.ts` - add a comment
2. Backend terminal should show it reloaded automatically
3. **Frontend:** Edit `frontend/app/page.tsx` - add a comment  
4. Frontend browser should auto-refresh

Both services support hot reload during development!

## Common Questions

**Q: Why two ports (3000 & 5000)?**
A: Frontend runs on 3000, backend API on 5000. They communicate via HTTP. This is standard practice and allows independent scaling.

**Q: Do I have to run both in development?**
A: Yes, both services need to run for the app to work. That's why you need two terminal windows.

**Q: Can I change the ports?**
A: Yes! Edit `backend/.env` (PORT=5000) or start frontend with `npm run dev -- -p 3001`

**Q: What if MongoDB connection fails?**
A: Check your connection string in `backend/.env`. Make sure your IP is whitelisted in MongoDB Atlas.

**Q: How do I deploy?**
A: See `DEPLOYMENT.md` for step-by-step instructions for Vercel (frontend) and Railway/Render (backend).

**Q: What if I get CORS errors?**
A: Ensure `backend/.env` has `CORS_ORIGIN=http://localhost:3000` for local development.

## Documentation Reference

| File | Purpose | Read If |
|------|---------|---------|
| `README.md` | Full project docs | You want complete info |
| `QUICKSTART.md` | 5-min local setup | You want to run locally |
| `DEPLOYMENT.md` | Production deployment | You want to deploy |
| `SETUP_CHECKLIST.md` | Pre-deployment checklist | You're about to deploy |
| `COMMANDS_REFERENCE.md` | All commands | You need a command reference |
| `MIGRATION_SUMMARY.md` | What changed | You want technical details |
| `PROJECT_SUMMARY.txt` | Quick overview | You want a quick summary |

## Directory Structure at a Glance

```
collegetwin/
├── frontend/              ← Next.js (Port 3000)
│   ├── app/             ← Pages and layout
│   ├── components/      ← React components
│   ├── lib/api.ts       ← API client (calls backend)
│   └── .env.local       ← Frontend config
│
├── backend/              ← Express.js (Port 5000)
│   ├── src/
│   │   ├── index.ts     ← Main server
│   │   ├── routes/      ← API endpoints
│   │   ├── models/      ← Database models
│   │   └── config/      ← Configuration
│   └── .env             ← Backend config (you create this)
│
└── Documentation files (README, DEPLOYMENT, etc.)
```

## Troubleshooting Quick Links

**Problem: "Port 3000 already in use"**
- Solution: `npm run dev -- -p 3001` (frontend) or kill process using port

**Problem: "Cannot connect to MongoDB"**
- Solution: Check connection string in `backend/.env`, whitelist IP in Atlas

**Problem: "CORS error in browser console"**
- Solution: Ensure `CORS_ORIGIN=http://localhost:3000` in `backend/.env`

**Problem: "API returns 404"**
- Solution: Make sure backend is running on port 5000

**Problem: "npm install fails"**
- Solution: Try `npm install --legacy-peer-deps`

See `QUICKSTART.md` for more troubleshooting.

## Ready to Deploy?

Once everything works locally:

1. **Read:** `DEPLOYMENT.md` (comprehensive deployment guide)
2. **Use:** `SETUP_CHECKLIST.md` (verify everything before deploying)
3. **Deploy Frontend:** Vercel (free, automatic HTTPS)
4. **Deploy Backend:** Railway or Render (free tier available)
5. **Update:** `NEXT_PUBLIC_API_URL` with production backend URL

## Summary

You now have:

✅ Professional frontend/backend separation
✅ Independent services that run separately
✅ Backend API on port 5000
✅ Frontend UI on port 3000
✅ Easy local development with hot reload
✅ Proper deployment configuration
✅ Complete documentation

**Next action:** Follow QUICKSTART.md steps to run locally!

---

**Questions?** Check the relevant documentation file above. Everything is documented!

**Ready to deploy?** See DEPLOYMENT.md for complete instructions.

---

Happy coding! 🚀
