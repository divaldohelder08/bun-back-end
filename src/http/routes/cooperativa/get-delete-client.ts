import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const getDeleteClientById = new Elysia().delete(
  "/get-delete-client/:id",
  async ({ params, set }) => {
    const { id } = params;

    await db.cliente.findUniqueOrThrow({
      where: {
        id,
      },
    });
    await db.cliente.delete({
      where: {
        id,
      },
    });
    set.status = 200;
    return "Cliente deletado com sucesso";
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);
