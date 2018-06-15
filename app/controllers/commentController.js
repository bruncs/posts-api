const mongoose = require('mongoose');

const Post = mongoose.model('Post');

module.exports = {
  async create(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);

      post.comments.push({ user: req.userId, comment: req.body.comment });

      post.save();

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },
};
