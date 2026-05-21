import { prismaDbIndex, prismaPool } from "../src/db/prisma.db";
import { createSaltHash } from "../src/lib/utils/utils";

const prisma = prismaDbIndex();

export default async function main() {
  const user = await prisma.user.create({
    data: {
      username: "admin@adm.com",
      password: await createSaltHash("1234"),
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await prismaPool.end();

    console.log("Seed done!");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await prismaPool.end();
    process.exit(1);
  });
