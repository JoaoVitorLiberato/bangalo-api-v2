import { Client, LocalAuth } from "whatsapp-web.js";

export const ClientWhatsAppChat = new Client({
  puppeteer: {
    headless: true,
    executablePath: '/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--disable-extensions'
    ]
  },
  authStrategy: new LocalAuth({
    clientId: 'bot-pedidos',
    dataPath: './auth_data'
  })
});