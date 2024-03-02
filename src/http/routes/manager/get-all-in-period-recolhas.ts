import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import dayjs from "dayjs";
import Elysia from "elysia";

export const getAllReceiptInPeriod = new Elysia().get(
  "/all-receipt-in-period",
  async () => {
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
  },
);
