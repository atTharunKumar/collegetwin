# College Twin - Setup & Deployment Checklist

Use this checklist to ensure everything is properly configured for both local development and production deployment.

## Local Development Setup

### Backend Setup
- [ ] MongoDB setup
  - [ ] Created MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
  - [ ] Created cluster and database
  - [ ] Created database user with credentials
  - [ ] Got connection string
  
- [ ] Backend configuration
  - [ ] Created `backend/.env` file (copy from `.env.example`)
  - [ ] Added `MONGODB_URI` with connection string
  - [ ] Set `CORS_ORIGIN=http://localhost:3000`
  - [ ] Port set to `5000` (or another available port)
  
- [ ] Backend installation
  - [ ] Navigated to `backend/` directory
  - [ ] Ran `npm install`
  - [ ] Ran `npm run dev`
  - [ ] Backend server started on `http://localhost:5000`
  - [ ] Health check passes: `curl http://localhost:5000/health`

### Frontend Setup
- [ ] Frontend configuration
  - [ ] Created `frontend/.env.local` (copy from `.env.example`)
  - [ ] Verified `NEXT_PUBLIC_API_URL=http://localhost:5000`
  
- [ ] Frontend installation
  - [ ] Navigated to `frontend/` directory
  - [ ] Ran `npm install`
  - [ ] Ran `npm run dev`
  - [ ] Frontend server started on `http://localhost:3000`
  - [ ] App loads without API errors

### Local Testing
- [ ] Backend functionality
  - [ ] GET `/api/courses` returns empty array or courses
  - [ ] POST `/api/courses` creates new course
  - [ ] PUT `/api/courses/:id` updates course
  - [ ] DELETE `/api/courses/:id` removes course

- [ ] Frontend functionality
  - [ ] App loads at `http://localhost:3000`
  - [ ] No CORS errors in browser console
  - [ ] API calls work from frontend
  - [ ] Data displays correctly

## Before Deployment

### Code Quality
- [ ] No console.log statements for debugging remain
- [ ] No .env files committed to git (only .env.example)
- [ ] No sensitive data in code or config files
- [ ] TypeScript compiles without errors
- [ ] Code follows project style guidelines

### Documentation
- [ ] README.md is up to date
- [ ] DEPLOYMENT.md covers all scenarios
- [ ] QUICKSTART.md is clear and accurate
- [ ] Comments explain complex logic
- [ ] Environment variable names are documented

### Git Setup
- [ ] Git repository initialized
- [ ] .gitignore properly configured (excludes .env, node_modules, etc.)
- [ ] Initial commit made with all changes
- [ ] Repository pushed to GitHub
- [ ] README visible in GitHub repository

## Frontend Deployment (Vercel)

### Pre-deployment
- [ ] Frontend code committed and pushed to GitHub
- [ ] All dependencies listed in `frontend/package.json`
- [ ] `frontend/vercel.json` exists with build config
- [ ] No MongoDB or backend code in frontend

### Vercel Setup
- [ ] Vercel account created at https://vercel.com
- [ ] GitHub repository connected to Vercel
- [ ] Project imported into Vercel
- [ ] Root directory set to `frontend`
- [ ] Build command is `npm run build`
- [ ] Output directory is `.next`

### Environment Variables (Frontend)
- [ ] Set `NEXT_PUBLIC_API_URL` to your backend URL
  - For local testing: `http://localhost:5000`
  - For production: Your deployed backend URL (e.g., `https://api.example.com`)
- [ ] No other secrets stored in Vercel environment
- [ ] Variables propagated to production deployment

### Deployment & Testing
- [ ] Frontend deployed successfully
- [ ] Frontend URL is accessible
- [ ] API requests work (check network tab)
- [ ] No CORS errors in production
- [ ] All features function correctly
- [ ] Responsive design works on mobile

## Backend Deployment (Choose One Provider)

### Option 1: Vercel
**Pre-deployment**
- [ ] Backend code committed and pushed to GitHub
- [ ] All dependencies listed in `backend/package.json`
- [ ] `backend/vercel.json` exists with server config
- [ ] `npm run build` produces `/dist` folder

**Vercel Setup**
- [ ] New Vercel project created for backend
- [ ] Root directory set to `backend`
- [ ] Environment variables configured:
  - [ ] `MONGODB_URI` = Your MongoDB connection string
  - [ ] `CORS_ORIGIN` = Your frontend URL (e.g., `https://example.vercel.app`)
  - [ ] `NODE_ENV` = `production`

**Deployment**
- [ ] Backend deployed successfully
- [ ] Backend URL works (e.g., `https://api-xxx.vercel.app`)
- [ ] Health check passes: `curl https://api-xxx.vercel.app/health`
- [ ] Update frontend `NEXT_PUBLIC_API_URL` with this URL
- [ ] Redeploy frontend with new API URL

### Option 2: Railway
**Pre-deployment**
- [ ] Pushed latest code to GitHub
- [ ] `backend/railway.json` exists
- [ ] `backend/.env.example` has all required vars

