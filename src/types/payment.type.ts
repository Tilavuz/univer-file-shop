import { Document, Types } from "mongoose";

export interface IPayment extends Document {
  payment: Types.ObjectId; // to'lov qilgan foydalanuvchi
  recipient: Types.ObjectId; // Pulni qabul qilgan foydalanuvchi id si
  file: Types.ObjectId; // file id si
  total_amount: number; // qancha to'lov qilgan
}
