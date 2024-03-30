const mongoose = require('mongoose');



const cartItemSchema = new mongoose.Schema({

  provideremail : {type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  ProductPrice: { type: Number, required: true},
  userEmail: { type: String, required: true },
  status: { type: String, required: true}
});

const CartItem = mongoose.model('CartItem', cartItemSchema)

module.exports = CartItem
