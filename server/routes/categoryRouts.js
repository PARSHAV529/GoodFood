const express = require('express')

const router = express.Router()
const {Category} = require('../models/categoryModel')
router.post('/add-categories', async (req, res) => {
    const { name } = req.body;
  
    try {
      // Create a new category instance
      const newCategory = new Category({ name });
  
      // Save the new category to the database
      await newCategory.save();
  
      res.status(201).json(newCategory); // Return the newly created category
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/delete-categories/:name', async (req, res) => {
    const categoryName = req.params.name;

    const cleanedCategory = categoryName.replace(/^:/, '');
  
    try {
      // Find the category by name and delete it
      const deletedCategory = await Category.findOneAndDelete({ name: cleanedCategory });
  
      if (deletedCategory) {
        res.json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/edit-categories/:id', async (req, res) => {
    const categoryId = req.params.id;
    const cleanedId = categoryId.replace(/^:/, '');
    const newName = req.body.name;
  
    try {
      // Find the category by ID and update its name
      const updatedCategory = await Category.findByIdAndUpdate(cleanedId, { name: newName }, { new: true });
  
      if (updatedCategory) {
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      console.error('Error updating category name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



module.exports = router