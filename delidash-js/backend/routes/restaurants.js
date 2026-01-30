import express from 'express';
import Restaurant from '../models/Restaurant.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/restaurants
// @desc    Get all restaurants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get single restaurant
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/restaurants
// @desc    Create a restaurant (Admin only - for testing)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
