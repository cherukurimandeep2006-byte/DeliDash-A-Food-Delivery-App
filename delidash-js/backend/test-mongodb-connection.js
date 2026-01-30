import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('========================================');
console.log('🧪 MongoDB Connection Test');
console.log('========================================');
console.log('');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log('❌ ERROR: MONGODB_URI not found in .env file');
  console.log('');
  console.log('Please check that:');
  console.log('1. .env file exists in backend/ directory');
  console.log('2. .env file contains MONGODB_URI=...');
  console.log('');
  process.exit(1);
}

console.log('📋 Connection Details:');
console.log('URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@')); // Hide password
console.log('');

console.log('🔌 Attempting to connect...');
console.log('');

const startTime = Date.now();

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000, // 10 second timeout
})
  .then(() => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('✅ SUCCESS: MongoDB connected!');
    console.log(`⏱️  Connection time: ${duration}s`);
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🔗 Host:', mongoose.connection.host);
    console.log('');
    console.log('========================================');
    console.log('✅ MongoDB is working correctly!');
    console.log('========================================');
    console.log('');
    console.log('Next steps:');
    console.log('1. Start the backend server: npm start');
    console.log('2. Start the frontend');
    console.log('3. Try to sign up');
    console.log('');
    process.exit(0);
  })
  .catch(err => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('❌ FAILED: MongoDB connection error');
    console.log(`⏱️  Failed after: ${duration}s`);
    console.log('');
    console.log('Error Type:', err.name);
    console.log('Error Message:', err.message);
    console.log('');
    console.log('========================================');
    console.log('🔧 Troubleshooting Steps:');
    console.log('========================================');
    console.log('');
    
    if (err.message.includes('ECONNREFUSED') || err.message.includes('querySrv')) {
      console.log('❌ Cannot reach MongoDB server');
      console.log('');
      console.log('Possible causes:');
      console.log('1. MongoDB Atlas cluster is paused or deleted');
      console.log('2. DNS resolution failing');
      console.log('3. Network/firewall blocking connection');
      console.log('');
      console.log('Solutions:');
      console.log('1. Check MongoDB Atlas dashboard: https://cloud.mongodb.com');
      console.log('2. Verify cluster is running');
      console.log('3. Try using local MongoDB instead:');
      console.log('   - Edit .env file');
      console.log('   - Change MONGODB_URI to: mongodb://localhost:27017/delidash');
      console.log('   - Make sure MongoDB is installed and running locally');
      console.log('');
    } else if (err.message.includes('Authentication failed')) {
      console.log('❌ Wrong username or password');
      console.log('');
      console.log('Solutions:');
      console.log('1. Check MongoDB Atlas → Database Access');
      console.log('2. Verify username and password');
      console.log('3. Create new database user if needed');
      console.log('4. Update .env file with correct credentials');
      console.log('');
    } else if (err.message.includes('not authorized') || err.message.includes('IP')) {
      console.log('❌ IP address not whitelisted');
      console.log('');
      console.log('Solutions:');
      console.log('1. Go to MongoDB Atlas → Network Access');
      console.log('2. Click "Add IP Address"');
      console.log('3. Add your current IP or use 0.0.0.0/0 (allow all)');
      console.log('4. Wait 1-2 minutes for changes to apply');
      console.log('');
    } else {
      console.log('❌ Unknown error');
      console.log('');
      console.log('Solutions:');
      console.log('1. Check internet connection');
      console.log('2. Get fresh connection string from MongoDB Atlas');
      console.log('3. Try local MongoDB as fallback');
      console.log('4. Read MONGODB_CONNECTION_FIX.md for detailed help');
      console.log('');
    }
    
    console.log('========================================');
    console.log('📚 For more help, see: MONGODB_CONNECTION_FIX.md');
    console.log('========================================');
    console.log('');
    
    process.exit(1);
  });

// Handle timeout
setTimeout(() => {
  if (mongoose.connection.readyState !== 1) {
    console.log('⏱️  Connection timeout (10 seconds)');
    console.log('');
    console.log('This usually means:');
    console.log('- MongoDB server is not reachable');
    console.log('- Network is blocking the connection');
    console.log('- Firewall is blocking MongoDB port');
    console.log('');
    process.exit(1);
  }
}, 10000);
