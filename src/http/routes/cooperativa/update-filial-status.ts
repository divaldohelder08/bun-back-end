import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const updateFilialStatus = new Elysia().post(
  "/update-status",
  async ({ body, set }) => {
    const { id, status } = body;
    await db.filial.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await db.filial.update({
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
      status: t.Enum({ aberta: "aberta", fechado: "fechado" }),
      id: t.String(),
    }),
  }
);
