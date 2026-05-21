import {
  failedHandlerResponse,
  sucessHandlerResponse,
} from "../../../lib/utils/handlerResponse";
import { IViewUser } from "../user.dto";
import { Prisma } from "../../../db/generated/prisma/client";

export const getUserHandler = async <S extends Prisma.UserSelect>({
  prisma,
  select,
  where,
}: IViewUser<S>) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where,
      select,
    });

    return sucessHandlerResponse(user);
  } catch (error) {
    throw failedHandlerResponse({ error });
  }
};
