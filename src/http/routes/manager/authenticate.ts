import { db } from "@/db/connection";
import { env } from "@/env";
// import { resend } from "@/mail/client";
// import { MagicLinkAuthTemplate } from "@/mail/templates/magic-link-auth-template";
import { createId } from "@paralleldrive/cuid2";
import Elysia, { t } from "elysia";

export const authenticate = new Elysia().post(
  "/authenticate",
  async ({ body }) => {
    const { email, filialId } = body;
    // AND: [
    //   { createdAt: { gte: startOfLastMonth } },
    //   { status: "cancelada" }, // Adicione esta condição para considerar apenas recolhas canceladas
    // ],
    const user = await db.filial.findFirst({
      where: {
        AND: [
          { id: filialId },
          {
            manager: {
              role: "gerente",
              email,
            },
          },
        ],
      },
      select: {
        id: true,
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!user) {
      throw new Error("Credenciais inválidas");
    }
    const authLinkCode = createId();

    await db.authLinksManager.create({
      data: { managerId: user.manager.id, code: authLinkCode },
    });

    const authLink = new URL(
      "/manager/auth-links/authenticate",
      env.API_BASE_URL,
    );
    authLink.searchParams.set("code", authLinkCode);
    authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL_MANAGER);
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
      filialId: t.String(),
    }),
  },
);
