import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";
export const getClients = new Elysia().get("/clients", async () => {
  return await db.cliente.findMany({
    select: {
      id: true,
      name: true,
      coordenadas: true,
    },
    where: {
      filialId: (await hackId()).filialId,
    },
  });
});
