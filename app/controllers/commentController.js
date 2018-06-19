const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

module.exports = {
  async create(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ error: "Post doesn't exist." });
      }

      const comment = await Comment.create({ user: req.userId, content: req.body.comment });

      post.comments.push(comment);

      post.save();

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Comment.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
