const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Playlist = require('../models/Playlist');

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

// @route   GET /api/music/playlists
// @desc    Get user's playlists
// @access  Private
router.get('/playlists', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id })
      .populate('owner', 'username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      playlists
    });

  } catch (error) {
    console.error('Get playlists error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/music/playlists
// @desc    Create a new playlist
// @access  Private
router.post('/playlists', auth, async (req, res) => {
  try {
    const { name, description, isPublic, songs } = req.body;

    const playlist = new Playlist({
      name,
      description,
      owner: req.user._id,
      isPublic: isPublic !== undefined ? isPublic : true,
      songs: songs || []
    });

    await playlist.save();

    // Update user stats
    req.user.stats.playlistsCreated += 1;
    await req.user.save();

    res.status(201).json({
      success: true,
      message: 'Playlist created successfully',
      playlist
    });

  } catch (error) {
    console.error('Create playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/music/playlists/:id
// @desc    Get a specific playlist
// @access  Public
router.get('/playlists/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('owner', 'username');

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check if playlist is public or user owns it
    const token = req.header('Authorization')?.replace('Bearer ', '');
    let isOwner = false;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        isOwner = playlist.owner._id.toString() === decoded.userId;
      } catch (error) {
        // Token invalid, continue as public user
      }
    }

    if (!playlist.isPublic && !isOwner) {
      return res.status(403).json({
        success: false,
        message: 'This playlist is private'
      });
    }

    res.json({
      success: true,
      playlist
    });

  } catch (error) {
    console.error('Get playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/music/playlists/:id
// @desc    Update a playlist
// @access  Private
router.put('/playlists/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check if user owns the playlist
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this playlist'
      });
    }

    const { name, description, isPublic, songs } = req.body;

    if (name) playlist.name = name;
    if (description !== undefined) playlist.description = description;
    if (isPublic !== undefined) playlist.isPublic = isPublic;
    if (songs) playlist.songs = songs;

    await playlist.save();

    res.json({
      success: true,
      message: 'Playlist updated successfully',
      playlist
    });

  } catch (error) {
    console.error('Update playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/music/playlists/:id
// @desc    Delete a playlist
// @access  Private
router.delete('/playlists/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: 'Playlist not found'
      });
    }

    // Check if user owns the playlist
    if (playlist.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this playlist'
      });
    }

    await Playlist.findByIdAndDelete(req.params.id);

    // Update user stats
    req.user.stats.playlistsCreated = Math.max(0, req.user.stats.playlistsCreated - 1);
    await req.user.save();

    res.json({
      success: true,
      message: 'Playlist deleted successfully'
    });

  } catch (error) {
    console.error('Delete playlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/music/public-playlists
// @desc    Get public playlists
// @access  Public
router.get('/public-playlists', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const playlists = await Playlist.find({ isPublic: true })
      .populate('owner', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Playlist.countDocuments({ isPublic: true });

    res.json({
      success: true,
      playlists,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get public playlists error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;