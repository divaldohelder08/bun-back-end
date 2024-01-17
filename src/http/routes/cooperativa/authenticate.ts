import { db } from "@/db/connection";
import { env } from "@/env";
// import { resend } from "@/mail/client";
// import { MagicLinkAuthTemplate } from "@/mail/templates/magic-link-auth-template";
import { createId } from "@paralleldrive/cuid2";
import Elysia, { t } from "elysia";

export const authenticate = new Elysia().post(
  "/super-manager/authenticate",
  async ({ body }) => {
    const { email } = body;
    const user = await db.manager.findUnique({
      where: {
        email,
        role: "superGerente",
      },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      throw new Error("Credenciais inválidas");
    }
    const authLinkCode = createId();

    await db.authLinksManager.create({
      data: { managerId: user.id, code: authLinkCode },
    });

    const authLink = new URL(
      "/cooperativa/auth-links/authenticate",
      env.API_BASE_URL,
    );
    authLink.searchParams.set("code", authLinkCode);
    authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL_SUPERMANAGER);
    console.log(authLink.href);

    // const mail = await resend.emails.send({
    //  from: "Mukumbo <naoresponda@fala.dev>",
    //to: email,
    // subject: "[Mukumbo] Link para login",
    // react: MagicLinkAuthTemplate({
    // userEmail: email,
    //authLink: authLink.toString(),
    //username: user.manager.name,
    //}),
    //});

    //    if (!mail) {
    //    throw new Error("Email  enviado");
    //}
  },
  {
    body: t.Object({
      email: t.String({ format: "email" }),
    }),
  },
);
