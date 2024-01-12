import { db } from "@/db/connection";
import { env } from "@/env";
import dayjs from "dayjs";
import Elysia from "elysia";
import { authentication } from "./authentication";
interface getUserProps {
  id: string;
  filialId: string;
}

export const getDayRecolhasAmount = new Elysia()
  .use(authentication)
  .get("/day-recolhas-amount", async ({ set }) => {
    // if (!filialId) {
    //   set.status = 401;

    //   throw new Error("User is not a manager.");
    // }

    const today = dayjs();
    const yesterday = today.subtract(1, "day");
    const startOfYesterday = yesterday.startOf("day").toDate();

    const ordersPerDay = await db.recolha.groupBy({
      by: ["filialId", "createdAt"],
      where: {
        AND: [
          { filialId: env.FILIALID_BASE },
          { createdAt: { gte: startOfYesterday } },
        ],
      },
      _count: {
        _all: true,
      },
    });

    const todayOrdersAmount = ordersPerDay.find((orderInDay) => {
      return dayjs(orderInDay.createdAt).isSame(today, "day");
    });

    const yesterdayOrdersAmount = ordersPerDay.find((orderInDay) => {
      return dayjs(orderInDay.createdAt).isSame(yesterday, "day");
    });

    const diffFromYesterday =
      yesterdayOrdersAmount && todayOrdersAmount
        ? (todayOrdersAmount._count._all * 100) /
          yesterdayOrdersAmount._count._all
        : null;
    return {
      amount: todayOrdersAmount?._count._all ?? 0,
      diffFromYesterday: diffFromYesterday
        ? Number((diffFromYesterday - 100).toFixed(2))
        : 0,
    };
  });
