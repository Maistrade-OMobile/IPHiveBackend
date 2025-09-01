import { Router } from "express";
import Waitlist from "../models/waitlist.model";

const router = Router();

// Health check
router.post("/waitlist", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - Nothing is being sent"
      });
    }

    const { name, emailAddress, role } = req.body;

    if (!name || !emailAddress || !role) {
      return res.status(400).json({
        success: false,
        message: "Incomplete request - emailAddress, name or role not provided"
      });
    }

    const waitlistUser = await Waitlist.findOneAndUpdate(
      { emailAddress },
      {
        $setOnInsert: { name, emailAddress, role }
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "waitlist user created successfully ",
      data: waitlistUser
    });
  } catch (err) {
    next(err);
  }
});

router.get("/waitlist", async (req, res, next) => {
  try {
    const waitlistUsers = await Waitlist.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "waitlist users retrieved",
      data: waitlistUsers
    });
  } catch (err) {
    next(err);
  }
});

export default router;
