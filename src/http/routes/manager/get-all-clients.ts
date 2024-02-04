import { db } from "@/db/connection";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllClients = new Elysia().get("/get-all-clients", async () => {
  const camamaFilial = await db.filial.findFirst({
    where: {
      name: {
        contains: "Camama",
      },
    },
  });

  return await db.cliente.findMany({
    where: {
      filialId: camamaFilial?.id,
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
