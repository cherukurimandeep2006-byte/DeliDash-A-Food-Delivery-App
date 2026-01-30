# DeliDash - Food Delivery Application (JavaScript Version)

A full-stack food delivery application built with React (JavaScript) and Node.js/Express.

## ✅ Fully Converted to JavaScript

This project has been completely converted from TypeScript to JavaScript. All `.ts` and `.tsx` files have been converted to `.js` and `.jsx`.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone/Extract the project**

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd backend
npm install
```

4. **Setup Environment Variables**

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/delidash
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/delidash
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Running the Application

#### Option 1: Run Both (Recommended)

**On Windows:**
```bash
# From project root
start.bat
```

**On macOS/Linux:**
```bash
# From project root
chmod +x start.sh
./start.sh
```

#### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Accessing the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 📁 Project Structure

```
delidash-js/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server
│   ├── seed.js          # Database seeder
│   └── package.json
├── src/
│   └── services/        # API service layer
│       ├── api.js
│       ├── authService.js
│       ├── orderService.js
│       ├── restaurantService.js
│       └── userService.js
├── components/
│   ├── Navbar.jsx
│   └── ui/
│       └── Button.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── Auth.jsx
│   ├── RestaurantList.jsx
│   ├── RestaurantMenu.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── OrderTracking.jsx
├── App.jsx             # Main app component
├── index.jsx           # App entry point
├── constants.js        # Mock data & constants
├── index.css          # Global styles
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS config
└── package.json       # Frontend dependencies
```

## 🔑 Key Features

- ✅ **User Authentication** - Register/Login with JWT
- ✅ **Restaurant Browsing** - View restaurants and menus
- ✅ **Shopping Cart** - Add/remove items, manage quantities
- ✅ **Order Placement** - Checkout and place orders
- ✅ **Order Tracking** - Track order status
- ✅ **Responsive Design** - Works on all devices
- ✅ **Avatar uploads** - Images are validated (image only, 2MB max), resized to 256x256, and will be uploaded to Cloudinary if Cloudinary credentials are provided (otherwise saved to local `/uploads` directory).

## 🛠️ Technologies Used

### Frontend
- React 19
- React Router v7
- Vite
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

### Users
- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update user profile
- `POST /api/users/addresses` - Add new address

Upload avatar (multipart/form-data):

```bash
# Replace $TOKEN with a valid JWT
curl -X POST "http://localhost:5000/api/users/avatar" -H "Authorization: Bearer $TOKEN" -F "avatar=@./path/to/avatar.jpg"
```

If Cloudinary is configured via the backend `.env`, the service will upload the processed avatar to Cloudinary and the user's `avatar` field will contain the hosted URL. Otherwise the avatar will be saved to the server's `/uploads` directory.

## 🌱 Seeding Database

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This will create:
- Sample restaurants with menus
- Test user accounts

## 🐛 Troubleshooting

### Frontend won't start
- Make sure you ran `npm install` in the root directory
- Check that port 5173 is not already in use

### Backend won't connect to MongoDB
- Ensure MongoDB is running (if using local MongoDB)
- Check your MONGODB_URI in the `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### CORS errors
- Backend is configured to allow localhost origins in development
- Check that backend is running on port 5000

### Can't login after registration
- Check browser console for errors
- Verify backend is running and responding
- Check MongoDB connection

## 📦 Build for Production

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## 🔐 Default Test Credentials

After running the seed script, you can use:
- Email: test@example.com
- Password: password123

## 📄 License

MIT

## 👥 Support

For issues or questions, check the backend logs and browser console for detailed error messages.
