import { Context } from "grammy";
import { User } from "../../models/user.model";
import { mainMenu } from "../keywords/main-menu";

export const start = async (ctx: Context) => {
  try {
    const chatId = ctx.chatId;
    
    let user = await User.findOne({ chatId });

    if (!user) {
      user = new User({ chatId });
    }

    if (user.phone) {
      return await ctx.reply("Bot qayta ishga tushdi!", {
        reply_markup: mainMenu,
      });
    }

    await ctx.reply(
      "Bot to'liq foydalanish uchun telefon raqamingizni yuboring",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Telefon raqam ulashish",
                request_contact: true,
              },
            ],
          ],
          resize_keyboard: true,
        },
      }
    );
  } catch (error) {
    console.error(error);
    await ctx.reply("Server error!");
  }
};
