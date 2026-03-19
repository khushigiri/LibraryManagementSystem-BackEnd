const express = require("express");
const dotenv = require("dotenv");

const DbConnection = require("./config/databaseConnection.js");

const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8081;

DbConnection();

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Book Management API is running",
  });
});

// Routes
app.use("/users", userRouter);
app.use("/books", booksRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});