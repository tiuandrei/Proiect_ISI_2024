const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const emailRegex = /^[\w-\.]+@stud.acs.upb.ro$/;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return v.length >= 8;
      },
      message: props => `${props.value} is not a valid password!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [emailRegex, 'Please fill a valid student email address'],
  },
  group: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);

