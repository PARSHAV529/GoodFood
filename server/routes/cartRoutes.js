const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartModel');

// Route to add a new cart item
router.post('/add-cart-item', async (req, res) => {
  try {
    const { productName, quantity, userEmail, ProductPrice, status, provideremail } = req.body;

    // Create a new cart item document
    const newCartItem = new CartItem({
      productName,
      quantity,
      ProductPrice,
      userEmail,
      status,
      provideremail
    });

    // Save the new cart item to the database
    const savedCartItem = await newCartItem.save();

    // Send a success response with the saved cart item
    res.status(201).json(savedCartItem);
  } catch (error) {
    // Send an error response if something goes wrong
    console.error('Error adding cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to fetch all cart items
router.get('/cart-items', async (req, res) => {
  try {
    // Fetch all cart items from the database
    const cartItems = await CartItem.find();

    // Send the cart items as a response
    res.status(200).json(cartItems);
  } catch (error) {
    // Send an error response if something goes wrong
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a cart item
router.put('/update-cart-item/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    // Extract updated fields from request body
    const { productName, quantity, userEmail, ProductPrice, status, provideremail } = req.body;

    // Find the cart item by ID and update it
    const updatedItem = await CartItem.findByIdAndUpdate(itemId, {
      productName,
      quantity,
      ProductPrice,
      userEmail,
      status,
      provideremail
    }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a cart item
router.delete('/delete-cart-item/:id', async (req, res) => {
  const itemId = req.params.id;

  try {
    // Find the cart item by ID and delete it
    const deletedItem = await CartItem.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
