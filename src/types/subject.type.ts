import { Document, Types } from "mongoose";

export interface ISubject extends Document {
  name: string;
  semester: Types.ObjectId;
}
