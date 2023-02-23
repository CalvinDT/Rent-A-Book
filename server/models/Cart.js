const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: { 
        type: String, 
        required: true 
    },
    books: [
      {
        bookId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },

);


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;