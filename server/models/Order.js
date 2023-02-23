const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    userId: { 
        type: String, 
        required: true 
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book'
        },
    ],
    quantity: {
      type: Number,
      default: 1,
    },
    amount: { 
        type: Number, 
        required: true 
    },
    address: { 
        type: Object, 
        required: true },
    status: { 
        type: String, 
        default: "pending" 
    },
  },
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;