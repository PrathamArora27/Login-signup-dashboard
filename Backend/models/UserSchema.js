const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email validation regex
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false, // Not required for login, but for signup
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Define acceptable roles
    default: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Models for separate collections
const UserModel = mongoose.model('User', userSchema, 'users');
const AdminModel = mongoose.model('Admin', userSchema, 'admins');

module.exports = { UserModel, AdminModel };
