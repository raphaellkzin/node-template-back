import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      userId: string;
    };
    user: {
      userId: string;
    };
  }
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }
}
export const authPlugin = fp(async function authPlugin(
  fastify: FastifyInstance,
) {
  // Registra o JWT
  fastify.register(fastifyJwt, {
    secret:
      process.env.JWT_SECRET_KEY ||
      "AQUI_O_BAGUI_E_DOIDO_1U8I23ENASasda78Q*#BHD&ahsdjmd*!@bneolsd*(!qndOASDMDF0!ui#enDC8QA", // Use process.env.JWT_SECRET em produção
  });

  // Decorator de Autenticação
  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({
          error: "Não autorizado!",
          message: "Token inválido ou ausente.",
        });
      }
    },
  );
});
