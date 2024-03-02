import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";

export const getClients = new Elysia().get(
  "/clients/:filialId",
  async ({ params }) => {
    const startDate = dayjs().subtract(1, "M");
    const { filialId } = params;
    return await db.client.findMany({
      where: {
        filialId,
        createdAt: {
          gte: startDate.startOf("day").toDate(),
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        numberBI: true,
        nascimento: true,
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
