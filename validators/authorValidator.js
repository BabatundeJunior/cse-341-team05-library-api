const { body, param } = require('express-validator');

exports.validateAuthor = [
  body('name').notEmpty().withMessage('Author name is required'),
  body('biography').optional().isString().withMessage('Biography must be a string'),
  body('birthDate').notEmpty().withMessage('Birthdate is required')
];

exports.validateAuthorId = [
  param('id').isMongoId().withMessage('Invalid author ID format')
];
