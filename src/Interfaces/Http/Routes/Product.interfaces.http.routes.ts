import { Context, Elysia } from "elysia";
import { ProductController } from "../Controllers/ProductController.interfaces.http";
import { AutenticationHashMiddleware } from "../../../Infrastructure/Middlewares/AutenticationHashRoutes.infrastructure.middlewares";

const router = new Elysia()

const controller = new ProductController()
const middleware = new AutenticationHashMiddleware()

router
  .onBeforeHandle((ctx: Context) => middleware.validate(ctx))
  .post("/product/create", (ctx: Context) => controller.save(ctx),
  {
    type: "multipart",
  }
);

export {
  router as ProductRoutes
}
