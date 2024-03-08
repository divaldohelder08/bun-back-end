import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const getManagerProfile = new Elysia().get(
  "/:id/manager",
  async ({ params }) => {
    const { id } = params;
    return await db.manager.findFirstOrThrow({
      where: {
        filial:{
          some:{
            id
          }
        }
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        email: true,
        role: true,
        createdAt: true,
        tel: true,
      },
    });
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  },
);
