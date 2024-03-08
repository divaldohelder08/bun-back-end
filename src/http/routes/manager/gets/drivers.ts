import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllDrivers = new Elysia().get("/drivers", async () => {
  return await db.driver.findMany({
    where: {
      filialId: (await hackId()).filialId,
    },
    select: {
      id: true,
      numberBI: true,
      name: true,
      email: true,
      createdAt: true,
      status: true,
      veiculo: {
        select: {
          matricula: true,
        },
      },
    },
  });
});
