import { Context, Elysia } from "elysia";
import { AutenticationController } from "../Controllers/AutenticationController.interfaces.http";

const route = new Elysia();
const controller = new AutenticationController();

route
  .post("/login", (ctx: Context) => controller.login(ctx));


export {
  route as RouteAutentication
}