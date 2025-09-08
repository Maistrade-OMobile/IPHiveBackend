import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullName, emailAddress, password, role } = req.body;

    const existing = await User.findOne({ emailAddress });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      emailAddress,
      role: role,
      password: hashed,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailAddress, password } = req.body;

    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ( pending ) -> generate JWT
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const sendResetEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emailAddress } = req.body;

    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(400).json({ message: "No user with this email" });
    }

    const token = Math.random().toString(36).substring(2);
    user.resetPasswordToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 30;
    await user.save();

    // ( Pending ) -> Email Logic
    res.json({ message: "Password reset email sent", token });
  } catch (err) {
    next(err);
  }
};

export const validateResetToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params; 

    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.json({ message: "Token is valid" });
  } catch (err) {
    next(err);
  }
};


export const resetUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params; 
    const { password } = req.body; 

    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};

