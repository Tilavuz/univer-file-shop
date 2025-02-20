import bot from "../bot/bot";
import { FileModel } from "../models/file.model";
import { BOT_TOKEN } from "../utils/shared";

class FileService {
  async getFileInfo(id: string) {
    try {
      const fileInfo = await FileModel.findById(id);
      if (!fileInfo) {
        return { status: 404, data: { message: "Fayl mavjut emas!" } };
      }
      const file = await bot.api.getFile(fileInfo?.file_id);
      const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;

      return {
        status: 200,
        data: { url: fileUrl, mime_type: fileInfo.mime_type },
      };
    } catch (error) {
      console.error(error);
      return { status: 501, data: { message: "Server error!" } };
    }
  }
}

export const fileService = new FileService();
