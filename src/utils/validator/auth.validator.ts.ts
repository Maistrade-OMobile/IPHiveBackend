import { body, param } from "express-validator";

export const registerUserValidator = [
  body("fullName")
    .notEmpty().withMessage("Full name is required")
    .isString().withMessage("Full name must be a string")
    .isLength({ max: 50 }).withMessage("Full name cannot be more than 50 characters"),

  body("emailAddress")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@, $, !, %, *, ?, &)"),

   
  body("role")
    .notEmpty().withMessage("Role is required")
    .isIn(["innovator", "investor"])
    .withMessage("Invalid role"),
];

export const loginUserValidator = [
  body("emailAddress")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

export const sendResetEmailValidator = [
  body("emailAddress")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email")
    .normalizeEmail(),
];

export const validateResetTokenValidator = [
  param("token")
    .notEmpty().withMessage("Token is required")
    .isString().withMessage("Token must be a string"),
];

export const resetUserPasswordValidator = [
  param("token")
    .notEmpty().withMessage("Token is required"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@, $, !, %, *, ?, &)"),
];

