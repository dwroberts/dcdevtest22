const { Model } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// @desc Get users
// @route GET /api/users
// @access Private
const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// @desc Get current logged in user
// @route GET /api/users
// @access Private
const getUser = async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
    avatar,
  });
};

// @desc Create a new user
// @route POST /api/users
// @access Public
const createUser = async (req, res) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in required fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      ok: false,
      message: "Invalid user data",
    });
  }
};

// @desc Log in user
// @route POST /api/users
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      ok: false,
      message: "The user could not be logged in",
    });
    // throw new Error("The user could not be logged in");
  }
};

// @desc Update a user
// @route PUT /api/users/:id
// @access Private
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    _id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    token: generateToken(updatedUser._id),
  });
};

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({ id: req.params.id });
};

// Generate JSON Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
