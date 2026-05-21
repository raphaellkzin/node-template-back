import { PrismaClient } from "../../db/generated/prisma/client";
import { getUserHandler } from "../user/handlers/user.handler";
import { verifySaltHash } from "../../lib/utils/utils";

export class AuthService {
  constructor(private readonly prisma: PrismaClient) {}

  public async verifyUserLogin({
    password,
    username,
    prisma = this.prisma,
  }: {
    username: string;
    password: string;
    prisma?: PrismaClient;
  }) {
    try {
      const {
        data: { password: userPass, ...restUser },
      } = await getUserHandler({
        prisma,
        select: { username: true, password: true, id: true },
        where: {
          username: username,
        },
      });

      if (!(await verifySaltHash({ hashed: userPass, value: password }))) {
        throw { message: "Usuário ou senha inválidos" };
      }

      return restUser;
    } catch (error) {
      throw error;
    }
  }
}
