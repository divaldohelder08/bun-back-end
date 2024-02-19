import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const updateStatus = new Elysia().post(
  "/update-status",
  async ({ body }) => {
    const { id, status } = body;
    await db.driver.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return await db.driver.update({
      data: {
        status,
      },
      where: {
        id,
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
    body: t.Object({
      status: t.Enum({ On: "On", Off: "Off" }),
      id: t.String(),
    }),
  },
);
