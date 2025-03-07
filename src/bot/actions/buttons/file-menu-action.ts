import { Context } from "grammy";
import { FileModel } from "../../../models/file.model";

export const fileMenuAction = async (ctx: Context) => {
  try {
    const callbackData = ctx.callbackQuery?.data;
    const fileId = callbackData?.replace("file_", "");

    const file = await FileModel.findById(fileId);

    if (!file || !fileId) {
      return await ctx.reply("Bu universitet hali mavjut emas!");
    }

    const fileSize = (file.file_size / (1024 * 1024)).toFixed(2);

    const message =
      `<b>📂 Mavzusi:</b> ${file?.title}\n\n` +
      `<b>📄 Fayl nomi:</b> <i>${file.file_name}</i>\n` +
      `<b>📏 Hajmi:</b> <i>${fileSize} MB</i>\n` +
      `<b>💰 Narxi:</b> <i>${file.price ?? 0} so'm</i>` +
      `<b>💰 Sotilgan:</b> <i>${file.sold ?? 0}</i>`;

    ctx.reply(message, {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "👀 Ko'rish",
              url: `https://bluebird-fancy-painfully.ngrok-free.app/files/${file._id}`,
            },
            {
              text: "💰 Sotib olish",
              callback_data: `info_file_buy_${fileId}`,
            },
          ],
        ],
      },
    });

    ctx.answerCallbackQuery("File info");
  } catch (error) {
    console.error(error);
    ctx.reply("Server error!");
  }
};
