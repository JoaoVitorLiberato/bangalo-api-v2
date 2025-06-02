import { Context, Elysia } from "elysia";
import { UserController } from "../Controllers/UserController.interfaces.http.controllers";

const router = new Elysia({ prefix: "/users" });


const controller = new UserController();

router.get("", (ctx: Context) => controller.findAllUsers(ctx));
router.post("/create", (ctx: Context) => controller.createUser(ctx));

export {
  router as RouteUser,
}