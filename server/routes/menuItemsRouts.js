const express = require('express');
const router = express.Router();
const {Product} = require('../models/productModel'); 
const multer = require('multer');
const uploads = require('../utils/generatecloudinariurl');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'drsuf7z53',
  api_key: '535112157722962',
  api_secret: 'dEPO-uMbuFRnL0ZLxtWjpXKgj58'
});

// Set up Multer memory storage
const storage = multer.memoryStorage();

// Set up Multer middleware with memory storage
const upload = multer({ storage: storage });

// Route to add a new menu item
router.post('/add-menuItems', upload.single('imageUrl'), async (req, res) => {
  try {
    // Extract menu item data from request body
    const { name, adjective, price, category } = req.body;
    const cat = JSON.parse(category);
    let image = "";

    // Upload image to Cloudinary if provided
    if (req.file) {
      const location = req.file.buffer;
      const result = await uploads(location);
      image = result.url;
    }

    // Create a new menu item document
    const newMenuItem = new Product({
      name,
      adjective,
      price,
      category: cat,
      imageUrl: image
    });

    // Save the new menu item to the database
    const savedMenuItem = await newMenuItem.save();

    // Send a success response with the saved menu item
    res.status(201).json(savedMenuItem);
  } catch (error) {
    // Send an error response if something goes wrong
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a menu item by name
router.delete('/delete-menuItem/:name', async (req, res) => {
  let name = req.params.name;
  console.log(name)

  const cleanedName = name.replace(/^:/, '');
  console.log(cleanedName)
  try {
    // Find the menu item by name and delete it
    const deletedMenuItem = await Product.findOneAndDelete({ name: cleanedName });

    if (!deletedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Send a success response with the deleted menu item
    res.status(200).json(deletedMenuItem);
  } catch (error) {
    // Send an error response if something goes wrong
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a menu item by name
router.put('/update-menuItem/:name', async (req, res) => {
  try {
    // Extract updated menu item data from request body
    const { name, adjective, price } = req.body;
    

    // Find the menu item by name and update it
    const updatedMenuItem = await Product.findOneAndUpdate(
      { name: req.params.name },
      {
        name,
        adjective,
        price,
        
        
      },
      { new: true } // Return the updated document
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Send a success response with the updated menu item
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    // Send an error response if something goes wrong
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
