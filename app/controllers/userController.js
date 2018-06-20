const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports = {
  async feed(req, res, next) {
    try {
      const posts = await Post.find().populate(['comments', 'user']);

      return res.json(posts);
    } catch (err) {
      return next(err);
    }
  },
};
