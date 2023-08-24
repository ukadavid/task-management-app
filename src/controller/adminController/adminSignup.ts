import { Request, Response } from "express";
import Admin, { AdminDocument } from "../../model/admins";
import { validationResult } from "express-validator";
import {
  generateToken,
  GeneratePassword,
  GenerateSalt,
} from "../../utils/notifications";

// Admin Signup
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
