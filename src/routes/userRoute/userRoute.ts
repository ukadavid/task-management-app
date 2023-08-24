import express from "express";
import {
  createUser,
  verifyUser,
  loginUser,
} from "../../controller/userController/userController";
import { updateUserProfile } from "../../controller/userController/userprofileUpdate";
import { authenticateUser } from "../../middlewares/auth";

const router = express.Router();

router.post("/register", createUser);

router.post("/verify/:id", verifyUser);

router.post("/login", loginUser);

router.put("/update/:userId", updateUserProfile);

export default router;
