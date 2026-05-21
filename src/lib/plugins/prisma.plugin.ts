import { prismaDbIndex } from "../../db/prisma.db";
import fp from "fastify-plugin";
import { PrismaClient } from "../../db/generated/prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prisma = prismaDbIndex();

export const prismaPlugin = fp(async (app) => {
  app.decorate("prisma", prisma);

  // console.log('')

  // Fecha conexão ao desligar o servidor
  app.addHook("onClose", async (app) => {
    await app.prisma.$disconnect();
  });
});
