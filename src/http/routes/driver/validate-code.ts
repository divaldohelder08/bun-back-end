import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const validateCode = new Elysia().post(
  "/validate-code",
  async ({ set, body }) => {
    const { code } = body;
    const driver = await db.driver.findFirst({
      where: {
        code,
      },
    });
    console.log(driver);

    if (!driver) {
      set.status = 401;

      throw new Error("driver não encontrado.");
    }

    return await db.driver.update({
      where: {
        id: driver.id,
      },
      data: {
        code: null,
      },
    });
  },
  {
    body: t.Object({
      code: t.String(),
    }),
  }
);
