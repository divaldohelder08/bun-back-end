import { db } from "@/db/connection";
import Elysia, { t } from "elysia";
import { hackId } from "@/lib/hack";

export const updateFilialStatus = new Elysia().post(
  "/update-status",
  async ({ body, set }) => {
    const { id, status } = body;
   
//   await db.filial.findUniqueOrThrow({
  //    where: {
    //    id,
      //},
    //});

    await db.filial.update({
      data: {
        status,
      },
      where: {
        id:(await hackId()).filialId,
      },
    });
    set.status = 204;
  },
  {
    body: t.Object({
      status: t.Enum({ On: "On", Noite: "Noite", Chuva: "Chuva" }),
      id: t.String(),
    }),
  }
);
