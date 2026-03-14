const mongoose = require("mongoose");

async function DbConnection() {
  try {
    const DB_URL = process.env.MONGO_URI;

    await mongoose.connect(DB_URL);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
}

module.exports = DbConnection;