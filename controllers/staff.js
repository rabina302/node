const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Staffs = require("../models/Staffs");

// @desc    get all staffs
// @route   GET /api/staff
// @access   public
exports.getStaffs = asyncHandler(async (req, res, next) => {
  const staffs = await Staffs.find();
  res.status(200).json({
    success: true,
    count: staffs.length,
    data: staffs,
  });
});

// @desc    add new staff
// @route   POST /api/staff
// @access   private
exports.addStaff = asyncHandler(async (req, res, next) => {
  const staff = await Staffs.create(req.body);
  res.status(200).json({
    success: true,
    data: staff,
  });

  // console.log(req.body);
});

// @desc   Login staff
// @route   POST /api/auth/staff/login
// @access   public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please enter an email and password", 400));
  }

  // Chekc for staff
  const staff = await Staffs.findOne({ email }).select("+password");

  if (!staff) {
    return next(new ErrorResponse("Ivalid Credentials", 401));
  }
  // check if password matches

  const isMatch = await staff.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Ivalid Credentials", 401));
  }

  sendTokenResponse(staff, 200, res);
});

// Get token from model, create cookie and send response
// const sendTokenResponse = (staff, statusCode, res) => {
//   // Create token
//   const token = staff.getSignedJwToken();

//   const options = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   if (process.env.NODE_ENV === "production") {
//     options.secure = true;
//   }

//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     token,
//   });
// };
