import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const updateFilialStatus = new Elysia().post(
  "/update-status",
  async ({ body, set }) => {
    const { status } = body;
    // pegar aquela merda do header
    await db.filial.findUniqueOrThrow({
      where: {
        id: (await hackId()).filialId,
      },
    });

    await db.filial.update({
      data: {
        status,
      },
      where: {
        id: (await hackId()).filialId,
      },
    });
    set.status = 200;
  },
  {
    body: t.Object({
      status: t.Enum({ aberta: "aberta", fechado: "fechado" }),
    }),
  },
);
