// 1. Get password Id, user owner id, user shared with id, and permission as a request.
// 2. Check password
// 3. Check if user owner id and user shared with id are same or not.
// 4. If not same then store the data in db.
// 5. Response

import Password from "../models/password.model.js";
import SharePassword from "../models/sharePassword.model.js";
import User from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

//Store shared Password details
const storeSharedData = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  const { passwordId, sharedWithId, permission } = req.body;
  console.log("details", { passwordId, sharedWithId, permission });

  const password = await Password.findById(passwordId);
  if (!password) {
    throw new ApiError(404, "Password not found");
  }

  const owner = await User.findById(ownerId);
  if (!owner) {
    throw new ApiError(404, "Owner not found");
  }

  const shared = await User.findById(sharedWithId);
  if (!shared) {
    throw new ApiError(404, "Shared User not found");
  }

  if (ownerId == sharedWithId) {
    throw new ApiError(400, "You can't share password with yourself");
  }

  //Check if same password has been shared already to same user
  const prevShared = await SharePassword.findOne({
    password: passwordId,
    sharedWith: sharedWithId,
  });

  if (prevShared) {
    console.log("Prev shared:", prevShared);
    throw new ApiError(400, "Password has been already shared!");
  }

  //store data in db
  const sharedPassword = await SharePassword.create({
    password: passwordId,
    owner: ownerId,
    sharedWith: sharedWithId,
    permission: permission,
  });

  if (!sharedPassword) {
    throw new ApiError(500, "Failed to store shared password");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        sharedPassword,
        "Shared Password stored successfully"
      )
    );
});

//Display list of shared password to you
const displaySharedPassword = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("userid", userId);

  if (!userId) {
    throw new ApiError(401, "Unauthorised! User not found");
  }
  // console.log(userId);

  const sharedPassword = await SharePassword.find({ sharedWith: userId });

  if (sharedPassword.length < 1) {
    throw new ApiError(404, "No shared password found");
  }

  // const res1 = sharedPassword.map((password) => {
  //   return password.password, password.owner, password.sharedWith;
  // });

  const sharedPasswordDetails = await Promise.all(
    sharedPassword.map(async (passwordDetail) => {
      return await Password.findById(passwordDetail.password);
    })
  );

  const ownerDetails = await Promise.all(
    sharedPassword.map(async (passwordDetail) => {
      return await User.findById(passwordDetail.owner);
    })
  );

  const result = sharedPassword.map((passwordDetail, index) => {
    const passwordData = sharedPasswordDetails[index];
    const ownerData = ownerDetails[index];
    return {
      passwordId: passwordDetail.password,
      ownerEmail: ownerData.email,
      ownerName: ownerData.name,
      sitename: passwordData.site,
      sharedId: passwordDetail._id,
      permission: passwordDetail.permission,
    };
  });

  // console.log(res1);
  return res.status(200).json(result);
});

//Password details by id
const showSharedPassword = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log("User", userId);

  const id = req.params.id;

  if (!id) {
    throw new ApiError(400, "Shared Password Id not provided!");
  }

  const getShare = await SharePassword.findById(id);

  if (!getShare) {
    throw new ApiError(404, "Shared Password not found");
  }

  console.log("Shared::", getShare.sharedWith);

  if (userId.toString() !== getShare?.sharedWith.toString()) {
    console.log(userId);
    console.log(getShare.sharedWith);

    throw new ApiError(401, "User not authorised to access password!");
  }

  const passwordDetail = await Password.findById(getShare?.password);

  if (!passwordDetail) {
    throw new ApiError(404, "Password not found");
  }

  const ownerData = await User.findById(getShare?.owner);
  if (!ownerData) {
    throw new ApiError(404, "Owner not found");
  }

  const result = {
    ownerName: ownerData.name,
    ownerEmail: ownerData.email,
    permission: getShare.permission,
    password: {
      passwordId: passwordDetail._id,
      site: passwordDetail.site,
      siteEmail: passwordDetail.siteEmail,
      password: passwordDetail.password,
      notes: passwordDetail.notes,
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Shared Password Detail fetched successfully!"
      )
    );
});

//Remove User from share
const removeUserFromShare = asyncHandler(async (req, res) => {
  const userId = req.user._id;
});
export {
  storeSharedData,
  displaySharedPassword,
  showSharedPassword,
  removeUserFromShare,
};
