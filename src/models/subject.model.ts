import { model, Schema } from "mongoose";
import { ISubject } from "../types/subject.type";

const subjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
    },
    semester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  },
  { timestamps: true }
);

export const Subject = model<ISubject>("Subject", subjectSchema);
