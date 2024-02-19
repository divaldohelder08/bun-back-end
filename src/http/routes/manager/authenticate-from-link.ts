import { db } from "@/db/connection";
import chalk from "chalk";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";
import { UnauthorizedError } from "../Errors";
import { authentication } from "./authentication";

export const authenticateFromLink = new Elysia().use(authentication).get(
  "/auth-links/authenticate",
  async ({ query, set, signUser }) => {
    const { code, redirect } = query;
    const authLinkFromCode = await db.authLinksManager.findFirst({
      where: {
        code,
      },
    });

    if (!authLinkFromCode) {
      console.log(chalk.yellowBright("UnauthorizedError"));
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

    const managedFilial = await db.filial.findFirst({
      where: {
        managerId: authLinkFromCode.managerId,
      },
    });

    await signUser({
      id: authLinkFromCode.managerId,
      sub: "aquela merda do beer",
    });

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
