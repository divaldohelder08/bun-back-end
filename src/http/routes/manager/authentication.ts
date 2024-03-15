import { env } from "@/env";
import cookie from "@elysiajs/cookie";
import Elysia, { Static, t } from "elysia";
import jwt from "jsonwebtoken";
import { NotAManagerError, UnauthorizedError } from "../Errors";
export type jwtPayloadSchema = {
  id: string;
  filialId: string;
};

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
  .guard(
    {
      headers: t.Object({
        authorization: t.TemplateLiteral("Bearer ${string}"),
      }),
    },
    (app) =>
      app
        .resolve(({ headers: { authorization } }) => {
          return {
            bearer: authorization.split(" ")[1],
          };
        })
        .derive(({ bearer }) => {
          return {
            getOwner: async () => {
              if (!bearer) {
                throw new UnauthorizedError();
              }

              return jwt.verify(bearer, env.JWT_SECRET_KEY) as jwtPayloadSchema;
            },
          };
        }),
  );

// .use(cookie())
// .derive(({ jwt, cookie, setCookie, removeCookie }) => {
//   return {
//     getCurrentUser: async () => {
//       const payload = await jwt.verify(cookie.auth);
//       if (!payload) {
//         throw new UnauthorizedError();
//       }

//       return payload;
//     },
//     signUser: async (payload: Static<typeof jwtPayloadSchema>) => {
//       setCookie("auth", await jwt.sign(payload), {
//         httpOnly: true,
//         maxAge: 7 * 86400,
//         path: "/",
//       });
//     },

//     signOut: () => {
//       removeCookie("auth");
//     },
//   };
// })
// .derive(({ getCurrentUser }) => {
//   return {
//     getUser: async () => {
//       const { id, sub } = await getCurrentUser();
//       console.log(id, sub);
//       if (!id || !sub) {
//         throw new NotAManagerError();
//       }

//       return { id, sub };
//     },
//   };
// });
