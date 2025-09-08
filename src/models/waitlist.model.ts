import { Schema, model, Document } from "mongoose";

interface WaitlistEntry extends Document {
  fullName: string;
  email: string;
  role: "innovator" | "investor";
  receiveEmailUpdates : boolean; 
}

const waitlistSchema = new Schema<WaitlistEntry>(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true,
      enum: ["innovator", "investor"]
      // default: "innovator"
    },
    receiveEmailUpdates: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Waitlist = model("waitlist", waitlistSchema);
export default Waitlist;
