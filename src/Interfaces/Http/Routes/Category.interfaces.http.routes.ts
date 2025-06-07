import { Context, Elysia, t } from "elysia";
import { CategoryController } from "../Controllers/CategoryController.interfaces.http";
import { AutenticationHashMiddleware } from "../../../Infrastructure/Middlewares/AutenticationHashRoutes.infrastructure.middlewares";

const router = new Elysia()

const controller = new CategoryController();
const middleware = new AutenticationHashMiddleware();

router
  .get("/categories",
    (ctx) => controller.views(ctx as Context),
    {
      tags: ["Category"],
      security: [{ apiKey: ["x-api-key"] }],
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          name: t.String(),
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
  .get("/category/:id",
    (ctx) => controller.viewById(ctx as Context),
    {
      tags: ["Category"],
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      response: {
        200: t.Object({
          id: t.String(),
          name: t.String(),
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
  .post("/category/create",
    (ctx) => controller.create(ctx as Context),
    {
      tags: ["Category"],
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      body: t.Object({
        name: t.String(),
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
  .put("/category/update/:id",
    (ctx) => controller.update(ctx as Context),
    {
      tags: ["Category"],
      security: [{ 
        apiKey: ["x-api-key"],
        bearer: ["Authorization"]
      }],
      body: t.Object({
        name: t.String(),
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
  .delete("/category/delete/:id",
    (ctx) => controller.delete(ctx as Context),
    {
      tags: ["Category"],
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

export { router as RouteCategory };
