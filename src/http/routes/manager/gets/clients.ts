import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllClients = new Elysia().get("/clients", async () => {
  return await db.client.findMany({
    where: {
      filialId: (await hackId()).filialId,
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
});
