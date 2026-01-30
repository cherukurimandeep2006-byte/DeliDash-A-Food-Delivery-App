import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/users/me
// @desc    Update user profile
// @access  Private
router.put('/me', protect, async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;

    const update = { name };
    if (phone !== undefined) update.phone = phone;
    if (avatar !== undefined) update.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      update,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   POST /api/users/addresses
// @desc    Add address to user
// @access  Private
router.post('/addresses', protect, async (req, res) => {
  try {
    const { label, details } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          addresses: {
            id: new mongoose.Types.ObjectId(),
            label,
            details
          }
        }
      },
      { new: true }
    );

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/users/addresses/:id
// @desc    Update a saved address
// @access  Private
router.put('/addresses/:id', protect, async (req, res) => {
  try {
    const { label, details } = req.body;
    const addressId = req.params.id;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const addr = user.addresses.id(addressId);
    if (!addr) return res.status(404).json({ success: false, message: 'Address not found' });

    if (label !== undefined) addr.label = label;
    if (details !== undefined) addr.details = details;

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/users/addresses/:id
// @desc    Delete address
// @access  Private
router.delete('/addresses/:id', protect, async (req, res) => {
  try {
    const addressId = req.params.id;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { addresses: { id: addressId } } },
      { new: true }
    );

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @route   POST /api/users/avatar
// @desc    Upload avatar and set user's avatar URL (validation + resize + optional Cloudinary)
// @access  Private

import multer from 'multer';
import fs from 'fs';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Configure Cloudinary if credentials are provided
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

// Use memory storage so we can validate & process the image before saving
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  }
});

router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    // Process image: resize (256x256) and convert to webp for consistent small size
    const processedBuffer = await sharp(req.file.buffer)
      .resize(256, 256, { fit: 'cover' })
      .webp({ quality: 80 })
      .toBuffer();

    let avatarUrl;

    // If Cloudinary configured, upload there
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      const uploadFromBuffer = (buffer) => new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'deli_dash_avatars', resource_type: 'image' }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(stream);
      });

      const result = await uploadFromBuffer(processedBuffer);
      avatarUrl = result.secure_url || result.url;
    } else {
      // Fallback: write to local uploads directory
      const filename = `${req.user.id}-${Date.now()}.webp`;
      const outPath = path.join(process.cwd(), 'uploads', filename);
      await fs.promises.writeFile(outPath, processedBuffer);
      avatarUrl = `/uploads/${filename}`;

      // Remove previous local avatar file if present to avoid orphaned files
      try {
        const existingUser = await User.findById(req.user.id).lean();
        if (existingUser && existingUser.avatar && existingUser.avatar.startsWith('/uploads/')) {
          const prevPath = path.join(process.cwd(), existingUser.avatar.replace('/uploads/', 'uploads/'));
          if (fs.existsSync(prevPath)) {
            await fs.promises.unlink(prevPath);
          }
        }
      } catch (e) {
        // Non-fatal; continue
        console.warn('Failed to remove previous avatar file:', e.message);
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl }, { new: true });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    // Multer fileFilter errors may come through as regular errors
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
