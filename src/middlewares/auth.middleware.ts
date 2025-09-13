import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import User from "../models/user.model.js";

type UserType = {
  userId: string;
  email: string;
};
export interface JWTRequest extends Request {
  user?: UserType;
}

export default async function authMiddleware(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing or invalid Auth token"
      });
    }

    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
      throw new Error("empty JWT_SECRET ");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as UserType;

    const { userId } = decoded;
    const currentUser = await User.findOne({ _id: userId });
    if (!userId || !currentUser) {
      return res.status(400).json({
        success: false,
        message: "invalid userId"
      });
    }

    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (err) {
    next(err);
  }
}
