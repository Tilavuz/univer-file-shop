import { Context } from "grammy";
import { Univer } from "../../../models/univer.model";
import { facultyMenu } from "../../keywords/faculty-menu";

export const universMenuAction = async (ctx: Context) => {
  try {
    const callbackData = ctx.callbackQuery?.data;
    const univerId = callbackData?.replace("univer_", "");
    const univer = await Univer.findById(univerId);

    if (!univer || !univerId) {
      return await ctx.reply("Bu universitet hali mavjut emas!");
    }
    const buttons = await facultyMenu(univerId);

    ctx.reply(univer?.name, {
      reply_markup: buttons,
    });
    ctx.answerCallbackQuery(univer?.name ?? "univer name");
  } catch (error) {
    console.error(error);
    ctx.reply("Server error!");
  }
};
