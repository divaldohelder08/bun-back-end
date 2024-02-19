import { db } from "@/db/connection";
import { hackDriverId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const UpdateKey = new Elysia().put(
  "/update-key",
  async ({ body, set }) => {
    const { antiga, nova } = body;
    console.log("aqui")
    
    //pegar aquelas merdas do header
    if (
      !(await db.driver.findUnique({
        where: {
          id: (await hackDriverId()).driverId,
          password: antiga,
        },
      }))
    ) {
    console.log("erro")
      throw Error("Atual senha incorreta");
    }
    console.log("passou")

   return await db.driver.update({
      where: {
        id: (await hackDriverId()).driverId,
      },
      data: {
        password: nova,
      },
    });
    
  },
  {
    body: t.Object({
      antiga: t.String(),
      nova: t.String(),
    }),
  },
);
