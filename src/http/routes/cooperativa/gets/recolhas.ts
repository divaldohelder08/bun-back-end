import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia from "elysia";

export const getRecolhas = new Elysia().get("/recolhas", async () => {
  const startDate = dayjs().subtract(1, "M");
  return await db.recolha.findMany({
    where: {
      createdAt: {
        gte: startDate.startOf("day").toDate(),
      },
    },
    select: {
      id: true,
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          createdAt: true,
        },
      },
      driver: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          filialId: true,
          createdAt: true,
        },
      },
      filial: {
        select: {
          name: true,
        },
      },
      status: true,
      createdAt: true,
    },
  });
});
