import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import "reflect-metadata";
import dotenv from "dotenv";
import { ConnectDatabase } from "../../Infrastructure/Database/ConnectDb.infrastructure.database";
import { SetupOrderNotifications } from "../../Infrastructure/Redis/Redis.infrastructure.repositories.redis";
import { AutenticationApp } from "../../Infrastructure/Middlewares/AutenticationApp.infrastructure.middlewares";

import { RouteOrder } from "./Routes/Order.interfaces.http.routes";
import { RouteUser } from "./Routes/User.interfaces.http.routes";
import { RouteAutentication } from "./Routes/Autentication.interfaces.http.routes";

dotenv.config()
export const App = new Elysia()
  .onBeforeHandle((ctx) => AutenticationApp(ctx))

ConnectDatabase()
SetupOrderNotifications()

App.use(cors())
App.use(
  swagger({
    documentation: {
      info: {
        title: "Bangalô API Documentation",
        version: "2.0.0",
        description: "API Documentation for Bangalô"
      },
      tags: [
        { name: "Authentication", description: "Rotas de autenticação" },
        { name: "User", description: "Rotas de usuários" },
        { name: "Order", description: "Rotas de pedidos" }
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'x-api-key',
            in: 'header'
          },
          bearerAuth: {
            type: 'http',
            scheme: 'bearer'
          }
        }
      }
    },
    swaggerOptions: {
      persistAuthorization: true
    }
  })
)

App.group("", app => app
  .use(RouteUser)
  .use(RouteOrder)
  .use(RouteAutentication)
);
