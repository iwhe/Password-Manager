import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Error while generating Access and Refresh Token",
      error
    );
  }
};

// Register the user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Please fill in all fields");
  }
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(404, "Something went wrong while creating user");
  }
  console.log("User created!");

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Created Successfully"));
});

let options = {
  httpOnly: true,
  secure: true,
};

// Login the User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  //   console.log(user);

  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const isValidPassword = await user.matchPassword(password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid Password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password, -refreshToken"
  );

  console.log("Logged in successfully!!");

  res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedinUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

//get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched succesfully"));
});

// Log out the user
const logout = asyncHandler(async (req, res) => {
  try {
    const user = req.user;

    await User.findByIdAndUpdate(
      user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .clearCookie("AccessToken", options)
      .clearCookie("RefreshToken", options)
      .json(new ApiResponse(200, "User Logged out successfully!"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while logging out user!");
  }
});

//Search User by email

const searchUser = asyncHandler(async (req, res) => {
  console.log("body----", req.body);

  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Bad Request! Please provide email!");
  }

  const user = await User.find({ email: { $regex: email } }).select(
    "name email"
  );
  if (user < 1) {
    throw new ApiError(404, `Not found! Could not find email "${email}"`);
  }

  const result = user;
  console.log(result);

  return res.status(200).json(new ApiResponse(200, result, "User found!"));
});

// Automatically log out user after each session.

export { registerUser, loginUser, getCurrentUser, logout, searchUser };
