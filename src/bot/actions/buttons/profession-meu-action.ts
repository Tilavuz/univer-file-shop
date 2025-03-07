import { Context } from "grammy";
import { Profession } from "../../../models/profession.model";
import { semesterMenu } from "../../keywords/semester-menu";

export const professionMenuAction = async (ctx: Context) => {
  try {
    const callbackData = ctx.callbackQuery?.data;
    const professionId = callbackData?.replace("profession_", "");

    const profession = await Profession.findById(professionId);

    if (!profession || !professionId) {
      return await ctx.reply("Bu universitet hali mavjut emas!");
    }

    const buttons = await semesterMenu(professionId);

    ctx.reply(profession?.name, {
      reply_markup: buttons,
    });
    ctx.answerCallbackQuery(profession?.name ?? "answer callback query");
  } catch (error) {
    console.error(error);
    ctx.reply("Server error!");
  }
};
