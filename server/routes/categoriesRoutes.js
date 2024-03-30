const express = require('express');
const { Category } = require('../models/categoryModel');
const router = express.Router();

// Route to get categories by provider email
router.get('/categories', async (req, res) => {
  try {
    const { provideremail } = req.query

    // If provider email is not provided in the query, return an error response
    if (!provideremail) {
      return res.status(400).json({ error: 'Provider email is required' });
    }

    // Fetch categories from the database based on the provider email
    const categories = await Category.find({ provideremail });

    // Send the categories as a response
    res.status(200).json(categories);
  } catch (err) {
    // Send an error response if something goes wrong
    console.error('Error fetching categories:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other routes remain unchanged

module.exports = router;
