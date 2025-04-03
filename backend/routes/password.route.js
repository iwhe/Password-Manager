import express from "express";
const router = express.Router();

import authMiddleware from "../middlewares/auth.middleware.js";
import {
  savePassword,
  passwordList,
  getPasswordById,
  updatePassword,
  deletePassword,
} from "../controllers/password.controller.js";

router.route("/save").post(authMiddleware, savePassword);
router.route("/list").get(authMiddleware, passwordList);
router.route("/view/:id").get(authMiddleware, getPasswordById);
router.route("/update/:id").put(authMiddleware, updatePassword);
router.route("/delete/:id").delete(authMiddleware, deletePassword);

export default router;
