import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";
import { z } from "zod";

export const create = new Elysia().post(
  "/create",
  async ({ body }) => {
    const EnumSexo = z.enum(["F", "M"]);
    const { numberBI, name, avatar, tel, email, nascimento, matricula } = body;
    const sexo = EnumSexo.parse(body.sex);
    const filialId = (await hackId()).filialId;
    //pegar o id da filial que está dentro do manager
    if (
      await db.veiculo.findUnique({
        where: {
          matricula,
        },
      })
    )
      throw new Error("Matricula já registrada");

    if (
      await db.driver.findUnique({
        where: {
          numberBI,
        },
      })
    )
      throw new Error("Bilhete já registrada");

    if (
      await db.driver.findUnique({
        where: {
          email,
        },
      })
    )
      throw new Error("Email já registrada");

    if (
      await db.driver.findUnique({
        where: {
          tel,
        },
      })
    )
      throw new Error("Telefone já registrada");

    return await db.veiculo.create({
      data: {
        matricula,
        driver: {
          create: {
            filialId,
            numberBI,
            name,
            avatar,
            tel,
            email,
            sexo,
            nascimento,
            coordenadas: (
              await db.filial.findUnique({
                where: {
                  id: filialId,
                },
              })
            )?.coordenadas,
          },
        },
      },
    });
  },

  {
    body: t.Object({
      numberBI: t.String({ minLength: 13, maxLength: 13 }),
      name: t.String({ maxLength: 255, minLength: 10 }),
      avatar: t.Optional(t.String()),
      tel: t.String({ minLength: 9, maxLength: 9 }),
      email: t.String({ format: "email" }),
      nascimento: t.String(),
      matricula: t.String({ maxLength: 11, minLength: 11 }),
      sex: t.String(),
    }),
  },
);
