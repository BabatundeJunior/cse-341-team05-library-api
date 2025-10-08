const Loan = require('../models/Loan');
const Book = require('../models/Book');
const User = require('../models/User');

// GET all loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate('userId').populate('bookId');
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET loan by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('userId').populate('bookId');
    if (!loan) return res.status(404).json({ message: 'Loan not found' });
    res.status(200).json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new loan
exports.createLoan = async (req, res) => {
  const loan = new Loan({
    userId: req.body.userId,
    bookId: req.body.bookId,
    loanDate: req.body.loanDate || new Date(),
    returnDate: req.body.returnDate,
    status: req.body.status || 'borrowed'
  });

  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a loan
exports.updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    loan.userId = req.body.userId || loan.userId;
    loan.bookId = req.body.bookId || loan.bookId;
    loan.loanDate = req.body.loanDate || loan.loanDate;
    loan.returnDate = req.body.returnDate || loan.returnDate;
    loan.status = req.body.status || loan.status;

    const updatedLoan = await loan.save();
    res.status(200).json(updatedLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE loan
exports.deleteLoan = async (req, res) => {
  try {
    const result = await Loan.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Loan not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
