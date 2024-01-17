import { db } from "@/db/connection";
import { env } from "@/env";
// import { resend } from '@/mail/client'
// import { MagicLinkAuthTemplate } from '@/mail/templates/magic-link-auth-template'
import { createId } from "@paralleldrive/cuid2";
import Elysia, { t } from "elysia";

export const authenticate = new Elysia().post(
  "/authenticate",
  async ({ body, set }) => {
    const { email, password } = body;
    const driver = await db.driver.findFirst({
      where: {
        email,
        password,
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!driver) {
      throw new Error("Credenciais inválidas");
    }

    const authLinkCode = createId();

    await db.authLinksDriver.create({
      data: { driverId: driver.id, code: authLinkCode },
    });

    const authLink = new URL(
      "/driver/auth-links/authenticate",
      env.API_BASE_URL,
    );
    authLink.searchParams.set("code", authLinkCode);
    authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL_DRIVER);
    console.log(authLink.href);

    //const mail = await resend.emails.send({
    //from: 'Mukumbo <naoresponda@fala.dev>',
    // to: email,
    // subject: '[Mukumbo] Link para login',
    //react: MagicLinkAuthTemplate({
    // userEmail: email,
    // authLink: authLink.toString(),
    // username: driver.name,
    //}),
    //})

    //    if (!mail) {
    //    throw new Error("Email não enviado")
    //}
    set.status = 200;
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  },
);
