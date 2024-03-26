// categoryModel.js

const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensure category names are unique
  },
  // Add other fields as needed
});
const Category = mongoose.model('Category', categorySchema);

module.exports = {
  Category,        // Exporting the Category model
  categorySchema   // Exporting the category schema
};
