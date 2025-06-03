import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import "reflect-metadata";
import dotenv from "dotenv";
import { ConnectDatabase } from "../../Infrastructure/Database/connectDb.infrastructure.database";
import { setupOrderNotifications } from "../../Infrastructure/Redis/Redis.infrastructure.repositories.redis";
import { RouteOrder } from "./Routes/Order.interfaces.http.routes";
import { RouteUser } from "./Routes/User.interfaces.http.routes";
import { AutenticationApp } from "./Middlewares/AutenticationApp.interfaces.http.middlewares";

dotenv.config()

export const App = new Elysia()
  .onBeforeHandle((ctx) => AutenticationApp(ctx))

ConnectDatabase()
setupOrderNotifications()

App.use(cors())
App.use(
  swagger({
    documentation: {
      info: {
        title: "Bangalô API Documentation",
        version: "2.0.0"
      },
    },
  })
)

App.use(RouteOrder)
App.use(RouteUser)
