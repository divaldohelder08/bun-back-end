import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const updateProfile = new Elysia().put(
  "/profile",
  async ({ set, body }) => {
    const filial = await db.filial.findFirst({
      where: {
        name: {
          contains: "camama",
        },
      },
    });
    const { status } = body;

    await db.filial.update({
      data: {
        status,
      },
      where: {
        id: filial?.id,
      },
    });

    set.status = 204;
  },
  {
    body: t.Object({
      status: t.Enum({ On: "On", Chuva: "Chuva", Noite: "Noite" }),
    }),
  }
);
