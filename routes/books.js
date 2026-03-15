const express = require("express");

const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
  deleteBookById
} = require("../controllers/bookController");

const router = express.Router();

/* Get all books */
router.get("/", getAllBooks);

/* Get all issued books */
router.get("/issued/by-user", getAllIssuedBooks);

/* Get book by ID */
router.get("/:id", getSingleBookById);

/* Add new book */
router.post("/", addNewBook);

/* Update book by ID */
router.put("/:id", updateBookById);

/* Delete book by ID */
router.delete("/:id", deleteBookById);

module.exports = router;