import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const UpdateTel = new Elysia().post(
  "/update-tel",
  async ({ body }) => {
    const { tel } = body;
    await db.manager.update({
      where: {
        id: (await hackId()).managerId,
      },
      data: {
        tel,
      },
    });
  },
  {
    body: t.Object({
      tel: t.String({ minLength: 9, maxLength: 9 }),
    }),
  },
);
