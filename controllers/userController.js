const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

/**
 * @desc    Creates a new user for the first time then updates the doc
 * @route   POST /api/v1/users
 * @access  Public
 */
exports.addUser = async (req, res) => {
  const { name, email, image } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { email, name, image },
    { upsert: true, new: true }
  );

  const userInfo = {
    email: user.email,
    name: user.name,
    role: user.role,
    image: user.image,
  };

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFESPAN,
  });

  res
    .cookie('access_token', token, { httpOnly: true })
    .status(StatusCodes.CREATED)
    .json({ userInfo });
};

exports.login = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  const userInfo = {
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  };

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'User not found' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFESPAN,
  });

  return res
    .cookie('access_token', token, { httpOnly: true })
    .status(StatusCodes.OK)
    .json({ userInfo });
};
