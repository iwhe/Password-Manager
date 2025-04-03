import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logout,
  searchUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { twoFA, verifyToken, store2FAsecret } from "../controllers/TwoFA.js";

router.route("/register").post(registerUser);
router.route("/totp-secret").post(twoFA);
router.route("/store-secret").post(store2FAsecret);
router.route("/verify-secret").post(verifyToken);
router.route("/check-2fa-verification").get(authMiddleware, getCurrentUser);
router.route("/login").post(loginUser);
router.route("/me").get(authMiddleware, getCurrentUser);
router.route("/logout").post(authMiddleware, logout);
router.route("/search").post(searchUser);

export default router;
