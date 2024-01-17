import { db } from "@/db/connection";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllDrivers = new Elysia().get("/get-all-drivers", async () => {
  const camamaFilial = await db.filial.findFirst({
    where: {
      name: {
        contains: "Camama",
      },
    },
  });

  return await db.driver.findMany({
    where: {
      filialId: camamaFilial?.id,
    },
    select: {
      id: true,
      numberBI: true,
      name: true,
      email: true,
      nascimento: true,
      createdAt: true,
      veiculo: {
        select: {
          matricula: true,
        },
      },
    },
  });
});
