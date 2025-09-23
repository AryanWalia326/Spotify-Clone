const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user.getPublicProfile()
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email, preferences } = req.body;
    const user = req.user;

    // Check if username is taken by another user
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username, _id: { $ne: user._id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username already taken'
        });
      }
      user.username = username;
    }

    // Check if email is taken by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase(), _id: { $ne: user._id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }
      user.email = email.toLowerCase();
    }

    // Update preferences
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences };
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/user/stats
// @desc    Update user stats
// @access  Private
router.put('/stats', auth, async (req, res) => {
  try {
    const { songsPlayed, playlistsCreated, totalListeningTime } = req.body;
    const user = req.user;

    if (songsPlayed !== undefined) {
      user.stats.songsPlayed = songsPlayed;
    }
    
    if (playlistsCreated !== undefined) {
      user.stats.playlistsCreated = playlistsCreated;
    }
    
    if (totalListeningTime !== undefined) {
      user.stats.totalListeningTime = totalListeningTime;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Stats updated successfully',
      stats: user.stats
    });

  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;