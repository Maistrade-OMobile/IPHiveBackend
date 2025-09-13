import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware";
import upload from "../config/cloudinary";

import {
  submitInnovation,
  getInnovations
} from "../controllers/dashboard.controller";

const dashboardRouter = Router();


/**
 * Submit an IP
 * Get IPs for a particular user
 * - innovator
 * - ippto staff
 */

dashboardRouter.use(authMiddleware);
dashboardRouter.post(
  "/",
  upload.array("relatedDocuments", 10),
  submitInnovation
);

dashboardRouter.get("/innovations", getInnovations);

export default dashboardRouter;
