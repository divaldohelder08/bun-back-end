import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import dayjs from "dayjs";
import Elysia from "elysia";
interface getUserProps {
  id: string;
  filialId: string;
}

export const getDayRecolhasAmount = new Elysia().get(
  "/day-recolhas-amount",
  async () => {
    const today = dayjs();
    const yesterday = today.subtract(1, "day");
    const ordersPerDay = await db.recolha.groupBy({
      by: ["createdAt"],
      where: {
        filialId: (await hackId()).filialId,
        createdAt: {
          gte: yesterday.toDate(),
        },
      },
      _count: true,
    });

    // filtrar todas as recolhas e concatenar a quantidade do dia de hoje
    const todayOrdersAmount = ordersPerDay
      .filter((orderInDay) => dayjs(orderInDay.createdAt).isSame(today, "day"))
      .reduce((total, order) => total + order._count, 0);

    // filtrar todas as recolhas e concatenar a quantidade do dia de ontem
    const yesterdayOrdersAmount = ordersPerDay
      .filter((orderInDay) =>
        dayjs(orderInDay.createdAt).isSame(yesterday, "day"),
      )
      .reduce((total, order) => total + order._count, 0);
    console.log("yesterdayOrdersAmount", yesterdayOrdersAmount);

    // a diferença das recolhas do dia de hoje com as de ontem se o houver recolha nos dias
    const diffFromYesterday =
      yesterdayOrdersAmount && todayOrdersAmount
        ? (todayOrdersAmount * 100) / yesterdayOrdersAmount
        : null;

    return {
      amount: todayOrdersAmount ?? 0,
      diffFromYesterday: diffFromYesterday
        ? Number((diffFromYesterday - 100).toFixed(2))
        : 0,
    };
  },
);
