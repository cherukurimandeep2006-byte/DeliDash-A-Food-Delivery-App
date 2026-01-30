# DeliDash Setup Guide

## 🎯 Complete Setup Instructions

### Step 1: Install Dependencies

#### Frontend Dependencies
```bash
# In the project root directory
npm install
```

#### Backend Dependencies
```bash
# Navigate to backend directory
cd backend
npm install
cd ..
```

### Step 2: Setup MongoDB

You have two options:

#### Option A: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Edition:**
   - Windows: Download from https://www.mongodb.com/try/download/community
   - macOS: `brew install mongodb-community`
   - Linux: Follow instructions at https://docs.mongodb.com/manual/administration/install-on-linux/

2. **Start MongoDB:**
   - Windows: MongoDB should start automatically as a service
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify MongoDB is running:**
   ```bash
   # Should connect without errors
   mongosh
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Use this connection string in your `.env` file

### Step 3: Configure Environment Variables

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Copy the example env file:**
   ```bash
   # Windows
   copy .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

3. **Edit the `.env` file:**

   For **Local MongoDB**:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/delidash
   JWT_SECRET=your-random-secret-key-here
   FRONTEND_URL=http://localhost:5173
   ```

   For **MongoDB Atlas**:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/delidash?retryWrites=true&w=majority
   JWT_SECRET=your-random-secret-key-here
   FRONTEND_URL=http://localhost:5173
   ```

   **Important:** Change `JWT_SECRET` to a random string!

   Optional: to upload avatars to Cloudinary instead of storing locally, add the following to your `.env` file and set them with your Cloudinary account values:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
   If these are not set, avatar uploads will be stored in the backend `uploads/` directory by default.

### Step 4: Seed the Database (Optional but Recommended)

This will populate your database with sample restaurants and a test user:

```bash
# From the backend directory
npm run seed
```

You should see:
```
✅ MongoDB connected successfully
✅ Sample restaurants created!
✅ Test user created - email: test@example.com, password: password123
```

### Step 5: Start the Application

#### Option 1: Using Start Scripts (Easiest)

**Windows:**
```bash
# From project root
start.bat
```

**macOS/Linux:**
```bash
# From project root
chmod +x start.sh
./start.sh
```

#### Option 2: Manual Start (Two Terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
# From project root
npm run dev
```

### Step 6: Access the Application

1. **Open your browser** and go to: http://localhost:5173

2. **Login with test credentials:**
   - Email: `test@example.com`
   - Password: `password123`

   Or create a new account by clicking "create a new account"

3. **Start exploring!** Browse restaurants, add items to cart, and place orders.

## ✅ Verification Checklist

- [ ] Node.js is installed (`node --version` shows v18+)
- [ ] MongoDB is running (local or Atlas)
- [ ] Frontend dependencies installed (`npm install` in root)
- [ ] Backend dependencies installed (`npm install` in backend)
- [ ] `.env` file created in backend directory
- [ ] Database seeded (`npm run seed` in backend)
- [ ] Backend server running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can access health check: http://localhost:5000/api/health
- [ ] Can login to the application

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Verify MongoDB is running:
   ```bash
   # For local MongoDB
   mongosh
   ```
2. Check your `MONGODB_URI` in `.env`
3. For Atlas, ensure your IP is whitelisted in Atlas dashboard

### Issue: "Port 5000 already in use"

**Solution:**
1. Change the PORT in backend/.env to a different number (e.g., 5001)
2. Update the proxy in vite.config.js to match

### Issue: "Port 5173 already in use"

**Solution:**
1. Change the port in vite.config.js
2. Update FRONTEND_URL in backend/.env

### Issue: "npm install" fails

**Solution:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure you have Node.js v18 or higher

### Issue: CORS errors in browser console

**Solution:**
1. Ensure backend is running on port 5000
2. Ensure frontend is running on port 5173
3. Check backend console for CORS messages

### Issue: "Failed to fetch" on login

**Solution:**
1. Check that backend is running (`http://localhost:5000/api/health`)
2. Open browser developer tools and check Network tab
3. Verify the API URL in `src/services/api.js`

## 📝 Development Tips

### Hot Reload
- Frontend has hot reload - changes appear instantly
- Backend requires restart after code changes (or use `nodemon`)

### Debugging
- Frontend: Use browser DevTools (F12)
- Backend: Check terminal output for logs
- Database: Use `mongosh` or MongoDB Compass

### Testing API Endpoints
Use tools like Postman or curl:
```bash
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🚀 Next Steps

Once everything is running:

1. **Explore the app** - Browse restaurants, add to cart, checkout
2. **Check the code** - Review the project structure in README.md
3. **Customize** - Modify colors, add features, etc.
4. **Deploy** - When ready, build for production with `npm run build`

## 📞 Need Help?

- Check browser console (F12) for frontend errors
- Check terminal for backend errors
- Review the MongoDB logs
- Ensure all environment variables are set correctly

---

**Happy coding! 🎉**
