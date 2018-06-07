const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      comment: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Post', PostSchema);
