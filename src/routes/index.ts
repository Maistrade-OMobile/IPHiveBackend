import { Router } from "express";
import { getWaitlist, postWaitlist } from "../Controllers/main.controller";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is up and running"
  });
});

router.get("/waitlist", getWaitlist);

router.post("/waitlist", postWaitlist);

export default router;
