const express = require('express');
const { Category } = require('../models/categoryModel');
const router = express.Router();


router.get('/categories', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      console.error('Error fetching categories:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

    
  
  
  
 
  module.exports = router;
