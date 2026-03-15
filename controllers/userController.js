const mongoose = require("mongoose");
const { UserModel, BookModel } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      success: true,
      data: users,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
    });
  }

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.createNewUser = async (req, res) => {
  const { name, surname, email, subscriptionType, subscriptionDate } = req.body;

  if (!name || !email) {
  return res.status(400).json({
    success: false,
    message: "Name and email are required",
  });
}

  try {
    const newUser = await UserModel.create({
      name,
      surname,
      email,
      subscriptionType,
      subscriptionDate,
    });

    return res.status(201).json({
      success: true,
      message: "User Added Successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
    });
  }

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...data } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Updated !!",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
    });
  }

  try {
    const user = await UserModel.deleteOne({ _id: id });

    if (user.deletedCount === 0) {
  return res.status(404).json({
    success: false,
    message: "User Doesn't Exist",
  });
}

    return res.status(200).json({
      success: true,
      message: "Deleted User..",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getSubscriptionDetailsById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID format",
    });
  }

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User With The ID Didn't Exist",
      });
    }

    const getDateInDays = (data = "") => {
      let date;
      if (data === "") {
        date = new Date();
      } else {
        date = new Date(data);
      }
      return Math.floor(date / (1000 * 60 * 60 * 24));
    };

    const calculateSubscriptionExpiration = (date) => {
  const durations = {
    Basic: 90,
    Standard: 180,
    Premium: 365,
  };

  return date + (durations[user.subscriptionType] || 0);
};

    const returnDate = getDateInDays(user.returnDate);
    const currentDate = getDateInDays();
    const subscriptionDate = getDateInDays(user.subscriptionDate);
    const subscriptionExpiration = calculateSubscriptionExpiration(subscriptionDate);

    const data = {
      ...user.toObject(),
      isSubscriptionExpired: subscriptionExpiration < currentDate,
      daysLeftForExpiration:
        subscriptionExpiration <= currentDate
          ? 0
          : subscriptionExpiration - currentDate,
      fine:
        returnDate < currentDate
          ? subscriptionExpiration <= currentDate
            ? 100
            : 50
          : 0,
    };

    return res.status(200).json({
      success: true,
      message: "Subscription detail for the user is: ",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.borrowBook = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    const book = await BookModel.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({
        success: false,
        message: "User or Book not found",
      });
    }

    if (user.issuedBook) {
      return res.status(400).json({
        success: false,
        message: "User already has a book issued",
      });
    }

    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 14);

    user.issuedBook = bookId;
    user.issuedDate = today;
    user.returnDate = returnDate;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.returnBook = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);

    if (!user || !user.issuedBook) {
      return res.status(404).json({
        success: false,
        message: "No book issued",
      });
    }

    const today = new Date();
    const returnDate = new Date(user.returnDate);

    let fine = 0;

    if (today > returnDate) {
      const diff = Math.ceil((today - returnDate) / (1000 * 60 * 60 * 24));
      fine = diff * 10;
    }

    user.issuedBook = null;
    user.returnDate = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      fine,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};