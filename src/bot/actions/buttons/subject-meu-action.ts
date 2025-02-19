import { Context, InlineKeyboard } from "grammy";
import { Subject } from "../../../models/subject.model";
import { FileModel } from "../../../models/file.model";
import { filesMenu } from "../../keywords/files-menu";

export const subjectMenuAction = async (ctx: Context) => {
  try {
    const callbackData = ctx.callbackQuery?.data;
    const subjectId = callbackData?.replace("subject_", "");

    if (!subjectId) {
      return await ctx.reply("Bu universitet hali mavjud emas!");
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return await ctx.reply("Bu universitet hali mavjud emas!");
    }
    const { messageText, keyboard } = await filesMenu({
      ctx,
      page: 1,
      subjectId,
    });

    await ctx.reply(messageText, {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    });

    await ctx.answerCallbackQuery(`${subject?.name}`);
  } catch (error) {
    console.error(error);
    await ctx.reply("Server error!");
  }
};
