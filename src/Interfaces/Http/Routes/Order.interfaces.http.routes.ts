import { Context, Elysia } from "elysia";
import { OrderController } from "../Controllers/OrderController.interfaces.http.controllers";
import { AutenticationHashMiddleware } from "../../../Infrastructure/Middlewares/AutenticationHashRoutes.infrastructure.middlewares";
import { ElysiaWS } from '@elysiajs/websocket';
import { t } from "elysia";

const route = new Elysia();
const clients: Set<WebSocket> = new Set();

const controller = new OrderController();
const middleware = new AutenticationHashMiddleware();

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
  .post(
    "/order/create", (ctx) => controller.create(ctx as Context),
    {
      tags: ["Order"],
      detail: {
        summary: "Cria um novo pedido",
        description: "Cria um novo pedido",
        body: {
          canal: "Canal do pedido",
          nome: "Nome do cliente"
        }
      },
      body: t.Object({
        canal: t.String(),
        nome: t.String(),
        segmento: t.String(),
        status: t.String(),
        telefone: t.String(),
        mensagem: t.String(),
        produtos: t.Array(t.Object({
          id: t.String(),
          name: t.String(),
          price: t.Number(),
          quantity: t.Number(),
          total: t.Number(),
          complements: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
            price: t.Number(),
            quantity: t.Number(),
          })),
        })),
        pagamento: t.Object({
          formaPagamento: t.String(),
          statusPagamento: t.String(),
          valorFrete: t.Number(),
          valorProdutos: t.Number(),
          valorTotal: t.Number(),
          desconto: t.Number(),
        }),
        endereco: t.Object({
          cep: t.String(),
          logradouro: t.String(),
          bairro: t.String(),
          cidade: t.String(),
          uf: t.String(),
          numero: t.String(),
          complemento: t.String(),
          referencia: t.String(),
        }),
        analytics: t.Object({
          source: t.String(),
          medium: t.String(),
          campaign: t.String(),
          params: t.Record(t.String(), t.Union([t.String(), t.Number(), t.Boolean()]))
        })
      }),
      response: {
        200: t.Object({
          mensagem: t.String(),
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
      }
    }
  );

route
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .get(
    "/orders", (ctx) => controller.views(ctx as Context),
    {
      tags: ["Order"],
      detail: {
        summary: "Visualiza todos os pedidos",
        description: "Visualiza todos os pedidos",
      },
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          canal: t.String(),
          nome: t.String(),
          segmento: t.String(),
          status: t.String(),
          telefone: t.String(),
          mensagem: t.String(),
          produtos: t.Array(t.Object({
            id: t.String(),
            name: t.String(),
            price: t.Number(),
            quantity: t.Number(),
            total: t.Number(),
            complements: t.Array(t.Object({
              id: t.String(),
              name: t.String(),
              price: t.Number(),
              quantity: t.Number(),
            })),
          })),
          pagamento: t.Object({
            formaPagamento: t.String(),
            statusPagamento: t.String(),
            valorFrete: t.Number(),
            valorProdutos: t.Number(),
            valorTotal: t.Number(),
            desconto: t.Number(),
          }),
          endereco: t.Object({
            cep: t.String(),
            logradouro: t.String(),
            bairro: t.String(),
            cidade: t.String(),
            uf: t.String(),
            numero: t.String(),
            complemento: t.String(),
            referencia: t.String(),
          }),
          analytics: t.Object({
            source: t.String(),
            medium: t.String(),
            campaign: t.String(),
            params: t.Record(t.String(), t.Union([t.String(), t.Number(), t.Boolean()]))
          }),
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        })
      }
    }
  )


export {
  route as RouteOrder,
  clients as ClientsWebSocket
}