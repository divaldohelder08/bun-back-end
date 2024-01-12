import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia from "elysia";

export const getAllReceiptInPeriod = new Elysia().get(
  "/all-receipt-in-period",
  async () => {
    const startDate = dayjs().subtract(1, "M");
    return await db.recolha.findMany({
      where: {
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
            createdAt:true,
          },
        },
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            filialId:true,
            createdAt:true,
            
          },
        },
        status: true,
        rate: true,
        createdAt: true,
      },
    });
  }
);
