import { db } from "@/db/connection";
import { env } from "@/env";
import dayjs from "dayjs";
import Elysia from "elysia";
import { authentication } from "./authentication";

export const getAllReceiptInPeriod = new Elysia()
  .use(authentication)
  .get("/all-receipt-in-period", async ({ getManagedFilialId }) => {
    const filialId = env.FILIALID_BASE
      ? env.FILIALID_BASE
      : "clqinw2x800042sgo1q9o97pe";

    const startDate = dayjs().subtract(1, "M");
    return await db.recolha.findMany({
      where: {
        filialId: filialId,
        createdAt: {
          gte: startDate.startOf("day").toDate(),
        },
      },
      select: {
        id: true,
        cliente: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        status: true,
        rate: true,
        createdAt: true,
      }
    });
  });
