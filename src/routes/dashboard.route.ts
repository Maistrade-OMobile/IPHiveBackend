import { NextFunction, Response } from "express";
import { Router } from "express";

import Property from "../models/innovation.model";
import User from "../models/user.model";
import authMiddleware, { JWTRequest } from "../middlewares/auth.middleware";
import Innovation from "../models/innovation.model";
import upload from "../config/cloudinary";

const dashboardRouter = Router();

interface InnovationBody {
  type: string;
  title: string;
  description: string;
}

interface InnovationQuery {
  type?: string | string[];
  status?: string | string[];
  minDate?: string;
  maxDate?: string;
}

/**
 * Submit an IP
 * Get IPs for a particular user
 * - innovator
 * - ippto staff
 */

dashboardRouter.use(authMiddleware)
dashboardRouter.post(
  "/",
  // upload.array("relatedDocuments", 10),
  async (
    req: JWTRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {

        console.log(req.cookies);

      const { body, user } = req;

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "user not logged in"
        });
      }

      const { type, title, description } = body as InnovationBody;
      const { userId } = user;

      const currentUser = await User.findOne({ _id: userId });
      if (!userId || !currentUser) {
        return res.status(400).json({
          success: false,
          message: "invalid userId"
        });
      }
      // const { relatedDocuments } = req.files;
      // Run document upload logic

      const newInnovation = new Innovation({
        type,
        title,
        description,
        owner: [currentUser._id]
      });

      await newInnovation.save();

      return res.status(201).json({
        success: true,
        message: "innovation submitted successfully",
        data: newInnovation
      });
    } catch (err) {
      next(err);
    }
  }
);

dashboardRouter.get(
  "/innovations",
  async (
    req: JWTRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return res.status(400).json({
          success: false,
          message: "user not logged in"
        });
      }
      const { userId } = req.user;
      const { type, status, minDate, maxDate } = req.query as InnovationQuery;

      const currentUser = await User.findOne({ _id: userId });

      if (!currentUser) {
        return res.status(400).json({
          success: false,
          message: "invalid userId"
        });
      }

      if (currentUser.role !== "admin" && currentUser.role !== "iptto staff") {
        const currentUserInnovations = await Innovation.find({ owner: userId });
        return res.status(200).json({
          success: true,
          message: "innovations retrieved successfully",
          data: currentUserInnovations
        });
      }

      interface InnovationFilters {
        type?: string | string[];
        status?: string | string[];
        filingDate?: {
          $lte?: string | Date;
          $gte?: string | Date;
        };
      }
      const filters: InnovationFilters = {};

      if (type) filters.type = type;
      if (status) filters.status = status;
      if (maxDate || minDate) {
        filters.filingDate = {};
        if (maxDate) filters.filingDate.$lte = maxDate;
        if (minDate) filters.filingDate.$gte = minDate;
      }

      const allInnovations = await Innovation.find(filters);

      return res.status(200).json({
        success: true,
        message: `${allInnovations.length} innovations retrieved successfully`,
        data: allInnovations
      });
    } catch (err) {
      next(err);
    }
  }
);

export default dashboardRouter;
