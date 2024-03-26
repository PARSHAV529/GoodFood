const mongoose = require('mongoose');

// Define the schema for user
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    
  }
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
