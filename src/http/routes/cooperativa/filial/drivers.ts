import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";

export const getDrivers = new Elysia().get(
  "/drivers/:filialId",
  async ({ params }) => {
    const startDate = dayjs().subtract(1, "M");
    const { filialId } = params;
    return await db.driver.findMany({
      where: {
        filialId,
        createdAt: {
          gte: startDate.startOf("day").toDate(),
        },
      },
      select: {
        id: true,
        numberBI: true,
        name: true,
        email: true,
        createdAt: true,
        status: true,
        veiculo: {
          select: {
            matricula: true,
          },
        },
      },
    });
  },
  {
    params: t.Object({
      filialId: t.String({ format: "uuid" }),
    }),
  },
);
