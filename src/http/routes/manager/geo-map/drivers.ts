import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";
export const getDrivers = new Elysia().get("/drivers", async () => {
  return await db.driver.findMany({
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
