const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    // Validate token format
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ message: 'Invalid token format' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure token is not expired (if expiration was set during token creation)
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    // Find user by ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return res.status(200).json({ message: 'Email already verified' });
    }

    // Verify email
    user.emailVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Internal server error', error });
  }
};
