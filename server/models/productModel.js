const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {categorySchema} = require('./categoryModel');



const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        adjective: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type:categorySchema, ref: 'Category', required: true },
        imageUrl :{ type: String ,required: true}
    }
)

module.exports = mongoose.model('Product', ProductSchema)

//  = {
//     Product,        // Exporting the Category model
//     ProductSchema   // Exporting the category schema
// };