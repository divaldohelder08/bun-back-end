import { db } from "@/db/connection";
import { env } from "@/env";
import Elysia, { t } from "elysia";
import jwt from "jsonwebtoken";

export const authenticate = new Elysia().post(
  "/authenticate",
  async ({ body }) => {
    const { email, filialId, password } = body;
    const user = await db.filial.findFirst({
      where: {
        AND: [
          { id: filialId },
          {
            manager: {
              role: "gerente",
              email,
              password,
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
    console.log(user);
    if (!user || !user.manager) {
      console.log("erro");

      throw new Error("Credenciais inválidas");
    }
    const userInfo = {
      id: user.manager.id,
      name: user.manager.name,
      email: user.manager.email,
      avatar: user.manager.avatar,
      role: "manager",
      filial: {
        id: user.id,
        name: user.name,
      },
    };

    const token = jwt.sign(
      { id: userInfo.id, filialId: userInfo.filial.id },
      env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );
    console.log({
      user: userInfo,
      token,
    });
    return {
      user: userInfo,
      token,
    };
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      filialId: t.String(),
      password: t.String(),
    }),
  },
);
