const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin', 'manager'], default: 'user' },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emailVerified: {type: Boolean, default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
