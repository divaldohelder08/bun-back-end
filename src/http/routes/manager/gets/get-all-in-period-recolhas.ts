import { db } from "@/db/connection";
import { env } from "@/env";
import { hackId } from "@/lib/hack";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../Errors";
import { jwtPayloadSchema } from "../authentication";

import { hackId } from "@/lib/hack";
export const getAllReceiptInPeriod = new Elysia()
      .get("/recolhas", async ({ user }) => {
        const startDate = dayjs().subtract(1, "M");
        return await db.recolha.findMany({
          where: {
            filialId: (await hackId()).filialId,
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
