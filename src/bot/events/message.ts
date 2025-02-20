import { User } from "../../models/user.model";
import bot from "../bot";
import { requestContact } from "../actions/request-contact";
import { start } from "../actions/start";
import { mainMenuText } from "../constants/keywords";
import { mainMenuBuy } from "../actions/buttons/main-menu-buy";
import { mainMenuSell } from "../actions/buttons/main-menu-sell";
import { fileUploading } from "../utils/file-uploading";
import { enterFileTitle } from "../utils/enter-file-title";
import { enterFilePrice } from "../utils/enter-file-price";

bot.on("message", async (ctx) => {
  const chatId = ctx.chatId;
  const user = await User.findOne({ chatId });
  const text = ctx.message.text;
  const document = ctx.message?.document;

  if (ctx.message.contact) {
    return requestContact(ctx);
  }

  if (!user?.phone) {
    return start(ctx);
  }

  if (text === mainMenuText.buy) {
    return mainMenuBuy(ctx);
  }

  if (text === mainMenuText.sell) {
    return mainMenuSell(ctx);
  }

  if (user.action.startsWith("upload_file_pending_") && document) {
    fileUploading(ctx);
  }
  if (user.action.startsWith("file_title_")) {
    enterFileTitle(ctx);
  }
  if (user.action.startsWith("file_price_")) {
    enterFilePrice(ctx);
  }
});
