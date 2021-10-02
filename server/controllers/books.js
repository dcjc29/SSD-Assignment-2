const asyncHandler = require("../middleware/async");
const Book = require("../models/Book");

// @desc    Add Book
// @route   POST /api/v1/books
// @access  Public
exports.addBook = asyncHandler(async (req, res, next) => {
  const book = await Book.create(req.body);
  res.status(201).json({
    success: true,
    data: book
  });
});


// @desc    Get all books
// @route   GET /api/v1/books
// @access  Public
exports.getBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find();
  
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
});

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access  Public
exports.getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: book
  });
});

