import { Context } from "grammy";
import { User } from "../../models/user.model";
import { FileModel } from "../../models/file.model";

export const enterFileTitle = async (ctx: Context) => {
  try {
    const chatId = ctx.chatId;
    const text = ctx.message?.text;
    const user = await User.findOne({ chatId });
    if (!user) {
      return await ctx.reply("Botni qayta ishga tushuring!");
    }
    const fileId = user.action?.replace("file_title_", "");
    const file = await FileModel.findById(fileId);

    if (!file)
      return await ctx.reply(
        "File yuklashda xatolik ketgan bo'lishi mumkin iltimos qayta urinib ko'ring /start"
      );

    if (!text) return await ctx.reply("Topshiriq mavzusini kiriting!");
    file.title = text;
    await file.save();

    user.action = `file_price_${fileId}`;
    await user.save();
    await ctx.reply(
      "Topshiriqni qanchaga baxolaysiz so'm da kiriting! Misol: 15000"
    );
  } catch (error) {
    console.error(error);
    await ctx.reply("Server error");
  }
};
