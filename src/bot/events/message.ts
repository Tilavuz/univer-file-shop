import { User } from "../../models/user.model";
import bot from "../bot";
import { requestContact } from "../actions/request-contact";
import { start } from "../actions/start";
import { mainMenuText } from "../constants/keywords";
import { mainMenuBuy } from "../actions/buttons/main-menu-buy";
import { FileModel } from "../../models/file.model";
import { AllowedMimeType } from "../../types/file.type";

bot.on("message", async (ctx) => {
  const chatId = ctx.chatId;
  const user = await User.findOne({ chatId });
  const text = ctx.message.text;

  if (ctx.message.contact) {
    return requestContact(ctx);
  }

  if (!user?.phone) {
    return start(ctx);
  }

  if (text === mainMenuText.buy) {
    return mainMenuBuy(ctx);
  }
});

// bot.on("channel_post", async (ctx) => {
//   try {
//     const post = ctx.update.channel_post;
//     if (!post || !post.document) return; // Agar fayl yuklanmagan bo‘lsa, qaytib ketamiz

//     const document = post.document;

//     const file = new FileModel({
//       file_id: document.file_id,
//       file_name: document.file_name,
//       file_unique_id: document.file_unique_id,
//       file_size: document.file_size,
//       mime_type: document.mime_type,
//       title: "Dinshunoslik fanidan mustaqil ish",
//       subject: "67b6144ef1bbc43781113158",
//       user: "67b55bcc09310052465d9a5f",
//     });
//     await file.save();
//     console.log(file);
//   } catch (error) {
//     console.error("Xatolik yuz berdi:", error);
//   }
// });
