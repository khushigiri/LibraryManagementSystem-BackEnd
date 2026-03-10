const express = require("express");
const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserData,
  createNewUser,
  getSubscriptionDetailsById,
} = require("../controllers/user-controller");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models");

const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

router.get("/", getAllUsers);

/**
 * Route: /:id
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", getSingleUserById);

/**
 * Route: /
 * Method: POST
 * Description: Creating a new user
 * Access: Public
 * Parameters: None
 */

router.post("/", createNewUser);

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameters: ID
 */

router.put("/:id", updateUserData);

/**
 * Route: /:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameters: ID
 */

router.delete("/:id", deleteUser);

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user Subscription Details
 * Access: Public
 * Parameters: ID
 */

router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;
