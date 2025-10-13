const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const { validateLoan, validateLoanId } = require('../validators/loanValidator');
const verifyToken = require('../middleware/verifyToken');

// GET all loans
router.get('/', loanController.getAllLoans);

// GET loan by ID
router.get('/:id', validateLoanId, loanController.getLoanById);

// POST new loan
router.post('/',verifyToken, validateLoan, loanController.createLoan);

// PUT update loan
router.put('/:id',verifyToken, [...validateLoanId, ...validateLoan], loanController.updateLoan);

// DELETE loan
router.delete('/:id',verifyToken, validateLoanId, loanController.deleteLoan);

module.exports = router;
