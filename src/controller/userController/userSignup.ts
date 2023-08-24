import { Request, Response } from "express";
import User, { UserDocument } from "../../model/users";
import { createUserValidator } from "../../utils/utils";
import {
  generateOtp,
  generateToken,
  sendVerificationOTP,
  GeneratePassword,
  GenerateSalt,
} from "../../utils/notifications";

// User Registration
export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      firstName,
      lastName,
      userName,
      phoneNumber,
      password,
      confirm_password,
    } = req.body;

    const validationResult = createUserValidator.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }

    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const { otp, expiry } = generateOtp();
    const token = await generateToken(email, res);
    await sendVerificationOTP(email, otp);

    const newUser: UserDocument = await User.create({
      firstName,
      lastName,
      userName,
      phoneNumber,
      email,
      password: hashedPassword,
      otp,
      expiry,
      status: "pending",
    });

    return res.status(200).json({
      message: "Proceed to verify your account",
      user: newUser,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User Verification
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        message: "User not found, kindly create an account",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.expiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.status = "verified";
    user.otp = null;
    user.expiry = null;
    await user.save();

    return res
      .status(200)
      .json({ message: "User verified successfully, proceed to Login" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
