const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).populate('avatar');

      if (!user) {
        return res.status(400).json({ error: 'Email not found.' });
      }

      if (!(await user.compareHash(password))) {
        return res.status(400).json({ error: 'Invalid password.' });
      }

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },

  async signup(req, res, next) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'Email already registered.' });
      }
      const user = await User.create(req.body);

      return res.json({
        user,
        token: user.generateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },
};
