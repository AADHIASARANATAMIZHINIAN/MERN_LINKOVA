const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');

// @route   GET /api/users/:id
// @desc    Get user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Get user's posts
    const posts = await Post.find({ userId: req.params.id }).sort({ createdAt: -1 });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        location: user.location || '',
        website: user.website || '',
        occupation: user.occupation || '',
        followers: user.followers || [],
        following: user.following || [],
        createdAt: user.createdAt
      },
      posts
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/users/me/profile
// @desc    Get current user's profile
router.get('/me/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Get user's posts
    const posts = await Post.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
        location: user.location || '',
        website: user.website || '',
        occupation: user.occupation || '',
        followers: user.followers || [],
        following: user.following || [],
        createdAt: user.createdAt
      },
      posts
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
router.put('/profile', auth, async (req, res) => {
  const { name, bio, avatar, location, website, occupation, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    if (location !== undefined) user.location = location;
    if (website !== undefined) user.website = website;
    if (occupation !== undefined) user.occupation = occupation;

    // If user wants to change password
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ msg: 'Current password is incorrect' });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    // Also update userName and avatar in all posts
    if (name || avatar !== undefined) {
      const updateFields = {};
      if (name) updateFields.userName = name;
      if (avatar !== undefined) updateFields.userAvatar = avatar;
      
      await Post.updateMany(
        { userId: req.user.id },
        { $set: updateFields }
      );

      // Update userName and avatar in all comments by this user
      const commentUpdateFields = {};
      if (name) commentUpdateFields['comments.$[elem].userName'] = name;
      if (avatar !== undefined) commentUpdateFields['comments.$[elem].userAvatar'] = avatar;
      
      await Post.updateMany(
        { 'comments.userId': req.user.id },
        { $set: commentUpdateFields },
        { arrayFilters: [{ 'elem.userId': req.user.id }] }
      );
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar,
      location: user.location,
      website: user.website,
      occupation: user.occupation,
      createdAt: user.createdAt
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
