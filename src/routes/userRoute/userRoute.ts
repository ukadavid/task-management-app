import express from "express";
import {
  loginUser,
} from "../../controller/userController/userLogin";
import { updateUserProfile } from "../../controller/userController/userprofileUpdate";
import { createUser } from "../../controller/userController/userSignup";
import { verifyUser } from "../../controller/userController/userVerification";

const router = express.Router();

router.post("/register", createUser);

router.post("/verify/:id", verifyUser);

router.post("/login", loginUser);

router.put("/update/:userId", updateUserProfile);

export default router;
