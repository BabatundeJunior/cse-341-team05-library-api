const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook, validateBookId } = require('../validators/bookValidator');
const verifyToken = require('../middleware/verifyToken');

// GET all books
router.get('/', bookController.getAllBooks);

// GET book by ID
router.get('/:id',verifyToken, validateBookId, bookController.getBookById);

// POST new book
router.post('/',verifyToken, validateBook, bookController.createBook);

// PUT update book
router.put('/:id',verifyToken, [...validateBookId, ...validateBook], bookController.updateBook);

// DELETE book
router.delete('/:id',verifyToken, validateBookId, bookController.deleteBook);

module.exports = router;
