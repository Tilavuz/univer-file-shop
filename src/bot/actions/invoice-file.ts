import { Context } from "grammy";
import { CLICK_TOKEN } from "../../utils/shared";
import { FileModel } from "../../models/file.model";

export const invoiceFile = async (ctx: Context) => {
  try {
    const callbackData = ctx.callbackQuery?.data;
    const fileId = callbackData?.replace("info_file_buy_", "");
    if (!fileId || !CLICK_TOKEN) return;

    const file = await FileModel.findById(fileId).populate("user");

    if (!file) return await ctx.reply("Fayl malumotlari topilmadi!");

    await ctx.replyWithInvoice(
      `${file.title}`,
      `${file.file_name}`,
      `receiving_payment_${fileId}`,
      "UZS",
      [{ label: `${file.title}`, amount: file.price * 100 }],
      {
        provider_token: process.env.CLICK_TOKEN as string,
      }
    );
  } catch (error) {
    console.error(error);
    await ctx.reply("Server error!");
  }
};
