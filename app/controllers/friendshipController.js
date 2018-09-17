const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async request(req, res, next) {
    try {
      const user = await User.findById(req.params.id);

      if (!user || user.id === req.userId) {
        return res.status(400).json({ error: 'Solicitação inválida.' });
      }

      const requested = user.friendRequests.indexOf(req.userId);

      if (requested !== -1) {
        return res.status(400).json({ error: 'Você já fez esta solicitação.' });
      }

      const friend = user.friends.indexOf(req.userId);

      if (friend !== -1) {
        return res
          .status(400)
          .json({ error: 'Você já possui este usuário em sua lista de amigos.' });
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

      if (!user || user.id === req.userId) {
        return res.status(400).json({ error: 'Solicitação inválida.' });
      }

      const requested = user.friendRequests.indexOf(req.userId);

      if (requested === -1) {
        return res.status(400).json({ error: 'Solicitação não encontrada.' });
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
      const user = await User.findById(req.params.id);

      if (!user || user.id === req.userId) {
        return res.status(400).json({ error: 'Invalid request.' });
      }

      const me = await User.findById(req.userId);

      const friend = me.friends.indexOf(req.params.id);

      if (friend !== -1) {
        return res.status(400).json({ error: 'You are already friends.' });
      }

      const requested = me.friendRequests.indexOf(req.params.id);

      if (requested === -1) {
        return res.status(400).json({ error: 'Request not found.' });
      }

      me.friendRequests.splice(requested, 1);
      me.friends.push(req.params.id);
      user.friends.push(req.userId);
      await me.save();
      await user.save();

      return res.json(me);
    } catch (err) {
      return next(err);
    }
  },

  async reject(req, res, next) {
    try {
      const me = await User.findById(req.userId);

      const requested = me.friendRequests.indexOf(req.params.id);

      if (requested === -1) {
        return res.status(400).json({ error: 'Request not found.' });
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
      const user = await User.findById(req.params.id);

      if (!user || user.id === req.userId) {
        return res.status(400).json({ error: 'Invalid request.' });
      }

      const me = await User.findById(req.userId);

      const friend = me.friends.indexOf(req.params.id);

      if (friend === -1) {
        return res.status(400).json({ error: 'You are not friends.' });
      }

      me.friends.splice(friend, 1);
      user.friends.splice(user.friends.indexOf(req.userId), 1);
      await me.save();
      await user.save();

      return res.send(me);
    } catch (err) {
      return next(err);
    }
  },

  async list(req, res, next) {
    try {
      const me = await User.findById(req.userId).populate({
        path: 'friends',
        select: 'name _id',
        populate: { path: 'avatar', select: 'image' },
      });

      return res.json(me.friends);
    } catch (err) {
      return next(err);
    }
  },

  async listRequests(req, res, next) {
    try {
      const me = await User.findById(req.userId).populate({
        path: 'friendRequests',
        select: 'name _id avatar',
      });

      return res.json(me.friendRequests);
    } catch (err) {
      return next(err);
    }
  },
};
