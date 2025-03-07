import env from "dotenv";
env.config();

export const {
  PORT,
  BOT_TOKEN = "",
  CHANNEL_ID = "",
  CLICK_TOKEN = "",
} = process.env;
