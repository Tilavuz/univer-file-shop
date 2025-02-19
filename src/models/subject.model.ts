import { model, Schema } from "mongoose";
import { ISubject } from "../types/subject.type";

const subjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: Schema.Types.ObjectId,
      ref: "Profession",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subject = model<ISubject>("Subject", subjectSchema);
