import { NextFunction, Response } from "express";
import { JWTRequest } from "../middlewares/auth.middleware";

import User from "../models/user.model";
import Innovation from "../models/innovation.model";

interface InnovationBody {
  type: string;
  title: string;
  description: string;
}

interface InnovationFilters {
  type?: string | string[];
  status?: string | string[];
  filingDate?: {
    $lte?: string | Date;
    $gte?: string | Date;
  };
}

interface InnovationQuery {
  type?: string | string[];
  status?: string | string[];
  minDate?: string;
  maxDate?: string;
}

export const submitInnovation = async (
  req: JWTRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const relatedDocuments = req.files as Express.Multer.File[];

    if (!relatedDocuments || relatedDocuments.length === 0)
      throw new Error("No files uploaded");

    const relatedDocumentsUrls = relatedDocuments.map((file) => file.path);

    const { body, user } = req;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not logged in"
      });
    }

    const { type, title, description } = body as InnovationBody;
    const { userId } = user;

    const newInnovation = new Innovation({
      type,
      title,
      description,
      owner: userId,
      relatedDocuments: relatedDocumentsUrls
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
};

export const getInnovations = async (
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
};
