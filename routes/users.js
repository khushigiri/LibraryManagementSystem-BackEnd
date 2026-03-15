const express = require("express");

const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserData,
  createNewUser,
  getSubscriptionDetailsById,
  borrowBook,
  returnBook
} = require("../controllers/userController");
const router = express.Router();

/*  Get all users */
router.get("/", getAllUsers);

/* Get user subscription details */
router.get("/subscription-details/:id", getSubscriptionDetailsById);

/*  Get single user by ID */
router.get("/:id", getSingleUserById);

/* Create new user */
router.post("/", createNewUser);

/*  Update user */
router.put("/:id", updateUserData);

/*  Delete user */
router.delete("/:id", deleteUser);

/* Borrow a Book */
router.post("/:userId/borrow/:bookId", borrowBook);

/* Return a Book */
router.post("/:userId/return", returnBook);

module.exports = router;

