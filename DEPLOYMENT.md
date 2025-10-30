# Deployment Guide for LinkNest

## 📦 GitHub Repository
Your code is now live at: **https://github.com/AADHIASARANATAMIZHINIAN/MERN_LinkNest**

---

## 🚀 Deploy Backend (Render.com - Free)

### Step 1: Sign up on Render
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `MERN_LinkNest`
3. Configure:
   - **Name**: `linknest-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Step 3: Add Environment Variables
In Render dashboard, add these environment variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment (3-5 minutes)
- Copy your backend URL (e.g., `https://linknest-backend.onrender.com`)

---

## 🌐 Deploy Frontend (Vercel - Free)

### Step 1: Update API URL
Before deploying frontend, update the backend URL:

**File**: `frontend/src/utils/api.js`
```javascript
const API_URL = 'https://your-backend-url.onrender.com/api';
// Replace with your Render backend URL
```

Commit and push changes:
```bash
cd "d:\downloads\FULL STACK APP"
git add .
git commit -m "Update API URL for production"
git push origin main
```

### Step 2: Sign up on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account

### Step 3: Deploy
1. Click "Add New" → "Project"
2. Import your GitHub repository: `MERN_LinkNest`
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Click "Deploy"
5. Wait 2-3 minutes

Your app will be live at: `https://your-app.vercel.app`

---

## 🗄️ MongoDB Atlas Setup

### Create Free MongoDB Database
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (Free M0 tier)
4. Create database user (username & password)
5. Whitelist IP: Add `0.0.0.0/0` (allow all IPs)
6. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/linknest?retryWrites=true&w=majority
   ```
7. Replace `<username>` and `<password>` with your credentials
8. Use this as `MONGO_URI` in Render environment variables

---

## ⚙️ Alternative: Deploy on Railway

### Backend on Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `MERN_LinkNest`
5. Add service → Select `backend` folder
6. Add environment variables (MONGO_URI, JWT_SECRET, PORT)
7. Deploy

---

## 🎯 Quick Deployment Checklist

### Before Deployment:
- [ ] MongoDB Atlas database created
- [ ] Get MongoDB connection string
- [ ] Generate strong JWT_SECRET (random string)
- [ ] Backend deployed on Render/Railway
- [ ] Copy backend URL
- [ ] Update frontend API URL
- [ ] Push changes to GitHub
- [ ] Deploy frontend on Vercel/Netlify

### After Deployment:
- [ ] Test login/signup
- [ ] Test creating posts
- [ ] Test profile updates
- [ ] Check mobile responsiveness
- [ ] Verify all features work

---

## 🔧 Environment Variables

### Backend (.env on Render/Railway)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/linknest
JWT_SECRET=your_super_secret_jwt_key_12345
PORT=5000
```

### Generate JWT Secret
Use any of these methods:
```bash
# Method 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Method 2: Online
# Visit: https://randomkeygen.com/
```

---

## 📱 Test Your Deployment

### Backend Health Check
Visit: `https://your-backend.onrender.com/api/posts`
Should return: `[]` or list of posts

### Frontend
Visit: `https://your-app.vercel.app`
- Try signup
- Try login
- Create a post
- Test on mobile

---

## 🐛 Troubleshooting

### Backend Issues
- **503 Error**: Backend is sleeping (Render free tier), wait 30 seconds
- **Connection Error**: Check MONGO_URI is correct
- **401 Unauthorized**: Check JWT_SECRET matches

### Frontend Issues
- **API Error**: Verify backend URL in `api.js`
- **CORS Error**: Backend should have CORS enabled (already configured)
- **Build Failed**: Check for syntax errors

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Check Render logs for backend errors
3. Verify environment variables
4. Make sure MongoDB is connected

---

## 🎉 Success!

Once deployed, share your app:
- **GitHub**: https://github.com/AADHIASARANATAMIZHINIAN/MERN_LinkNest
- **Frontend**: Your Vercel URL
- **Backend API**: Your Render URL

**Congratulations on deploying your full-stack social media app!** 🚀
