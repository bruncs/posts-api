const mongoose = require('mongoose');

const User = mongoose.model('User');
const Avatar = mongoose.model('Avatar');

module.exports = {
  async create(req, res, next) {
    try {
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ error: "User doesn't exist." });
      }

      const avatar = await Avatar.create({ image: req.body.image });

      user.avatar = avatar;

      user.save();
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Avatar.findByIdAndRemove(req.params.id);

      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
