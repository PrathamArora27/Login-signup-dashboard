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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model('User', userSchema, 'users'); // Maps to 'users' collection
const AdminModel = mongoose.model('Admin', userSchema, 'admins'); // Maps to 'admins' collection

// Export both models as an object
module.exports = { UserModel, AdminModel };
