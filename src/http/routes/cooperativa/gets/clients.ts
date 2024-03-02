import { db } from "@/db/connection";
import Elysia from "elysia";
export const getClients = new Elysia().get("/clients", async () => {
  return await db.client.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      numberBI: true,
      nascimento: true,
      createdAt: true,
      filial: {
        select: {
          name: true,
        },
      },
    },
  });
});
