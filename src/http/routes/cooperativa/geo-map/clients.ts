import { db } from "@/db/connection";
import Elysia from "elysia";
export const getClients = new Elysia().get("/clients", async () => {
  return await db.client.findMany({
    select: {
      id: true,
      name: true,
      coordenadas: true,
    },
  });
});
