import { db } from "@/db/connection";
import { env } from "@/env";
import { hackId } from "@/lib/hack";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../Errors";
import { jwtPayloadSchema } from "../authentication";

export const getAllReceiptInPeriod = new Elysia().guard(
  {
    headers: t.Object({
      authorization: t.String(),
    }),
  },
  (app) =>
    app
      .resolve(({ headers: { authorization } }) => {
        const bearer = authorization.split(" ")[1];

        if (!bearer) {
          throw new UnauthorizedError();
        }
        const user = jwt.verify(bearer, env.JWT_SECRET_KEY) as jwtPayloadSchema;
        if (!user) {
          throw new UnauthorizedError();
        }
        return { user };
      })
      .get("/all-receipt-in-period", async ({ user }) => {
        const startDate = dayjs().subtract(1, "M");
        return await db.recolha.findMany({
          where: {
            filialId: user.filialId,
            createdAt: {
              gte: startDate.startOf("day").toDate(),
            },
          },
          select: {
            id: true,
            client: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                createdAt: true,
              },
            },
            driver: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                createdAt: true,
              },
            },
            status: true,
            createdAt: true,
          },
        });
      })
);
