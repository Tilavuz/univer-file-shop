import { Document, Types } from "mongoose";
export type AllowedMimeType =
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation";

export interface IFile extends Document {
  file_id: string;
  file_unique_id: string;
  file_name: string;
  file_size: number;
  mime_type: AllowedMimeType;
  subject: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
}
