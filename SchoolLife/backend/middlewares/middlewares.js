const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const userMiddleware = async (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;
    const user = await User.findById(userID);
    if(!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

const adminMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.id;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = { userMiddleware, adminMiddleware };
