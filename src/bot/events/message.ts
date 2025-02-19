import { User } from "../../models/user.model";
import bot from "../bot";
import { requestContact } from "../actions/request-contact";
import { start } from "../actions/start";

bot.on("message", async (ctx) => {
  const chatId = ctx.chatId;
  const user = await User.findOne({ chatId });

  if (ctx.message.contact) {
    return requestContact(ctx);
  }

  if (!user?.phone) {
    return start(ctx);
  }
});
