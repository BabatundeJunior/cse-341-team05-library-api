const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    available: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    isbn: {
      type: String,
      required: true,
      unique: true
    },
    publishDate: {
      type: Date,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    availableCopies: {
      type: Number,
      required: true
    },
    totalCopies: {
      type: Number,
      required: true
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    }
  }
);

module.exports = mongoose.model('Book', bookSchema);
