import { db } from "@/db/connection";
import Elysia from "elysia";

export const getPopularFilias = new Elysia().get(
  "/popular-filias",
  async () => {
    const filias = await db.filial.findMany({
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
    return filias.map((e) => {
      return { name: e.name, amount: e._count.recolhas };
    });
  },
);
