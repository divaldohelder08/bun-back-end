import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const deleteClient = new Elysia().delete(
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
      !(await db.client.findUnique({
        where: {
          id,
        },
      }))
    ) {
      throw Error("Cliente não encontrado");
    }

    await db.client.delete({
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
