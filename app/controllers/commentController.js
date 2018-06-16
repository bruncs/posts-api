const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

module.exports = {
  async create(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);

      const comment = await Comment.create({ user: req.userId, content: req.body.comment });

      post.comments.push(comment);

      post.save();

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },
};
