const mongoose = require('mongoose');

const AvatarSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Avatar', AvatarSchema);
