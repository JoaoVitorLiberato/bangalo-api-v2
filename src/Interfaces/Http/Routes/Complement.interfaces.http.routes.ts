import { Context, Elysia, t } from "elysia";
import { ComplementController } from "../Controllers/ComplementController.interfaces.http";
import { AutenticationHashMiddleware } from "../../../Infrastructure/Middlewares/AutenticationHashRoutes.infrastructure.middlewares";

const router = new Elysia()

const controller = new ComplementController();
const middleware = new AutenticationHashMiddleware();

router
  .get("/complements",
    (ctx) => controller.views(ctx as Context),
    {
      tags: ["Complement"],
      security: [{ apiKey: ["x-api-key"] }],
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          name: t.String(),
          description: t.String(),
          price: t.Number()
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .get("/complement/:id",
    (ctx) => controller.viewById(ctx as Context),
    {
      tags: ["Complement"],
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      response: {
        200: t.Object({
          id: t.String(),
          name: t.String(),
          description: t.String(),
          price: t.Number()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
      }
    }
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .post("/complement/create",
    (ctx) => controller.create(ctx as Context),
    {
      tags: ["Complement"],
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      body: t.Object({
        name: t.String(),
        description: t.String(),
        price: t.Number()
      }),
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
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .put("/complement/update/:id",
    (ctx) => controller.update(ctx as Context),
    {
      tags: ["Complement"],
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      body: t.Object({
        name: t.String(),
        description: t.String(),
        price: t.Number()
      }),
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
  );

router
  .onBeforeHandle((ctx) => middleware.validate(ctx as Context))
  .delete("/complement/delete/:id",
    (ctx) => controller.delete(ctx as Context),
    {
      tags: ["Complement"],
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
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
  );

export { router as RouteComplement };
