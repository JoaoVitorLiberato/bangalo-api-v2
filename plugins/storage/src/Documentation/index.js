import swaggerJSDoc from "swagger-jsdoc"
import path from "path"

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Storage Bangalo API',
      version: '1.0.0',
      description: 'Api - Storage Bangalô',
    },
    servers: [{ url: 'http://localhost:4000' }],
  },
  apis:  [path.resolve(__dirname, "../Infra/Routers/*.js")]
}

export const swaggerSpec = swaggerJSDoc(options)