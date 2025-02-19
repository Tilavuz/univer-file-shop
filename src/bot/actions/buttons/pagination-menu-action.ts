import { Context } from "grammy";
import { filesMenu } from "../../keywords/files-menu";

export const paginationMenuNextPage = async (ctx: Context) => {
  const callbackData = ctx.callbackQuery?.data;
  const paginationQuery = JSON.parse(
    callbackData?.replace("next_page_", "") ?? ""
  );
  const page = paginationQuery.page + 1;
  const { messageText, keyboard } = await filesMenu({
    ctx,
    subjectId: paginationQuery?.id,
    page,
  });

  await ctx.reply(messageText, {
    parse_mode: "Markdown",
    reply_markup: keyboard,
  });

  await ctx.answerCallbackQuery(`Next`);
};

export const paginationMenuBackPage = async (ctx: Context) => {
  const callbackData = ctx.callbackQuery?.data;
  const paginationQuery = JSON.parse(
    callbackData?.replace("back_page_", "") ?? ""
  );
  if (paginationQuery.page === 1) {
    return await ctx.answerCallbackQuery("Sahifaning boshidasiz!");
  }
  const page = paginationQuery.page - 1;
  const { messageText, keyboard } = await filesMenu({
    ctx,
    subjectId: paginationQuery?.id,
    page,
  });

  await ctx.reply(messageText, {
    parse_mode: "Markdown",
    reply_markup: keyboard,
  });

  await ctx.answerCallbackQuery(`Next`);
};
