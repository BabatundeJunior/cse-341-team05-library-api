const { body, param } = require('express-validator');

exports.validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('publishDate').notEmpty().withMessage('Published date is required'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('copiesAvailable').notEmpty().withMessage('Copies available is required'),
  body('authorId').isMongoId().withMessage('Valid author ID is required')
];

exports.validateBookId = [
  param('id').isMongoId().withMessage('Invalid book ID format')
];
