import { model, Schema } from "mongoose";
import { IPayment } from "../types/payment.type";

const paymentSchema = new Schema<IPayment>(
  {
    payment: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      type: Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>("Payment", paymentSchema);
