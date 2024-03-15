import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const UpdateProfile = new Elysia().post(
  "/update-profile",
  async ({ body }) => {
    const { avatar, email, name } = body;
    console.log(avatar, email, name);
    await db.manager.update({
      where: {
        id: (await hackId()).managerId,
      },
      data: {
        avatar,
        email,
        name,
      },
    });
  },
  {
    body: t.Object({
      name: t.String({ minLength: 3, maxLength: 255 }),
      email: t.String({ minLength: 3, maxLength: 255 }),
      avatar: t.Union([t.String(), t.Null()]),
    }),
  },
);
