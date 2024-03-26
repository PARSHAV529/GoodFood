const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // Import the Product model
const multer  = require('multer');
const uploads=require('../utils/generatecloudinariurl');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'drsuf7z53',
  api_key: '535112157722962',
  api_secret: 'dEPO-uMbuFRnL0ZLxtWjpXKgj58'
});
// Set up Multer memory storage
const storage = multer.memoryStorage();

// Set up Multer middleware with memory storage
const upload = multer({ storage: storage })

// Route to add a new menu item
router.post('/add-menuItems',upload.single('imageUrl') , async (req, res) => {
    try {
        // Extract menu item data from request body
        const { name, adjective, price, category } = req.body;
          //    console.log(req.file)
          const cat = JSON.parse(category)
          let image=""
          if(req.file){
            const location = req.file.buffer;
            const result = await uploads(location);
             image = result.url;
          }
         
        // Create a new menu item document
        const newMenuItem = new Product({
            name,
            adjective,
            price,
            category:cat,
            imageUrl:image
        });

        // Save the new menu item to the database
        const savedMenuItem = await newMenuItem.save();-

        // Send a success response with the saved menu item
        res.status(201).json(savedMenuItem);
    } catch (error) {
        // Send an error response if something goes wrong
        console.error('Error adding menu item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
