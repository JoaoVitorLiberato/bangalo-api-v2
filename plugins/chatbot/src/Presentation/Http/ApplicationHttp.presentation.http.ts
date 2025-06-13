import "reflect-metadata";
import { Elysia } from "elysia";
import dotenv from "dotenv";
import { WhatsAppChat } from "../../Infrastructure/Chats/Wpp/WhatsChat.infrastructure.chats.wpp";
import { ClientWhatsAppChat } from "../../Infrastructure/Chats/Wpp/ClientWhatAppChat.infrastructure.chats.wpp";
import { ChatBotWhatsAppRouter } from "./Routes/ChatbotWhatsAppRouter.presentation.http.routes";
import { ChatbotTelegramRouter } from "./Routes/ChatbotTelegramRouter.presentation.http.routes";

dotenv.config()

const WhatsChatApp = new WhatsAppChat(ClientWhatsAppChat)

const App = new Elysia()
  .group("", (app) =>
    app
      .use(ChatBotWhatsAppRouter)
      .use(ChatbotTelegramRouter)
  )
  .listen({
    hostname: "0.0.0.0",
    port: String(process.env.APPLICATION_PORT)
  });


// Inicializa o cliente WhatsApp
console.log('⌛ Iniciando bot...');
WhatsChatApp.generateConnectWhatChat();

export default App;
