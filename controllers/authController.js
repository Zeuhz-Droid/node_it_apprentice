const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(404).json({
        status: "fail",
        message: "User with email already exists.",
      });
      return;
    }

    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next("Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next("Incorrect email or password");
    }

    user.password = undefined;

    res.status(200).json({
      status: "successfully logged in",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
