import { Context, Elysia, t } from "elysia";
import { UserController } from "../Controllers/UserController.interfaces.http.controllers";
import { AutenticationHashMiddleware } from "../../../Infrastructure/Middlewares/AutenticationHashRoutes.infrastructure.middlewares";

const middleware = new AutenticationHashMiddleware();
const controller = new UserController();

const router = new Elysia()
  .onBeforeHandle(async (ctx) => await middleware.validate(ctx))
  .get("/users", 
    async (ctx) =>  await controller.findAllUsers(ctx as Context),
    {
      tags: ["User"],
      detail: {
        summary: "Buscar todos os usuários",
        description: "Buscar todos os usuários"
      },
      security: [{
        authorization: ["Authorization"],
        apiKey: ["x-api-key"]
      }],
      response: {
        200: t.Array(t.Object({
          id: t.String(),
          email: t.String(),
          details: t.Object({
            name: t.String(),
            age: t.Number(),
            phone: t.String(),
            thumbnail: t.Object({
              location: t.String(),
              url_image: t.String()
            })    
          })
        })),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  )
  .get("/user/:id",
    async (ctx) => controller.findUserById(ctx as Context),
    {
      params: t.Object({
        id: t.String()
      }),
      tags: ["User"],
      detail: {
        summary: "Buscar usuário por ID",
        description: "Buscar usuário por ID"
      },
      security: [{
        authorization: ["Authorization"],
        apiKey: ["x-api-key"]
      }],
      response: {
        200: t.Object({
          email: t.String(),
          details: t.Object({
            name: t.String(),
            age: t.Number(),
            phone: t.String(),
            thumbnail: t.Object({
              location: t.String(),
              url_image: t.String()
            })
          })
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  )

  .post("/user/create",
    async (ctx) => await controller.createUser(ctx as Context),
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
        details: t.Object({
          name: t.String(),
          age: t.Number(),
          phone: t.String(),
          thumbnail: t.Object({
            location: t.String(),
            url_image: t.String()
          })
        })
      }),
      tags: ["User"],
      detail: {
        summary: "Criar um novo usuário",
        description: "Criar um novo usuário no banco de dados"
      },
      security: [{
        authorization: ["Authorization"],
        apiKey: ["x-api-key"]
      }],
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  )

  .put("/user/update/:id",
    async (ctx) => await controller.updateUser(ctx as Context),
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
        details: t.Object({
          name: t.String(),
          age: t.Number(),
          phone: t.String(),
          thumbnail: t.Object({
            location: t.String(),
            url_image: t.String()
          })
        })
      }),
      tags: ["User"],
      detail: {
        summary: "Atualizar um usuário pelo ID",
        description: "Atualiza um usuário no banco de dados pelo ID"
      },
      security: [{
        authorization: ["Authorization"],
        apiKey: ["x-api-key"]
      }],
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  )
  .patch("/user/update/:id/password",
    async (ctx) => await controller.updatePassword(ctx as Context),
    {
      body: t.Object({
        newPassword: t.String(),
        password: t.String(),
      }),
      tags: ["User"],
      detail: {
        summary: "Atualizar a senha de um usuário pelo ID",
        description: "Atualiza a senha de um usuário no banco de dados pelo ID"
      },
      security: [{
        authorization: ["Authorization"],
        apiKey: ["x-api-key"]
      }],
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        401: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })
      }
    }
  )

  .delete("/user/delete/:id",
    async (ctx) => await controller.deleteUser(ctx as Context),
    {
      params: t.Object({
        id: t.String()
      }),
      tags: ["User"],
      detail: {
        summary: "Deletar um usuário pelo ID",
        description: "Deleta um usuário no banco de dados pelo ID"
      },
      security: [{
        authorization: ["Authorization"],
        apiKey: ["x-api-key"]
      }],
      response: {
        200: t.Object({
          mensagem: t.String()
        }),
        400: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        }),
        404: t.Object({
          codigo: t.String(),
          mensagem: t.String()
        })  
      }
    }
  );

export {
  router as RouteUser,
}
