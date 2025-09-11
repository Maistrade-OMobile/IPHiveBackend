import { Router } from "express";
import authRouter from "./auth.route";
import waitlistRouter from "./waitlist.route";
import dashboardRouter from "./dashboard.route";

const router = Router();

// Health check
router.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Backend is up and running",
  });
});

router.use("/auth", authRouter);
router.use("/waitlist", waitlistRouter);
router.use("/dashboard", dashboardRouter);

export default router;
