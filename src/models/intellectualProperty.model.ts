import { model, Schema, Types, Document } from "mongoose";

export interface IIntellectualProperty extends Document {
  type: "patent" | "trademark" | "copyright" | "design" | string;
  title: string;
  description?: string;
  status: "pending" | "filed" | "approved" | "rejected";
  applicationNumber?: string;
  owners: Types.ObjectId[];
  jurisdiction: string;
  // inventors: Types.ObjectId[];
  filingDate: Date;
  expirydate: Date;
  relatedDocuments: string[];
}
const intellectualPropertySchema = new Schema<IIntellectualProperty>(
  {
    type: {
      type: String,
      enum: ["patent", "trademark", "copyright", "design"],
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "filed", "approved", "rejected"],
      index: true
    },
    jurisdiction: {
      type: String
    },
    applicationNumber: {
      type: String
    },
    owners: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      }
    ],
    filingDate: {
      type: Date,
      index: true
    },
    expirydate: Date,
    relatedDocuments: [String]
  },
  { timestamps: true }
);

const IntellectualProperty = model(
  "intellectualProperty",
  intellectualPropertySchema
);

export default IntellectualProperty;
