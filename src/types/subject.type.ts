import { Document, Types } from "mongoose";

export interface ISubject extends Document {
  name: string;
  profession: Types.ObjectId;
}
