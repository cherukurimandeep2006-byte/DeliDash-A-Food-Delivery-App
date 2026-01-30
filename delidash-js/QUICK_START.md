# DeliDash - Quick Start Guide 🚀

## ⚡ Get Running in 5 Minutes

### Prerequisites
- Node.js v18+ installed
- MongoDB installed OR MongoDB Atlas account

### Step 1: Install Dependencies (2 minutes)
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### Step 2: Setup MongoDB (1 minute)

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running
mongosh  # Should connect without errors
```

**Option B: MongoDB Atlas**
- Get connection string from Atlas dashboard
- It looks like: `mongodb+srv://username:password@cluster.mongodb.net/delidash`

### Step 3: Configure Backend (1 minute)
```bash
cd backend
cp .env.example .env
# Edit .env file and set your MONGODB_URI
cd ..
```

**Example `.env`:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/delidash
JWT_SECRET=change-this-to-random-string
FRONTEND_URL=http://localhost:5173
```

### Step 4: Seed Database (30 seconds)
```bash
cd backend
npm run seed
cd ..
```

### Step 5: Start Everything (30 seconds)

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**Or manually (two terminals):**
```bash
# Terminal 1
cd backend
npm start

# Terminal 2
npm run dev
```

### Step 6: Open Application
1. Go to: http://localhost:5173
2. Login with:
   - Email: `test@example.com`
   - Password: `password123`

## ✅ Success Checklist

- [ ] Both terminals show "running" messages
- [ ] Frontend opens at http://localhost:5173
- [ ] Backend health check works: http://localhost:5000/api/health
- [ ] Can login with test credentials
- [ ] Can see restaurants and menus

## 🐛 Quick Fixes

**MongoDB connection fails?**
```bash
# Check if MongoDB is running
mongosh
```

**Port already in use?**
```bash
# Change PORT in backend/.env to 5001
# Or kill the process using the port
```

**Can't login?**
```bash
# Re-seed the database
cd backend
npm run seed
```

## 📚 More Help

- **Detailed Setup:** See SETUP_GUIDE.md
- **Troubleshooting:** See README.md
- **Conversion Info:** See CONVERSION_SUMMARY.md

---

That's it! You should be up and running! 🎉
