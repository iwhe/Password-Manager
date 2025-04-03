import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/users.model.js";
import TwoFA from "../models/twofa.model.js";

const generateQR = async (text) => {
  try {
    console.log("URL:::::", text);
    const data = await qrcode.toDataURL(text);
    return data;
  } catch (err) {
    throw new ApiError(500, "Error generating QR code");
  }
};

const generateSecretAndQr = async (userEmail) => {
  const secret = speakeasy.generateSecret();
  const url = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: userEmail,
    issuer: "Password Manager",
    algorithm: "sha512",
  });

  const qr = await generateQR(url);

  return {
    secret,
    qr,
  };
};

const twoFA = asyncHandler(async (req, res) => {
  console.log("Initiating 2 fa!!", req?.body);
  const userId = req?.body.userId || req.user._id;
  const user = await User.findById(userId);
  const userEmail =user?.email;

  // check if user already has 2fa stored
  const userExists = await TwoFA.findOne({ user: userId });
  const authSecret = null;
  const authqr = null;
  
  if(userExists){
    const secret = userExists.secret;
    const url = speakeasy.otpauthURL({
        secret: secret,
        label: userEmail,
        issuer: "Password Manager",
        algorithm: "sha512",
    });
    const qr = await generateQR(url);
  } else{
    authSecret, authqr = await generateSecretAndQr(userEmail);
  }


  // const secret = speakeasy.generateSecret();

  // const url = speakeasy.otpauthURL({
  //   secret: secret.ascii,
  //   label: userEmail,
  //   issuer: "Password Manager",
  //   algorithm: "sha512",
  // });

  // const generateQR = async (text) => {
  //   try {
  //     console.log("URL:::::", text);

  //     const data = await qrcode.toDataURL(text);
  //     //   console.log("DATAAA QR ::::::::", data);
  //     return data;
  //   } catch (err) {
  //     throw new ApiError(500, "Error generating QR code");
  //   }
  // };
  const qr = await generateQR(url);

  //   console.log(generateQR);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { secret, qr, name: user.name },
        "Two FA authentication code geneerated successfully"
      )
    );
});

const store2FAsecret = asyncHandler(async (req, res) => {
  //fetch user
  const userId = req?.body.userId || req.user._id;
  console.log("user id", userId);
  //search user
  const user = await User.findById(userId);
  // if (user) {
  //   var userEmail = user.email;
  // }
  const secret = req?.body.secret;

  const userExists = await TwoFA.findOne({ user: userId });

  let result = null;
  if (userExists) {
    console.log("User already exists.");
    const update2FA = await TwoFA.findByIdAndUpdate(userExists._id, {
      secret: secret.base32,
    });
    result = update2FA;
    console.log("updated 2fa secret", update2FA);
  } else {
    const create2FA = await TwoFA.create({
      user: userId,
      secret: secret.base32,
    });
    result = create2FA;
    console.log("2fa secret Created successfully.", create2FA);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Secret stored successfully!"));
});

const verifyToken = asyncHandler(async (req, res) => {
  //login garda userID
  //register garda secret aaunu paryo body ma
  console.log("body::", req.body);
  const userSecret = await req.body?.secret.userOtp;
  const userID = req.body?.secret.userId;

  if (!userID || !userSecret) {
    throw new ApiError(400, "Please provide ToTP and userId");
  }

  const twoFaModel = await TwoFA.findOne({ user: userID });
  if (!twoFaModel) {
    console.log("User ID is not found");
    throw new ApiError(401, "Please set up two FA first. User ID is not found");
  }
  const secret = twoFaModel.secret;
  console.log("User Token:", userSecret);

  // if (!userSecret) {
  //   throw new ApiError(400, "Very Bad! Not expected");
  // }

  // const userToken = req.body.secret;

  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: "base32",
    token: userSecret,
  });

  if (!verified) {
    throw new ApiError(400, "Unable to verify TOTP!");
  }

  const verifiedDate = await TwoFA.findByIdAndUpdate(
    twoFaModel._id,
    { verifiedOn: new Date() },
    { new: true }
  );
  console.log("Updated Document:", verifiedDate);

  if (!verifiedDate) {
    throw new ApiError(500, "Something went wrong while updating date");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Verified Successfully!"));
});

export { twoFA, store2FAsecret, verifyToken };
