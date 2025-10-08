const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { validateAuthor, validateAuthorId } = require('../validators/authorValidator');

// GET all authors
router.get('/', authorController.getAllAuthors);

// GET author by ID
router.get('/:id', validateAuthorId, authorController.getAuthorById);

// POST new author
router.post('/', validateAuthor, authorController.createAuthor);

// PUT update author
router.put('/:id', [...validateAuthorId, ...validateAuthor], authorController.updateAuthor);

// DELETE author
router.delete('/:id', validateAuthorId, authorController.deleteAuthor);

module.exports = router;
