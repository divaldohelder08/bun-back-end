import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import dayjs from "dayjs";
import Elysia from "elysia";
import { authentication } from "../authentication";

export const getMonthCanceledRecolhasAmount = new Elysia()
  .use(authentication)
  .get("/month-canceled-recolhas-amount", async ({ getCurrentUser }) => {
    // const { filialId } = await getCurrentUser()
    const today = dayjs();
    const lastMonth = today.subtract(1, "month");
    const startOfLastMonth = lastMonth.startOf("month").toDate();

    const cancelledRecolhasPerMonth = await db.recolha.groupBy({
      by: ["createdAt"],
      where: {
        AND: [
          { filialId: (await hackId()).filialId },
          { createdAt: { gte: startOfLastMonth } },
          { status: "cancelada" }, // Adicione esta condição para considerar apenas recolhas canceladas
        ],
      },
      _count: {
        _all: true,
      },
    });

    const currentMonthCancelledRecolhaAmount = cancelledRecolhasPerMonth
      .filter((recolhasInMonth) =>
        dayjs(recolhasInMonth.createdAt).isSame(today, "month"),
      )
      .reduce(
        (total, recolhasInMonth) => total + recolhasInMonth._count._all,
        0,
      );

    const lastMonthCancelledRecolhasAmount = cancelledRecolhasPerMonth
      .filter((recolhasInMonth) =>
        dayjs(recolhasInMonth.createdAt).isSame(lastMonth, "month"),
      )
      .reduce(
        (total, recolhasInMonth) => total + recolhasInMonth._count._all,
        0,
      );

    const diffFromLastMonthCancelled =
      lastMonthCancelledRecolhasAmount && currentMonthCancelledRecolhaAmount
        ? (currentMonthCancelledRecolhaAmount * 100) /
          lastMonthCancelledRecolhasAmount
        : null;

    return {
      amount: currentMonthCancelledRecolhaAmount ?? 0,
      diffFromLastMonthCancelled: diffFromLastMonthCancelled
        ? Number((diffFromLastMonthCancelled - 100).toFixed(2))
        : 0,
    };
  });
