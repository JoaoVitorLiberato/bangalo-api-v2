import { Elysia } from "elysia";
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import Redis from "ioredis";

const app = new Elysia();

// Número do WhatsApp com código do Brasil (55) + DDD + número
const MY_NUMBER = "5521967559557@c.us";

const client = new Client({
  puppeteer: {
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
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

// Rota para verificar o status do bot
app.get("/", () => {
  return {
    whatsapp_connected: !!client.info,
    server_running: !!app.server,
  }
});

// Rota para enviar um novo pedido
app.post("/order", async ({ body, set }) => {
  const { to, text } = body as { to?: string; text?: string };

  if (!text) {
    set.status = 400;
    return { error: 'O campo "text" é obrigatório.' };
  }

  // Se 'to' não for fornecido, usa o número padrão
  const targetNumber = to ? `${to.replace(/\D/g, '')}@c.us` : MY_NUMBER;

  try {
    if (!client.info) {
      set.status = 503; // Service Unavailable
      return { success: false, message: "WhatsApp não está conectado." };
    }
    await client.sendMessage(targetNumber, text);
    console.log(`✅ Mensagem enviada para ${targetNumber}`);
    return { success: true, message: `Pedido enviado para ${targetNumber}` };
  } catch (error) {
    console.error(`❌ Erro ao enviar mensagem para ${targetNumber}:`, error);
    set.status = 500;
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return { success: false, message: `Falha ao enviar pedido. ${errorMessage}` };
  }
});

// Evento para gerar o QR Code
client.on('qr', async (qr) => {
  console.log('⌛ Gerando QR Code...');

  try {
    // Salva o QR code como imagem PNG
    await qrcode.toFile('./qrcode.png', qr, {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 8
    });
    console.log('✅ QR Code salvo como qrcode.png na raiz do projeto');
  } catch (err) {
    console.error('❌ Erro ao salvar QR code:', err);
  }
});

// Evento quando o cliente está pronto
client.on('ready', async () => {
  console.log('✅ WhatsApp conectado com sucesso!');

  try {
    await client.sendMessage(MY_NUMBER, '🤖 Bot iniciado com sucesso!\nPronto para receber pedidos via API.');
    console.log('✅ Mensagem de inicialização enviada');
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem de inicialização:', error);
  }

  app.listen(4001);
  console.log(`🚀 Servidor rodando em http://${app.server?.hostname}:${app.server?.port}`);
});

// Evento para erros de conexão
client.on('disconnected', (reason) => {
  console.log('❌ WhatsApp desconectado:', reason);
});

// Inicializa o cliente
console.log('⌛ Iniciando bot...');
client.initialize();


const redis = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
});

redis.subscribe("order_created", (err, count) => {
  if (err) {
    console.error("❌ Erro ao se inscrever no canal Redis:", err);
  } else {
    console.log(`✅ Inscrito no canal Redis "order_created" (${count} canais)`);
  }
});

redis.on("message", async (channel, message) => {
  if (channel === "order_created") {
    try {
      // Espera-se que a outra aplicação envie um JSON: { to: "5521...", text: "mensagem" }
      const { to, text } = JSON.parse(message);
      const targetNumber = MY_NUMBER;

      if (!client.info) {
        console.error("❌ WhatsApp não está conectado.");
        return;
      }
      await client.sendMessage(targetNumber, text);
      console.log(`✅ Pedido do Redis enviado para ${targetNumber}`);
    } catch (err) {
      console.error("❌ Erro ao processar pedido do Redis:", err);
    }
  }
});

redis.on('error', (err) => {
  console.error('Erro de conexão com Redis:', err);
});