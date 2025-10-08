const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook, validateBookId } = require('../validators/bookValidator');

// GET all books
router.get('/', bookController.getAllBooks);

// GET book by ID
router.get('/:id', validateBookId, bookController.getBookById);

// POST new book
router.post('/', validateBook, bookController.createBook);

// PUT update book
router.put('/:id', [...validateBookId, ...validateBook], bookController.updateBook);

// DELETE book
router.delete('/:id', validateBookId, bookController.deleteBook);

module.exports = router;
