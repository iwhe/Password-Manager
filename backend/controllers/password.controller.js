import Password from "../models/password.model.js";
import UserPassword from "../models/userPassword.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import SharePassword from "../models/sharePassword.model.js";

// Save the new password with encryption on db
const savePassword = asyncHandler(async (req, res) => {
  const { site, siteEmail, password, notes } = req.body;
  const user = req.user;

  // if ([site, siteEmail, password, user].some((field) => field?.trim() === "")) {
  //   throw new ApiError(400, "Fill all the fields!");
  // }

  const existingPassword = await Password.findOne({
    site: site,
    siteEmail: siteEmail,
  });

  if (existingPassword) {
    throw new ApiError(403, "Password for this account exist already!");
  }

  const newPassword = await Password.create({
    userId: user._id,
    site,
    siteEmail,
    password: password,
    notes,
  });

  const normalization = await UserPassword.create({
    user: user._id,
    password: newPassword._id,
  });

  console.log("neew password:::", newPassword);
  // console.log("Normalization:::", normalization);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { newPassword, normalization },
        "Password saved successfully"
      )
    );
});

// Get the List of password saved by the user
const passwordList = asyncHandler(async (req, res) => {
  const user = req.user;
  const userFound = await UserPassword.find({ user: user._id }).sort({
    createdAt: -1,
  });

  if (userFound.length < 1) {
    console.log("Could not find user");
  }

  const password = userFound.map((userPassword) => userPassword.password);

  const passwordDetails = await Promise.all(
    password.map(async (id) => {
      return await Password.findById(id).select("_id site siteEmail");
    })
  );

  console.log(passwordDetails);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        passwordDetails,
        "Password List fetched successfully"
      )
    );
});

// Display specific password details on id
const getPasswordById = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    if (!id) {
      throw new ApiError(400, "Could not find id");
    }

    const password = await Password.findById(id);
    if (!password) {
      throw new ApiError(404, "Password not found");
    }

    const passwordShared = await SharePassword.find({ password: id });
    console.log("passwordShared", passwordShared);

    if (
      !password.userId.equals(user._id) &&
      !passwordShared.some((shared) => shared.sharedWith.equals(user._id))
    ) {
      console.log("password.userId", password.userId);

      console.log("somemee");
      throw new ApiError(
        401,
        "You are not authorized to view/edit this password"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, password, "Password retrieved successfully!"));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Otherwise, throw a generic error
    throw new ApiError(500, "Something went wrong while retrieving password.");
    // throw new ApiError(500, "Something went wrong while retrieving password.");
  }
});

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const details = req.body;
  console.log("Details:::::::::", details);

  const { site, siteEmail, password, notes } = details;
  console.log({ id, site, siteEmail, password, notes });

  if ([site, siteEmail, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "You cannot leave empty fields");
  }
  if (!id) {
    throw new ApiError(400, "Bad Request! Could not find password id");
  }

  const updatePassword = await Password.findByIdAndUpdate(id, {
    site: details.site,
    siteEmail: details.siteEmail,
    password: details.password,
    notes: details.notes,
  });
  const updatedPassword = await Password.findById(updatePassword._id);

  if (!password) {
    throw new ApiError(404, "Password not found, cannot be updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPassword, "Password updated successfully!")
    );
});

// Delete Password
const deletePassword = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Bad Request! Could not get the password id!");
  }

  try {
    const deletedPassword = await Password.findByIdAndDelete(id);
    console.log(deletedPassword);

    if (!deletedPassword) {
      throw new ApiError(
        404,
        "Not Found! Password with given id doesn't exist."
      );
    }

    const userPassword = await UserPassword.findOneAndDelete({
      password: deletedPassword._id,
    });

    if (!userPassword) {
      throw new ApiError(
        404,
        "Not found! Something went wrong while searching password in User Password model"
      );
    }

    const sharedPasswords = await SharePassword.find({
      password: deletedPassword._id,
    });
    for (const sp of sharedPasswords) {
      await SharePassword.findOneAndDelete({ _id: sp._id });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Password deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

// GENERATE PASSWWORD //
// requirement:
// 10 - 12
// [0-9a-zA-Z@!#$%^&]

export {
  savePassword,
  passwordList,
  getPasswordById,
  updatePassword,
  deletePassword,
};
