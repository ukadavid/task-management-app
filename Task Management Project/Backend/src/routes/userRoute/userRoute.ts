import express from "express";
import { loginUser } from "../../controller/userController/userLogin";
import { updateUserProfile } from "../../controller/userController/userprofileUpdate";
import { createUser } from "../../controller/userController/userSignup";
import { verifyUser } from "../../controller/userController/userVerification";
import { forgotPasswordOTP } from "../../controller/userController/userForgotPasswordOTP";
import { changePassword } from "../../controller/userController/userPasswordReset";
import { authenticateUser } from "../../middlewares/userAuth";

const router = express.Router();

router.post("/register", createUser);

router.post("/verify/:id", verifyUser);

router.post("/login", authenticateUser, loginUser);

router.put("/update/:userId", authenticateUser, updateUserProfile);

router.post("/update", forgotPasswordOTP);
router.patch("/update", changePassword);

export default router;
