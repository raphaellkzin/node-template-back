import { PrismaClient } from "../../db/generated/prisma/client";

export interface ICreateEntityHandler<T> {
  data: T;
  prisma: PrismaClient;
}

export interface IUpdateEntityHandler<T, Y> {
  data: T;
  where: Y;
  prisma: PrismaClient;
}
export interface IViewEntityHandler<T> {
  prisma: PrismaClient;
  where: T;
}

export interface IListEntitiesHandler<T> {
  prisma: PrismaClient;
  cursor?:
    | {
        id: string;
        createdAt: string;
      }
    | string;
  where?: T;
  limit?: number;
  orderBy?: "asc" | "desc";
}

export interface IPaginatedResult<T> {
  data: T[];
  hasNextPage: boolean;
  nextCursor: {
    id: string;
    createdAt: string;
  } | null;
}
