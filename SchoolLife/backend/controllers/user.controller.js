const User = require('../models/user.model');

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const sentUser = {
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      group: user.group,
      id: user._id
    }
    res.send(sentUser);
  } catch (error) {
    res.status(500)
  }
}

const allUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500);
  }
}

const changeGroup = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    user.group = req.body.group;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500);
  }
}

module.exports = {
  me,
  allUsers,
  changeGroup
};
