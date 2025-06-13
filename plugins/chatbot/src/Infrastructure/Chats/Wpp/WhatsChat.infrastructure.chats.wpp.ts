import { Client } from "whatsapp-web.js";
import qrcode from "qrcode";
import App from "../../../Presentation/Http/ApplicationHttp.presentation.http";

export class WhatsAppChat {
  private _NumberClientID = process.env.APPLICATION_WHATSCHAT_ID || "5521967559557@c.us"

  constructor (
    private client: Client
  ) {}

  async generateConnectWhatChat  () {
    console.log('⌛ Gerando QR Code...');

    this.client.on("qr", async (qr) => {
      try {
        // Salva o Qr code como imagem PNG
        await qrcode.toFile("./qrcode.png", qr, {
          errorCorrectionLevel: "H",
          margin: 1,
          scale: 8
        });

        console.log('✅ QR Code salvo como qrcode.png na raiz do projeto');
      } catch (err) {
        console.error('❌ Erro ao salvar QR code:', err);
      }
    });

    this.client.on("ready", async () => {
      console.log("✅ WhatsApp conectado com sucesso!")
      console.log(`Server running at port ${App.server?.hostname}/${App.server?.port}`)
      try {
        await this.client.sendMessage(String(this._NumberClientID), '🤖 Bot iniciado com sucesso!\nPronto para receber pedidos via API.');
        console.log('✅ Mensagem de inicialização enviada');
      } catch (error) {
        console.error('❌ Erro ao enviar mensagem de inicialização:', error);
      }
    });

    // Evento para erros de conexão
    this.client.on('disconnected', (reason) => {
      console.log('❌ WhatsApp desconectado:', reason);
    });

    // Evento para receber mensagens do WhatsApp
    // this.client.on('message', async (msg) => {
    //   console.log('📩 Mensagem recebida:', msg.body);
    //   // Lógica de pedidos: se a mensagem começar com "pedido:", registra/loga e responde
    //   if (msg.body.toLowerCase().startsWith('pedido:')) {
    //     // Aqui você pode salvar o pedido em um banco, enviar para outro serviço, etc.
    //     console.log('📝 Pedido recebido:', msg.body);
    //     await msg.reply('✅ Pedido recebido! Em breve entraremos em contato.');
    //   }
    // });

    //inicializa o cliente
    this.client.initialize()

    // Ping periódico para checar conexão com WhatsApp
    setInterval(() => {
      if (this.client.info) {
        console.log('✅ WhatsApp ainda está conectado.');
      } else {
        console.log('❌ WhatsApp NÃO está conectado!');
      }
    }, 15_000); // a cada 15 segundos
  }

  async sendChat (data: string): Promise<any> {
    try {
      if (!this.client.info) {
        return { success: false, message: "WhatsApp não está conectado." };
      }

      await this.client.sendMessage(this._NumberClientID, data);
      console.log(`✅ Mensagem enviada para ${this._NumberClientID}`);
      return { success: true, message: `Pedido enviado para ${this._NumberClientID}` };
    } catch (error) {
      console.error(`❌ Erro ao enviar mensagem para ${this._NumberClientID}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return { success: false, message: `Falha ao enviar pedido. ${errorMessage}` };
    }
  }
}
