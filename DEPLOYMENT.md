# Deployment Guide

This guide covers how to deploy College Twin to production using various hosting providers.

## Table of Contents
- [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
- [Backend Deployment (Multiple Options)](#backend-deployment)
  - [Vercel](#backend-vercel)
  - [Railway](#backend-railway)
  - [Render](#backend-render)
  - [Heroku](#backend-heroku)

---

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account with the code pushed
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Separate frontend and backend"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in or create an account
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Build Settings**
   - Set "Root Directory" to `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     ```
   - Replace with your actual backend URL

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your frontend will be available at `your-project.vercel.app`

---

## Backend Deployment

### Option 1: Vercel

Works best for smaller projects with the Serverless approach.

1. **Configure Root Directory**
   - In Vercel, set "Root Directory" to `backend`

2. **Set Environment Variables**
   - Go to Settings → Environment Variables
   - Add:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collegetwin
     CORS_ORIGIN=https://your-frontend-url.vercel.app
     NODE_ENV=production
     ```

3. **Deploy**
   - Click "Deploy"
   - Backend will be at `your-backend.vercel.app`

---

### Option 2: Railway (Recommended)

Railway is excellent for Node.js backends and offers a generous free tier.

#### Steps

1. **Push Code to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

3. **Create New Project**
   - Click "Create Project" → "Deploy from GitHub repo"
   - Select your repository

4. **Configure Build**
   - Railway auto-detects Node.js projects
   - The `railway.json` file provides build instructions

5. **Set Environment Variables**
   - In Railway dashboard, go to Variables
   - Add:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collegetwin
     CORS_ORIGIN=https://your-frontend-url.vercel.app
     NODE_ENV=production
     PORT=5000
     ```

6. **Deploy**
   - Railway automatically deploys on push
   - Your backend will be at `your-project.railway.app` (or custom domain)

7. **View Logs**
   - Railway shows real-time logs in dashboard

---

### Option 3: Render

Render offers easy deployments with good free tier support.

#### Steps

1. **Push Code to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New" → "Web Service"
   - Select your repository

4. **Configure**
   - Name: `collegetwin-backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `node dist/index.js`
   - Region: Choose closest to your data

5. **Set Environment Variables**
   - In Render, go to Environment
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collegetwin
     CORS_ORIGIN=https://your-frontend-url.vercel.app
     NODE_ENV=production
     ```

6. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy
   - Backend available at `your-service.onrender.com`

---

### Option 4: Heroku

Heroku no longer offers free tier, but it's still a solid option for paid deployments.

#### Steps

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create collegetwin-backend
   ```

4. **Add MongoDB URI**
   ```bash
   heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collegetwin
   heroku config:set CORS_ORIGIN=https://your-frontend-url.vercel.app
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View Logs**
   ```bash
   heroku logs --tail
   ```

---

## Post-Deployment

### 1. Update Frontend Environment
Once backend is deployed, update the frontend's `NEXT_PUBLIC_API_URL`:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### 2. Test API Endpoints
```bash
curl https://your-backend-url.com/health
# Should return: {"status": "Backend is running"}
```

### 3. Test CORS
Make sure the frontend can communicate with the backend. Check browser console for CORS errors.

### 4. Monitor Logs
- **Vercel**: Dashboard → Functions → Logs
- **Railway**: Dashboard → Logs
- **Render**: Service page → Logs
- **Heroku**: `heroku logs --tail`

### 5. Set Up Custom Domain (Optional)
Most providers allow you to add a custom domain. Instructions vary by provider.

---

## Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` matches your frontend URL exactly
- Include protocol (https://)

### MongoDB Connection Issues
- Verify `MONGODB_URI` is correct
- Check MongoDB whitelist for IP addresses
- For Atlas, ensure IP is whitelisted

### Build Failures
- Check build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### 404 Errors on API Routes
- Ensure backend deployment was successful
- Verify API endpoint paths in code
- Check `NEXT_PUBLIC_API_URL` in frontend

---

## Database Setup

### MongoDB Atlas (Recommended)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string
5. Update `MONGODB_URI` in backend environment variables

### Local MongoDB
For development only:
```bash
MONGODB_URI=mongodb://localhost:27017/collegetwin
```

---

## Environment Variables Summary

### Frontend (.env.local / Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend (.env / Deployment Platform)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collegetwin
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
PORT=5000
```

---

## Support

For issues with specific platforms:
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Railway**: [railway.app/docs](https://railway.app/docs)
- **Render**: [render.com/docs](https://render.com/docs)
- **Heroku**: [devcenter.heroku.com](https://devcenter.heroku.com)
