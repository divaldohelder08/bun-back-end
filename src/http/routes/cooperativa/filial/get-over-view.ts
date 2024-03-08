import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const getOverView = new Elysia().get(
  "/:id/get-over-view",
  async ({ params }) => {
    const { id } = params;
    return await db.filial.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        name: true,
        tel: true,
        status: true,
        createdAt: true,
        _count: {
          select: {
            clients: true,
            drivers: true,
            recolhas: true,
          },
        },
      },
    });
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  },
);
