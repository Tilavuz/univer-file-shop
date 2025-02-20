import { Context } from "grammy";
import { User } from "../../models/user.model";
import { FileModel } from "../../models/file.model";

export const enterFilePrice = async (ctx: Context) => {
  try {
    const chatId = ctx.chatId;
    const text = ctx.message?.text;
    if (!text) return await ctx.reply("Topshiriq narxini kiriting!");
    const price = Number(text);
    if (isNaN(price)) {
      return await ctx.reply(
        "Narxini belgilash vaqtida harflardan foydalanmang!"
      );
    }

    const user = await User.findOne({ chatId });
    if (!user) {
      return await ctx.reply("Botni qayta ishga tushuring!");
    }

    const fileId = user.action?.replace("file_price_", "");
    const file = await FileModel.findById(fileId);

    if (!file)
      return await ctx.reply(
        "File yuklashda xatolik ketgan bo'lishi mumkin iltimos qayta urinib ko'ring /start"
      );

    file.price = price;
    await file.save();

    user.action = ``;
    await user.save();
    await ctx.reply(
      "File malumotlari saqlandi admin tekshirib ommaga chiqaradi!"
    );
  } catch (error) {
    console.error(error);
    await ctx.reply("Server error");
  }
};
