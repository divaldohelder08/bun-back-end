import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";

export const getRecolhas = new Elysia().get(
  "/recolhas/:filialId",
  async ({ params }) => {
    const startDate = dayjs().subtract(1, "M");
    const { filialId } = params;
    return await db.recolha.findMany({
      where: {
        filialId,
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
            createdAt: true,
          },
        },
        status: true,
        createdAt: true,
      },
    });
  },
  {
    params: t.Object({
      filialId: t.String({ format: "uuid" }),
    }),
  },
);
