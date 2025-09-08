import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => {
        const e = err as ValidationError & { param?: string };
        return {
          field: e.param ?? "unknown",
          message: e.msg
        };
      })
    });
  }

  next();
};
