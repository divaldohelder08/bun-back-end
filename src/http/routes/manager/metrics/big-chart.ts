import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import dayjs from "dayjs";
import Elysia from "elysia";

export const bigChart = new Elysia().get("/big-chart", async () => {
  //pegar aquelas merdas do header
  const today = dayjs();
  const weekAgo = today.subtract(1, "week").toDate();
  const valor = await db.recolha.groupBy({
    by: ["createdAt"],
    where: {
      AND: [
        { filialId: (await hackId()).filialId },
        { createdAt: { gt: weekAgo } },
      ],
    },
    _count: true,
    orderBy: {
      createdAt: "asc",
    },
  });

  return valor
    .map((e) => {
      return {
        date: e.createdAt,
        count: e._count,
      };
    })
    .map((e) => {
      return {
        recolhas: e.count,
        data: e.date.toLocaleDateString("US", {
          month: "short",
          day: "numeric",
        }),
      };
    });
});
