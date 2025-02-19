import { model, Schema } from "mongoose";
import { IUser } from "../types/user.type";

const userSchema = new Schema<IUser>(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
