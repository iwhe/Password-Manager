import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import TwoFA from "../models/twofa.model.js";
import isDateExpired from "../utils/compareDate.js";

const authMiddleware = asyncHandler(async (req, _, next) => {
  // try {
  const token =
    req.cookies?.AccessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }

  //Check for 2fa verification here
  const userIn2Fa = await TwoFA.findOne({ user: user._id });
  if (!userIn2Fa) {
    throw new ApiError(
      403,
      "User has not setup two factor authentication yet."
    );
  }
  const userVerifiedDate = userIn2Fa.verifiedOn;
  console.log("User 2FA Verified Date:", userVerifiedDate);

  if (!userVerifiedDate) {
    throw new ApiError(403, "User has not verified their 2fa yet.");
  }

  const twoFaExpired = isDateExpired(userVerifiedDate);
  console.log("twoFaExpired:", twoFaExpired);

  if (twoFaExpired) {
    console.log("TWO FA IS EXPIRED!!");
    throw new ApiError(403, "User Two FA is expired, please verify again.");
  }

  req.user = user;
  console.log("Auth Middleware Success!");
  next();
  // } catch (error) {
  //   throw new ApiError(error.statusCode, error.message);
  // }
});

const userDetails = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.AccessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decoded?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }
  req.user = user;
  console.log("User details found successfully!!");
  next();
});

export default authMiddleware;
