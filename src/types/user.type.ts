import { Document } from "mongoose";

export interface IUser extends Document {
  chatId: string;
  phone: string;
  action: string;
}
