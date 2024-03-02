import { db } from "@/db/connection";
import { env } from "@/env";
import dayjs from "dayjs";
import Elysia from "elysia";

export const getPaymentAmount = new Elysia().get(
  "/month-payment-amount",
  async () => {
    const today = dayjs();
    const lastMonth = today.subtract(1, "month");
    const startOfLastMonth = lastMonth.startOf("month").toDate();

    const PaymentPerMonth = await db.payment.groupBy({
      by: ["clientId", "createdAt"],
      where: {
        AND: [
          {
            client: {
              status: "pago",
            },
          },
          { createdAt: { gte: startOfLastMonth } },
        ],
      },
      _count: {
        _all: true,
      },
    });

    const currentMonthPaymentAmount = PaymentPerMonth.filter(
      (payment) =>
        payment.createdAt.getFullYear() === today.year() &&
        payment.createdAt.getMonth() === today.month(),
    ).reduce((total, payment) => total + payment._count._all, 0);

    const lastMonthPaymentAmount = PaymentPerMonth.filter(
      (payment) =>
        payment.createdAt.getFullYear() === lastMonth.year() &&
        payment.createdAt.getMonth() === lastMonth.month(),
    ).reduce((total, payment) => total + payment._count._all, 0);

    const diffFromLastMonth =
      lastMonthPaymentAmount && currentMonthPaymentAmount
        ? (currentMonthPaymentAmount * 100) / lastMonthPaymentAmount
        : null;

    return {
      amount:
        (currentMonthPaymentAmount ?? 0) * (env.MONTH_PAYMENT_VALUE ?? 2000),
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    };
  },
);
