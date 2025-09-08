import { Router } from "express";
import {
  getWaitlists,
  createWaitlist
} from "../controllers/waitlist.controller";
import { createWaitlistValidator } from "../utils/validator/waitlist.validator";
import {
  registerUser,
  loginUser,
  sendResetEmail,
  validateResetToken,
  resetUserPassword
} from "../controllers/auth.controller";
import {
  registerUserValidator,
  loginUserValidator,
  sendResetEmailValidator,
  validateResetTokenValidator,
  resetUserPasswordValidator,
} from "../utils/validator/auth.validator.ts";
import { validateInput } from "../middlewares/validateForm.middleware";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is up and running"
  });
});

router.get("/waitlist", getWaitlists);
router.post("/waitlist", createWaitlistValidator, validateInput, createWaitlist);

router.post("/auth/register",registerUserValidator, validateInput, registerUser);
router.post("/auth/login", loginUserValidator, validateInput, loginUser);
router.post("/auth/forgot-password", sendResetEmailValidator, validateInput, sendResetEmail)
router.get("/auth/reset-password/:token", validateResetToken);
router.post("/auth/reset-password/:token", resetUserPasswordValidator, validateInput,  resetUserPassword)

export default router;
