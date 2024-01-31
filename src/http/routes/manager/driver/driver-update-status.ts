import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const updateDriverStatus = new Elysia().post(
  "/update-status",
  async ({ body, set }) => {
    const { id, status } = body;
    await db.driver.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await db.driver.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
    set.status = 204;
  },
  {
    body: t.Object({
      status: t.Enum({ On: "On", Off: "Off" }),
      id: t.String(),
    }),
  }
);
