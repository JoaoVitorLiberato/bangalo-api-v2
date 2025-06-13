import "reflect-metadata";
import { Elysia } from "elysia";
import dotenv from "dotenv";
import { WhatsAppChat } from "../../Infrastructure/Chats/Wpp/WhatsChat.infrastructure.chats.wpp";
import { ClientWhatsAppChat } from "../../Infrastructure/Chats/Wpp/ClientWhatAppChat.infrastructure.chats.wpp";
import { ChatBotWhatsAppRouter } from "./Routes/ChatbotWhatsAppRouter.presentation.http.routes";

dotenv.config()

const WhatsChatApp = new WhatsAppChat(ClientWhatsAppChat)

const App = new Elysia()
  .group("", (app) =>
    app
      .use(ChatBotWhatsAppRouter)
  )
  .listen({
    hostname: "0.0.0.0",
    port: String(process.env.APPLICATION_PORT)
  });

// Inicializa o cliente
console.log('⌛ Iniciando bot...');
WhatsChatApp.generateConnectWhatChat();

export default App;
