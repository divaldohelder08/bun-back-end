import { env } from "@/env";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import Elysia, { Static, t } from "elysia";
import { NotAManagerError } from "../errors/not-a-manager-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  filialId: t.Optional(t.String()),
});

export const authentication = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
    NOT_A_MANAGER: NotAManagerError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case "UNAUTHORIZED":
        set.status = 401;
        return { code, message: error.message };
      case "NOT_A_MANAGER":
        set.status = 401;
        return { code, message: error.message };
    }
  })
  .use(
    jwt({
      name: "jwt",
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayloadSchema,
    }),
  )
  .use(cookie())
  .derive(({ jwt, cookie, setCookie, removeCookie }) => {
    return {
      getCurrentManager: async () => {
        const payload = await jwt.verify(cookie.auth);

        if (!payload) {
          throw new UnauthorizedError();
        }
        return payload;
      },
      signUser: async (payload: Static<typeof jwtPayloadSchema>) => {
        setCookie("auth", await jwt.sign(payload), {
          httpOnly: true,
          maxAge: 7 * 86400,
          path: "/",
        });
      },
      signOut: () => {
        removeCookie("auth");
      },
    };
  })
  .derive(({ getCurrentManager }) => {
    return {
      getManagedFilialId: async () => {
        const { filialId } = await getCurrentManager();

        if (!filialId) {
          throw new NotAManagerError();
        }

        return filialId;
      },
    };
  });
