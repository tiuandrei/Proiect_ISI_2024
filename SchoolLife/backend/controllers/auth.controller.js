const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const correctPassword = await user.comparePassword(password);
    if(!correctPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const isAdmin = false;
  const group = 'none';
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  if (!email.match(/^[\w-\.]+@stud.acs.upb.ro$/)) {
    return res.status(400).json({ message: 'Please fill a valid student email address' });
  }

  if (name.length < 3) {
    return res.status(400).json({ message: 'Please fill your full name' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ name, email, password, isAdmin, group });
    await user.save();
    return res.json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  login,
  register,
};
