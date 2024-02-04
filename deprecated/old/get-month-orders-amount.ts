import { db } from "@/db/connection";
import { authentication } from "@/http/authentication";
import dayjs from "dayjs";
import { and, count, eq, gte, sql } from "drizzle-orm";
import Elysia from "elysia";
import { orders } from "schema";

export const getMonthOrdersAmount = new Elysia()
  .use(authentication)
  .get("/metrics/month-orders-amount", async ({ getManagedFIlialId }) => {
    const filialId = await getManagedFIlialId();

    const today = dayjs();
    const lastMonth = today.subtract(1, "month");
    const startOfLastMonth = lastMonth.startOf("month");

    /**
     * January is ZERO, that's why we need to sum 1 to get the actual month
     */
    const lastMonthWithYear = new Date(lastMonth.toISOString());
    const currentMonthWithYear = new Date(today.toISOString());

    const ordersPerMonth = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        amount: count(orders.id),
      })
      .from(orders)
      .where(
        and(
          eq(orders.filialId, filialId),
          gte(orders.createdAt, startOfLastMonth.toDate()),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)
      .having(({ amount }) => gte(amount, 1));

    const currentMonthOrdersAmount = ordersPerMonth.find((ordersInMonth) => {
      return ordersInMonth.monthWithYear === currentMonthWithYear;
    });

    const lastMonthOrdersAmount = ordersPerMonth.find((ordersInMonth) => {
      return ordersInMonth.monthWithYear === lastMonthWithYear;
    });

    const diffFromLastMonth =
      lastMonthOrdersAmount && currentMonthOrdersAmount
        ? (currentMonthOrdersAmount.amount * 100) / lastMonthOrdersAmount.amount
        : null;

    return {
      amount: currentMonthOrdersAmount?.amount ?? 0,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    };
  });
