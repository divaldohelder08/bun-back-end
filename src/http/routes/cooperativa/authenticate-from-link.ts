import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";
import { UnauthorizedError } from "../Errors";
import { authentication } from "../manager/authentication";

export const authenticateFromLink = new Elysia().use(authentication).get(
  "/auth-links/authenticate",
  async ({ query, set, signUser }) => {
    const { code, redirect } = query;
    const authLinkFromCode = await db.authLinksManager.findFirstOrThrow({
      where: {
        code,
      },
    });

    if (!authLinkFromCode) {
      throw new UnauthorizedError();
    }
    if (dayjs().diff(authLinkFromCode.createdAt, "minute") > 5) {
      await db.authLinksManager.delete({
        where: {
          code,
        },
      });
      throw new UnauthorizedError();
    }

    //cadastrar o cookie do jwt
    //   setCookie("auth", await jwt.sign({id: authLinkFromCode.managerId,
    //     role: "superGerente"}), {
    //     httpOnly: true,
    //     maxAge: 7 * 86400,
    //     path: "/",
    //   });
    // },

    await db.authLinksManager.delete({
      where: {
        code,
      },
    });
    set.redirect = redirect;
  },
  {
    query: t.Object({
      code: t.String(),
      redirect: t.String(),
    }),
  },
);
