import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";

export const getPopularFilias = new Elysia().get(
  "/popular-drivers",
  async () => {
    const drivers = await db.driver.findMany({
      where: {
        filialId: (await hackId()).filialId,
      },
      select: {
        _count: {
          select: {
            recolhas: true,
          },
        },
        name: true,
      },
      take: 5,
    });
    return drivers.map((e) => {
      return { name: e.name, amount: e._count.recolhas };
    });
  }
);
