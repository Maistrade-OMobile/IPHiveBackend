import { Router } from "express";
import {
  registerUser,
  loginUser,
  sendResetEmail,
  validateResetToken,
  resetUserPassword,
} from "../controllers/auth.controller";
import {
  registerUserValidator,
  loginUserValidator,
  sendResetEmailValidator,
  validateResetTokenValidator,
  resetUserPasswordValidator,
} from "../utils/validator/auth.validator";
import { validateInput } from "../middlewares/validateForm.middleware";

const authRouter = Router();

authRouter.post("/register", registerUserValidator, validateInput, registerUser);
authRouter.post("/login", loginUserValidator, validateInput, loginUser);
authRouter.post("/forgot-password", sendResetEmailValidator, validateInput, sendResetEmail);
authRouter.get("/reset-password/:token", validateResetTokenValidator, validateResetToken);
authRouter.post("/reset-password/:token", resetUserPasswordValidator, validateInput, resetUserPassword);

export default authRouter;