**Railway Setup**
- [ ] Railway account created at https://railway.app
- [ ] GitHub repository connected
- [ ] New project created
- [ ] Backend directory selected (`/backend`)
- [ ] Environment variables configured:
  - [ ] `MONGODB_URI` = Your MongoDB connection string
  - [ ] `CORS_ORIGIN` = Your frontend URL
  - [ ] `NODE_ENV` = `production`

**Deployment**
- [ ] Railway auto-deploys on push
- [ ] Check Railway logs for any errors
- [ ] Health check passes with Railway URL
- [ ] Update frontend `NEXT_PUBLIC_API_URL`
- [ ] Redeploy frontend

### Option 3: Render
**Pre-deployment**
- [ ] Pushed latest code to GitHub
- [ ] `backend/render.yaml` exists
- [ ] Node.js buildpack is available

**Render Setup**
- [ ] Render account created at https://render.com
- [ ] GitHub repository connected
- [ ] New Web Service created
- [ ] Repository selected
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `node dist/index.js`
- [ ] Environment variables configured:
  - [ ] `MONGODB_URI`
  - [ ] `CORS_ORIGIN`
  - [ ] `NODE_ENV=production`

**Deployment**
- [ ] Service deployed (check logs)
- [ ] Health check passes with Render URL
- [ ] API endpoints respond correctly
- [ ] Update frontend `NEXT_PUBLIC_API_URL`
- [ ] Redeploy frontend

### Option 4: Heroku (Paid Plan)
**Pre-deployment**
- [ ] Heroku CLI installed locally
- [ ] Logged into Heroku: `heroku login`

**Heroku Setup**
- [ ] App created: `heroku create collegetwin-backend`
- [ ] MongoDB URI added: `heroku config:set MONGODB_URI=...`
- [ ] CORS added: `heroku config:set CORS_ORIGIN=...`
- [ ] Environment set: `heroku config:set NODE_ENV=production`

**Deployment**
- [ ] Deployed: `git push heroku main`
- [ ] Check logs: `heroku logs --tail`
- [ ] Health check passes
- [ ] Update frontend with Heroku URL
- [ ] Redeploy frontend

## Post-Deployment Verification

### Frontend Verification
- [ ] Website loads at production URL
- [ ] All pages accessible
- [ ] No 404 errors for assets
- [ ] API calls work without CORS errors
- [ ] Data displays correctly
- [ ] Forms submit successfully
- [ ] Mobile responsive

### Backend Verification
- [ ] Health endpoint responds: `/health`
- [ ] API endpoints work:
  - [ ] `GET /api/courses`
  - [ ] `POST /api/courses`
  - [ ] `PUT /api/courses/:id`
  - [ ] `DELETE /api/courses/:id`
- [ ] Database operations work
- [ ] CORS allows frontend requests
- [ ] Logs show no errors

### Security Check
- [ ] No `.env` files in repository
- [ ] No API keys in code
- [ ] Environment variables properly set
- [ ] HTTPS enabled on both services
- [ ] CORS restricted to your domain
- [ ] Database password is secure

### Performance Check
- [ ] Frontend loads in < 3 seconds
- [ ] API responses in < 500ms
- [ ] Database queries are efficient
- [ ] No memory leaks in logs
- [ ] Error rates are low

## Post-Launch Monitoring

### Setup Monitoring
- [ ] Error tracking configured (e.g., Sentry)
- [ ] Analytics configured (e.g., Google Analytics)
- [ ] Uptime monitoring configured
- [ ] Log aggregation set up

### Regular Maintenance
- [ ] Check logs weekly for errors
- [ ] Update dependencies monthly
- [ ] Test all features regularly
- [ ] Monitor database performance
- [ ] Review security settings

## Troubleshooting

### Common Issues

**CORS Errors**
- [ ] Check `CORS_ORIGIN` matches frontend URL exactly
- [ ] Ensure HTTPS/HTTP protocol matches
- [ ] Verify backend is running
- [ ] Check browser console for error details

**MongoDB Connection Failed**
- [ ] Verify connection string is correct
- [ ] Check IP whitelist in MongoDB Atlas
- [ ] Test connection locally first
- [ ] Verify credentials are correct

**Backend Not Found (404)**
- [ ] Check backend deployment succeeded
- [ ] Verify backend URL in frontend environment
- [ ] Check network tab in browser dev tools
- [ ] Test API directly with curl

**Build Failures**
- [ ] Check build logs for specific errors
- [ ] Ensure all dependencies are in package.json
- [ ] Verify Node.js version compatibility
- [ ] Check for syntax errors

## Rollback Plan

- [ ] Previous working version tagged in Git
- [ ] Deployment can be reverted quickly
- [ ] Database backups exist
- [ ] Deployment procedure documented

## Final Sign-Off

- [ ] All items in this checklist completed
- [ ] Application tested end-to-end
- [ ] Team approves production release
- [ ] Deployment date/time scheduled
- [ ] Stakeholders notified of launch
- [ ] Post-launch monitoring plan in place

---

**Deployment ready!** Once all items are checked, you're ready to go live. 🚀
