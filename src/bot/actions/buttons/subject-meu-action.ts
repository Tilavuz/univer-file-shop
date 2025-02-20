import { Context } from "grammy";
import { Subject } from "../../../models/subject.model";
import { filesMenu } from "../../keywords/files-menu";
import { User } from "../../../models/user.model";

export const subjectMenuAction = async (ctx: Context) => {
  try {
    const chatId = ctx.chatId;
    const user = await User.findOne({ chatId });
    const callbackData = ctx.callbackQuery?.data;
    const subjectId = callbackData?.replace("subject_", "");

    if (!subjectId) {
      return await ctx.reply("Bu universitet hali mavjud emas!");
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return await ctx.reply("Bu fan hali mavjud emas!");
    }

    if (user?.action === "sell") {
      user.action = `upload_file_pending_${subjectId}`;
      await user.save();
      await ctx.answerCallbackQuery("File kutilmoqda!");
      return await ctx.reply(
        "Joylamoqchi bo'lgan topshirig'ingizni yuboring. Fayl turi .pdf, .doc, .docx, .ppt, .pptx bo'lishi kerak!"
      );
    }

    if (user?.action === "buy") {
      const { messageText, keyboard } = await filesMenu({
        page: 1,
        subjectId,
      });

      await ctx.reply(messageText, {
        parse_mode: "Markdown",
        reply_markup: keyboard,
      });

      await ctx.answerCallbackQuery(`${subject?.name}`);
    }
  } catch (error) {
    console.error(error);
    await ctx.reply("Server error!");
  }
};
