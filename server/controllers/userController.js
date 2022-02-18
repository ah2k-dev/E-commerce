const ErrorHandler = require("../utils/errorHandler");
const catchAsycErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
//Register user
exports.registerUser = catchAsycErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "xyz",
      url: "abc",
    },
  });
  sendToken(user, 201, res);
});

//Login user
exports.loginUser = catchAsycErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //check if user has given email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email & Password", 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }
  const pwdMatched = await user.comparePassword(password);
  console.log(pwdMatched);
  if (!pwdMatched) {
    return next(new ErrorHandler("Invalid Email or Password"));
  }
  sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchAsycErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
});

//Forget Password
exports.forgotPassword = catchAsycErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  //Get Password Token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ valideBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset token :-  /n/n ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (er) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ valideBeforeSave: false });
    return next(new ErrorHandler(er.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsycErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Token is invalid or expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});
