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
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Missing or invalid Auth token"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { SECRET_KEY = "" } = process.env;
    const decoded = jwt.verify(token, SECRET_KEY) as User;
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      message: "invalid or expired token"
    });
  }
}
