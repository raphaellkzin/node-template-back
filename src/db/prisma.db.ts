import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// 1. Crie a instância do Pool do 'pg' passando a URL
export const prismaPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Passe o pool para o adaptador do Prisma
const adapter = new PrismaPg(prismaPool);

export const prismaDbIndex = () => {
  // 3. Agora o Prisma usará o adaptador corretamente
  const prisma = new PrismaClient({
    adapter,
    log: ["info"],
  });

  return prisma;
};
