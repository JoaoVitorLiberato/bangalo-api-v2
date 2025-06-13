import TelegramBot from "node-telegram-bot-api";

export const ClientTelegramChat = new TelegramBot(
  String(process.env.APPLICATION_BOT_TOKEN),
  { polling: true }
);
