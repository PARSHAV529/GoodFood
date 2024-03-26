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



  module.exports = router;
