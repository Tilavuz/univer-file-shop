import { Context } from "grammy";
import { User } from "../../models/user.model";
import { FileModel } from "../../models/file.model";
import { CHANNEL_ID } from "../../utils/shared";
import { AllowedMimeType } from "../../types/file.type";

export const AllowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
] as const;

export const fileUploading = async (ctx: Context) => {
  try {
    const chatId = ctx.chatId;
    const user = await User.findOne({ chatId });
    const document = ctx.message?.document;

    if (!document) {
      return await ctx.reply(
        "Fayl yuklashda xatolik bo'ldi qayta urinib ko'ring!"
      );
    }

    if (
      !Object.values(AllowedMimeTypes).includes(
        document.mime_type as AllowedMimeType
      )
    ) {
      return await ctx.reply("❌ Yuborilgan fayl turi qo‘llab-quvvatlanmaydi!");
    }

    const oldFile = await FileModel.findOne({
      file_unique_id: document?.file_unique_id,
    });

    if (oldFile) {
      return await ctx.reply(
        "Bu fayl bazada mavjut iltimos boshqa file yuboring!"
      );
    }

    if (!user) {
      return await ctx.reply("Botni qayta ishga tushuring!");
    }
    const subjectId = user.action?.replace("upload_file_pending_", "");

    await ctx.api.sendDocument(CHANNEL_ID, document?.file_id);

    const file = new FileModel({
      ...document,
      user: user._id,
      subject: subjectId,
    });
    await file.save();
    user.action = `file_title_${file._id}`;
    await user.save();

    await ctx.reply("Topshiriq mavzusini kiriting!");
  } catch (error) {
    console.error(error);
    ctx.reply("Server error");
  }
};
