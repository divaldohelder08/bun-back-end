import { db } from "@/db/connection";
import { Generator } from "@/lib/generator";
import chalk from "chalk";
import Elysia, { t } from "elysia";

export const validateEmail = new Elysia().put(
  "/validate-email",
  async ({ body, set }) => {
    const { email } = body;
    const driver = await db.driver.findFirst({
      where: {
        email,
      },
    });
    if (!driver) {
      console.log("!driver");
      throw new Error("Email inválido");
    }
    const code = Generator();
    console.log(chalk.greenBright(code), "driver");

    const newDrivr = await db.driver.update({
      data: {
        code,
      },
      where: {
        email: driver.email,
        id: driver.id,
      },
    });
    set.status = 204;
    // const mail = await resend.emails.send({
    //   from: "Mukumbo <naoresponda@fala.dev>",
    //   to: email,
    //   subject: "[Mukumbo] Código para reseat senha",
    //   react: ResetPasswordFromEmailTemplate({
    //     userEmail: user.email,
    //     code,
    //     userName: user.name,
    //   }),
    // });

    // if (!mail) {
    //   throw new EmailNotSendedError();
    // }
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
    }),
  },
);
