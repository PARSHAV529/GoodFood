const express = require('express');
const User = require('../models/userTypeModel');
const router = express.Router();


router.get('/users/:email', async (req, res) => {
    const userEmail = req.params.email;
  console.log(userEmail)
  const cleanedEmail = userEmail.replace(/^:/, '');
   await User.findOne({ email: cleanedEmail })
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      });
    });

    router.get('/user/:id', async (req, res) => {
      const userId = req.params.id;
    
      try {
        // Find the user by ID
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // If user found, return the email
        res.status(200).json({ email: user.email });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });


  module.exports = router;
