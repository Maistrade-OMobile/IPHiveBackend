import { model, Schema, Types, Document } from "mongoose";

export interface IInnovation extends Document {
  type: "patent" | "trademark" | "copyright" | "design" | string;
  title: string;
  description?: string;
  status: "pending" | "filed" | "approved" | "rejected";
  applicationNumber?: string;
  owner: Types.ObjectId;
  jurisdiction: string;
  // inventors: Types.ObjectId[];
  filingDate: Date;
  expirydate: Date;
  relatedDocuments: string[];
}
const innovationSchema = new Schema<IInnovation>(
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
      default: "pending",
      enum: ["pending", "filed", "approved", "rejected"],
      index: true
    },
    jurisdiction: {
      type: String
    },
    applicationNumber: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    filingDate: {
      type: Date,
      index: true
    },
    expirydate: Date,
    relatedDocuments: [String]
  },
  { timestamps: true }
);

const Innovation = model("innovation", innovationSchema);

export default Innovation;
