import { hackId } from "@/lib/hack";
import dayjs from "dayjs";
import { db } from "./connection";

const now = dayjs();
const startOf = now.subtract(7, "d");
const filialId = (await hackId()).filialId;
const c = await db.recolha.groupBy({
  by: ["createdAt"],
  where: {
    AND: [
      {
        filialId,
      },
      {
        createdAt: {
          gte: startOf
            .startOf("day")
            .add(startOf.utcOffset(), "minutes")
            .toDate(),
          lte: now.endOf("day").add(now.utcOffset(), "minutes").toDate(),
        },
      },
    ],
  },
});

const d = c.sort((a, b) => {
  const first = {
    day: a.createdAt.getDate(),
    month: a.createdAt.getMonth(),
  };
  const second = {
    day: b.createdAt.getDate(),
    month: b.createdAt.getMonth(),
  };

  if (first.month === second.month) {
    return first.day - second.day;
  }

  return (
    new Date(2024, first.month - 1).getTime() -
    new Date(2024, second.month - 1).getTime()
  );
});

console.log(d);
