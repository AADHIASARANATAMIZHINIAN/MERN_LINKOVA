const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');
const User = require('../models/user');

// @route   GET /api/posts
// @desc    Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/posts
// @desc    Create a post
router.post('/', auth, async (req, res) => {
  const { content } = req.body;

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      userId: req.user.id,      // ← CHANGED from "user" to "userId"
      userName: user.name,
      content,
      likes: []                  // ← ADDED: Initialize empty likes array
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if user owns the post
    if (post.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.deleteOne();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/posts/:id/like
// @desc    Like a post
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if post has already been liked by this user
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/posts/:id/unlike
// @desc    Unlike a post
router.put('/:id/unlike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if post has been liked
    const removeIndex = post.likes.indexOf(req.user.id);
    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }

    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    // Fetch user to get the name
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const newComment = {
      userId: req.user.id,
      userName: user.name,
      text: req.body.text,
    };

    post.comments.push(newComment);
    await post.save();
    res.json(post);
  } catch (err) {
    console.error('Comment error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Delete comment
router.delete('/:id/comments/:commentId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });

    // Only allow deletion by comment owner or post owner
    if (comment.userId.toString() !== req.user.id && post.userId.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    comment.remove();
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;