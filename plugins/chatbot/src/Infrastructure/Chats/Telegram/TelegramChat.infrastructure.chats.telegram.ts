import TelegramBot from "node-telegram-bot-api";

export class TelegramAppChat {
  private _Chatid: string|number = ""

  constructor (
    private readonly client: TelegramBot
  ) {
    this.client.on("message", ({ chat }) => {
      this._Chatid = chat.id
      console.log(`Chatbot telegram: ${this._Chatid}`)
    })
  }

  async sendChat (order: string): Promise<any> {
    try {
      this.client.sendMessage(this._Chatid, order);
      console.log(`✅ A mensagem foi enviada para BangaloBot - $(id): ${this._Chatid}`)
      return { success: true }
    } catch (error) {
      console.error("[ERRO SendMessageBot - tel]", error)
      return { success: false }
    }
  }
}
