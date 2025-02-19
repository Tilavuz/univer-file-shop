import { Context } from "grammy";
import { universMenu } from "../../keywords/univers-menu";

export const mainMenuBuy = async (ctx: Context) => {
  try {
    const buttons = await universMenu();

    ctx.reply("Universitetlar ro'yxati", {
      reply_markup: buttons,
    });
  } catch (error) {
    console.error(error);
    ctx.reply("Server error!");
  }
};
