import { Elysia } from "elysia";
import "reflect-metadata";
import dotenv from "dotenv";
import { ConnectDatabase } from "../../Infrastructure/Database/connectDb.infrastructure.database";
import { setupOrderNotifications } from "../../Infrastructure/Redis/Redis.infrastructure.repositories.redis";
import { RouteOrder } from "./Routes/Order.interfaces.http.routes";
import { RouteUser } from "./Routes/User.interfaces.http.routes";

dotenv.config()

export const App = new Elysia({})

ConnectDatabase()
setupOrderNotifications()

App.use(RouteOrder)
App.use(RouteUser)
