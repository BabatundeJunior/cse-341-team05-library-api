const { validationResult } = require('express-validator');
const Author = require('../models/Author');

// GET all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create a new author
exports.createAuthor = async (req, res) => {
          const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  const author = new Author({
    name: req.body.name,
    biography: req.body.biography,
    birthDate: req.body.birthDate,
    nationality: req.body.nationality
  });

  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update author
exports.updateAuthor = async (req, res) => {
          const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    author.name = req.body.name || author.name;
    author.biography = req.body.bio || author.biography;
    author.birthDate = req.body.birthDate || author.birthDate;
    author.nationality = req.body.nationality || author.nationality;

    const updatedAuthor = await author.save();
    res.status(200).json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE author
exports.deleteAuthor = async (req, res) => {
          const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  try {
    const result = await Author.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Author not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
