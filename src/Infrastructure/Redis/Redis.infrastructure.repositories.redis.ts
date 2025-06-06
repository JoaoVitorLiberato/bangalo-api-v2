import Redis from "ioredis";
import { ClientsWebSocket } from "../../Interfaces/Http/Routes/Order.interfaces.http.routes";

export const RedisAdmin = new Redis({ host: "redis", port: 6379 });
export const RedisClient = new Redis({ host: "redis", port: 6379 });
export const Order_channel = "order_created";

export function SetupOrderNotifications() {
  RedisAdmin.subscribe(Order_channel);

  RedisAdmin.on('message', (channel, message) => {
    if (channel === Order_channel) {
      ClientsWebSocket.forEach((ws) => {
        try {
          ws.send(message);
        } catch (error) {
          console.error('Erro ao enviar via WebSocket:', error);
        }
      });
    }
  });
}


(() => {
  RedisAdmin.on("error", (err) => {
    console.error("[RedisAdmin Error]", err);
  });
  RedisClient.on("error", (err) => {
    console.error("[RedisClient Error]", err);
  });
})()