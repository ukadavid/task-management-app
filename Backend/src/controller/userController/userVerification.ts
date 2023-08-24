import { Request, Response } from "express";
import User from "../../model/users";

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
