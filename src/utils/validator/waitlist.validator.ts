import { body } from "express-validator";

export const createWaitlistValidator = [
  body("fullName")
    .notEmpty().withMessage("Full name is required")
    .isLength({ max: 50 }).withMessage("Name cannot be more than 50 characters"),

  body("email")
    .notEmpty().withMessage("Email address is required")
    .isEmail().withMessage("Please provide a valid email"),

  body("role")
    .notEmpty().withMessage("Role is required")
    .isIn(["innovator", "investor"])
    .withMessage("Invalid role"),

  body("receiveEmailUpdates")
    .isBoolean().withMessage("receiveEmailUpdates must be a boolean"),
];
