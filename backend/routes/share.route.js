import express from "express";
import {
  storeSharedData,
  displaySharedPassword,
  showSharedPassword,
} from "../controllers/sharePassword.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/store").post(authMiddleware, storeSharedData);
router.route("/getList").get(authMiddleware, displaySharedPassword);
router.route("/view/:id").get(authMiddleware, showSharedPassword);

export default router;
