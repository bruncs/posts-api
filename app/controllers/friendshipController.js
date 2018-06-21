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

      return res.send(user);
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

      const requested = user.friendRequests.indexOf(req.userId);

      if (requested === -1) {
        return res.status(400).json({ error: 'There is no open request.' });
      }

      user.friendRequests.splice(requested, 1);
      await user.save();

      return res.send(user);
    } catch (err) {
      return next(err);
    }
  },

  async accept(req, res, next) {
    try {
      const me = await User.findById(req.userId);

      const friend = me.friends.indexOf(req.params.id);

      if (friend !== -1) {
        return res.status(400).json({ error: 'You are already friends.' });
      }

      const requested = me.friendRequests.indexOf(req.params.id);

      if (requested === -1) {
        return res.status(400).json({ error: 'This user did not sent you a friend request.' });
      }

      me.friendRequests.splice(requested, 1);
      me.friends.pull(req.params.id);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },

  async reject(req, res, next) {
    try {
      const me = await User.findById(req.userId);

      const friend = me.friends.indexOf(req.params.id);

      if (friend === -1) {
        return res.status(400).json({ error: 'You are not friends.' });
      }

      const requested = me.friendRequests.indexOf(req.params.id);

      if (requested === -1) {
        return res.status(400).json({ error: 'This user did not sent you a friend request.' });
      }

      me.friendRequests.splice(requested, 1);
      await me.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },

  async unfriend(req, res, next) {
    try {
      const me = await User.findById(req.userId);

      const friend = me.friends.indexOf(req.params.id);

      if (friend === -1) {
        return res.status(400).json({ error: 'You are not friends.' });
      }

      me.friends.splice(friend, 1);
      await me.save();

      return res.send(me);
    } catch (err) {
      return next(err);
    }
  },
};
