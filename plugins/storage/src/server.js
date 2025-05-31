import app from "./app"
import dotenv from "dotenv"

dotenv.config()

app.get("/v1", (_request, response, _next) => {
  response.send("Storage está online")
})

app.listen(process.env.APPLICATION_STORAGE_PORT, "0.0.0.0", () => {
  console.log(`Storage running at port ${process.env.APPLICATION_STORAGE_PORT}`)
})
