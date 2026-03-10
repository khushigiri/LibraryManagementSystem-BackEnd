const mongoose = require("mongoose");
const { UserModel, BookModel } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Users Found In The DB",
      });
    }

    res.status(200).json({
      success: true,
      message: "These are the user info: ",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
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
  const { data } = req.body;

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

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Doesn't Exist !!",
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

    const subscriptionType = (date) => {
      if (user.subscriptionType === "Basic") {
        date += 90;
      } else if (user.subscriptionType === "Standard") {
        date += 180;
      } else if (user.subscriptionType === "Premium") {
        date += 365;
      }
      return date;
    };

    const returnDate = getDateInDays(user.returnDate);
    const currentDate = getDateInDays();
    const subscriptionDate = getDateInDays(user.subscriptionDate);
    const subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
      ...user,
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
