import { model, Schema } from "mongoose";
import { IFaculty } from "../types/faculty.type";

const facultySchema = new Schema<IFaculty>(
  {
    name: {
      type: String,
      required: true,
    },
    univer: {
      type: Schema.Types.ObjectId,
      ref: "Univer",
      required: true,
    },
  },
  { timestamps: true }
);

export const Faculty = model<IFaculty>("Faculty", facultySchema);
