import { NextFunction, Request, Response } from "express";
import Waitlist from "../models/waitlist.model";

export const getWaitlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const postWaitlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - Nothing is being sent"
      });
    }

    const { fullName, emailAddress, role } = req.body;

    if (!fullName || !emailAddress || !role) {
      return res.status(400).json({
        success: false,
        message: "Incomplete request - emailAddress, name or role not provided"
      });
    }

    let waitlistUser = await Waitlist.findOne({ emailAddress });
    if (!waitlistUser) {
      waitlistUser = new Waitlist({ fullName, emailAddress, role });
      await waitlistUser.save();
    }

    return res.status(201).json({
      success: true,
      message: "waitlist user created successfully ",
      data: waitlistUser
    });
  } catch (err) {
    next(err);
  }
};
