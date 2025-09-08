import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  fullName: string;
  emailAddress: string;
  emailVerified: boolean;
  role?:string,
  password?: string;
  userVerificationToken?: string;
  resetPasswordToken?: string;
  resetTokenExpiry?: Date | number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide a full name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    emailAddress: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['innovator', 'investor', 'IPTTO Staff', 'Admin'],
        default: 'innovator',
    },
    password: {
      type: String,
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    userVerificationToken: {
        type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);
const User = mongoose.model<IUser>('User', UserSchema);

export default User;