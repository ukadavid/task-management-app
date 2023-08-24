import express from "express";
import {
  createUser,
  verifyUser,
  loginUser,
  logout,
} from "../controller/userController";
import { updateUserProfile } from "../controller/userprofileUpdate";
import { authenticateUser } from "../middlewares/auth";

const router = express.Router();

router.post("/register", createUser);

router.post("/verify/:id", verifyUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.put("/update/:userId", updateUserProfile);

export default router;
