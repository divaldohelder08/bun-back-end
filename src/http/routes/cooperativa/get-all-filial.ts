import { db } from "@/db/connection";
import Elysia from "elysia";
export const getAllFilial = new Elysia().get("/get-all-filial", async () => {
  return await db.filial.findMany({
    select: {
      id: true,
      name: true,
      status: true,
      tel: true,
      createdAt: true,
      manager: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          email: true,
        },
      },
      address: true,
      _count: true,
    },
  });
});
