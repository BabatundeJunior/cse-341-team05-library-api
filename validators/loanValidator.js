const { body, param } = require('express-validator');

exports.validateLoan = [
  body('userId').isMongoId().withMessage('Valid user ID is required'),
  body('bookId').isMongoId().withMessage('Valid book ID is required'),
  body('loanDate')
    .isISO8601()
    .withMessage('Loan date must be a valid date (YYYY-MM-DD)'),
  body('returnDate')
    .optional()
    .isISO8601()
    .withMessage('Return date must be a valid date (YYYY-MM-DD)')
];

exports.validateLoanId = [
  param('id').isMongoId().withMessage('Invalid loan ID format')
];
