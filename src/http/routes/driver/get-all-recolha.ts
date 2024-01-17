import { db } from "@/db/connection";
import Elysia from "elysia";

export const getAllRecolha = new Elysia().get(
  "/get-all-recolha",
  async ({ getCurrentUser }) => {
    return {
      recos: await db.recolha.findMany({
        where: {
          driverId: "fb069db7-d8b6-4f0f-888c-65bf4ce4a0b4",
          status: "pendente",
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          createdAt: true,
        },
        take: 10,
      }),
    };
  },
);
