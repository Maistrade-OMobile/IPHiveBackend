import { Router } from "express";
import { getWaitlists, createWaitlist } from "../controllers/waitlist.controller";
import { createWaitlistValidator } from "../utils/validator/waitlist.validator";
import { validateInput } from "../middlewares/validateForm.middleware";

const waitlistRouter = Router();

waitlistRouter.get("/", getWaitlists);
waitlistRouter.post("/", createWaitlistValidator, validateInput, createWaitlist);

export default waitlistRouter;
