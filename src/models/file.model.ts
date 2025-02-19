import { model, Schema } from "mongoose";
import { IFile } from "../types/file.type";

const fileSchema = new Schema<IFile>({
  file_id: {
    type: String,
    default: null,
  },
  file_unique_id: {
    type: String,
    required: true,
    unique: true,
  },
  file_name: {
    type: String,
    default: null,
  },
  file_size: {
    type: Number,
    default: null,
  },
  mime_type: {
    type: String,
    enum: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    default: null,
  },
});

export const FileModel = model<IFile>("File", fileSchema);
