import { Context, Elysia } from "elysia";
import { OrderController } from "../Controllers/OrderController.interfaces.http.controllers";
import { ElysiaWS } from '@elysiajs/websocket';

const route = new Elysia({ prefix: "/orders" });
const clients: Set<WebSocket> = new Set();

const controller = new OrderController();

route
  .ws("/ws", {
    open(ws: ElysiaWS) {
      clients.add(ws as any);
      ws.send(`🧩 Conectado ao canal de pedidos.`);
    },
    message(ws: any) {
      ws.send("🧩 Pedido Recebido com sucesso");
    },
    close(ws: any) {
      clients.delete(ws as any);
    },
  })
  .post("", (ctx: Context) => controller.createOrder(ctx));


export {
  route as RouteOrder,
  clients as ClientsWebSocket
}