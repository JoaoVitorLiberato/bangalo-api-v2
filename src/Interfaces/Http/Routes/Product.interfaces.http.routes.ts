import { Context, Elysia, t } from "elysia";
import { ProductController } from "../Controllers/ProductController.interfaces.http";
import { AutenticationHashMiddleware } from "../../../Infrastructure/Middlewares/AutenticationHashRoutes.infrastructure.middlewares";

const router = new Elysia()

const controller = new ProductController()
const middleware = new AutenticationHashMiddleware()

router.get("/products", 
  (ctx) => controller.views(ctx as Context),
  {
    tags: ["Product"],
    detail: {
      summary: "Listar todos os produtos",
      description: "Retorna todos os produtos cadastrados no banco de dados"
    },
    security: [{
      apiKey: ["x-api-key"]
    }],
    response: {
      200: t.Array(t.Object({
        id: t.String(),
        name: t.String(),
        description: t.String(),
        price: t.Number(),
        tumbnail: t.Object({
          location: t.String(),
          url: t.String(),
          upload: t.Boolean()
        }),
        categoryId: t.String(),
        differences: t.Object({
          especial: t.Object({
            readonly: t.Boolean(),
            input: t.String(),
            active: t.Boolean(),
            additional: t.Number(),
          }),
          breaded: t.Object({
            readonly: t.Boolean(),
            input: t.String(),
            active: t.Boolean(),
            additional: t.Number(),
          }),
          flambed: t.Object({
            readonly: t.Boolean(),
            input: t.String(),
            active: t.Boolean(),
            additional: t.Number(),
          })
        }),
        note_client: t.Number()
      })),
      400: t.Object({
        codigo: t.String(),
        mensagem: t.String()
      })
    },
  }
)

router
  .onBeforeHandle((ctx: Context) => middleware.validate(ctx))
  .get("/product/:id",
    (ctx) => controller.viewById(ctx as Context),
    {
      tags: ["Product"],
      detail: {
        summary: "Listar um produto pelo ID",
        description: "Retorna um produto cadastrado no banco de dados pelo ID"
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      response: {
        200: t.Object({
          id: t.String(),
          name: t.String(),
          description: t.String(),
          price: t.Number(),
          tumbnail: t.Object({
            location: t.String(),
            url: t.String(),
            upload: t.Boolean()
          }),
          differences: t.Object({
            especial: t.Object({
              readonly: t.Boolean(),
              input: t.String(),
              active: t.Boolean(),
              additional: t.Number(),
            }),
            breaded: t.Object({
              readonly: t.Boolean(),
              input: t.String(),
              active: t.Boolean(),
              additional: t.Number(),
            }),
            flambed: t.Object({
              readonly: t.Boolean(),
              input: t.String(),
              active: t.Boolean(),
              additional: t.Number(),
            })
          }),
          categoryId: t.String(),
          note_client: t.Number()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      },
    }
  )

router
  .onBeforeHandle((ctx: Context) => middleware.validate(ctx))
  .post("/product/create", (ctx) => controller.create(ctx as Context),
  {
    type: "multipart",
    body: t.Form({
      product: t.String(t.Object({
        name: t.String(),
        description: t.String(),
        price: t.Number(),
        tumbnail: t.Object({
          location: t.String(),
          url: t.String(),
          upload: t.Boolean()
        }),
        categoryId: t.String(),
        differences: t.Object({
          especial: t.Object({
            readonly: t.Boolean(),
            input: t.String(),
            active: t.Boolean(),
            additional: t.Number(),
          }),
          breaded: t.Object({
            readonly: t.Boolean(),
            input: t.String(),
            active: t.Boolean(),
            additional: t.Number(),
          }),
          flambed: t.Object({
            readonly: t.Boolean(),
            input: t.String(),
            active: t.Boolean(),
            additional: t.Number(),
          })
        }),
        note_client: t.Number()
      })),
      image: t.File({
        maxSize: 1024 * 1024 * 5,
      })
    }),
    tags: ["Product"],
    detail: {
      summary: "Criar um novo produto",
      description: "Cria um novo produto no banco de dados"
    },
    security: [{
      apiKey: ["x-api-key"],
      authorization: ["Authorization"]
    }],
    response: {
      200: t.Object({
        mensagem: t.String()
      }),
      400: t.Object({
        codigo: t.String(),
        mensagem: t.String()
      })
    }
  }
)

router
  .onBeforeHandle((ctx: Context) => middleware.validate(ctx))
  .put("/product/update/:id", (ctx) => controller.update(ctx as Context),
    {
      tags: ["Product"],
      detail: {
        summary: "Atualizar produto pelo ID",
        description: "Atualiza um produto no banco de dados pelo ID"
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      type: "multipart",
      body: t.Form({
        product: t.String(t.Object({
          name: t.String(),
          description: t.String(),
          price: t.Number(),
          tumbnail: t.Object({
            location: t.String(),
            url: t.String(),
            upload: t.Boolean()
          }),
          categoryId: t.String(),
          differences: t.Object({
            especial: t.Object({
              readonly: t.Boolean(),
              input: t.String(),
              active: t.Boolean(),
              additional: t.Number(),
            }),
            breaded: t.Object({
              readonly: t.Boolean(),
              input: t.String(),
              active: t.Boolean(),
              additional: t.Number(),
            }),
            flambed: t.Object({
              readonly: t.Boolean(),
              input: t.String(),
              active: t.Boolean(),
              additional: t.Number(),
            })
          }),
          note_client: t.Number()
        })),
        image: t.File({
          maxSize: 1024 * 1024 * 5,
        })
      }),
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  )

router
  .onBeforeHandle((ctx: Context) => middleware.validate(ctx))
  .delete("/product/delete/:id", (ctx) => controller.delete(ctx as Context),
    {
      tags: ["Product"],
      detail: {
        summary: "Deletar produto pelo ID",
        description: "Deleta um produto no banco de dados pelo ID"
      },
      security: [{
        apiKey: ["x-api-key"],
        authorization: ["Authorization"]
      }],
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  )

export {
  router as ProductRoutes
}