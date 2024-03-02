import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";

export const getOverView = new Elysia().get("/get-over-view", async () => {
  const id = (await hackId()).filialId;
  return await db.filial.findFirstOrThrow({
    where: {
      id,
    },
    select: {
      name: true,
      tel: true,
      status: true,
      createdAt: true,
      _count: {
        select: {
          clients: true,
          drivers: true,
          recolhas: true,
        },
      },
    },
  });
});
