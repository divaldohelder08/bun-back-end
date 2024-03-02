import { db } from "@/db/connection";
import Elysia from "elysia";
export const getDrivers = new Elysia().get("/drivers", async () => {
  return await db.driver.findMany({
    select: {
      id: true,
      numberBI: true,
      name: true,
      email: true,
      nascimento: true,
      createdAt: true,
      status: true,
      filial: {
        select: {
          name: true,
        },
      },
      veiculo: {
        select: {
          matricula: true,
        },
      },
    },
  });
});
