import { db } from "@/db/connection";
import { env } from "@/env";
import Elysia, { t } from "elysia";
import jwt from "jsonwebtoken";

export const authenticate = new Elysia().post(
  "/super-manager/authenticate",
  async ({ body }) => {
    const { email } = body;

    const supermanager = await db.manager.findUnique({
      where: {
        email,
        role: "superGerente",
      },
    });

    if (!supermanager) {
      throw new Error("Credencial inválida");
    }
    const supermanagerInfo = {
      id: supermanager.id,
      name: supermanager.name,
      email: supermanager.email,
      avatar: supermanager.avatar,
      role: "supermanager",
    };

    const token = jwt.sign({ id: supermanagerInfo.id }, env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log(token);
    return {
      user: supermanagerInfo,
      token,
    };
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
    }),
  },
);
