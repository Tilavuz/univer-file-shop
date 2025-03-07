import { facultyMenuAction } from "../actions/buttons/faculty-menu-action";
import { fileMenuAction } from "../actions/buttons/file-menu-action";
import {
  paginationMenuBackPage,
  paginationMenuNextPage,
} from "../actions/buttons/pagination-menu-action";
import { professionMenuAction } from "../actions/buttons/profession-meu-action";
import { semesterMenuAction } from "../actions/buttons/semester-meu-action";
import { subjectMenuAction } from "../actions/buttons/subject-meu-action";
import { universMenuAction } from "../actions/buttons/univers-menu-action";
import { invoiceFile } from "../actions/invoice-file";
import bot from "../bot";

bot.on("callback_query:data", async (ctx) => {
  const callbackData = ctx.callbackQuery.data;

  if (callbackData.startsWith("univer_")) {
    return universMenuAction(ctx);
  }

  if (callbackData.startsWith("faculty_")) {
    return facultyMenuAction(ctx);
  }
  if (callbackData.startsWith("profession_")) {
    return professionMenuAction(ctx);
  }
  if (callbackData.startsWith("semester_")) {
    return semesterMenuAction(ctx);
  }
  if (callbackData.startsWith("subject_")) {
    return subjectMenuAction(ctx);
  }

  if (callbackData.startsWith("back_page_")) {
    paginationMenuBackPage(ctx);
  }
  if (callbackData.startsWith("next_page_")) {
    paginationMenuNextPage(ctx);
  }
  if (callbackData.startsWith("file_")) {
    fileMenuAction(ctx);
  }

  if (callbackData.startsWith("info_file_buy_")) {
    invoiceFile(ctx);
  }
});
