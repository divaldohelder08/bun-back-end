import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia from "elysia";

export const getMonthRecolhasAmount = new Elysia().get(
  "/month-recolhas-amount",
  async () => {
    const today = dayjs();
    const lastMonth = today.subtract(1, "month");
    const startOfLastMonth = lastMonth.startOf("month").toDate();

    const recolhasPerMonth = await db.recolha.groupBy({
      by: ["filialId", "createdAt"],
      where: {
        AND: [{ createdAt: { gte: startOfLastMonth } }],
      },
      _count: {
        _all: true,
      },
    });

    const currentMonthRecolhaAmount = recolhasPerMonth
      .filter((recolhasInMonth) =>
        dayjs(recolhasInMonth.createdAt).isSame(today, "month"),
      )
      .reduce(
        (total, recolhasInMonth) => total + recolhasInMonth._count._all,
        0,
      );

    const lastMonthRecolhasAmount = recolhasPerMonth
      .filter((recolhasInMonth) =>
        dayjs(recolhasInMonth.createdAt).isSame(lastMonth, "month"),
      )
      .reduce(
        (total, recolhasInMonth) => total + recolhasInMonth._count._all,
        0,
      );

    const diffFromLastMonth =
      lastMonthRecolhasAmount && currentMonthRecolhaAmount
        ? (currentMonthRecolhaAmount * 100) / lastMonthRecolhasAmount
        : null;

    return {
      amount: currentMonthRecolhaAmount ?? 0,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    };
  },
);
