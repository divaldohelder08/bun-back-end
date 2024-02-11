import { db } from "@/db/connection";
import Elysia from "elysia";
export const getDrivers = new Elysia().get("/drivers", async () => {
  return await db.driver.findMany({
    select: {
      id: true,
      name: true,
      coordenadas: true,
    },
  });
});
