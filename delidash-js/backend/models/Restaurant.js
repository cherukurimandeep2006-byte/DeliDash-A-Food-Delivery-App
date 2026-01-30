import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  isVeg: Boolean,
  category: String,
  rating: { type: Number, default: 4.5 },
  votes: { type: Number, default: 0 }
}, { _id: false });

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cuisine: [String],
  rating: { type: Number, default: 4.5 },
  deliveryTime: String,
  priceForTwo: Number,
  distance: String,
  offer: String,
  image: String,
  menu: [MenuItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
export default Restaurant;
