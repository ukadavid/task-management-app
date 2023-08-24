import { Request, Response } from "express";
import User, { UserDocument } from "../../model/users";
import Admin, { AdminDocument } from "../../model/admins";
import { validationResult } from "express-validator";
import {
  createUserValidator,
  createAdminValidator,
  loginAdminSchema,
} from "../../utils/utils";
import {
  generateOtp,
  generateToken,
  sendVerificationOTP,
  GeneratePassword,
  GenerateSalt,
  sendVerificationEmail,
} from "../../utils/notifications";
import { loginUserSchema, variables } from "../../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

// Admin Registration
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const salt = await GenerateSalt();
    const hashedPassword = await GeneratePassword(password, salt);

    const newAdmin: AdminDocument = new Admin({
      username,
      password: hashedPassword,
      email,
      role: "admin",
    });

    await newAdmin.save();

    const token = await generateToken(email, res);

    return res.status(201).json({
      message: "Admin created successfully",
      newAdmin,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ****************************** ALL LOGINS *************************************** //

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validationResult = loginUserSchema.validate(req.body, variables);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    const { email, password } = req.body;

    const user: UserDocument | null = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.status !== "verified") {
      return res.status(401).json({ error: "User account not verified" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = await generateToken(user, res);

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const validationResult = loginAdminSchema.validate(req.body, variables);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error.details[0].message });
    }

    const { email, password } = req.body;
    const trimmedEmail = email.trim();

    const admin: AdminDocument | null = await Admin.findOne({
      email: trimmedEmail,
    });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = await generateToken(admin, res);

    return res.status(200).json({ message: "Login successful", admin, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
