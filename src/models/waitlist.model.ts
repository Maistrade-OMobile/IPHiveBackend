import { Schema, model, Document } from "mongoose";

interface WaitlistEntry extends Document {
  fullName: string;
  emailAddress: string;
  role: "innovator" | "investor";
}

const waitlistSchema = new Schema<WaitlistEntry>(
  {
    fullName: {
      type: String,
      required: true
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true,
      enum: ["innovator", "investor"]
      // default: "innovator"
    }
  },
  { timestamps: true }
);

const Waitlist = model("waitlist", waitlistSchema);
export default Waitlist;
