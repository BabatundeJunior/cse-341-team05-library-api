const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  googleId: {
    type: String,
    required: false // for OAuth 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: String
  },
  address: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);
