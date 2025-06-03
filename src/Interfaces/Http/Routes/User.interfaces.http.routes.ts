import { Context, Elysia } from "elysia";
import { UserController } from "../Controllers/UserController.interfaces.http.controllers";

const router = new Elysia();


const controller = new UserController();

router.get("/users", (ctx: Context) => controller.findAllUsers(ctx));
router.get("/user/:id", (ctx: Context) => controller.findUserById(ctx));
router.post("/user/create", (ctx: Context) => controller.createUser(ctx));
router.put("/user/update/:id", (ctx: Context) => controller.updateUser(ctx));

export {
  router as RouteUser,
}