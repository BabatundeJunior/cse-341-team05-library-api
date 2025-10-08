const { body, param } = require('express-validator');

exports.validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin')
];

exports.validateUserId = [
  param('id').isMongoId().withMessage('Invalid user ID format')
];
