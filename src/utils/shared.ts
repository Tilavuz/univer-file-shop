import env from "dotenv";
env.config();

export const { PORT, BOT_TOKEN = "" } = process.env;
