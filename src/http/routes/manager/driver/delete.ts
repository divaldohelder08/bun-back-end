import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const deleteDriver = new Elysia().delete(
  "/delete",
  async ({ query, set }) => {
    //verificar as merdas do cabeçalho
    const { id, key } = query;

    if (
      !(await db.manager.findUnique({
        where: {
          id: (await hackId()).managerId,
          key,
        },
      }))
    ) {
      throw Error("Chave do manager incorreta");
    }

    if (
      !(await db.driver.findUnique({
        where: {
          id,
        },
      }))
    ) {
      throw Error("Motorista não encontrado");
    }

    await db.driver.delete({
      where: {
        id,
      },
    });
    set.status = 204;
  },
  {
    query: t.Object({
      id: t.String(),
      key: t.String(),
    }),
  },
);
