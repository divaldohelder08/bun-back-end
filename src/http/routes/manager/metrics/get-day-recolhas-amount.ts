import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia from "elysia";
import { authentication } from "../authentication";
interface getUserProps {
  id: string;
  filialId: string;
}

export const getDayRecolhasAmount = new Elysia()
  .use(authentication)
  .get("/day-recolhas-amount", async () => {
    // if (!filialId) {
    //   set.status = 401;

    //   throw new Error("User is not a manager.");
    // }
    const camamaFilial = await db.filial.findFirst({
      where: {
        name: {
          contains: "Camama",
        },
      },
    });

    const today = dayjs();
    const yesterday = today.subtract(1, "day");
    const startOfYesterday = yesterday.toDate();
    console.log(today.toDate());
    const ordersPerDay = await db.recolha.groupBy({
      by: ["filialId", "createdAt"],
      where: {
        AND: [
          { filialId: camamaFilial?.id },
          { createdAt: { gt: startOfYesterday } },
        ],
      },
      _count: true,
    });
    console.log(ordersPerDay);
    // filtrar todas as recolhas e concatenar a quantidade do dia de hoje
    const todayOrdersAmount = ordersPerDay
      .filter((orderInDay) => dayjs(orderInDay.createdAt).isSame(today, "day"))
      .reduce((total, order) => total + order._count, 0);
    console.log("today", todayOrdersAmount);
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
  });
