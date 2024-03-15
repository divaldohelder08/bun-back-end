import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const UpdateTel = new Elysia().put(
  "/update-tel",
  async ({ body, set }) => {
    const { tel } = body;
    await db.manager.update({
      where: {
        id: (await hackId()).managerId,
      },
      data: {
        tel,
      },
    });
    set.status = 204;
  },
  {
    body: t.Object({
      tel: t.String({ minLength: 9, maxLength: 9 }),
    }),
  },
);
