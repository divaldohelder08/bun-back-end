import { db } from "@/db/connection";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllDrivers = new Elysia().get("/get-all-drivers", async () => {
  return await db.driver.findMany({
    select: {
      id: true,
      numberBI: true,
      name: true,
      email: true,
      nascimento: true,
      createdAt: true,
      filial: {
        select: {
          id: true,
        },
      },
      Veiculo: {
        select: {
          matricula: true,
        },
      },
    },
  });
});
