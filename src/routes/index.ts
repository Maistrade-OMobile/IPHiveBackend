import { Router } from "express";
import { getWaitlists, postWaitlist } from "../Controllers/main.controller";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is up and running"
  });
});

router.get("/waitlists", getWaitlists);

router.post("/waitlist", postWaitlist);

export default router;
