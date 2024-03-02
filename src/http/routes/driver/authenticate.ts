import { db } from "@/db/connection";
import { env } from "@/env";
import Elysia, { t } from "elysia";
import jwt from "jsonwebtoken";
import { authentication } from "./authentication";

export const authenticate = new Elysia().use(authentication).post(
  "/authenticate",
  async ({ body, set }) => {
    const { email, password } = body;
    console.log("aqui tá good");
    const driver = await db.driver.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!driver) {
      throw new Error("Credenciais inválidas");
    }
    const driverInfo = {
      id: driver.id,
      name: driver.name,
      email: driver.email,
      avatar: driver.avatar,
      role: "driver",
    };

    const token = jwt.sign({ id: driver.id }, env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log(token);
    return {
      user: driverInfo,
      token,
    };
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  },
);
