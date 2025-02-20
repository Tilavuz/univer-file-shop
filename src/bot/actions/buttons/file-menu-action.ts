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

    ctx.reply(
      `📂 *Mavzusi:* ${file?.title}
      
      📄 *Fayl nomi:* \`${file.file_name}\`
      📏 *Hajmi:* \`${fileSize} MB\`
      💰 *Narxi:* \`${file.price ?? 0} so'm\``,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "👀 Ko'rish",
                web_app: {
                  url: `https://bluebird-fancy-painfully.ngrok-free.app/files/${file._id}`,
                },
              },
              {
                text: "💰 Sotib olish",
                callback_data: `info_file_buy_${fileId}`,
              },
            ],
          ],
        },
      }
    );

    ctx.answerCallbackQuery("File info");
  } catch (error) {
    console.error(error);
    ctx.reply("Server error!");
  }
};
