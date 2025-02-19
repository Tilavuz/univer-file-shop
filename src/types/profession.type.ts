import { Document, Types } from "mongoose";

export interface IProfession extends Document {
  name: string;
  faculty: Types.ObjectId;
}
