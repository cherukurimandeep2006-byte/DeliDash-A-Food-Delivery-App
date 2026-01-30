import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/orders
// @desc    Get current user orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('restaurantId');
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/orders
// @desc    Create an order
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { restaurantId, restaurantName, items, total, deliveryAddress, paymentMethod } = req.body;

    const order = new Order({
      userId: req.user.id,
      restaurantId,
      restaurantName,
      items,
      total,
      deliveryAddress,
      paymentMethod
    });

    await order.save();

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('restaurantId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if user owns this order
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this order' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/orders/:id
// @desc    Update order status (Admin only - for testing)
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
