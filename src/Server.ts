import "reflect-metadata";
import { App } from "./Interfaces/Http/App.interfaces.http";

App.get("/", () => "Hello Elysia")
  .listen(String(process.env.APPLICATION_PORT));

console.log(
  `🦊 Server is running at ${App.server?.hostname}:${App.server?.port}`
);
