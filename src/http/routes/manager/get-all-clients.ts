import { db } from "@/db/connection";
import { env } from "@/env";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllClients = new Elysia().get("/get-all-clients", async () => {
  return await db.cliente.findMany({
    where: {
      filialId: env.FILIALID_BASE,
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
