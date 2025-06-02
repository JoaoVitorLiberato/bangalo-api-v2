import { Context, Elysia } from "elysia";
import { UserController } from "../Controllers/UserController.interfaces.http.controllers";

const route = new Elysia({ prefix: "/users" });


const controller = new UserController();

route.post("/create", (ctx: Context) => controller.createUser(ctx));


export {
  route as RouteUser,
}