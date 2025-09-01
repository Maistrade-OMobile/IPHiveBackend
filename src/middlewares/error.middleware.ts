import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error details
  console.error("Error:", err);

  // Set status code (default to 500)
  const status = err.statusCode || err.status || 500;

  // Avoid leaking stack traces or sensitive info in production

  type LastResponse = {
    status: string;
    success: boolean;
    message: string;
    stack: string;
  };

  const response: LastResponse = {
    status: "error",
    success: false,
    message: err.message || "Internal Server Error"
  };

  if (err.name === "JsonWebTokenError") {
    response.message = "invalid token";
  }
  if (err.name === "TokenExpiredError") {
    response.message = "token expired";
  }

  // Optionally include stack trace in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  console.error(err);
  return res.status(status).json(response);
}
