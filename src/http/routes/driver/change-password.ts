import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const changePassword = new Elysia().post(
  "/change-password",
  async ({ body }) => {
    const { senha, id } = body;

    const driver = await db.driver.update({
      where: {
        id,
      },
      data: {
        password: senha,
      },
    });
    return { email: driver.email };
  },
  {
    body: t.Object({
      senha: t.String(),
      id: t.String(),
    }),
  },
);
