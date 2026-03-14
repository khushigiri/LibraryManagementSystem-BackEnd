const { UserModel, BookModel } = require("../models/index.js");
const IssuedBook = require("../dtos/book.dto.js");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();

    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found",
      });
    }

    return res.status(200).json({
      success: true,
      data: books,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getSingleBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: book,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid book ID",
    });
  }
};

exports.getAllIssuedBooks = async (req, res) => {
  try {
    const users = await UserModel.find({
      issuedBook: { $exists: true },
    }).populate("issuedBook");

    const issuedBooks = users.map((user) => new IssuedBook(user));

    if (issuedBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books issued yet",
      });
    }

    return res.status(200).json({
      success: true,
      data: issuedBooks,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.addNewBook = async (req, res) => {
  try {
    const bookData = req.body;

    if (!bookData) {
      return res.status(400).json({
        success: false,
        message: "No book data provided",
      });
    }

    const newBook = await BookModel.create(bookData);

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add book",
    });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update book",
    });
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete book",
    });
  }
};