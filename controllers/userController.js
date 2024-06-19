const User = require("../models/userModel");

exports.getUsers = async (req, res, next) => {
  try {
    // check if email exists
    const users = await User.find(req.query);

    if (!users.length) {
      res.status(404).json({
        status: "fail",
        message: "No users found!",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};
