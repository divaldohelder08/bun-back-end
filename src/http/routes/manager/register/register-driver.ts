import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const registerDriver = new Elysia().post(
  "/driver",
  async ({ body, set }) => {
    const {
      name,
      email,
      numberBI,
      nascimento,
      matricula,
      tel,
      avatar,
      password,
      filialId,
    } = body;

    const ola = await db.veiculo.create({
      data: {
        matricula,
        Driver: {
          create: {
            email,
            name,
            nascimento,
            numberBI,
            password,
            tel,
            avatar,
            filialId,
          },
        },
      },
    });

    if (!ola) {
      return ola;
    }
    set.status = 401;
  },
  {
    body: t.Object({
      numberBI: t.String(),
      filialId: t.String(),
      name: t.String(),
      avatar: t.Optional(t.String()),
      tel: t.String({ maxLength: 12 }),
      email: t.String({ format: "email" }),
      nascimento: t.Date(),
      password: t.String(),
      matricula: t.String({ maxLength: 11, minLength: 11 }),
    }),
  }
);
