import { db } from "@/db/connection";
import { env } from "@/env";
import dayjs from "dayjs";
import Elysia from "elysia";
import { authentication } from "./authentication";

export const getMonthCanceledRecolhasAmount = new Elysia()
  .use(authentication)
  .get("/month-canceled-recolhas-amount", async ({ getManagedFilialId }) => {
    const filialId = env.FILIALID_BASE
      ? env.FILIALID_BASE
      : "clqinw2x800042sgo1q9o97pe";

    const today = dayjs();
    const lastMonth = today.subtract(1, "month");
    const startOfLastMonth = lastMonth.startOf("month").toDate();

    const recolhaPerMonth = await db.recolha.groupBy({
      by: ["filialId", "status", "createdAt"],
      where: {
        AND: [
          { filialId: filialId },
          { status: "cancelado" },
          { createdAt: { gte: startOfLastMonth } },
        ],
      },
      _count: {
        _all: true,
      },
    });

    const currentMonthRecolhaAmount = recolhaPerMonth.find(
      (recolha) =>
        recolha.createdAt.getFullYear() === today.year() &&
        recolha.createdAt.getMonth() === today.month()
    );

    const lastMonthOrdersAmount = recolhaPerMonth.find(
      (recolha) =>
        recolha.createdAt.getFullYear() === lastMonth.year() &&
        recolha.createdAt.getMonth() === lastMonth.month()
    );

    const diffFromLastMonth =
      lastMonthOrdersAmount && currentMonthRecolhaAmount
        ? (currentMonthRecolhaAmount._count._all * 100) /
          lastMonthOrdersAmount._count._all
        : null;

    console.log("me chamaram");
    return {
      amount: currentMonthRecolhaAmount?._count._all ?? 0,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    };
  });
