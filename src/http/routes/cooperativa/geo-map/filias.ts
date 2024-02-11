import { db } from "@/db/connection";
import Elysia from "elysia";
export const getFilias = new Elysia().get("/filias", async () => {
  return await db.filial.findMany({
    select: {
      id: true,
      name: true,
      coordenadas:true
    },
  });
});
