import { db } from "@/db/connection";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllClients = new Elysia().get("/get-all-clients", async () => {
  return await db.cliente.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      numberBI: true,
      nascimento: true,
      createdAt: true,
      filial: {
        select: {
          id: true,
        },
      },
    },
  });
});
