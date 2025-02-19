import { model, Schema } from "mongoose";
import { IProfession } from "../types/profession.type";

const professionSchema = new Schema<IProfession>(
  {
    name: {
      type: String,
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
  },
  { timestamps: true }
);

export const Profession = model<IProfession>("Profession", professionSchema);
