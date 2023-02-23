const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: {
        type: String,
        required: true, 
    },
    authors: {
        type: String,
        required: true, 
    },
    img: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },

    category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;