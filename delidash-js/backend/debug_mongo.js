import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' }); // Adjust path if needed

console.log('URI:', process.env.MONGODB_URI?.replace(/:([^:@]+)@/, ':****@')); // Hide password

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected!');
        process.exit(0);
    })
    .catch(err => {
        console.log('Error Name:', err.name);
        console.log('Error Message:', err.message);
        if (err.cause) console.log('Cause:', err.cause);
        process.exit(1);
    });
