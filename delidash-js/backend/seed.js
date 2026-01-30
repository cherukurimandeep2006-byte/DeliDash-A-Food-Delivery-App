import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Restaurant from './models/Restaurant.js';

dotenv.config();

const seedData = [
  {
    name: 'Biryani Palace',
    cuisine: ['Indian', 'Biryani'],
    rating: 4.5,
    deliveryTime: '30-40 mins',
    priceForTwo: 400,
    distance: '2.5 km',
    offer: '50% off on orders above ₹500',
    image: 'https://images.unsplash.com/photo-1585937421612-a551a882fcb4?w=400',
    menu: [
      {
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice cooked with spiced chicken',
        price: 220,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a104?w=400',
        isVeg: false,
        category: 'Biryani',
        rating: 4.6,
        votes: 324
      },
      {
        name: 'Vegetable Biryani',
        description: 'Mixed vegetables cooked in biryani style',
        price: 180,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        isVeg: true,
        category: 'Biryani',
        rating: 4.4,
        votes: 215
      }
    ]
  },
  {
    name: 'Spice Route',
    cuisine: ['Indian', 'North Indian'],
    rating: 4.3,
    deliveryTime: '25-35 mins',
    priceForTwo: 350,
    distance: '1.8 km',
    offer: '₹50 cashback',
    image: 'https://images.unsplash.com/photo-1633360299841-cb2de2ba4d0e?w=400',
    menu: [
      {
        name: 'Paneer Tikka Masala',
        description: 'Soft cottage cheese in creamy tomato sauce',
        price: 250,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
        isVeg: true,
        category: 'Curries',
        rating: 4.5,
        votes: 456
      },
      {
        name: 'Butter Chicken',
        description: 'Tender chicken in rich buttery sauce',
        price: 280,
        image: 'https://images.unsplash.com/photo-1535619459340-ec4ee8f1d1e7?w=400',
        isVeg: false,
        category: 'Curries',
        rating: 4.7,
        votes: 623
      }
    ]
  },
  {
    name: 'Pizza Paradise',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.2,
    deliveryTime: '20-30 mins',
    priceForTwo: 500,
    distance: '3.2 km',
    offer: 'Free delivery on orders above ₹400',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400',
    menu: [
      {
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato, mozzarella and basil',
        price: 220,
        image: 'https://images.unsplash.com/photo-1579751626658-0e54c76b2e5d?w=400',
        isVeg: true,
        category: 'Pizza',
        rating: 4.4,
        votes: 512
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Pizza loaded with pepperoni and cheese',
        price: 280,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07f57a?w=400',
        isVeg: false,
        category: 'Pizza',
        rating: 4.6,
        votes: 678
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants');

    // Insert seed data
    const result = await Restaurant.insertMany(seedData);
    console.log(`Inserted ${result.length} restaurants successfully!`);

    console.log('\nSeeded Restaurants:');
    result.forEach(restaurant => {
      console.log(`- ${restaurant.name} (ID: ${restaurant._id})`);
      restaurant.menu.forEach(item => {
        console.log(`  - ${item.name} (₹${item.price})`);
      });
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
