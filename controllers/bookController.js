const { validationResult } = require('express-validator');
const Book = require('../models/Book');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('authorId');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('authorId');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new book
exports.createBook = async (req, res) => {
          const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  const book = new Book({
    title: req.body.title,
    isbn: req.body.isbn,
    genre: req.body.genre,
    publishDate: req.body.publishDate,
    availableCopies: req.body.availableCopies,
    totalCopies: req.body.totalCopies,
    authorId: req.body.authorId
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a book
exports.updateBook = async (req, res) => {
          const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Update fields
    book.title = req.body.title || book.title;
    book.summary = req.body.summary || book.summary;
    book.isbn = req.body.isbn || book.isbn;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.publishDate = req.body.publishDate || book.publishDate;
    book.availableCopies = req.body.availableCopies ?? book.availableCopies;

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a book
exports.deleteBook = async (req, res) => {
          const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
