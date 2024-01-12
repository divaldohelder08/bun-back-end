import { db } from "@/db/connection";
import { env } from "@/env";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllDrivers = new Elysia().get("/get-all-drivers", async () => {
  return await db.driver.findMany({
    where: {
      filialId: env.FILIALID_BASE,
    },
    select: {
      id: true,
      numberBI: true,
      name: true,
      email: true,
      nascimento: true,
      createdAt: true,
      Veiculo: {
        select: {
          matricula: true,
        },
      },
    },
  });
});
