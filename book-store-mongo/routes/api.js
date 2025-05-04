const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books
router.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add new book
router.post('/books', async (req, res) => {
    console.log('Adding book:', req.body);
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// Update book
router.put('/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

// Delete book
router.delete('/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
