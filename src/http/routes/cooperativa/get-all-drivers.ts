import { db } from "@/db/connection";
import Elysia from "elysia";
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
      veiculo: {
        select: {
          matricula: true,
        },
      },
    },
  });
});
