import { Context } from "grammy";
import { Semester } from "../../../models/semester.model";
import { subjectMenu } from "../../keywords/subject-menu";

export const semesterMenuAction = async (ctx: Context) => {
  try {
    const callbackData = ctx.callbackQuery?.data;
    const semesterId = callbackData?.replace("semester_", "");

    const semester = await Semester.findById(semesterId);

    if (!semester || !semesterId) {
      return await ctx.reply("Bu universitet hali mavjut emas!");
    }

    const buttons = await subjectMenu(semesterId);

    ctx.reply(`${semester?.which}-semester`, {
      reply_markup: buttons,
    });
    ctx.answerCallbackQuery(`${semester?.which}-semester`);
  } catch (error) {
    console.error(error);
    ctx.reply("Server error!");
  }
};
