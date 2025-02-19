import { Bot } from "grammy";
import { BOT_TOKEN } from "../utils/shared";

const bot = new Bot(BOT_TOKEN);

export default bot;

import "./commands/commands";
import "./events/events";

bot.start();
