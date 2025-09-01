import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err);

  const status = err.statusCode || err.status || 500;


  type LastResponse = {
    status: string;
    success: boolean;
    message: string;
    stack?: string;
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

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  console.error(err);
  return res.status(status).json(response);
}
