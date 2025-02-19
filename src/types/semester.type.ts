import { Document, Types } from "mongoose";

export interface ISemester extends Document {
  which: number;
  profession: Types.ObjectId;
}
