const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const User = mongoose.model('User');

module.exports = {
  async feed(req, res, next) {
    try {
      const me = await User.findById(req.userId);
      const posts = await Post.find({ user: { $in: [me.id, ...me.friends] } })
        .populate('comments')
        .populate({
          path: 'user',
          select: 'name avatar',
          populate: { path: 'avatar' },
        })
        .sort('-createdAt');

      return res.json(posts);
    } catch (err) {
      return next(err);
    }
  },

  async profile(req, res, next) {
    try {
      const me = await User.findById(req.userId);
      const posts = await Post.find({ user: { $in: [me.id] } })
        .populate('comments')
        .populate({
          path: 'user',
          select: 'name avatar',
          populate: { path: 'avatar' },
        })
        .sort('-createdAt');

      return res.json(posts);
    } catch (err) {
      return next(err);
    }
  },
};
