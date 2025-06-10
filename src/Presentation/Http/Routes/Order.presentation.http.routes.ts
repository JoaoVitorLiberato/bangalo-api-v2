import { Context, Elysia } from "elysia";
import { OrderController } from "../Controllers/OrderController.presentation.http.controller";
import { AutenticationHashMiddleware } from "../../../Infrastructure/Middlewares/AutenticationHashRoutes.infrastructure.middlewares";
import { t } from "elysia";

const router = new Elysia();
const clients: Set<WebSocket> = new Set();

const controller = new OrderController();
const middleware = new AutenticationHashMiddleware();

router.get("/order/today/:phone",
  (ctx) => controller.viewByPhone(ctx as Context),
  {
    tags: ["Order"],
    detail: {
      summary: "Visualiza pedido pelo telefone",
      description: "Visualiza um pedido pelo telefone",
      params: {
        phone: "Telefone do cliente"
      }
    },
    response: {
      200: t.Array(t.Object({
        id: t.String(),
        nome: t.String(),
        telefone: t.String(),
        mensagem: t.String(),
        segmento: t.String(),
        status: t.String(),
        produtos: t.Array(t.Object({
          id: t.String(),
          name: t.String(),
          price: t.Number(),
          quantity: t.Number(),
          total: t.Number(),
        })),
        pagamento: t.Object({
          formaPagamento: t.String(),
          statusPagamento: t.String(),
          valorFrete: t.Number(),
          valorProdutos: t.Number(),
          valorTotal: t.Number(),
          recebido: t.Optional(
            t.Object({
              receipt_url: t.String(),
            })
          )
        }),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      })),
      400: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
      404: t.Object({
        codigo: t.String(),
        mensagem: t.String(),
      }),
    }
  }
);

router
  .ws("/orders", {
    open(ws) {
      const { token: HASH } = ws.data.query;

      if (!HASH) {
        ws.close();
        return;
      }

      clients.add(ws as any);
      ws.send(`🧩 Conectado ao canal de pedidos.`);
    },
    message(ws) {
      ws.send("🧩 Pedido Recebido com sucesso");
    },
    close(ws) {
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
          data: t.Object({
            id: t.String(),
          })
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
      }
    }
  );

// TODO: Verificar se é necessário o token de autenticação
router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .get(
    "/orders/all", (ctx) => controller.views(ctx as Context),
    {
      tags: ["Order"],
      detail: {
        summary: "Visualizar todos os pedidos",
        description: "Visualiza todos os pedidos já criados",
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
            recebido: t.Optional(t.Object({
              receipt_url: t.String(),
            }))
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
          createdAt: t.Date(),
          updatedAt: t.Date(),
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        })
      }
    }
  )

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .get(
    "/order/:id", (ctx) => controller.viewById(ctx as Context),
    {
      tags: ["Order"],
      detail: {
        summary: "Visualiza pedido pelo ID",
        description: "Visualiza um pedido pelo ID",
        params: {
          id: "ID do pedido"
        }
      },
      response: {
        200: t.Object({
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
            recebido: t.Optional(
              t.Object({
                receipt_url: t.String(),
              })
            )
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
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
      }
    }
  )

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .get(
    "/orders/today", (ctx) => controller.viewToday(ctx as Context),
    {
      tags: ["Order"],
      detail: {
        summary: "Visualizar pedidos do dia",
        description: "Visualiza todos os pedidos do dia"
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
            recebido: t.Optional(
              t.Object({
                receipt_url: t.String(),
              })
            )
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
          createdAt: t.Date(),
          updatedAt: t.Date(),
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        })
      }
    }
  )

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .patch(
    "/order/update/:id", (ctx) => controller.update(ctx as Context),
    {
      tags: ["Order"],
      detail: {
        summary: "Atualiza um pedido",
        description: "Atualiza um pedido",
        params: {
          id: "ID do pedido"
        }
      },
      body: t.Object({
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
      }),
      response: {
        200: t.Object({
          mensagem: t.String(),
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
      }
    }
  )

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .delete(
    "/order/delete/:id", (ctx) => controller.delete(ctx as Context),
    {
      tags: ["Order"],
      detail: {
        summary: "Deleta um pedido",
        description: "Deleta um pedido",
        params: {
          id: "ID do pedido"
        }
      },
      response: {
        200: t.Object({
          mensagem: t.String(),
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String(),
        }),
      }
    }
  )

export {
  router as RouteOrder,
  clients as ClientsWebSocket
}
