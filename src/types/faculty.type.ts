import { Document, Types } from "mongoose";

export interface IFaculty extends Document {
  name: string;
  univer: Types.ObjectId;
}
