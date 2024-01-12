import { db } from "@/db/connection";
import Elysia from "elysia";
import { authentication } from "./authentication";
// Spell:ignore veicolo
export const getProfile = new Elysia()
  .use(authentication)
  .get("/me", async ({ getUser }) => {
    const { id, filialId } = await getUser();
    const driver = await db.driver.findFirst({
      where: {
        id,
        filialId,
      },
      select: {
        name: true,
        avatar: true,
        createdAt: true,
        email: true,
        nascimento: true,
        numberBI: true,
        tel: true,
        filial: {
          select: {
            name: true,
          },
        },
        veicolo: {
          select: {
            matricula: true,
          },
        },
        _count: true,
      },
    });

    if (!driver) {
      throw new Error("Motorista não encontrado.");
    }

    return driver;
  });
