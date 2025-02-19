import { Context } from "grammy";
import { User } from "../../models/user.model";
import { mainMenu } from "../keywords/main-menu";

export const requestContact = async (ctx: Context) => {
  try {
    const chatId = ctx.chatId;
    const phone = ctx.message?.contact?.phone_number;
    let user = await User.findOne({ chatId });

    if (!user) {
      return ctx.reply("Botni qayta ishga tushuring! /start");
    }

    if (!phone) {
      return await ctx.reply(
        "Telefon raqamini olishning iloji bo'lmadi iltimos botni qayta ishga tushuring!"
      );
    }
    user.phone = phone;
    await user.save();
    return await ctx.reply("Siz ro'yhatdan o'tdingiz!", {
      reply_markup: mainMenu,
    });
  } catch (error) {
    console.error(error);
    await ctx.reply("Server error!");
  }
};
