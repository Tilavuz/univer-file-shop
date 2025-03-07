import { Context } from "grammy";
import { Faculty } from "../../../models/faculty.model";
import { professionMenu } from "../../keywords/profession-menu";

export const facultyMenuAction = async (ctx: Context) => {
  try {
    const callbackData = ctx.callbackQuery?.data;
    const facultyId = callbackData?.replace("faculty_", "");

    const faculty = await Faculty.findById(facultyId);

    if (!faculty || !facultyId) {
      return await ctx.reply("Bu universitet hali mavjut emas!");
    }

    const buttons = await professionMenu(facultyId);
    ctx.reply(faculty?.name, {
      reply_markup: buttons,
    });
    ctx.answerCallbackQuery(faculty?.name ?? "answer callback query");
  } catch (error) {
    console.error(error);
    ctx.reply("Server error!");
  }
};
