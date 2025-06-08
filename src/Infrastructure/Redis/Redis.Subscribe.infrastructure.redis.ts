import Redis from "ioredis";
import { IEventSubscribe } from "../../Application/Contracts/IEventSubscribe.application.contracts";
import { ClientsWebSocket } from "../../Interfaces/Http/Routes/Order.interfaces.http.routes";

export class RedisSubscribe implements IEventSubscribe {
  private redisClient = new Redis({ host: "redis", port: 6379 });
  private _channel = "order_created";

  async subscribe (): Promise<void> {
    await this.redisClient.subscribe(this._channel);

    this.redisClient.on("message", (channelClient, message) => {
      if (this._channel === channelClient) {
        ClientsWebSocket.forEach((ws) => {
          try {
            ws.send(message);
          } catch (error) {
            console.error("Erro ao enviar via WebSocket:", error);
          }
        });
      }
    });
  }
}