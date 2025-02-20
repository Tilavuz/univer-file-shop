import { Context, InlineKeyboard } from "grammy";
import { FileModel } from "../../models/file.model";
import { Subject } from "../../models/subject.model";

export const filesMenu = async ({
  page,
  subjectId,
}: {
  page: number;
  subjectId: string;
}) => {
  const limit = 10;
  const skip = (page - 1) * limit;
  const subject = await Subject.findById(subjectId);

  if (!subject) {
    return {
      messageText: "Bu fan uchun hech qanday fayl mavjud emas.",
      keyboard: new InlineKeyboard(),
    };
  }

  const files = await FileModel.find({ subject: subjectId, status: true })
    .skip(skip)
    .limit(limit);

  const totalFiles = await FileModel.countDocuments({ subject: subjectId });
  const totalPages = Math.ceil(totalFiles / limit);

  if (totalPages < page) {
    return { messageText: "Sahifa tugadi!", keyboard: new InlineKeyboard() };
  }

  if (files.length === 0) {
    return {
      messageText: "Bu fan uchun hech qanday fayl mavjud emas.",
      keyboard: new InlineKeyboard(),
    };
  }

  let messageText = `📚 *${subject.name}* fanidagi mavjud fayllar:\n\n`;
  files.forEach((file, index) => {
    messageText += `${index + 1}. ${file.title}\n`;
  });

  const keyboard = new InlineKeyboard();
  files.forEach((file, i) => {
    keyboard.text(`${i + 1}`, `file_${file._id}`);
    if (i % 2 === 1) keyboard.row(); // Har 2 ta tugmadan keyin yangi qatorga o'tish
  });

  const paginationQuery = JSON.stringify({
    id: subjectId,
    page,
  });

  if (totalPages > 1) {
    keyboard.text("👈", `back_page_${paginationQuery}`);
    keyboard.text(`${page}/${totalPages}`);
    keyboard.text("👉", `next_page_${paginationQuery}`);
  }

  return { messageText, keyboard };
};
