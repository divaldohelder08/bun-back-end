import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia from "elysia";
import { authentication } from "../authentication";

export const getMonthRecolhasAmount = new Elysia()
  .use(authentication)
  .get("/month-recolhas-amount", async () => {
    console.log("ola");
    const today = dayjs();
    const lastMonth = today.subtract(1, "month");
    const startOfLastMonth = lastMonth.startOf("month").toDate();

    const camamaFilial = await db.filial.findFirst({
      where: {
        name: {
          contains: "Camama",
        },
      },
    });

    const recolhasPerMonth = await db.recolha.groupBy({
      by: ["filialId", "createdAt"],
      where: {
        AND: [
          { filialId: camamaFilial?.id },
          { createdAt: { gte: startOfLastMonth } },
        ],
      },
      _count: {
        _all: true,
      },
    });

    const currentMonthRecolhaAmount = recolhasPerMonth.find(
      (recolhasInMonth) =>
        recolhasInMonth.createdAt.getFullYear() === today.year() &&
        recolhasInMonth.createdAt.getMonth() === today.month(),
    );

    const lastMonthRecolhasAmount = recolhasPerMonth.find(
      (recolhasInMonth) =>
        recolhasInMonth.createdAt.getFullYear() === lastMonth.year() &&
        recolhasInMonth.createdAt.getMonth() === lastMonth.month(),
    );

    const diffFromLastMonth =
      lastMonthRecolhasAmount && currentMonthRecolhaAmount
        ? (currentMonthRecolhaAmount._count._all * 100) /
          lastMonthRecolhasAmount._count._all
        : null;

    return {
      amount: currentMonthRecolhaAmount?._count._all ?? 0,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    };
  });
