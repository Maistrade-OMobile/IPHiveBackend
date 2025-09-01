import { Router } from "express";
import {
  getWaitlists,
  createWaitlist
} from "../controllers/waitlist.controller";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is up and running"
  });
});

router.get("/waitlists", getWaitlists);

router.post("/waitlist", createWaitlist);

export default router;
