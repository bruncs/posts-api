const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async request(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: "User doesn't exist." });
      }

      const requested = user.friendRequests.indexOf(req.userId) !== -1;

      if (requested) {
        return res.status(400).json({ error: 'You have already made this request.' });
      }

      user.friendRequests.push(req.userId);
      await user.save();

      return res.send();
    } catch (err) {
      return next(err);
    }
  },

  async unrequest(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ error: "User doesn't exist." });
      }

      const requested = user.friendRequests.indexOf(req.userId) !== -1;

      if (!requested) {
        return res.status(400).json({ error: 'There is no open request.' });
      }

      user.friendRequests.splice(requested, 1);
      await user.save();

      return res.send();
    } catch (err) {
      return next(err);
    }
  },

  async accept(req, res, next) {
    try {
      return res.send();
    } catch (err) {
      return next(err);
    }
  },

  async reject(req, res, next) {
    try {
      return res.send();
    } catch (err) {
      return next(err);
    }
  },

  async unfriend(req, res, next) {
    try {
      return res.send();
    } catch (err) {
      return next(err);
    }
  },
};
