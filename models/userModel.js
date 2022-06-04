const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'please provide your email'],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
