import { Context, Elysia } from "elysia";
import { UserController } from "../Controllers/UserController.interfaces.http.controllers";
import { AutenticationHashMiddleware } from "../../../Infrastructure/Middlewares/AutenticationHashRoutes.infrastructure.middlewares";

const middleware = new AutenticationHashMiddleware();
const controller = new UserController();

const router = new Elysia()
  .onBeforeHandle(async (ctx: Context) => await middleware.validate(ctx));

router.get("/users", (ctx: Context) => controller.findAllUsers(ctx));
router.get("/user/:id", (ctx: Context) => controller.findUserById(ctx));
router.post("/user/create", (ctx: Context) => controller.createUser(ctx));
router.put("/user/update/:id", (ctx: Context) => controller.updateUser(ctx));

export {
  router as RouteUser,
}