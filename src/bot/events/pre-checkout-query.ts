import { FileModel } from "../../models/file.model";
import { Payment } from "../../models/payment.model";
import { User } from "../../models/user.model";
import bot from "../bot";

bot.on("pre_checkout_query", async (ctx) => {
  try {
    const chatId = ctx.update.pre_checkout_query.from.id;
    const preCheckoutQuery = ctx.update.pre_checkout_query;
    const { invoice_payload } = preCheckoutQuery;

    if (!invoice_payload?.startsWith("receiving_payment_")) {
      await ctx.answerPreCheckoutQuery(false, "Xatolik: To‘lov ma’lumoti noto‘g‘ri!");
      return;
    }

    const fileId = invoice_payload.replace("receiving_payment_", "");
    const file = await FileModel.findById(fileId);

    if (!file) {
      await ctx.answerPreCheckoutQuery(false, "Xatolik: Fayl topilmadi!");
      return;
    }

    const user = await User.findOne({ chatId });

    if (!user) {
      await ctx.answerPreCheckoutQuery(false, "Xatolik: Foydalanuvchi topilmadi!");
      return;
    }

    const payment = new Payment({
      payment: file.user,
      recipient: user._id,
      file: file._id,
      total_amount: preCheckoutQuery.total_amount / 100,
    });

    user.money = typeof user.money === "number" ? user.money : 0;
    user.money += preCheckoutQuery.total_amount / 100;

    file.sold = typeof file.sold === "number" ? file.sold + 1 : 1;

    // Asinxron saqlashni parallel bajarish
    await Promise.all([user.save(), payment.save(), file.save()]);

    // Faylni jo‘natish muvaffaqiyatli bo‘lsa, to‘lovni tasdiqlash
    await ctx.api.sendDocument(chatId, file.file_id);
    await ctx.answerPreCheckoutQuery(true);
  } catch (error) {
    console.error(error);
    await ctx.reply("Server xatosi yuz berdi!");
    await ctx.answerPreCheckoutQuery(false, "Server xatosi yuz berdi!");
  }
});
