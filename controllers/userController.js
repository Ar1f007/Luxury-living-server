const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

/**
 * @desc    Creates a new user for the first time then updates the doc
 * @route   POST /api/v1/users
 * @access  Public
 */
exports.addUser = async (req, res) => {
  console.log('called');
  const { name, email, image } = req.body;
  let userInfo = {};

  const userAlreadyExists = await User.findOne({ email });

  if (!userAlreadyExists) {
    const user = await User.create({ name, email, image });

    userInfo = {
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFESPAN,
  });

  res
    .cookie('access_token', token, { httpOnly: true })
    .status(StatusCodes.CREATED)
    .json({ userInfo });
};
