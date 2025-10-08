const { body, param } = require('express-validator');

exports.validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('publishDate')
    .isInt({ min: 1000, max: 9999 })
    .withMessage('Published year must be a 4-digit number'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('copiesAvailable')
    .isInt({ min: 0 })
    .withMessage('Copies available must be a non-negative integer'),
  body('authorId').isMongoId().withMessage('Valid author ID is required')
];

exports.validateBookId = [
  param('id').isMongoId().withMessage('Invalid book ID format')
];
