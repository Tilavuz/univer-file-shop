import { model, Schema } from "mongoose";
import { IUniver } from "../types/univer.type";

const univerSchema = new Schema<IUniver>(
  {
    name: {
      type: String,
      required: true,
      minlength: 15,
    },
  },
  { timestamps: true }
);

export const Univer = model<IUniver>("Univer", univerSchema);
