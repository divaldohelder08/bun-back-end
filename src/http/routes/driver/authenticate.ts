import { db } from "@/db/connection";
import { env } from "@/env";
import Elysia, { t } from "elysia";
import jwt from "jsonwebtoken";
import { authentication } from "./authentication";

export const authenticate = new Elysia().use(authentication).post(
  "/authenticate",
  async ({ body, set }) => {
    const { email, password } = body;
    console.log("Dentro");
    const driver = await db.driver.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!driver) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ id: driver.id }, env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log(token);
    // return token
    // await signUser({
    //   sub: "aquela merda do beer",
    //   id: driver?.id,
    // });

    set.status = 200;
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String()
    }),
  },
);
