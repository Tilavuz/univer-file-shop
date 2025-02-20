import { Context } from "grammy";
import { universMenu } from "../../keywords/univers-menu";
import { User } from "../../../models/user.model";

export const mainMenuSell = async (ctx: Context) => {
  try {
    const chatId = ctx.chatId;
    let user = await User.findOne({ chatId });

    if (!user) return await ctx.reply("Botni qayta ishga tushuring!");

    user.action = "sell";
    await user.save();

    const buttons = await universMenu();

    ctx.reply("Universitetlar ro'yxati", {
      reply_markup: buttons,
    });
  } catch (error) {
    console.error(error);
    ctx.reply("Server error!");
  }
};
