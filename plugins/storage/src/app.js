import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import swaggerUi from "swagger-ui-express"


import { StorageRouter } from "./Infra/Routers/StorageRouter"
import { swaggerSpec } from "./Documentation"

const app = express()

app.use(express.json())
app.use(cors({ origin: process.env.APPLICATION_STORAGE_ACCESS }))
app.use(helmet())
app.use(morgan("combined"))

app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/v1", StorageRouter)

export default app
