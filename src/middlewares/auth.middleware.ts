import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
type User = {
  userId: string;
  email: string;
};
export interface JWTRequest extends Request {
  user?: User;
}

export default function authMiddleware(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  // const authHeader = req.headers.authorization;
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

    const decoded = jwt.verify(token, JWT_SECRET) as User;
    console.log("decoded", decoded);

    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (err) {
    console.error(err);
  }
}
