import { buildResponseSchema } from "../../lib/utils/swaggerSchemas";
import { validateBody } from "../../lib/utils/zodResolver";
import { FastifyInstance } from "fastify";
import { loginRequestSchema } from "./auth.dto";
import { AuthService } from "./auth.service";
import { jsonResponse } from "../../lib/utils/jsonResponse";

export const v1AuthController = (app: FastifyInstance) => {
  const authService = new AuthService(app.prisma);

  app.post(
    "/login",
    {
      preHandler: [validateBody(loginRequestSchema)],
      schema: {
        tags: ["Auth"],
        summary: "Login do usuário",
        description:
          "Autentica o usuário com email/CPF e senha, retornando um token JWT.",
        body: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
              description: "Email ou CPF do usuário",
            },
            password: { type: "string", description: "Senha do usuário" },
          },
        },
        response: {
          ...buildResponseSchema({
            type: "object",
            properties: {
              token: { type: "string", description: "JWT token" },
              userId: { type: "string", format: "uuid" },
            },
          }),
          401: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              message: {
                type: "string",
                example: "Usuário ou senha inválidos!",
              },
              data: { type: "object", nullable: true },
            },
          },
        },
      },
    },
    async (req, reply) => {
      try {
        const { username, password } = req.body as any;

        const user = await authService.verifyUserLogin({ password, username });

        const token = app.jwt.sign(
          { userId: user.id },
          {
            expiresIn: "4h",
          },
        );

        return jsonResponse.success({ reply, data: { token } });
      } catch (error: any) {
        return jsonResponse.error({ reply, ...error });
      }
    },
  );

  app.get(
    "/auth-check",
    { preHandler: [app.authenticate] },
    async (req, reply) => {
      try {
        return req.user;
      } catch (error: any) {
        return jsonResponse.error({ reply, ...error });
      }
    },
  );
};
