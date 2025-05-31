import { Elysia } from "elysia";
import dotenv from "dotenv"
import { ConnectDatabase } from "../../Infrastructure/Database/connectDb.infrastructure.database";
import { RouteOrder } from "./Routes/Order.interfaces.http.routes";
import { setupOrderNotifications } from "../../Infrastructure/Redis/Redis.infrastructure.repositories.redis";

dotenv.config()

export const App = new Elysia({})

ConnectDatabase()
setupOrderNotifications()

App.use(RouteOrder)
