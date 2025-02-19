import { model, Schema } from "mongoose";
import { ISemester } from "../types/semester.type";

const semesterSchema = new Schema<ISemester>(
  {
    which: {
      type: Number,
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

export const Semester = model<ISemester>("Semester", semesterSchema);
